import { useEffect, useRef, useState, useReducer } from "react";
import SystemHeader from "./components/SystemHeader";
import HeroSection from "./components/HeroSection";
import FailureLab from "./components/FailureLab";
import { initialLab, labReducer } from "./lib/failureLab";
import HomeHighlights from "./components/HomeHighlights";
import EngineeringNotes from "./components/EngineeringNotes";
import OtherWork from "./components/OtherWork";
import Footer from "./components/Footer";
import ProjectsPage from "./components/ProjectsPage";
import projects from "./data/projects";
import { siteUrl } from "./lib/paths";
import { useMotionPreference } from "./hooks/useMotionPreference";
import ReadingProgress from "./components/ReadingProgress";

type SiteRoute = "home" | "projects" | "notes" | "other-work";

function normalizedPath() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = window.location.pathname;
  const relative =
    base && (pathname === base || pathname.startsWith(`${base}/`))
      ? pathname.slice(base.length)
      : pathname;
  return relative.replace(/\/+$/, "") || "/";
}

function currentRoute(): SiteRoute {
  const path = normalizedPath();
  if (path === "/projects") return "projects";
  if (path === "/notes") return "notes";
  if (path === "/other-work") return "other-work";
  return "home";
}

function projectFromHash() {
  const requested = window.location.hash.replace(/^#/, "");
  return projects.some((project) => project.id === requested)
    ? requested
    : "coordination";
}

function hasProjectHash() {
  const requested = window.location.hash.replace(/^#/, "");
  return projects.some((project) => project.id === requested);
}

function HomePage({ reducedMotion }: { reducedMotion: boolean }) {
  const [state, dispatch] = useReducer(labReducer, undefined, initialLab);
  return (
    <>
      <HeroSection
        state={state}
        dispatch={dispatch}
        reducedMotion={reducedMotion}
      />
      <FailureLab state={state} dispatch={dispatch} />
      <HomeHighlights />
      <Footer />
    </>
  );
}

function NotesPage() {
  return (
    <>
      <EngineeringNotes />
      <Footer />
    </>
  );
}

function OtherWorkPage() {
  return (
    <>
      <OtherWork />
      <Footer />
    </>
  );
}

function App() {
  const [route] = useState(currentRoute);
  const { reduced, systemReduced, toggleMotion } = useMotionPreference();
  const [activeSection, setActiveSection] = useState(projectFromHash);
  const lastScrolledProject = useRef<string | null>(null);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [route, activeSection]);

  useEffect(() => {
    const onHashChange = () => {
      if (hasProjectHash()) setActiveSection(projectFromHash());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (
      route !== "projects" ||
      !hasProjectHash() ||
      lastScrolledProject.current === activeSection
    )
      return;

    const timer = window.setTimeout(() => {
      lastScrolledProject.current = activeSection;
      document.getElementById(activeSection)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [activeSection, route, reduced]);

  useEffect(() => {
    if (route === "projects") return;
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
  }, [route]);

  const selectProject = (id: string) => {
    setActiveSection(id);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", siteUrl(`projects/#${id}`));
    }
    if (id === activeSection)
      document.getElementById(id)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
  };

  let page;
  if (route === "projects") {
    page = (
      <ProjectsPage
        activeSection={activeSection}
        onSelect={selectProject}
        reducedMotion={reduced}
      />
    );
  } else if (route === "notes") {
    page = <NotesPage />;
  } else if (route === "other-work") {
    page = <OtherWorkPage />;
  } else {
    page = <HomePage reducedMotion={reduced} />;
  }

  return (
    <div className="site-shell" data-route={route}>
      <ReadingProgress />
      <a
        href="#page-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:text-white"
      >
        Skip to content
      </a>
      <SystemHeader
        activeRoute={route}
        reducedMotion={reduced}
        systemReduced={systemReduced}
        onToggleMotion={toggleMotion}
      />
      <main id="page-content" className="page-content" tabIndex={-1}>
        {page}
      </main>
    </div>
  );
}

export default App;
