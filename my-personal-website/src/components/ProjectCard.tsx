"use client";

import { motion } from "framer-motion";
import {
  MessageSquareCode,
  Bot,
  Palette,
  FileText,
  GraduationCap,
  Factory,
  Building2,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import VideoPlaceholder from "./VideoPlaceholder";
import type { Project } from "@/data/projects";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquareCode,
  Bot,
  Palette,
  FileText,
  GraduationCap,
  Factory,
  Building2,
  Ticket,
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  ai: { label: "AI", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  fullstack: { label: "Full Stack", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  enterprise: { label: "Enterprise", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.icon] || FileText;
  const cat = categoryLabels[project.category];

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group glass-card overflow-hidden hover:shadow-glow-card transition-shadow duration-500 h-full"
    >
      {/* Video / Placeholder */}
      <div className="p-4 pb-0">
        <VideoPlaceholder />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category + Icon */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <Icon className="w-4 h-4 text-electric-blue" />
          </div>
          <span
            className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${cat.color}`}
          >
            {cat.label}
          </span>
        </div>

        {/* Title + Tagline */}
        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground/70 mb-4">
          {project.tagline}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-muted-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground/60 leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-electric-blue/40 mt-0.5 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
