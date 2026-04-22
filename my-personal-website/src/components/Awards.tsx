"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { awards, personalInfo } from "@/data/projects";
import { Trophy, GraduationCap, Code2, MapPin, Calendar } from "lucide-react";

const typeConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  hackathon: { icon: Trophy, color: "text-amber-400" },
  academic: { icon: GraduationCap, color: "text-blue-400" },
  competition: { icon: Code2, color: "text-purple-400" },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Awards() {
  const edu = personalInfo.education;

  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Education */}
        <div>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text inline-block">
              Education
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-card p-6 hover:shadow-glow-card transition-shadow duration-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {edu.university}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground/60 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {edu.location}
                </span>
              </div>

              {/* CGPA highlight */}
              <div className="bg-gradient-to-r from-electric-blue/10 to-electric-purple/10 rounded-xl px-4 py-3 border border-electric-blue/10">
                <p className="text-xs text-muted-foreground/50 mb-1">CGPA</p>
                <p className="text-2xl font-bold gradient-text inline-block">
                  {edu.cgpa}
                </p>
              </div>

              {/* Languages */}
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <p className="text-xs text-muted-foreground/40 mb-2">Languages</p>
                <div className="flex gap-2">
                  {personalInfo.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-muted-foreground/70"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Awards */}
        <div>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text inline-block">
              Awards
            </h2>
          </ScrollReveal>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-2"
          >
            {awards.map((award) => {
              const config = typeConfig[award.type] || typeConfig.hackathon;
              const Icon = config.icon;
              return (
                <motion.li
                  key={award.title}
                  variants={itemVariants}
                  className="glass-card px-4 py-3 flex items-center gap-3 hover:shadow-glow-card transition-shadow duration-500"
                >
                  <Icon className={`w-4 h-4 shrink-0 ${config.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground/90 truncate">
                      {award.title}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground/50 shrink-0">
                    {award.year}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
