import React from 'react';
import { navLinks } from '../../data/portfolio';

const Footer = () => {
  const footerLinks = navLinks.filter(link => ['about', 'experience', 'projects', 'contact'].includes(link.id));

  return (
    <footer className="py-8 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold text-white">Dheeraj Srirama</a>
          </div>

          <div className="flex gap-6 mb-4 md:mb-0">
            {footerLinks.map(link => (
              <a key={link.id} href={`#${link.id}`} className="hover:text-tertiary transition-all">
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <p>&copy; {new Date().getFullYear()} Dheeraj Srirama. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
