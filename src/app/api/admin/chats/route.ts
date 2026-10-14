import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// GET /api/admin/chats                — daftar sesi chat RIZKI
// GET /api/admin/chats?sessionId=xxx  — isi percakapan satu sesi
// ============================================================

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const sessionId = req.nextUrl.searchParams.get("sessionId");

    if (sessionId) {
      const messages = await db.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: "asc" },
        take: 200,
      });
      return NextResponse.json({ success: true, data: { messages } });
    }

    const all = await db.chatMessage.findMany({ orderBy: { createdAt: "desc" }, take: 400 });
    const bySession = new Map<string, {
      sessionId: string; count: number; leadCaptured: boolean;
      first: string; lastAt: Date; preview: string;
    }>();
    for (const m of all) {
      const s = bySession.get(m.sessionId);
      if (!s) {
        bySession.set(m.sessionId, {
          sessionId: m.sessionId,
          count: 1,
          leadCaptured: m.leadCaptured,
          first: m.content.slice(0, 90),
          lastAt: m.createdAt,
          preview: m.content.slice(0, 90),
        });
      } else {
        s.count++;
        s.leadCaptured = s.leadCaptured || m.leadCaptured;
        if (m.createdAt > s.lastAt) s.lastAt = m.createdAt;
      }
    }
    const sessions = [...bySession.values()].sort((a, b) => b.lastAt.getTime() - a.lastAt.getTime());
    return NextResponse.json({ success: true, data: { sessions } });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat chat" },
      { status: 500 }
    );
  }
}
