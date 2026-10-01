import { useEffect } from "react";
import Lenis from "lenis";

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/**
 * All page motion in one place: smooth scrolling, entrance reveals, header state,
 * scroll-linked image/box openings and the approach timeline. Section colours are plain CSS.
 * Content is fully visible without JavaScript; motion is only layered on after hydration.
 */
export function useEditorialMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const progressBar = document.querySelector<HTMLElement>(".reading-progress");
    const timeline = document.querySelector<HTMLElement>(".timeline");
    const steps = Array.from(document.querySelectorAll<HTMLElement>(".timeline-step"));
    const progressed = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));

    // --- Smooth scrolling (skipped entirely for reduced motion) ---
    let lenis: Lenis | undefined;
    const syncLenis = () => {
      lenis?.destroy();
      lenis = reduced.matches ? undefined : new Lenis({ lerp: 0.1, autoRaf: true, smoothWheel: true, anchors: true });
      root.classList.toggle("has-smooth-scroll", !!lenis);
    };
    syncLenis();

    // --- Entrance reveals: only elements below the fold start hidden, so nothing flashes ---
    const revealables = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealables.forEach(el => { if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add("is-in"); });
    const revealer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealer.unobserve(entry.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(el => { if (!el.classList.contains("is-in")) revealer.observe(el); });
    root.classList.add("reveal-ready");

    // --- Layout measurements, recomputed on resize/content changes ---
    let heroBottom = 0;
    const measure = () => {
      heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      queue();
    };
    const resizer = new ResizeObserver(measure);
    resizer.observe(document.body);
    // Scroll-linked pieces only do work while they are on screen.
    const live = new Set<HTMLElement>();
    let primed = false;
    const watcher = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? live.add(entry.target as HTMLElement) : live.delete(entry.target as HTMLElement));
      queue();
    });
    [...progressed, ...stages].forEach(el => watcher.observe(el));

    let lastScroll = scrollY;

    // --- Per-frame scroll work, coalesced into one rAF ---
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = scrollY;
      header?.classList.toggle("is-solid", y > 40);
      const delta = y - lastScroll;
      if (Math.abs(delta) > 6) {
        const menuOpen = header?.classList.contains("menu-open");
        header?.classList.toggle("is-hidden", !reduced.matches && !menuOpen && y > heroBottom * 0.6 && delta > 0);
        lastScroll = y;
      }
      if (y < 40) header?.classList.remove("is-hidden");
      if (progressBar) progressBar.style.transform = `scaleX(${clamp(y / Math.max(1, root.scrollHeight - innerHeight)).toFixed(4)})`;
      // Images that "open": pinned ones follow their sticky track, others their entry into view.
      // The first frame primes every element so nothing appears in its end state and then jumps.
      (primed ? live : [...progressed, ...stages]).forEach(el => {
        const box = el.getBoundingClientRect();
        if (el.dataset["stage"]) {
          const count = Number(el.dataset["stage"]) || 1;
          const p = clamp(-box.top / Math.max(1, box.height - innerHeight));
          const active = String(Math.min(count - 1, Math.floor(p * count * 0.999)));
          if (el.dataset["active"] !== active) el.dataset["active"] = active;
          el.style.setProperty("--p", (reduced.matches ? 0 : p).toFixed(4));
          return;
        }
        const mode = el.dataset["progress"];
        // "card": ARIO-style boxes hinge up from flat over the lower part of the viewport.
        const p = reduced.matches ? 1 : mode === "sticky"
          ? clamp(-box.top / Math.max(1, box.height - innerHeight))
          : mode === "card"
            ? smooth(clamp((innerHeight * 1.02 - box.top) / (innerHeight * 0.62)))
            : clamp((innerHeight - box.top) / (innerHeight * 0.9));
        el.style.setProperty("--p", p.toFixed(4));
      });
      primed = true;
      if (timeline) {
        const box = timeline.getBoundingClientRect();
        const p = clamp((innerHeight * 0.6 - box.top) / Math.max(1, box.height));
        timeline.style.setProperty("--timeline-progress", p.toFixed(4));
        steps.forEach(step => step.classList.toggle("is-active", step.getBoundingClientRect().top < innerHeight * 0.6));
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };

    const preference = () => {
      syncLenis();
      if (reduced.matches) revealables.forEach(el => el.classList.add("is-in"));
      queue();
    };

    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure);
    reduced.addEventListener("change", preference);

    return () => {
      lenis?.destroy();
      cancelAnimationFrame(frame);
      revealer.disconnect(); resizer.disconnect(); watcher.disconnect();
      root.classList.remove("has-smooth-scroll", "reveal-ready");
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      reduced.removeEventListener("change", preference);
    };
  }, []);
}
