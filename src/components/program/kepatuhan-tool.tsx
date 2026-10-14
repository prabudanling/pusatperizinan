"use client";

// ============================================================
// PUSATPERIZINAN.COM — Kalender Kepatuhan Interaktif
// Input: bentuk badan, skala, tanggal NIB, punya karyawan
// Output: jadwal kewajiban 12 bulan ke depan (LKPM, SPT, JAMSOSTEK)
// Aturan mengikuti BKPM 5/2024, DJP, UU 24/2011 — dengan disclaimer.
// ============================================================

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarClock, Info } from "lucide-react";

interface Obligation {
  due: string; // YYYY-MM-DD
  label: string;
  detail: string;
  kind: "LKPM" | "PAJAK" | "KEPEGAWAIAN";
}

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function fmt(d: Date): string {
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}
function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function KepatuhanTool() {
  const [bentuk, setBentuk] = useState("pt");
  const [skala, setSkala] = useState("mikro-kecil");
  const [nibDate, setNibDate] = useState("");
  const [karyawan, setKaryawan] = useState(true);
  const [shown, setShown] = useState(false);

  const obligations = useMemo<Obligation[]>(() => {
    if (!nibDate || !shown) return [];
    const start = new Date(nibDate + "T00:00:00+07:00");
    const now = new Date();
    const out: Obligation[] = [];

    // LKPM — BKPM 5/2024: mikro & kecil = 6 bulanan (tgl 20 Jul/Jan); menengah & besar = triwulanan (tgl 10 Apr/Jul/Okt/Jan)
    const lkpmDates: Date[] = [];
    if (skala === "menengah-besar") {
      for (const [m, day] of [[3, 10], [6, 10], [9, 10], [0, 10]] as [number, number][]) {
        for (let y = now.getFullYear(); y <= now.getFullYear() + 1; y++) {
          const d = new Date(y, m, day);
          if (d >= start) lkpmDates.push(d);
        }
      }
    } else {
      for (const [m, day] of [[6, 20], [0, 20]] as [number, number][]) {
        for (let y = now.getFullYear(); y <= now.getFullYear() + 1; y++) {
          const d = new Date(y, m, day);
          if (d >= start) lkpmDates.push(d);
        }
      }
    }
    lkpmDates
      .sort((a, b) => a.getTime() - b.getTime())
      .slice(0, skala === "menengah-besar" ? 4 : 2)
      .forEach((d) =>
        out.push({
          due: iso(d), kind: "LKPM",
          label: `LKPM ${skala === "menengah-besar" ? "Triwulanan" : "Semesteran"}`,
          detail: "Laporan Kegiatan Penanaman Modal via OSS-RBA. Telat = teguran → denda → NIB bisa dibekukan.",
        })
      );

    // SPT Tahunan — badan: 30 April; perseorangan: 31 Maret
    const isBadan = bentuk !== "perseorangan";
    for (let y = now.getFullYear(); y <= now.getFullYear() + 1; y++) {
      const d = new Date(y, isBadan ? 3 : 2, isBadan ? 30 : 31);
      if (d >= start && d.getTime() > now.getTime() - 200 * 864e5) {
        out.push({
          due: iso(d), kind: "PAJAK",
          label: isBadan ? `SPT Tahunan Badan (SPT Badan ${y - 1})` : `SPT Tahunan Orang Pribadi ${y - 1}`,
          detail: isBadan
            ? "Lapor ke DJP/Coretax. Sekaligus momen review: apakah PKP, PP 23, atau tarif normal paling efisien."
            : "Termasuk usaha Anda (PP 23/2018: PPh final 0,5% via e-Filing).",
        });
        break;
      }
    }

    // JAMSOSTEK 2A — bulanan tanggal 15
    if (karyawan) {
      for (let i = 1; i <= 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 15);
        out.push({
          due: iso(d), kind: "KEPEGAWAIAN",
          label: "JAMSOSTEK 2A (Bulanan)",
          detail: "Laporan & bayar kontribusi BPJS KT + Kesehatan bulan sebelumnya.",
        });
      }
    }

    // Review tahunan
    out.push({
      due: iso(new Date(start.getFullYear() + 1, start.getMonth(), start.getDate())),
      kind: "PAJAK",
      label: "Cek ulang legalitas tahunan",
      detail: "Review: status NIB aktif di OSS, LKPM terlunas, izin sektor belum perlu perpanjangan? Kami cek gratis.",
    });

    return out.sort((a, b) => a.due.localeCompare(b.due));
  }, [bentuk, skala, nibDate, karyawan, shown]);

  return (
    <div className="rounded-2xl border bg-card p-5 sm:p-8 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium">
          Bentuk usaha
          <select value={bentuk} onChange={(e) => setBentuk(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="pt">PT / Yayasan / Koperasi (badan hukum)</option>
            <option value="perseorangan">NIB Perseorangan / PT Perorangan</option>
          </select>
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          Skala usaha
          <select value={skala} onChange={(e) => setSkala(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="mikro-kecil">Mikro / Kecil (LKPM semesteran)</option>
            <option value="menengah-besar">Menengah / Besar (LKPM triwulanan)</option>
          </select>
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          Tanggal NIB terbit (perkiraan juga boleh)
          <input type="date" value={nibDate} onChange={(e) => setNibDate(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
        </label>
        <label className="flex items-end gap-2 text-sm font-medium pb-2">
          <input type="checkbox" checked={karyawan} onChange={(e) => setKaryawan(e.target.checked)} className="h-4 w-4 accent-emerald-600" />
          Punya karyawan (BPJS & JAMSOSTEK 2A)
        </label>
      </div>
      <Button size="lg" className="mt-5 w-full sm:w-auto" onClick={() => setShown(true)}>
        <CalendarClock className="mr-2 h-4 w-4" aria-hidden />
        Buat Kalender Kepatuhan Saya
      </Button>

      {shown && obligations.length > 0 && (
        <div className="mt-6" role="region" aria-label="Hasil kalender kepatuhan">
          <ol className="space-y-3">
            {obligations.map((o, i) => (
              <li key={i} className="flex gap-3 rounded-lg border p-3">
                <span className={`mt-0.5 h-fit rounded px-2 py-0.5 text-[11px] font-bold ${
                  o.kind === "LKPM" ? "bg-amber-100 text-amber-900" : o.kind === "PAJAK" ? "bg-sky-100 text-sky-900" : "bg-emerald-100 text-emerald-900"
                }`}>{o.kind}</span>
                <div>
                  <p className="text-sm font-semibold"><time dateTime={o.due}>{fmt(new Date(o.due + "T00:00:00+07:00"))}</time> — {o.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{o.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0" aria-hidden />
            Hasil ini panduan umum berdasar BKPM 5/2024, ketentuan DJP & UU 24/2011. Tenggat pasti bisa berbeda oleh KBLI, lokasi, dan status perusahaan Anda — konsultasi gratis kami memastikan kalender yang presisi.
          </p>
        </div>
      )}
    </div>
  );
}
