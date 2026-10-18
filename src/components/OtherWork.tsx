import { useState } from "react";
import {
  ArrowDown,
  ArrowUpLeft,
  ArrowUpRight,
  Grid2X2,
  List,
} from "lucide-react";
import { explorations } from "../data/explorations";
import { siteUrl } from "../lib/paths";
import ExplorationArt from "./ExplorationArt";

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
          <div className="workshop-hero-art">
            <ExplorationArt index={1} />
          </div>
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
              className={`exploration-item exploration-${index}`}
              hidden={category !== "Everything" && item.category !== category}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Explore ${item.name} on GitHub`}
                className="exploration-art-link"
              >
                <div className="exploration-art-panel">
                  <ExplorationArt index={index} />
                  <span className="exploration-index">
                    {String(index + 1).padStart(2, "0")} / 09
                  </span>
                  <span className="exploration-material">{item.material}</span>
                  <span className="exploration-open">
                    <ArrowUpRight size={27} strokeWidth={1.3} />
                  </span>
                </div>
              </a>
              <div className="exploration-copy">
                <p className="eyebrow">{item.category}</p>
                <h2>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                    <ArrowUpRight size={24} strokeWidth={1.3} />
                  </a>
                </h2>
                <p>{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exploration-source"
                >
                  Open repository <ArrowUpRight size={15} />
                </a>
              </div>
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
