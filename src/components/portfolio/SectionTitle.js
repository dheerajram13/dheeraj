import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const SectionTitle = ({ title, subtitle }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div className="text-center mb-12" ref={ref}>
      <p className={`inline-block px-3 py-1 text-sm font-medium bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full mb-2 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
        {subtitle}
      </p>
      <h2 className={`text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 ${isVisible ? 'reveal-visible stagger-1' : 'reveal-hidden'}`}>
        {title}
      </h2>
      <div className={`w-24 h-1 bg-primary dark:bg-tertiary mx-auto rounded-full ${isVisible ? 'reveal-visible stagger-2' : 'reveal-hidden'}`}></div>
    </div>
  );
};

export default SectionTitle;
