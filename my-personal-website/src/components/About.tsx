"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { personalInfo, techStack } from "@/data/projects";

const categoryColors: Record<string, string> = {
  language: "from-blue-500/20 to-blue-600/10 border-blue-500/20",
  frontend: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
  backend: "from-green-500/20 to-green-600/10 border-green-500/20",
  ai: "from-amber-500/20 to-amber-600/10 border-amber-500/20",
  devops: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function About() {
  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text inline-block">
          About Me
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-lg text-muted-foreground leading-relaxed mb-16 max-w-2xl">
          {personalInfo.bio}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <h3 className="text-sm uppercase tracking-widest text-muted-foreground/60 mb-6">
          Tech Stack
        </h3>
      </ScrollReveal>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            className={`group relative px-4 py-3 rounded-xl border bg-gradient-to-b ${
              categoryColors[tech.category] || categoryColors.language
            } hover:shadow-glow-blue transition-all duration-300 cursor-default text-center`}
          >
            <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
