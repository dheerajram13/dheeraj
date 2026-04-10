import React from 'react';
import { ProjectsFilterKey } from '../../types/projects';

const filterOptions: { key: ProjectsFilterKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'all', label: 'All' },
  { key: 'personal', label: 'Personal' },
  { key: 'university', label: 'University' },
  { key: 'research', label: 'Research' }
];

interface ProjectsFiltersProps {
  activeFilter: ProjectsFilterKey;
  onChange: (filter: ProjectsFilterKey) => void;
}

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({ activeFilter, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Project filters">
      {filterOptions.map(option => (
        <button
          key={option.key}
          type="button"
          role="tab"
          aria-selected={activeFilter === option.key}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
            activeFilter === option.key
              ? 'bg-primary text-white border-primary shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
          }`}
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectsFilters;
