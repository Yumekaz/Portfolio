import {
  ArrowUpRight,
  ArrowUp,
  Github,
  Linkedin,
  FileDown,
} from "lucide-react";
import { siteUrl } from "../lib/paths";
export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-top" data-reveal>
        <div>
          <p className="eyebrow">03 / START A CONVERSATION</p>
          <h2>
            Good systems start
            <br />
            with <span>good questions.</span>
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
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mihir Swarnkar</span>
        <span>No tracking. No analytics. Just engineering.</span>
        <a href="#page-content">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
