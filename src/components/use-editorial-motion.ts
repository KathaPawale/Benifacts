import { useEffect } from "react";
import Lenis from "lenis";

/** Section background tones (sRGB of the brand oklch tokens in styles.css). */
const TONES: Record<string, [number, number, number]> = {
  paper: [245, 252, 250],
  mist: [227, 244, 243],
  navy: [6, 25, 37],
  deep: [1, 13, 23],
  ocean: [4, 62, 74],
};

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
/** Writes a custom property only when its value changed, so unchanged frames cost no style recalculation. */
const setVar = (el: HTMLElement, name: string, value: string) => { if (el.style.getPropertyValue(name) !== value) el.style.setProperty(name, value); };

/**
 * All page motion in one place: smooth scrolling, entrance reveals, header state,
 * scroll-linked image/box openings, the approach track and the scroll-driven section tone.
 * Content is fully visible without JavaScript; motion is only layered on after hydration.
 */
export function useEditorialMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector<HTMLElement>(".site-header");
    const canvas = document.querySelector<HTMLElement>(".tone-canvas");
    const toned = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    const hero = document.querySelector<HTMLElement>(".hero");
    const progressBar = document.querySelector<HTMLElement>(".reading-progress");
    const track = document.querySelector<HTMLElement>(".process-track");
    const steps = Array.from(document.querySelectorAll<HTMLElement>(".process-step"));
    const progressed = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

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
    let sections: Array<{ top: number; tone: [number, number, number] }> = [];
    const measure = () => {
      sections = toned.map(el => ({ top: el.getBoundingClientRect().top + scrollY, tone: TONES[el.dataset["tone"] ?? "paper"] ?? TONES["paper"]! }));
      heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      queue();
    };
    const resizer = new ResizeObserver(measure);
    resizer.observe(document.body);
    const nearby = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle("tone-near", entry.isIntersecting)));
    toned.forEach(el => nearby.observe(el));
    // Scroll-linked pieces only do work while they are on screen.
    const live = new Set<HTMLElement>();
    let primed = false;
    const watcher = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? live.add(entry.target as HTMLElement) : live.delete(entry.target as HTMLElement));
      queue();
    });
    [...progressed, ...stages, ...parallax].forEach(el => watcher.observe(el));

    let lastScroll = scrollY;
    let lastTone = "";
    let inkLight = false;
    const paintTone = () => {
      if (!canvas || !sections.length) return;
      const vh = innerHeight;
      let [r, g, b] = sections[0]!.tone;
      // Each boundary crossfades quickly (while it travels from 62% to 46% of the viewport), so the
      // page never lingers on an in-between grey; text flips exactly at the luminance midpoint.
      for (let i = 1; i < sections.length; i++) {
        const t = smooth(clamp((vh * 0.62 - (sections[i]!.top - scrollY)) / (vh * 0.16)));
        if (t <= 0) break;
        const [nr, ng, nb] = sections[i]!.tone;
        r += (nr - r) * t; g += (ng - g) * t; b += (nb - b) * t;
      }
      const darkness = 1 - (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      const value = `rgb(${r.toFixed(1)} ${g.toFixed(1)} ${b.toFixed(1)})`;
      if (value !== lastTone) {
        lastTone = value;
        canvas.style.backgroundColor = value;
        canvas.style.setProperty("--darkness", darkness.toFixed(3));
      }
      if (darkness > 0.53) inkLight = true;
      else if (darkness < 0.47) inkLight = false;
      root.classList.toggle("ink-light", inkLight);
      root.classList.toggle("ink-dark", !inkLight);
      root.classList.add("tone-live");
    };

    // --- Per-frame scroll work, coalesced into one rAF ---
    let frame = 0;
    const update = () => {
      frame = 0;
      paintTone();
      const y = scrollY;
      header?.classList.toggle("is-solid", y > 40);
      const delta = y - lastScroll;
      if (Math.abs(delta) > 6) {
        const menuOpen = header?.classList.contains("menu-open");
        header?.classList.toggle("is-hidden", !reduced.matches && !menuOpen && y > heroBottom * 0.6 && delta > 0);
        lastScroll = y;
      }
      if (y < 40) header?.classList.remove("is-hidden");
      if (progressBar) { const t = `scaleX(${clamp(y / Math.max(1, root.scrollHeight - innerHeight)).toFixed(3)})`; if (progressBar.style.transform !== t) progressBar.style.transform = t; }
      // Images that "open": pinned ones follow their sticky track, others their entry into view.
      // The first frame primes every element so nothing appears in its end state and then jumps.
      (primed ? live : [...progressed, ...stages, ...parallax]).forEach(el => {
        const box = el.getBoundingClientRect();
        if (el.hasAttribute("data-parallax")) {
          // Images drift inside their frame as they cross the viewport (−1 entering … +1 leaving).
          const d = reduced.matches ? 0 : clamp((innerHeight / 2 - (box.top + box.height / 2)) / innerHeight, -1, 1);
          setVar(el, "--py", `${(d * 7).toFixed(2)}%`);
          return;
        }
        if (el.dataset["stage"]) {
          const count = Number(el.dataset["stage"]) || 1;
          // Progress runs while the pinned child stays stuck (its height may be less than the viewport).
          const pinned = (el.firstElementChild as HTMLElement | null)?.offsetHeight ?? innerHeight;
          const p = clamp(-box.top / Math.max(1, box.height - pinned));
          const active = String(Math.min(count - 1, Math.floor(p * count * 0.999)));
          if (el.dataset["active"] !== active) el.dataset["active"] = active;
          setVar(el, "--p", (reduced.matches ? 0 : p).toFixed(4));
          return;
        }
        const mode = el.dataset["progress"];
        // Cards measure their own (transformed) box, so a tilted card trails slightly behind the scroll.
        const top = box.top;
        // "card": ARIO-style boxes hinge up from flat over the lower part of the viewport.
        // "tree": the trunk fills down to 60% of the viewport; "branch": a row opens from the trunk as it rises.
        if (mode === "tree" || mode === "branch") {
          const p = reduced.matches ? 1 : mode === "tree"
            ? clamp((innerHeight * 0.6 - box.top) / Math.max(1, box.height))
            : smooth(clamp((innerHeight * 0.92 - box.top) / (innerHeight * 0.4)));
          setVar(el, "--p", p.toFixed(4));
          if (mode === "branch") el.classList.toggle("is-lit", box.top + box.height / 2 < innerHeight * 0.6);
          return;
        }
        const p = reduced.matches ? 1 : mode === "sticky"
          ? clamp(-box.top / Math.max(1, box.height - innerHeight))
          : mode === "card"
            ? smooth(clamp((innerHeight * 1.02 - top) / (innerHeight * 0.62)))
            : mode === "scrub"
              ? clamp((innerHeight * 0.88 - box.top) / (innerHeight * 0.5 + box.height * 0.6))
              : clamp((innerHeight - box.top) / (innerHeight * 0.9));
        setVar(el, "--p", p.toFixed(4));
      });
      primed = true;
      if (track) {
        // The rail fills while the track rises from 85% to 40% of the viewport; steps light up in turn.
        const box = track.getBoundingClientRect();
        const p = reduced.matches ? 1 : clamp((innerHeight * 0.85 - box.top) / (innerHeight * 0.45));
        track.style.setProperty("--track-progress", p.toFixed(4));
        steps.forEach((step, i) => step.classList.toggle("is-active", p * steps.length > i + 0.15));
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
      revealer.disconnect(); resizer.disconnect(); nearby.disconnect(); watcher.disconnect();
      root.classList.remove("has-smooth-scroll", "reveal-ready", "tone-live", "ink-light", "ink-dark");
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      reduced.removeEventListener("change", preference);
    };
  }, []);
}
