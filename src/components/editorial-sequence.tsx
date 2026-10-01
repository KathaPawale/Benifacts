import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { loadScripts } from './use-gsap-reveals';

export function EditorialSequence({ images }: { images: readonly string[] }) {
  const root=useRef<HTMLDivElement>(null);
  const [paused,setPaused]=useState(false);
  const pausedRef=useRef(false);
  useEffect(()=>{pausedRef.current=paused;root.current?.dispatchEvent(new Event("sequencepause"))},[paused]);
  useEffect(()=>{
    const node=root.current;if(!node)return;
    let disposed=false,visible=false,timer=0,index=0;
    let fade:{kill:()=>void}|undefined;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const layers=[...node.querySelectorAll<HTMLElement>('.editorial-frame')];
    const stop=()=>{clearTimeout(timer)};
    const cycle=()=>{
      stop();if(disposed||pausedRef.current||reduced.matches||!visible||document.hidden||!window.gsap)return;
      timer=window.setTimeout(()=>{
        const next=(index+1)%layers.length;
        layers.forEach((layer,i)=>{layer.style.zIndex=i===next?'2':i===index?'1':'0';layer.style.opacity=i===index?'1':'0'});
        fade=window.gsap!.to(layers[next],{opacity:1,duration:.9,ease:'power1.inOut',onComplete:()=>{layers.forEach((layer,i)=>layer.style.opacity=i===next?'1':'0');index=next;node.dataset['activeImage']=String(index);cycle()}}) as {kill:()=>void};
      },3600);
    };
    const preference=()=>{if(reduced.matches){stop();fade?.kill();layers.forEach((layer,i)=>{layer.style.opacity=i===0?'1':'0';layer.style.zIndex=i===0?'1':'0'});index=0}else cycle()};
    const observer=new IntersectionObserver(([e])=>{visible=!!e?.isIntersecting;cycle()});observer.observe(node);
    void loadScripts().then(ok=>{if(ok&&!disposed)cycle()});
    node.addEventListener('sequencepause',cycle);document.addEventListener('visibilitychange',cycle);reduced.addEventListener('change',preference);
    return()=>{disposed=true;stop();fade?.kill();observer.disconnect();node.removeEventListener('sequencepause',cycle);document.removeEventListener('visibilitychange',cycle);reduced.removeEventListener('change',preference);layers.forEach((layer,i)=>{layer.style.opacity=i===0?'1':'0';layer.style.zIndex=i===0?'1':'0'})};
  },[images]);
  return <div className="editorial-panorama case-panorama" ref={root}>
    <div className="editorial-sequence" aria-hidden="true">{images.map((src,i)=><div className="editorial-frame" key={src} style={{opacity:i===0?1:0}}><div className="editorial-scale"><img src={src} alt="" width={1440} height={960} loading="lazy" decoding="async" /></div></div>)}</div>
    <button className="sequence-toggle" type="button" aria-label={paused?'Play image sequence':'Pause image sequence'} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={17}/>:<Pause size={17}/>}</button>
  </div>;
}
