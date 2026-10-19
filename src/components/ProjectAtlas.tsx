import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import projects from "../data/projects";
import { projectPresentation } from "../data/projectPresentation";
import Artwork from "./Artwork";
import SystemInsignia from "./SystemInsignia";
import { siteUrl } from "../lib/paths";

export default function ProjectAtlas({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [preview, setPreview] = useState(0);
  const project = projects[preview];
  const presentation = projectPresentation[project.id];
  return (
    <div className="project-atlas" data-scene>
      <div className={`atlas-window atlas-${project.id}`}>
        <div className="atlas-art" key={project.id}>
          <Artwork name={presentation.art} eager={preview === 0} />
        </div>
        <SystemInsignia project={project.id} />
        <span className="atlas-coordinate">
          MS / SYSTEM {String(preview + 1).padStart(2, "0")}
        </span>
        <div className="atlas-window-copy" aria-live="polite">
          <span>{project.focus}</span>
          <h2>{presentation.headline.join(" ")}</h2>
          <a
            href={siteUrl(`projects/#${project.id}`)}
            onClick={(event) => {
              event.preventDefault();
              onSelect(project.id);
            }}
          >
            Enter case study <ArrowUpRight size={19} />
          </a>
        </div>
        <span className="atlas-window-number" aria-hidden="true">
          0{preview + 1}
        </span>
      </div>
      <nav className="atlas-index" aria-label="Explore the project atlas">
        <div className="atlas-index-label">
          <span>SELECT A SYSTEM</span>
          <span>01 — 08</span>
        </div>
        {projects.map((item, i) => (
          <a
            key={item.id}
            href={siteUrl(`projects/#${item.id}`)}
            data-preview={preview === i}
            onMouseEnter={() => setPreview(i)}
            onFocus={() => setPreview(i)}
            onClick={(event) => {
              event.preventDefault();
              onSelect(item.id);
            }}
          >
            <span>0{i + 1}</span>
            <div>
              <strong>{item.name}</strong>
              <small>{item.focus}</small>
            </div>
            <ArrowUpRight size={20} />
          </a>
        ))}
        <p>
          Eight systems.
          <br />
          Eight ways to question a promise.
        </p>
      </nav>
    </div>
  );
}
