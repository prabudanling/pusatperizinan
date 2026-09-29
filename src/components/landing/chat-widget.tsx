"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

interface ChatApiResponse {
  success: boolean;
  reply?: string;
  leadCaptured?: boolean;
  leadComplete?: boolean;
  stage?: string;
  suggestions?: string[];
  error?: string;
}

const SESSION_KEY = "pp-chat-session";
const TEASER_DISMISS_KEY = "pp-chat-teaser-dismissed";
const OPENED_KEY = "pp-chat-opened";
const TEASER_DELAY_MS = 8_000;
const TEASER_AUTO_HIDE_MS = 25_000;

const WELCOME_FALLBACK: ChatMsg = {
  role: "assistant",
  content:
    "Halo Kak! 👋 Saya **RIZKI**, Konsultan AI PusatPerizinan.com — siaga 24 jam untuk semua pertanyaan perizinan usaha.\n\nNIB, PT, CV, Halal, BPOM, atau izin lainnya? Tanya saja langsung! 😊",
};

function newSessionId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function renderMessage(text: string) {
  // Render sederhana: **bold** → <strong>, newline → break
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={j} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
      {i < text.split("\n").length - 1 && <br />}
    </span>
  ));
}

/** Teks teaser: chatWelcome dibersihkan dari markdown & dipotong 90 char */
function buildTeaserText(welcome: string, fallback: string): string {
  const clean = welcome
    .replace(/\*\*/g, "")
    .replace(/\s*\n+\s*/g, " ")
    .trim();
  if (!clean) return fallback;
  return clean.length > 90 ? `${clean.slice(0, 90).trimEnd()}…` : clean;
}

const NAME_STOPWORDS = new Set(["tolong", "mohon", "bantu", "mau", "ingin", "butuh", "sekalian"]);

/** Nama user dari pesan-pesannya (untuk kartu sukses lead) */
function guessUserName(msgs: ChatMsg[]): string | null {
  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i];
    if (m.role !== "user") continue;
    const proper = m.content.match(
      /(?:\bnama\s+(?:saya|ku|aku|gw)\s*[:\-]?\s*|\bsaya\s+)([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,2})/
    );
    if (proper) return proper[1];
    const lower = m.content.match(
      /nama\s+(?:saya|ku|aku|gw)\s*[:\-]?\s*([A-Za-z]+(?:\s+[A-Za-z]+){0,2})/i
    );
    if (lower) {
      const words = lower[1]
        .split(/\s+/)
        .filter((w) => !NAME_STOPWORDS.has(w.toLowerCase()));
      if (words.length > 0) {
        return words
          .slice(0, 3)
          .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
          .join(" ");
      }
    }
  }
  return null;
}

