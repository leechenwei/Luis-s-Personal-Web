"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Overview from "@/components/Overview";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import AskAI from "@/components/AskAI";
import VisitorTicker from "@/components/VisitorTicker";
import ChatwootWidget from "@/components/ChatwootWidget";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />

      {/* One-screen overview: the 10-second recruiter view */}
      <section id="overview">
        <Overview />
      </section>

      {/* Full portfolio below — unchanged */}
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

      <AskAI />
      <VisitorTicker />
      <ChatwootWidget />
    </SmoothScroll>
  );
}
