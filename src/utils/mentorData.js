// SALAAH - The Mentor Community (ABESEC, Ghaziabad) Data & Utility

export const ALUMNI_MENTORS = [
  {
    id: 'vineet-pathak',
    name: 'Vineet Pathak',
    role: 'Lead Mentor & Co-Founder',
    company: 'Tech Innovator',
    badge: 'Alumni Lead',
    batch: 'Batch 2023',
    domain: 'Software Engineering & Community',
    avatarColor: 'emerald',
    skills: ['DSA', 'System Design', 'Career Strategy', 'Public Speaking'],
    bio: 'Dedicated to empowering college students with real industry insights and bridging the gap between college and tech careers.'
  },
  {
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    role: 'Software Development Engineer II',
    company: 'Swiggy',
    badge: 'Swiggy Alum',
    batch: 'Batch 2022',
    domain: 'Full Stack & Distributed Systems',
    avatarColor: 'cyan',
    skills: ['Node.js', 'Go', 'Microservices', 'Kafka', 'Redis'],
    bio: 'Alumnus from ABESEC, now scaling high-throughput food delivery systems. Mentored 80+ juniors in backend engineering.'
  },
  {
    id: 'ananya-gupta',
    name: 'Ananya Gupta',
    role: 'Cloud & DevOps Engineer',
    company: 'HCLTech',
    badge: 'HCLTech Alum',
    batch: 'Batch 2021',
    domain: 'Cloud Architecture & DevOps',
    avatarColor: 'gold',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD Pipelines'],
    bio: 'Passionate about cloud modernization and helping students master DevOps certifications and real-world architectures.'
  },
  {
    id: 'arjun-verma',
    name: 'Arjun Verma',
    role: 'Senior SDE',
    company: 'Amazon',
    badge: 'Amazon Alum',
    batch: 'Batch 2020',
    domain: 'Cloud Services & Big Data',
    avatarColor: 'purple',
    skills: ['Java', 'Distributed Systems', 'Off-Campus Hiring', 'LeetCode'],
    bio: 'Cracked Amazon off-campus. Regular mock interviewer at Salaah helping students prepare for FAANG-tier coding rounds.'
  },
  {
    id: 'priya-mishra',
    name: 'Priya Mishra',
    role: 'Product Manager',
    company: 'Fintech Unicorn',
    badge: 'Product Alum',
    batch: 'Batch 2021',
    domain: 'Non-Tech & Product Management',
    avatarColor: 'emerald',
    skills: ['Product Strategy', 'UI/UX Research', 'Agile', 'Case Studies'],
    bio: 'Transitioned from engineering to product leadership. Guides students interested in non-coding high-paying tech careers.'
  },
  {
    id: 'aditya-singh',
    name: 'Aditya Singh',
    role: 'AI / Machine Learning Engineer',
    company: 'Microsoft',
    badge: 'Microsoft Alum',
    batch: 'Batch 2022',
    domain: 'AI / ML & Data Science',
    avatarColor: 'cyan',
    skills: ['PyTorch', 'LLMs', 'Deep Learning', 'Data Pipelines'],
    bio: 'Conducts AI bootcamps and research paper discussions for Salaah members aiming for specialized AI careers.'
  }
];

export const PODCAST_EPISODES = [
  {
    id: 1,
    title: 'Ep. 12: Cracking Tier-1 Product Companies from a Tier-3 College',
    guest: 'Rohit Sharma (SDE @ Swiggy)',
    duration: '42 mins',
    category: 'Tech Career',
    views: '3.4K Listens',
    summary: 'How to build an unbeatable GitHub portfolio, master LeetCode DSA without burnout, and leverage alumni referrals effectively.',
    audioUrl: '#'
  },
  {
    id: 2,
    title: 'Ep. 11: The Non-Tech Goldmine: Transitioning to Product Management & Consulting',
    guest: 'Priya Mishra (Product Lead)',
    duration: '38 mins',
    category: 'Non-Tech & Career',
    views: '2.8K Listens',
    summary: 'A complete breakdown of PM case interviews, product sense questions, and breaking into management consulting as an engineer.',
    audioUrl: '#'
  },
  {
    id: 3,
    title: 'Ep. 10: Off-Campus Hiring Playbook: From Cold Emails to FAANG Offer Letters',
    guest: 'Arjun Verma (SDE @ Amazon)',
    duration: '55 mins',
    category: 'Interview Strategy',
    views: '4.9K Listens',
    summary: 'The step-by-step cold emailing framework on LinkedIn, resume optimization that bypasses ATS bots, and handling behavioral rounds.',
    audioUrl: '#'
  },
  {
    id: 4,
    title: 'Ep. 09: Generative AI & The Future of Engineering Jobs in 2026',
    guest: 'Aditya Singh (AI Researcher @ Microsoft)',
    duration: '46 mins',
    category: 'Future Tech',
    views: '3.1K Listens',
    summary: 'Why foundational problem solving matters more than ever, how to use AI tools as a multiplier, and building real AI apps in college.',
    audioUrl: '#'
  }
];

