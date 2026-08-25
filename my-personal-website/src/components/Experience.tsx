import { experiences } from "@/data/projects";

/* Experience as a ruled ledger: mono dates in the margin, ink content. */

export default function Experience() {
  return (
    <div className="container mx-auto px-6 py-14 md:py-20 max-w-4xl">
      <p className="eyebrow">Experience</p>
      <div className="mt-3 border-t border-[#1A1D23]">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-6 md:py-8 border-b border-[#E5E4E0]"
          >
            <div>
              <p className="font-mono-ui text-[12px] text-[#2456F0]">
                {exp.period}
              </p>
              <p className="font-mono-ui text-[11px] text-[#9CA3AF] mt-1">
                {exp.location}
              </p>
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg md:text-xl font-bold text-[#1A1D23]">
                {exp.company}
              </h3>
              <p className="text-sm text-[#6B7280] mt-0.5">{exp.role}</p>
              <ul className="mt-3 space-y-2">
                {exp.description.map((d, i) => (
                  <li
                    key={i}
                    className="text-[13px] md:text-sm leading-relaxed text-[#374151] pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#9CA3AF]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
