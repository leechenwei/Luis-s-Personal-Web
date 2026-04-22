"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import BackgroundEffects from "@/components/BackgroundEffects";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <BackgroundEffects />

      <section id="hero">
        <Hero />
      </section>

      <section id="about" className="relative">
        <About />
      </section>

      <section id="experience" className="relative">
        <Experience />
      </section>

      <section id="projects" className="relative">
        <Projects />
      </section>

      <section id="awards" className="relative">
        <Awards />
      </section>

      <section id="contact" className="relative">
        <Contact />
      </section>
    </SmoothScroll>
  );
}
