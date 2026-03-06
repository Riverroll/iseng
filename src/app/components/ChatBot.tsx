"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PROJECTS: Record<string, { title: string; description: string; tags: string[]; url?: string }> = {
  "dsm-erp": {
    title: "DSM Compro & ERP System",
    description: "Company profile + full ERP covering procurement, finance, HR, and operations.",
    tags: ["ERP", "Enterprise", "Web"],
    url: "https://stagingweborder.dharmesta.com/",
  },
  "dec-erp": {
    title: "DEC ERP System",
    description: "Custom ERP for DEC with real-time reporting.",
    tags: ["ERP", "Enterprise"],
    url: "https://dec.codenito.id/dashboard",
  },
  "codenito": {
    title: "Codenito Financial System",
    description: "Budgeting, invoicing, and expense tracking platform.",
    tags: ["Fintech", "Dashboard"],
  },
  "restaurant": {
    title: "Restaurant Management System",
    description: "Full-stack app for managing orders, inventory, and staff.",
    tags: ["Full Stack", "Web App"],
  },
  "skincare": {
    title: "Skincare Ecommerce",
    description: "End-to-end ecommerce with payment gateway integration.",
    tags: ["Ecommerce", "Full Stack"],
  },
  "corporate-legal": {
    title: "Corporate Legal Associate",
    description: "Document management and case tracking dashboard.",
    tags: ["Web App", "Dashboard"],
  },
  "ptsms": {
    title: "Internal Management System (PTSMS)",
    description: "Enterprise internal tool for PT SMS — employee management and reporting.",
    tags: ["ERP", "Enterprise"],
  },
  "marketing-dash": {
    title: "Marketing Dashboard",
    description: "Real-time analytics dashboard for campaign performance.",
    tags: ["Dashboard", "Analytics"],
  },
  "dulux": {
    title: "Dulux Design Competition",
    description: "Official website for the Dulux Design Competition.",
    tags: ["Web", "Design"],
  },
};

