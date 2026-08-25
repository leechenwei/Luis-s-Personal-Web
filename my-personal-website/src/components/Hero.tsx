import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Gamepad2 } from "lucide-react";
import { personalInfo } from "@/data/projects";

/* Full-portfolio cover band: compact identity header, no theatrics. */

export default function Hero() {
  return (
    <div className="container mx-auto px-6 max-w-4xl pt-20 md:pt-28 pb-10 md:pb-14">
      <p className="eyebrow">The full portfolio</p>
      <div className="mt-4 flex items-center gap-5 md:gap-7">
        <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-full overflow-hidden border border-[#E5E4E0]">
          <Image
            src="/images/LCW.jpeg"
            alt={personalInfo.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1A1D23]">
            {personalInfo.name}{" "}
            <span className="text-[#2456F0]">({personalInfo.alias})</span>
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] mt-1.5">
            {personalInfo.title} · Agentic RAG · LLM systems · full-stack
            automation
          </p>
          <div className="flex items-center gap-2 mt-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg border border-[#E5E4E0] bg-white hover:border-[#2456F0]/40 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4 text-[#374151]" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg border border-[#E5E4E0] bg-white hover:border-[#2456F0]/40 transition-colors cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-[#374151]" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="p-2 rounded-lg border border-[#E5E4E0] bg-white hover:border-[#2456F0]/40 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#374151]" />
            </a>
            <Link
              href="/3d"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E4E0] bg-white text-xs font-medium text-[#374151] hover:border-[#2456F0]/40 hover:text-[#2456F0] transition-colors cursor-pointer"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              3D world
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
