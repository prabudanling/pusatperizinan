import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// POST /api/admin/seed — isi data demo terlabel "Demo*" (bisa dihapus 1-klik)
// DELETE /api/admin/seed — hapus SEMUA data demo
// Semua baris diberi prefix jelas agar tidak tercampur data asli.
// ============================================================

async function authed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

const DAY = 24 * 60 * 60 * 1000;
const now = () => Date.now();
const at = (daysAgo: number, hour = 9, min = 0) => {
  const d = new Date(now() - daysAgo * DAY);
  d.setHours(hour, min, 0, 0);
  return d;
};

const NAMA = [
  "Budi Santoso", "Siti Rahma", "Agus Wijaya", "Dewi Lestari", "Rizky Pratama",
  "Nurul Hidayah", "Bambang Sutrisno", "Maya Anggraini", "Hendra Gunawan", "Fitri Handayani",
  "Andi Saputra", "Ratna Sari", "Doni Firmansyah", "Lina Marlina", "Yusuf Hakim",
  "Sri Wahyuni", "Taufik Hidayat", "Indah Permata", "Eko Purnomo", "Melati Kusuma",
];
const USAHA = ["Kuliner", "Konstruksi", "Retail", "Logistik", "Digital", "Kesehatan", "Pariwisata", "Pendidikan"];
const PAKET = ["UMKM", "Bisnis", "Enterprise", "Belum tahu"];
const SOURCE = ["landing", "chat", "checker", "popup", "konsultasi"];
const STATUS = ["NEW", "NEW", "NEW", "CONTACTED", "CONTACTED", "CONSULTED", "CLOSED_WON", "CLOSED_LOST"];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const waDemo = () => `62812${String(Math.floor(Math.random() * 90000000) + 10000000)}`;

