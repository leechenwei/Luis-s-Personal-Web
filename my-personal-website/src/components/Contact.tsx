"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { personalInfo } from "@/data/projects";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const links = [
  {
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    label: "Email",
    detail: personalInfo.email,
  },
  {
    href: personalInfo.github,
    icon: Github,
    label: "GitHub",
    detail: "leechenwei",
  },
  {
    href: personalInfo.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    detail: "luislcw02",
  },
];

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl">
      <div className="text-center mb-16">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Let&apos;s Build</span>
            <br />
            <span className="text-foreground">Something Together</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            I&apos;m currently open to AI Engineer opportunities and exciting
            collaboration projects.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-accent text-white font-medium text-sm hover:shadow-glow-blue transition-all duration-300 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            View Resume
          </a>
        </ScrollReveal>
      </div>

      {/* Contact cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
      >
        {links.map(({ href, icon: Icon, label, detail }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4 },
              },
            }}
            whileHover={{ y: -4 }}
            className="glass-card p-5 flex flex-col items-center gap-3 hover:shadow-glow-blue transition-all duration-300 cursor-pointer group"
          >
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-electric-blue transition-colors duration-300" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground/50">{detail}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="text-center mt-24 pt-8 border-t border-white/[0.04]">
        <p className="text-xs text-muted-foreground/30">
          &copy; {new Date().getFullYear()} Lee Chen Wei. Built with Next.js &
          Framer Motion.
        </p>
      </div>
    </div>
  );
}
