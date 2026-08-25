import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { awards, personalInfo } from "@/data/projects";

/* Education + honors as a clean two-column ledger. */

const a = "text-[#2456F0] underline underline-offset-[3px] decoration-[#2456F0]/30 hover:decoration-[#2456F0]";

export default function Awards() {
  const edu = personalInfo.education;

  return (
    <div className="container mx-auto px-6 py-14 md:py-20 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Education */}
        <ScrollReveal>
        <div>
          <p className="eyebrow">Education</p>
          <div className="mt-3 border-t border-[#1A1D23] pt-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg bg-white border border-[#E5E4E0] p-1.5 flex items-center justify-center shrink-0">
                <Image
                  src="/images/um-logo.png"
                  alt="University of Malaya"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#1A1D23]">
                  {edu.university}
                </h3>
                <p className="text-sm text-[#6B7280] mt-0.5">{edu.degree}</p>
              </div>
            </div>
            <div className="mt-4 font-mono-ui text-[12px] text-[#6B7280] space-y-1">
              <p>{edu.period}</p>
              <p>
                CGPA{" "}
                <span className="text-[#2456F0] font-semibold">{edu.cgpa}</span>{" "}
                · 6× Dean&apos;s List
              </p>
              <p>{edu.location}</p>
            </div>
            <p className="mt-4 font-mono-ui text-[12px]">
              <a href={edu.transcriptUrl} target="_blank" rel="noopener noreferrer" className={a}>
                transcript ↗
              </a>
              <span className="text-[#D1D5DB]">{"   ·   "}</span>
              <a href={edu.diplomaUrl} target="_blank" rel="noopener noreferrer" className={a}>
                diploma ↗
              </a>
            </p>
            <p className="mt-4 text-[13px] text-[#6B7280]">
              Languages: {personalInfo.languages.join(" · ")}
            </p>
          </div>
        </div>
        </ScrollReveal>

        {/* Awards */}
        <ScrollReveal delay={0.1}>
        <div>
          <p className="eyebrow">Honors</p>
          <div className="mt-3 border-t border-[#1A1D23]">
            {awards.map((award) => (
              <div
                key={award.title}
                className="flex items-baseline justify-between gap-4 py-2.5 border-b border-[#E5E4E0]"
              >
                <p className="text-[13px] text-[#374151]">{award.title}</p>
                <p className="font-mono-ui text-[11px] text-[#9CA3AF] shrink-0">
                  {award.year}
                </p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
