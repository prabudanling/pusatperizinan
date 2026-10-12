"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EmptyState, SkeletonRows, useAdminData, relativeTime } from "@/components/admin/shared";
import { Bot, User, Sparkles } from "lucide-react";

// ============================================================
// Tab 5 — CHAT RIZKI: monitor percakapan AI CS 24/7
// ============================================================

interface Session {
  sessionId: string; count: number; leadCaptured: boolean;
  first: string; lastAt: string; preview: string;
}
interface Message { id: string; sessionId: string; role: string; content: string; leadCaptured: boolean; createdAt: string }

export function ChatsTab() {
  const { data, loading } = useAdminData<{ sessions: Session[] }>("/api/admin/chats", { intervalMs: 30_000 });
  const [active, setActive] = useState<string | null>(null);
  const { data: thread, loading: threadLoading } = useAdminData<{ messages: Message[] }>(
    active ? `/api/admin/chats?sessionId=${encodeURIComponent(active)}` : null
  );

  const sessions = data?.sessions ?? [];

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      {/* Daftar sesi */}
      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="p-2">
          {loading && !data ? (
            <div className="p-2"><SkeletonRows rows={6} /></div>
          ) : sessions.length === 0 ? (
            <EmptyState title="Belum ada percakapan" sub="Setiap pengunjung yang mengobrol dengan RIZKI muncul di sini." />
          ) : (
            <ul className="max-h-[65vh] space-y-1 overflow-y-auto p-1">
              {sessions.map((s) => (
                <li key={s.sessionId}>
                  <button
                    onClick={() => setActive(s.sessionId)}
                    aria-current={active === s.sessionId ? "true" : undefined}
                    className={cn(
                      "w-full rounded-xl border p-3 text-left transition",
                      active === s.sessionId
                        ? "border-emerald-500/40 bg-emerald-500/10"
                        : "border-stone-800 bg-stone-950/60 hover:border-stone-700"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-stone-100">{s.first}</p>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[11px] text-stone-500">{s.count} pesan · {relativeTime(s.lastAt)}</span>
                      {s.leadCaptured && (
                        <Badge className="border-emerald-500/30 bg-emerald-500/15 text-[10px] text-emerald-300" variant="outline">
                          <Sparkles aria-hidden className="mr-1 h-3 w-3" /> Lead!
                        </Badge>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Thread */}
      <Card className="border-stone-800 bg-stone-900/50 shadow-none">
        <CardContent className="p-4">
          {!active ? (
            <EmptyState title="Pilih percakapan" sub="Lihat bagaimana RIZKI menjual dan menangkap lead secara otomatis." />
          ) : threadLoading && !thread ? (
            <SkeletonRows rows={5} />
          ) : (
            <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
              {(thread?.messages ?? []).map((m) => {
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                        isUser
                          ? "rounded-br-sm bg-emerald-500/15 text-emerald-50"
                          : "rounded-bl-sm border border-stone-800 bg-stone-950/80 text-stone-200"
                      )}
                    >
                      <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-stone-500">
                        {isUser ? <User aria-hidden className="h-3 w-3" /> : <Bot aria-hidden className="h-3 w-3 text-emerald-400" />}
                        {isUser ? "Pengunjung" : "RIZKI (AI)"}
                      </p>
                      {m.content}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
