import { useEffect } from "react";

/** Motion only: never rewrites text, duplicates content, or touches brand assets. */
export function useSiteMotion() {
  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".site");
    if (!site || !("IntersectionObserver" in window)) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 901px) and (pointer: fine)");
    // Existing continuous animations stop outside the viewport and in background tabs.
    const active = new Set<Element>();
    const loops = Array.from(site.querySelectorAll<HTMLElement>(".hero,.ticker,.industries,.approach,.expertise,.contact,.clients,.filings"));
    const syncLoops = () => loops.forEach(node => {
      node.classList.toggle("motion-paused", document.hidden || reduced.matches || !active.has(node));
    });
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? active.add(entry.target) : active.delete(entry.target));
      syncLoops();
    });
    loops.forEach(node => visibility.observe(node));
    document.addEventListener("visibilitychange", syncLoops);

    // Pointer response uses independent translate/rotate, leaving layout and existing styles intact.
    const pointerTargets = Array.from(site.querySelectorAll<HTMLElement>(".client-panel,.service-row"));
    const pointerCleanups = pointerTargets.map(node => {
      let pointerFrame = 0;
      const reset = () => { cancelAnimationFrame(pointerFrame); node.style.removeProperty("--pointer-x"); node.style.removeProperty("--pointer-y"); node.style.removeProperty("--spot-x"); node.style.removeProperty("--spot-y"); node.style.removeProperty("--tilt-x"); node.style.removeProperty("--tilt-y"); };
      const move = (event: PointerEvent) => {
        if (!desktop.matches || reduced.matches || event.pointerType === "touch") return;
        cancelAnimationFrame(pointerFrame);
        const x = event.clientX, y = event.clientY;
        pointerFrame = requestAnimationFrame(() => {
          const box = node.getBoundingClientRect();
          node.style.setProperty("--spot-x", `${x - box.left}px`);
          node.style.setProperty("--spot-y", `${y - box.top}px`);
          if (node.matches(".client-panel,.service-row")) {
            node.style.setProperty("--tilt-x", `${((y - box.top) / box.height - .5) * -3}deg`);
            node.style.setProperty("--tilt-y", `${((x - box.left) / box.width - .5) * 3}deg`);
          }
          const strength = node.matches(".button-primary") ? 7 : 3;
          node.style.setProperty("--pointer-x", `${((x - box.left) / box.width - .5) * strength}px`);
          node.style.setProperty("--pointer-y", `${((y - box.top) / box.height - .5) * strength}px`);
        });
      };
      node.addEventListener("pointermove", move); node.addEventListener("pointerleave", reset);
      return () => { reset(); node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", reset); };
    });
    const hero = site.querySelector<HTMLElement>(".hero");
    const process = site.querySelector<HTMLElement>(".process");
    const processSteps = Array.from(site.querySelectorAll<HTMLElement>(".process-step"));
    const portrait = site.querySelector<HTMLElement>(".founder-portrait");
    const architecture = site.querySelector<HTMLElement>(".approach");
    const flow = site.querySelector<HTMLElement>(".editorial-flow");
    const footer = site.querySelector<HTMLElement>("footer");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    let cursorInside = false;
    let cursorX = innerWidth / 2;
    let cursorY = innerHeight / 2;
    let frame = 0;
    let lastScroll = scrollY;
    const header = site.querySelector<HTMLElement>(".site-header");
    const update = () => {
      frame = 0;
      processSteps.forEach(step => {
        const box=step.getBoundingClientRect();
        step.classList.toggle("step-in-focus",!reduced.matches && box.top<innerHeight*.65 && box.bottom>innerHeight*.3);
      });
      if (portrait) {
        const bounds = portrait.getBoundingClientRect();
        const drift = desktop.matches && !reduced.matches ? Math.max(-10, Math.min(10, (innerHeight / 2 - bounds.top - bounds.height / 2) * .025)) : 0;
        portrait.style.setProperty("--portrait-drift", `${drift}px`);
      }
      if (architecture) {
        const bounds = architecture.getBoundingClientRect();
        const drift = desktop.matches && !reduced.matches ? Math.max(-25, Math.min(25, (innerHeight / 2 - bounds.top - bounds.height / 2) * .025)) : 0;
        architecture.style.setProperty("--architecture-drift", `${drift}px`);
      }
      if (flow && hero) {
        const heroEnd = hero.getBoundingClientRect().bottom + scrollY;
        const themedSections: Array<[HTMLElement | null, number, "center" | "end"]> = [
          [hero, 1, "end"],
          [flow.querySelector<HTMLElement>(".credibility"), 0, "center"],
          [flow.querySelector<HTMLElement>(".expertise"), 1, "center"],
          [flow.querySelector<HTMLElement>(".clients"), .82, "center"],
          [flow.querySelector<HTMLElement>(".approach"), 1, "center"],
          [flow.querySelector<HTMLElement>(".contact"), .68, "center"],
          [flow.querySelector<HTMLElement>(".faq"), .06, "center"],
          [footer, 0, "center"],
        ];
        const stops = themedSections.flatMap(([node, theme, anchor]) => {
          if (!node) return [];
          const bounds = node.getBoundingClientRect();
          const top = bounds.top + scrollY;
          return [{ position: anchor === "end" ? top + bounds.height : top + bounds.height / 2, theme }];
        });
        const readingPoint = scrollY + innerHeight / 2;
        let theme = stops[0]?.theme ?? 1;
        for (let index = 0; index < stops.length - 1; index++) {
          const start = stops[index]!;
          const end = stops[index + 1]!;
          if (readingPoint < start.position || readingPoint > end.position) continue;
          const progress = Math.max(0, Math.min(1, (readingPoint - start.position) / (end.position - start.position)));
          const eased = progress * progress * (3 - 2 * progress);
          theme = start.theme + (end.theme - start.theme) * eased;
          break;
        }
        const themeValue = `${(Math.round(theme * 200) / 2).toFixed(1)}%`;
        if (flow.style.getPropertyValue("--flow-theme") !== themeValue) {
          flow.style.setProperty("--flow-theme", themeValue);
          footer?.style.setProperty("--flow-theme", themeValue);
        }
        const flowVisible = scrollY >= heroEnd;
        flow.classList.toggle("is-theme-active", flowVisible && cursorInside && !reduced.matches);
        flow.style.setProperty("--cursor-x", `${cursorX}px`);
        flow.style.setProperty("--cursor-y", `${cursorY}px`);
      }
      const difference = scrollY - lastScroll;
      if (Math.abs(difference) > 6) {
        header?.classList.toggle("motion-header-hidden", !reduced.matches && scrollY > 180 && difference > 0 && !header.querySelector(".mobile-menu.is-open") && !header.contains(document.activeElement));
        lastScroll = scrollY;
      }
      if (reduced.matches || scrollY < 100) header?.classList.remove("motion-header-hidden");
      if (!hero) return;
      const progress = desktop.matches && !reduced.matches ? Math.min(1, scrollY / hero.offsetHeight) : 0;
      hero.style.setProperty("--hero-content-y", `${-progress * 35}px`);
      hero.style.setProperty("--hero-content-opacity", `${1 - progress * .45}`);
      hero.style.setProperty("--hero-overlay-opacity", `${1 - progress * .12}`);
      const amount = desktop.matches && !reduced.matches && active.has(hero) ? Math.min(10, Math.max(0, scrollY * .02)) : 0;
      hero.style.setProperty("--hero-drift", `${amount}px`);
    };
    const queue = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(update); };
    const pointerMove = (event: PointerEvent) => {
      if (!flow || !finePointer.matches || reduced.matches || event.pointerType === "touch") return;
      cursorInside = true;
      cursorX = event.clientX;
      cursorY = event.clientY;
      queue();
    };
    const pointerLeave = () => { cursorInside = false; queue(); };
    const preference = () => {
      syncLoops(); queue();
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    window.addEventListener("pointermove", pointerMove, { passive: true });
    document.addEventListener("visibilitychange", queue);
    document.documentElement.addEventListener("pointerleave", pointerLeave);
    reduced.addEventListener("change", preference);
    desktop.addEventListener("change", preference);
    queue();
    return () => {
      pointerCleanups.forEach(cleanup => cleanup());
      visibility.disconnect(); cancelAnimationFrame(frame);
      loops.forEach(node => node.classList.remove("motion-paused"));
      ["--hero-drift","--hero-content-y","--hero-content-opacity","--hero-overlay-opacity"].forEach(key => hero?.style.removeProperty(key));
      ["--flow-theme","--cursor-x","--cursor-y"].forEach(key => flow?.style.removeProperty(key));
      footer?.style.removeProperty("--flow-theme");
      flow?.classList.remove("is-theme-active");
      header?.classList.remove("motion-header-hidden");
      process?.style.removeProperty("--process-progress");
      processSteps.forEach(step=>step.classList.remove("step-in-focus"));
      architecture?.style.removeProperty("--architecture-drift");
      portrait?.style.removeProperty("--portrait-drift");
      window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue);
      window.removeEventListener("pointermove", pointerMove); document.documentElement.removeEventListener("pointerleave", pointerLeave);
      document.removeEventListener("visibilitychange", queue);
      document.removeEventListener("visibilitychange", syncLoops);
      reduced.removeEventListener("change", preference); desktop.removeEventListener("change", preference);
    };
  }, []);
}
