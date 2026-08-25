import { personalInfo, techStack } from "@/data/projects";

/* Bio + the skills table — real table, hairline rules, mono data. */

const AREA_LABELS: Record<string, string> = {
  ai: "AI / LLM",
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend & data",
  devops: "Infra & testing",
};

const AREA_ORDER = ["ai", "language", "frontend", "backend", "devops"];

export default function About() {
  const grouped = AREA_ORDER.map((area) => ({
    area: AREA_LABELS[area],
    tools: techStack.filter((t) => t.category === area).map((t) => t.name),
  })).filter((g) => g.tools.length);

  return (
    <div className="container mx-auto px-6 py-14 md:py-20 max-w-4xl">
      <p className="eyebrow">About</p>
      <p className="mt-4 text-[15px] md:text-lg leading-relaxed text-[#374151] max-w-2xl">
        {personalInfo.bio}
      </p>

      <p className="eyebrow mt-12 md:mt-16">Tech stack</p>
      <div className="mt-3 border-t border-[#1A1D23]">
        {grouped.map((g) => (
          <div
            key={g.area}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-6 py-3.5 border-b border-[#E5E4E0]"
          >
            <p className="font-semibold text-sm text-[#1A1D23]">{g.area}</p>
            <p className="font-mono-ui text-[12px] md:text-[13px] leading-relaxed text-[#6B7280]">
              {g.tools.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
