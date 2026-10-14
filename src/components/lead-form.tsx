"use client";

// ============================================================
// PUSATPERIZINAN.COM — LeadForm reusable
// Dipakai halaman program (mitra, korporat, bumdes, paket-usaha,
// kalender-kepatuhan, PMA). Payload konsisten dengan /api/leads.
// ============================================================

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  /** Sumber lead untuk pipeline admin — mis. "mitra", "bumdes", "pma-en" */
  source: string;
  /** Pilihan jenis usaha/kebutuhan (opsional) */
  needs?: { value: string; label: string }[];
  cta?: string;
  note?: string;
}

export function LeadForm({ source, needs, cta = "Kirim — Respons < 15 Menit", note }: LeadFormProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", whatsapp: "", need: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          whatsapp: form.whatsapp,
          businessType: form.need || "Lainnya",
          businessDesc: form.message,
          package: form.need || "Belum tahu",
          source,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setDone(true);
        toast({ title: "Berhasil! 🎉", description: json.message });
      } else {
        toast({ title: "Gagal kirim", description: json.error ?? "Coba lagi ya.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Jaringan bermasalah", description: "Silakan coba lagi atau chat WhatsApp kami.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden />
        <p className="mt-3 font-semibold text-emerald-900">Terima kasih, {form.name}!</p>
        <p className="mt-1 text-sm text-emerald-800">
          Tim senior kami akan menghubungi WhatsApp Anda dalam 1×24 jam (biasanya &lt; 15 menit di jam kerja).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" aria-label="Formulir permintaan konsultasi">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`${source}-name`}>Nama Lengkap *</Label>
          <Input
            id={`${source}-name`}
            required
            minLength={2}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="cth: Budi Santoso"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${source}-wa`}>No. WhatsApp *</Label>
          <Input
            id={`${source}-wa`}
            required
            type="tel"
            pattern="[0-9+ -]{8,17}"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            placeholder="cth: 0812 3456 7890"
          />
        </div>
      </div>

      {needs && needs.length > 0 && (
        <div className="space-y-1.5">
          <Label htmlFor={`${source}-need`}>Kebutuhan</Label>
          <select
            id={`${source}-need`}
            value={form.need}
            onChange={(e) => setForm({ ...form, need: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Pilih kebutuhan…</option>
            {needs.map((n) => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor={`${source}-msg`}>Ceritakan singkat kondisi Anda</Label>
        <Textarea
          id={`${source}-msg`}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="cth: Saya punya 3 cabang laundry, belum ada NIB, ingin legal penuh sebelum ajukan pinjaman bank…"
        />
      </div>

      <Button type="submit" size="lg" className="w-full text-base" disabled={loading}>
        <Send className="mr-2 h-4 w-4" aria-hidden />
        {loading ? "Mengirim…" : cta}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        {note ?? "Data Anda aman & tidak dibagikan ke pihak ketiga."}
      </p>
    </form>
  );
}
