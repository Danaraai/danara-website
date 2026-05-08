"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  {
    role: "ai",
    text: "Hi — I'm Danara's portfolio assistant. Ask me about her work in AI automation, agentic systems, or research.",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  // Open via #chat anchor
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#chat") setOpen(true);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      {
        role: "ai",
        text: "Chat is wired up to UI only for now — Danara will connect Fireworks AI in the next phase.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] md:bottom-6 md:right-6">
      {open ? (
        <motion.div
          id="chat"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-[520px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-hairline border-border bg-paper shadow-chat"
        >
            <header className="flex items-center justify-between border-b border-hairline border-border px-4 py-3">
              <div>
                <p className="text-[13px] font-medium text-ink">
                  ask danara&rsquo;s ai
                </p>
                <p className="text-[10px] text-ink-muted">
                  fireworks ai &middot; llama 3.3
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-secondary transition hover:bg-violet-chip hover:text-ink"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="M1 1 L13 13 M13 1 L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-violet-chip text-ink"
                        : "border border-hairline border-border bg-white text-ink-secondary"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSend}
              className="border-t border-hairline border-border p-3"
            >
              <div className="flex items-center gap-2 rounded-pill border border-hairline border-border bg-white px-3 py-1.5 focus-within:border-violet-ring">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="ask about a project or skill…"
                  className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-muted focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet text-white transition hover:bg-violet-deep"
                  aria-label="Send"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    aria-hidden
                    fill="none"
                  >
                    <path
                      d="M2 6 L10 6 M6 2 L10 6 L6 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-ink-muted">
                powered by fireworks ai &middot; open source
              </p>
            </form>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          whileHover={{ y: -2 }}
          className="inline-flex items-center gap-2 rounded-pill border border-hairline border-border bg-paper px-4 py-2.5 text-[12.5px] text-ink shadow-chat"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-violet opacity-60 dot-pulse" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
          </span>
          <span>ask danara&rsquo;s ai</span>
        </motion.button>
      )}
    </div>
  );
}