export const UPCOMING_BOOTCAMPS_EVENTS = [
  {
    id: 'dsa-bootcamp',
    title: '30-Day Ultimate DSA & Placement Sprint 2026',
    date: 'Starts Oct 28, 2026',
    time: '07:00 PM - 09:00 PM IST (Weekends)',
    location: 'Hybrid: Audi-2 ABESEC & Online Discord',
    instructor: 'Vineet Pathak & Swiggy SDEs',
    badge: 'FLAGSHIP BOOTCAMP',
    seatsLeft: '32 Seats Left',
    category: 'bootcamp',
    summary: 'Intensive problem-solving bootcamp covering Trees, Dynamic Programming, Graphs, and System Design basics with alumni feedback.'
  },
  {
    id: 'mock-drive',
    title: 'Super 50: Grand Alumni Mock Interview Drive',
    date: 'November 08, 2026',
    time: '10:00 AM - 05:00 PM IST',
    location: 'Virtual 1-on-1 Breakout Rooms',
    instructor: '15+ Alumni from HCLTech, Amazon, Swiggy',
    badge: '1-ON-1 INTERVIEWS',
    seatsLeft: '18 Slots Left',
    category: 'mock-interview',
    summary: 'Real-time technical and HR interview rounds with comprehensive rubric evaluation, resume roast, and personalized roadmap.'
  },
  {
    id: 'web-dev-hackathon',
    title: 'Salaah CodeSprint: 36-Hour College Hackathon',
    date: 'November 22-23, 2026',
    time: '36-Hour Marathon',
    location: 'ABESEC Tech Block & Virtual',
    instructor: 'Salaah Tech Guild & Industry Judges',
    badge: '₹50,000 PRIZE POOL',
    seatsLeft: 'Open Teams (2-4)',
    category: 'hackathon',
    summary: 'Build impactful web, mobile, and AI solutions for real-world campus & societal problems with alumni mentorship.'
  },
  {
    id: 'podcast-live',
    title: 'Live Podcast Recording: Behind the Recruiter Curtain',
    date: 'December 02, 2026',
    time: '06:30 PM IST',
    location: 'Salaah Media Studio & YouTube Live',
    instructor: 'Senior Tech Recruiters & Alumni Leads',
    badge: 'LIVE TALKSHOW',
    seatsLeft: 'Open Access',
    category: 'podcast',
    summary: 'Live Q&A with tech talent leads on what makes resumes stand out in 2026 placement cycles.'
  }
];

export const SALAAH_WINGS = [
  {
    id: 'tech-guild',
    title: 'Tech & Coding Guild',
    tagline: 'Code • Architect • Innovate',
    icon: 'Code2',
    color: 'emerald',
    lead: 'Yash Vardhan & Tech Mentors',
    description: 'The coding backbone of Salaah. We organize daily DSA challenges, full-stack workshops, open-source projects, and hackathon training.',
    metrics: { members: '180+ Active', workshops: '24 Held', projects: '12 Live' },
    initiatives: ['Daily LeetCode Discussion Threads', 'Full-Stack Project Incubator', 'Competitive Programming Cohorts']
  },
  {
    id: 'podcasts-media',
    title: 'Podcasts & Media Wing',
    tagline: 'Inspire • Broadcast • Connect',
    icon: 'Radio',
    color: 'cyan',
    lead: 'Rhea Sharma & Media Team',
    description: 'Home to "The Salaah Talkshow". We manage podcast scripting, high-end audio/video production, guest outreach, and video highlights.',
    metrics: { episodes: '45+ Released', reach: '50K+ Views', guests: '35+ Alumni' },
    initiatives: ['Weekly Alum Podcast Release', 'Tech Reel & Short Insights', 'Studio Sound & Video Engineering']
  },
  {
    id: 'mock-corporate',
    title: 'Corporate Readiness & Mock Interviews',
    tagline: 'Practice • Refine • Conquer',
    icon: 'UserCheck',
    color: 'gold',
    lead: 'Aman Dixit & HR Mentors',
    description: 'Simulating high-stakes technical, HR, and managerial rounds. Providing actionable scorecard evaluations before real placement drives.',
    metrics: { mocksDone: '420+', successRate: '94%', mentors: '25+ SDEs' },
    initiatives: ['1-on-1 Weekend Mock Slots', 'Resume Roast & ATS Optimization', 'Behavioral STAR Method Workshops']
  },
  {
    id: 'events-bootcamps',
    title: 'Bootcamps & Event Operations',
    tagline: 'Plan • Execute • Empower',
    icon: 'CalendarCheck',
    color: 'purple',
    lead: 'Kavya Singhal & Ops Crew',
    description: 'Architecting large-scale college bootcamps, industrial visits, alumni meetups, and flagship annual hackathons.',
    metrics: { events: '30+ Annually', attendees: '2,500+', sponsors: '8 Brands' },
    initiatives: ['Annual Salaah CodeSprint Hackathon', 'Placement Prep Bootcamps', 'Alumni Homecoming Summit']
  },
  {
    id: 'alumni-relations',
    title: 'Alumni Network & Relations Wing',
    tagline: 'Bridge • Network • Elevate',
    icon: 'Network',
    color: 'cyan',
    lead: 'Devansh Tyagi & Alumni Officers',
    description: 'Building and nurturing the lifetime directory of ABESEC alumni across top tech companies worldwide to facilitate referrals.',
    metrics: { alumniConnected: '150+', companies: '60+ Firms', referrals: '110+' },
    initiatives: ['Alumni Mentorship Registry', 'Company-Specific Referral Drives', 'Annual Alumni Mixer']
  },
  {
    id: 'design-pr',
    title: 'Creative Design, PR & Social Growth',
    tagline: 'Design • Amplify • Brand',
    icon: 'Palette',
    color: 'emerald',
    lead: 'Simran Rawat & Design Guild',
    description: 'Crafting stunning visual identity, cyber UI/UX, viral Instagram campaigns, LinkedIn presence, and event branding.',
    metrics: { followers: '10K+ Combined', posts: '200+ Designs', campaigns: '15+' },
    initiatives: ['Instagram & LinkedIn Social Engine', 'Event Cyber Badges & UI Kits', 'Community Merchandise & Swag']
  }
];
