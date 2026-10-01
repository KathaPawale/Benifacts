import { Children, cloneElement, isValidElement, useEffect, useRef, type ReactElement, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
export function ServiceRail({children}:{children:ReactNode}) {
  const root=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null),command=useRef<(d:number)=>void>(()=>{});
  const cards=Children.toArray(children);
  useEffect(()=>{
    const host=root.current,node=track.current;if(!host||!node)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,last=0,position=0,period=0,step=0,visible=false,hover=false,focused=false,until=0,timer=0;
    let manual:{from:number,to:number,start:number}|undefined;
    const originals=[...node.querySelectorAll<HTMLElement>('.service-row:not([data-loop-copy])')];
    const mod=(v:number)=>period?((v%period)+period)%period:0;
    const paint=()=>{node.style.transform=`translate3d(${-position}px,0,0)`;originals.forEach((card,i)=>card.classList.toggle('is-active',Math.round(mod(position)/step)%cards.length===i))};
    const canMove=()=>visible&&!document.hidden&&!reduced.matches&&!hover&&!focused;
    const tick=(now:number)=>{
      frame=0;const elapsed=last?Math.min(now-last,50):0;last=now;
      if(manual){const t=reduced.matches?1:Math.min(1,(now-manual.start)/600);position=manual.from+(manual.to-manual.from)*(1-Math.pow(1-t,3));if(t===1){manual=undefined;position=mod(position)}}
      else if(canMove()&&now>=until)position=mod(position+45*elapsed/1000);
      paint();
      if(visible&&!document.hidden&&(manual||canMove())){
        if(!manual&&now<until)timer=window.setTimeout(wake,until-now);else frame=requestAnimationFrame(tick);
      }
    };
    const wake=()=>{clearTimeout(timer);last=0;if(!frame&&visible&&!document.hidden&&(manual||canMove()))frame=requestAnimationFrame(tick)};
    const pause=()=>{until=performance.now()+4000;manual=undefined};
    const measure=()=>{const copy=node.querySelector<HTMLElement>('[data-loop-copy]');period=copy?copy.offsetLeft-originals[0]!.offsetLeft:0;step=originals[1]!.offsetLeft-originals[0]!.offsetLeft;position=mod(position);paint()};
    command.current=d=>{pause();const from=mod(position);const target=mod((Math.round(from/step)+d)*step);manual={from,to:target,start:performance.now()};wake()};
    const enter=()=>{hover=true;pause()},leave=()=>{hover=false;pause();wake()};
    const focus=(e:FocusEvent)=>{pause();const i=originals.findIndex(n=>n.contains(e.target as Node));focused=i>=0;if(i>=0){position=i*step;paint()}};
    const blur=()=>{focused=false;pause();wake()};
    const preference=()=>{if(reduced.matches){position=0;manual=undefined;paint()}wake()};
    const io=new IntersectionObserver(([e])=>{visible=!!e?.isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0}});io.observe(host);
    const resize=new ResizeObserver(measure);resize.observe(host);measure();
    host.addEventListener('pointerenter',enter);host.addEventListener('pointerleave',leave);host.addEventListener('pointerdown',pause);host.addEventListener('pointerup',leave);host.addEventListener('focusin',focus);host.addEventListener('focusout',blur);reduced.addEventListener('change',preference);document.addEventListener('visibilitychange',wake);
    return()=>{cancelAnimationFrame(frame);clearTimeout(timer);io.disconnect();resize.disconnect();host.removeEventListener('pointerenter',enter);host.removeEventListener('pointerleave',leave);host.removeEventListener('pointerdown',pause);host.removeEventListener('pointerup',leave);host.removeEventListener('focusin',focus);host.removeEventListener('focusout',blur);reduced.removeEventListener('change',preference);document.removeEventListener('visibilitychange',wake);command.current=()=>{}};
  },[cards.length]);
  return <div className="service-rail looping-services" ref={root}><div className="rail-controls"><button type="button" aria-label="Previous services" onClick={()=>command.current(-1)}><ArrowLeft/></button><button type="button" aria-label="Next services" onClick={()=>command.current(1)}><ArrowRight/></button></div><div className="service-viewport"><div className="service-list" ref={track}>{cards}{cards.map((card,i)=>isValidElement(card)?cloneElement(card as ReactElement<Record<string,unknown>>,{key:`copy-${i}`,'data-loop-copy':'true','aria-hidden':true,tabIndex:-1}):null)}</div></div></div>;
}
