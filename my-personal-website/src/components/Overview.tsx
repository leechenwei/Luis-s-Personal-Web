import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { personalInfo } from "@/data/projects";

/* The 10-second recruiter view — first page of the dossier.
   Typography-first with gentle staggered reveals. */

const a = "text-[#2456F0] underline underline-offset-[3px] decoration-[#2456F0]/30 hover:decoration-[#2456F0]";

const STATS = [
  { v: "1 yr", l: "building production AI (+6 mo Dell internship)" },
  { v: "11", l: "systems live — businesses pay for six" },
  { v: "RM5k", l: "monthly recurring revenue delivered" },
  { v: "8–10", l: "daily users on my AI assistant" },
];

const FLAGSHIPS = [
  {
    n: "01",
    title: "Self-Evaluating Agentic RAG",
    line: "a chatbot that measures its own accuracy (Hit@k, MRR) every time I tune it",
    anchor: "#project-self-evaluating-rag",
    cta: { label: "open live demo ↗", href: "https://chenwei-rag.streamlit.app/", external: true },
  },
  {
    n: "02",
    title: "Inside Assistant",
    line: "one AI on WhatsApp, Web and Lark with per-person vector memory — my team uses it daily",
    anchor: "#project-enterprise-ai-assistant",
    cta: { label: "jump to project ↓", href: "#project-enterprise-ai-assistant", external: false },
  },
  {
    n: "03",
    title: "Steel Manufacturing ERP",
    line: "QR scan → FIFO costing on a real shop floor, 20 users a day",
    anchor: "#project-manufacturing-erp",
    cta: { label: "jump to project ↓", href: "#project-manufacturing-erp", external: false },
  },
];

export default function Overview() {
  return (
    <section className="min-h-[100dvh] flex items-center border-b border-[#E5E4E0]">
      <div className="mx-auto w-full max-w-3xl px-6 pt-8 pb-24 md:py-14">
        <ScrollReveal duration={0.5}>
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="eyebrow">Portfolio · dossier</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 text-[#1A1D23]">
              Lee Chen Wei{" "}
              <span className="text-[#2456F0]">(Luis)</span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-[#1A1D23]">
              <strong className="font-semibold">Applied AI Engineer</strong> —
              I build LLM systems that run in production, not in notebooks.
            </p>
            <p className="font-mono-ui text-[12px] md:text-[13px] text-[#6B7280] mt-2">
              {personalInfo.location} · 2 weeks&apos; notice ·{" "}
              <a href={`mailto:${personalInfo.email}`} className={a}>
                {personalInfo.email}
              </a>
            </p>
          </div>
          <Image
            src="/images/LCW.jpeg"
            alt={personalInfo.name}
            width={128}
            height={128}
            priority
            className="w-[76px] h-[76px] md:w-32 md:h-32 rounded-full object-cover shrink-0 mt-1"
          />
        </div>
        </ScrollReveal>

        {/* Numbers — hairline table rows */}
        <ScrollReveal delay={0.08} duration={0.5}>
        <div className="mt-8 md:mt-10 border-t border-[#E5E4E0]">
          {STATS.map((s) => (
            <div
              key={s.v}
              className="flex items-baseline gap-4 py-2 md:py-2.5 border-b border-[#E5E4E0]"
            >
              <span className="font-display text-xl md:text-2xl font-bold text-[#2456F0] w-16 md:w-20 shrink-0 text-right">
                {s.v}
              </span>
              <span className="text-[13px] md:text-sm text-[#374151]">
                {s.l}
              </span>
            </div>
          ))}
        </div>
        </ScrollReveal>

        {/* Three flagships */}
        <ScrollReveal delay={0.15} duration={0.5}>
        <p className="eyebrow mt-8 md:mt-10">Three things worth your click</p>
        <div className="mt-2">
          {FLAGSHIPS.map((f) => (
            <div
              key={f.n}
              className="flex items-baseline gap-4 py-2.5 border-b border-[#E5E4E0] hover:bg-white/70 transition-colors duration-300 -mx-2 px-2 rounded"
            >
              <span className="font-mono-ui text-[11px] text-[#9CA3AF] w-16 md:w-20 shrink-0 text-right">
                {f.n}
              </span>
              <span className="min-w-0">
                <a
                  href={f.anchor}
                  className="font-semibold text-[#1A1D23] hover:text-[#2456F0] transition-colors cursor-pointer"
                >
                  {f.title}
                </a>
                <span className="text-[13px] md:text-sm text-[#6B7280]">
                  {" "}
                  — {f.line}.{" "}
                </span>
                <a
                  href={f.cta.href}
                  {...(f.cta.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-mono-ui text-[11px] md:text-[12px] text-[#2456F0] whitespace-nowrap hover:underline underline-offset-[3px] cursor-pointer"
                >
                  {f.cta.label}
                </a>
              </span>
            </div>
          ))}
        </div>

        </ScrollReveal>

        {/* Contact links */}
        <ScrollReveal delay={0.22} duration={0.5}>
        <p className="mt-6 md:mt-8 text-sm md:text-[15px]">
          <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className={a}>
            Résumé (PDF)
          </a>
          {" · "}
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={a}>
            GitHub
          </a>
          {" · "}
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={a}>
            LinkedIn
          </a>
          {" · "}
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className={a}>
            WhatsApp me
          </a>
        </p>

        {/* Gateway */}
        <div className="mt-8 md:mt-10 pt-4 border-t border-[#E5E4E0]">
          <p className="text-[13px] md:text-sm text-[#6B7280]">
            That was the 10-second version. Below: 11 projects with screenshots
            and architecture diagrams, an AI that answers questions about me
            with citations — and a 3D world you can walk.
          </p>
          <p className="mt-2.5 font-mono-ui text-[12px] md:text-[13px]">
            <a href="#hero" className={a}>
              scroll for the full portfolio ↓
            </a>
            <span className="text-[#9CA3AF]">{"   ·   "}</span>
            <Link href="/3d" className={a}>
              enter the 3D world →
            </Link>
          </p>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
