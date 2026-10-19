import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import engineeringNotes from "../data/engineeringNotes";

const shortTitles = [
  "The stale read",
  "A model for chaos",
  "The database lied",
  "Interrupted ≠ failed",
  "A boundary, declared",
  "Proof before speed",
  "Reproduce the result",
];
export default function JournalIndex({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [active, setActive] = useState(0);
  return (
    <nav className="notebook-index" aria-label="Open a field note" data-scene>
      <div className="notebook-binding" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="notebook-top">
        <span>
          MIHIR SWARNKAR
          <br />
          ENGINEERING FIELD NOTES
        </span>
        <span>
          VOL. 03
          <br />
          07 ENTRIES
        </span>
      </div>
      <div className="notebook-annotation">
        <span>
          Keep the
          <br />
          <em>useful failures.</em>
        </span>
        <svg viewBox="0 0 140 70" aria-hidden="true">
          <path d="M5 12 Q95 -10 115 45 M93 36 L116 48 L125 24" />
        </svg>
      </div>
      <div className="notebook-entries">
        {engineeringNotes.map((note, index) => (
          <a
            key={note.id}
            href={`#${note.id}`}
            data-active={active === index}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={(event) => {
              event.preventDefault();
              onSelect(note.id);
            }}
          >
            <span>0{index + 1}</span>
            <strong>{shortTitles[index]}</strong>
            <ArrowDownRight size={17} />
          </a>
        ))}
      </div>
      <div className="notebook-footer">
        <span aria-live="polite">{engineeringNotes[active].category}</span>
        <span>SOURCES IN THE MARGINS ↳</span>
      </div>
    </nav>
  );
}
