import { useEffect, useRef, type RefObject } from 'react';
import { loadScripts } from './use-gsap-reveals';

// Visible SSR text is the fallback. Transforms are applied only after the engine is ready.
export function useLetterEntrance(ref: RefObject<HTMLSpanElement | null>) {
  const played = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let disposed = false, observer: IntersectionObserver | undefined, menuObserver: MutationObserver | undefined, timer = 0;
    let tween: { kill: () => void } | undefined;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const letters = [...node.querySelectorAll<HTMLElement>('.entrance-letter')];
    const finish = () => {
      clearTimeout(timer); tween?.kill();
      letters.forEach(el => { el.style.removeProperty('opacity'); el.style.removeProperty('transform'); });
      node.dataset['letterReveal'] = 'complete'; played.current = true;
    };
    const preference = () => { if (reduced.matches) finish(); };
    reduced.addEventListener('change', preference);
    void loadScripts().then(ok => {
      if (disposed || played.current) return;
      if (!ok || reduced.matches) { finish(); return; }
      const reveal = () => {
        if (played.current || disposed) return;
        played.current = true; observer?.disconnect();
        const headerDelay = node.closest('.site-header') && !node.closest('.mobile-menu') ? 1800 : 0;
        if (headerDelay > 0) window.gsap!.set(letters, { opacity: 0, y: 10 });
        timer = window.setTimeout(() => {
          if (disposed || reduced.matches) { finish(); return; }
          node.dataset['letterReveal'] = 'playing';
          tween = window.gsap!.fromTo(letters, { opacity: 0, y: 10 }, {
            opacity: 1, y: 0, duration: .38, stagger: Math.max(.02, Math.min(.035, .3 / Math.max(1, letters.length - 1))),
            ease: 'power3.out', clearProps: 'transform,opacity', onComplete: () => { node.dataset['letterReveal'] = 'complete'; },
          }) as { kill: () => void };
        }, headerDelay);
      };
      observer = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting) && !node.closest('.mobile-menu:not(.is-open)')) reveal();
      }, { rootMargin: node.closest('.footer-bottom') ? '0px' : '0px 0px -16% 0px', threshold: 0 });
      observer.observe(node);
      const menu = node.closest('.mobile-menu');
      if (menu) { menuObserver = new MutationObserver(() => { if (menu.classList.contains('is-open')) reveal(); }); menuObserver.observe(menu, { attributes: true, attributeFilter: ['class'] }); }
    });
    return () => { disposed = true; clearTimeout(timer); observer?.disconnect(); menuObserver?.disconnect(); tween?.kill(); reduced.removeEventListener('change', preference); };
  }, [ref]);
}

export function LetterText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLetterEntrance(ref);
  return <span ref={ref} className="letter-text"><span>{text.split(/(\s+)/).map((word, i) => /\s/.test(word) ? word : <span className="letter-word" key={i}>{[...word].map((letter,j) => <span className="entrance-letter" key={j}>{letter}</span>)}</span>)}</span></span>;
}
