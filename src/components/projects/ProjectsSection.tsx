import React, { useMemo, useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionTitle from '../portfolio/SectionTitle';
import { projects } from '../../data/projects';
import { Project, ProjectsFilterKey } from '../../types/projects';
import ProjectsFilters from './ProjectsFilters';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';

const getPriority = (project: Project) => project.priority ?? 0;
const getUpdatedAt = (project: Project) => project.updatedAt || project.createdAt || '';

const sortByPriorityAndUpdated = (a: Project, b: Project) => {
  const priorityDiff = getPriority(b) - getPriority(a);
  if (priorityDiff !== 0) return priorityDiff;
  const dateA = Date.parse(getUpdatedAt(a));
  const dateB = Date.parse(getUpdatedAt(b));
  const safeDateA = Number.isNaN(dateA) ? 0 : dateA;
  const safeDateB = Number.isNaN(dateB) ? 0 : dateB;
  return safeDateB - safeDateA;
};

const sortDefault = (a: Project, b: Project) => {
  const groupRank = (project: Project) => {
    if (project.highlight === 'featured') return 0;
    if (project.category === 'personal') return 1;
    if (project.category === 'contract') return 2;
    if (project.category === 'university') return 3;
    if (project.category === 'research') return 4;
    return 5;
  };

  const groupDiff = groupRank(a) - groupRank(b);
  if (groupDiff !== 0) return groupDiff;
  return sortByPriorityAndUpdated(a, b);
};

const filterProjects = (list: Project[], filter: ProjectsFilterKey) => {
  switch (filter) {
    case 'featured':
      return list.filter(project => project.highlight === 'featured');
    case 'personal':
      return list.filter(project => project.category === 'personal');
    case 'university':
      return list.filter(project => project.category === 'university');
    case 'research':
      return list.filter(project => project.category === 'research');
    case 'contract':
      return list.filter(project => project.category === 'contract');
    default:
      return list;
  }
};

const RevealCard: React.FC<{ project: Project; index: number; onOpen: (p: Project) => void }> = ({ project, index, onOpen }) => {
  const { ref, isVisible } = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const staggerClass = `stagger-${Math.min((index % 5) + 1, 5)}`;
  return (
    <div ref={ref} className={`h-full ${isVisible ? `reveal-visible ${staggerClass}` : 'reveal-hidden'}`}>
      <ProjectCard project={project} onOpen={onOpen} />
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectsFilterKey>('featured');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return [...projects].sort(sortDefault);
    }
    return filterProjects(projects, activeFilter).sort(sortByPriorityAndUpdated);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Projects" subtitle="Product-led builds & research" />

        <div className="mb-8">
          <ProjectsFilters activeFilter={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <RevealCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-300">
              No projects match this filter yet.
            </div>
          )}
        </div>
      </div>

      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default ProjectsSection;
