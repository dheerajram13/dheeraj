export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
];

export const socialLinks = {
  github: 'https://github.com/dheerajram13',
  linkedin: 'https://linkedin.com/in/dheerajsrirama',
  email: 'sriramadheeraj@gmail.com',
  location: 'Brisbane, Australia'
};

export const experiences = [
  {
    title: 'Software Engineer',
    company: 'Orange Health',
    location: 'India',
    period: 'Jan 2022 - Jun 2023',
    context: 'Early engineer building backend systems for a diagnostics platform delivering 60-minute sample collection and 6-hour reports, supporting rapid expansion across cities.',
    description: [
      'Built a payment microservice handling payments, refunds, and doctor payouts — with idempotent processing and Celery + RabbitMQ retry workflows to ensure consistent financial state across distributed systems.',
      'Improved order booking API latency by ~30% through parallel processing in Go and database query optimisation, enabling the system to handle increasing load as the platform expanded across cities.',
      'Reduced system incidents by introducing Redis caching, RabbitMQ-based async decoupling, and refactoring tightly coupled services into resilient components, improving stability and cutting timeouts.',
      'Designed a multi-channel communication service (SMS, Email, Push, WhatsApp) with a provider abstraction layer, retry and fallback mechanisms, and rate limiting, ensuring reliable delivery across critical customer touchpoints.',
      'Increased direct bookings by diagnosing and fixing a critical Elasticsearch bug in search relevance, restoring accurate customer matching and discovery.'
    ],
    tech: ['Go', 'Gin', 'GORM', 'Python', 'Django', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Celery', 'Elasticsearch', 'Docker', 'Kubernetes','AWS']
  },
  {
    title: 'Software Engineer',
    company: 'Cimpltech',
    location: 'India',
    period: 'Jan 2021 - Dec 2021',
    context: 'Early-stage SaaS company. I owned backend development and the customer onboarding pipeline.',
    description: [
      'Developed backend models and REST APIs for the customer app and internal dashboard using Python and Django.',
      'Cut onboarding time by automating manual steps with Python scripting and workflow automation — reducing the process from multi-day to near-instant.',
      'Implemented push notifications via Google Firebase, improving customer engagement and reducing missed updates.',
      'Significantly improved API reliability by introducing comprehensive test coverage across core endpoints.'
    ],
    tech: ['Python', 'Django', 'REST API', 'Firebase', 'PostgreSQL', 'AWS', 'Docker']
  },
  {
    title: 'Software Engineer',
    company: 'WaiterBee',
    location: 'India',
    period: 'Mar 2019 - Dec 2020',
    context: 'As a Founding Engineer, I built WaiterBee as a complete restaurant operating system that connects customers, staff, and business operations into a single real-time platform.',
    description: [
      'Built products from scratch, including a QR ordering app (customer), a POS system (staff), a real-time kitchen dashboard, and an analytics layer for owners — all connected, all in production.',
      'Designed the full order flow: customer scans QR → places order → kitchen sees it instantly → staff tracks status → owner sees revenue. No aggregator, no commission cut.',
      'Built a custom POS handling dine-in, takeaway, and delivery with Stripe payments, replacing the manual billing process entirely.',
      'Shipped a real-time kitchen queue syncing order state (preparing → ready → served) across front-of-house and kitchen, cutting miscommunication and wait times.',
      'Built the analytics layer — sales, product performance, order trends, staff metrics — giving owners visibility they previously had no access to.',
      'Architected the PostgreSQL schema for multi-role access (customer, staff, admin), deployed on AWS, integrated Stripe, Twilio, and Google OAuth.'
    ],
    tech: ['Python', 'Django', 'REST API', 'PostgreSQL', 'AWS', 'Stripe', 'Twilio', 'Google OAuth', 'Bootstrap', 'jQuery'],
    images: [
      '/images/projects/waiterbee/waiterbee1.png',
      '/images/projects/waiterbee/waiterbee2.png',
      '/images/projects/waiterbee/waiterbee3.png',
      '/images/projects/waiterbee/waiterbee4.png',
      '/images/projects/waiterbee/waiterbee5.png'
    ]
  },
  {
    title: 'Software Engineer Intern',
    company: 'Eureka King Inc.',
    location: 'San Francisco, United States (Remote)',
    period: 'Oct 2018 - Nov 2018',
    context: 'Remote internship at a fintech startup building an index fund tracking site.',
    description: [
      'Wrote scripts to fetch and process Binance50 API data into CSV files for the index fund dashboard.',
      'Used Ajax to dynamically append live API data to the HTML page without full page reloads.',
      'Built configurable time-interval controls for API data refresh, giving users control over data freshness.',
      'Designed the website UI using the Bulma CSS framework.'
    ],
    tech: ['Python', 'Node.js', 'HTML', 'Bulma CSS', 'Ajax', 'jQuery']
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Konigle',
    location: 'Singapore (Remote)',
    period: 'Jun 2018 - Jul 2018',
    context: 'Remote internship at a Singapore-based startup. Worked across web and mobile.',
    description: [
      'Built registration and onboarding forms for both the organization and end customers.',
      'Integrated Google OAuth login using the social-django module.',
      'Developed an Android app from scratch — onboarding flow, login, signup, and email notification to admin via SMTP.',
      'Applied material design principles and client-side form validation.'
    ],
    tech: ['Python', 'Django', 'Vue.js', 'SQLite', 'Android', 'Java']
  },
  {
    title: 'Software Developer Intern - Conversational AI',
    company: 'Devathon (Crypsis Technologies Pvt. Ltd.)',
    location: 'India',
    period: 'Sep 2017 - Feb 2018',
    context: 'My first AI project — building a restaurant discovery chatbot on Facebook Messenger.',
    description: [
      'Built "Eatable" — a restaurant recommendation chatbot that understands natural language queries for cuisine, location, budget, and timings.',
      'Integrated the Zomato API for live restaurant data and implemented features like nearest branch lookup and favourites management.',
      'Implemented the NLP layer using Dialogflow, with Python/Flask as the backend, deployed and integrated into Facebook Messenger.'
    ],
    tech: ['Python', 'Flask', 'Dialogflow', 'Zomato API', 'Facebook Messenger', 'NLP']
  }
];

export const skills = {
  'Backend Systems & APIs': ['Python', 'Go', 'FastAPI', 'Django', 'Flask', 'Node.js', 'PostgreSQL', 'Redis', 'Celery', 'RabbitMQ'],
  'AI Pipelines & Data': ['LLMs', 'LangChain', 'NLP', 'spaCy', 'FAISS', 'OCR', 'scikit-learn', 'Pandas', 'NumPy'],
  'Infrastructure & Deployment': ['Docker', 'AWS', 'GCP', 'Supabase', 'Vercel', 'CI/CD', 'Prometheus'],
  'Frontend & Product': ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'JavaScript'],
  'Observability & Tools': ['Sentry', 'Grafana', 'New Relic', 'Git', 'SQLAlchemy', 'Firebase']
};

export const educations = [
  {
    institution: 'The University of Queensland',
    degree: 'M.S. in Computer Science (Management)',
    location: 'Brisbane, Australia',
    period: 'Jul 2023 - Jul 2025',
    courses: ['Machine Learning', 'Data Mining', 'Algorithms & Data Structures', 'Information Retrieval and Web Search', 'Social Media Analytics', 'Cloud Computing', 'Advanced Database Systems']
  },
  {
    institution: 'SRM University',
    degree: 'B.Tech in Computer Science',
    location: 'Chennai, India',
    period: 'Jul 2015 - May 2019',
    courses: []
  }
];

export const achievements = [
  'Awarded a scholarship at the University of Queensland, Brisbane for the Masters of Computer Science (Management).',
  'Reached the finals of the Westpac Hackathon 2024 among 50+ teams with QuickSettle — a mobile banking feature for instant group payment settlement.',
  "Google Android Developer Nanodegree Scholarship — selected among 10,000+ students in a highly competitive program run in collaboration with Google, recognizing strong performance, consistency, and contribution to the developer community."
];
