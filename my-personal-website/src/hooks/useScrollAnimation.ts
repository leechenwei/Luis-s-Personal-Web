"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationConfig {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
  };
}

export function useScrollAnimation<T extends HTMLElement>(
  config: ScrollAnimationConfig
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    const { from, to, trigger } = config;

    const tween = gsap.fromTo(el, from || {}, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start: trigger?.start || "top 80%",
        end: trigger?.end || "bottom 20%",
        scrub: trigger?.scrub ?? false,
        pin: trigger?.pin ?? false,
        markers: trigger?.markers ?? false,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [config]);

  return ref;
}
