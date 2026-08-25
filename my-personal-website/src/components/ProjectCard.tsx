"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";

/* One project = one ledger row with a status light.
   The whole portfolio's claim is "things that actually run" —
   so every row states its runtime status like a systems board. */

function status(p: Project): { dot: string; label: string; live: boolean } {
  if (p.demo) return { dot: "●", label: "live — public demo", live: true };
  if (p.type === "company") return { dot: "●", label: "in production", live: true };
  return { dot: "◐", label: "built & delivered", live: false };
}

/* Fullscreen lightbox (portal: hover transforms would trap position:fixed) */
function Lightbox({
  media,
  index,
  onClose,
  onNav,
}: {
  media: NonNullable<Project["media"]>;
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % media.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + media.length) % media.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, media.length, onClose, onNav]);

  const item = media[index];
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A1D23]/95 p-4 md:p-10 cursor-zoom-out"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[80vh] rounded-lg shadow-2xl cursor-default"
      />
      <p
        onClick={(e) => e.stopPropagation()}
        className="mt-4 max-w-2xl text-center text-xs text-white/60 cursor-default"
      >
        {item.alt}
      </p>
      {media.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-3 flex items-center gap-4 cursor-default"
        >
          <button
            onClick={() => onNav((index - 1 + media.length) % media.length)}
            aria-label="Previous"
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono-ui text-xs text-white/50">
            {index + 1} / {media.length}
          </span>
          <button
            onClick={() => onNav((index + 1) % media.length)}
            aria-label="Next"
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const s = status(project);

  return (
    <article
      id={`project-${project.id}`}
      className="group grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-7 md:py-9 border-b border-[#E5E4E0] dark:border-[#252A36] scroll-mt-24 -mx-4 px-4 rounded-lg hover:bg-white/70 dark:hover:bg-white/[0.045] transition-colors duration-300"
    >
      {/* Margin: status + classification */}
      <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1.5">
        <p
          className={`font-mono-ui text-[12px] ${
            s.live ? "text-[#0E7C66] dark:text-[#37D3A8]" : "text-[#9CA3AF] dark:text-[#7A8194]"
          }`}
        >
          {s.dot} {s.label}
        </p>
        <p className="font-mono-ui text-[11px] uppercase tracking-wider text-[#9CA3AF] dark:text-[#7A8194]">
          {project.type === "company" ? "Inside Advisory" : "Personal"} ·{" "}
          {project.category}
        </p>
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="font-display text-lg md:text-xl font-bold text-[#1A1D23] dark:text-[#F2F3F7] group-hover:text-[#2456F0] dark:group-hover:text-[#7C97FF] dark:hover:text-[#7C97FF] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-[#6B7280] dark:text-[#9AA1B2] mt-0.5">{project.tagline}</p>

        {project.metrics && (
          <p className="font-mono-ui text-[12px] text-[#2456F0] dark:text-[#7C97FF] mt-2">
            {project.metrics.join("   ·   ")}
          </p>
        )}

        <ul className="mt-3 space-y-1.5">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="text-[13px] leading-relaxed text-[#374151] dark:text-[#C3C8D4] pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#D1D5DB] dark:before:text-[#3A4152] dark:text-[#3A4152]"
            >
              {h}
            </li>
          ))}
        </ul>

        <p className="font-mono-ui text-[11px] text-[#9CA3AF] dark:text-[#7A8194] mt-3">
          {project.tech.join(" · ")}
        </p>

        {/* Visual proof thumbnails */}
        {project.media && project.media.length > 0 && (
          <div className="mt-4 flex gap-2">
            {project.media.map((m, i) => (
              <button
                key={m.src}
                onClick={() => setLightbox(i)}
                className="group/thumb w-32 md:w-40 aspect-video overflow-hidden rounded-md border border-[#E5E4E0] dark:border-[#252A36] hover:border-[#2456F0]/50 dark:hover:border-[#7C97FF]/50 transition-colors cursor-zoom-in bg-white dark:bg-[#161A24]"
                aria-label={`View: ${m.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        )}

        {lightbox !== null &&
          project.media &&
          createPortal(
            <Lightbox
              media={project.media}
              index={lightbox}
              onClose={() => setLightbox(null)}
              onNav={setLightbox}
            />,
            document.body
          )}

        {/* Links */}
        {(project.link || project.demo) && (
          <p className="mt-3.5 font-mono-ui text-[12px]">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2456F0] dark:text-[#7C97FF] underline underline-offset-[3px] decoration-[#2456F0]/30 dark:decoration-[#7C97FF]/40 hover:decoration-[#2456F0] dark:hover:decoration-[#7C97FF]"
              >
                live demo ↗
              </a>
            )}
            {project.demo && project.link && (
              <span className="text-[#D1D5DB] dark:text-[#3A4152]">{"   ·   "}</span>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2456F0] dark:text-[#7C97FF] underline underline-offset-[3px] decoration-[#2456F0]/30 dark:decoration-[#7C97FF]/40 hover:decoration-[#2456F0] dark:hover:decoration-[#7C97FF]"
              >
                github ↗
              </a>
            )}
          </p>
        )}
      </div>
    </article>
  );
}
