import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { experiences } from '../../data/portfolio';
import useScrollReveal from '../../hooks/useScrollReveal';

const ExperienceSection = () => {
  const [selectedExp, setSelectedExp] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const { ref: detailRef, isVisible: detailVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Work Experience" subtitle="Where I built real things" />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md p-4 sticky top-24 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-tertiary rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">Career Timeline</h3>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-tertiary to-gray-300 dark:to-gray-600 rounded-full opacity-30"></div>

                <div
                  className="absolute left-4 top-6 w-1 bg-gradient-to-b from-primary to-tertiary rounded-full transition-all duration-500 ease-out shadow-lg"
                  style={{
                    height: `${(selectedExp / (experiences.length - 1)) * 100}%`
                  }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
                </div>

                <div className="space-y-2">
                  {experiences.map((exp, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedExp(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 relative group ${
                        selectedExp === index
                          ? 'bg-gradient-to-r from-primary to-tertiary text-white shadow-lg scale-105 transform'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover-scale-102 hover:shadow-md'
                      }`}
                    >
                      <div className={`absolute left-[-8px] top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        selectedExp === index ? 'z-10' : 'z-0'
                      }`}>
                        {selectedExp === index && (
                          <>
                            <div className="absolute inset-0 w-6 h-6 -translate-x-1 -translate-y-1 bg-primary rounded-full animate-ping opacity-75"></div>
                            <div className="absolute inset-0 w-5 h-5 -translate-x-0.5 -translate-y-0.5 bg-tertiary rounded-full animate-pulse"></div>
                          </>
                        )}

                        <div className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                          selectedExp === index
                            ? 'bg-gradient-to-br from-yellow-300 to-primary border-2 border-white shadow-lg scale-150'
                            : index < selectedExp
                            ? 'bg-gradient-to-br from-primary to-tertiary border-2 border-white shadow-md'
                            : 'bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 group-hover:border-primary group-hover:scale-110'
                        }`}>
                          {selectedExp === index && (
                            <div className="absolute inset-0.5 bg-white rounded-full animate-pulse"></div>
                          )}

                          {index < selectedExp && (
                            <svg className="absolute inset-0 w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="ml-6 relative">
                        {selectedExp === index && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-sm">{exp.company}</div>
                          {selectedExp === index && (
                            <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full animate-bounce">Active</span>
                          )}
                        </div>
                        <div className="text-xs opacity-80 mt-0.5">{exp.period}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div ref={detailRef} className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${detailVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary dark:bg-tertiary text-primary dark:text-gray-800 rounded-full mb-3">
                  {experiences[selectedExp].period}
                </span>
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-2">
                  {experiences[selectedExp].title}
                </h3>
                <h4 className="text-lg text-tertiary dark:text-tertiary font-medium">
                  {experiences[selectedExp].company}
                </h4>
                {experiences[selectedExp].location && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {experiences[selectedExp].location}
                  </p>
                )}
              </div>

              {experiences[selectedExp].images && experiences[selectedExp].images.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <div className="relative h-80 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mb-3">
                      <img
                        src={experiences[selectedExp].images[activeImageIndex[selectedExp] || 0]}
                        alt={`${experiences[selectedExp].company} screenshot ${(activeImageIndex[selectedExp] || 0) + 1}`}
                        className="w-full h-full object-cover transition-all duration-500"
                        loading="lazy"
                        decoding="async"
                      />

                      <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {(activeImageIndex[selectedExp] || 0) + 1} / {experiences[selectedExp].images.length}
                      </div>

                      {experiences[selectedExp].images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex(prev => ({
                                ...prev,
                                [selectedExp]: ((prev[selectedExp] || 0) - 1 + experiences[selectedExp].images.length) % experiences[selectedExp].images.length
                              }));
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                            aria-label="Previous image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex(prev => ({
                                ...prev,
                                [selectedExp]: ((prev[selectedExp] || 0) + 1) % experiences[selectedExp].images.length
                              }));
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                            aria-label="Next image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    {experiences[selectedExp].images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {experiences[selectedExp].images.map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex(prev => ({ ...prev, [selectedExp]: imgIndex }));
                            }}
                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                              (activeImageIndex[selectedExp] || 0) === imgIndex
                                ? 'border-primary dark:border-tertiary scale-105'
                                : 'border-gray-300 dark:border-gray-600 opacity-60 hover:opacity-100'
                            }`}
                            aria-label={`Select image ${imgIndex + 1}`}
                          >
                            <img
                              src={img}
                              alt={`${experiences[selectedExp].company} thumbnail ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {experiences[selectedExp].context && (
                <div className="mb-6 pl-4 border-l-2 border-tertiary dark:border-tertiary">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">{experiences[selectedExp].context}</p>
                </div>
              )}

              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What I actually did</h5>
                <ul className="space-y-3">
                  {experiences[selectedExp].description.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="inline-block w-2 h-2 bg-primary dark:bg-tertiary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  {experiences[selectedExp].tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-sm bg-secondary dark:bg-tertiary text-primary dark:text-gray-800 rounded-md font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
