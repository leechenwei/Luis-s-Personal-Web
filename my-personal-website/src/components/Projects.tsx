"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import { projects } from "@/data/projects";

const filters = [
  { key: "all", label: "all" },
  { key: "ai", label: "ai" },
  { key: "fullstack", label: "full-stack" },
  { key: "enterprise", label: "enterprise" },
] as const;

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="container mx-auto px-6 py-14 md:py-20 max-w-4xl">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="eyebrow">Projects · {projects.length} systems</p>
        <div className="font-mono-ui text-[12px] flex gap-4">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`cursor-pointer transition-colors ${
                activeFilter === key
                  ? "text-[#2456F0] dark:text-[#7C97FF] underline underline-offset-4"
                  : "text-[#9CA3AF] dark:text-[#7A8194] hover:text-[#374151] dark:text-[#C3C8D4] dark:hover:text-[#C3C8D4]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 border-t border-[#1A1D23] dark:border-[#8B93A7]">
        {filtered.map((project) => (
          <ScrollReveal key={project.id}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
