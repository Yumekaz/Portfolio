import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpLeft,
  ArrowUpRight,
  Grid2X2,
  List,
} from "lucide-react";
import { explorations } from "../data/explorations";
import { siteUrl } from "../lib/paths";
import WorkshopConstellation from "./WorkshopConstellation";
import ExplorationExhibit from "./ExplorationExhibit";
import { exhibits } from "../data/exhibits";

const categories = [
  "Everything",
  "Systems",
  "Developer tools",
  "Communication",
  "Experiments",
];
export default function OtherWork() {
  const [category, setCategory] = useState("Everything");
  const [view, setView] = useState<"gallery" | "index">("gallery");
  useEffect(() => {
    let frame = 0;
    const revealRecord = () => {
      const id = window.location.hash.slice(1);
      if (!exhibits.some((item) => item.id === id)) return;
      setCategory("Everything");
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView({ behavior: "instant", block: "start" });
        target?.focus({ preventScroll: true });
      });
    };
    window.addEventListener("hashchange", revealRecord);
    return () => {
      window.removeEventListener("hashchange", revealRecord);
      cancelAnimationFrame(frame);
    };
  }, []);
  const count = explorations.filter(
    (item) => category === "Everything" || item.category === category,
  ).length;
  return (
    <section className="workshop-page" id="other-work">
      <header className="workshop-masthead">
        <div className="edition-rail">
          <a href={siteUrl()}>
            <ArrowUpLeft size={14} /> Back to home
          </a>
          <span>THE WORKSHOP / ALWAYS CURIOUS</span>
          <span>09 EXPLORATIONS</span>
        </div>
        <div className="workshop-intro">
          <p className="eyebrow">SIDE ROADS ARE PART OF THE PRACTICE</p>
          <h1>
            Outside
            <br />
            <em>the lines.</em>
            <span aria-hidden="true">↗</span>
          </h1>
          <div className="workshop-intro-foot">
            <p>
              Tools, runtimes, communication, and experiments.
              <br />A wider view of the things I build to understand.
            </p>
            <a className="edition-link" href="#workshop-collection">
              Enter the workshop <ArrowDown size={18} />
            </a>
          </div>
        </div>
        <WorkshopConstellation
          onSelect={(id) => {
            if (window.location.hash !== `#${id}`) window.location.hash = id;
            else window.dispatchEvent(new HashChangeEvent("hashchange"));
          }}
        />
      </header>
      <div id="workshop-collection" className="workshop-collection">
        <div className="workshop-toolbar">
          <div
            className="topic-filters"
            role="group"
            aria-label="Filter explorations"
          >
            {categories.map((value) => (
              <button
                key={value}
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div
            className="workshop-view"
            role="group"
            aria-label="Exploration layout"
          >
            <button
              onClick={() => setView("gallery")}
              aria-label="Gallery view"
              aria-pressed={view === "gallery"}
            >
              <Grid2X2 size={17} />
            </button>
            <button
              onClick={() => setView("index")}
              aria-label="Index view"
              aria-pressed={view === "index"}
            >
              <List size={19} />
            </button>
          </div>
        </div>
        <div className="workshop-count">
          <span aria-live="polite">
            {String(count).padStart(2, "0")} EXPLORATIONS
          </span>
          <span>OPEN IDEAS. EXPLICIT BOUNDARIES.</span>
        </div>
        <div className={`exploration-collection view-${view}`}>
          {explorations.map((item, index) => (
            <article
              key={item.name}
              id={exhibits[index].id}
              tabIndex={-1}
              className={`exploration-item exploration-${index}`}
              data-scene
              hidden={category !== "Everything" && item.category !== category}
            >
              <ExplorationExhibit
                item={item}
                exhibit={exhibits[index]}
                index={index}
              />
            </article>
          ))}
        </div>
        <div className="workshop-coda">
          <p className="eyebrow">CURIOSITY HAS A CENTER OF GRAVITY</p>
          <h2>
            Different questions.
            <br />
            <em>The same instinct.</em>
          </h2>
          <div>
            <p>
              Build something. Inspect the assumptions.
              <br />
              Keep the useful failures.
            </p>
            <a href={siteUrl("projects/")} className="edition-link">
              Back to the core systems <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
