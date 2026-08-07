import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-orange-600 selection:text-white">
      <SystemHeader />

      <main className="max-w-7xl mx-auto border-l border-r border-black min-h-screen">
        <HeroSection activeSection={activeSection} />

        {/* Case studies — sidebar + document viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
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
