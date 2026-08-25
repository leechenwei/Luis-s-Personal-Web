"use client";

import { useEffect, useRef, useState } from "react";

/* Custom cursor: a precise dot at the pointer + a lagging ring that grows
   over interactive elements. Desktop pointer-fine only; respects
   prefers-reduced-motion; native cursors untouched elsewhere. */

export default function CursorFX() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y;
    let hot = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onOver = (e: MouseEvent) => {
      hot = !!(e.target as Element | null)?.closest?.(
        "a, button, [role='button'], input, textarea, select, summary"
      );
      if (ringRef.current)
        ringRef.current.style.setProperty("--ring-scale", hot ? "1.8" : "1");
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full bg-[#2456F0] dark:bg-[#7C97FF]"
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{ "--ring-scale": "1" } as React.CSSProperties}
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-4 -mt-4 w-8 h-8 rounded-full border border-[#2456F0]/50 dark:border-[#7C97FF]/60 transition-[scale] duration-200 [scale:var(--ring-scale)]"
      />
    </>
  );
}
