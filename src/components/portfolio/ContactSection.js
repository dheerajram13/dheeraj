import React from 'react';
import { Github, Linkedin, Globe, Mail } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { socialLinks } from '../../data/portfolio';
import useScrollReveal from '../../hooks/useScrollReveal';

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="contact" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Get in Touch" subtitle="Let's talk about what you're building" />

        <div ref={ref} className={`max-w-2xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          <h3 className="text-2xl font-bold mb-6 text-primary dark:text-white">Contact</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            I'm looking for backend or full-stack engineering roles where AI and ML are a real part of the product — not just a buzzword in the job description. Based in Brisbane, open to remote or relocation.
            <br /><br />
            If you're building something interesting, I'd like to hear about it.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-primary dark:text-white">Email</h4>
                <a href={`mailto:${socialLinks.email}`} className="text-tertiary dark:text-tertiary hover:underline">{socialLinks.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-primary dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">{socialLinks.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-medium text-primary dark:text-white mb-4">Social Profiles</h4>
            <div className="flex gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary dark:bg-gray-600 text-primary dark:text-gray-300 rounded-full hover:bg-tertiary hover:text-primary dark:hover:bg-tertiary dark:hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary dark:bg-gray-600 text-primary dark:text-gray-300 rounded-full hover:bg-tertiary hover:text-primary dark:hover:bg-tertiary dark:hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
