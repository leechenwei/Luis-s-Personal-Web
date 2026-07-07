"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, MapPin, Gamepad2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/data/projects";

const socials = [
  { href: personalInfo.github, icon: Github, label: "GitHub" },
  { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
];

const letterAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  const fullName = `${personalInfo.name} (${personalInfo.alias})`;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid overlay for hero section */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-electric-blue/30 ring-offset-4 ring-offset-background">
            <Image
              src="/images/LCW.jpeg"
              alt={personalInfo.name}
              width={160}
              height={160}
              className="object-cover w-full h-full scale-[2.5]"
              priority
            />
          </div>
        </motion.div>

        {/* Name — letter-by-letter reveal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
          {fullName.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className={char === "(" || char === ")" || (i > fullName.indexOf("(") && i < fullName.indexOf(")")) ? "gradient-text" : "text-foreground"}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mb-2"
        >
          {personalInfo.title}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground/50 mb-3"
        >
          <MapPin className="w-3.5 h-3.5" />
          {personalInfo.location}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-sm md:text-base text-muted-foreground/60 max-w-lg mb-10"
        >
          Agentic RAG &middot; LLM Systems &middot; Full-stack Automation
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex gap-4"
        >
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-xl glass-card hover:shadow-glow-blue transition-all duration-300 cursor-pointer"
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-electric-blue transition-colors duration-300" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </motion.div>

        {/* Enter 3D world */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mt-6 hidden md:block"
        >
          <Link
            href="/3d"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-electric-blue/30 bg-electric-blue/5 text-sm font-medium text-electric-blue hover:bg-electric-blue/15 hover:shadow-glow-blue transition-all duration-300 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Enter 3D World
            <span className="text-electric-blue/50 text-xs">— walk through my portfolio</span>
          </Link>
        </motion.div>

        {/* Scroll indicator — in flow (not absolute) so it can never
            overlap the socials/3D button on short viewports */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/40 uppercase tracking-widest">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
