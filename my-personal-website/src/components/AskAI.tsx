"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Bot } from "lucide-react";
import { personalInfo } from "@/data/projects";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "What's his RAG experience?",
  "Tell me about his production AI work",
  "Why should we hire Luis?",
  "What did he build at Inside Advisory?",
];

const GREETING: Msg = {
  role: "assistant",
  text: `Hi! I'm Luis's AI assistant — ask me anything about his experience, projects, or skills. (Yes, he built me into his own portfolio 🙂)`,
};

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (question?: string) => {
    const text = (question ?? input).trim();
    if (!text || busy) return;
    setInput("");
    const history = [...msgs, { role: "user" as const, text }];
    setMsgs(history);
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Greeting is UI sugar, not model context
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      const data = await res.json();
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: res.ok
            ? data.text
            : (data.error ?? "Something went wrong — try again?"),
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: `Network hiccup — try again, or email ${personalInfo.email}.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold shadow-[0_0_28px_rgba(99,102,241,0.45)] hover:shadow-[0_0_40px_rgba(99,102,241,0.65)] transition-shadow cursor-pointer"
        aria-label="Ask AI about Luis"
      >
        <Sparkles className="w-4 h-4" />
        Ask AI about Luis
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-6 z-50 w-[min(92vw,24rem)] h-[min(70vh,32rem)] flex flex-col rounded-2xl border border-white/10 bg-[#0b0f1d]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.03]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  Luis&apos;s AI Assistant
                </p>
                <p className="text-[10px] text-white/40">
                  RAG-lite over this portfolio · Gemini
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white/[0.06] border border-white/[0.06] text-white/85 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.06] border border-white/[0.06]">
                    <span className="inline-flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {/* Suggestions (only before first user message) */}
              {msgs.length === 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-blue-400/30 text-blue-300/90 hover:bg-blue-500/15 transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06] bg-white/[0.02]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, projects, skills…"
                maxLength={500}
                className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-blue-400/50 transition-colors"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="p-2.5 rounded-xl bg-blue-600 text-white disabled:opacity-30 hover:bg-blue-500 transition-colors cursor-pointer"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
