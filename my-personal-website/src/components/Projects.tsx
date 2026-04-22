"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "fullstack", label: "Full Stack" },
  { key: "enterprise", label: "Enterprise" },
] as const;

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="container mx-auto px-6 py-32 max-w-6xl">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block">
          Projects
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-muted-foreground mt-4 max-w-lg mb-8">
          A selection of production systems I&apos;ve built — from AI-powered
          platforms to enterprise management solutions.
        </p>
      </ScrollReveal>

      {/* Filter tabs */}
      <ScrollReveal delay={0.15}>
        <div className="flex gap-2 mb-12 flex-wrap">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer border ${
                activeFilter === key
                  ? "bg-electric-blue/10 text-electric-blue border-electric-blue/30 shadow-glow-blue"
                  : "bg-white/[0.02] text-muted-foreground/60 border-white/[0.06] hover:border-white/[0.1] hover:text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Project grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
