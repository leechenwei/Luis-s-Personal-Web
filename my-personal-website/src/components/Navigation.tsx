"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group relative flex items-center justify-end gap-3 cursor-pointer"
            >
              <span
                className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
                  activeSection === id
                    ? "text-electric-blue"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? "w-3 h-3 bg-electric-blue shadow-glow-blue"
                    : "w-2 h-2 bg-muted-foreground/40 group-hover:bg-muted-foreground"
                }`}
              />
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
