export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  category: "ai" | "fullstack" | "enterprise";
  icon: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  side: "left" | "right";
}

export interface Award {
  title: string;
  year: string;
  type: "hackathon" | "academic" | "competition";
}

export const personalInfo = {
  name: "Lee Chen Wei",
  alias: "Luis",
  title: "Full-stack Developer & AI Engineer",
  subtitle: "AI Fresh Graduate",
  email: "LuisLCW02@gmail.com",
  phone: "(60) 16-2193255",
  github: "https://github.com/leechenwei",
  linkedin: "https://www.linkedin.com/in/lcw02/",
  resumeUrl: "/Lee_Chen_Wei_Resume.pdf",
  bio: "I build AI-powered systems and full-stack applications that solve real business problems. From agentic automation workflows with n8n and Dify AI to education platforms and manufacturing ERPs, I focus on delivering practical solutions that help SMEs digitalize and scale.",
  education: {
    university: "University of Malaya",
    degree: "Bachelor of Computer Science (Artificial Intelligence)",
    period: "Oct 2022 — March 2026",
    cgpa: "3.80 / 4.00",
    location: "Kuala Lumpur, Malaysia",
  },
  languages: ["Mandarin", "English", "Bahasa Melayu"],
};

export const projects: Project[] = [
  {
    id: "dialogue-system-fyp",
    title: "Task-oriented Dialogue System",
    tagline: "Multi-turn conversational AI with hybrid NLU architecture (FYP)",
    description:
      "Architected a multi-turn conversational AI for automated scheduling and database querying, featuring a hybrid NLU architecture that routes between Rasa NLU for fast intent recognition and LLM fallback for complex queries.",
    tech: [
      "Python",
      "Flask",
      "Rasa NLU",
      "LLM Integration",
      "Dialogue State Tracking",
      "NLP Pipeline",
    ],
    highlights: [
      "Structured Dialogue State Tracker (DST) for multi-turn goal tracking",
      "Hybrid NLU: Rasa for speed, LLM fallback for complex/ambiguous queries",
      "Modular NLP pipeline with intent classification and slot filling",
      "Real-time backend API for data retrieval and task completion",
    ],
    category: "ai",
    icon: "MessageSquareCode",
  },
  {
    id: "ai-lead-intelligence",
    title: "AI Conversational Lead Intelligence",
    tagline: "AI-powered lead scoring from messaging conversations",
    description:
      "Built an end-to-end platform that captures business conversations via webhook, transcribes voice messages with AI, scores leads using Claude AI analysis, and syncs insights to CRM — processing thousands of conversations in real-time.",
    tech: [
      "Next.js",
      "Claude AI",
      "Hono.js",
      "Supabase",
      "Evolution API",
      "Groq Whisper",
    ],
    highlights: [
      "Real-time webhook processing pipeline for incoming messages",
      "AI-powered lead scoring with multi-criteria analysis",
      "Voice message transcription via Groq Whisper",
      "Automated CRM sync with conversation summaries",
    ],
    category: "ai",
    icon: "Bot",
  },
  {
    id: "enterprise-ai-assistant",
    title: "Enterprise AI Assistant",
    tagline: "Internal AI with calendar, docs, and contextual memory",
    description:
      "Developed an enterprise AI assistant that integrates with calendar, document management, and team communication platforms. Features dual-brain modes for personal vs. company context, with persistent memory per user.",
    tech: ["Next.js", "Claude AI", "Lark SDK", "Supabase", "OAuth 2.0"],
    highlights: [
      "Dual-brain architecture: personal context vs. company knowledge",
      "Calendar management and meeting scheduling via AI",
      "Document creation and editing through natural language",
      "Per-user contextual memory with conversation history",
    ],
    category: "ai",
    icon: "Bot",
  },
  {
    id: "ai-marketing-generator",
    title: "AI Marketing Content Generator",
    tagline: "Multi-model AI platform for marketing asset creation",
    description:
      "Created a marketing platform leveraging multiple AI models for content generation, image creation, and design mockups. Includes a built-in canvas editor for real-time design customization.",
    tech: [
      "Next.js",
      "Google Generative AI",
      "OpenAI",
      "Replicate",
      "Fabric.js",
      "Supabase",
    ],
    highlights: [
      "Multi-model AI generation (text, images, design)",
      "Interactive canvas editor powered by Fabric.js",
      "Template system for repeatable marketing assets",
      "Multi-platform export for social media formats",
    ],
    category: "ai",
    icon: "Palette",
  },
  {
    id: "document-generation-engine",
    title: "Document Generation Engine",
    tagline: "Enterprise database-to-PDF template system",
    description:
      "Built a document generation system that transforms database records into formatted PDFs using a drag-and-drop template builder. Supports dynamic field mapping, loop tables, conditional content, and image embedding.",
    tech: [
      "React",
      "TypeScript",
      "Lark Block SDK",
      "jsPDF",
      "Webpack",
      "PDF Automation",
    ],
    highlights: [
      "Visual drag-and-drop PDF template designer",
      "Dynamic field mapping with live preview",
      "Loop tables for repeating record groups",
      "Automated batch PDF generation from database queries",
    ],
    category: "enterprise",
    icon: "FileText",
  },
  {
    id: "education-management",
    title: "Education Management Platform",
    tagline: "Full-stack system for a 150+ student coding academy",
    description:
      "Designed and built a complete management system for a coding academy — handling student enrollment, coach scheduling, attendance tracking, billing, and replacement credit workflows.",
    tech: [
      "Next.js",
      "Supabase",
      "React Hook Form",
      "Zod",
      "Playwright",
      "Tailwind CSS",
    ],
    highlights: [
      "End-to-end enrollment workflow with form validation",
      "Coach-to-student ratio tracking and scheduling",
      "Attendance management with replacement credits",
      "E2E tested with Playwright across critical flows",
    ],
    category: "fullstack",
    icon: "GraduationCap",
  },
  {
    id: "manufacturing-erp",
    title: "Manufacturing Resource Planning",
    tagline: "Steel manufacturing ERP with FIFO inventory tracking",
    description:
      "Built a manufacturing ERP system for steel processing — tracking coil inventory, cutting operations, job sheets, and cost optimization with FIFO distribution logic and multi-language support.",
    tech: [
      "Next.js",
      "Supabase",
      "i18next",
      "QR Codes",
      "Tailwind CSS",
      "RLS Security",
    ],
    highlights: [
      "FIFO-based coil distribution with weight calculations",
      "QR code-driven operations for cutting sessions",
      "Multi-language support (English, Chinese, Malay)",
      "Row-Level Security for role-based data access",
    ],
    category: "enterprise",
    icon: "Factory",
  },
  {
    id: "multi-tenant-saas",
    title: "Multi-tenant Strategic SaaS",
    tagline: "Workspace platform with 7+ integrated business modules",
    description:
      "Developed a multi-tenant SaaS platform providing strategic planning, CRM, inventory, sales management, document parsing, and project management — all within isolated tenant workspaces.",
    tech: [
      "React",
      "Koa.js",
      "Supabase",
      "i18next",
      "Vercel Serverless",
      "Multi-tenant",
    ],
    highlights: [
      "Multi-tenant architecture with workspace isolation",
      "7+ integrated modules (CRM, Inventory, Sales, Projects)",
      "Real-time collaboration across team members",
      "Internationalization for multi-region deployment",
    ],
    category: "enterprise",
    icon: "Building2",
  },
  {
    id: "event-ticketing-pwa",
    title: "Real-time Event Ticketing PWA",
    tagline: "QR-based check-in with live analytics dashboard",
    description:
      "Created a progressive web app for event ticketing — featuring QR code generation and scanning, real-time check-in tracking, analytics dashboard, and offline capability for venue use.",
    tech: [
      "Next.js",
      "Supabase",
      "html5-qrcode",
      "Recharts",
      "PWA",
      "WhatsApp API",
    ],
    highlights: [
      "Offline-capable PWA for venue scanning",
      "Real-time analytics dashboard with live counters",
      "QR code generation and high-speed scanning",
      "Automated ticket delivery via WhatsApp integration",
    ],
    category: "fullstack",
    icon: "Ticket",
  },
];

