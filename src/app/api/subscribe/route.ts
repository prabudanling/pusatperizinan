import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ============================================================
// PUSATPERIZINAN.COM — API Kursus Email 7 Hari (lead nurturing)
// POST: daftar subscriber baru (anti-duplikat via email upsert)
// GET : jumlah subscriber (social proof)
// ============================================================

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BASELINE = 1200;

/** Normalisasi nomor WA Indonesia: 0xxx / 62xxx / +62xxx → 62xxxxxxxxxx */
function normalizeWa(raw: string): string | null {
  let digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  if (!digits.startsWith("62")) digits = "62" + digits;
  return /^62\d{8,13}$/.test(digits) ? digits : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const waRaw = String(body?.whatsapp ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Nama minimal 2 karakter." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Format email tidak valid. Contoh: nama@perusahaan.com" },
        { status: 400 }
      );
    }

    let whatsapp: string | null = null;
    if (waRaw) {
      whatsapp = normalizeWa(waRaw);
      if (!whatsapp) {
        return NextResponse.json(
          { ok: false, error: "Nomor WhatsApp tidak valid (contoh: 081234567890)." },
          { status: 400 }
        );
      }
    }

    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: { name, ...(whatsapp ? { whatsapp } : {}) },
      create: { name, email, whatsapp, source: "email-course" },
    });

    return NextResponse.json({
      ok: true,
      message: `Terima kasih, ${name}! Materi Hari 1 sedang meluncur ke ${email}.`,
      id: subscriber.id,
    });
  } catch (e) {
    console.error("[subscribe] error:", e);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.subscriber.count();
    return NextResponse.json({ ok: true, count: BASELINE + count });
  } catch {
    return NextResponse.json({ ok: true, count: BASELINE });
  }
}
