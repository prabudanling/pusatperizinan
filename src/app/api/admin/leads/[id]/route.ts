import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ============================================================
// PATCH /api/admin/leads/[id] — Update Status / Catatan Lead
// Body: { status?, notes? } — validasi ketat sebelum simpan
// ============================================================

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_STATUSES = ["NEW", "CONTACTED", "CONSULTED", "CLOSED_WON", "CLOSED_LOST"] as const;
type LeadStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    // Next.js 16: params adalah Promise
    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json({ success: false, error: "ID lead wajib ada" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Body JSON tidak valid" },
        { status: 400 }
      );
    }

    const { status, notes } = body as { status?: unknown; notes?: unknown };
    const data: { status?: LeadStatus; notes?: string | null } = {};

    // Validasi status
    if (status !== undefined) {
      if (typeof status !== "string" || !(VALID_STATUSES as readonly string[]).includes(status)) {
        return NextResponse.json(
          {
            success: false,
            error: `Status tidak valid. Gunakan salah satu: ${VALID_STATUSES.join(", ")}`,
          },
          { status: 400 }
        );
      }
      data.status = status as LeadStatus;
    }

    // Validasi notes (maks 2000 karakter)
    if (notes !== undefined) {
      if (notes === null) {
        data.notes = null;
      } else {
        if (typeof notes !== "string") {
          return NextResponse.json(
            { success: false, error: "Catatan harus berupa teks" },
            { status: 400 }
          );
        }
        if (notes.length > 2000) {
          return NextResponse.json(
            { success: false, error: "Catatan maksimal 2000 karakter" },
            { status: 400 }
          );
        }
        data.notes = notes;
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { success: false, error: "Tidak ada field yang diupdate (status/notes)" },
        { status: 400 }
      );
    }

    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Lead tidak ditemukan" }, { status: 404 });
    }

    const lead = await db.lead.update({ where: { id }, data });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("[API /admin/leads/[id]] Error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
