import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Project } from '../../types/projects';
import MediaGallery from './MediaGallery';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Stop Lenis smooth scroll while modal is open
    document.documentElement.setAttribute('data-lenis-prevent', '');
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute('data-lenis-prevent');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-detail-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true"></div>
      <div
        ref={dialogRef}
        className="relative z-10 max-w-5xl mx-auto my-10 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <p className="text-sm uppercase tracking-wide text-tertiary font-semibold">Project Detail</p>
            <h2 id="project-detail-title" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h2>
            {project.context && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">{project.context}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close project details"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 md:px-10 py-8 space-y-8 max-h-[80vh] overflow-y-auto" data-lenis-prevent>
          <MediaGallery media={project.media} title={project.title} />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.longDescription || project.shortDescription}
            </p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Highlights</h3>
              <ul className="space-y-2">
                {project.highlights.map((item, index) => (
                  <li key={`${project.id}-highlight-${index}`} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full text-sm bg-secondary dark:bg-gray-800 text-primary dark:text-gray-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.links && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Links</h3>
              <div className="flex flex-wrap gap-3">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold"
                  >
                    Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    GitHub
                  </a>
                )}
                {project.links.architecture && (
                  <a
                    href={project.links.architecture}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Architecture
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
