import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/* -------------------------------------------------------------------------- */
/*  POST /api/consultation — Simpan permintaan konsultasi perizinan            */
/* -------------------------------------------------------------------------- */

const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  phone: z
    .string()
    .trim()
    .min(9, "Nomor WhatsApp tidak valid")
    .max(20, "Nomor WhatsApp terlalu panjang")
    .regex(/^[+]?[\d\s-]+$/, "Nomor hanya boleh berisi angka"),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid")
    .max(150)
    .optional()
    .or(z.literal("")),
  businessType: z.string().trim().min(1, "Pilih jenis usaha").max(100),
  serviceType: z.string().trim().min(1, "Pilih layanan").max(100),
  message: z.string().trim().max(1000, "Pesan maksimal 1000 karakter").optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Body request tidak valid" },
        { status: 400 }
      );
    }

    const parsed = consultationSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Data tidak valid";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 422 }
      );
    }

    const { name, phone, email, businessType, serviceType, message } = parsed.data;

    const consultation = await db.consultation.create({
      data: {
        name,
        phone,
        email: email || null,
        businessType,
        serviceType,
        message: message || null,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Terima kasih! Tim kami akan menghubungi Anda dalam 15 menit pada jam kerja.",
        data: { id: consultation.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/consultation] Error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server. Silakan coba lagi atau hubungi WhatsApp kami." },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*  GET /api/consultation — ringkasan jumlah permintaan (statistik social proof) */
/* -------------------------------------------------------------------------- */

export async function GET() {
  try {
    const total = await db.consultation.count();
    return NextResponse.json({ success: true, total });
  } catch (error) {
    console.error("[API /api/consultation] GET Error:", error);
    return NextResponse.json({ success: false, total: 0 }, { status: 500 });
  }
}
