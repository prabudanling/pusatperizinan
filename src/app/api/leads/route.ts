import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SECTORS } from "@/lib/landing-data";

// ============================================================
// POST /api/leads — Capture Lead dari Form Landing Page
// Aset bisnis paling berharga: data calon klien
// ============================================================

const BUSINESS_TYPES = SECTORS;

const PACKAGES = ["UMKM", "Bisnis", "Enterprise", "Belum tahu"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, businessType, businessDesc, package: pkg, source } = body;

    // Validasi
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Nama wajib diisi (min. 2 karakter)" },
        { status: 400 }
      );
    }
    if (!whatsapp || typeof whatsapp !== "string") {
      return NextResponse.json(
        { success: false, error: "Nomor WhatsApp wajib diisi" },
        { status: 400 }
      );
    }
    // Normalisasi nomor WA Indonesia
    const wa = whatsapp.replace(/[^0-9]/g, "");
    if (wa.length < 9 || wa.length > 15) {
      return NextResponse.json(
        { success: false, error: "Nomor WhatsApp tidak valid" },
        { status: 400 }
      );
    }
    if (businessType && !BUSINESS_TYPES.includes(businessType)) {
      return NextResponse.json(
        { success: false, error: "Jenis usaha tidak valid" },
        { status: 400 }
      );
    }
    if (pkg && !PACKAGES.includes(pkg)) {
      return NextResponse.json(
        { success: false, error: "Paket tidak valid" },
        { status: 400 }
      );
    }

    // Estimasi nilai kontrak berdasarkan paket
    const estimatedValue =
      pkg === "Enterprise" ? 25000000 : pkg === "Bisnis" ? 7500000 : pkg === "UMKM" ? 1500000 : 0;

    const lead = await db.lead.create({
      data: {
        name: name.trim(),
        whatsapp: wa.startsWith("0") ? `62${wa.slice(1)}` : wa,
        email: email && typeof email === "string" ? email.trim() : null,
        businessType: businessType || "Lainnya",
        businessDesc: businessDesc ? String(businessDesc).slice(0, 1000) : null,
        package: pkg || null,
        source: source && typeof source === "string" ? source : "landing",
        estimatedValue,
      },
    });

    return NextResponse.json({
      success: true,
      data: { id: lead.id },
      message:
        "Terima kasih! Tim konsultan kami akan menghubungi Anda via WhatsApp dalam 1x24 jam (biasanya < 15 menit di jam kerja).",
    });
  } catch (error) {
    console.error("[API /leads] Error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server. Coba lagi." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [total, byStatus] = await Promise.all([
      db.lead.count(),
      db.lead.groupBy({ by: ["status"], _count: true }),
    ]);
    return NextResponse.json({ success: true, data: { total, byStatus } });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
