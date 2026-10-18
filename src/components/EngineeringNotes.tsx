import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpLeft,
  ArrowUpRight,
  Minus,
  Plus,
  Search,
  X,
} from "lucide-react";
import engineeringNotes from "../data/engineeringNotes";
import Artwork from "./Artwork";
import { siteUrl } from "../lib/paths";

const noteArtwork = [
  "storage",
  "failforge",
  "cairn",
  "cairn",
  "drt",
  "qydrel",
  "training",
];
const categories = [
  "All notes",
  ...new Set(engineeringNotes.map((note) => note.category)),
];
const hashNote = () =>
  engineeringNotes.find((note) => note.id === window.location.hash.slice(1))
    ?.id;

export default function EngineeringNotes() {
  const [category, setCategory] = useState("All notes");
  const [query, setQuery] = useState("");
  const [openNotes, setOpenNotes] = useState<string[]>(() => [
    hashNote() ?? engineeringNotes[0].id,
  ]);
  useEffect(() => {
    const openHash = () => {
      const id = hashNote();
      if (id) {
        setCategory("All notes");
        setQuery("");
        setOpenNotes((current) =>
          current.includes(id) ? current : [...current, id],
        );
        requestAnimationFrame(() =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "auto", block: "start" }),
        );
      }
    };
    window.addEventListener("hashchange", openHash);
    return () => window.removeEventListener("hashchange", openHash);
  }, []);
  const matches = (note: (typeof engineeringNotes)[number]) =>
    (category === "All notes" || note.category === category) &&
    [
      note.title,
      note.project,
      note.category,
      note.failure,
      note.decision,
      note.boundary,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  const count = engineeringNotes.filter(matches).length;
  const toggleNote = (id: string) => {
    const opening = !openNotes.includes(id);
    setOpenNotes((current) =>
      opening ? [...current, id] : current.filter((value) => value !== id),
    );
    if (opening) window.history.replaceState(null, "", siteUrl(`notes/#${id}`));
    else if (window.location.hash === `#${id}`)
      window.history.replaceState(null, "", siteUrl("notes/"));
  };
  return (
    <section id="engineering-notes" className="journal-page">
      <header className="journal-masthead">
        <div className="edition-rail">
          <a href={siteUrl()}>
            <ArrowUpLeft size={14} /> Back to home
          </a>
          <span>THE FIELD JOURNAL / VOL. 03</span>
          <span>07 ENTRIES</span>
        </div>
        <div className="journal-masthead-body">
          <div>
            <p className="eyebrow">NOTES FROM THE OTHER SIDE OF FAILURE</p>
            <h1>
              Useful
              <br />
              <em>scars.</em>
            </h1>
            <p>
              What broke. What changed.
              <br />
              What the result still doesn’t prove.
            </p>
            <a className="edition-link" href="#journal-index">
              Read the journal <ArrowDown size={18} />
            </a>
          </div>
          <div className="journal-paper-stack" aria-hidden="true">
            <div className="journal-paper paper-back">
              <span>01 / FAILURE</span>
              <strong>
                Something
                <br />
                didn’t hold.
              </strong>
              <i>F</i>
            </div>
            <div className="journal-paper paper-middle">
              <span>02 / DECISION</span>
              <strong>
                Find the
                <br />
                boundary.
              </strong>
              <i>D</i>
            </div>
            <div className="journal-paper paper-front">
              <span>03 / EVIDENCE</span>
              <strong>
                Keep the
                <br />
                receipt.
              </strong>
              <i>↳</i>
              <small>BUILD · BREAK · UNDERSTAND</small>
            </div>
          </div>
        </div>
        <div className="journal-masthead-foot">
          <span>ENGINEERING IN THE OPEN</span>
          <p>
            Small arguments from real design documents
            <br />
            and postmortems. Sources stay attached.
          </p>
        </div>
      </header>
      <div id="journal-index" className="journal-browser">
        <div className="journal-tools">
          <p className="eyebrow">
            THE INDEX /{" "}
            <span aria-live="polite">
              {count} {count === 1 ? "NOTE" : "NOTES"}
            </span>
          </p>
          <div className="journal-search">
            <Search size={17} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a lesson…"
              aria-label="Search field notes"
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <div
          className="topic-filters"
          role="group"
          aria-label="Filter field notes by topic"
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
        {count === 0 && (
          <div className="collection-empty">
            <span>∅</span>
            <h2>No notes in this margin.</h2>
            <p>Try another topic or search term.</p>
            <button
              onClick={() => {
                setCategory("All notes");
                setQuery("");
              }}
            >
              Reset filters <ArrowUpRight size={17} />
            </button>
          </div>
        )}
        <div className="journal-issues">
          {engineeringNotes.map((note, index) => {
            const open = openNotes.includes(note.id);
            return (
              <article
                id={note.id}
                key={note.id}
                className={`journal-issue ${open ? "issue-open" : ""}`}
                hidden={!matches(note)}
              >
                <div className="issue-heading">
                  <span className="issue-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="issue-title">
                    <p className="eyebrow">{note.category}</p>
                    <h2>
                      <button
                        onClick={() => toggleNote(note.id)}
                        aria-expanded={open}
                        aria-controls={`${note.id}-argument`}
                      >
                        {note.title}
                      </button>
                    </h2>
                    <p>{note.project}</p>
                    <button
                      className="issue-toggle"
                      onClick={() => toggleNote(note.id)}
                      aria-expanded={open}
                      aria-controls={`${note.id}-argument`}
                    >
                      {open ? "Close note" : "Read the note"}{" "}
                      {open ? <Minus size={17} /> : <Plus size={17} />}
                    </button>
                  </div>
                  <div className="issue-art" aria-hidden="true">
                    <Artwork
                      name={noteArtwork[index]}
                      sizes="(max-width: 600px) 120px, 260px"
                    />
                    <span>
                      FIELD NOTE / {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div
                  id={`${note.id}-argument`}
                  className="issue-argument"
                  hidden={!open}
                >
                  <div className="argument-columns">
                    <section>
                      <span>01 / FAILURE</span>
                      <h3>Where it broke.</h3>
                      <p>{note.failure}</p>
                    </section>
                    <section>
                      <span>02 / DECISION</span>
                      <h3>What changed.</h3>
                      <p>{note.decision}</p>
                    </section>
                  </div>
                  <section className="argument-boundary">
                    <span>03 / BOUNDARY</span>
                    <p>{note.boundary}</p>
                  </section>
                  <div className="issue-source">
                    <span>THE SOURCE STAYS WITH THE CLAIM</span>
                    <a
                      href={note.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {note.sourceLabel}
                      <ArrowUpRight size={19} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="journal-coda">
          <span aria-hidden="true">↳</span>
          <div>
            <p className="eyebrow">FROM THE MARGIN TO THE SYSTEM</p>
            <h2>
              See the work
              <br />
              behind the words.
            </h2>
            <a className="edition-link" href={siteUrl("projects/")}>
              Explore the case studies <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
