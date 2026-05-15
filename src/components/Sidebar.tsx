import { ChevronRight } from 'lucide-react';
import projects from '../data/projects';
import type { ProjectStatus } from '../data/projects';
import KernelLog from './KernelLog';

interface SidebarProps {
  activeSection: string;
  onSelect: (id: string) => void;
}

const statusDot: Record<ProjectStatus, string> = {
  Active:    'bg-green-500',
  Shipped:   'bg-blue-500',
  Hackathon: 'bg-purple-500',
};

export default function Sidebar({ activeSection, onSelect }: SidebarProps) {
  return (
    <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-black bg-gray-50">
      <div className="p-4 border-b border-black font-mono text-xs font-bold bg-white">
        DIRECTORY ./CASE_STUDIES
      </div>

      <nav className="flex flex-col">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelect(project.id)}
            className={`p-4 text-left font-mono text-sm border-b border-gray-200 hover:bg-orange-50 transition-colors flex justify-between items-center ${
              activeSection === project.id
                ? 'bg-white border-l-4 border-l-orange-600'
                : 'text-gray-500'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[project.status]}`} />
              {project.name}
            </span>
            {activeSection === project.id && <ChevronRight size={14} />}
          </button>
        ))}
      </nav>

      <div className="hidden lg:block border-t border-gray-200">
        <KernelLog activeSection={activeSection} />
      </div>
    </aside>
  );
}
