export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  category: "ai" | "fullstack" | "enterprise";
  // Ownership axis, separate from category: who the project was built for.
  type: "personal" | "company";
  icon: string;
  link?: string;
  demo?: string;
  // Short measurable-outcome chips ("86.8% intent F1") — only real numbers.
  metrics?: string[];
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
  title: "Applied AI Engineer",
  subtitle: "AI Fresh Graduate",
  location: "Selangor, Malaysia",
  email: "LuisLCW02@gmail.com",
  phone: "+60 16-219 3255",
  whatsapp: "https://wa.me/60162193255",
  github: "https://github.com/leechenwei",
  linkedin: "https://www.linkedin.com/in/lcw02/",
  resumeUrl: "/Lee_Chen_Wei_Resume.pdf",
  bio: "I'm an Applied AI Engineer building production LLM-powered systems. I deployed a public Self-Evaluating Agentic RAG and shipped a multi-channel AI assistant with identity-scoped vector memory at Inside Advisory — turning agentic retrieval, automation, and full-stack engineering into tools that help SMEs digitalize and scale. Fresh graduate from University of Malaya, available immediately.",
  education: {
    university: "University of Malaya",
    degree: "Bachelor of Computer Science (Artificial Intelligence)",
    period: "Oct 2022 — March 2026",
    cgpa: "3.80 / 4.00",
    location: "Kuala Lumpur, Malaysia",
    transcriptUrl: "/UM_Transcript_ChenWei.pdf",
    diplomaUrl: "/Diploma_Certificate.pdf",
  },
  languages: ["Mandarin", "English", "Bahasa Melayu"],
};

