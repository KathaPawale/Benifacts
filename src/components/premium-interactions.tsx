import { useEffect, useRef, useState } from 'react';
import { useLetterEntrance } from './letter-text';

/** The real label remains available to assistive technology; glyph widths never change. */
export function ScrambleText({ text }: { text: string }) {
  const ref=useRef<HTMLSpanElement>(null);
  useLetterEntrance(ref);
  useEffect(()=>{
    const node=ref.current,link=node?.closest('a');if(!node||!link)return;
    const allowed=matchMedia('(hover: hover) and (pointer: fine)');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const glyphs=[...node.querySelectorAll<HTMLElement>('.scramble-glyph')];
    let timer=0;
    const reset=()=>{clearInterval(timer);glyphs.forEach((el,i)=>{el.textContent=(text[i] ?? "")})};
    const start=()=>{
      reset();if(!allowed.matches||reduced.matches)return;
      const startTime=performance.now();
      timer=window.setInterval(()=>{
        const elapsed=performance.now()-startTime;
        glyphs.forEach((el,i)=>{el.textContent=/[a-z]/i.test((text[i] ?? ""))&&elapsed<250+i*18?String.fromCharCode(65+Math.floor(Math.random()*26)):(text[i] ?? "")});
        if(elapsed>=430)reset();
      },35);
    };
    const focus=()=>{if(link.matches(':focus-visible'))start()};
    link.addEventListener('pointerenter',start);link.addEventListener('pointerleave',reset);
    link.addEventListener('focus',focus);link.addEventListener('blur',reset);reduced.addEventListener('change',reset);
    return()=>{reset();link.removeEventListener('pointerenter',start);link.removeEventListener('pointerleave',reset);link.removeEventListener('focus',focus);link.removeEventListener('blur',reset);reduced.removeEventListener('change',reset)};
  },[text]);
  return <span ref={ref} className="scramble-text"><span className="sr-only">{text}</span><span aria-hidden="true">{[...text].map((char,i)=><span className="scramble-letter entrance-letter" key={i}><span className="scramble-measure">{char}</span><span className="scramble-glyph">{char}</span></span>)}</span></span>;
}

export function FilingBadge(){
  const ref=useRef<HTMLSpanElement>(null);
  const [index,setIndex]=useState(0);
  const [leaving,setLeaving]=useState(false);
  useEffect(()=>{
    const node=ref.current;if(!node)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let visible=false,hover=false,timer=0,phase=0;
    const stop=()=>{clearTimeout(timer);clearTimeout(phase);setLeaving(false)};
    const cycle=()=>{stop();if(!visible||hover||document.hidden||reduced.matches)return;
      timer=window.setTimeout(()=>{setLeaving(true);phase=window.setTimeout(()=>{setIndex(i=>(i+1)%4);setLeaving(false);cycle()},250)},1750);
    };
    const enter=()=>{hover=true;stop()},leave=()=>{hover=false;cycle()};
    const preference=()=>{if(reduced.matches)setIndex(0);cycle()};
    const observer=new IntersectionObserver(([e])=>{visible=!!e?.isIntersecting;cycle()});observer.observe(node);
    node.addEventListener('pointerenter',enter);node.addEventListener('pointerleave',leave);
    reduced.addEventListener('change',preference);document.addEventListener('visibilitychange',cycle);
    return()=>{clearTimeout(timer);clearTimeout(phase);observer.disconnect();node.removeEventListener('pointerenter',enter);node.removeEventListener('pointerleave',leave);reduced.removeEventListener('change',preference);document.removeEventListener('visibilitychange',cycle)};
  },[]);
  // Decorative repetition of the complete, static filing list directly below the carousel.
  return <span ref={ref} className="filing-badge" aria-hidden="true"><span className={leaving?'is-leaving':''}>{['5471','5472','FBAR','8938'][index]}</span></span>;
}

export function useMagneticButtons(){
  useEffect(()=>{
    const nodes=[...document.querySelectorAll<HTMLElement>('.button-primary,.header-cta')];
    const pointer=matchMedia('(hover: hover) and (pointer: fine)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    nodes.forEach(n=>n.dataset['magnetic']='true');
    const reset=()=>{cancelAnimationFrame(frame);frame=0;nodes.forEach(n=>{n.style.setProperty('--magnet-x','0px');n.style.setProperty('--magnet-y','0px')})};
    const move=(event:PointerEvent)=>{
      if(!pointer.matches||reduced.matches||event.pointerType!=='mouse'){reset();return}
      const x=event.clientX,y=event.clientY;cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        frame=0;
        const updates=nodes.map(n=>{const r=n.getBoundingClientRect(),matrix=new DOMMatrixReadOnly(getComputedStyle(n).transform);const previous={x:matrix.m41,y:matrix.m42};
          const dx=x-(r.left+r.width/2-previous.x),dy=y-(r.top+r.height/2-previous.y);
          const near=Math.hypot(dx,dy)<115&&!n.matches(':focus-visible');
          return {n,x:near?dx*.22:0,y:near?dy*.22:0};
        });
        updates.forEach(({n,x,y})=>{n.style.setProperty('--magnet-x',`${x}px`);n.style.setProperty('--magnet-y',`${y}px`)});
      });
    };
    window.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',reset);
    window.addEventListener('scroll',reset,{passive:true});window.addEventListener('blur',reset);pointer.addEventListener('change',reset);reduced.addEventListener('change',reset);
    nodes.forEach(n=>n.addEventListener('blur',reset));
    return()=>{reset();nodes.forEach(n=>{delete n.dataset['magnetic'];n.removeEventListener('blur',reset)});window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',reset);window.removeEventListener('scroll',reset);window.removeEventListener('blur',reset);pointer.removeEventListener('change',reset);reduced.removeEventListener('change',reset)};
  },[]);
}
