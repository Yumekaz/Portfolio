import { ArrowDown, ArrowUpRight } from "lucide-react";
import projects from "../data/projects";
import { projectPresentation } from "../data/projectPresentation";
import Artwork from "./Artwork";
import SystemInsignia from "./SystemInsignia";

const coverWords: Record<string, [string, string, string]> = {
  coordination: ["PROPOSE", "COMMIT", "FENCE"],
  miniRedis: ["WRITE", "ACKNOWLEDGE", "READ"],
  failforge: ["SEED", "BREAK", "REPRODUCE"],
  cairn: ["PREPARE", "PRESERVE", "RECOVER"],
  drt: ["RECORD", "REPLAY", "EXPLAIN"],
  qydrel: ["DEFINE", "COMPARE", "VERIFY"],
  miniDocker: ["ISOLATE", "CONSTRAIN", "REAP"],
  tinyTantrum: ["TRAIN", "RESUME", "EVALUATE"],
};
export default function CaseCover({
  project,
  index,
  onEnter,
}: {
  project: (typeof projects)[number];
  index: number;
  onEnter: () => void;
}) {
  const visual = projectPresentation[project.id];
  return (
    <header className={`case-cinema cinema-${project.id}`} data-scene>
      <div className="cinema-topline">
        <span>MS / ENGINEERING ATLAS</span>
        <span>CASE {String(index + 1).padStart(2, "0")} — 08</span>
        <span>{project.language}</span>
      </div>
      <div className="cinema-art">
        <Artwork
          name={visual.art}
          eager
          sizes="(max-width: 700px) 100vw, 75vw"
        />
      </div>
      <div className="cinema-insignia">
        <SystemInsignia project={project.id} />
      </div>
      <div className="cinema-copy">
        <p className="cinema-project-name">
          {project.name} <span>↳ {project.focus}</span>
        </p>
        <h2 id="dossier-title" tabIndex={-1}>
          <span>{visual.headline[0]}</span>
          <em>{visual.headline[1]}</em>
        </h2>
      </div>
      <div className="cinema-sequence" aria-hidden="true">
        {coverWords[project.id].map((word, i) => (
          <span key={word}>
            <small>0{i + 1}</small>
            {word}
          </span>
        ))}
      </div>
      <div className="cinema-foot">
        <button onClick={onEnter}>
          Inside the system <ArrowDown size={20} />
        </button>
        <span>SCULPTURAL STUDY / {visual.material}</span>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          View source <ArrowUpRight size={18} />
        </a>
      </div>
    </header>
  );
}