export const projects: Project[] = [
  {
    id: "self-evaluating-rag",
    title: "Self-Evaluating Agentic RAG",
    tagline: "RAG chatbot with a built-in evaluation workflow",
    description:
      "A production-shaped RAG chatbot where users curate a golden Q&A dataset, run regression-style evaluations on demand, and track metric deltas across config changes — turning 'is the chatbot still accurate?' into a number you can graph.",
    tech: [
      "Python",
      "Streamlit",
      "Gemini 2.5 Flash",
      "LangGraph",
      "ChromaDB",
      "BM25 + Reranker",
    ],
    highlights: [
      "Hybrid retrieval — dense (ChromaDB + MiniLM) + BM25, fused via Reciprocal Rank Fusion, reranked with a BGE cross-encoder",
      "Agentic loop with function-calling: the LLM decides when to retrieve, rewrite, or honestly refuse — orchestrated via a LangGraph StateGraph",
      "User-curated golden dataset with live Hit@k, MRR, keyword and refusal-accuracy metrics",
      "Per-session multi-tenant isolation, bring-your-own-key, and zero server-side persistence",
    ],
    category: "ai",
    type: "personal",
    metrics: ["Hit@k / MRR / refusal-accuracy evals built-in", "Public BYOK demo"],
    icon: "BrainCircuit",
    link: "https://github.com/leechenwei/Agentic-RAG",
    demo: "https://chenwei-rag.streamlit.app/",
  },
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
    type: "personal",
    metrics: ["86.8% intent F1", "94.3% slot filling", "86.7% task completion"],
    icon: "MessageSquareCode",
    link: "https://github.com/leechenwei/TOD-for-Hotel-Booking",
  },
  {
    id: "payslip-system",
    title: "Malaysia Payslip System",
    tagline: "Auto EPF/SOCSO/EIS payslip generator for SMEs",
    description:
      "A Next.js app for SSM-registered businesses to issue compliant payslips — auto-calculating EPF, SOCSO and EIS from 2024 KWSP/PERKESO rates, generating PDFs, and persisting immutable snapshots so old payslips never silently change when rates update.",
    tech: [
      "Next.js",
      "Supabase",
      "TypeScript",
      "PDF Generation",
      "Tailwind CSS",
    ],
    highlights: [
      "Live deduction preview with EPF/SOCSO/EIS auto-calculation on 2024 statutory rates",
      "Immutable payslip snapshots — historical records stay correct across rate changes",
      "Magic-link auth and per-business data isolation via Supabase",
      "One-click PDF generation with short-lived signed-URL downloads",
    ],
    category: "fullstack",
    type: "personal",
    icon: "Banknote",
  },
  {
    id: "xin-jin-invoice",
    title: "XIN JIN Invoice",
    tagline: "Offline desktop invoice generator for a real business",
    description:
      "A 100% offline Electron desktop app built for a non-technical end user — one-click invoicing with client/item autocomplete, auto-calculated totals, print/PDF export, and searchable history, all backed by local SQLite (no accounts, no cloud, no fees).",
    tech: [
      "Electron",
      "React",
      "Vite",
      "SQLite",
      "TypeScript",
      "Tailwind CSS",
    ],
    highlights: [
      "Fully offline — local SQLite storage at the OS-standard user-data path",
      "Typed IPC bridge isolating the SQL layer from the React renderer",
      "Autocomplete for clients and items with live total calculation",
      "One-click print or PDF export with searchable invoice history",
    ],
    category: "fullstack",
    type: "personal",
    icon: "ReceiptText",
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
    type: "company",
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
    type: "company",
    metrics: ["8\u201310 daily internal users", "3 channels"],
    icon: "Bot",
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
    type: "company",
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
    type: "company",
    metrics: ["150+ students", "E2E tested"],
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
    type: "company",
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
    type: "company",
    metrics: ["10+ modules", "20 daily users"],
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
    type: "company",
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
      "Built 'Inside Assistant' — a production multi-channel AI system (WhatsApp / Web / Lark) on Next.js with identity-scoped vector memory using Supabase pgvector and OpenAI text-embedding-3-small; migrated the LLM backend from a self-hosted Claude proxy to BytePlus for cost efficiency, serving 8–10 internal users",
      "Prototyped 'AI Conversational Lead Intelligence' — a real-time WhatsApp webhook pipeline with multi-criteria LLM-based lead scoring and Groq Whisper voice/image transcription for CRM intelligence",
      "Delivered 3 client SaaS apps end-to-end on Next.js + Supabase (RM5k MRR) across AV/IoT, steel manufacturing, and education — an ERP with 10+ modules (20 daily users), a FIFO manufacturing system with QR-driven cutting operations, and a coding-school platform; also automated P&L / balance-sheet pipelines with n8n and Node/Express plus a live dashboard",
      "Maintain 3 pre-existing production SaaS systems (pest control, fire safety, concrete manufacturing) — bug fixes, feature requests, user support, and performance triage across TypeScript / Node.js codebases",
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
  // AI / LLM
  { name: "RAG", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "Hybrid Search (Dense + BM25)", category: "ai" },
  { name: "RRF", category: "ai" },
  { name: "BGE Reranker", category: "ai" },
  { name: "Function Calling", category: "ai" },
  { name: "Agent Orchestration", category: "ai" },
  { name: "RAG Evaluation (Hit@k, MRR)", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  // LLM APIs
  { name: "BytePlus", category: "ai" },
  { name: "Google Gemini", category: "ai" },
  { name: "Anthropic Claude", category: "ai" },
  { name: "OpenAI", category: "ai" },
  { name: "Groq", category: "ai" },
  // Languages
  { name: "Python", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "SQL", category: "language" },
  // Frontend
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Streamlit", category: "frontend" },
  { name: "PWA", category: "frontend" },
  // Backend / Data
  { name: "Node.js", category: "backend" },
  { name: "Flask", category: "backend" },
  { name: "Supabase (PostgreSQL)", category: "backend" },
  { name: "pgvector", category: "backend" },
  { name: "ChromaDB", category: "backend" },
  { name: "Upstash Redis", category: "backend" },
  // Infra / Tooling / Testing
  { name: "Vercel", category: "devops" },
  { name: "Zeabur", category: "devops" },
  { name: "n8n", category: "devops" },
  { name: "Git", category: "devops" },
  { name: "Playwright", category: "devops" },
  { name: "pytest", category: "devops" },
  { name: "Vitest", category: "devops" },
  { name: "Evolution API", category: "devops" },
  { name: "Lark SDK", category: "devops" },
];
