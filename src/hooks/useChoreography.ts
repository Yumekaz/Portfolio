import { useEffect } from "react";

/** Native scrolling; only visible scenes receive paint-only custom properties. */
export function useChoreography(key: string, reduced: boolean) {
  useEffect(() => {
    const scenes = [...document.querySelectorAll<HTMLElement>("[data-scene]")];
    if (reduced || !("IntersectionObserver" in window)) {
      scenes.forEach((node) => {
        node.style.setProperty("--scene", ".5");
        node.style.setProperty("--scene-shift", "0px");
      });
      return;
    }
    const visible = new Set<HTMLElement>();
    let frame = 0;
    const paint = () => {
      frame = 0;
      for (const node of visible) {
        const box = node.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - box.top) / (window.innerHeight + box.height),
          ),
        );
        node.style.setProperty("--scene", progress.toFixed(4));
        node.style.setProperty(
          "--scene-shift",
          `${((progress - 0.5) * 80).toFixed(2)}px`,
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const node = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visible.add(node);
            node.classList.add("scene-entered");
          } else visible.delete(node);
        });
        schedule();
      },
      { rootMargin: "100px" },
    );
    scenes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key, reduced]);
}
