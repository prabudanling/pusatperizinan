"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Gift,
  Mail,
  MessageSquare,
  ShieldCheck,
  User2,
  Users,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/language-provider";

// ============================================================
// PUSATPERIZINAN.COM — Kursus Email Gratis 7 Hari
// Jalur konversi ke-5: lead nurturing engine
// ============================================================

const DAYS = [
  {
    n: 1,
    title: "NIB & OSS-RBA: Fondasi Legal Usaha",
    desc: "Bedah tuntas identitas usaha, level risiko, dan cara tidak salah langkah dari hari pertama.",
  },
  {
    n: 2,
    title: "PT, CV, atau Perorangan?",
    desc: "Kerangka keputusan memilih bentuk badan usaha paling menguntungkan untuk pajak & modal Anda.",
  },
  {
    n: 3,
    title: "KBLI & Level Risiko",
    desc: "Cara memilih kode KBLI yang membuka akses insentif & kredit, bukan membatasi usaha Anda.",
  },
  {
    n: 4,
    title: "Izin Sektoral per Industri",
    desc: "Checklist izin khusus: kuliner, konstruksi, kesehatan, logistik, hingga tambang.",
  },
  {
    n: 5,
    title: "Halal, BPOM & PIRT",
    desc: "Strategi sertifikasi produk agar boleh masuk ritel modern & marketplace besar.",
  },
  {
    n: 6,
    title: "Pajak Usaha Tanpa Drama",
    desc: "PPh Final 0,5%, PPN, NPWP & LKPM — kewajiban yang paling sering menghukum pemula.",
  },
  {
    n: 7,
    title: "Ekspansi: PMA, Arab Saudi & IATA",
    desc: "Peta jalan naik kelas: investor asing, buka usaha di Arab Saudi (MISA), dan biro perjalanan ber-IATA.",
  },
];

export function EmailCourse() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(1200);

  useEffect(() => {
    fetch("/api/subscribe")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.count) setCount(d.count);
      })
      .catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp }),
      });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
        toast({ title: "Berhasil bergabung!", description: data.message });
      } else {
        setError(data.error || "Terjadi kesalahan. Coba lagi.");
      }
    } catch {
      setError("Koneksi bermasalah. Coba lagi ya.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDone(false);
    setName("");
    setEmail("");
    setWhatsapp("");
  };

  return (
    <section
      id="kursus"
      className="relative overflow-hidden scroll-mt-20 bg-[oklch(0.23_0.03_165)] py-20 md:py-28"
      aria-label="Kursus email gratis perizinan"
    >
      {/* Dekorasi */}
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Kiri: pitch + kurikulum */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-bold text-amber-300">
              <GraduationCap className="h-3.5 w-3.5" />
              {t("courseBadge")}
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t("courseT1")}{" "}
              <span className="text-amber-400">{t("courseTHigh")}</span>
            </h2>
            <p className="mt-4 text-emerald-100/75 text-lg leading-relaxed">
              {t("courseSub")}
            </p>

            <ol className="mt-8 space-y-3.5">
              {DAYS.map((d, i) => (
                <motion.li
                  key={d.n}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-gold/15 border border-gold/30 text-amber-300 text-xs font-extrabold flex items-center justify-center">
                    {d.n}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{d.title}</p>
                    <p className="text-xs text-emerald-100/65 mt-0.5 leading-relaxed">{d.desc}</p>
                  </div>
                </motion.li>
              ))}
              <li className="flex items-start gap-3.5 rounded-xl border border-gold/30 bg-gold/10 p-3.5">
                <Gift className="h-8 w-8 shrink-0 text-amber-400" aria-hidden />
                <div>
                  <p className="text-sm font-bold text-amber-300">
                    Bonus Hari ke-8: Template Checklist 47 Izin per Sektor (PDF)
                  </p>
                  <p className="text-xs text-emerald-100/65 mt-0.5">
                    Panduan saku yang Anda bisa cetak & tempel di meja kerja.
                  </p>
                </div>
              </li>
            </ol>

            <p className="mt-7 flex items-center gap-2 text-sm text-emerald-100/70">
              <Users className="h-4.5 w-4.5 text-emerald-400 shrink-0" aria-hidden />
              <span>
                <strong className="text-white">{count.toLocaleString("id-ID")}+ pengusaha</strong> sudah bergabung & belajar setiap pagi
              </span>
            </p>
          </div>

          {/* Kanan: form pendaftaran */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-2xl">
            {done ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto" aria-hidden />
                <h3 className="mt-5 text-xl font-extrabold text-white">
                  {t("courseSuccessTitle")}
                </h3>
                <p className="mt-3 text-sm text-emerald-100/75 leading-relaxed">
                  Materi <strong className="text-white">Hari 1</strong> sedang meluncur ke{" "}
                  <strong className="text-white">{email}</strong>. Belum muncul dalam 5 menit?
                  Cek folder <em>spam</em> / <em>promosi</em> ya.
                </p>
                <Button
                  variant="secondary"
                  onClick={reset}
                  className="mt-6 rounded-full font-bold"
                >
                  Daftarkan Email Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {t("courseFormTitle")}
                  </h3>
                  <p className="text-xs text-emerald-100/60 mt-1">
                    {t("courseFormSub")}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="kursus-nama" className="text-emerald-100/80 text-xs font-semibold">
                    Nama Lengkap *
                  </Label>
                  <div className="relative">
                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-100/40" aria-hidden />
                    <Input
                      id="kursus-nama"
                      required
                      minLength={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="cth: Budi Santoso"
                      className="pl-9 bg-white/10 border-white/15 text-white placeholder:text-emerald-100/30 focus-visible:ring-gold/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="kursus-email" className="text-emerald-100/80 text-xs font-semibold">
                    Email Aktif *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-100/40" aria-hidden />
                    <Input
                      id="kursus-email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@perusahaan.com"
                      className="pl-9 bg-white/10 border-white/15 text-white placeholder:text-emerald-100/30 focus-visible:ring-gold/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="kursus-wa" className="text-emerald-100/80 text-xs font-semibold">
                    No. WhatsApp <span className="font-normal">(opsional — untuk checklist PDF)</span>
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-100/40" aria-hidden />
                    <Input
                      id="kursus-wa"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="0812xxxxxxx"
                      className="pl-9 bg-white/10 border-white/15 text-white placeholder:text-emerald-100/30 focus-visible:ring-gold/50"
                    />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="text-xs font-semibold text-red-300 bg-red-500/10 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-amber-400 text-emerald-950 font-extrabold hover:bg-amber-300 shadow-lg shadow-amber-400/25 h-11"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="h-4 w-4" aria-hidden />
                      Ikut Kursus Gratis — Mulai Hari Ini
                    </>
                  )}
                </Button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-100/50">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Email Anda aman. Tidak pernah spam — berhenti kapan saja dengan 1 klik.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
