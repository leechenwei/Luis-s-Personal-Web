import Link from "next/link";
import { personalInfo } from "@/data/projects";

/* The 10-second recruiter view, deliberately styled like plain HTML:
   white page, black serif text, blue underlined links, no animation.
   The contrast with the neon portfolio below is the point. */

const link =
  "text-[#0000EE] underline underline-offset-2 visited:text-[#551A8B] hover:text-blue-700";

export default function Overview() {
  return (
    <section className="bg-white text-black min-h-[100dvh] flex items-center">
      <div
        className="mx-auto w-full max-w-2xl px-6 pt-6 pb-24 md:py-10 text-[14px] md:text-base leading-snug md:leading-relaxed"
        style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Lee Chen Wei <span className="font-normal">(Luis)</span>
        </h1>
        <p className="mt-1">
          <strong>Applied AI Engineer</strong> — I build LLM systems that run
          in production, not in notebooks.
        </p>
        <p className="text-neutral-600 text-sm mt-1">
          {personalInfo.location} · 2 weeks&apos; notice ·{" "}
          <a href={`mailto:${personalInfo.email}`} className={link}>
            {personalInfo.email}
          </a>
        </p>

        <hr className="my-3.5 md:my-5 border-neutral-300" />

        <p className="font-bold">Numbers first:</p>
        <ul className="list-disc pl-6 mt-1 space-y-0.5">
          <li>11 systems in production — businesses pay to use six of them</li>
          <li>RM5k monthly recurring revenue delivered at Inside Advisory</li>
          <li>
            8–10 colleagues use my AI assistant every day (WhatsApp / Web /
            Lark)
          </li>
          <li>86.8% intent F1 on my dialogue-system thesis</li>
        </ul>

        <p className="font-bold mt-3.5 md:mt-5">Three things worth your click:</p>
        <ol className="list-decimal pl-6 mt-1 space-y-1.5">
          <li>
            <strong>Self-Evaluating Agentic RAG</strong> — a chatbot that
            measures its own accuracy (Hit@k, MRR) every time I tune it.{" "}
            <a
              href="https://chenwei-rag.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              Try the live demo
            </a>
            .
          </li>
          <li>
            <strong>Inside Assistant</strong> — one AI on three channels with
            per-person vector memory; my team talks to it on WhatsApp daily.{" "}
            <a href="#projects" className={link}>
              See the WhatsApp proof
            </a>
            .
          </li>
          <li>
            <strong>Steel Manufacturing ERP</strong> — QR scan → FIFO costing
            on a real shop floor, 20 users a day.{" "}
            <a href="#projects" className={link}>
              See it running
            </a>
            .
          </li>
        </ol>

        <p className="mt-3.5 md:mt-5">
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            Résumé (PDF)
          </a>
          {" · "}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            GitHub
          </a>
          {" · "}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            LinkedIn
          </a>
          {" · "}
          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            WhatsApp me
          </a>
        </p>

        <hr className="my-3.5 md:my-5 border-neutral-300" />

        <p className="text-neutral-700">
          That was the plain version. Below: 11 projects with screenshots and
          architecture diagrams, an AI that answers questions about me with
          citations, and a 3D world you can walk through.
        </p>
        <p className="mt-2">
          <a href="#hero" className={link}>
            Scroll for the full portfolio ↓
          </a>
          {"  ·  "}
          <Link href="/3d" className={link}>
            Enter the 3D world →
          </Link>
        </p>
      </div>
    </section>
  );
}
