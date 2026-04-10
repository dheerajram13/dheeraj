import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks } from '../../data/portfolio';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-tertiary rounded-full opacity-10 filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary rounded-full opacity-10 filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary rounded-full opacity-10 filter blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center">
          <p
            className="inline-block px-3 py-1 text-sm font-medium bg-tertiary dark:bg-tertiary text-gray-800 dark:text-gray-800 rounded-full mb-6 animate-fadeIn"
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
            Software Engineer · Brisbane
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight animate-fadeIn animation-delay-100" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <span className="text-gray-800 dark:text-white">I'm Dheeraj Srirama</span>
          </h1>

          <p
            className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8 animate-fadeIn animation-delay-200"
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
            I love turning ideas into real, scalable products and building smart solutions where technology meets innovation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn animation-delay-400" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <a
              href="#contact"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all"
            >
              Get in touch <ArrowUpRight size={18} />
            </a>
            <a
              href="#projects"
              className="px-6 py-3 bg-secondary text-primary font-medium rounded-lg hover:bg-tertiary hover:text-white transition-all"
            >
              View my work
            </a>
          </div>

          <div className="flex justify-center gap-6 mt-12 animate-fadeIn animation-delay-400" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-tertiary transition-all"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-tertiary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-tertiary transition-all"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-tertiary transition-all text-sm gap-1">
          read the story ↓
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
