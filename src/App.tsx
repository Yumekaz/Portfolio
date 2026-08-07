import { useEffect, useState } from 'react';
import SystemHeader from './components/SystemHeader';
import HeroSection from './components/HeroSection';
import HomeHighlights from './components/HomeHighlights';
import Sidebar from './components/Sidebar';
import CaseStudyViewer from './components/CaseStudyViewer';
import EngineeringNotes from './components/EngineeringNotes';
import OtherWork from './components/OtherWork';
import KernelLog from './components/KernelLog';
import Footer from './components/Footer';
import RouteHeader from './components/RouteHeader';
import ProjectDiagram from './components/ProjectDiagram';
import projects from './data/projects';

type SiteRoute = 'home' | 'projects' | 'notes' | 'other-work';

function normalizedPath() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/Portfolio' ? '/' : path.replace(/^\/Portfolio(?=\/|$)/, '') || '/';
}

function currentRoute(): SiteRoute {
  const path = normalizedPath();
  if (path === '/projects') return 'projects';
  if (path === '/notes') return 'notes';
  if (path === '/other-work') return 'other-work';
  return 'home';
}

function projectFromHash() {
  const requested = window.location.hash.replace(/^#/, '');
  return projects.some((project) => project.id === requested) ? requested : 'coordination';
}

function HomePage({ activeSection }: { activeSection: string }) {
  return (
    <>
      <div data-reveal>
        <HeroSection activeSection={activeSection} />
      </div>
      <HomeHighlights />
      <Footer />
    </>
  );
}

function ProjectsPage({ activeSection, onSelect }: { activeSection: string; onSelect: (id: string) => void }) {
  return (
    <>
      <div data-reveal>
        <RouteHeader
          eyebrow="PROJECT DOSSIERS / DISTRIBUTED BACKEND SYSTEMS"
          title="Projects built to survive failure."
          description="Full case studies covering the problem, design decision, evidence boundary, and trade-offs behind the systems work. Start with the three flagship dossiers, then inspect the correctness and runtime projects supporting the lane."
        />
      </div>
      <div data-reveal className="border-b border-black">
        <ProjectDiagram activeSection={activeSection} />
      </div>
      <div id="project-directory" data-reveal className="scroll-mt-12 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        <Sidebar activeSection={activeSection} onSelect={onSelect} />
        <CaseStudyViewer activeSection={activeSection} />
      </div>
      <div className="lg:hidden border-t border-black">
        <KernelLog activeSection={activeSection} />
      </div>
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
  const [activeSection, setActiveSection] = useState(projectFromHash);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node, index) => {
      node.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [route]);

  useEffect(() => {
    const onHashChange = () => setActiveSection(projectFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectProject = (id: string) => {
    setActiveSection(id);
    window.history.replaceState(null, '', `/projects/#${id}`);
  };

  let page;
  if (route === 'projects') {
    page = <ProjectsPage activeSection={activeSection} onSelect={selectProject} />;
  } else if (route === 'notes') {
    page = <NotesPage />;
  } else if (route === 'other-work') {
    page = <OtherWorkPage />;
  } else {
    page = <HomePage activeSection={activeSection} />;
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-orange-600 selection:text-white">
      <a
        href={route === 'home' ? '/projects/' : '#page-content'}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:text-white"
      >
        Skip to content
      </a>
      <SystemHeader activeRoute={route} />
      <main id="page-content" className="max-w-7xl mx-auto border-l border-r border-black min-h-screen">
        {page}
      </main>
    </div>
  );
}

export default App;
