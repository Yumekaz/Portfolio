import { ArrowRight, ArrowUpRight } from "lucide-react";
import projects from "../data/projects";
import engineeringNotes from "../data/engineeringNotes";
import { siteUrl } from "../lib/paths";
const stories = [
  {
    title: "One history.\nMany moving parts.",
    name: "Coordination-service",
    image: "coordination",
    discipline: "CONTROL PLANES / COORDINATION",
    description:
      "When leaders fail and followers drift, who gets to decide what happened? A control plane that makes those decisions visible.",
    link: "Explore coordination",
    footnote: "Leadership · leases · committed history",
  },
  {
    title: "An answer is only\nas good as its read.",
    name: "Mini-Redis-Cassandra",
    image: "storage",
    discipline: "DISTRIBUTED STORAGE / CONSISTENCY",
    description:
      "A replicated store. An acknowledged write. A stale read. The failure that made the consistency boundary impossible to ignore.",
    link: "Trace the failure",
    footnote: "Replication · quorum · persistence",
  },
  {
    title: "Chaos, with\na return address.",
    name: "FailForge",
    image: "failforge",
    discipline: "FAULT INJECTION / VERIFICATION",
    description:
      "Make the unpredictable reproducible. Turn a distributed failure into a seed, a timeline, and a smaller explanation.",
    link: "Enter FailForge",
    footnote: "Seeded faults · invariants · minimization",
  },
];
export default function HomeHighlights() {
  return (
    <>
      <section id="selected-work" className="work-gallery">
        <div className="gallery-intro" data-reveal>
          <p className="eyebrow">02 / SELECTED SYSTEMS</p>
          <h2>
            Nothing hidden.
            <br />
            <span>Everything questioned.</span>
          </h2>
          <div className="gallery-intro-foot">
            <span>THREE SYSTEMS. THREE DIFFERENT QUESTIONS.</span>
            <a href={siteUrl("projects/")}>
              View all {projects.length} projects <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        {stories.map((story, index) => (
          <article
            key={story.image}
            className={`gallery-project gallery-project-${index + 1}`}
            data-reveal
          >
            <a
              className="project-art"
              href={siteUrl(`projects/#${projects[index].id}`)}
              aria-label={`${story.link}: ${story.name}`}
            >
              <img
                src={siteUrl(`art/${story.image}.webp`)}
                srcSet={`${siteUrl(`art/${story.image}-small.webp`)} 768w, ${siteUrl(`art/${story.image}.webp`)} 1536w`}
                sizes="(max-width: 780px) 100vw, 65vw"
                alt=""
                loading="lazy"
                decoding="async"
                width="1536"
                height="1024"
              />
              <span className="art-index">0{index + 1}</span>
              <span className="art-open">
                <ArrowUpRight size={23} />
                <span>EXPLORE</span>
              </span>
              <span className="art-caption">
                SCULPTURAL STUDY / {story.image.toUpperCase()}
              </span>
            </a>
            <div className="project-story">
              <p className="eyebrow">{story.discipline}</p>
              <span className="project-byline">{story.name}</span>
              <h3>
                {story.title.split("\n").map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </h3>
              <p className="story-description">{story.description}</p>
              <a
                className="gallery-link"
                href={siteUrl(`projects/#${projects[index].id}`)}
              >
                {story.link}
                <ArrowUpRight size={19} />
              </a>
              <p className="project-materials">{story.footnote}</p>
            </div>
          </article>
        ))}
        <div className="gallery-end">
          <span>
            Expressive artwork. Actual engineering.
            <br />
            Every case study links to its source and its limits.
          </span>
          <a href={siteUrl("projects/")}>
            Inspect all the work <ArrowRight size={22} />
          </a>
        </div>
      </section>
      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="manifesto-top">
          <p className="eyebrow">03 / AN ENGINEERING INSTINCT</p>
          <span>BUILD → BREAK → UNDERSTAND</span>
        </div>
        <h2 id="manifesto-title" data-reveal>
          The happy path
          <br />
          is only <em>half</em>
          <br />
          the design<span>.</span>
        </h2>
        <div className="manifesto-bottom">
          <span className="manifesto-mark" aria-hidden="true">
            ½
          </span>
          <p>
            I care about what a system promises,
            <br />
            what it actually does, and the gap
            <br />
            between the two.
            <br />
            <strong>That’s where the useful work lives.</strong>
          </p>
        </div>
      </section>
      <section className="field-journal">
        <div className="journal-heading" data-reveal>
          <p className="eyebrow">04 / THE FIELD JOURNAL</p>
          <h2>Useful scars.</h2>
          <p>Failures worth keeping a record of.</p>
        </div>
        <div className="journal-entries">
          {engineeringNotes.slice(0, 3).map((note, index) => (
            <a
              key={note.id}
              className="journal-entry"
              href={siteUrl(`notes/#${note.id}`)}
              data-reveal
            >
              <span className="journal-number">0{index + 1}</span>
              <div>
                <p className="eyebrow">{note.category}</p>
                <h3>{note.title}</h3>
                <p className="journal-project">{note.project}</p>
              </div>
              <ArrowUpRight size={28} strokeWidth={1.3} />
            </a>
          ))}
        </div>
        <a className="journal-all" href={siteUrl("notes/")}>
          Read all field notes <ArrowRight size={20} />
        </a>
      </section>
    </>
  );
}
