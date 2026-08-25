"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
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
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#E5E4E0] dark:border-[#252A36] bg-[#FAFAF8]/85 dark:bg-[#10131B]/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-5 md:px-6 h-12 md:h-14 flex items-center justify-between gap-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-bold text-[#2456F0] dark:text-[#7C97FF] text-lg cursor-pointer"
          aria-label="Back to top"
        >
          Luis
        </button>

        <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-2 md:px-3 py-1.5 rounded-md text-[12px] md:text-[13px] whitespace-nowrap transition-colors cursor-pointer ${
                active === id
                  ? "text-[#2456F0] dark:text-[#7C97FF] font-semibold"
                  : "text-[#6B7280] dark:text-[#9AA1B2] hover:text-[#1A1D23] dark:hover:text-[#F2F3F7]"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="ml-1 p-2 rounded-lg border border-[#E5E4E0] dark:border-[#252A36] bg-white dark:bg-[#161A24] text-[#6B7280] dark:text-[#C3C8D4] hover:text-[#2456F0] dark:hover:text-[#7C97FF] transition-colors cursor-pointer"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
