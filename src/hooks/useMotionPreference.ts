import { useEffect, useState } from "react";

export function useMotionPreference() {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem("portfolio-motion") === "paused";
    } catch {
      return false;
    }
  });
  const reduced = systemReduced || paused;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    try {
      localStorage.setItem("portfolio-motion", paused ? "paused" : "full");
    } catch {
      /* Storage is optional. */
    }
  }, [reduced, paused]);

  return {
    reduced,
    systemReduced,
    toggleMotion: () => setPaused((value) => !value),
  };
}
