"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareCode,
  Bot,
  BrainCircuit,
  Banknote,
  ReceiptText,
  FileText,
  GraduationCap,
  Factory,
  Building2,
  Ticket,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Project } from "@/data/projects";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquareCode,
  Bot,
  BrainCircuit,
  Banknote,
  ReceiptText,
  FileText,
  GraduationCap,
  Factory,
  Building2,
  Ticket,
  Sparkles,
};

/* Fullscreen lightbox for a project's media */
function Lightbox({
  media,
  index,
  onClose,
  onNav,
}: {
  media: NonNullable<Project["media"]>;
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % media.length);
      if (e.key === "ArrowLeft")
        onNav((index - 1 + media.length) % media.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, media.length, onClose, onNav]);

  const item = media[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[80vh] rounded-xl border border-white/10 shadow-2xl cursor-default"
      />
      <p
        onClick={(e) => e.stopPropagation()}
        className="mt-4 max-w-2xl text-center text-xs text-white/50 cursor-default"
      >
        {item.alt}
      </p>
      {media.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-3 flex items-center gap-4 cursor-default"
        >
          <button
            onClick={() => onNav((index - 1 + media.length) % media.length)}
            aria-label="Previous"
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-white/40">
            {index + 1} / {media.length}
          </span>
          <button
            onClick={() => onNav((index + 1) % media.length)}
            aria-label="Next"
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  ai: { label: "AI", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  fullstack: { label: "Full Stack", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  enterprise: { label: "Enterprise", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

const typeLabels: Record<string, { label: string; color: string }> = {
  personal: { label: "Personal", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  company: { label: "Inside Advisory", color: "bg-white/[0.04] text-muted-foreground/70 border-white/[0.08]" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.icon] || FileText;
  const cat = categoryLabels[project.category];
  const ownership = typeLabels[project.type];
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group glass-card overflow-hidden hover:shadow-glow-card transition-shadow duration-500 h-full flex flex-col"
    >
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
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
          <span
            className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ml-auto ${ownership.color}`}
          >
            {ownership.label}
          </span>
        </div>

        {/* Title + Tagline */}
        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground/70 mb-4">
          {project.tagline}
        </p>

        {/* Outcome metrics — the numbers recruiters scan for */}
        {project.metrics && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-electric-blue/10 border border-electric-blue/25 text-electric-blue"
              >
                {m}
              </span>
            ))}
          </div>
        )}

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
        <ul className="space-y-1.5 flex-1">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground/60 leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-electric-blue/40 mt-0.5 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Visual proof: screenshot / diagram thumbnails */}
        {project.media && project.media.length > 0 && (
          <div className="mt-4 flex gap-2">
            {project.media.map((m, i) => (
              <button
                key={m.src}
                onClick={() => setLightbox(i)}
                className="group/thumb relative flex-1 max-w-[9rem] aspect-video overflow-hidden rounded-lg border border-white/[0.08] hover:border-electric-blue/50 transition-colors cursor-zoom-in"
                aria-label={`View: ${m.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        )}

        {/* Portal to body: the card's hover transform would otherwise trap
            position:fixed inside the card */}
        {lightbox !== null &&
          project.media &&
          createPortal(
            <AnimatePresence>
              <Lightbox
                media={project.media}
                index={lightbox}
                onClose={() => setLightbox(null)}
                onNav={setLightbox}
              />
            </AnimatePresence>,
            document.body
          )}

        {/* Links (if available) */}
        {(project.link || project.demo) && (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-electric-blue/70 hover:text-electric-blue transition-colors duration-300 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-electric-blue/70 hover:text-electric-blue transition-colors duration-300 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
