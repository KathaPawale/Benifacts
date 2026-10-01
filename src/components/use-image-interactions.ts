import { useEffect } from "react";

/** Reusable, clipped media response. No image sources or text are changed. */
export function useImageInteractions() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>('.interactive-media')];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const visible = new Set<HTMLElement>();
    let frame = 0;
    const reset = (node: HTMLElement) => {
      for (const key of ['--media-x','--media-y','--media-rx','--media-ry']) node.style.removeProperty(key);
      node.classList.remove('media-hover');
    };
    const cleanups = nodes.map(node => {
      let raf = 0;
      const move = (event: PointerEvent) => {
        if (reduced.matches || !fine.matches || event.pointerType === 'touch') return;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const box = node.getBoundingClientRect();
          const x = Math.max(0,Math.min(1,(event.clientX-box.left)/box.width));
          const y = Math.max(0,Math.min(1,(event.clientY-box.top)/box.height));
          node.style.setProperty('--media-x',`${(x-.5)*10}px`);
          node.style.setProperty('--media-y',`${(y-.5)*10}px`);
          node.style.setProperty('--media-rx',`${(y-.5)*-1.4}deg`);
          node.style.setProperty('--media-ry',`${(x-.5)*1.4}deg`);
          node.style.setProperty('--light-x',`${x*box.width}px`);
          node.style.setProperty('--light-y',`${y*box.height}px`);
          node.classList.add('media-hover');
        });
      };
      const leave = () => { cancelAnimationFrame(raf); reset(node); };
      node.addEventListener('pointermove',move);node.addEventListener('pointerleave',leave);
      return () => { leave();node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',leave); };
    });
    const update = () => {
      frame=0;
      visible.forEach(node => {
        const box=node.getBoundingClientRect();
        const strength=fine.matches?10:3;
        const y=reduced.matches?0:Math.max(-strength,Math.min(strength,(innerHeight*.5-box.top-box.height*.5)*.02));
        node.style.setProperty('--media-scroll',`${y}px`);
      });
    };
    const queue = () => {if(!frame&&!document.hidden&&visible.size)frame=requestAnimationFrame(update)};
    const observer = new IntersectionObserver(entries => {entries.forEach(entry=>{const node=entry.target as HTMLElement;if(entry.isIntersecting)visible.add(node);else{visible.delete(node);reset(node)}});queue()});
    nodes.forEach(node=>observer.observe(node));
    const preference=()=>{nodes.forEach(reset);queue()};
    window.addEventListener('scroll',queue,{passive:true});
    window.addEventListener('resize',queue,{passive:true});
    reduced.addEventListener('change',preference);fine.addEventListener('change',preference);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();cleanups.forEach(fn=>fn());nodes.forEach(n=>n.style.removeProperty('--media-scroll'));window.removeEventListener('scroll',queue);window.removeEventListener('resize',queue);reduced.removeEventListener('change',preference);fine.removeEventListener('change',preference)};
  },[]);
}