function ProjectCards({ ids }: { ids: string[] }) {
  const valid = ids.filter((id) => PROJECTS[id]);
  if (!valid.length) return null;
  return (
    <div className="flex flex-col gap-2 mt-2">
      {valid.map((id) => {
        const p = PROJECTS[id];
        return (
          <div key={id} className="bg-white/5 border border-white/10 rounded-xl p-3 hover:border-violet-500/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <p className="text-white text-xs font-semibold leading-snug">{p.title}</p>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors flex-shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
            </div>
            <p className="text-white/45 text-[11px] mt-1 leading-snug">{p.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400/70">{tag}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContactCard() {
  return (
    <a
      href="https://wa.me/6281315764554"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 mt-2 px-4 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/20 transition-colors group"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <div>
        <p className="text-[#25D366] text-xs font-semibold">Chat on WhatsApp</p>
        <p className="text-white/40 text-[11px]">+62 813-1576-4554</p>
      </div>
      <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 ml-auto transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </a>
  );
}

// Parse ::projects[id1,id2] and ::contact out of message content
function parseContent(raw: string): { text: string; projectIds: string[]; showContact: boolean } {
  let text = raw;
  const projectIds: string[] = [];
  let showContact = false;

  const projectMatch = text.match(/::projects\[([^\]]*)\]/);
  if (projectMatch) {
    projectIds.push(...projectMatch[1].split(",").map((s) => s.trim()).filter(Boolean));
    text = text.replace(projectMatch[0], "").trim();
  }

  if (text.includes("::contact")) {
    showContact = true;
    text = text.replace("::contact", "").trim();
  }

  return { text, projectIds, showContact };
}

const SUGGESTIONS = [
  "What projects has Val built?",
  "What's Val's tech stack?",
  "Tell me about Val's photography",
];

const messageVariants = {
  hidden: (role: string) => ({
    opacity: 0,
    x: role === "user" ? 20 : -20,
    y: 6,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

function Avatar({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-full overflow-hidden ring-1 ring-white/10"
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/ai-avatar.jpg"
        alt="AI"
        fill
        className="object-cover object-top"
      />
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const disableZoom = () => {
    const vp = document.querySelector('meta[name="viewport"]');
    if (vp) vp.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
  };
  const restoreZoom = () => {
    const vp = document.querySelector('meta[name="viewport"]');
    if (vp) vp.setAttribute('content', 'width=device-width, initial-scale=1');
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hey! I'm Val's AI assistant. Ask me anything about his work, skills, or projects.",
        },
      ]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Reset typewriter when a new assistant message starts
  useEffect(() => {
    if (loading) setDisplayedCount(0);
  }, [loading]);

  // Typewriter: advance displayed chars toward actual content
  useEffect(() => {
    if (!loading) {
      const last = messages[messages.length - 1];
      if (last?.role === "assistant") setDisplayedCount(last.content.length);
      return;
    }
    const interval = setInterval(() => {
      const last = messages[messages.length - 1];
      if (!last || last.role !== "assistant") return;
      setDisplayedCount((prev) => {
        if (prev >= last.content.length) return prev;
        return Math.min(prev + 4, last.content.length); // 4 chars per 20ms ≈ natural typing speed
      });
    }, 20);
    return () => clearInterval(interval);
  }, [loading, messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const userText = text.trim();
    if (!userText || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userText },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantIndex = newMessages.length;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (res.status === 429) throw new Error("rate_limited");
      if (!res.ok) throw new Error("Request failed");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No reader");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[assistantIndex] = {
                  role: "assistant",
                  content: updated[assistantIndex].content + parsed.text,
                };
                return updated;
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      const isRateLimited = err instanceof Error && err.message === "rate_limited";
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantIndex] = {
          role: "assistant",
          content: isRateLimited
            ? "You're sending messages too fast. Please wait a moment and try again."
            : "Sorry, something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // Keep input focused whenever loading finishes
  useEffect(() => {
    if (!loading && open) {
      inputRef.current?.focus();
    }
  }, [loading, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm"
          >
            <div
              className="flex flex-col rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden"
              style={{ height: "min(520px, calc(100vh - 160px))" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#141414]">
                <div className="relative">
                  <Avatar size={34} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#141414]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white leading-none">Val&apos;s AI</p>
                  <p className="text-[10px] text-white/40 mt-0.5">Portfolio assistant · always online</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/30 hover:text-white transition-colors p-1"
                  aria-label="Close chat"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      custom={msg.role}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <Avatar size={26} />
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-violet-600/80 text-white rounded-tr-sm"
                            : "bg-white/6 border border-white/8 text-white/85 rounded-tl-sm"
                        }`}
                      >
                        {(() => {
                        const isStreaming = loading && i === messages.length - 1;
                        const raw = isStreaming ? msg.content.slice(0, displayedCount) : msg.content;
                        const { text: content, projectIds, showContact } = parseContent(raw);
                        return content || projectIds.length || showContact ? (
                          <>
                          {content ? <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="mb-1 last:mb-0">
                                  {children}
                                  {isStreaming && (
                                    <motion.span
                                      className="inline-block w-[2px] h-[1em] bg-violet-400 ml-0.5 align-middle rounded-full"
                                      animate={{ opacity: [1, 0, 1] }}
                                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                  )}
                                </p>
                              ),
                              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mt-1">{children}</ol>,
                              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mt-1">{children}</ul>,
                              li: ({ children }) => <li className="leading-snug">{children}</li>,
                            }}
                          >
                            {content}
                          </ReactMarkdown> : null}
                          {!isStreaming && projectIds.length > 0 && <ProjectCards ids={projectIds} />}
                          {!isStreaming && showContact && <ContactCard />}
                          </>
                        ) : (
                          /* Typing indicator */
                          <span className="flex gap-1 items-center py-0.5">
                            {[0, 150, 300].map((delay) => (
                              <motion.span
                                key={delay}
                                className="w-1.5 h-1.5 rounded-full bg-white/40 block"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: delay / 1000,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </span>
                        );
                      })()}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="flex flex-col gap-2 mt-2"
                    >
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + i * 0.08 }}
                          onClick={() => sendMessage(s)}
                          className="text-left text-xs text-violet-300/70 border border-violet-500/20 rounded-xl px-3 py-2 hover:bg-violet-500/10 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
                        >
                          {s}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="px-3 pb-3 pt-2 border-t border-white/8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-violet-500/40 transition-colors">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Val…"
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none min-w-0"
                    style={{ fontSize: '16px' }}
                    onFocus={disableZoom}
                    onBlur={restoreZoom}
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || loading}
                    whileTap={{ scale: 0.9 }}
                    className="flex-shrink-0 w-7 h-7 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-white/10 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    aria-label="Send"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble prompt */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 right-24 md:right-28 z-50 cursor-pointer flex items-center"
            onClick={() => { setOpen(true); setShowBubble(false); }}
          >
            <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl rounded-br-sm px-5 py-3.5 shadow-xl">
              <p className="text-base font-medium text-white whitespace-nowrap">How can I help? 👋</p>
              <p className="text-xs text-white/40 mt-0.5">Ask me anything about Val</p>
              {/* Arrow pointing right */}
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#1a1a1a] border-r border-t border-white/10 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => { setOpen((v) => !v); setShowBubble(false); }}
        className="fixed bottom-4 right-4 md:right-6 z-50 rounded-full shadow-lg overflow-hidden"
        style={{ width: 68, height: 68 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="w-full h-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/ai-avatar.jpg"
                alt="AI"
                fill
                className="object-cover object-top"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
