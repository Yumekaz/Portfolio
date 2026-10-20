import {
  ArrowUpRight,
  ArrowUp,
  Github,
  Linkedin,
  FileDown,
  RotateCcw,
} from "lucide-react";
import TraceField from "./TraceField";
import { siteUrl } from "../lib/paths";
import { requestOpeningReplay } from "../lib/opening";
export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-top" data-reveal>
        <div>
          <p className="eyebrow">05 / THE NEXT INTERESTING PROBLEM</p>
          <h2>
            Let’s build
            <br />
            <span>something that holds.</span>
          </h2>
        </div>
        <a
          className="contact-orbit"
          href="mailto:mihir.swarnkar722@gmail.com?subject=Portfolio%20Inquiry"
          aria-label="Email Mihir Swarnkar"
        >
          <ArrowUpRight size={42} strokeWidth={1.3} />
        </a>
      </div>
      <div className="footer-contact-row">
        <a
          className="email-link"
          href="mailto:mihir.swarnkar722@gmail.com?subject=Portfolio%20Inquiry"
        >
          mihir.swarnkar722@gmail.com <ArrowUpRight size={17} />
        </a>
        <div className="social-links">
          <a
            href="https://github.com/Yumekaz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mihirswarnkar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href={siteUrl("resume.pdf")} download>
            <FileDown size={16} />
            Résumé
          </a>
        </div>
      </div>
      <div className="footer-signature" data-scene aria-hidden="true">
        <TraceField variant="fold" />
        <span>MIHIR</span>
        <span>
          SWARNKAR<span className="signature-period">.</span>
        </span>
        <small>BUILD / BREAK / UNDERSTAND</small>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mihir Swarnkar</span>
        <span>No tracking. No analytics. Just engineering.</span>
        <button type="button" className="replay-opening" onClick={requestOpeningReplay}>
          <RotateCcw size={12} aria-hidden="true" /> Replay opening
        </button>
        <a href="#page-content">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
