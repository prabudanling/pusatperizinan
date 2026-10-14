"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Coins,
  Loader2,
  MapPin,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  TriangleAlert,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROVINCES } from "@/lib/coverage-data";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

// ============================================================
// Tipe data roadmap (sinkron dengan /api/roadmap)
// ============================================================

interface RoadmapResult {
  summary: string;
  kbliSuggestion: { code: string; title: string }[];
  phases: {
    phase: string;
    month: string;
    items: { izin: string; biaya: string; durasi: string; kenapa: string }[];
  }[];
  totalCostMin: number;
  totalCostMax: number;
  risks: string[];
  nextSteps: string[];
}

const SCALES = [
  { value: "individu", label: "Individu / Freelancer", desc: "Solo, tanpa karyawan", icon: User },
  { value: "umkm", label: "UMKM", desc: "Usaha kecil-menengah, 1-20 orang", icon: Store },
  { value: "perusahaan", label: "Perusahaan", desc: "Badan usaha, tim besar", icon: Building2 },
];

const CAPITALS = [
  { value: "< 10 juta", label: "< Rp10 juta" },
  { value: "10 - 50 juta", label: "Rp10-50 juta" },
  { value: "50 - 500 juta", label: "Rp50-500 juta" },
  { value: "> 500 juta", label: "> Rp500 juta" },
];

const PLANS = [
  "Jualan online (marketplace/website)",
  "Toko fisik / kantor",
  "Produksi / pabrik",
  "Ekspor / impor",
  "Ikut tender pemerintah",
];

