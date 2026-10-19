import { useEffect, useRef } from "react";

/** A procedural material study, not telemetry. No network, WebGL, or assets. */
export default function TraceField({
  variant = "rift",
  className = "",
}: {
  variant?: "rift" | "orbit" | "fold";
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const node = canvas.current;
    const parent = node?.parentElement;
    const context = node?.getContext("2d");
    if (!node || !parent || !context) return;
    let width = 0,
      height = 0,
      frame = 0,
      visible = false,
      last = 0,
      time = 0;
    let pointer = 0,
      target = 0;
    const reduced = () => document.documentElement.dataset.motion === "reduced";
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const count = width < 600 ? 27 : 43;
      const scene = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - parent.getBoundingClientRect().top) /
            (window.innerHeight + parent.clientHeight),
        ),
      );
      for (let line = 0; line < count; line++) {
        const ratio = line / (count - 1);
        context.beginPath();
        for (let point = 0; point <= 70; point++) {
          const u = point / 70;
          const envelope = Math.pow(Math.sin(u * Math.PI), 2);
          const wave = Math.sin(u * Math.PI * 3.3 + ratio * 5.4 + time * 0.18);
          const fold = Math.sin(u * Math.PI * 1.4 + ratio * 3.2 + scene * 2);
          const x = u * width;
          const y =
            height * (0.17 + ratio * 0.66) +
            envelope *
              (wave * height * 0.12 +
                fold * height * 0.12 +
                pointer * height * 0.06) *
              (variant === "fold" ? 1.4 : 1);
          const rift =
            variant === "rift" && Math.abs(u - 0.53) < 0.035 + scene * 0.025;
          if (point === 0 || rift) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle =
          line % 7 === 0
            ? "rgba(255,105,67,.8)"
            : `rgba(203,211,182,${0.14 + Math.sin(ratio * Math.PI) * 0.27})`;
        context.lineWidth = line % 7 === 0 ? 1.3 : 0.7;
        context.stroke();
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || reduced()) return;
      if (now - last > 1000 / 30) {
        time += 0.033;
        pointer += (target - pointer) * 0.05;
        draw();
        last = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      draw();
      if (visible && !document.hidden && !reduced())
        frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      node.width = Math.round(width * dpr);
      node.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    });
    resize.observe(parent);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(parent);
    const motion = new MutationObserver(sync);
    motion.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    const move = (event: PointerEvent) => {
      const box = parent.getBoundingClientRect();
      target = ((event.clientY - box.top) / Math.max(box.height, 1)) * 2 - 1;
    };
    const leave = () => {
      target = 0;
    };
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.disconnect();
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [variant]);
  return (
    <canvas
      ref={canvas}
      className={`trace-field ${className}`}
      aria-hidden="true"
    />
  );
}
