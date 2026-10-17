import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GitBranch,
  Repeat2,
  ShieldCheck,
} from "lucide-react";
import projects from "../data/projects";
import engineeringNotes from "../data/engineeringNotes";
import { siteUrl } from "../lib/paths";

const stories = [
  {
    question: "Who gets to lead?",
    description:
      "A control plane that makes leadership, leases, and recovery visible — even when the cluster disagrees.",
    tag: "COORDINATION / REPLICATION",
    link: "Inside the control plane",
  },
  {
    question: "A write is only half the story.",
    description:
      "A replicated store, a stale read, and the postmortem that changed how I think about consistency.",
    tag: "STORAGE / CONSISTENCY",
    link: "Follow the failure",
  },
  {
    question: "Make the failure repeatable.",
    description:
      "Turn an unpredictable distributed failure into a seed, a timeline, and a smaller explanation.",
    tag: "FAULT INJECTION / VERIFICATION",
    link: "Inside the failure lab",
  },
];

function WorkEvidence({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="work-evidence coordination-evidence">
        <div className="evidence-top">
          <GitBranch size={18} />
          <span>THE CONTROL-PLANE QUESTION</span>
        </div>
        <p className="evidence-quote">
          One history.
          <br />
          <span>
            Even when the
            <br />
            network disagrees.
          </span>
        </p>
        <ol className="protocol-steps">
          <li>
            <span>01</span>Leadership
          </li>
          <li>
            <span>02</span>Quorum
          </li>
          <li>
            <span>03</span>Committed history
          </li>
        </ol>
        <span className="evidence-caption">
          Leadership + leases + incident causality
        </span>
      </div>
    );
  if (index === 1)
    return (
      <div className="work-evidence storage-evidence">
        <div className="evidence-top">
          <Repeat2 size={18} />
          <span>FROM THE SEED-42 POSTMORTEM</span>
        </div>
        <div className="consistency-comparison">
          <div>
            <span>WRITE</span>
            <strong>QUORUM</strong>
            <Check size={17} />
          </div>
          <div>
            <span>READ</span>
            <strong>ANY</strong>
            <span className="stale-label">STALE?</span>
          </div>
        </div>
        <p className="evidence-lesson">
          An acknowledged write does not
          <br />
          make every read fresh.
        </p>
        <span className="evidence-caption">
          Repository evidence · read-after-write failures
        </span>
      </div>
    );
  return (
    <div className="work-evidence fault-evidence">
      <div className="evidence-top">
        <ShieldCheck size={18} />
        <span>REPRODUCE. REDUCE. UNDERSTAND.</span>
      </div>
      <div className="fault-seed">
        <span>REPLAYABLE INPUT</span>
        <strong>
          seed <span>42</span>
        </strong>
      </div>
      <ol className="fault-pipeline">
        <li>Inject faults</li>
        <li>Check history</li>
        <li>Minimize</li>
      </ol>
      <span className="evidence-caption">
        Seeded campaigns + invariant checkers + DDMin
      </span>
    </div>
  );
}

export default function HomeHighlights() {
  return (
    <>
      <section id="selected-work" className="selected-work section-space">
        <div className="section-heading editorial-heading" data-reveal>
          <div>
            <p className="eyebrow">01 / SELECTED ENGINEERING</p>
            <h2>
              Built to be
              <br />
              <span className="muted-heading">looked into.</span>
            </h2>
          </div>
          <p>
            Three projects. Three different questions.
            <br />
            The decisions, failures, and evidence
            <br />
            are all part of the work.
          </p>
        </div>
        <div className="work-stories">
          {projects.slice(0, 3).map((project, index) => (
            <article className="work-story" key={project.id} data-reveal>
              <div className="work-story-copy">
                <div className="work-story-meta">
                  <span>0{index + 1}</span>
                  <span>{stories[index].tag}</span>
                  <span>{project.language}</span>
                </div>
                <p className="work-project-name">{project.name}</p>
                <h3>{stories[index].question}</h3>
                <p className="work-story-description">
                  {stories[index].description}
                </p>
                <a
                  className="story-link"
                  href={siteUrl(`projects/#${project.id}`)}
                >
                  {stories[index].link}
                  <ArrowUpRight size={20} />
                </a>
              </div>
              <WorkEvidence index={index} />
            </article>
          ))}
        </div>
        <div className="section-end" data-reveal>
          <span>
            Local prototypes. Explicit boundaries. Source-linked evidence.
          </span>
          <a className="text-link" href={siteUrl("projects/")}>
            All {projects.length} case studies <ArrowRight size={18} />
          </a>
        </div>
      </section>
      <section className="engineering-belief section-space" data-reveal>
        <p className="eyebrow">THE WAY I WORK</p>
        <p className="belief-statement">
          The happy path is
          <br />
          only <span>half the design.</span>
        </p>
        <div className="belief-detail">
          <span>Build it. Question it. Break it. Explain it.</span>
          <p>
            I care about what a system promises, what it actually does, and the
            gap between the two. That’s where the useful lessons live.
          </p>
        </div>
      </section>
      <section className="home-notes section-space">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">02 / FIELD NOTES</p>
            <h2>
              Notes from
              <br />
              <span className="muted-heading">the breaking point.</span>
            </h2>
          </div>
          <p>
            What failed, what changed,
            <br />
            and what remains unproven.
          </p>
        </div>
        <div className="note-teasers">
          {engineeringNotes.slice(0, 3).map((note, index) => (
            <a
              key={note.id}
              href={siteUrl(`notes/#${note.id}`)}
              className="note-teaser"
              data-reveal
            >
              <span className="note-index">0{index + 1}</span>
              <div>
                <p className="eyebrow">{note.category}</p>
                <h3>{note.title}</h3>
                <p className="note-project">{note.project}</p>
              </div>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
        <a href={siteUrl("notes/")} className="text-link notes-all" data-reveal>
          Open the notebook <ArrowUpRight size={17} />
        </a>
      </section>
    </>
  );
}
