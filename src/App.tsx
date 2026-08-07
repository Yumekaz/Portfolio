import { useEffect, useState } from 'react';
import SystemHeader from './components/SystemHeader';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import CaseStudyViewer from './components/CaseStudyViewer';
import EngineeringNotes from './components/EngineeringNotes';
import OtherWork from './components/OtherWork';
import KernelLog from './components/KernelLog';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('coordination');

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
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-orange-600 selection:text-white">
      <a
        href="#case-studies"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:text-white"
      >
        Skip to case studies
      </a>
      <SystemHeader />

      <main className="max-w-7xl mx-auto border-l border-r border-black min-h-screen">
        <div data-reveal>
          <HeroSection activeSection={activeSection} />
        </div>

        {/* Case studies — sidebar + document viewer */}
        <div id="case-studies" data-reveal className="scroll-mt-12 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          <Sidebar activeSection={activeSection} onSelect={setActiveSection} />
          <CaseStudyViewer activeSection={activeSection} />
        </div>

        <EngineeringNotes />
        <OtherWork />

        {/* KernelLog visible on mobile below case studies */}
        <div className="lg:hidden border-t border-black">
          <KernelLog activeSection={activeSection} />
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
