import React from 'react';
import { BookOpen } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { educations } from '../../data/portfolio';
import useScrollReveal from '../../hooks/useScrollReveal';

const EducationCard = ({ edu, index }) => {
  const { ref, isVisible } = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const staggerClass = `stagger-${Math.min(index + 1, 5)}`;

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 ${isVisible ? `reveal-visible ${staggerClass}` : 'reveal-hidden'}`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 p-2 bg-tertiary dark:bg-tertiary rounded-lg">
          <BookOpen className="w-6 h-6 text-white dark:text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1 text-primary dark:text-white">{edu.institution}</h3>
          <p className="text-tertiary dark:text-tertiary font-medium mb-2">{edu.degree}</p>
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300 mb-1">{edu.location}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
          </div>

          {edu.courses.length > 0 && (
            <>
              <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {edu.courses.map((course, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-secondary dark:bg-gray-600 text-primary dark:text-gray-300 rounded">
                    {course}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Education" subtitle="Where I learned to Google efficiently" />

        <div className="grid md:grid-cols-2 gap-8">
          {educations.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
