"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, Loader2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_FALLBACK: ChatMsg = {
  role: "assistant",
  content:
    "Halo Kak! 👋 Saya **RIZKI**, Konsultan AI PusatPerizinan.com — siaga 24 jam untuk semua pertanyaan perizinan usaha.\n\nNIB, PT, CV, Halal, BPOM, atau izin lainnya? Tanya saja langsung! 😊",
};

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

export function ChatWidget() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([WELCOME_FALLBACK]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending, open]);

  useEffect(() => {
    if (open) setHasNewMessage(false);
  }, [open]);

  // Sambutan mengikuti bahasa aktif (reset hanya jika percakapan belum dimulai)
  useEffect(() => {
    setMessages((prev) =>
      prev.length <= 1 && prev[0]?.role === "assistant"
        ? [{ role: "assistant", content: t("chatWelcome") }]
        : prev
    );
  }, [lang, t]);

  const send = async (text?: string) => {
    const message = (text ?? input).trim();
    if (!message || sending) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message, language: lang }),
      });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: json.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Mohon maaf, ${json.error || "sistem sedang sibuk."} Silakan coba lagi atau chat WhatsApp kami.` },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Koneksi bermasalah. Silakan coba lagi, atau hubungi langsung WhatsApp kami di 0812-6999-9910.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95",
          "bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground",
          !open && "animate-pulse-ring"
        )}
        aria-label={open ? "Tutup chat konsultan AI" : "Buka chat konsultan AI"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && hasNewMessage && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gold text-gold-foreground text-[9px] font-bold flex items-center justify-center border-2 border-background">
            1
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
            className="fixed bottom-[84px] right-4 sm:right-5 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-card flex flex-col"
            style={{ height: "min(560px, calc(100vh - 120px))" }}
            role="dialog"
            aria-label="Chat dengan Konsultan AI"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-emerald-700 px-4 py-3.5 flex items-center gap-3 shrink-0">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                  <Bot className="h-5.5 w-5.5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-300 border-2 border-emerald-700" aria-label="Online" />
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
              className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-3 bg-secondary/30"
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
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md text-foreground/90"
                    )}
                  >
                    {renderMessage(msg.content)}
                  </div>
                </motion.div>
              ))}

              {sending && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">{t("chatTyping")}</span>
                  </div>
                </div>
              )}

              {/* Quick replies — hanya tampil di awal percakapan */}
              {messages.length <= 1 && !sending && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {[t("chatQr1"), t("chatQr2"), t("chatQr3"), t("chatQr4")].map((qr) => (
                    <button
                      key={qr}
                      onClick={() => send(qr)}
                      className="text-[11px] rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-primary font-medium hover:bg-primary/15 transition-colors"
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
                send();
              }}
              className="shrink-0 border-t bg-card p-3 flex items-center gap-2"
            >
              <Input
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
