import React from 'react';
import SectionTitle from './SectionTitle';
import useScrollReveal from '../../hooks/useScrollReveal';

const AboutSection = ({ yearsOfExperience }) => {
  const displayYears = yearsOfExperience ? `${yearsOfExperience}+` : '4+';
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal();
  const { ref: textRef } = useScrollReveal({ rootMargin: '0px 0px -30px 0px' });

  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-secondary dark:bg-gray-800 skew-y-3 z-0"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle title="About Me" subtitle="How it started" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative" ref={imgRef}>
            <div className={`w-full aspect-[4/5] max-h-[520px] bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden relative shadow-2xl ${imgVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
              <img
                src="/images/profile/profile1.jpg"
                alt="Dheeraj Srirama"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-white dark:bg-gray-700 rounded-xl shadow-2xl p-4 flex items-center justify-center ${imgVisible ? 'reveal-visible stagger-2' : 'reveal-hidden'}`}>
              <div className="text-center">
                <div className="font-bold text-3xl text-primary dark:text-tertiary">{displayYears}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Years of Experience</div>
              </div>
            </div>
          </div>

          <div ref={textRef} className={imgVisible ? 'reveal-visible stagger-1' : 'reveal-hidden'}>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-2xl font-bold mb-5 text-primary dark:text-white">
                Software Engineer building scalable systems & AI products (and coffee ☕)
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
                <p>
                  I build and scale systems end-to-end, from customer-facing applications to distributed backend infrastructure, in fast-paced startup environments.
                </p>
                <p>
                  From being a founding engineer at early startups, where I built a full restaurant platform, to working at <strong>Orange Health</strong> scaling payments and async infrastructure, I've built systems that power real-world operations at scale ⚡
                </p>
                <p>
                  After completing my <strong>Master's at The University of Queensland 🇦🇺</strong>, I've been focusing on where AI meets real systems — building document processing pipelines (OCR + LLMs), extraction workflows, and production-ready AI agents 🤖
                </p>
                <p>
                  I enjoy working close to users, owning systems end-to-end, and solving problems that require both strong engineering and product thinking 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