export async function POST(req: NextRequest) {
  if (!(await authed())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const existing = await db.lead.count({ where: { name: { startsWith: "Demo" } } });
    if (existing > 0) {
      return NextResponse.json({
        success: false,
        error: `Data demo sudah ada (${existing} baris). Hapus dulu bila ingin mengisi ulang.`,
      }, { status: 409 });
    }

    // ---- 42 leads tersebar 30 hari ----
    const leadsData = Array.from({ length: 42 }).map((_, i) => {
      const daysAgo = Math.floor((i / 42) * 30) + Math.floor(Math.random() * 2);
      const status = pick(STATUS);
      return {
        name: `Demo ${pick(NAMA)}`,
        whatsapp: waDemo(),
        email: null,
        businessType: pick(USAHA),
        businessDesc: "Usaha demo untuk menguji dashboard",
        package: pick(PAKET),
        source: pick(SOURCE),
        status,
        estimatedValue:
          status === "CLOSED_WON" ? pick([4_500_000, 7_500_000, 9_900_000, 12_000_000]) : pick([500_000, 1_500_000, 3_500_000, 4_500_000, 7_500_000]),
        notes: null,
        createdAt: at(daysAgo, 8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60)),
        updatedAt: at(daysAgo, 18),
      };
    });
    await db.lead.createMany({ data: leadsData });

    // ---- 9 konsultasi ----
    await db.consultation.createMany({
      data: Array.from({ length: 9 }).map((_, i) => ({
        leadId: null,
        name: `Demo ${pick(NAMA)}`,
        whatsapp: waDemo(),
        topic: pick(["Pendirian PT", "NIB & OSS", "Sertifikasi Halal", "BPOM", "Virtual Office", "PMA"]),
        preferredDate: `2026-11-${10 + i}`,
        preferredTime: pick(["pagi", "siang", "sore"]),
        method: pick(["WA", "Zoom", "Kantor"]),
        status: pick(["PENDING", "PENDING", "CONFIRMED", "DONE"]),
        createdAt: at(i * 2 + 1, 10),
        updatedAt: at(i * 2 + 1, 10),
      })),
    });

    // ---- 6 sesi chat × 5 pesan ----
    for (let s = 0; s < 6; s++) {
      const sessionId = `demo-session-${s + 1}`;
      const tanya = pick([
        "Berapa biaya pendirian PT lengkap?",
        "Virtual office SCBD bisa untuk PKP?",
        "Apakah NIB bisa dibuat 1 hari?",
        "Syarat BPOM untuk minuman kemasan apa saja?",
        "Bisa bantu izin halal untuk produk kosmetik?",
        "Saya warga asing, mau buka PT PMA, bagaimana prosesnya?",
      ]);
      const base = at(s * 4 + 2, 11);
      const rows = [
        { sessionId, role: "user", content: tanya, leadCaptured: false, createdAt: base },
        { sessionId, role: "assistant", content: "Halo! Terima kasih pertanyaannya 🙂 Berikut penjelasan singkat beserta estimasi biaya dan waktunya…", leadCaptured: false, createdAt: new Date(base.getTime() + 60_000) },
        { sessionId, role: "user", content: "Kalau dibantu urus sampai beres, berapa lama?", leadCaptured: false, createdAt: new Date(base.getTime() + 120_000) },
        { sessionId, role: "assistant", content: "Saya hubungkan dengan tim ahli ya. Boleh saya tahu nomor WhatsApp Anda agar bisa dihubungi hari ini juga?", leadCaptured: true, createdAt: new Date(base.getTime() + 180_000) },
        { sessionId, role: "user", content: `Boleh, ini nomor saya ${waDemo()}`, leadCaptured: true, createdAt: new Date(base.getTime() + 240_000) },
      ];
      await db.chatMessage.createMany({ data: rows });
    }

    // ---- 14 license checks ----
    await db.licenseCheck.createMany({
      data: Array.from({ length: 14 }).map((_, i) => ({
        businessInput: `Demo: ${pick(["kedai kopi", "jasa konstruksi", "toko online fashion", "klinik kecantikan", "biro perjalanan umroh", "pabrik kerupuk", "startup edukasi", "agen ekspor impor"])}`,
        sector: pick(USAHA),
        location: pick(["Jakarta Selatan", "Bandung", "Surabaya", "Tangerang", "Bali", "Medan"]),
        scale: pick(["mikro", "kecil", "menengah"]),
        result: JSON.stringify({ izin: ["NIB", "Sertifikat Standar", "PIRT/BPOM"], catatan: "Hasil demo AI checker" }),
        whatsapp: i % 3 === 0 ? waDemo() : null,
        createdAt: at(Math.floor((i / 14) * 30), 13),
      })),
    });

    // ---- 10 document checks ----
    await db.documentCheck.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        fileName: `demo-scan-${i + 1}.jpg`,
        docCategory: pick(["npwp", "nib", "ktp", "sertifikat-standar", "izin-edar"]),
        fileType: "image/jpeg",
        fileSize: 120_000 + i * 10_000,
        result: JSON.stringify({ kualitas: "cukup", temuan: ["Demo temuan otomatis"], saran: ["Lengkapi kolom alamat"] }),
        whatsapp: i % 2 === 0 ? waDemo() : null,
        status: pick(["NEW", "NEW", "FOLLOWED_UP", "CONVERTED"]),
        createdAt: at(Math.floor((i / 10) * 30), 15),
      })),
    });

    // ---- 16 subscribers ----
    await db.subscriber.createMany({
      data: Array.from({ length: 16 }).map((_, i) => ({
        name: `Demo ${pick(NAMA)}`,
        email: `demo.user${i + 1}@example.com`,
        whatsapp: i % 4 === 0 ? waDemo() : null,
        source: pick(["email-course", "blog", "popup"]),
        createdAt: at(Math.floor((i / 16) * 30), 12),
      })),
    });

    // ---- 6 testimoni (published) ----
    await db.testimonial.createMany({
      data: Array.from({ length: 6 }).map((_, i) => ({
        name: `Demo ${pick(NAMA)}`,
        company: `Demo Usaha ${i + 1}`,
        role: pick(["Founder", "Owner", "Direktur"]),
        content: pick([
          "Proses NIB saya selesai benar-benar sehari. Timnya responsif banget di WhatsApp.",
          "Virtual office SCBD-nya membantu saya buka PT tanpa harus sewa kantor mahal.",
          "Sertifikasi halal selesai tanpa saya pusing urus dokumen. Recommended!",
          "Dari cek izin sampai turun NIB semua dibantu. Garansinya juga jelas.",
        ]),
        rating: 5,
        avatarSeed: `demo-${i}`,
        published: i % 4 !== 3,
        createdAt: at(i * 3 + 1, 16),
      })),
    });

    // ---- 5 roadmap ----
    await db.roadmapRequest.createMany({
      data: Array.from({ length: 5 }).map((_, i) => ({
        name: `Demo ${pick(NAMA)}`,
        whatsapp: waDemo(),
        businessField: pick(["kuliner", "fashion", "konstruksi", "pendidikan"]),
        province: pick(["DKI Jakarta", "Jawa Barat", "Jawa Timur", "Bali"]),
        scale: pick(["individu", "umkm", "perusahaan"]),
        capital: pick(["<10jt", "10-50jt", "50-500jt"]),
        createdAt: at(i * 5 + 2, 17),
      })),
    });

    const total =
      42 + 9 + 30 + 14 + 10 + 16 + 6 + 5;
    return NextResponse.json({ success: true, data: { inserted: total } });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal mengisi data demo" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  if (!(await authed())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const [leads, consults, chats, checks, docs, subs, testi, road] = await Promise.all([
      db.lead.deleteMany({ where: { name: { startsWith: "Demo" } } }),
      db.consultation.deleteMany({ where: { name: { startsWith: "Demo" } } }),
      db.chatMessage.deleteMany({ where: { sessionId: { startsWith: "demo-" } } }),
      db.licenseCheck.deleteMany({ where: { businessInput: { startsWith: "Demo:" } } }),
      db.documentCheck.deleteMany({ where: { fileName: { startsWith: "demo-" } } }),
      db.subscriber.deleteMany({ where: { name: { startsWith: "Demo" } } }),
      db.testimonial.deleteMany({ where: { name: { startsWith: "Demo" } } }),
      db.roadmapRequest.deleteMany({ where: { name: { startsWith: "Demo" } } }),
    ]);
    const removed = [leads, consults, chats, checks, docs, subs, testi, road]
      .reduce<number>((a, r) => a + r.count, 0);
    return NextResponse.json({ success: true, data: { removed } });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal menghapus data demo" },
      { status: 500 }
    );
  }
}
