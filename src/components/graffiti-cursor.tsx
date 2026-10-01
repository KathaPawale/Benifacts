import { useEffect, useRef } from "react";

// Adapted from the user-supplied GraffitiCursor Framer component:
// https://framer.com/m/GraffitiCursor-T87A.js@CdOHQ8MfDMFyMNN8Zu7C
// Uses its velocity-directed spray geometry without the Framer editor dependency.
export function GraffitiCursor() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const dotRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current, dot=dotRef.current;
    const ctx=canvas?.getContext("2d");
    if(!canvas||!dot||!ctx)return;
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const fine=matchMedia("(hover:hover) and (pointer:fine)");
    let particles:Array<{x:number;y:number;r:number;a:number;t:number}>=[];
    let frame=0,lastX=0,lastY=0,ready=false,lastEmit=0;
    const resize=()=>{const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(innerWidth*ratio);canvas.height=Math.round(innerHeight*ratio);ctx.setTransform(ratio,0,0,ratio,0,0)};
    const hide=()=>{ready=false;particles=[];cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,innerWidth,innerHeight);dot.classList.remove("is-visible");document.documentElement.classList.remove("custom-cursor-active")};
    const draw=(now:number)=>{
      frame=0;ctx.clearRect(0,0,innerWidth,innerHeight);
      particles=particles.filter(p=>now-p.t<850);
      ctx.fillStyle="#76d4d1";
      particles.forEach(p=>{ctx.globalAlpha=p.a*Math.max(0,1-(now-p.t)/850);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});
      ctx.globalAlpha=1;
      if(particles.length)frame=requestAnimationFrame(draw);
    };
    const move=(e:PointerEvent)=>{
      if(reduced.matches||!fine.matches||e.pointerType==='touch'||((e.target as Element)?.closest('input,textarea,select,[contenteditable]') || document.activeElement?.matches('input,textarea,select,[contenteditable]'))){hide();return}
      const x=e.clientX,y=e.clientY,now=performance.now();
      dot.style.transform=`translate3d(${x}px,${y}px,0)`;
      dot.classList.add('is-visible');document.documentElement.classList.add('custom-cursor-active');
      if(!ready){lastX=x;lastY=y;ready=true;return}
      const dx=x-lastX,dy=y-lastY,velocity=Math.hypot(dx,dy);
      if(now-lastEmit>=12&&velocity>=1.8){
        const angle=Math.atan2(dy,dx)+Math.PI;
        const density=Math.floor(Math.max(6*3.9*Math.min(velocity/7,2.75),10));
        for(let i=0;i<density;i++){
          const t=i/(density-1),distance=16*2.28*t*(.84+Math.random()*.24);
          const direction=angle+(Math.random()-.5)*Math.PI*(Math.random()<.54?2.17:1.71);
          particles.push({x:x+Math.cos(direction)*distance,y:y+Math.sin(direction)*distance,r:3.5*(.07+.057*(1-t)+Math.random()*.07),a:Math.max(.12,Math.min(.88,(1-t)*(.38+.54*Math.min(velocity/25,1)))),t:now});
        }
        particles=particles.slice(-540);lastEmit=now;lastX=x;lastY=y;
        if(!frame)frame=requestAnimationFrame(draw);
      }
    };
    const focus=()=>{if(document.activeElement?.matches('input,textarea,select,[contenteditable]'))hide()};
    const visibility=()=>{if(document.hidden)hide()};
    const onResize=()=>{hide();resize()};
    resize();
    document.addEventListener('focusin',focus);document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',hide);document.addEventListener('keydown',hide);document.addEventListener('visibilitychange',visibility);window.addEventListener('blur',hide);window.addEventListener('resize',onResize);reduced.addEventListener('change',hide);fine.addEventListener('change',hide);
    return()=>{hide();document.removeEventListener('focusin',focus);document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',hide);document.removeEventListener('keydown',hide);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('blur',hide);window.removeEventListener('resize',onResize);reduced.removeEventListener('change',hide);fine.removeEventListener('change',hide)};
  },[]);
  return <><canvas ref={canvasRef} className="graffiti-trail" data-decorative="true" aria-hidden="true"/><div ref={dotRef} className="graffiti-dot" data-decorative="true" aria-hidden="true"/></>;
}
