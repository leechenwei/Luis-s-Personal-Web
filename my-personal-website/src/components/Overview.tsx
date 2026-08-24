"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  FileText,
  MessageCircle,
  MapPin,
  Gamepad2,
  ExternalLink,
  ChevronDown,
  BrainCircuit,
  Bot,
  Factory,
  Sparkles,
} from "lucide-react";
import { personalInfo, projects } from "@/data/projects";

/* The 10-second recruiter screen: who, proof, contact — one viewport. */

const STATS = [
  { value: "11", label: "production systems" },
  { value: "RM5k", label: "MRR delivered" },
  { value: "8–10", label: "daily AI-assistant users" },
  { value: "86.8%", label: "intent F1 (dialogue FYP)" },
];

const TOP_SKILLS = [
  "RAG",
  "LangGraph",
  "Agent Orchestration",
  "Next.js",
  "Supabase · pgvector",
  "Claude / Gemini / OpenAI APIs",
];

const FLAGSHIPS = [
  {
    icon: BrainCircuit,
    title: "Self-Evaluating Agentic RAG",
    impact: "Hybrid retrieval + built-in Hit@k/MRR evals · public demo",
    href: projects.find((p) => p.id === "self-evaluating-rag")?.demo,
    external: true,
    cta: "Live demo",
  },
  {
    icon: Bot,
    title: "Inside Assistant",
    impact: "Multi-channel AI (WhatsApp/Web/Lark), pgvector memory · 8–10 DAU",
    href: "#projects",
    external: false,
    cta: "Proof",
  },
  {
    icon: Factory,
    title: "Steel Manufacturing ERP",
    impact: "QR-driven FIFO costing · 20 daily users on the shop floor",
    href: "#projects",
    external: false,
    cta: "Proof",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45 },
});

export default function Overview() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative z-10 flex-1 container mx-auto px-5 md:px-8 max-w-6xl flex flex-col justify-center py-6 md:py-10 gap-5 md:gap-7">
        {/* Identity row */}
        <motion.div
          {...fadeUp(0.05)}
          className="flex items-center gap-4 md:gap-6"
        >
          <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden ring-2 ring-electric-blue/30 ring-offset-2 ring-offset-background">
            <Image
              src="/images/LCW.jpeg"
              alt={personalInfo.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              {personalInfo.name}{" "}
              <span className="gradient-text">({personalInfo.alias})</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              {personalInfo.title} · production LLM systems
            </p>
            <p className="flex items-center gap-3 text-[11px] md:text-xs text-muted-foreground/60 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {personalInfo.location}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-medium">
                2 weeks&apos; notice
              </span>
            </p>
          </div>
        </motion.div>

        {/* Impact stats */}
        <motion.div
          {...fadeUp(0.15)}
          className="grid grid-cols-4 gap-2 md:gap-3"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="glass-card px-2 py-2.5 md:px-4 md:py-4 text-center"
            >
              <p className="text-lg md:text-3xl font-bold gradient-text">
                {s.value}
              </p>
              <p className="text-[9px] md:text-xs text-muted-foreground/60 leading-tight mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Flagship projects */}
        <motion.div {...fadeUp(0.25)} className="grid md:grid-cols-3 gap-2.5">
          {FLAGSHIPS.map(({ icon: Icon, title, impact, href, external, cta }) => (
            <a
              key={title}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group glass-card px-4 py-3 flex items-center md:flex-col md:items-start gap-3 md:gap-2 hover:shadow-glow-card transition-shadow duration-300 cursor-pointer"
            >
              <Icon className="w-5 h-5 text-electric-blue shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate md:whitespace-normal">
                  {title}
                </p>
                <p className="text-[11px] text-muted-foreground/60 leading-snug">
                  {impact}
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-medium text-electric-blue/80 group-hover:text-electric-blue">
                {cta}
                <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </motion.div>

        {/* Skills line */}
        <motion.div
          {...fadeUp(0.35)}
          className="flex flex-wrap justify-center gap-1.5 md:gap-2"
        >
          {TOP_SKILLS.map((s) => (
            <span
              key={s}
              className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-muted-foreground/80"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-wrap justify-center items-center gap-2 md:gap-3"
        >
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-accent text-white text-sm font-medium hover:shadow-glow-blue transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-sm text-foreground/90 hover:shadow-glow-blue transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-xl glass-card hover:shadow-glow-blue transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-muted-foreground" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-xl glass-card hover:shadow-glow-blue transition-all cursor-pointer"
          >
            <Linkedin className="w-4 h-4 text-muted-foreground" />
          </a>
        </motion.div>
      </div>

      {/* Gateway: the curiosity gap into the full experience */}
      <motion.div
        {...fadeUp(0.6)}
        className="relative z-10 pb-5 md:pb-7 px-5"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center gap-2.5">
          <p className="text-[11px] md:text-xs text-muted-foreground/50 text-center">
            That&apos;s the 10-second version — the full story has{" "}
            <span className="text-foreground/80 font-medium">
              11 projects, live screenshots, architecture diagrams
            </span>{" "}
            and an AI that answers questions about me.
          </p>
          <div className="flex gap-2.5">
            <button
              onClick={() =>
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-electric-blue/30 bg-electric-blue/5 text-xs md:text-sm font-medium text-electric-blue hover:bg-electric-blue/15 transition-all cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 animate-bounce" />
              Explore the full portfolio
            </button>
            <Link
              href="/3d"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-violet-400/30 bg-violet-500/5 text-xs md:text-sm font-medium text-violet-300 hover:bg-violet-500/15 transition-all cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              …or walk it in 3D
            </Link>
          </div>
          <p className="hidden md:flex items-center gap-1 text-[10px] text-muted-foreground/30">
            <Sparkles className="w-3 h-3" />
            or just ask the AI, bottom right
          </p>
        </div>
      </motion.div>
    </div>
  );
}
