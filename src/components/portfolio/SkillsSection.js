import React from 'react';
import SectionTitle from './SectionTitle';
import { skills } from '../../data/portfolio';
import useScrollReveal from '../../hooks/useScrollReveal';

const SkillCard = ({ category, items, index }) => {
  const { ref, isVisible } = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const staggerClass = `stagger-${Math.min((index % 5) + 1, 5)}`;

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${isVisible ? `reveal-visible ${staggerClass}` : 'reveal-hidden'}`}
    >
      <h3 className="text-sm font-bold mb-3 text-primary dark:text-tertiary uppercase tracking-wide">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(skill => (
          <span
            key={skill}
            className="relative px-3 py-1 text-xs bg-secondary dark:bg-gray-700 text-primary dark:text-gray-300 rounded-md group cursor-default transition-colors hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white"
          >
            {skill}
            <span className="absolute inset-0 rounded-md ring-0 group-hover:ring-2 group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Skills" subtitle="Tools I actually use in production" />

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-10 max-w-xl mx-auto">
          Grouped by what I build with them — not just a list of things I've touched.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <SkillCard key={category} category={category} items={items} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
