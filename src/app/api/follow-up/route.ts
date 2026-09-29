import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// ============================================================
// GET /api/follow-up — Daftar draft/kirim email follow-up + stats
// Dipakai panel admin (FollowUpPanel). Include relasi lead.
// ============================================================

export const runtime = "nodejs";

export async function GET() {
  try {
    const [items, grouped] = await Promise.all([
      db.followUp.findMany({
        orderBy: { createdAt: "desc" },
        take: 60,
        include: {
          lead: {
            select: {
              name: true,
              whatsapp: true,
              email: true,
              status: true,
              businessType: true,
            },
          },
        },
      }),
      db.followUp.groupBy({ by: ["status"], _count: true }),
    ]);

    // Stats dari groupBy status (default 0 bila tidak ada)
    const statOf = (status: string): number =>
      grouped.find((g) => g.status === status)?._count ?? 0;

    return NextResponse.json({
      success: true,
      data: {
        items,
        stats: {
          queued: statOf("QUEUED"),
          sent: statOf("SENT"),
          dismissed: statOf("DISMISSED"),
        },
      },
    });
  } catch (error) {
    console.error("[API /follow-up] Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data follow-up." },
      { status: 500 }
    );
  }
}
