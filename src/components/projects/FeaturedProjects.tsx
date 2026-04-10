import React from 'react';
import { Project } from '../../types/projects';
import ProjectCard from './ProjectCard';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, onSelect }) => {
  if (!projects.length) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-tertiary font-semibold">Featured Projects</p>
          <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-white">Recruiter Highlights</h3>
        </div>
        <span className="hidden md:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">Featured</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onOpen={onSelect} variant="featured" />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
