import React, { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import { initGA, logPageView } from './analytics';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/portfolio/Navbar';
import HeroSection from './components/portfolio/HeroSection';
import AboutSection from './components/portfolio/AboutSection';
import ExperienceSection from './components/portfolio/ExperienceSection';
import ProjectsSection from './components/projects/ProjectsSection';
import SkillsSection from './components/portfolio/SkillsSection';
import EducationSection from './components/portfolio/EducationSection';
import AchievementsSection from './components/portfolio/AchievementsSection';
import ContactSection from './components/portfolio/ContactSection';
import Footer from './components/portfolio/Footer';
import { navLinks } from './data/portfolio';

const animationCSS = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @keyframes float-slow {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animation-delay-100 {
    animation-delay: 0.1s;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .hover-scale-102:hover {
    transform: scale(1.02);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }

    .animate-fadeIn,
    .animate-float,
    .animate-float-slow,
    .animate-shimmer {
      animation: none !important;
    }
  }

  /* Custom color scheme classes */
  .bg-primary {
    background-color: #B85042 !important;
  }

  .bg-secondary {
    background-color: #E7E8D1 !important;
  }

  .bg-tertiary {
    background-color: #A7BEAE !important;
  }

  .text-primary {
    color: #B85042 !important;
  }

  .text-secondary {
    color: #E7E8D1 !important;
  }

  .text-tertiary {
    color: #A7BEAE !important;
  }

  .border-primary {
    border-color: #B85042 !important;
  }

  .border-secondary {
    border-color: #E7E8D1 !important;
  }

  .border-tertiary {
    border-color: #A7BEAE !important;
  }

  /* Scroll reveal system */
  .reveal-hidden {
    opacity: 0;
    transform: translateY(28px);
  }
  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .stagger-1 { transition-delay: 0.1s; }
  .stagger-2 { transition-delay: 0.2s; }
  .stagger-3 { transition-delay: 0.3s; }
  .stagger-4 { transition-delay: 0.4s; }
  .stagger-5 { transition-delay: 0.5s; }

  @media (prefers-reduced-motion: reduce) {
    .reveal-hidden { opacity: 1; transform: none; }
    .reveal-visible { transition: none; }
  }
`;

const getYearsOfExperience = () => {
  // Fixed value: 4 years of experience
  return 4;
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const yearsOfExperience = useMemo(() => getYearsOfExperience(), []);

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, smoothTouch: false });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const sectionElements = navLinks
      .map(link => document.getElementById(link.id))
      .filter(Boolean);

    if (!sectionElements.length) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0.1
      }
    );

    sectionElements.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <style>{animationCSS}</style>
      <CustomCursor />
      <Navbar activeSection={activeSection} />

      <main className="pt-20">
        <HeroSection />
        <AboutSection yearsOfExperience={yearsOfExperience} />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
