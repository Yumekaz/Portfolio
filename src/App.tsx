import { useState } from 'react';
import SystemHeader from './components/SystemHeader';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import CaseStudyViewer from './components/CaseStudyViewer';
import KernelLog from './components/KernelLog';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('miniDocker');

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-orange-600 selection:text-white">
      <SystemHeader />

      <main className="max-w-7xl mx-auto border-l border-r border-black min-h-screen">
        <HeroSection />

        {/* Case studies — sidebar + document viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          <Sidebar activeSection={activeSection} onSelect={setActiveSection} />
          <CaseStudyViewer activeSection={activeSection} />
        </div>

        {/* Kernel log sits visually after the case studies on smaller screens */}
        <div className="lg:hidden border-t border-black">
          <KernelLog />
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