function formatRupiah(n: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export function RoadmapWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResult | null>(null);

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [businessField, setBusinessField] = useState("");
  const [province, setProvince] = useState("DKI Jakarta");
  const [scale, setScale] = useState("umkm");
  const [capital, setCapital] = useState("10 - 50 juta");
  const [plan, setPlan] = useState("");

  const canNext = (): boolean => {
    if (step === 1) return businessField.trim().length >= 3;
    if (step === 2) return province.length > 0;
    if (step === 3) return scale.length > 0;
    if (step === 4) return capital.length > 0;
    if (step === 5) return name.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 9;
    return true;
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, businessField, province, scale, capital, plan }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Terjadi kesalahan. Coba lagi.");
      } else {
        setRoadmap(json.roadmap);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError("Koneksi bermasalah. Coba lagi atau chat WhatsApp kami langsung.");
    } finally {
      setLoading(false);
    }
  };

  // ================== HASIL ==================
  if (roadmap) {
    const waText = encodeURIComponent(
      `Halo PusatPerizinan.com! Saya ${name} (${whatsapp}). Saya baru generate AI Roadmap untuk usaha ${businessField} di ${province}. Mohon dibantu pendampingan implementasinya ya! 🙏`
    );
    return (
      <div className="space-y-8">
        {/* Header hasil */}
        <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-gold/5 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden /> Roadmap Personal Anda
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Roadmap Perizinan {businessField}</h2>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{roadmap.summary}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Estimasi total biaya</p>
              <p className="mt-1 text-lg font-extrabold text-primary leading-snug">
                {formatRupiah(roadmap.totalCostMin)}
                <span className="text-xs font-medium text-muted-foreground"> – </span>
                {formatRupiah(roadmap.totalCostMax)}
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Lokasi & skala</p>
              <p className="mt-1 text-sm font-bold leading-snug">{province} · {SCALES.find((s) => s.value === scale)?.label}</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Modal awal Anda</p>
              <p className="mt-1 text-sm font-bold leading-snug">{capital}</p>
            </div>
          </div>

          {roadmap.kbliSuggestion?.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">KBLI yang direkomendasikan AI</p>
              <div className="flex flex-wrap gap-2">
                {roadmap.kbliSuggestion.map((k) => (
                  <Link
                    key={k.code}
                    href={`/kbli?cari=${k.code}`}
                    className="group inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                  >
                    <Badge variant="outline" className="font-mono text-[10px] px-1.5 py-0">{k.code}</Badge>
                    {k.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fases */}
        <div>
          <h3 className="flex items-center gap-2 text-xl font-bold mb-5">
            <CalendarClock className="h-5 w-5 text-primary" aria-hidden />
            Timeline 12 Bulan
          </h3>
          <div className="space-y-5">
            {roadmap.phases.map((phase, pi) => (
              <div key={pi} className="rounded-2xl border bg-card overflow-hidden">
                <div className="flex items-center justify-between gap-3 bg-primary/5 border-b px-5 py-3.5">
                  <h4 className="font-bold text-[15px]">{phase.phase}</h4>
                  <Badge variant="secondary" className="shrink-0">{phase.month}</Badge>
                </div>
                <div className="p-4 space-y-3">
                  {phase.items.map((item, ii) => (
                    <div key={ii} className="rounded-xl border border-border/60 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-semibold text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden />
                          {item.izin}
                        </h5>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-[10px]"><Coins className="h-2.5 w-2.5 mr-0.5" aria-hidden />{item.biaya}</Badge>
                          <Badge variant="outline" className="text-[10px]"><Clock className="h-2.5 w-2.5 mr-0.5" aria-hidden />{item.durasi}</Badge>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.kenapa}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risiko + next steps */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20 p-5">
            <h3 className="flex items-center gap-2 font-bold text-red-900 dark:text-red-300 mb-3">
              <TriangleAlert className="h-4.5 w-4.5" aria-hidden /> Risiko Kalau Dilewati
            </h3>
            <ul className="space-y-2">
              {roadmap.risks.map((r, i) => (
                <li key={i} className="text-sm text-red-900/80 dark:text-red-300/80 leading-relaxed flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20 p-5">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 mb-3">
              <Target className="h-4.5 w-4.5" aria-hidden /> Langkah Berikutnya
            </h3>
            <ol className="space-y-2">
              {roadmap.nextSteps.map((s, i) => (
                <li key={i} className="text-sm text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed flex gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white mt-0.5">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[oklch(0.23_0.03_165)] p-6 md:p-8 text-center text-emerald-50">
          <Rocket className="h-8 w-8 text-emerald-400 mx-auto mb-3" aria-hidden />
          <h3 className="text-xl font-bold text-white">Siap jalankan roadmap ini? Kami yang urus semuanya.</h3>
          <p className="mt-2 text-sm text-emerald-100/80 max-w-xl mx-auto">
            Kirim roadmap ini ke konsultan kami — tim PusatPerizinan.com (1.247+ klien, rating 4,9/5) akan memberikan penawaran lengkap tanpa komitmen.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:shadow-lg min-h-[44px]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden />
              Kirim ke Konsultan via WhatsApp
            </a>
            <button
              type="button"
              onClick={() => { setRoadmap(null); setStep(1); }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-emerald-50 transition-all hover:bg-white/10 min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Buat Roadmap Lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================== LOADING ==================
  if (loading) {
    return (
      <div className="rounded-2xl border bg-card p-10 md:p-16 text-center">
        <div className="relative inline-flex items-center justify-center mb-6">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" aria-hidden />
          <Bot className="h-14 w-14 text-primary" aria-hidden />
        </div>
        <h2 className="text-xl font-bold">AI sedang menyusun roadmap Anda…</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Menganalisis bidang usaha <strong className="text-foreground">{businessField}</strong> di {province} — mencocokkan regulasi OSS-RBA, pajak, dan sertifikasi. Biasanya 15-40 detik.
        </p>
        <div className="mt-6 space-y-2 max-w-sm mx-auto">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-3 rounded-full bg-muted animate-pulse" style={{ animationDelay: `${i * 200}ms`, width: `${100 - i * 15}%` }} />
          ))}
        </div>
      </div>
    );
  }

  // ================== WIZARD ==================
  return (
    <div className="rounded-2xl border-2 border-primary/15 bg-card p-6 md:p-8 shadow-sm">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-7">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex-1">
            <div className={cn("h-1.5 rounded-full transition-all", s <= step ? "bg-primary" : "bg-muted")} />
            <p className={cn("mt-1.5 text-[10px] font-semibold", s <= step ? "text-primary" : "text-muted-foreground")}>
              {s === 1 ? "Usaha" : s === 2 ? "Lokasi" : s === 3 ? "Skala" : s === 4 ? "Modal" : "Kontak"}
            </p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-1">Bidang usaha apa yang Anda jalankan?</h2>
          <p className="text-sm text-muted-foreground mb-5">Tulis bebas — AI akan cocokkan dengan KBLI & regulasi yang tepat.</p>
          <Label htmlFor="biz" className="sr-only">Bidang usaha</Label>
          <Input
            id="biz"
            value={businessField}
            onChange={(e) => setBusinessField(e.target.value)}
            placeholder="mis. Kafe kopi, toko online skincare, konstruksi, pabrik packaging…"
            className="text-base py-3.5"
            autoFocus
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {["Kafe kopi", "Toko online", "Restoran", "Konstruksi", "Pabrik makanan", "Salon kecantikan"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setBusinessField(ex)}
                className="rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium transition-all hover:border-primary hover:text-primary"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" aria-hidden /> Lokasi usaha Anda?</h2>
          <p className="text-sm text-muted-foreground mb-5">Tiap provinsi punya kecepatan & kekhasan perizinan daerah yang berbeda.</p>
          <Label htmlFor="prov" className="sr-only">Provinsi</Label>
          <select
            id="prov"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
          >
            {PROVINCES.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><Store className="h-5 w-5 text-primary" aria-hidden /> Skala usaha Anda?</h2>
          <p className="text-sm text-muted-foreground mb-5">Menentukan bentuk badan usaha & rezim pajak yang optimal.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {SCALES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setScale(s.value)}
                className={cn(
                  "rounded-xl border-2 p-4 text-left transition-all",
                  scale === s.value ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                )}
              >
                <s.icon className={cn("h-6 w-6 mb-2", scale === s.value ? "text-primary" : "text-muted-foreground")} aria-hidden />
                <p className="font-bold text-sm">{s.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><Coins className="h-5 w-5 text-primary" aria-hidden /> Modal awal yang disiapkan?</h2>
          <p className="text-sm text-muted-foreground mb-5">Membantu AI menyesuaikan urutan & opsi yang paling hemat.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {CAPITALS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCapital(c.value)}
                className={cn(
                  "rounded-xl border-2 px-4 py-3.5 text-sm font-semibold text-left transition-all min-h-[44px]",
                  capital === c.value ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-primary/40"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <Label className="text-sm font-semibold">Rencana tambahan (opsional)</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PLANS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(plan === p ? "" : p)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    plan === p ? "border-primary bg-primary/5 text-primary" : "bg-card hover:border-primary/40"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><User className="h-5 w-5 text-primary" aria-hidden /> Ke mana roadmap dikirim?</h2>
          <p className="text-sm text-muted-foreground mb-5">Kami kirim hasilnya ke WhatsApp Anda + tawarkan pendampingan (opsional).</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="nm" className="text-sm font-semibold">Nama Anda</Label>
              <Input id="nm" value={name} onChange={(e) => setName(e.target.value)} placeholder="mis. Budi Santoso" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="wa" className="text-sm font-semibold">Nomor WhatsApp</Label>
              <Input id="wa" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="0812xxxxxxx" className="mt-1.5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden />
            Data Anda aman & tidak dibagikan. Hanya untuk mengirim roadmap dan follow-up konsultasi.
          </p>
          {error && (
            <p className="mt-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-3 text-sm text-red-800 dark:text-red-300">
              {error}
            </p>
          )}
        </div>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4 mr-1" aria-hidden /> Kembali
        </Button>
        {step < 5 ? (
          <Button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext()}
            className="min-h-[44px] px-6"
          >
            Lanjut <ArrowRight className="h-4 w-4 ml-1" aria-hidden />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={submit}
            disabled={!canNext() || loading}
            className="min-h-[44px] px-6 bg-gold text-gold-foreground hover:bg-gold/90"
          >
            {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4 mr-1" aria-hidden />}
            Generate Roadmap AI
          </Button>
        )}
      </div>
    </div>
  );
}
