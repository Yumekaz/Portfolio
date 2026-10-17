import { ArrowUpRight } from "lucide-react";
import engineeringNotes from "../data/engineeringNotes";
import RouteHeader from "./RouteHeader";

export default function EngineeringNotes() {
  return (
    <section id="engineering-notes" className="notes-page">
      <RouteHeader
        eyebrow="FIELD NOTES / ENGINEERING IN THE OPEN"
        title="The lessons live in the failures."
        description="What broke, what changed, and what remains true. Short arguments from design documents and postmortems, with the source and boundaries kept in view."
      />
      <div className="notes-grid">
        {engineeringNotes.map((note, index) => (
          <article
            id={note.id}
            key={note.id}
            className="engineering-note"
            data-reveal
          >
            <div className="note-card-meta">
              <span className="eyebrow">{note.category}</span>
              <span className="note-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2>{note.title}</h2>
            <p className="note-project">{note.project}</p>
            <div className="note-argument">
              <div>
                <h3>01 / Failure</h3>
                <p>{note.failure}</p>
              </div>
              <div>
                <h3>02 / Decision</h3>
                <p>{note.decision}</p>
              </div>
              <div>
                <h3>03 / Boundary</h3>
                <p>{note.boundary}</p>
              </div>
            </div>
            <a
              className="text-link"
              href={note.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {note.sourceLabel}
              <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
