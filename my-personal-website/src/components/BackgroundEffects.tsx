"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  color: string;
}

interface Firework {
  x: number;
  y: number;
  particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    alpha: number;
    color: string;
    decay: number;
  }[];
  age: number;
}

const COLORS = [
  [59, 130, 246],   // blue
  [139, 92, 246],   // purple
  [236, 72, 153],   // pink
  [6, 182, 212],    // cyan
  [250, 204, 21],   // yellow
  [34, 197, 94],    // green
  [249, 115, 22],   // orange
];

function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const fireworksRef = useRef<Firework[]>([]);

  const createFirework = useCallback((x: number, y: number) => {
    const count = 30 + Math.floor(Math.random() * 20);
    const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const particles: Firework["particles"] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      const color = Math.random() > 0.3
        ? baseColor
        : COLORS[Math.floor(Math.random() * COLORS.length)];

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 2.5 + 1,
        alpha: 1,
        color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        decay: 0.015 + Math.random() * 0.01,
      });
    }

    // Inner ring — smaller, faster
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 1.5 + 0.5,
        alpha: 1,
        color: `rgb(255, 255, 255)`,
        decay: 0.025 + Math.random() * 0.015,
      });
    }

    fireworksRef.current.push({ x, y, particles, age: 0 });
  }, []);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = Math.min(
      70,
      Math.floor((canvas.width * canvas.height) / 20000)
    );
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const color = COLORS[Math.floor(Math.random() * 3)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.5 + 0.15,
        color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    init();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, input, [role='button']");
      if (!isInteractive) {
        createFirework(e.clientX, e.clientY);
      }
    };
    window.addEventListener("click", handleClick);

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        createFirework(touch.clientX, touch.clientY);
      }
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });

    let frame: number;
    let time = 0;
    const connectionDist = 140;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.vx -= (dx / dist) * force * 0.015;
          p.vy -= (dy / dist) * force * 0.015;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.6) {
          p.vx *= 0.98;
          p.vy *= 0.98;
        }
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw ambient particles with glow
      particles.forEach((p) => {
        const twinkle = p.baseAlpha + Math.sin(time * 3 + p.x * 0.01) * 0.12;
        const glow = Math.max(0.08, twinkle);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("rgb", "rgba").replace(")", `, ${glow * 0.2})`);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("rgb", "rgba").replace(")", `, ${glow})`);
        ctx.fill();
      });

      // Draw & update fireworks
      fireworksRef.current = fireworksRef.current.filter((fw) => {
        fw.age++;
        let alive = false;

        fw.particles.forEach((p) => {
          if (p.alpha <= 0) return;
          alive = true;

          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.03; // gravity
          p.vx *= 0.99;
          p.vy *= 0.99;
          p.alpha -= p.decay;
          p.r *= 0.995;

          if (p.alpha > 0) {
            // Glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r + 4, 0, Math.PI * 2);
            ctx.fillStyle = p.color
              .replace("rgb", "rgba")
              .replace(")", `, ${p.alpha * 0.3})`);
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color
              .replace("rgb", "rgba")
              .replace(")", `, ${p.alpha})`);
            ctx.fill();

            // Trail
            if (fw.age < 30) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
              ctx.strokeStyle = p.color
                .replace("rgb", "rgba")
                .replace(")", `, ${p.alpha * 0.4})`);
              ctx.lineWidth = p.r * 0.5;
              ctx.stroke();
            }
          }
        });

        return alive;
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [init, createFirework]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -5 }}
    />
  );
}

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Interactive particle network + click fireworks */}
      <InteractiveCanvas />

      {/* Animated aurora gradient blobs */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -9 }}
      >
        <div
          className="absolute"
          style={{
            top: "-10%",
            left: "-10%",
            width: "60vw",
            height: "60vh",
            background:
              "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15), transparent 70%)",
            filter: "blur(60px)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "25%",
            right: "-10%",
            width: "55vw",
            height: "55vh",
            background:
              "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12), transparent 70%)",
            filter: "blur(60px)",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "60%",
            left: "5%",
            width: "50vw",
            height: "50vh",
            background:
              "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08), transparent 70%)",
            filter: "blur(80px)",
            animation: "float 30s ease-in-out infinite",
            animationDelay: "5s",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "80%",
            right: "10%",
            width: "40vw",
            height: "40vh",
            background:
              "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.10), transparent 70%)",
            filter: "blur(70px)",
            animation: "float 22s ease-in-out infinite reverse",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          zIndex: -8,
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </>
  );
}
