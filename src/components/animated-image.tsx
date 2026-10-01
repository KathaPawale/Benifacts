import { MotionBrackets } from "./approach-video";
import { useEffect, useRef } from "react";

type AnimatedImageProps = {
  name: string;
  width: number;
  height: number;
  className?: string;
};

/** Illustrative photography: no copy or implied Benifacts office/staff claim. */
export function AnimatedImage({ name, width, height, className = "" }: AnimatedImageProps) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frame.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 901px) and (pointer: fine)");
    let inView = false;
    let listening = false;
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      if (!inView || reducedMotion.matches || !desktop.matches) return;
      const box = node.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - box.top - box.height / 2) / window.innerHeight;
      node.style.setProperty("--image-drift", `${Math.max(-30, Math.min(30, progress * 54))}px`);
    };
    const queueUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };
    const stop = () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      listening = false;
    };
    const syncMotion = () => {
      if (reducedMotion.matches) node.classList.add("is-revealed");
      if (inView && desktop.matches && !reducedMotion.matches) {
        if (!listening) {
          window.addEventListener("scroll", queueUpdate, { passive: true });
          window.addEventListener("resize", queueUpdate, { passive: true });
          listening = true;
        }
        queueUpdate();
      } else {
        stop();
        node.style.setProperty("--image-drift", "0px");
      }
    };

    node.classList.add("is-revealed");
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      node.classList.toggle("is-in-view", inView);
      if (inView) node.classList.add("is-revealed");
      syncMotion();
    }, { threshold: 0.08 });
    observer.observe(node);
    reducedMotion.addEventListener("change", syncMotion);
    desktop.addEventListener("change", syncMotion);
    return () => {
      stop();
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      desktop.removeEventListener("change", syncMotion);
    };
  }, []);

  return <div ref={frame} className={`image-window ${className}`} aria-hidden="true">
    <MotionBrackets />
    <div className="image-window-reveal interactive-media">
      <div className="image-window-drift">
        <img
          src={`/images/${name}-1440.webp`}
          srcSet={`/images/${name}-640.webp 640w, /images/${name}-960.webp 960w, /images/${name}-1440.webp 1440w`}
          sizes="(max-width: 900px) calc(100vw - 32px), (max-width: 1328px) calc(100vw - 48px), 1280px"
          width={width}
          height={height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </div>;
}
