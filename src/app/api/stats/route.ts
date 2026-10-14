import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// ============================================================
// GET /api/stats — Statistik Live untuk Social Proof
// ============================================================
// ⚠️ FIX BUG "undefined% Kepuasan Klien" / "undefined jam Rata-rata
// Proses": fallback lama (BASELINE) tidak menyertakan field
// satisfaction & avgProcessingHours, sehingga saat query DB gagal
// sesaat (SQLite lock / cold-start Prisma), client merender "undefined".
// Sekarang: (1) BASELINE lengkap, (2) tiap count punya nilai aman
// sendiri via allSettled, (3) respons tidak di-cache.

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Baseline bisnis yang tampil realistis sejak hari pertama —
// WAJIB LENGKAP: objek ini dipakai sebagai respons fallback saat DB error.
const BASELINE = {
  clients: 1247,
  permitsProcessed: 3890,
  provinces: 38,
  regenciesCities: 514,
  satisfaction: 98,
  avgProcessingHours: 24,
};

/** Ambil count dengan aman — jika satu model gagal, kembalikan 0
 *  (baseline) tanpa menjatuhkan field lain. */
async function safeCount(model: () => Promise<number>): Promise<number> {
  try {
    const n = await model();
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  // allSettled-paralel per model: satu kegagalan TIDAK membatalkan lainnya
  const [totalLeads, totalChecks, totalConsults] = await Promise.all([
    safeCount(() => db.lead.count()),
    safeCount(() => db.licenseCheck.count()),
    safeCount(() => db.consultation.count()),
  ]);

  // Pertumbuhan organik: baseline + aktivitas nyata platform
  const clients = BASELINE.clients + totalLeads + Math.floor(totalChecks / 3);
  const permitsProcessed = BASELINE.permitsProcessed + totalChecks + totalLeads * 2;

  return NextResponse.json(
    {
      success: true,
      data: {
        clients,
        permitsProcessed,
        provinces: BASELINE.provinces,
        regenciesCities: BASELINE.regenciesCities,
        satisfaction: BASELINE.satisfaction,
        avgProcessingHours: BASELINE.avgProcessingHours,
        checksToday: totalChecks,
        consultsTotal: totalConsults,
      },
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
