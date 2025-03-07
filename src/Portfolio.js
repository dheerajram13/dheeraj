import React, { useState, useEffect } from 'react';
import TrailerStyleProjectCard from './TrailerStyleProjectCard';
import { ArrowUpRight, Briefcase, BookOpen, Award, Github, Linkedin, Globe, Mail } from 'lucide-react';


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
`;


const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <p className="inline-block px-3 py-1 text-sm font-medium bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full mb-2 animate-fadeIn">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 animate-fadeIn animation-delay-100">{title}</h2>
      <div className="w-24 h-1 bg-primary dark:bg-tertiary mx-auto rounded-full animate-fadeIn animation-delay-200"></div>
    </div>
  );
};


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Setup scroll event listener for nav highlighting
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 300;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <style>{animationCSS}</style>
      <Navbar activeSection={activeSection} />
      
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
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


const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-tertiary text-white">
      <div className="relative w-24 h-24">
        <div className="absolute w-full h-full border-8 border-white border-opacity-20 rounded-full"></div>
        <div className="absolute w-full h-full border-8 border-transparent border-t-white rounded-full animate-spin"></div>
      </div>
      <h1 className="mt-8 text-2xl font-bold tracking-wider">DHEERAJ SRIRAMA</h1>
      <p className="mt-2 text-white text-opacity-80">Software Engineer</p>
    </div>
  );
};

const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold text-primary dark:text-tertiary">DS</a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              className={`transition-all duration-300 hover:text-primary dark:hover:text-tertiary ${activeSection === link.id ? 'text-primary dark:text-tertiary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white dark:bg-gray-800 px-4 py-2">
          {navLinks.map(link => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              className={`block py-2 transition-all duration-300 hover:text-primary dark:hover:text-tertiary ${activeSection === link.id ? 'text-primary dark:text-tertiary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};


const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-tertiary rounded-full opacity-10 filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary rounded-full opacity-10 filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary rounded-full opacity-10 filter blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center">
          <p className="inline-block px-3 py-1 text-sm font-medium bg-tertiary dark:bg-tertiary text-gray-800 dark:text-gray-800 rounded-full mb-6 animate-fadeIn">Student | Engineer | Builder</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight animate-fadeIn animation-delay-100">
            <span className="text-gray-800 dark:text-white">I'm </span>
            <span className="text-primary dark:text-tertiary">Dheeraj Srirama</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 animate-fadeIn animation-delay-200">
          I love turning ideas into real, scalable products and building smart solutions where technology meets innovation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn animation-delay-300">
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
          
          <div className="flex justify-center gap-6 mt-12 animate-fadeIn animation-delay-400">
            <a href="https://github.com/dheerajram13" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-tertiary transition-all">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/dheerajsrirama" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-tertiary transition-all">
              <Linkedin size={24} />
            </a>
            <a href="mailto:sriramadheeraj@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-tertiary transition-all">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-tertiary transition-all">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-secondary dark:bg-gray-800 skew-y-3 z-0"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle title="About Me" subtitle="Get to know me better" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
          <div className="w-full h-80 bg-white dark:bg-gray-500 rounded-xl overflow-hidden relative animate-fadeIn shadow-lg">
  <img 
    src="/profile.png" 
    alt="Dheeraj Srirama" 
    className="w-full h-full object-cover" 
    width="300"
    height="400"
  />
</div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white dark:bg-gray-700 rounded-lg shadow-xl p-4 flex items-center justify-center animate-fadeIn animation-delay-200">
              <div className="text-center">
                <div className="font-bold text-3xl text-primary dark:text-tertiary">4</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Years of Experience</div>
              </div>
            </div>
          </div>
          
          <div className="animate-fadeIn animation-delay-100">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">
              Software Engineer | AI Enthusiast
              </h3>
              <div className="space-y-4 text-gray-900 dark:text-gray-100">
                <p>
                  I'm a <strong>Software Engineer</strong> with over <strong>4 years of experience</strong>, specializing in Full Stack development. Currently, I'm pursuing my <strong>Master's in Computer Science with a focus on Management</strong> at <strong>The University of Queensland</strong>, where I'm also an active member of the <strong>UQ Computing Society (UQCS)</strong>.
                </p>
                <p>
                  I love turning <strong>ideas into products</strong>—whether it's building scalable applications, optimizing system performance, or designing robust <strong>microservices architectures & intelligent applications </strong>. My expertise spans <strong>API development, database optimization, and cloud infrastructure </strong>. Lately, I've been diving deep into <strong>LLM integration</strong>, exploring how AI can enhance modern applications.
                </p>
                <p>
                  Beyond the technical side, I thrive in fast-paced environments, solving complex problems, and bringing innovative solutions to life. Always excited to build, learn, and push the boundaries of what's possible!
                </p>
              </div>
            </div>
            
           
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const [hoveredExp, setHoveredExp] = useState(null);
  
  const experiences = [
    {
      title: "Software Engineer",
      company: "Orange Health",
      period: "Jan 2022 - Jun 2023",
      description: [
        "Optimized order booking API performance by 30% through parallel processing in Go and database optimizations.",
        "Built a new microservice for payment operations, including payments, refunds, payouts, and settlements, leveraging Python (Django) and Celery for task management.",
        "Refactored 40% of the codebase, enhancing maintainability and reducing incidents using Redis and RabbitMQ.",
        "Led projects including communication service, order funnel, and search improvements."
      ],
      tech: ["Go", "Gin","Gorm", "Python", "PosgresSQL","Django", "Celery", "Redis", "React", "Docker", "AWS"]
    },
    {
      title: "Software Engineer",
      company: "Cimpltech",
      period: "Jan 2021 - Dec 2021",
      description: [
        "Developed backend models and REST APIs for customer app and dashboard using Python and Django.",
        "Improved efficiency by 26% by automating the onboarding process using Python scripting and workflow automation tools.",
        "Improved productivity of customers by 17% through implementing push notifications using Google Firebase.",
        "Reduced customer complaints by 16%, implementing comprehensive API test coverage."
      ],
      tech: ["Python", "Django", "REST API", "Firebase"]
    },
    {
      title: "Software Engineer",
      company: "WaiterBee",
      period: "Mar 2019 - Dec 2020",
      description: [
        "Developed a full-stack web application using Python, Django, HTML, CSS, Javascript.",
        "Enhanced QR code security by 75% with a hybrid AES-RSA encryption, significantly improving data protection.",
        "Created reporting system for sales, products, orders, and employee metrics, increasing productivity by 15%.",
        "Developed a module to send SMS and email to customers.",
        "Designed and developed a QR based food ordering web app with a stunning UI."
      ],
      tech: ["Python", "Django", "HTML/CSS", "JavaScript", "PostgreSQL", "AWS"]
    },
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      period: "Nov 2019 - Feb 2020",
      description: [
        "Worked on multiple freelance projects developing web applications.",
        "Collaborated directly with clients to understand requirements and deliver customized solutions."
      ],
      tech: ["Web Development", "Client Management"]
    },
    {
      title: "Software Engineer Intern",
      company: "Eureka King Inc.",
      period: "Oct 2018 - Nov 2018",
      description: [
        "Worked with REST APIs for the index fund website in a remote internship at Archie.AI.",
        "Wrote scripts to fetch the Binance50 API data to CSV files.",
        "Worked with Ajax to append the API data to the HTML page.",
        "Developed scripts to alter the time interval for fetching the API data.",
        "Designed the website with the Bulma CSS Framework."
      ],
      tech: ["Python", "Node.js", "AWS", "HTML", "Bulma CSS", "Ajax", "jQuery"]
    },
    {
      title: "Full Stack Developer Intern",
      company: "Konigle",
      period: "Jun 2018 - Jul 2018",
      description: [
        "Developed registration forms for the organization and customers in a remote internship.",
        "Integrated login with Google using social django module to the registration forms.",
        "Developed an Android app from scratch with an on-boarding screen, Login, Signup and built a module for sending user information to the administrator via e-mail using SMTP.",
        "Validated user data, used material design and added toast messages."
      ],
      tech: ["Python", "Django", "Vue.js", "SQLite", "HTML/CSS", "Android", "Java", "XML"]
    },
    {
      title: "Software Developer Intern - Conversational AI",
      company: "Devathon (Crypsis Technologies Pvt. Ltd.)",
      period: "Sep 2017 - Feb 2018",
      description: [
        "Developed Eatable (Restaurant Chatbot) which can ask for restaurant recommendations, locate nearest branch of a particular restaurant chain.",
        "Developed a module to query for the timings of a restaurant, to search for the restaurants by name, cuisine, location (nearby), budget, to add/remove from list of favorites.",
        "Implemented the chatbot using Dialog flow NLP engine, Zomato API, Python, Flask for backend and integrated to Facebook Messenger."
      ],
      tech: ["Python", "Flask", "Dialogflow", "API Integration", "Facebook Messenger", "NLP"]
    }
  ];
  
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Work Experience" subtitle="My professional journey" />
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-6 md:left-1/2 w-0.5 h-full bg-tertiary dark:bg-gray-700 transform -translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`mb-12 relative animate-fadeIn ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <div 
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700 relative group cursor-pointer"
                  onMouseEnter={() => setHoveredExp(index)}
                  onMouseLeave={() => setHoveredExp(null)}
                >
                  <div className="absolute top-6 left-6 md:left-1/2 w-6 h-6 bg-primary dark:bg-tertiary rounded-full transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary dark:bg-tertiary text-primary dark:text-gray-800 rounded-full mb-2">{exp.period}</span>
                  <h3 className="text-xl font-bold mb-1 text-primary dark:text-white">{exp.title}</h3>
                  <h4 className="text-tertiary dark:text-tertiary font-medium mb-4">{exp.company}</h4>
                  
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${hoveredExp === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <ul className="text-gray-600 dark:text-gray-300 mb-4 space-y-2 text-left">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary dark:bg-tertiary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-secondary dark:bg-tertiary text-primary dark:text-gray-800 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`text-center text-sm text-gray-500 italic mt-2 transition-opacity duration-300 ${hoveredExp === index ? 'opacity-0' : 'opacity-100'}`}>
                    Hover to see details
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ProjectsSection = () => {
  const projects = [
    {
      title: "Job Application Tracker",
      period: "Jan 2025 - Present",
      description: "Developed a job application tracking website and chrome extension to reduce job tracking time by 75% through one-click URL capture. Leveraged LLM to automate job detail extraction and storage in DB.",
      tech: ["Python", "FastAPI", "PostgreSQL", "React", "Docker", "LLM"],
      tags: ["Full Stack", "AI Integration"],
      image: "/job_tracker.png",
      github: "https://github.com/dheerajram13/job-tracker",
      liveLink: "https://job-tracker-demo.com",
      demoVideo: "/job_tracker.mp4",
      autoplay: true,
      muted: true,
      loop: true,
      detailsLink: "/projects/job-tracker"
    },
    {
      title: "LLM for Network Traffic Generation",
      period: "Sep 2024 - Present",
      description: "Researching synthetic network traffic generation using Large Language Models (LLMs) like GPT-4 to simulate diverse protocols and attack patterns for improved intrusion detection. Addressing challenges in existing datasets, such as 75% imbalance in benign vs. malicious traffic, to enhance the training of Network Intrusion Detection Systems (NIDS).",
      tech: ["GPT-4", "Mininet", "Python", "Docker", "Linux"],
      tags: ["Machine Learning", "AI Research", "Network Security"],
      image: "/network_traffic.png",
      github: "https://github.com/dheerajram13/llm_for_synthetic_traffic_generation",
      detailsLink: "/projects/network-traffic"
    },
    {
      title: "CourseCompanion",
      period: "2023 - 2024",
      description: "Developed a platform for students to upload study materials, collaborate, and seek help. Featuring material management, peer connection, discussion space, and resource exchange to address challenges in managing resources and connecting with peers.",
      tech: ["React.js", "Node.js", "Express", "Firebase", "HTML/CSS"],
      tags: ["Full Stack", "Web App", "Education"],
      image: "/course.png",
      github: "https://github.com/dheerajram13/course-companion",
      liveLink: "https://coursecompanion.com",
      demoVideo: "/course_companion.mp4",
      autoplay: true,
      detailsLink: "/projects/course-companion"
    },
    {
      title: "QuickSettle",
      period: "2023",
      description: "Created an extension to the Westpac mobile app allowing users to quickly settle transactions. Features include automation for detecting individual or group payments, seamless integration with multiple payment methods, and customizable payment links generation.",
      tech: ["Mobile App Development", "Payment API Integration", "UX Design"],
      tags: ["FinTech", "Mobile App", "UX/UI"],
      image: "/quick_settle.png",
      github: "https://github.com/dheerajram13/quick-settle",
      detailsLink: "/projects/quick-settle"
    },
    {
      title: "Spider Package Manager",
      period: "Feb 2018 - May 2018",
      description: "Developed a package manager for Windows OS to install, upgrade, configure, and use software. Tested software installations and uninstallations using PyTest, ensuring compatibility across system architectures.",
      tech: ["Python", "Selenium", "Windows", "Git", "PyTest"],
      tags: ["Desktop App", "System Utility"],
      image: "/spider.png",
      github: "https://github.com/dheerajram13/spider-package-manager",
      demoVideo: "/spider.mp4",
      detailsLink: "/projects/spider-package-manager"
    }
  ];
  

  const processedProjects = projects.map(project => ({
    ...project,
    image: project.image || "/api/placeholder/800/600"
  }));
  
  return (
    <section id="projects" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="inline-block px-3 py-1 text-sm font-medium bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full mb-2 animate-fadeIn">My recent work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 animate-fadeIn animation-delay-100">Projects</h2>
          <div className="w-24 h-1 bg-primary dark:bg-tertiary mx-auto rounded-full animate-fadeIn animation-delay-200"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedProjects.map((project, index) => (
            <div 
              key={index}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TrailerStyleProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const SkillsSection = () => {
  const skills = {
    "Programming Languages": ["Python", "Go", "Java", "JavaScript", "C++"],
    "Frontend": ["React.js", "HTML", "CSS"],
    "Backend": ["Django", "Gin-Gorm", "Flask", "Fast-API"],
    "Databases": ["PostgreSQL", "MySQL", "Firebase Realtime DB"],
    "DevOps": ["Git", "Nginx", "Docker", "Kubernetes", "Docker Swarm"],
    "Others": ["Android Studio", "Redis", "RabbitMQ", "Celery"]
  };
  
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Skills" subtitle="My technical skills" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <div 
              key={category} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-tertiary">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {items.map(skill => (
                  <div key={skill} className="skill-pill">
                    <span className="px-4 py-2 bg-secondary dark:bg-gray-700 rounded-lg border border-tertiary dark:border-gray-600 hover:bg-tertiary hover:text-white dark:hover:bg-gray-600 transition-all">
                      <span className="text-primary dark:text-tertiary font-medium">{skill}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const EducationSection = () => {
  const educations = [
    {
      institution: "The University of Queensland",
      degree: "M.S. in Computer Science (Management)",
      location: "Brisbane, Australia",
      period: "Jul 2023 - Jun 2025 (expected)",
      courses: [ "Machine Learning", "Data Mining","Algorithms & Data Structures", "Information Retrieval and Web Search  ", "Social Media Analytics", "Cloud Computing", "Advanced Database Systems"]
    },
    {
      institution: "SRM University",
      degree: "B.Tech in Computer Science",
      location: "Chennai, India",
      period: "Jul 2015 - May 2019",
      courses: []
    }
  ];
  
  return (
    <section id="education" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Education" subtitle="Academic background" />
        
        <div className="grid md:grid-cols-2 gap-8">
          {educations.map((edu, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-tertiary dark:bg-tertiary rounded-lg">
                  <BookOpen className="w-6 h-6 text-white dark:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-primary dark:text-white">{edu.institution}</h3>
                  <p className="text-tertiary dark:text-tertiary font-medium mb-1">{edu.degree}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 dark:text-gray-300">{edu.location}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = () => {
  const achievements = [
    "Westpac Hackathon 2024 Finalist for innovative solutions.",
    "Awarded Google's Android Developer Nanodegree scholarship via Udacity."
  ];
  
  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Achievements" subtitle="Recognition and awards" />
        
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-primary dark:border-tertiary animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-secondary dark:bg-tertiary rounded-full">
                  <Award className="w-6 h-6 text-primary dark:text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-200 font-medium">{achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Contact Me" subtitle="Get in touch" />
        
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg animate-fadeIn">
          <h3 className="text-2xl font-bold mb-6 text-primary dark:text-white">Contact Information</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Feel free to reach out to me through any of the following channels. I'm always open to new opportunities and collaborations.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-primary dark:text-white">Email</h4>
                <a href="mailto:sriramadheeraj@gmail.com" className="text-tertiary dark:text-tertiary hover:underline">sriramadheeraj@gmail.com</a>
              </div>
            </div>
            
          
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-primary dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">Brisbane, Australia</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-lg font-medium text-primary dark:text-white mb-4">Social Profiles</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/dheerajram13" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-secondary dark:bg-gray-600 text-primary dark:text-gray-300 rounded-full hover:bg-tertiary hover:text-primary dark:hover:bg-tertiary dark:hover:text-white transition-all"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/dheerajsrirama" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-secondary dark:bg-gray-600 text-primary dark:text-gray-300 rounded-full hover:bg-tertiary hover:text-primary dark:hover:bg-tertiary dark:hover:text-white transition-all"
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

// Footer Component
const Footer = () => {
  return (
    <footer className="py-8 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold text-white">Dheeraj Srirama</a>
          </div>
          
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#about" className="hover:text-tertiary transition-all">About</a>
            <a href="#experience" className="hover:text-tertiary transition-all">Experience</a>
            <a href="#projects" className="hover:text-tertiary transition-all">Projects</a>
            <a href="#contact" className="hover:text-tertiary transition-all">Contact</a>
          </div>
          
          <div>
            <p>&copy; {new Date().getFullYear()} Dheeraj Srirama. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Portfolio;