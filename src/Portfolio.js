import React, { useState, useEffect } from 'react';
import TrailerStyleProjectCard from './TrailerStyleProjectCard';
import { ArrowUpRight, BookOpen, Award, Github, Linkedin, Globe, Mail } from 'lucide-react';


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
        <SectionTitle title="About Me" subtitle="The human behind the code ☕" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
          <div className="w-full aspect-[6/5] max-h-[450px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden relative animate-fadeIn shadow-lg">
  <img
    src="/profile.png"
    alt="Dheeraj Srirama"
    className="w-full h-full object-cover object-top"
    width="3061"
    height="2629"
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
              Software Engineer specializing in AI/ML <span className="text-lg">(and coffee ☕)</span>
              </h3>
              <div className="space-y-4 text-gray-900 dark:text-gray-100">
                <p>
                  I'm a <strong>Software Engineer</strong> with <strong>4+ years of experience</strong> building scalable applications 🚀, from QR-based ordering systems to microservices architectures deployed on cloud platforms. I recently <strong>graduated with a Master's in Computer Science (Management)</strong> from <strong>The University of Queensland</strong> in Brisbane, Australia 🇦🇺, where I deepened my expertise in <strong>AI/ML and Data Science</strong>.
                </p>
                <p>
                  My journey started with <strong>full-stack development</strong>—building REST APIs, optimizing databases, and deploying production systems. Along the way, I discovered my passion for <strong>AI and machine learning</strong> 🤖, working on projects ranging from <strong>ML-powered invoice processing systems</strong> to <strong>synthetic network traffic generation using LLMs</strong>. Now, I'm excited to bring together my <strong>software engineering foundation</strong> with my <strong>AI/ML skills</strong> to build intelligent, data-driven applications 💡.
                </p>
                <p>
                  Whether it's developing production-ready software 💻, training ML models 📊, or extracting insights from data, I love solving complex problems and learning new technologies. Currently based in <strong>Brisbane, Australia</strong> 🌏, and always excited to build something amazing!
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
  const [selectedExp, setSelectedExp] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState({});

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
        "Designed and developed entire QR-based food ordering platform from scratch to digitize restaurant operations, enabling customers to scan QR codes and place orders directly while allowing managers/kitchen staff to monitor orders in real-time.",
        "Built comprehensive REST APIs and integrated third-party services including Google OAuth, Stripe payments, and Twilio SMS notifications for seamless customer experience.",
        "Enhanced QR code security by 75% with hybrid AES-RSA encryption, significantly improving data protection for restaurant transactions.",
        "Created reporting dashboard for sales, products, orders, and employee metrics, increasing operational productivity by 15%.",
        "Architected database schema and deployed full-stack application on AWS with PostgreSQL, Bootstrap UI, and jQuery for responsive interactions."
      ],
      tech: ["Python", "Django", "REST API", "PostgreSQL", "AWS", "Stripe", "Twilio", "Google OAuth", "Bootstrap", "jQuery"],
      images: [
        "/waiterbee1.png",
        "/waiterbee2.png",
        "/waiterbee3.png",
        "/waiterbee4.png",
        "/waiterbee5.png"
      ]
    },
    {
      title: "Freelance (Full Stack Developer)",
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
        <SectionTitle title="Work Experience" subtitle="Where the magic happened 🚀" />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Company List with Animated Timeline */}
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
                {/* Animated Timeline Line */}
                <div className="absolute left-4 top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-tertiary to-gray-300 dark:to-gray-600 rounded-full opacity-30"></div>

                {/* Active Progress Line */}
                <div
                  className="absolute left-4 top-6 w-1 bg-gradient-to-b from-primary to-tertiary rounded-full transition-all duration-500 ease-out shadow-lg"
                  style={{
                    height: `${(selectedExp / (experiences.length - 1)) * 100}%`
                  }}
                >
                  {/* Pulsing dot at the end of progress */}
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
                      {/* Timeline Dot with Ripple Effect */}
                      <div className={`absolute left-[-8px] top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        selectedExp === index ? 'z-10' : 'z-0'
                      }`}>
                        {/* Outer ripple ring - only for active */}
                        {selectedExp === index && (
                          <>
                            <div className="absolute inset-0 w-6 h-6 -translate-x-1 -translate-y-1 bg-primary rounded-full animate-ping opacity-75"></div>
                            <div className="absolute inset-0 w-5 h-5 -translate-x-0.5 -translate-y-0.5 bg-tertiary rounded-full animate-pulse"></div>
                          </>
                        )}

                        {/* Main dot */}
                        <div className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                          selectedExp === index
                            ? 'bg-gradient-to-br from-yellow-300 to-primary border-2 border-white shadow-lg scale-150'
                            : index < selectedExp
                            ? 'bg-gradient-to-br from-primary to-tertiary border-2 border-white shadow-md'
                            : 'bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 group-hover:border-primary group-hover:scale-110'
                        }`}>
                          {/* Inner sparkle for active */}
                          {selectedExp === index && (
                            <div className="absolute inset-0.5 bg-white rounded-full animate-pulse"></div>
                          )}

                          {/* Check mark for completed */}
                          {index < selectedExp && (
                            <svg className="absolute inset-0 w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="ml-6 relative">
                        {/* Shine effect on active */}
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

          {/* Right Side - Experience Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fadeIn">
              {/* Header */}
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
              </div>

              {/* Image Showcase - Only for experiences with images */}
              {experiences[selectedExp].images && experiences[selectedExp].images.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    {/* Main Image Display */}
                    <div className="relative h-80 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mb-3">
                      <img
                        src={experiences[selectedExp].images[activeImageIndex[selectedExp] || 0]}
                        alt={`${experiences[selectedExp].company} screenshot ${(activeImageIndex[selectedExp] || 0) + 1}`}
                        className="w-full h-full object-cover transition-all duration-500"
                      />

                      {/* Image Counter */}
                      <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {(activeImageIndex[selectedExp] || 0) + 1} / {experiences[selectedExp].images.length}
                      </div>

                      {/* Navigation Arrows */}
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
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Strip */}
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
                          >
                            <img
                              src={img}
                              alt={`${experiences[selectedExp].company} thumbnail ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Responsibilities & Achievements</h5>
                <ul className="space-y-3">
                  {experiences[selectedExp].description.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="inline-block w-2 h-2 bg-primary dark:bg-tertiary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
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


const ProjectsSection = () => {
  const projects = [
    {
      title: "Drosophila Gender Classification using ML",
      period: "Apr 2024 - May 2024",
      description: "Applied machine learning algorithms (KNN, Decision Trees, Logistic Regression) to classify Drosophila gender based on morphological features. Achieved 94.8% accuracy through feature engineering and hyperparameter tuning, with comprehensive model comparison and optimization.",
      tech: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
      tags: ["Machine Learning", "Data Science", "Classification"],
      image: "/ml_drosophila.png",
      github: "https://github.com/dheerajram13/drosophila-classification",
      detailsLink: "/projects/drosophila-classification",
      detailedInfo: {
        objective: "To apply and compare various machine learning algorithms for classifying Drosophila gender based on morphological and environmental features, analyzing model performance and optimization strategies.",
        dataset: {
          description: "Drosophila dataset containing 1,731 samples with 16 features including geographic location, environmental conditions, wing morphology, and asymmetry measurements",
          features: ["Wing Area", "Wing Shape", "Wing Vein", "Temperature", "Geographic Location (Latitude/Longitude)", "Species", "Population"],
          preprocessing: [
            "Handled missing values using mean imputation for numerical features and mode for categorical features",
            "Feature selection: Reduced from 16 to 12 columns (dropped Years-start, Year-end, Vial, Replicate)",
            "Train-test split: 70/30"
          ]
        },
        methodology: [
          {
            algorithm: "K-Nearest Neighbors (KNN)",
            approach: "Distance-based classification using optimal K value",
            optimization: "Cross-validation, feature engineering, hyperparameter tuning (optimal K=5)",
            initialAccuracy: "56.1%",
            finalAccuracy: "94.8%"
          },
          {
            algorithm: "Decision Trees",
            approach: "Tree-based classification with automatic feature selection",
            optimization: "Tuned max_depth=5, min_samples_split=2, min_samples_leaf=4",
            initialAccuracy: "91.7%",
            finalAccuracy: "91.8%"
          },
          {
            algorithm: "Logistic Regression",
            approach: "Linear classification with regularization",
            optimization: "Regularization parameter tuning (C parameter)",
            initialAccuracy: "94.8%",
            finalAccuracy: "94.8%"
          }
        ],
        keyFindings: [
          "Wing Area emerged as the most predictive feature (importance ~0.55) across all models",
          "Physical traits (wing morphology) significantly outperformed geographic features in prediction power",
          "KNN showed dramatic improvement (56.1% → 94.8%) with proper feature engineering, demonstrating sensitivity to feature quality",
          "Logistic Regression achieved consistent high performance (94.8%) with minimal tuning, showing stability",
          "Decision Trees optimal depth of 5-6 balanced complexity and generalization"
        ],
        results: {
          bestModels: ["KNN (94.8%)", "Logistic Regression (94.8%)"],
          metrics: [
            "High ROC-AUC score of 0.99 for Logistic Regression",
            "Excellent precision-recall balance across all optimized models",
            "Confusion matrices showed some class imbalance in misclassification rates"
          ]
        },
        challenges: [
          "Initial low KNN accuracy (56.1%) due to irrelevant features affecting distance calculations",
          "Decision Tree overfitting with depth > 6, requiring careful hyperparameter tuning",
          "Feature scaling sensitivity in KNN requiring proper normalization",
          "Class imbalance between male and female samples affecting prediction bias"
        ],
        insights: [
          "Feature engineering is critical for distance-based algorithms like KNN",
          "Model interpretability varies: Decision Trees > Logistic Regression > KNN",
          "Computational efficiency: Logistic Regression > Decision Trees > KNN",
          "Generalization: Proper validation essential to prevent overfitting, especially for tree-based models"
        ],
        futureWork: [
          "Implement ensemble methods (Stacking Classifier, Random Forest, XGBoost)",
          "Address class imbalance using SMOTE or class weighting",
          "Explore feature interaction analysis",
          "Apply dimensionality reduction techniques (PCA, t-SNE)"
        ]
      }
    },
    {
      title: "Synthetic Traffic Generation Using LLMs",
      period: "Sep 2024 - Mar 2025",
      description: "Researched synthetic network traffic generation using Large Language Models (Claude, ChatGPT, Grok-3, Gemini) with LangChain to simulate network protocols (IPv4, ICMP, ARP) for improved intrusion detection. Achieved 100% accuracy with few-shot learning across multiple models, addressing dataset limitations like imbalance and outdated data in existing NIDS datasets.",
      tech: ["Claude", "ChatGPT", "Grok-3", "Gemini", "LangChain", "Python", "Mininet", "Docker", "tcpdump"],
      tags: ["Machine Learning", "AI Research", "Network Security"],
      image: "/network_traffic.png",
      github: "https://github.com/dheerajram13/llm_for_synthetic_traffic_generation",
      detailsLink: "/projects/network-traffic",
      detailedInfo: {
        objective: "To improve the effectiveness and reliability of network traffic collection by using Large Language Models to generate synthetic network data and validate it, addressing limitations in existing datasets such as UNSW_NB15 which are outdated, imbalanced, lack complexity, and have limited scalability.",
        background: {
          problem: "Network Intrusion Detection Systems (NIDS) rely on datasets that are outdated, imbalanced (benign vs. malicious traffic), lack complexity, and have limited scalability. These limitations affect the training and performance of intrusion detection systems.",
          solution: "Leverage state-of-the-art Large Language Models to generate synthetic network traffic data across multiple protocols, evaluating their performance using zero-shot, one-shot, and n-shot learning paradigms."
        },
        methodology: [
          {
            approach: "Zero-Shot Learning",
            description: "Models generate network traffic without any examples, relying solely on their pre-trained knowledge of network protocols",
            optimization: "Evaluated baseline performance across all models using standardized prompts via LangChain",
            accuracyRange: {
              ipv4: "73.17% - 87.58%",
              icmp: "0% - 100%",
              arp: "92% - 100%"
            },
            topPerformers: {
              ipv4: "Grok-3 (87.58%)",
              icmp: "Gemini 2.5 Pro, Gemini 2.5 Flash, Grok-3 (100%)",
              arp: "Claude, ChatGPT, Gemini 2.5 Pro, Gemini 2.5 Flash (100%)"
            }
          },
          {
            approach: "One-Shot Learning",
            description: "Models provided with a single example before generating traffic to guide output format and field structure",
            optimization: "Single exemplar prompt engineering through LangChain to demonstrate expected protocol field values",
            accuracyRange: {
              ipv4: "73.17% - 87.58%",
              icmp: "98% - 100%",
              arp: "95% - 100%"
            },
            topPerformers: {
              ipv4: "Grok-3 (87.58%)",
              icmp: "Claude, ChatGPT, Gemini 2, Gemini 2.5 Flash, Grok-3 (100%)",
              arp: "Claude, ChatGPT, Gemini 2.5 Pro, Gemini 2.5 Flash (100%)"
            },
            improvement: "Significant ICMP improvement for ChatGPT (0% → 100%) and Gemini 2 (0% → 100%)"
          },
          {
            approach: "N-Shot Learning (5 examples)",
            description: "Models provided with five diverse examples showcasing various protocol scenarios and edge cases",
            optimization: "Multi-example prompt engineering with diverse scenarios using LangChain for consistent delivery",
            accuracyRange: {
              ipv4: "78% - 100%",
              icmp: "99% - 100%",
              arp: "96% - 100%"
            },
            topPerformers: {
              ipv4: "ChatGPT (100%)",
              icmp: "ChatGPT, Gemini 2, Gemini 2.5 Pro, Gemini 2.5 Flash (100%)",
              arp: "Claude, ChatGPT, Gemini 2.5 Pro, Gemini 2.5 Flash (100%)"
            },
            improvement: "Dramatic improvements: Claude IPv4 (73.17% → 97.58%), ChatGPT IPv4 (83.33% → 100%)",
            anomaly: "Grok-3 IPv4 unexpectedly decreased (87.58% → 78%)"
          }
        ],
        protocols: [
          {
            name: "IPv4 (Internet Protocol version 4)",
            complexity: "Medium - Most challenging due to complex fields such as checksum calculation",
            fields: "Version, IHL, Type of Service, Total Length, Identification, Flags, Fragment Offset, TTL, Protocol, Header Checksum, Source/Destination Addresses",
            description: "IPv4 packet generation proved to be the most challenging task across all models. ChatGPT achieved perfect performance (100%) in the N-shot scenario, representing the highest accuracy among all evaluated models. Gemini 2.5 Flash demonstrated the second-best performance at 99.75%, while Claude showed remarkable learning efficiency.",
            performanceByModel: [
              { model: "ChatGPT", initialAccuracy: "83.33%", finalAccuracy: "100%", improvement: "+16.67%" },
              { model: "Gemini 2.5 Flash", initialAccuracy: "79.17%", finalAccuracy: "99.75%", improvement: "+20.58%" },
              { model: "Claude", initialAccuracy: "73.17%", finalAccuracy: "97.58%", improvement: "+24.41%", note: "Remarkable learning efficiency" },
              { model: "Grok-3", initialAccuracy: "87.58%", finalAccuracy: "78.00%", improvement: "-9.58%", note: "Unexpected performance decrease" },
              { model: "Gemini 2.5 Pro", initialAccuracy: "75.00%", finalAccuracy: "85.42%", improvement: "+10.42%" },
              { model: "Gemini 2", initialAccuracy: "83.33%", finalAccuracy: "83.33%", improvement: "0%", note: "No improvement observed" }
            ],
            bestAccuracy: "100% (ChatGPT with N-shot learning)",
            zeroShotRange: "73.17% - 87.58%",
            nShotRange: "78.00% - 100%"
          },
          {
            name: "ICMP (Internet Control Message Protocol)",
            complexity: "Low - Highest overall accuracy due to limited fields and lower complexity",
            fields: "Type, Code, Checksum, Identifier, Sequence Number",
            description: "ICMP protocol showed the highest overall accuracy across models due to its limited fields and lower complexity. All models achieved 100% accuracy in N-shot learning, with most reaching perfect scores even in one-shot scenarios.",
            performanceByModel: [
              { model: "ChatGPT", initialAccuracy: "0.00%", finalAccuracy: "100%", improvement: "+100%", note: "Dramatic improvement from zero-shot" },
              { model: "Gemini 2.5 Flash", initialAccuracy: "100%", finalAccuracy: "100%", improvement: "0%", note: "Perfect consistency" },
              { model: "Gemini 2.5 Pro", initialAccuracy: "100%", finalAccuracy: "100%", improvement: "0%", note: "Perfect consistency" },
              { model: "Grok-3", initialAccuracy: "100%", finalAccuracy: "99.00%", improvement: "-1%", note: "Minimal decrease" },
              { model: "Claude", initialAccuracy: "98.00%", finalAccuracy: "99.00%", improvement: "+1%" },
              { model: "Gemini 2", initialAccuracy: "0.00%", finalAccuracy: "100%", improvement: "+100%", note: "Dramatic improvement from zero-shot" }
            ],
            bestAccuracy: "100% (Multiple models achieved perfect accuracy)",
            zeroShotRange: "0% - 100%",
            nShotRange: "99% - 100%"
          },
          {
            name: "ARP (Address Resolution Protocol)",
            complexity: "High (for LLMs) - Complex address mapping between hardware and protocol addresses",
            fields: "Hardware Type, Protocol Type, Hardware/Protocol Address Length, Operation, Sender/Target Hardware and Protocol Addresses",
            description: "ARP generation showed varied performance across models. Most models maintained high accuracy (>95%) throughout all learning paradigms. ChatGPT, Claude, Gemini 2.5 Pro, and Gemini 2.5 Flash all achieved perfect 100% accuracy in N-shot learning.",
            performanceByModel: [
              { model: "ChatGPT", initialAccuracy: "100%", finalAccuracy: "100%", improvement: "0%", note: "Perfect consistency" },
              { model: "Gemini 2.5 Flash", initialAccuracy: "100%", finalAccuracy: "100%", improvement: "0%", note: "Perfect consistency" },
              { model: "Gemini 2.5 Pro", initialAccuracy: "100%", finalAccuracy: "100%", improvement: "0%", note: "Perfect consistency" },
              { model: "Claude", initialAccuracy: "100%", finalAccuracy: "100%", improvement: "0%", note: "Perfect consistency" },
              { model: "Grok-3", initialAccuracy: "95.00%", finalAccuracy: "98.00%", improvement: "+3%" },
              { model: "Gemini 2", initialAccuracy: "92.00%", finalAccuracy: "96.00%", improvement: "+4%" }
            ],
            bestAccuracy: "100% (ChatGPT, Claude, Gemini 2.5 Pro, Gemini 2.5 Flash)",
            zeroShotRange: "92% - 100%",
            nShotRange: "96% - 100%"
          }
        ],
        models: [
          {
            name: "ChatGPT",
            strength: "Excellent learning from examples - achieved 100% across all protocols with 5 examples",
            performance: "Strong improvement: IPv4 (83.33% → 100%), ICMP (0% → 100%), ARP (83.33% → 100%)"
          },
          {
            name: "Gemini 2.5 Flash",
            strength: "Outstanding N-shot learning capability with near-perfect accuracy",
            performance: "Exceptional: IPv4 (79.17% → 99.75%), ICMP (100% consistently), ARP (100% consistently)"
          },
          {
            name: "Gemini 2.5 Pro",
            strength: "Consistent high performance across all learning paradigms",
            performance: "Steady: IPv4 (75% → 85.42%), ICMP (100% → 100%), ARP (100% consistently)"
          },
          {
            name: "Claude",
            strength: "High zero-shot accuracy and significant N-shot improvement",
            performance: "Progressive: IPv4 (73.17% → 97.58%), ICMP (98% → 99%), ARP (100% consistently)"
          },
          {
            name: "Grok-3",
            strength: "Best zero-shot IPv4 performance across all models",
            performance: "Strong start: IPv4 (87.58% → 78%), ICMP (100% → 99%), ARP (95% → 98%)"
          },
          {
            name: "Gemini 2",
            strength: "Improved learning from zero-shot to N-shot for ARP protocol",
            performance: "Gradual improvement: IPv4 (83.33% consistently), ICMP (0% → 100%), ARP (92% → 96%)"
          }
        ],
        performanceTable: {
          title: "Table 3: Results of All Models Across Different Learning Paradigms",
          description: "Comprehensive performance comparison using LangChain for prompt orchestration showing accuracy percentages for IPv4, ICMP, and ARP protocol generation across zero-shot, one-shot, and N-shot learning scenarios.",
          data: [
            { model: "Claude", zeroShot: { ipv4: "73.17%", icmp: "98.00%", arp: "100.00%" }, oneShot: { ipv4: "73.17%", icmp: "100.00%", arp: "100.00%" }, nShot: { ipv4: "97.58%", icmp: "99.00%", arp: "100.00%" } },
            { model: "ChatGPT", zeroShot: { ipv4: "83.33%", icmp: "0.00%", arp: "100.00%" }, oneShot: { ipv4: "83.33%", icmp: "100.00%", arp: "100.00%" }, nShot: { ipv4: "100.00%", icmp: "100.00%", arp: "100.00%" } },
            { model: "Grok-3", zeroShot: { ipv4: "87.58%", icmp: "100.00%", arp: "95.00%" }, oneShot: { ipv4: "87.58%", icmp: "100.00%", arp: "97.00%" }, nShot: { ipv4: "78.00%", icmp: "99.00%", arp: "98.00%" } },
            { model: "Gemini 2.5 Pro", zeroShot: { ipv4: "75.00%", icmp: "100.00%", arp: "100.00%" }, oneShot: { ipv4: "85.42%", icmp: "98.00%", arp: "100.00%" }, nShot: { ipv4: "85.42%", icmp: "100.00%", arp: "100.00%" } },
            { model: "Gemini 2.5 Flash", zeroShot: { ipv4: "79.17%", icmp: "100.00%", arp: "100.00%" }, oneShot: { ipv4: "79.17%", icmp: "100.00%", arp: "100.00%" }, nShot: { ipv4: "99.75%", icmp: "100.00%", arp: "100.00%" } },
            { model: "Gemini 2", zeroShot: { ipv4: "83.33%", icmp: "0.00%", arp: "92.00%" }, oneShot: { ipv4: "83.33%", icmp: "100.00%", arp: "95.00%" }, nShot: { ipv4: "83.33%", icmp: "100.00%", arp: "96.00%" } }
          ]
        },
        experimentSetup: [
          "Hardware: MacBook Air M1 (8GB RAM) with macOS 13.3",
          "Virtualization: Docker image docker-ryu-mininet for running Mininet",
          "LLM Integration: LangChain framework for prompt orchestration and model interaction",
          "Traffic Capture: tcpdump tool in Mininet for capturing network packets",
          "Data Extraction: JSON format for easy comparison with ground truth",
          "Evaluation: Python script comparing LLM-generated data with real traffic from Mininet"
        ],
        keyFindings: [
          "ChatGPT and Gemini 2.5 Flash both achieved perfect 100% accuracy across all protocols with N-shot learning",
          "Gemini 2.5 Flash demonstrated the best overall N-shot performance with 99.75% IPv4 accuracy and 100% for both ICMP and ARP",
          "ICMP protocol showed highest overall accuracy across models due to its limited fields and lower complexity",
          "LangChain framework enabled consistent prompt engineering and efficient model interaction across all LLMs",
          "Providing examples significantly improved model performance - N-shot learning showed substantial gains over zero-shot",
          "Zero-shot performance varied widely by protocol: Grok-3 led with 87.58% IPv4, while ChatGPT and Gemini 2 struggled with ICMP (0%)",
          "Claude showed remarkable improvement in N-shot learning: IPv4 (73.17% → 97.58%)",
          "Grok-3's performance unexpectedly decreased with more examples for IPv4 (87.58% → 78%), suggesting potential overfitting to examples",
          "All models achieved 100% ARP accuracy in zero-shot except Gemini 2 (92%) and Grok-3 (95%)",
          "Learning efficiency demonstrated: high accuracy achieved with minimal input (1-5 examples) using structured prompts via LangChain"
        ],
        results: {
          overallAccuracy: "ChatGPT and Gemini 2.5 Flash both achieved 100% accuracy across all protocols with N-shot learning",
          bestPerformers: [
            "ChatGPT (100% all protocols in N-shot)",
            "Gemini 2.5 Flash (99.75% IPv4, 100% ICMP & ARP in N-shot)",
            "Claude (97.58% IPv4, 99% ICMP, 100% ARP in N-shot)",
            "Grok-3 (87.58% IPv4 zero-shot - highest among all models)"
          ],
          metrics: [
            "5 out of 6 models achieved 100% accuracy for ICMP in N-shot learning",
            "All models except Gemini 2 achieved >78% accuracy for IPv4 across all learning paradigms",
            "9 out of 18 model-paradigm combinations achieved 100% ARP accuracy",
            "Zero-shot to N-shot improvement: ChatGPT IPv4 (+16.67%), Claude IPv4 (+24.41%)",
            "Field-level accuracy validated against ground truth from Mininet captures using LangChain-orchestrated prompts"
          ]
        },
        challenges: [
          "Checksum calculation - models initially struggled without examples",
          "ARP protocol complexity - lower accuracy compared to IPv4 and ICMP",
          "Format inconsistencies - some models generated hexadecimal instead of expected format",
          "Grok's unexpected ARP performance drop with more examples (87.58% → 78%)",
          "Balancing model capability with protocol complexity"
        ],
        insights: [
          "Few-shot learning dramatically improves synthetic traffic generation accuracy for most models",
          "LangChain framework proved essential for consistent prompt engineering and model orchestration across different LLM APIs",
          "Protocol complexity inversely correlates with generation accuracy: ICMP (simplest) > IPv4 > ARP (most complex)",
          "Different LLMs have varying strengths: ChatGPT and Gemini 2.5 Flash excel at N-shot learning, Grok-3 at zero-shot IPv4",
          "Providing structured examples via LangChain prompts is critical for consistent output formats",
          "LLMs can successfully infer protocol-specific fields with proper context and examples",
          "Learning paradigm significantly impacts accuracy - examples make a measurable difference, except for Grok-3's anomalous IPv4 behavior",
          "Gemini model family (2, 2.5 Pro, 2.5 Flash) showed diverse performance characteristics despite shared architecture",
          "Zero-shot ICMP performance varies dramatically: some models achieve 100% while others score 0%"
        ],
        futureWork: [
          "Extend to more complex protocols: TCP, HTTP, DNS for comprehensive coverage",
          "Generate realistic attack traffic for diverse intrusion detection datasets",
          "Develop a module/library to analyze network traffic patterns and predict attacks",
          "Scale generation to larger datasets for real-world NIDS training",
          "Investigate hybrid approaches combining multiple LLMs for optimal performance",
          "Address Grok's ARP performance anomaly with additional examples"
        ],
        publication: {
          title: "Synthetic Traffic Generation Using Large Language Models",
          authors: "Dheeraj Srirama, Marius Portmann, Siamak Layeghy",
          institution: "School of Electrical Engineering and Computer Science, The University of Queensland",
          year: "2024"
        }
      }
    },
    {
      title: "Job Application Tracker",
      period: "Jan 2025 - Mar 2025",
      description: "Developed a full-stack job application tracking platform with intelligent URL parsing using NLP and multi-site job scraping (LinkedIn, Indeed, Glassdoor, Google Jobs). Built with FastAPI, React, PostgreSQL, and Celery for asynchronous processing, reducing job tracking time by 75% through automated data extraction.",
      tech: ["Python", "FastAPI", "PostgreSQL", "React", "Celery", "Redis", "Docker", "spaCy", "NLP"],
      tags: ["Full Stack", "AI Integration", "Web Scraping"],
      image: "/job_tracker.png",
      github: "https://github.com/dheerajram13/job-app-tracker",
      liveLink: "https://job-tracker-demo.com",
      demoVideo: "/job_tracker.mp4",
      autoplay: true,
      muted: true,
      loop: true,
      detailsLink: "/projects/job-tracker",
      detailedInfo: {
        objective: "To create an intelligent job application tracking system that automates the tedious process of managing job applications by extracting job details from URLs, scraping multiple job boards, and providing comprehensive analytics to help job seekers stay organized and track their application pipeline efficiently.",
        coreFunctionality: [
          {
            feature: "Job Application Management",
            description: "Comprehensive application tracking system with multiple pipeline stages",
            capabilities: [
              "Track applications through 7 stages: Applied, Phone Screen, Technical Interview, On-site, Offer, Rejected, Bookmarked",
              "Automated status updates and timeline tracking",
              "Notes and feedback documentation for each stage",
              "Application history and audit trail",
              "Bulk operations for managing multiple applications"
            ]
          },
          {
            feature: "Multi-Site Job Scraping",
            description: "Automated job posting extraction from major job boards",
            capabilities: [
              "Scrape jobs from LinkedIn, Indeed, Glassdoor, and Google Jobs",
              "Parallel scraping with asynchronous processing",
              "Rate limiting and respectful crawling",
              "Automatic deduplication of job postings",
              "Scheduled scraping with Celery beat for fresh listings"
            ],
            implementation: "python-jobspy library with custom scrapers"
          },
          {
            feature: "Intelligent URL Parsing",
            description: "NLP-powered automatic extraction of job details from URLs",
            capabilities: [
              "Auto-extract job title, company, location, salary, and description from job posting URLs",
              "Named Entity Recognition (NER) for identifying key information",
              "Skills extraction using spaCy NLP models",
              "One-click job import from any supported job board",
              "Fallback to web scraping when NLP extraction is insufficient"
            ],
            technology: "spaCy 3.7 for NLP processing"
          },
          {
            feature: "Advanced Search & Filtering",
            description: "Powerful search capabilities across all job applications",
            capabilities: [
              "Full-text search across job titles, descriptions, and companies",
              "Filter by company, location, skills, and status",
              "Relevance-based ranking algorithm",
              "Saved search queries",
              "Export filtered results to CSV/Excel"
            ]
          },
          {
            feature: "Skills Analytics",
            description: "Data-driven insights into skill requirements and trends",
            capabilities: [
              "Track top skills across all saved job postings",
              "Skill frequency analysis and trending skills",
              "Gap analysis between your skills and job requirements",
              "Visualization of skill distribution across applications",
              "Personalized skill recommendations"
            ]
          },
          {
            feature: "Resume Management",
            description: "Organize and manage multiple resume versions",
            capabilities: [
              "Upload and store multiple resume versions",
              "Tag resumes for specific job types or companies",
              "Track which resume was used for each application",
              "Resume version comparison",
              "Quick access and download"
            ]
          },
          {
            feature: "Secure Authentication",
            description: "Enterprise-grade authentication and authorization",
            capabilities: [
              "OAuth2 integration with Auth0",
              "Social login (Google, GitHub, LinkedIn)",
              "JWT-based stateless authentication",
              "Role-based access control",
              "Secure password handling with bcrypt"
            ],
            technology: "Auth0 React SDK, python-jose"
          }
        ],
        technicalFeatures: [
          {
            feature: "Asynchronous Processing",
            description: "Background job scraping with Celery distributed task queue",
            implementation: [
              "Celery 5.3 for distributed task execution",
              "Redis as message broker and result backend",
              "Task prioritization and retry mechanisms",
              "Graceful failure handling with exponential backoff",
              "Worker pool management for parallel processing"
            ],
            benefits: "Non-blocking UI, improved performance, scalable background processing"
          },
          {
            feature: "Real-time Updates",
            description: "Live status updates for long-running scraping tasks",
            implementation: [
              "Poll-based status updates using task IDs",
              "Progress tracking with percentage completion",
              "Real-time notifications for task completion",
              "WebSocket-ready architecture for future enhancements"
            ]
          },
          {
            feature: "Responsive UI",
            description: "Modern, mobile-friendly interface with TailwindCSS",
            implementation: [
              "Mobile-first responsive design",
              "Dark mode support",
              "Accessibility (WCAG 2.1 AA compliant)",
              "Lucide React icon library for consistent iconography",
              "Smooth animations and transitions"
            ]
          },
          {
            feature: "RESTful API",
            description: "Well-documented API endpoints with automatic OpenAPI docs",
            implementation: [
              "FastAPI automatic OpenAPI/Swagger documentation",
              "Interactive API testing with Swagger UI",
              "Request/response validation with Pydantic v2",
              "CORS support for cross-origin requests",
              "API versioning for backward compatibility"
            ],
            endpoints: "/docs for Swagger UI, /redoc for ReDoc documentation"
          },
          {
            feature: "Database Migrations",
            description: "Version-controlled schema changes with Alembic",
            implementation: [
              "Alembic 1.12 for database versioning",
              "Automatic migration generation from SQLAlchemy models",
              "Rollback capability for safe deployments",
              "Migration history tracking",
              "Seeding scripts for initial data"
            ]
          },
          {
            feature: "Containerized Deployment",
            description: "Docker Compose orchestration for easy deployment",
            implementation: [
              "Multi-stage Docker builds for optimized images",
              "Docker Compose with frontend, backend, PostgreSQL, Redis, and Celery worker services",
              "Environment-based configuration",
              "Volume mounting for persistent data",
              "Health checks and restart policies"
            ]
          }
        ],
        techStack: {
          frontend: [
            { technology: "React", version: "18.2", purpose: "UI framework for building interactive interfaces" },
            { technology: "React Router", version: "v6", purpose: "Client-side routing and navigation" },
            { technology: "Vite", version: "5.1", purpose: "Build tool and dev server with HMR" },
            { technology: "TailwindCSS", version: "3.2", purpose: "Utility-first CSS framework for styling" },
            { technology: "Axios", purpose: "Promise-based HTTP client for API requests" },
            { technology: "Auth0 React SDK", purpose: "Authentication integration" },
            { technology: "Lucide React", purpose: "Modern icon library" }
          ],
          backend: [
            { technology: "FastAPI", version: "0.104", purpose: "Modern async web framework with automatic docs" },
            { technology: "SQLAlchemy", version: "2.0", purpose: "ORM and database toolkit" },
            { technology: "Alembic", version: "1.12", purpose: "Database migration tool" },
            { technology: "Pydantic", version: "v2", purpose: "Data validation and settings management" },
            { technology: "python-jose", purpose: "JWT token handling and validation" },
            { technology: "Celery", version: "5.3", purpose: "Distributed task queue for async processing" },
            { technology: "BeautifulSoup4", purpose: "HTML parsing and web scraping" },
            { technology: "spaCy", version: "3.7", purpose: "Industrial-strength Natural Language Processing" },
            { technology: "python-jobspy", purpose: "Job board scraping library" }
          ],
          infrastructure: [
            { technology: "PostgreSQL", version: "13", purpose: "Relational database for structured data storage" },
            { technology: "Redis", version: "6", purpose: "In-memory cache and Celery message broker" },
            { technology: "Docker", purpose: "Application containerization" },
            { technology: "Docker Compose", purpose: "Multi-container orchestration" },
            { technology: "Uvicorn", purpose: "Lightning-fast ASGI server" },
            { technology: "GitHub Actions", purpose: "CI/CD pipeline automation" }
          ]
        },
        architecture: {
          description: "Microservices architecture with asynchronous task processing and containerized deployment",
          components: [
            {
              name: "Frontend (React)",
              technology: "React 18.2 with Vite build tool",
              responsibilities: ["User interface rendering", "Client-side routing", "Auth0 authentication flow", "API consumption via Axios"]
            },
            {
              name: "Backend API (FastAPI)",
              technology: "FastAPI with Uvicorn ASGI server",
              responsibilities: ["RESTful API endpoints", "Business logic", "Database operations via SQLAlchemy", "JWT authentication", "Task dispatching to Celery"]
            },
            {
              name: "Task Queue (Celery Workers)",
              technology: "Celery 5.3 with Redis broker",
              responsibilities: ["Asynchronous job scraping", "Background NLP processing", "Email notifications", "Scheduled tasks"]
            },
            {
              name: "Database (PostgreSQL)",
              technology: "PostgreSQL 13",
              responsibilities: ["Persistent data storage", "Application data", "User profiles", "Job listings"]
            },
            {
              name: "Cache & Broker (Redis)",
              technology: "Redis 6",
              responsibilities: ["Celery message broker", "Task result backend", "Session caching", "API response caching"]
            }
          ],
          dataFlow: [
            "User submits job URL → Frontend sends to FastAPI",
            "FastAPI validates and dispatches Celery task",
            "Celery worker scrapes job details using BeautifulSoup/jobspy",
            "spaCy NLP extracts entities (skills, salary, requirements)",
            "Processed data stored in PostgreSQL",
            "Frontend polls task status via FastAPI",
            "Real-time UI updates with job details"
          ]
        },
        keyAchievements: [
          "Reduced job tracking time by 75% through automated URL parsing and data extraction",
          "Built intelligent NLP pipeline with spaCy for extracting job details with 90%+ accuracy",
          "Implemented asynchronous scraping system capable of processing 100+ job postings concurrently",
          "Designed RESTful API with automatic OpenAPI documentation and request validation",
          "Created responsive React UI with real-time task status updates",
          "Deployed containerized application with Docker Compose for seamless local/cloud deployment",
          "Integrated Auth0 OAuth2 for secure multi-provider authentication",
          "Implemented database migrations with Alembic for version-controlled schema evolution"
        ],
        challenges: [
          "Handling dynamic JavaScript-rendered job boards that require browser automation",
          "Implementing rate limiting and respectful crawling to avoid IP bans",
          "Extracting structured data from inconsistent HTML layouts across different job sites",
          "Training and optimizing spaCy NLP models for domain-specific entity recognition",
          "Managing Celery task lifecycle and handling failures gracefully",
          "Designing efficient database schema for complex relationships and queries",
          "Synchronizing real-time UI updates with long-running background tasks"
        ],
        insights: [
          "Asynchronous processing with Celery dramatically improves user experience for time-consuming operations",
          "FastAPI's automatic documentation and Pydantic validation reduce development time and bugs",
          "spaCy's NLP capabilities enable intelligent data extraction beyond simple regex patterns",
          "Docker Compose simplifies development environment setup across teams",
          "Redis as both cache and message broker provides excellent performance for real-time features",
          "SQLAlchemy 2.0's async support enables non-blocking database operations",
          "React 18's concurrent features improve UI responsiveness during data fetching"
        ],
        futureEnhancements: [
          "Chrome extension for one-click job saving from any website",
          "Email parsing to automatically track applications sent via email",
          "Machine learning recommendations for job matches based on profile",
          "Calendar integration for interview scheduling",
          "Application statistics dashboard with charts and analytics",
          "Collaborative features for sharing job opportunities with friends",
          "Mobile app (React Native) for on-the-go tracking",
          "Integration with ATS (Applicant Tracking Systems) APIs",
          "Resume builder with AI-powered suggestions",
          "Company research integration (Glassdoor ratings, funding info)"
        ],
        useCases: [
          "Job seekers tracking 50+ applications across multiple job boards",
          "Career changers organizing applications for new industries",
          "Recent graduates managing entry-level position applications",
          "Remote workers searching for opportunities across locations",
          "Recruiters tracking candidate pipelines and interview stages",
          "Career counselors helping students organize their job search"
        ],
        metrics: {
          performance: [
            "75% reduction in manual data entry time",
            "90%+ accuracy in NLP-based job detail extraction",
            "100+ concurrent job scraping operations",
            "Sub-second API response times with Redis caching",
            "Real-time task status updates with <1s latency"
          ],
          scalability: [
            "Handles 10,000+ job applications per user",
            "Supports 1,000+ concurrent users",
            "Processes 500+ scraping tasks per hour",
            "Database optimized for millions of job records"
          ]
        }
      }
    },
    {
      title: "CourseCompanion",
      period: "Oct 2024 - Nov 2024",
      description: "Built a full-stack collaborative platform for students to upload study materials and connect with peers. Deployed on GCP using Docker Swarm orchestration with load-balanced microservices architecture (3 frontend replicas, 4 backend replicas) and Nginx reverse proxy, achieving high availability and scalability.",
      tech: ["React.js", "Node.js", "Express", "Firebase", "Docker", "Docker Swarm", "Nginx", "GCP"],
      tags: ["Full Stack", "Web App", "Education"],
      image: "/course.png",
      github: "https://github.com/dheerajram13/CourseCompanion",
      liveLink: "https://coursecompanion.com",
      demoVideo: "/course_companion.mp4",
      autoplay: true,
      detailsLink: "/projects/course-companion",
      detailedInfo: {
        objective: "To create a collaborative platform that enables students to upload and organize study materials, share resources with peers, connect for academic support, and enhance their learning experience through real-time collaboration.",
        architecture: {
          description: "The application uses a microservices architecture deployed with Docker Swarm for high availability and scalability",
          components: [
            {
              name: "Frontend",
              technology: "React application served via Nginx",
              replicas: "3 replicas for load distribution",
              features: ["Responsive Material-UI interface", "Real-time updates", "Firebase Authentication integration"]
            },
            {
              name: "Backend",
              technology: "Node.js/Express API",
              replicas: "4 replicas for high availability",
              features: ["RESTful API endpoints", "File upload handling with Multer", "Firebase Admin SDK integration"]
            },
            {
              name: "Load Balancer",
              technology: "Nginx reverse proxy",
              purpose: "Distributes incoming traffic across frontend and backend replicas"
            },
            {
              name: "Database",
              technology: "Firebase Realtime Database",
              features: ["Real-time data synchronization", "NoSQL document storage", "Automatic scaling"]
            },
            {
              name: "Storage",
              technology: "Firebase Cloud Storage",
              features: ["Secure file storage", "Direct file uploads", "Access control"]
            },
            {
              name: "Authentication",
              technology: "Firebase Authentication",
              providers: ["Email/Password", "Google OAuth"]
            }
          ],
          diagram: "/images/diagram.png"
        },
        features: [
          {
            category: "Material Management",
            capabilities: [
              "Upload study materials (PDFs, documents, images)",
              "Organize resources by course and topic",
              "Search and filter materials",
              "Version control for updated materials"
            ]
          },
          {
            category: "Collaboration",
            capabilities: [
              "Real-time collaboration with peers",
              "Discussion forums and comment threads",
              "Direct messaging between students",
              "Study group creation and management"
            ]
          },
          {
            category: "User Management",
            capabilities: [
              "Secure user authentication via Firebase Auth",
              "User profiles with academic interests",
              "Permission-based access control",
              "Activity tracking and notifications"
            ]
          },
          {
            category: "Resource Exchange",
            capabilities: [
              "Share materials with specific users or groups",
              "Public and private resource visibility",
              "Material rating and feedback system",
              "Bookmark and favorite functionality"
            ]
          }
        ],
        technicalStack: {
          frontend: [
            { technology: "React", version: "18.3.1", purpose: "UI library for building interactive interfaces" },
            { technology: "Material-UI (MUI)", version: "6.1.3", purpose: "Component library for consistent design" },
            { technology: "React Router", version: "6.27.0", purpose: "Client-side routing and navigation" },
            { technology: "Firebase SDK", version: "10.14.1", purpose: "Authentication and storage integration" },
            { technology: "Emotion", purpose: "CSS-in-JS styling solution" }
          ],
          backend: [
            { technology: "Node.js", purpose: "JavaScript runtime environment" },
            { technology: "Express", version: "4.21.0", purpose: "Web framework for API development" },
            { technology: "Firebase Admin SDK", version: "12.6.0", purpose: "Backend Firebase integration" },
            { technology: "Multer", version: "1.4.5", purpose: "Middleware for handling file uploads" },
            { technology: "CORS", version: "2.8.5", purpose: "Cross-origin resource sharing" }
          ],
          devOps: [
            { technology: "Docker", purpose: "Application containerization" },
            { technology: "Docker Swarm", purpose: "Container orchestration and scaling" },
            { technology: "Nginx", purpose: "Load balancing and reverse proxy" }
          ]
        },
        deploymentOptions: [
          {
            name: "Docker Swarm (Production)",
            description: "Scalable production deployment with load balancing and high availability",
            steps: [
              "Initialize Docker Swarm: sudo docker swarm init",
              "Build images: sudo docker build -t coursecompanion_frontend:latest ./frontend",
              "Build backend: sudo docker build -t coursecompanion_backend:latest ./backend",
              "Deploy stack: sudo docker stack deploy --compose-file docker-compose.yml coursecompanion",
              "Monitor: sudo docker stack ps coursecompanion"
            ],
            replicas: {
              frontend: "3 replicas",
              backend: "4 replicas"
            },
            scalability: "Can easily scale services: sudo docker service scale coursecompanion_backend=6"
          },
          {
            name: "Local Development",
            description: "Simple local setup for development and testing",
            steps: [
              "Backend: cd backend && npm install && npm start (runs on port 81)",
              "Frontend: cd frontend && npm install && npm start (runs on port 3000)",
              "Configure Firebase credentials in firebase-adminsdk.json"
            ],
            requirements: ["Node.js v14.0.0+", "npm v6.0.0+"]
          }
        ],
        configuration: {
          backend: [
            { variable: "FIREBASE_DB_URL", description: "Firebase Realtime Database URL", example: "https://your-project-id.firebaseio.com/" },
            { variable: "PORT", description: "Backend server port", default: "81" }
          ],
          frontend: [
            { variable: "REACT_APP_API_BASE_URL", description: "Backend API endpoint", example: "http://localhost:81/api" }
          ],
          firebaseSetup: [
            "Create Firebase project at Firebase Console",
            "Enable Authentication (Email/Password and Google)",
            "Enable Cloud Firestore",
            "Enable Realtime Database",
            "Enable Cloud Storage",
            "Generate service account key",
            "Save as firebase-config.json (root) and firebase-adminsdk.json (backend/)"
          ]
        },
        keyAchievements: [
          "Implemented microservices architecture with Docker Swarm for 99.9% uptime",
          "Achieved real-time collaboration with Firebase Realtime Database synchronization",
          "Deployed load-balanced infrastructure with 3 frontend and 4 backend replicas",
          "Integrated multiple Firebase services (Auth, Storage, Database) seamlessly",
          "Built responsive Material-UI interface supporting desktop and mobile devices",
          "Implemented secure file upload and storage system with Multer and Firebase Storage"
        ],
        challenges: [
          "Managing Firebase credentials securely across different deployment environments",
          "Implementing efficient load balancing between multiple backend replicas",
          "Handling real-time data synchronization with Firebase Realtime Database",
          "Ensuring seamless authentication flow across frontend and backend services",
          "Optimizing file upload performance for large study materials"
        ],
        projectStructure: {
          description: "Well-organized monorepo structure with separate frontend and backend",
          directories: [
            { path: "backend/", contents: "Node.js/Express backend with routes, Firebase admin, and server.js" },
            { path: "backend/routes/", contents: "API routes for materials, users, and authentication" },
            { path: "backend/firebaseAdmin.js", contents: "Firebase Admin SDK initialization" },
            { path: "backend/server.js", contents: "Express server entry point" },
            { path: "frontend/", contents: "React frontend with components and pages" },
            { path: "frontend/public/", contents: "Static assets and HTML template" },
            { path: "frontend/src/", contents: "React components, hooks, and application logic" },
            { path: "images/", contents: "Documentation images including architecture diagram" },
            { path: "docker-compose.yml", contents: "Docker Swarm orchestration configuration" },
            { path: "nginx.conf", contents: "Nginx load balancer configuration" }
          ]
        },
        futureEnhancements: [
          "Implement advanced search with filters (course, date, rating)",
          "Add real-time notifications for comments and updates",
          "Integrate video conferencing for virtual study sessions",
          "Develop mobile applications (iOS and Android)",
          "Implement analytics dashboard for tracking material usage",
          "Add AI-powered content recommendations",
          "Create study schedule and calendar integration",
          "Implement gamification with points and achievements"
        ],
        useCases: [
          "Students upload lecture notes and share with classmates",
          "Study groups collaborate on shared resources",
          "Professors distribute course materials to students",
          "Alumni share past exam papers and study guides",
          "Students seek help through discussion forums",
          "Resource exchange between different courses"
        ],
        license: "ISC License - Open source and free to use"
      }
    },
    {
      title: "QuickSettle",
      period: "July 2024 (Hackathon)",
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
          <p className="inline-block px-3 py-1 text-sm font-medium bg-secondary dark:bg-tertiary text-primary dark:text-white rounded-full mb-2 animate-fadeIn">Things I've built 🛠️</p>
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
    "Languages": ["Python", "Go", "Java", "JavaScript", "C++"],
    "Frontend": ["React.js", "Vite", "TailwindCSS", "HTML/CSS"],
    "Backend": ["FastAPI", "Django", "Flask", "Node.js", "Express"],
    "ML & AI": ["spaCy", "scikit-learn", "NLP", "LangChain", "LLMs"],
    "Databases": ["PostgreSQL", "MySQL", "Firebase", "SQLAlchemy"],
    "DevOps": ["Docker", "Kubernetes", "GCP", "AWS", "CI/CD"],
    "Analytics": ["Power BI", "Pandas", "NumPy", "Matplotlib"],
    "Tools": ["Sentry", "Grafana", "New Relic", "Redis", "Celery", "Git"]
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Skills" subtitle="My programming superpowers 💪" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-bold mb-3 text-primary dark:text-tertiary">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-secondary dark:bg-gray-700 text-primary dark:text-gray-300 rounded-md hover:bg-tertiary hover:text-white dark:hover:bg-gray-600 transition-all"
                  >
                    {skill}
                  </span>
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
      period: "Jul 2023 - Jul 2025",
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
        <SectionTitle title="Education" subtitle="Where I learned to Google efficiently 🎓" />
        
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
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = () => {
  const achievements = [
    "Scholarship Student, The University of Queensland.",
    "Westpac Hackathon 2024 Finalist for innovative solutions.",
    "Awarded Google's Android Developer Nanodegree scholarship via Udacity."
  ];
  
  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle title="Achievements" subtitle="Proof that I'm not just coding in my basement 🏆" />
        
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
        <SectionTitle title="Contact Me" subtitle="Let's build something awesome together! 🤝" />
        
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