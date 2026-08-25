import { personalInfo } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";
import { FileText, MessageCircle, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-20 md:py-28 max-w-4xl">
      <ScrollReveal>
      <p className="eyebrow">Contact</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-[#1A1D23] max-w-xl">
        Let&apos;s build something that{" "}
        <span className="text-[#2456F0]">runs</span>.
      </h2>
      <p className="mt-4 text-[15px] text-[#6B7280] max-w-md">
        Open to Applied AI Engineer roles — 2 weeks&apos; notice. The fastest
        way to reach me is WhatsApp; the AI in the corner answers questions
        about me instantly.
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        <a
          href={personalInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2456F0] text-white text-sm font-medium hover:bg-[#1d47cc] transition-colors cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp — {personalInfo.phone}
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E5E4E0] bg-white text-sm text-[#374151] hover:border-[#2456F0]/40 transition-colors cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          {personalInfo.email}
        </a>
        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E5E4E0] bg-white text-sm text-[#374151] hover:border-[#2456F0]/40 transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          Résumé
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2.5 rounded-lg border border-[#E5E4E0] bg-white hover:border-[#2456F0]/40 transition-colors cursor-pointer"
        >
          <Github className="w-4 h-4 text-[#374151]" />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-2.5 rounded-lg border border-[#E5E4E0] bg-white hover:border-[#2456F0]/40 transition-colors cursor-pointer"
        >
          <Linkedin className="w-4 h-4 text-[#374151]" />
        </a>
      </div>

      <p className="mt-16 pt-6 border-t border-[#E5E4E0] font-mono-ui text-[11px] text-[#9CA3AF]">
        © {new Date().getFullYear()} Lee Chen Wei · built with Next.js ·
        designed with Claude Fable 5
      </p>
      </ScrollReveal>
    </div>
  );
}
