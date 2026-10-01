import { GraffitiCursor } from "./graffiti-cursor";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function MotionLayer() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const sync = () => {
      lenis?.destroy(); lenis = undefined;
      if (!reduced.matches) lenis = new Lenis({ lerp: .08, autoRaf: true, smoothWheel: true, syncTouch: false, anchors: false });
      document.documentElement.classList.toggle("smooth-motion", !reduced.matches);
    };
    const anchor = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = (event.target as Element)?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let target: HTMLElement | null = null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      const focusTarget = target;
      lenis.scrollTo(target, { offset: 0, onComplete: () => {
        const old = focusTarget.getAttribute("tabindex");
        if (old === null) focusTarget.setAttribute("tabindex", "-1");
        focusTarget.focus({ preventScroll: true });
        if (old === null) focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
      } });
    };
    let scrollFrame = 0;
    const updateProgress = () => {
      scrollFrame = 0;
      const value = Math.max(0, Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
      if (progress.current) progress.current.style.transform = `scaleX(${value})`;
    };
    const scroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); };
    const visibility = () => { if (document.hidden) { lenis?.stop(); } else lenis?.start(); };
    sync(); updateProgress();
    reduced.addEventListener("change", sync);
    document.addEventListener("click", anchor);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => {
      lenis?.destroy(); cancelAnimationFrame(scrollFrame);
      document.documentElement.classList.remove("smooth-motion");
      reduced.removeEventListener("change", sync);
      document.removeEventListener("click", anchor); document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll);
    };
  }, []);
  return <><div className="reading-progress" data-decorative="true" ref={progress} aria-hidden="true" /><GraffitiCursor /></>;
}
