import { useEffect } from "react";

// CDN scripts are loaded once. Nothing is hidden until both have loaded successfully.
type Engine = { registerPlugin:(p:unknown)=>void; matchMedia:()=>{add:(queries:Record<string,string>,fn:(context:{conditions:Record<string,boolean>})=>void|(()=>void))=>void;revert:()=>void}; set:(target:unknown,vars:Record<string,unknown>)=>void; fromTo:(target:unknown,from:Record<string,unknown>,to:Record<string,unknown>)=>unknown; to:(target:unknown,vars:Record<string,unknown>)=>unknown };
type Trigger = {create:(vars:Record<string,unknown>)=>unknown;refresh:()=>void};
declare global {interface Window {gsap?:Engine; ScrollTrigger?:Trigger}}
let loading:Promise<boolean>|undefined;
export function loadScripts(){
  if(loading)return loading;
  const script=(src:string)=>new Promise<void>((resolve,reject)=>{
    const tag=document.createElement("script");tag.src=src;tag.async=true;tag.crossOrigin="anonymous";
    const timeout=setTimeout(()=>{tag.remove();reject(new Error("Animation CDN timeout"))},10000);
    tag.onload=()=>{clearTimeout(timeout);resolve()};tag.onerror=()=>{clearTimeout(timeout);tag.remove();reject(new Error("Animation CDN unavailable"))};document.head.append(tag);
  });
  loading=(async()=>{try{if(!window.gsap)await script("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js");if(!window.ScrollTrigger)await script("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js");return !!(window.gsap&&window.ScrollTrigger)}catch{return false}})();
  return loading;
}
export function useGsapReveals(){
  useEffect(()=>{
    let disposed=false,cleanup=()=>{};
    const entered=new WeakSet<Element>();
    const mounted=performance.now();
    void loadScripts().then(async ok=>{
      if(!ok||disposed)return;
      await document.fonts.ready;
      if(disposed)return;
      const gsap=window.gsap!,ScrollTrigger=window.ScrollTrigger!;
      gsap.registerPlugin(ScrollTrigger);
      const mm=gsap.matchMedia();
      mm.add({desktop:"(min-width: 901px)",mobile:"(max-width: 900px)",reduce:"(prefers-reduced-motion: reduce)"},context=>{
        const {mobile,reduce}=context.conditions;
        const distance=reduce?0:mobile?14:28,duration=reduce?.35:mobile?.6:.8;
        const bound=new Set<Element>();
        const reveal=(el:HTMLElement,from:Record<string,unknown>={},delay=0,trigger?:HTMLElement,time=duration)=>{
          if(bound.has(el)||entered.has(el)||!el.getClientRects().length)return;
          bound.add(el);el.dataset['gsapReveal']="ready";
          const rect=(trigger||el).getBoundingClientRect();
          // Never hide already-readable content if CDN/font loading was slow or the page restored mid-scroll.
          if(rect.top<innerHeight*.8){entered.add(el);el.dataset['gsapReveal']="complete";return}
          const initial=reduce?{opacity:0}:{opacity:0,y:distance,...from};
          gsap.fromTo(el,initial,{opacity:1,x:0,y:0,scale:1,scaleX:1,clipPath:"inset(0% 0% 0% 0%)",duration:reduce?.35:time,delay:reduce?0:delay,ease:"power3.out",clearProps:"transform,opacity,clipPath",scrollTrigger:{trigger:trigger||el,start:"top 80%",once:true,onEnter:()=>{entered.add(el);el.dataset['gsapReveal']="playing"}},onComplete:()=>{el.dataset['gsapReveal']="complete"}});
        };
        const all=(selector:string,from:Record<string,unknown>={},stagger=0)=>document.querySelectorAll<HTMLElement>(selector).forEach((el,i)=>reveal(el,from,Math.min(i*stagger,.36)));
        // Existing word masks allow grouping by rendered line without changing wording or layout.
        const heroLines=new Map<number,HTMLElement[]>();
        document.querySelectorAll<HTMLElement>(".hero h1 .motion-word").forEach(word=>{const y=Math.round(word.getBoundingClientRect().top);heroLines.set(y,[...(heroLines.get(y)||[]),word])});
        if(!entered.has(document.querySelector('.hero')!)&&scrollY<100){
          const fresh=performance.now()-mounted<1200;
          const hero=(target:unknown,delay:number)=>gsap.fromTo(target,{opacity:fresh?0:.85,y:reduce||!fresh?0:mobile?12:20},{opacity:1,y:0,duration:reduce?.35:mobile?.7:.9,delay:reduce?0:delay,ease:"power3.out",clearProps:"transform,opacity"});
          hero(document.querySelectorAll('.hero-kicker,.hero-copy > .eyebrow'),0);
          [...heroLines.values()].forEach((words,i)=>hero(words,.15+i*.1));
          hero(document.querySelector('.hero-lead'),.5);hero(document.querySelector('.hero-actions'),.65);hero(document.querySelector('.hero-note'),.7);
          entered.add(document.querySelector('.hero')!);
        }
        all('.section-heading > .eyebrow,.section-heading > div > .eyebrow,.section-heading h2,.section-heading p,.approach-content > .reveal:first-child > .eyebrow,.approach h2,.values > span',{},.09);
        all('.founder-bio > .eyebrow,.founder-bio h3,.founder-bio li,.founder-bio small',{},.08);
        all('.story-copy > b,.story-copy h3,.story-copy > p',{},.09);
        const quote=document.querySelector<HTMLElement>('.testimonial');
        if(quote){const mark=quote.querySelector<HTMLElement>('.quote-mark'),label=quote.querySelector<HTMLElement>('.eyebrow'),text=quote.querySelector<HTMLElement>('blockquote'),note=quote.querySelector<HTMLElement>('small');if(mark)reveal(mark,{scale:.9,y:0},0,quote,.8);if(label)reveal(label,{y:10},.1,quote,.6);if(text)reveal(text,{y:14,clipPath:'inset(0% 0% 100% 0%)'},.25,quote,.85);if(note)reveal(note,{y:10},1.05,quote,.6)}
        document.querySelectorAll<HTMLElement>('.interactive-media:not(.team-image)').forEach((el,i)=>reveal(el,{scale:1.05,clipPath:'inset(0% 0% 0% 100%)'},(i%3)*.08,undefined,mobile?.75:.9));
        const team=document.querySelector<HTMLElement>('.team-strip');
        if(team){
          const label=team.querySelector<HTMLElement>('.eyebrow'),paragraph=team.querySelector<HTMLElement>('.team-copy > p:last-child'),caption=team.querySelector<HTMLElement>('figcaption'),photo=team.querySelector<HTMLElement>('.team-image');
          if(label)reveal(label,{},0,team);
          const lines=new Map<number,HTMLElement[]>();
          team.querySelectorAll<HTMLElement>('h3 .motion-word').forEach(word=>{const top=Math.round(word.getBoundingClientRect().top);lines.set(top,[...(lines.get(top)||[]),word])});
          [...lines.values()].forEach((line,i)=>line.forEach(word=>reveal(word,{y:mobile?12:20},.16+i*.08,team,.75)));
          team.querySelectorAll<HTMLElement>('.team-motif i').forEach((dot,i)=>reveal(dot,{scale:0,x:i===0?0:-7,y:i===0?0:5},.22+i*.08,team,.7));
          if(paragraph)reveal(paragraph,{},.85+lines.size*.08,team,.7);
          if(photo)reveal(photo,{opacity:0,y:0},.15,team,.85);
          if(caption)reveal(caption,{y:0},1.15,team,.6);
        }
        document.querySelectorAll<HTMLElement>('.service-row:not([data-loop-copy])').forEach((row,i)=>{reveal(row,{scale:.97,y:mobile?12:22},i*.1,row,.85);[...row.querySelectorAll<HTMLElement>('.service-number,h3,h4,p,small')].forEach((el,j)=>reveal(el,{y:8},j*.08,row))});
        document.querySelectorAll<HTMLElement>('.client-panel').forEach((card,i)=>{
          reveal(card,{y:0,x:reduce?0:(i%2?-1:1)*(mobile?15:30)},(i%2)*.1);
          // Share the card's trigger so its lower children cannot remain hidden after the card enters.
          // Keep all offsets inside the card's padding, including during the entrance itself.
          [...card.children].forEach((child,j)=>reveal(child as HTMLElement,{y:child.matches('span,svg')?0:12},j*.09,card));
        });
        document.querySelectorAll<HTMLElement>('.process-step').forEach(row=>{[...row.children].forEach((el,i)=>reveal(el as HTMLElement,{y:12},i*.1,row))});
        const process=document.querySelector('.process');
        if(process)gsap.fromTo(process,{'--process-progress':reduce?1:0},{'--process-progress':1,ease:'none',scrollTrigger:{trigger:process,start:'top 80%',end:'bottom 65%',scrub:reduce?false:.3}});
        // 5471, 5472, FBAR, etc. are filing identifiers, not numerical statistics. Never count them up.
        all('.filings > p,.filings > small');document.querySelectorAll<HTMLElement>('.filings > div > span').forEach((el,i)=>reveal(el,{x:mobile?12:24,y:0},i*.1,el.parentElement!));
        all('.case-label > span,.case-label > b',{},.1);
        const intro=document.querySelector<HTMLElement>('.case-intro');
        if(intro){intro.querySelectorAll<HTMLElement>('.case-line > span').forEach((el,i)=>reveal(el,{y:mobile?12:20},i*.08,intro));const dot=intro.querySelector<HTMLElement>('.case-dot'),line=intro.querySelector<HTMLElement>('.case-intro-rule');if(dot)reveal(dot,{scale:0,y:0},.95,intro,.5);if(line)reveal(line,{scaleX:0,y:0},1.2,intro,.7)}
        document.querySelectorAll<HTMLElement>('.case-chapter').forEach(row=>{const label=row.querySelector<HTMLElement>('small'),paragraph=row.querySelector<HTMLElement>('p');if(label)reveal(label,{},0);if(paragraph)reveal(paragraph,{},.1)});
        all('.case-story > .fineprint');
        all('.editorial-rule,.document-rules i',{scaleX:0,y:0},.12);
        document.querySelectorAll<HTMLElement>('.service-row:not([data-loop-copy]),.client-panel').forEach(el=>{gsap.fromTo(el,{'--line-scale':reduce?1:0},{'--line-scale':1,duration:reduce?.3:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 80%',once:true}})});
        all('.contact-copy h2,.contact-copy > p,.contact-copy li,.contact-details > div,.email-call',{},.08);
        all('.form-wrap form > label,.field-pair > label,.form-wrap button,.form-note,.form-wrap .fineprint',{},.09);
        all('.faq .eyebrow,.faq-row');const footer=document.querySelector<HTMLElement>('footer');if(footer){const logo=footer.querySelector<HTMLElement>('.brand-lockup');if(logo)reveal(logo,{scale:.96,y:0},0,footer,.85);footer.querySelectorAll<HTMLElement>('.footer-main > div:not(:first-child),.footer-bottom,.disclaimer').forEach((el,i)=>reveal(el,{y:14},i*.1,footer))}
        document.querySelectorAll<HTMLElement>('.editorial-panorama').forEach(visual=>{
          const layers=visual.querySelectorAll('.editorial-scale');
          if(!reduce)gsap.fromTo(layers,{scale:1.08},{scale:1,ease:'none',scrollTrigger:{trigger:visual,start:'top bottom',end:'bottom top',scrub:.6}});
        });
        ScrollTrigger.refresh();
      });
      let refreshTimer=0;
      const refresh=()=>{clearTimeout(refreshTimer);refreshTimer=window.setTimeout(()=>{if(!disposed)ScrollTrigger.refresh()},150)};
      document.addEventListener('load',refresh,true);window.addEventListener('pageshow',refresh);
      document.documentElement.dataset['scrollAnimations']='gsap';
      cleanup=()=>{clearTimeout(refreshTimer);document.removeEventListener('load',refresh,true);window.removeEventListener('pageshow',refresh);mm.revert();delete document.documentElement.dataset['scrollAnimations']};
    });
    return()=>{disposed=true;cleanup()};
  },[]);
}
