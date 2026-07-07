"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  Bot,
  Database,
  MessageCircle,
  FileText,
  ChevronDown,
} from "lucide-react";
import { personalInfo } from "@/data/projects";

interface Source {
  n: number;
  source: string;
  title: string;
  score: number;
}

interface Msg {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
}

interface KBFile {
  source: string;
  title: string;
  words: number;
  text: string;
}

interface Pipeline {
  chunking: string;
  retrieval: string;
  topK: number;
  model: string;
}

const SUGGESTIONS = [
  "What's his RAG experience?",
  "Tell me about his production AI work",
  "Why should we hire Luis?",
  "What did he build at Inside Advisory?",
];

const GREETING: Msg = {
  role: "assistant",
  text: `Hi! I'm Luis's AI assistant — a mini-RAG grounded in this portfolio. Ask me anything; my answers cite their sources. (Yes, he built me into his own site 🙂)`,
};

/* Render answer text with [n] / [1, 3] citations as clickable chips */
function CitedText({
  text,
  sources,
  onView,
}: {
  text: string;
  sources?: Source[];
  onView: (source: string) => void;
}) {
  const parts = text.split(/(\[\d+(?:\s*,\s*\d+)*\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[(\d+(?:\s*,\s*\d+)*)\]$/);
        if (!m) return <Fragment key={i}>{part}</Fragment>;
        return (
          <Fragment key={i}>
            {m[1].split(/\s*,\s*/).map((numStr, j) => {
              const src = sources?.find((s) => s.n === Number(numStr));
              return (
                <sup
                  key={j}
                  title={src ? `${src.source} — ${src.title}` : undefined}
                  onClick={() => src && onView(src.source)}
                  className="inline-flex items-center justify-center min-w-4 h-4 px-1 mx-0.5 rounded bg-blue-500/25 border border-blue-400/40 text-blue-300 text-[9px] font-bold align-super cursor-pointer hover:bg-blue-500/40 transition-colors"
                >
                  {numStr}
                </sup>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}

/* Collapsible per-answer source list with score bars; rows open the KB */
function SourceList({
  sources,
  onView,
}: {
  sources: Source[];
  onView: (source: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 pt-2 border-t border-white/[0.06]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 text-[10px] font-medium text-white/40 hover:text-white/70 transition-colors cursor-pointer"
      >
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {sources.length} source{sources.length > 1 ? "s" : ""} retrieved
      </button>
      {open && (
        <div className="mt-1.5 space-y-1">
          {sources.map((s) => (
            <button
              key={s.n}
              onClick={() => onView(s.source)}
              className="w-full flex items-center gap-2 text-[10px] rounded px-1 py-0.5 hover:bg-white/[0.05] transition-colors cursor-pointer text-left"
              title="View source content"
            >
              <span className="shrink-0 w-4 h-4 rounded bg-blue-500/25 border border-blue-400/40 text-blue-300 font-bold flex items-center justify-center text-[9px]">
                {s.n}
              </span>
              <span className="text-white/60 font-mono truncate">
                {s.source}
              </span>
              <span className="ml-auto shrink-0 flex items-center gap-1.5">
                <span className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-blue-400/70"
                    style={{ width: `${Math.round(s.score * 100)}%` }}
                  />
                </span>
                <span className="text-white/30 w-7 text-right">
                  {Math.round(s.score * 100)}%
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "kb">("chat");
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [kb, setKb] = useState<{ files: KBFile[]; pipeline: Pipeline } | null>(
    null
  );
  const [expandedSrc, setExpandedSrc] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, busy]);

  // On (re)open, jump straight to the latest message — not the top
  useEffect(() => {
    if (open && view === "chat") {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }
  }, [open, view]);

  useEffect(() => {
    if (open && view === "chat") inputRef.current?.focus();
    if (open && !kb) {
      fetch("/api/ask")
        .then((r) => r.json())
        .then((d) => d?.files && setKb(d))
        .catch(() => {});
    }
  }, [open, view, kb]);

  // When a citation opens the KB, scroll its file into view
  useEffect(() => {
    if (view === "kb" && expandedSrc) {
      document
        .getElementById(`kb-${expandedSrc}`)
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [view, expandedSrc, kb]);

  const viewSource = (source: string) => {
    setExpandedSrc(source);
    setView("kb");
  };

  const send = async (question?: string) => {
    const text = (question ?? input).trim();
    if (!text || busy) return;
    setInput("");
    setView("chat");
    const history = [...msgs, { role: "user" as const, text }];
    setMsgs(history);
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Greeting is UI sugar; strip sources from history
          messages: history.slice(1).map(({ role, text }) => ({ role, text })),
        }),
      });
      const data = await res.json();
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: res.ok
            ? data.text
            : (data.error ?? "Something went wrong — try again?"),
          sources: res.ok ? data.sources : undefined,
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

      {/* Panel */}
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
                  mini-RAG · cited answers · Gemini
                </p>
              </div>
              <button
                onClick={() => setView(view === "chat" ? "kb" : "chat")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  view === "kb"
                    ? "text-blue-300 bg-blue-500/15"
                    : "text-white/40 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Toggle knowledge base"
                title="Knowledge base"
              >
                {view === "kb" ? (
                  <MessageCircle className="w-4 h-4" />
                ) : (
                  <Database className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {view === "kb" ? (
              /* ---------------- Knowledge base view ---------------- */
              <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 py-4">
                <p className="text-[11px] text-white/50 mb-3">
                  Every answer is grounded in these{" "}
                  {kb?.files.length ?? "…"} sources — built from the same data
                  that renders this site. Click a file to read it.
                </p>
                <div className="space-y-1">
                  {kb?.files.map((f) => {
                    const expanded = expandedSrc === f.source;
                    return (
                      <div key={f.source} id={`kb-${f.source}`}>
                        <button
                          onClick={() =>
                            setExpandedSrc(expanded ? null : f.source)
                          }
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer text-left ${
                            expanded
                              ? "bg-blue-500/10 border-blue-400/30"
                              : "bg-white/[0.03] border-white/[0.05] hover:border-white/[0.12]"
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-300/70 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-mono text-white/75 truncate">
                              {f.source}
                            </p>
                            <p className="text-[10px] text-white/35 truncate">
                              {f.title}
                            </p>
                          </div>
                          <span className="text-[9px] text-white/30 shrink-0">
                            {f.words}w
                          </span>
                          <ChevronDown
                            className={`w-3 h-3 text-white/30 shrink-0 transition-transform ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expanded && (
                          <pre className="mt-1 mb-2 px-3 py-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-[10px] leading-relaxed text-white/60 whitespace-pre-wrap font-mono">
                            {f.text}
                          </pre>
                        )}
                      </div>
                    );
                  })}
                </div>
                {kb && (
                  <div className="mt-4 px-2.5 py-2.5 rounded-lg border border-blue-400/15 bg-blue-500/[0.06] text-[10px] leading-relaxed text-white/45">
                    <p className="font-semibold text-blue-300/80 mb-1">
                      Pipeline
                    </p>
                    <p>Chunking: {kb.pipeline.chunking}</p>
                    <p>Retrieval: {kb.pipeline.retrieval}</p>
                    <p>
                      Top-{kb.pipeline.topK} chunks → {kb.pipeline.model}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* -------------------- Chat view -------------------- */
              <div
                ref={scrollRef}
                data-lenis-prevent
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
                      {m.role === "assistant" ? (
                        <>
                          <CitedText
                            text={m.text}
                            sources={m.sources}
                            onView={viewSource}
                          />
                          {m.sources && m.sources.length > 0 && (
                            <SourceList
                              sources={m.sources}
                              onView={viewSource}
                            />
                          )}
                        </>
                      ) : (
                        m.text
                      )}
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
            )}

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
