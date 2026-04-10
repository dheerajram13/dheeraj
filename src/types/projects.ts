export type ProjectHighlight = 'featured' | 'normal';
export type ProjectCategory = 'personal' | 'research' | 'contract' | 'university';
export type ProjectMediaType = 'image' | 'gif' | 'video';

export interface ProjectLinks {
  demo?: string;
  github?: string;
  caseStudy?: string;
  architecture?: string;
  publication?: string;
}

export interface ProjectMedia {
  type: ProjectMediaType;
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  highlight: ProjectHighlight;
  category: ProjectCategory;
  techStack: string[];
  tags?: string[]; // e.g., 'Full-stack', 'AI', 'LLM', 'Hackathon', 'Research', 'ML'
  context?: string; // e.g., 'Hackathon Finalist', 'Thesis Project', 'Client: Finance Industry'
  problem?: string;
  highlights?: string[];
  createdAt?: string;
  updatedAt?: string;
  priority?: number;
  links?: ProjectLinks;
  media?: ProjectMedia[];
}

export type ProjectsFilterKey = 'all' | 'featured' | 'personal' | 'research' | 'contract' | 'university';