export function ChatWidget() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([WELCOME_FALLBACK]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [unreadCount, setUnreadCount] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [chipsPaused, setChipsPaused] = useState(false); // user mengetik manual → chips disembunyikan sementara
  const [hasLeadCard, setHasLeadCard] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Persist session: konteks chat bertahan lintas refresh (dipasangkan rebuild DB di API)
  useEffect(() => {
    let id = "";
    try {
      id = window.localStorage.getItem(SESSION_KEY) || "";
      if (!id) {
        id = newSessionId();
        window.localStorage.setItem(SESSION_KEY, id);
      }
    } catch {
      id = newSessionId();
    }
    setSessionId(id);
  }, []);

  // Proactive teaser: muncul 8 dtk setelah load (hanya bila chat belum pernah dibuka/dismiss)
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const showTimer = setTimeout(() => {
      try {
        const dismissed = window.localStorage.getItem(TEASER_DISMISS_KEY) === "1";
        const opened = window.localStorage.getItem(OPENED_KEY) === "1";
        if (dismissed || opened) return;
      } catch {
        // localStorage terblokir → tetap tampilkan teaser
      }
      setTeaserVisible(true);
      hideTimer = setTimeout(() => setTeaserVisible(false), TEASER_AUTO_HIDE_MS);
    }, TEASER_DELAY_MS);
    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  // Escape menutup panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Fokus input saat panel dibuka
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 260);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending, open, suggestions]);

  // Sambutan mengikuti bahasa aktif (reset hanya jika percakapan belum dimulai)
  useEffect(() => {
    setMessages((prev) =>
      prev.length <= 1 && prev[0]?.role === "assistant"
        ? [{ role: "assistant", content: t("chatWelcome") }]
        : prev
    );
  }, [lang, t]);

  const openPanel = () => {
    setOpen(true);
    setTeaserVisible(false);
    setUnreadCount(0);
    try {
      window.localStorage.setItem(OPENED_KEY, "1");
    } catch {
      // abaikan
    }
  };

  const dismissTeaser = () => {
    setTeaserVisible(false);
    try {
      window.localStorage.setItem(TEASER_DISMISS_KEY, "1");
    } catch {
      // abaikan
    }
  };

  const send = async (text?: string) => {
    const message = (text ?? input).trim();
    if (!message || sending || !sessionId) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setSending(true);
    setSuggestions([]); // chips sembunyi sampai balasan berikutnya

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message, language: lang }),
      });
      const json: ChatApiResponse = await res.json();
      const replyText = typeof json.reply === "string" ? json.reply : "";
      if (json.success && replyText) {
        setMessages((prev) => [...prev, { role: "assistant", content: replyText }]);
        if (!openRef.current) setUnreadCount((c) => c + 1);
        if (Array.isArray(json.suggestions) && json.suggestions.length > 0) {
          setSuggestions(json.suggestions.slice(0, 4));
          setChipsPaused(false);
        }
        if (json.leadComplete) setHasLeadCard(true);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Mohon maaf, ${json.error || "sistem sedang sibuk."} Silakan coba lagi atau chat WhatsApp kami.`,
          },
        ]);
        if (!openRef.current) setUnreadCount((c) => c + 1);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Koneksi bermasalah. Silakan coba lagi, atau hubungi langsung WhatsApp kami di 0812-6999-9910.",
        },
      ]);
      if (!openRef.current) setUnreadCount((c) => c + 1);
    } finally {
      setSending(false);
    }
  };

  const staticQrs = [t("chatQr1"), t("chatQr2"), t("chatQr3"), t("chatQr4")];
  const chips = suggestions.length > 0 ? suggestions : messages.length <= 1 ? staticQrs : [];
  const leadName = hasLeadCard ? guessUserName(messages) : null;
  const teaserBody = buildTeaserText(
    t("chatWelcome"),
    "Pertanyaan izin usaha? Tanya saya gratis 👋"
  );

  return (
    <>
      {/* Proactive teaser (belum pernah buka chat) */}
      <AnimatePresence>
        {teaserVisible && !open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="fixed bottom-[88px] right-4 z-[60] flex max-w-[min(320px,calc(100vw-5.5rem))] items-center gap-2.5 sm:right-5"
            role="status"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-700 shadow-md">
              <Bot className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2 shadow-xl">
              <p className="min-w-0 flex-1 text-[12px] leading-snug text-foreground/90">
                {teaserBody}
              </p>
              <button
                onClick={dismissTeaser}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Tutup pesan pengantar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => (open ? setOpen(false) : openPanel())}
        className={cn(
          "fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95",
          "bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground",
          !open && "animate-pulse-ring"
        )}
        aria-label={open ? "Tutup chat konsultan AI" : "Buka chat konsultan AI"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-background bg-gold px-1 text-[10px] font-bold text-gold-foreground"
            aria-label={`${unreadCount} pesan baru`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-[88px] left-3 right-3 z-[60] flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:left-auto sm:right-5 sm:w-[380px]"
            style={{ height: "min(600px, calc(100vh - 104px))" }}
            role="dialog"
            aria-label="Chat dengan Konsultan AI"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-emerald-700 px-4 py-3.5 flex items-center gap-3 shrink-0">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                  <Bot className="h-5.5 w-5.5 text-white" />
                </div>
                <span
                  className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-300 border-2 border-emerald-700"
                  aria-label="Online"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  {t("chatTitle")}
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                </p>
                <p className="text-[11px] text-emerald-100/85">{t("chatStatus")}</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Chat WhatsApp human"
              >
                <PhoneCall className="h-4 w-4 text-white" />
              </a>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Riwayat percakapan"
              className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin px-4 py-4 space-y-3 bg-secondary/30"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm break-words",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md text-foreground/90"
                    )}
                  >
                    {renderMessage(msg.content)}
                  </div>
                </motion.div>
              ))}

              {/* Lead success card — muncul sekali saat nama + WA tertangkap */}
              {hasLeadCard && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/40"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium leading-relaxed text-emerald-900 dark:text-emerald-100">
                        ✅ Terhubung, {leadName ?? "Kak"}! Tim kami akan menghubungi via WhatsApp
                        maks. 15 menit (08.00–21.00 WIB).
                      </p>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                        aria-label="Chat WhatsApp sekarang"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        Chat WhatsApp Sekarang
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {sending && (
                <div className="flex justify-start">
                  <div
                    className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3"
                    role="status"
                    aria-label={t("chatTyping")}
                  >
                    <span className="flex items-end gap-1" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </span>
                    <span className="text-xs text-muted-foreground">{t("chatTyping")}</span>
                  </div>
                </div>
              )}

              {/* Quick replies dinamis per stage (chips) */}
              {!sending && !chipsPaused && chips.length > 0 && (
                <div
                  className="flex gap-2 overflow-x-auto scrollbar-thin pt-1 pb-1"
                  role="list"
                  aria-label="Saran pesan cepat"
                >
                  {chips.map((qr) => (
                    <button
                      key={qr}
                      role="listitem"
                      onClick={() => {
                        setChipsPaused(true);
                        send(qr);
                      }}
                      className="min-h-9 shrink-0 whitespace-nowrap rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15"
                      aria-label={`Kirim: ${qr}`}
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setChipsPaused(true);
                send();
              }}
              className="shrink-0 border-t bg-card p-3 flex items-center gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chatPlaceholder")}
                className="h-10 rounded-full text-sm bg-secondary/50 border-border/70"
                maxLength={1000}
                aria-label="Ketik pesan"
              />
              <Button
                type="submit"
                size="icon"
                disabled={sending || !input.trim()}
                className="h-10 w-10 rounded-full shrink-0 shadow-md"
                aria-label="Kirim pesan"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
