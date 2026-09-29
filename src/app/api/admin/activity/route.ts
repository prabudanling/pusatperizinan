import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// ============================================================
// GET /api/admin/activity — Feed Gabungan Aktivitas Terbaru
// Real-time monitoring: chat, cek izin, cek dokumen, roadmap,
// kursus email, booking konsultasi, lead baru
// ============================================================

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PER_SOURCE_TAKE = 15;
const FEED_MAX = 40;

interface ActivityItem {
  id: string;
  type: "chat" | "license-check" | "document-check" | "roadmap" | "subscriber" | "consultation" | "lead";
  title: string;
  detail: string;
  at: string; // ISO timestamp
}

/** Potong teks maks n karakter + elipsis */
function truncate(text: string | null | undefined, n: number): string {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (!clean) return "—";
  return clean.length > n ? `${clean.slice(0, n).trimEnd()}…` : clean;
}

export async function GET() {
  try {
    const [chats, licenseChecks, documentChecks, roadmaps, subscribers, consultations, leads] =
      await Promise.all([
        db.chatMessage.findMany({
          where: { role: "user" },
          orderBy: { createdAt: "desc" },
          take: PER_SOURCE_TAKE,
        }),
        db.licenseCheck.findMany({ orderBy: { createdAt: "desc" }, take: PER_SOURCE_TAKE }),
        db.documentCheck.findMany({ orderBy: { createdAt: "desc" }, take: PER_SOURCE_TAKE }),
        db.roadmapRequest.findMany({ orderBy: { createdAt: "desc" }, take: PER_SOURCE_TAKE }),
        db.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: PER_SOURCE_TAKE }),
        db.consultation.findMany({ orderBy: { createdAt: "desc" }, take: PER_SOURCE_TAKE }),
        db.lead.findMany({ orderBy: { createdAt: "desc" }, take: PER_SOURCE_TAKE }),
      ]);

    const feed: ActivityItem[] = [
      ...chats.map((c) => ({
        id: `chat-${c.id}`,
        type: "chat" as const,
        title: "Chat AI",
        detail: truncate(c.content, 90),
        at: c.createdAt.toISOString(),
      })),
      ...licenseChecks.map((l) => ({
        id: `license-${l.id}`,
        type: "license-check" as const,
        title: "Cek Izin AI",
        detail: truncate(l.businessInput, 90),
        at: l.createdAt.toISOString(),
      })),
      ...documentChecks.map((d) => ({
        id: `doc-${d.id}`,
        type: "document-check" as const,
        title: "Cek Dokumen",
        detail: `${d.docCategory} — ${d.fileName}`,
        at: d.createdAt.toISOString(),
      })),
      ...roadmaps.map((r) => ({
        id: `roadmap-${r.id}`,
        type: "roadmap" as const,
        title: "Roadmap Izin",
        detail: `${r.businessField} — ${r.province}`,
        at: r.createdAt.toISOString(),
      })),
      ...subscribers.map((s) => ({
        id: `subscriber-${s.id}`,
        type: "subscriber" as const,
        title: "Kursus Email",
        detail: s.email,
        at: s.createdAt.toISOString(),
      })),
      ...consultations.map((c) => ({
        id: `consult-${c.id}`,
        type: "consultation" as const,
        title: "Booking Konsultasi",
        detail: `${c.topic} — ${c.name}`,
        at: c.createdAt.toISOString(),
      })),
      ...leads.map((l) => ({
        id: `lead-${l.id}`,
        type: "lead" as const,
        title: "Lead Baru",
        detail: `${l.name} — ${l.businessType}`,
        at: l.createdAt.toISOString(),
      })),
    ];

    feed.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));
    const items = feed.slice(0, FEED_MAX);

    return NextResponse.json({ success: true, data: { items } });
  } catch (error) {
    console.error("[API /admin/activity] Error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
