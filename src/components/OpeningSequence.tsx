import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteUrl } from "../lib/paths";
import {
  rememberOpening,
  startOpening,
  type OpeningPhase,
} from "../lib/opening";

type Props = { reducedMotion: boolean; onComplete: () => void };

function imageReady(image: HTMLImageElement) {
  if (image.complete) return image.decode?.().catch(() => undefined) ?? Promise.resolve();
  return new Promise<void>((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

export default function OpeningSequence({ reducedMotion, onComplete }: Props) {
  const [phase, setPhase] = useState<OpeningPhase>("assembling");
  const [artReady, setArtReady] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const emblem = useRef<HTMLImageElement>(null);
  const skipButton = useRef<HTMLButtonElement>(null);
  const controller = useRef<ReturnType<typeof startOpening> | null>(null);
  const complete = useRef(onComplete);
  complete.current = onComplete;

  useLayoutEffect(() => {
    const shell = document.querySelector<HTMLElement>(".site-shell");
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    const wasInert = shell?.inert ?? false;
    if (shell) shell.inert = true;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.entrance = "assembling";
    skipButton.current?.focus({ preventScroll: true });
    try { rememberOpening(window.sessionStorage); } catch { /* Optional storage. */ }

    return () => {
      const shouldRestore = overlay.current?.contains(document.activeElement) || document.activeElement === document.body;
      if (shell) shell.inert = wasInert;
      document.documentElement.style.overflow = previousOverflow;
      delete document.documentElement.dataset.entrance;
      if (shouldRestore) {
        const destination = previousFocus?.isConnected && previousFocus !== document.body
          ? previousFocus
          : document.getElementById("page-content");
        destination?.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    let active = true;
    const artwork = emblem.current;
    const art = artwork ? imageReady(artwork).then(() => {
      if (active && artwork.naturalWidth > 0) setArtReady(true);
    }) : Promise.resolve();
    // Only the opening's artwork, display face, and the current route's lead image.
    // Lower-page galleries never hold the entrance open.
    const leadImage = document.querySelector<HTMLImageElement>(
      ".pressure-hero img, .atlas-art img, .cinema-art img, .workshop-constellation img",
    );
    const font = document.fonts?.load('500 16px "Manrope Variable"') ?? Promise.resolve();
    const ready = Promise.allSettled([art, font, ...(leadImage ? [imageReady(leadImage)] : [])]);
    const sequence = startOpening({ ready, assemblyReady: art, onPhase(next) {
      if (!active) return;
      if (next === "complete") complete.current();
      else {
        document.documentElement.dataset.entrance = next;
        setPhase(next);
      }
    } });
    controller.current = sequence;
    const visibility = () => { if (document.hidden) sequence.skip(); };
    const pageShow = (event: PageTransitionEvent) => { if (event.persisted) sequence.skip(); };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pageshow", pageShow);
    if (document.hidden) sequence.skip();
    return () => {
      active = false;
      sequence.dispose();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pageshow", pageShow);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) controller.current?.skip();
  }, [reducedMotion]);

  return (
    <div
      ref={overlay}
      className="opening-sequence"
      data-phase={phase}
      data-art-ready={artReady}
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-title"
      aria-describedby="opening-description"
      onKeyDown={(event) => {
        if (event.key === "Escape") { event.preventDefault(); controller.current?.skip(); }
        if (event.key === "Tab") { event.preventDefault(); skipButton.current?.focus(); }
      }}
    >
      <div className="opening-shutter opening-shutter-top" aria-hidden="true" />
      <div className="opening-shutter opening-shutter-bottom" aria-hidden="true" />
      <div className="opening-seam" aria-hidden="true" />
      <div className="opening-layout">
        <div className="opening-topline">
          <span className="opening-signature">MS<span>.</span></span>
          <span id="opening-title">Mihir Swarnkar<span>Independent engineering</span></span>
          <span className="opening-edition">A STUDY IN ALIGNMENT / 001</span>
        </div>
        <div className="opening-stage" aria-hidden="true">
          <span className="opening-outline">ORDER</span>
          <div className="opening-emblem">
            {[0, 1, 2].map((piece) => (
              <div key={piece} className={`opening-piece opening-piece-${piece}`}>
                <img
                  ref={piece === 0 ? emblem : undefined}
                  src={siteUrl("art/order-emblem.webp")}
                  alt=""
                  width="768"
                  height="768"
                  draggable="false"
                  {...{ fetchpriority: "high" }}
                />
              </div>
            ))}
            <div className="opening-core"><i /><span>MS</span></div>
          </div>
          <div className="opening-coordinate opening-coordinate-left"><i />01 — 03</div>
          <div className="opening-coordinate opening-coordinate-right">PARTS → WHOLE<i /></div>
          <div className="opening-caption"><span>Order</span><span>under pressure.</span></div>
        </div>
        <div className="opening-bottomline">
          <div className="opening-principle">
            <div className="opening-parts" aria-hidden="true"><i /><i /><i /></div>
            <span id="opening-description">Many parts. One system.</span>
          </div>
          <button ref={skipButton} type="button" className="opening-skip" onClick={() => controller.current?.skip()}>
            Enter portfolio <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
