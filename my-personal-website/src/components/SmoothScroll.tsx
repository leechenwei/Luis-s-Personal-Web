"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any;

    (async () => {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
          await Promise.all([
            import("lenis"),
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);

        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch (e) {
        console.warn("Smooth scroll init failed:", e);
      }
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <div>{children}</div>;
}
