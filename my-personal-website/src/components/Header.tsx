"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const SECTIONS = [
  { id: "overview", label: "Top" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.theme = next ? "dark" : "light";
    } catch {}
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Top bar: identity + theme; section links only on small screens */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-[#E5E4E0] dark:border-[#252A36] bg-[#FAFAF8]/85 dark:bg-[#10131B]/85 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-5 md:px-6 h-12 md:h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-bold text-[#2456F0] dark:text-[#7C97FF] text-lg cursor-pointer"
            aria-label="Back to top"
          >
            Luis
          </button>

          <div className="flex items-center gap-1">
            {/* Mobile fallback: horizontal links */}
            <nav className="flex lg:hidden items-center gap-1 overflow-x-auto">
              {SECTIONS.slice(1).map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`px-2 py-1.5 rounded-md text-[12px] whitespace-nowrap transition-colors cursor-pointer ${
                    active === id
                      ? "text-[#2456F0] dark:text-[#7C97FF] font-semibold"
                      : "text-[#6B7280] dark:text-[#9AA1B2]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
            <button
              onClick={toggle}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              className="ml-1 p-2 rounded-lg border border-[#E5E4E0] dark:border-[#252A36] bg-white dark:bg-[#161A24] text-[#6B7280] dark:text-[#C3C8D4] hover:text-[#2456F0] dark:hover:text-[#7C97FF] transition-colors cursor-pointer"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Right-edge rail: scroll-spy section headers (desktop) */}
      <nav
        aria-label="Sections"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-4"
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
              <span
                className={`font-mono-ui text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                  isActive
                    ? "text-[#2456F0] dark:text-[#7C97FF] opacity-100"
                    : "text-[#9CA3AF] dark:text-[#7A8194] opacity-0 group-hover:opacity-100"
                }`}
              >
                {label}
              </span>
              <span
                className={`h-px transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-[#2456F0] dark:bg-[#7C97FF]"
                    : "w-4 bg-[#C9CBD1] dark:bg-[#3A4152] group-hover:w-6 group-hover:bg-[#6B7280]"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
