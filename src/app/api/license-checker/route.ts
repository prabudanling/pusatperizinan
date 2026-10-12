import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";

// ============================================================
// POST /api/license-checker — Cek Izin Usaha dengan AI
// User deskripsikan usaha → AI susun roadmap perizinan lengkap
// ============================================================

interface PermitItem {
  name: string;
  description: string;
  authority: string;
  estimatedTime: string;
  riskLevel: string;
  mandatory: boolean;
}

interface CheckResult {
  summary: string;
  businessScale: string;
  permits: PermitItem[];
  warnings: string[];
  estimatedTotalTime: string;
  recommendedPackage: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessInput, sector, location, scale } = body;

    if (!businessInput || typeof businessInput !== "string" || businessInput.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Deskripsikan usaha Anda minimal 5 karakter" },
        { status: 400 }
      );
    }

    const prompt = `Analisis kebutuhan perizinan untuk usaha berikut:

DESKRIPSI USAHA: ${businessInput.trim().slice(0, 500)}
SEKTOR: ${sector || "tidak disebutkan"}
LOKASI: ${location || "tidak disebutkan"}
SKALA: ${scale || "belum ditentukan"}

Susun ROADMAP PERIZINAN yang akurat berdasarkan UU Cipta Kerja & OSS-RBA terbaru.

Balas HANYA dengan JSON valid (tanpa markdown, tanpa penjelasan di luar JSON) dengan struktur:
{
  "summary": "2-3 kalimat ringkasan profil perizinan usaha ini",
  "businessScale": "UMKM / Kecil / Menengah / Besar",
  "permits": [
    {
      "name": "Nama izin (contoh: NIB via OSS-RBA)",
      "description": "penjelasan 1-2 kalimat kenapa izin ini diperlukan",
      "authority": "Instansi (OSS, Kemenkumham, DPMPTSP, BPOM, Kemenag, dll)",
      "estimatedTime": "estimasi waktu proses (contoh: 1-3 hari kerja)",
      "riskLevel": "Rendah / Menengah Rendah / Menengah Tinggi / Tinggi / Tidak berlaku",
      "mandatory": true/false
    }
  ],
  "warnings": ["hal penting yang harus diwaspadai (contoh: lokasi perlu PBG sebelum operasional)"],
  "estimatedTotalTime": "estimasi total waktu semua izin",
  "recommendedPackage": "UMKM / Bisnis / Enterprise"
}

Sertakan 4-8 izin paling relevan. Selalu mulai dari NIB (wajib untuk semua usaha). Jika usaha kuliner: sertakan Sertifikat Halal & Izin Edar BPOM/Sertifikat CPPOB jika relevan. Jika kantor/ruang usaha: PBG & SLF. Jangan mengarang izin yang tidak relevan.`;

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content:
            "Kamu adalah mesin analisis perizinan Indonesia yang sangat akurat. Selalu balas dengan JSON valid murni tanpa teks lain.",
        },
        { role: "user", content: prompt },
      ],
      thinking: { type: "disabled" },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");

    // Parse JSON — bersihkan jika ada markdown fence
    const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
    let result: CheckResult;
    try {
      result = JSON.parse(cleaned);
    } catch {
      // Fallback: coba ekstrak JSON dari teks
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI mengembalikan format tidak valid");
      result = JSON.parse(jsonMatch[0]);
    }

    // Simpan ke DB untuk follow-up bisnis
    await db.licenseCheck.create({
      data: {
        businessInput: businessInput.trim().slice(0, 500),
        sector: sector || null,
        location: location || null,
        scale: scale || null,
        result: JSON.stringify(result).slice(0, 4000),
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[API /license-checker] Error:", error);
    return NextResponse.json(
      { success: false, error: "Analisis gagal. Silakan coba lagi atau hubungi konsultan kami." },
      { status: 500 }
    );
  }
}
