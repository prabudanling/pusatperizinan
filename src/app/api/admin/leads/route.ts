import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

// ============================================================
// GET /api/admin/leads — List Lead + Summary untuk Command Center
// Dipakai dashboard admin (real-time polling 5 detik)
// ============================================================

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_STATUSES = ["NEW", "CONTACTED", "CONSULTED", "CLOSED_WON", "CLOSED_LOST"] as const;
type LeadStatus = (typeof VALID_STATUSES)[number];

const PIPELINE_ACTIVE: LeadStatus[] = ["NEW", "CONTACTED", "CONSULTED"];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();
    const status = searchParams.get("status") || "";
    const source = searchParams.get("source") || "";
    const limitRaw = parseInt(searchParams.get("limit") || "50", 10);
    const limit = Number.isNaN(limitRaw) ? 50 : Math.min(Math.max(limitRaw, 1), 200);

    // ---- Where clause untuk list (filter) ----
    const where: Prisma.LeadWhereInput = {};
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { whatsapp: { contains: q } },
        { businessType: { contains: q } },
      ];
    }
    if (status && (VALID_STATUSES as readonly string[]).includes(status)) {
      where.status = status;
    }
    if (source) {
      where.source = source;
    }

    // ---- Summary global (tidak terpengaruh filter) ----
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [items, groupBy, total, todayCount, pipelineAgg, todayAgg] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
      db.lead.groupBy({
        by: ["status"],
        _count: true,
        _sum: { estimatedValue: true },
      }),
      db.lead.count(),
      db.lead.count({ where: { createdAt: { gte: startOfDay } } }),
      db.lead.aggregate({
        where: { status: { in: PIPELINE_ACTIVE } },
        _sum: { estimatedValue: true },
      }),
      db.lead.aggregate({
        where: { createdAt: { gte: startOfDay } },
        _sum: { estimatedValue: true },
      }),
    ]);

    const byStatus: Record<LeadStatus, number> = {
      NEW: 0,
      CONTACTED: 0,
      CONSULTED: 0,
      CLOSED_WON: 0,
      CLOSED_LOST: 0,
    };
    for (const row of groupBy) {
      if ((VALID_STATUSES as readonly string[]).includes(row.status)) {
        byStatus[row.status as LeadStatus] = row._count;
      }
    }

    const pipelineActiveCount = PIPELINE_ACTIVE.reduce((acc, s) => acc + byStatus[s], 0);

    return NextResponse.json({
      success: true,
      data: {
        items,
        summary: {
          total,
          today: todayCount,
          byStatus,
          pipelineActiveCount,
          pipelineValue: pipelineAgg._sum.estimatedValue || 0,
          todayValue: todayAgg._sum.estimatedValue || 0,
        },
      },
    });
  } catch (error) {
    console.error("[API /admin/leads] Error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
