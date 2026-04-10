import React from 'react';
import { Award } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { achievements } from '../../data/portfolio';
import useScrollReveal from '../../hooks/useScrollReveal';

const AchievementCard = ({ achievement, index }) => {
  const { ref, isVisible } = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const staggerClass = `stagger-${Math.min(index + 1, 5)}`;

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-primary dark:border-tertiary ${isVisible ? `reveal-visible ${staggerClass}` : 'reveal-hidden'}`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 p-2 bg-secondary dark:bg-tertiary rounded-full">
          <Award className="w-6 h-6 text-primary dark:text-white" />
        </div>
        <p className="text-gray-700 dark:text-gray-200 font-medium">{achievement}</p>
      </div>
    </div>
  );
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Achievements" subtitle="Proof it wasn't just me and my laptop" />

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
