"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { experiences } from "@/data/projects";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 gradient-text inline-block">
          Experience
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue/50 via-electric-purple/50 to-transparent" />

        {experiences.map((exp, index) => (
          <ScrollReveal
            key={exp.company}
            direction={exp.side === "right" ? "right" : "left"}
            delay={index * 0.15}
          >
            <div
              className={`relative flex items-start gap-8 mb-16 ${
                exp.side === "right"
                  ? "md:flex-row md:pl-[calc(50%+2rem)] pl-12"
                  : "md:flex-row-reverse md:pr-[calc(50%+2rem)] pl-12 md:pl-0"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  className="w-8 h-8 rounded-full bg-dark-surface border-2 border-electric-blue/50 flex items-center justify-center shadow-glow-blue"
                >
                  <Briefcase className="w-3.5 h-3.5 text-electric-blue" />
                </motion.div>
              </div>

              {/* Content card */}
              <div className="glass-card p-6 flex-1 hover:shadow-glow-card transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-electric-blue/10 text-electric-blue border border-electric-blue/20">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {exp.company}
                </h3>
                <p className="text-sm text-electric-blue/80">{exp.role}</p>
                <p className="text-xs text-muted-foreground/40 mb-4">{exp.location}</p>
                <ul className="space-y-2">
                  {exp.description.map((point, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                    >
                      <span className="text-electric-blue/40 mt-1.5 shrink-0">
                        &mdash;
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
