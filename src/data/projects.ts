import { Project } from '../types/projects';

export const projects: Project[] = [
  // ============================================
  // FEATURED & PERSONAL PROJECTS
  // ============================================
  {
    id: 'medical-document-ai',
    title: 'Medical Document Processing AI Agent',
    shortDescription: 'Turn medical documents into ready-to-review records. Upload. Extract. Review. Approve — in seconds, not minutes, with human checkpoints before anything gets filed.',
    longDescription:
      'Clinic staff mostly process the filing of medical documents manually — field by field, document by document. I built an AI agent that automates the entire pipeline: upload a PDF or DOCX → Azure Document Intelligence runs OCR → Google Gemini extracts 7 structured fields with a confidence score per field → uncertain results route to a human review queue instead of guessing. Receptionists can approve, correct, or reject before anything is stored. 7 required fields extracted per document, under 30 seconds typical processing time, 90%+ AI extraction accuracy. Dual-model setup: Gemini primary, Claude as fallback — automatically triggered on failures. Deployed in production with Prometheus-compatible observability tracking OCR latency, extraction performance, and fallback rates.',
    highlight: 'featured',
    category: 'personal',
    techStack: ['Next.js', 'TypeScript', 'NestJS', 'Azure Document Intelligence', 'Google Gemini', 'Claude', 'Supabase', 'PostgreSQL', 'Vercel', 'Render'],
    tags: ['Full-stack', 'AI', 'LLM', 'Automation', 'Production'],
    highlights: [
      'Upload → OCR → AI extraction → confidence scoring → human review → filed record — fully automated pipeline',
      'Dual-model AI: Gemini primary, Claude as fallback — automatically triggered on extraction failures',
      'Human-in-the-loop routing — low-confidence fields escalate to review queue instead of guessing',
      '7 fields extracted per document, <30s processing time, 90%+ extraction accuracy',
      'PDF highlighting shows exactly where each field was found — works on both text and scanned documents',
      'Prometheus-compatible /metrics endpoint tracking upload, OCR, AI extraction, and fallback rates'
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-04-01',
    priority: 10,
    links: {
      demo: 'https://medical-document-processing-ai-agen.vercel.app',
      github: 'https://github.com/dheerajram13/Medical-Document-Processing-AI-Agent',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/medical-document-ai/home.png',
        alt: 'Medical Document AI Agent home page',
        caption: 'Home — upload PDFs or DOCX files to start the processing pipeline.'
      },
      {
        type: 'image',
        src: '/images/projects/medical-document-ai/upload.png',
        alt: 'Document upload interface',
        caption: 'Upload interface with drag-and-drop support for PDF and DOCX files.'
      },
      {
        type: 'image',
        src: '/images/projects/medical-document-ai/doc_uploaded.png',
        alt: 'Document uploaded and processing',
        caption: 'After upload: OCR runs, then Gemini extracts the 7 structured fields with confidence scores.'
      },
      {
        type: 'image',
        src: '/images/projects/medical-document-ai/review_queue.png',
        alt: 'Human review queue',
        caption: 'Review queue — receptionists approve, correct, or reject AI-extracted fields before filing.'
      },
      {
        type: 'image',
        src: '/images/projects/medical-document-ai/doc_preview1.png',
        alt: 'Document preview with highlighting',
        caption: 'PDF highlighting shows exactly where each extracted field was found in the original document.'
      },
      {
        type: 'image',
        src: '/images/projects/medical-document-ai/doc_preview2.png',
        alt: 'Document preview with scanned page highlighting',
        caption: 'OCR-based highlighting works on both selectable text and fully scanned documents.'
      }
    ]
  },
  {
    id: 'filmfind',
    title: 'FilmFind - AI-Powered Movie Discovery',
    shortDescription: 'Not a streaming platform — a smarter way to find one. Describe what you\'re in the mood for in plain English and get the perfect match in seconds. Try: "Like Stranger Things but more horror, less nostalgia."',
    longDescription:
      'Keyword search for movies is broken — you type a mood or vibe and get nothing useful. FilmFind builds a semantic search layer on top of 10,000+ movies using sentence embeddings (FAISS) and a FastAPI backend. Type "F1 but in boxing", "slow burn thriller like Parasite", or "feel-good like Ted Lasso" — and actually get what you mean. Can\'t decide at all? Answer 3 quick questions and get one perfect pick. No lists, just the right answer. Built with a Next.js frontend, PostgreSQL + FAISS hybrid retrieval, and results delivered in under 500ms.',
    highlight: 'featured',
    category: 'personal',
    techStack: ['Python', 'FastAPI', 'TypeScript', 'Next.js', 'PostgreSQL', 'FAISS', 'Redis', 'Docker', 'TailwindCSS'],
    tags: ['Full-stack', 'AI', 'LLM', 'Semantic Search', 'NLP'],
    highlights: [
      'Describe any mood, vibe, or feeling — "like a warm hug" or "F1 but in boxing" — and get real matches',
      'Results in under 500ms across 10,000+ movies via FAISS + PostgreSQL hybrid retrieval',
      'Every recommendation comes with a plain-English explanation of why it matched',
      'Can\'t decide? Answer 3 questions → get one perfect pick. No lists, no scrolling.'
    ],
    createdAt: '2024-11-01',
    updatedAt: '2025-11-20',
    priority: 10,
    links: {
      demo: 'https://filmfind.vercel.app',
      github: 'https://github.com/dheerajram13/FilmFind',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/filmfind/Film_find_home.png',
        alt: 'FilmFind home page — semantic movie search',
        caption: 'Describe what you want to watch in plain English. FilmFind handles the rest.'
      },
      {
        type: 'image',
        src: '/images/projects/filmfind/film_find_search_results.png',
        alt: 'FilmFind search results with match scores',
        caption: 'Results ranked by semantic match — with score breakdowns showing narrative and semantic fit.'
      },
      {
        type: 'image',
        src: '/images/projects/filmfind/film_find_detail.png',
        alt: 'FilmFind movie detail with explanation',
        caption: 'Every recommendation comes with a plain-English explanation of why it matched your query.'
      },
      {
        type: 'image',
        src: '/images/projects/filmfind/film_find_home_movies.png',
        alt: 'FilmFind movie cards with match percentages',
        caption: 'AI-powered recommendations with explainable results.'
      }
    ]
  },
  {
    id: 'job-tracker',
    problem: 'I was applying to 50+ jobs and spreadsheets stopped working after week two.',
    title: 'Job Application Tracker',
    shortDescription: 'I was applying to 50+ jobs and spreadsheets stopped working. So I built a tracker that scrapes job URLs, extracts structured data with NLP, and tracks pipeline status with async background workers.',
    longDescription:
      'Applying to jobs at volume means losing track fast — which roles are pending, which need follow-up, what the deadlines are. I built a full-stack tracker that ingests job URLs, uses NLP (spaCy) to extract structured fields (title, company, requirements, deadline), and tracks application status through a Kanban-style pipeline. Background Celery workers handle scraping asynchronously so the UI stays snappy. Reduced my own tracking overhead by ~75%.',
    highlight: 'normal',
    category: 'personal',
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Celery', 'Redis', 'spaCy'],
    tags: ['Full-stack', 'NLP', 'Web Scraping', 'Automation'],
    highlights: [
      '75% reduction in manual tracking time',
      'Asynchronous scraping with background workers',
      'NLP-based entity extraction for job details',
      'Pipeline analytics and application status tracking'
    ],
    createdAt: '2025-01-01',
    updatedAt: '2025-03-15',
    priority: 9,
    links: {
      demo: 'https://job-tracker-demo.com',
      github: 'https://github.com/dheerajram13/job-app-tracker',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/job-tracker/job_tracker.png',
        alt: 'Job Application Tracker dashboard',
        caption: 'Pipeline overview with NLP-extracted job data.'
      },
      {
        type: 'video',
        src: '/images/projects/job-tracker/job_tracker.mp4',
        poster: '/images/projects/job-tracker/job_tracker.png',
        alt: 'Job Application Tracker demo',
        caption: 'Short walkthrough of the end-to-end flow.'
      }
    ]
  },

  // ============================================
  // UNIVERSITY PROJECTS
  // ============================================
  {
    id: 'course-companion',
    title: 'CourseCompanion',
    shortDescription: 'Collaborative study materials platform with real-time sync and Docker Swarm orchestration.',
    longDescription:
      'A scalable platform for students to upload and share study materials with real-time collaboration. Deployed using Docker Swarm on GCP with load balancing, health checks, and horizontal scaling to demonstrate cloud-native application deployment patterns.',
    highlight: 'normal',
    category: 'university',
    techStack: ['React', 'Node.js', 'Express', 'Firebase', 'Docker', 'Docker Swarm', 'Nginx', 'GCP'],
    tags: ['Full-stack', 'Cloud Computing', 'DevOps', 'Microservices'],
    context: 'Cloud Computing Course Project - University of Queensland',
    highlights: [
      'High availability with 3 frontend and 4 backend replicas',
      'Orchestrated with Docker Swarm for automatic scaling',
      'Real-time collaboration using Firebase Realtime DB',
      'Load-balanced deployment on GCP with Nginx',
      'Secure file upload pipeline with authentication'
    ],
    createdAt: '2024-10-01',
    updatedAt: '2024-11-10',
    priority: 6,
    links: {
      github: 'https://github.com/dheerajram13/CourseCompanion',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/course-companion/course.png',
        alt: 'CourseCompanion UI preview',
        caption: 'Collaborative resource hub with shared materials.'
      },
      {
        type: 'video',
        src: '/images/projects/course-companion/course_companion.mp4',
        poster: '/images/projects/course-companion/course.png',
        alt: 'CourseCompanion demo',
        caption: 'Walkthrough of the collaboration workflow and deployment architecture.'
      }
    ]
  },
  {
    id: 'quick-settle',
    title: 'QuickSettle',
    shortDescription: 'Instant group payment settlement extension for mobile banking apps.',
    longDescription:
      'Built as a hackathon prototype for the Westpac mobile app, QuickSettle automatically detects group payments and generates shareable settlement links with configurable payment methods, making it effortless to split bills and settle debts instantly.',
    highlight: 'normal',
    category: 'university',
    techStack: ['Mobile UX', 'Payment APIs', 'Product Design', 'Prototyping'],
    tags: ['Hackathon', 'FinTech', 'Product Design', 'UX'],
    context: 'Westpac Hackathon 2024 - Selected as Finalist',
    highlights: [
      'Selected as finalist among 50+ teams',
      'Automatic group payment detection',
      'Fast settlement via shareable links',
      'User-friendly flows for split payments',
      'Configurable payment method preferences'
    ],
    createdAt: '2024-07-01',
    updatedAt: '2024-07-15',
    priority: 5,
    links: {
      github: 'https://github.com/dheerajram13/quick-settle',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/quick-settle/quick_settle.png',
        alt: 'QuickSettle UI concept',
        caption: 'Rapid settlement flow inside a mobile banking experience.'
      }
    ]
  },
  {
    id: 'drosophila-classification',
    title: 'Drosophila Gender Classification',
    shortDescription: 'ML-powered gender classification achieving 94.8% accuracy with feature engineering.',
    longDescription:
      'A data science project comparing KNN, Decision Trees, and Logistic Regression to classify Drosophila gender. Achieved high accuracy through targeted feature engineering, hyperparameter tuning, and comprehensive model validation.',
    highlight: 'normal',
    category: 'university',
    techStack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    tags: ['Data Science', 'ML', 'Feature Engineering', 'Analysis'],
    context: 'Machine Learning Course Project - University of Queensland',
    highlights: [
      '94.8% accuracy across multiple models',
      'Feature engineering improved KNN performance by 38.7%',
      'ROC-AUC of 0.99 for logistic regression',
      'Comprehensive data analysis and visualization',
      'Cross-validation and hyperparameter tuning'
    ],
    createdAt: '2024-04-01',
    updatedAt: '2024-05-15',
    priority: 3,
    links: {
      github: 'https://github.com/dheerajram13/drosophila-classification',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/drosophila-ml/ml_drosophila.png',
        alt: 'Drosophila classification project',
        caption: 'Model comparison and feature insights.'
      }
    ]
  },

  // ============================================
  // RESEARCH PROJECTS
  // ============================================
  {
    id: 'synthetic-traffic',
    problem: 'Training intrusion detection systems requires real attack traffic — which is scarce, sensitive, and hard to label.',
    title: 'Synthetic Traffic Generation Using LLMs',
    shortDescription: 'Network intrusion detection systems are hard to train because real attack traffic datasets are scarce. I researched whether LLMs can generate protocol-accurate synthetic traffic to fill that gap.',
    longDescription:
      'Training network intrusion detection systems (NIDS) requires labeled traffic data — but real attack traffic is scarce and sensitive. I explored whether LLMs (GPT-4, Claude, Llama) could generate protocol-accurate synthetic packets for IPv4, ICMP, and ARP protocols. Built structured prompting frameworks, evaluation loops, and a reproducible validation pipeline using Mininet and tcpdump. For structured protocols like ICMP and ARP, few-shot LLMs hit 100% protocol accuracy — a meaningful result for synthetic NIDS dataset generation.',
    highlight: 'normal',
    category: 'research',
    techStack: ['LangChain', 'Python', 'Mininet', 'Docker', 'tcpdump', 'Wireshark'],
    tags: ['Research', 'LLM', 'Network Security', 'ML'],
    context: 'Research Project - University of Queensland',
    highlights: [
      '100% accuracy achieved in N-shot ICMP/ARP generation',
      'Evaluated multiple LLMs (GPT-4, Claude, Llama) across zero/one/few-shot settings',
      'Built reproducible packet validation pipeline',
      'Structured prompting framework for protocol synthesis',
      'Demonstrated LLM capability for network traffic generation'
    ],
    createdAt: '2024-09-01',
    updatedAt: '2025-03-01',
    priority: 4,
    links: {
      github: 'https://github.com/dheerajram13/llm_for_synthetic_traffic_generation',
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/synthetic-traffic/network_traffic.png',
        alt: 'Synthetic traffic generation visuals',
        caption: 'LLM-driven protocol synthesis and evaluation.'
      }
    ]
  },

  // ============================================
  // CONTRACT/FREELANCE WORK
  // ============================================
  {
    id: 'invoice-processing',
    problem: 'An enterprise client had one person keying data from thousands of PDF invoices every month. By hand.',
    title: 'Invoice Processing System',

    shortDescription: 'Production ML pipeline that replaced manual invoice keying for an enterprise finance client — processing 6M+ lines of invoice data via automated email, OCR, and NLP extraction.',
    longDescription:
      'An enterprise finance client was manually keying data from thousands of PDF invoices every month — a slow, error-prone process. I built a pipeline that automated the entire flow: fetch emails, download PDF attachments, run OCR, extract PO numbers and key invoice fields using NLP and layout analysis, then write structured records to their database. Deployed on Windows Server as a background service, integrated directly with their existing SQL database. At peak, the system processed over 6 million lines of invoice data.',
    highlight: 'normal',
    category: 'contract',
    techStack: ['Python', 'NLP', 'OCR', 'PDF Processing', 'Windows Server', 'SQL'],
    tags: ['ML', 'NLP', 'Automation', 'Production'],
    context: 'Client: Enterprise Finance Industry',
    highlights: [
      'Replaced manual invoice keying with a fully automated email → OCR → NLP → database pipeline',
      'Pattern matching + layout analysis handles complex, multi-format invoice PDFs',
      'Deployed as a Windows Server background service integrated with client SQL database',
      'Built for an enterprise finance client with zero tolerance for data errors'
    ],
    createdAt: '2023-01-01',
    updatedAt: '2023-12-15',
    priority: 8,
    links: {
    },
    media: []
  }
];
