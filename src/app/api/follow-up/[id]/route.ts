import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ============================================================
// PATCH /api/follow-up/[id] — Ubah status FollowUp
// SENT (catat sentAt) / DISMISSED / FAILED dari panel admin.
// Next.js 16: params adalah Promise → await ctx.params.
// ============================================================

export const runtime = "nodejs";

const ALLOWED_STATUSES = ["SENT", "DISMISSED", "FAILED"] as const;

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    const body = (await req.json().catch(() => null)) as { status?: unknown } | null;
    const statusRaw = typeof body?.status === "string" ? body.status.trim().toUpperCase() : "";
    if (!(ALLOWED_STATUSES as readonly string[]).includes(statusRaw)) {
      return NextResponse.json(
        { success: false, error: "Status tidak valid. Gunakan SENT / DISMISSED / FAILED." },
        { status: 400 }
      );
    }
    const status = statusRaw as (typeof ALLOWED_STATUSES)[number];

    const existing = await db.followUp.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Follow-up tidak ditemukan." },
        { status: 404 }
      );
    }

    const updated = await db.followUp.update({
      where: { id },
      data: { status, sentAt: status === "SENT" ? new Date() : existing.sentAt },
      include: { lead: { select: { name: true } } },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        status: updated.status,
        sentAt: updated.sentAt,
        subject: updated.subject,
        leadName: updated.lead.name,
      },
      message:
        status === "SENT"
          ? "Follow-up ditandai terkirim."
          : status === "DISMISSED"
            ? "Follow-up dibatalkan."
            : "Follow-up ditandai gagal.",
    });
  } catch (error) {
    console.error("[API /follow-up/id] Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status follow-up." },
      { status: 500 }
    );
  }
}
