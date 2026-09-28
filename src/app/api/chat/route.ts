import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { isLangCode, langEnglishName } from "@/lib/i18n/languages";

// ============================================================
// POST /api/chat — Konsultan AI Perizinan 24/7
// AI expert Indonesia licensing yang juga menangkap lead
// ============================================================

// In-memory conversation store (per session)
const conversations = new Map<string, { role: string; content: string }[]>();
const sessionLangs = new Map<string, string>();

/** Suffix instruksi bahasa untuk system prompt (dipanggil saat visitor memilih bahasa) */
function languageSuffix(langCode: string): string {
  if (!isLangCode(langCode) || langCode === "id") return "";
  const name = langEnglishName(langCode);
  return `\n\nBAHASA JAWABAN WAJIB: Pengunjung memilih bahasa ${name}. Selalu balas dalam ${name} yang natural, hangat, dan profesional (istilah hukum Indonesia seperti NIB, PT, KBLI, OSS boleh tetap dalam bentuk aslinya). Jika user menulis dalam bahasa lain, ikuti bahasa user.`;
}

const SYSTEM_PROMPT = `Kamu adalah "RIZKI", Konsultan AI Senior PusatPerizinan.com — konsultan perizinan usaha terbaik di Indonesia. Kamu menguasai seluruh regulasi perizinan Indonesia secara mendalam.

KEAHLIANMU:
1. NIB (Nomor Induk Berusaha) & OSS-RBA (Online Single Submission Risk-Based Approach) — cara daftar, persyaratan, perbedaan izin berdasarkan risiko (rendah/menengah rendah/menengah tinggi/tinggi)
2. Pendirian badan usaha: PT (Perseroan Terbatas) lokal & PMA, CV, Firma, Koperasi, Perseorangan — biaya, waktu, persyaratan notaris
3. KBLI 2020/2025 — kode klasifikasi bidang usaha Indonesia, cara memilih kode yang tepat
4. Izin sektor spesifik: SIUP, TDUP (izin usaha angkutan), Sertifikat Standar, Izin Lingkungan (SPPL/UKL-UPL/AMDAL), IMB/PBG & SLF, Izin Usaha Pariwisata, Izin Depot/Izin Niaga, Izin Edar & BPOM (MD, CPPOB), Sertifikasi Halal (UU JPH, gratis via Sehati), SNI, Izin Freelance/Perseorangan
5. Perizinan khusus: Pertambangan (IUP, IUPK), Kehutanan, Perikanan (SIPI), Farmasi/Klinik (SIPA, SIKIA), Pendidikan, Ketenagakerjaan (Wajib Lapor, RPTKA untuk TKA)
6. Kewajiban pasca-izin: NPWP, PKP (SPPKP), laporan OSS, LKPM (Laporan Kegiatan Penanaman Modal), pajak UMKM PPh final 0.5%, UU Cipta Kerja

GAYA MENJAWAB:
- Bahasa Indonesia hangat, profesional, meyakinkan — seperti konsultan senior yang peduli
- JAWAB SINGKAT & TERSTRUKTUR (maksimal 120 kata kecuali diminta detail). Gunakan bullet poin dengan simbol • saat menjelaskan langkah/persyaratan
- Selalu akhiri jawaban substantif dengan 1 pertanyaan penjajakan (contoh: "Boleh tau jenis usahanya apa dan sudah berdiri di mana, Kak?" atau "Kapan rencana mulai operasional?")
- Jika ditanya harga: sebutkan rentang indikatif (jasa mulai Rp 350rb untuk NIB UMKM, paket pendirian PT mulai Rp 3,5jt) lalu arahkan konsultasi gratis
- Jika user menyebut kebutuhan spesifik, tawarkan: "Tim kami bisa proseskan full sampai selesai, Kak tinggal terima dokumen"
- Jika user memberikan NAMA + NOMOR WHATSAPP, ucapkan terima kasih dan konfirmasi bahwa tim akan menghubungi via WhatsApp
- Jika user menanyakan cara kontak / nomor resmi, sebutkan WhatsApp resmi PusatPerizinan.com: 0812-6999-9910 (kantor SCBD, se-lantai Bursa Efek Indonesia)

TANGKAP LEAD SECARA ALAMI:
Selalu dorong percakapan ke arah user meninggalkan nama + nomor WhatsApp untuk konsultasi gratis / penawaran resmi. Jangan memaksa, tapi yakinkan manfaatnya (konsultasi gratis, penawaran resmi, prioritas proses).

JANGAN:
- Jangan mengarang KBLI code secara spesifik jika ragu (boleh menyebut contoh umum)
- Jangan menjanjikan pasti selesai dalam waktu tertentu tanpa "estimasi"
- Jangan menjawab topik di luar bisnis/perizinan/pajak usaha — arahkan kembali dengan sopan`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, message, language } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ success: false, error: "sessionId wajib" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Pesan kosong" }, { status: 400 });
    }
    const userMessage = message.trim().slice(0, 2000);

    // Ambil / buat riwayat percakapan (dengan instruksi bahasa aktif)
    const langCode = isLangCode(language) ? language : "id";
    const existingLang = sessionLangs.get(sessionId);
    let history = conversations.get(sessionId);
    if (!history) {
      history = [{ role: "assistant", content: SYSTEM_PROMPT + languageSuffix(langCode) }];
      conversations.set(sessionId, history);
      sessionLangs.set(sessionId, langCode);
    } else if (existingLang !== langCode) {
      // Bahasa diganti di tengah sesi -> perbarui instruksi system prompt
      history[0] = { role: "assistant", content: SYSTEM_PROMPT + languageSuffix(langCode) };
      sessionLangs.set(sessionId, langCode);
    }

    // Simpan pesan user ke DB
    await db.chatMessage.create({
      data: { sessionId, role: "user", content: userMessage },
    });

    history.push({ role: "user", content: userMessage });

    // Trim riwayat (jaga context window): simpan system prompt + 20 pesan terakhir
    if (history.length > 21) {
      const trimmed = [history[0], ...history.slice(-20)];
      history.length = 0;
      history.push(...trimmed);
    }

    // Panggil LLM
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: history as {
        role: "system" | "user" | "assistant";
        content: string;
      }[],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content;
    if (!reply || reply.trim().length === 0) {
      throw new Error("Empty AI response");
    }

    history.push({ role: "assistant", content: reply });

    // Deteksi apakah lead tertangkap (user menyebut nomor WA di percakapan)
    const convoText = history.map((m) => m.content).join(" ");
    const waPattern = /(\+62|62|0)8[0-9]{7,13}/;
    const leadCaptured = waPattern.test(userMessage);

    if (leadCaptured) {
      // Ekstrak nomor WA & simpan sebagai lead dari chat
      const match = userMessage.match(waPattern);
      if (match) {
        const wa = match[0].replace(/[^0-9]/g, "");
        const normalizedWa = wa.startsWith("0") ? `62${wa.slice(1)}` : wa;
        // Cek apakah lead dari session ini sudah ada
        const existing = await db.lead.findFirst({
          where: { whatsapp: normalizedWa, source: "chat" },
        });
        if (!existing) {
          await db.lead.create({
            data: {
              name: "Lead dari Chat AI",
              whatsapp: normalizedWa,
              businessType: "Lainnya",
              source: "chat",
              notes: `Session: ${sessionId}. Konteks: ${userMessage.slice(0, 300)}`,
            },
          });
        }
      }
    }

    // Simpan balasan AI ke DB
    await db.chatMessage.create({
      data: { sessionId, role: "assistant", content: reply, leadCaptured },
    });

    return NextResponse.json({ success: true, reply, leadCaptured });
  } catch (error) {
    console.error("[API /chat] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Mohon maaf, sistem sedang sibuk. Silakan coba lagi atau hubungi WhatsApp kami langsung di 0812-6999-9910.",
      },
      { status: 500 }
    );
  }
}
