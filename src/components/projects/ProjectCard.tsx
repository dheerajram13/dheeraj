import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types/projects';
import useTilt from '../../hooks/useTilt';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  variant?: 'default' | 'featured';
}

const categoryBadgeStyles: Record<string, string> = {
  personal: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200',
  university: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200',
  research: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200',
  contract: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
};

const categoryLabels: Record<string, string> = {
  personal: 'Personal',
  university: 'University',
  research: 'Research',
  contract: 'Contract'
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, variant = 'default' }) => {
  const tiltRef = useTilt(5);
  const preview = project.media?.[0];
  const previewSrc = preview?.type === 'video' ? preview.poster : preview?.src;
  const previewAlt = preview?.alt || `${project.title} preview`;

  return (
    <div
      ref={tiltRef}
      className={`group h-full rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-shadow hover:shadow-xl ${
        variant === 'featured' ? 'p-6 md:p-8' : 'p-5'
      }`}
    >
      <div className={`relative w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700`} style={{ aspectRatio: variant === 'featured' ? '21/9' : '4/3' }}>
        {previewSrc ? (
          <img
            src={previewSrc}
            alt={previewAlt}
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-300 bg-gradient-to-br from-secondary to-white">
            Media preview coming soon
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {/* Problem statement — the hook */}
        {project.problem && (
          <p className="text-xs text-gray-400 dark:text-gray-500 italic leading-relaxed border-l-2 border-tertiary pl-2">
            {project.problem}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {project.highlight === 'featured' && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white">
              Featured
            </span>
          )}
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryBadgeStyles[project.category]}`}>
            {categoryLabels[project.category]}
          </span>
          {project.tags?.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <div>
          <h3 className={`font-bold text-gray-900 dark:text-white ${variant === 'featured' ? 'text-2xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          {project.context && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">{project.context}</p>
          )}
        </div>

        {/* What I built */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        {/* First 2 highlights as checkmarks */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-1">
            {project.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span className="text-primary dark:text-tertiary mt-0.5 flex-shrink-0">✓</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map(tech => (
            <span
              key={tech}
              className="px-3 py-1 text-xs bg-secondary dark:bg-gray-700 text-primary dark:text-gray-200 rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-opacity-90 transition-all"
          >
            View details
          </button>

          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <ExternalLink size={16} /> Demo
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <Github size={16} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