export const experiences: Experience[] = [
  {
    company: "Inside Advisory Sdn Bhd",
    role: "Full-stack Developer & AI Engineer",
    period: "Aug 2025 — Present",
    location: "Puchong, Malaysia",
    description: [
      "Developed and deployed full-stack applications for SMEs using Next.js, Supabase, and Vercel",
      "Engineered agentic automation workflows using n8n and Dify AI, integrating LLMs like Llama 3.2 and Claude API",
      "Integrated local and cloud LLMs (DeepSeek, GPT-4, Qwen) to build custom R&D tools and AI features",
      "Designed BI dashboards transforming raw client data into real-time visual insights",
    ],
    side: "right",
  },
  {
    company: "Dell Technologies",
    role: "Software Engineer Intern",
    period: "Jul 2024 — Jan 2025",
    location: "Cyberjaya, Malaysia",
    description: [
      "Designed and independently developed key modules for an agentless Database Monitoring System automating real-time tracking across Oracle environments",
      "Expanded centralized monitoring to 3 database types, reducing reliance on manual checks and agent installations",
      "Implemented integrated alerting with critical categorization, improving resource visibility and cross-team incident response",
    ],
    side: "left",
  },
  {
    company: "Great Impressive Management Services",
    role: "Database Specialist Intern",
    period: "Jun 2022 — Sept 2022",
    location: "Klang, Malaysia",
    description: [
      "Managed data entry and maintenance in SQL Accounting Software, ensuring database integrity and availability",
      "Maintained IT devices and accounting software, minimizing downtime for company systems",
    ],
    side: "right",
  },
];

export const awards: Award[] = [
  {
    title: "Dell Hack2Hire Honorable Mention",
    year: "2023",
    type: "hackathon",
  },
  {
    title: "UMHackathon 2nd Runner-Up — Healthcare Domain",
    year: "2023",
    type: "hackathon",
  },
  {
    title: "Programming League National — UM 2nd Runner-Up",
    year: "2023",
    type: "competition",
  },
  { title: "Dean's List — Y4S1", year: "2025/2026", type: "academic" },
  { title: "Dean's List — Y3S2", year: "2025", type: "academic" },
  { title: "Dean's List — Y3S1", year: "2024/2025", type: "academic" },
  { title: "Dean's List — Y2S2", year: "2024", type: "academic" },
  { title: "Dean's List — Y2S1", year: "2023/2024", type: "academic" },
  { title: "Dean's List — Y1S1", year: "2022/2023", type: "academic" },
];

export const techStack = [
  { name: "Python", category: "language" },
  { name: "SQL", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Flask", category: "backend" },
  { name: "Supabase", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Claude AI", category: "ai" },
  { name: "Dify AI", category: "ai" },
  { name: "RAG", category: "ai" },
  { name: "n8n", category: "ai" },
  { name: "Prompt Eng.", category: "ai" },
  { name: "TensorFlow", category: "ai" },
  { name: "PyTorch", category: "ai" },
  { name: "Scikit-Learn", category: "ai" },
  { name: "Docker", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Linux", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "Git", category: "devops" },
  { name: "Claude Code", category: "devops" },
  { name: "Lark CLI", category: "devops" },
];
