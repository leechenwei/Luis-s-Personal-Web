"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

interface Visit {
  city: string | null;
  country: string | null;
  ts: number;
}

function ago(ts: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function label(v: Visit): string {
  const place = v.city
    ? `${v.city}${v.country ? `, ${v.country}` : ""}`
    : v.country || "somewhere on Earth";
  return `Someone from ${place} viewed Luis's Web`;
}

export default function VisitorTicker() {
  const [current, setCurrent] = useState<Visit | null>(null);
  const visitsRef = useRef<Visit[]>([]);
  const idxRef = useRef(0);

  useEffect(() => {
    let alive = true;

    // Record this visit — once per browser session
    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "1");
      fetch("/api/visit", { method: "POST", keepalive: true }).catch(() => {});
    }

    const load = async () => {
      try {
        const res = await fetch("/api/visit");
        const data = await res.json();
        if (alive && Array.isArray(data.visits)) {
          visitsRef.current = data.visits;
        }
      } catch {
        /* silent — ticker just stays quiet */
      }
    };

    // Show one toast, hold, hide, wait, show the next
    const cycle = () => {
      const visits = visitsRef.current;
      if (visits.length) {
        setCurrent(visits[idxRef.current % visits.length]);
        idxRef.current++;
        hideTimer = setTimeout(() => setCurrent(null), 5000);
      }
    };

    let hideTimer: ReturnType<typeof setTimeout>;
    const interval = setInterval(cycle, 14000);
    const refresh = setInterval(load, 60000);
    load().then(() => {
      // First toast after a polite delay
      hideTimer = setTimeout(cycle, 6000);
    });

    return () => {
      alive = false;
      clearInterval(interval);
      clearInterval(refresh);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.ts + "-" + idxRef.current}
            initial={{ opacity: 0, x: -24, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0b0f1d]/90 backdrop-blur-md shadow-lg"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            <Eye className="w-3.5 h-3.5 text-white/40" />
            <p className="text-xs text-white/70">
              {label(current)}{" "}
              <span className="text-white/35">· {ago(current.ts)}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
