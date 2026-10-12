"use client";

import { useMemo, useState } from "react";
import { Calculator, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ============================================================
// RUMUS RESMI (UU HPP, PP 55/2022, PMK 168/2023, PMK 131/2024)
// ============================================================

function formatRupiah(n: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Math.round(n));
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(Math.round(n));
}

/** PTKP sesuai UU PPh: diri 54jt + kawin 4,5jt + tanggungan (maks 3) × 4,5jt */
function hitungPTKP(statusKawin: boolean, tanggungan: number): number {
  const tanggunganValid = Math.min(Math.max(0, tanggungan), 3);
  return 54_000_000 + (statusKawin ? 4_500_000 : 0) + tanggunganValid * 4_500_000;
}

/** Tarif progresif PPh Orang Pribadi (UU HPP Pasal 17) */
function hitungPphProgresif(pkp: number): number {
  if (pkp <= 0) return 0;
  let pph = 0;
  let sisa = pkp;
  const brackets: { limit: number; rate: number }[] = [
    { limit: 60_000_000, rate: 0.05 },
    { limit: 190_000_000, rate: 0.15 }, // 60jt-250jt
    { limit: 250_000_000, rate: 0.25 }, // 250jt-500jt
    { limit: 4_500_000_000, rate: 0.3 }, // 500jt-5M
    { limit: Infinity, rate: 0.35 }, // >5M
  ];
  for (const b of brackets) {
    const terkena = Math.min(sisa, b.limit);
    if (terkena <= 0) break;
    pph += terkena * b.rate;
    sisa -= terkena;
  }
  return pph;
}

// ------------------------------------------------------------
// TAB 1: PPh 21 Karyawan (metode tahunan ≈ TER bulanan)
// ------------------------------------------------------------

function Pph21Calculator() {
  const [gaji, setGaji] = useState("10000000");
  const [statusKawin, setStatusKawin] = useState(false);
  const [tanggungan, setTanggungan] = useState("0");
  const [iuran, setIuran] = useState("200000");

  const result = useMemo(() => {
    const gajiBulanan = parseFloat(gaji) || 0;
    const iuranBulanan = parseFloat(iuran) || 0;
    const brutoTahun = gajiBulanan * 12;
    const biayaJabatan = Math.min(brutoTahun * 0.05, 6_000_000);
    const iuranTahun = iuranBulanan * 12;
    const netoTahun = brutoTahun - biayaJabatan - iuranTahun;
    const ptkp = hitungPTKP(statusKawin, parseInt(tanggungan) || 0);
    const pkp = Math.max(0, Math.floor((netoTahun - ptkp) / 1000) * 1000);
    const pphTahun = hitungPphProgresif(pkp);
    const pphBulanan = pphTahun / 12;
    const netoBulanan = gajiBulanan - pphBulanan - iuranBulanan;
    const tarifEfektif = gajiBulanan > 0 ? (pphBulanan / gajiBulanan) * 100 : 0;
    return { brutoTahun, biayaJabatan, iuranTahun, netoTahun, ptkp, pkp, pphTahun, pphBulanan, netoBulanan, tarifEfektif };
  }, [gaji, statusKawin, tanggungan, iuran]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="gaji" className="text-sm font-semibold">Gaji Bruto per Bulan (Rp)</Label>
          <Input id="gaji" type="number" min="0" value={gaji} onChange={(e) => setGaji(e.target.value)} className="mt-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">Termasuk tunjangan tetap: gaji pokok + tunjangan jabatan/transport yang tetap.</p>
        </div>
        <div>
          <Label className="text-sm font-semibold">Status PTKP</Label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setStatusKawin(false)}
              className={cn("rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px]", !statusKawin ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-primary/40")}
            >
              Tidak Kawin (TK)
            </button>
            <button
              type="button"
              onClick={() => setStatusKawin(true)}
              className={cn("rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px]", statusKawin ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-primary/40")}
            >
              Kawin (K)
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="tanggungan" className="text-sm font-semibold">Tanggungan (maks 3)</Label>
          <Input id="tanggungan" type="number" min="0" max="3" value={tanggungan} onChange={(e) => setTanggungan(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="iuran" className="text-sm font-semibold">Iuran Pensiun/BPJS KT dibayar karyawan (Rp/bln)</Label>
          <Input id="iuran" type="number" min="0" value={iuran} onChange={(e) => setIuran(e.target.value)} className="mt-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">Umumnya 2% gaji (JHT) + 1% pensiun bila ada — pengurang pajak yang sah.</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 space-y-3">
        <h3 className="font-bold flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" aria-hidden /> Hasil Hitungan</h3>
        <dl className="space-y-2 text-sm">
          <Row label="Bruto setahun" value={formatRupiah(result.brutoTahun)} />
          <Row label="Biaya jabatan (5%, maks 6 jt)" value={`− ${formatRupiah(result.biayaJabatan)}`} />
          <Row label="Iuran pensiun setahun" value={`− ${formatRupiah(result.iuranTahun ?? 0)}`} />
          <Row label="Neto setahun" value={formatRupiah(result.netoTahun)} bold />
          <Row label="PTKP Anda" value={`− ${formatRupiah(result.ptkp)}`} />
          <Row label="PKP (Penghasilan Kena Pajak)" value={formatRupiah(result.pkp)} bold />
          <div className="h-px bg-border" />
          <Row label="PPh 21 setahun" value={formatRupiah(result.pphTahun)} bold />
          <Row label="PPh 21 per bulan (dipotong)" value={formatRupiah(result.pphBulanan)} highlight />
          <Row label="Tarif efektif" value={`${result.tarifEfektif.toFixed(2)}% dari gaji`} />
          <div className="h-px bg-border" />
          <Row label="Gaji bersih per bulan" value={formatRupiah(result.netoBulanan)} highlight />
        </dl>
        <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden />
          <p>
            Metode TER (PMK 168/2023) memastikan total potongan setahun = hitungan tahunan ini. UMP gaji dasar ≤ Rp10 juta dipotong 0% — cek kelayakan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold, highlight }: { label: string; value: string; bold?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={cn("text-muted-foreground", bold && "font-semibold text-foreground")}>{label}</dt>
      <dd className={cn("text-right tabular-nums", highlight ? "text-lg font-extrabold text-primary" : bold ? "font-bold text-foreground" : "text-foreground/90")}>
        {value}
      </dd>
    </div>
  );
}

// ------------------------------------------------------------
// TAB 2: PPh Final 0,5% UMKM
// ------------------------------------------------------------

function UmkmCalculator() {
  const [omzet, setOmzet] = useState("50000000");
  const [badanUsaha, setBadanUsaha] = useState<"op" | "badan">("op");

  const result = useMemo(() => {
    const omzetBulan = parseFloat(omzet) || 0;
    const omzetTahun = omzetBulan * 12;
    const pphBulan = omzetBulan * 0.005;
    const pphTahun = omzetTahun * 0.005;
    const melewatiBatas = omzetTahun > 4_800_000_000;
    const sisaKuota = Math.max(0, 4_800_000_000 - omzetTahun);
    const kelayakan = omzetTahun <= 4_800_000_000 && (badanUsaha === "op" || true); // badan s/d TA 2025
    return { omzetBulan, omzetTahun, pphBulan, pphTahun, melewatiBatas, sisaKuota, kelayakan };
  }, [omzet, badanUsaha]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="omzet" className="text-sm font-semibold">Omzet per Bulan (Rp)</Label>
          <Input id="omzet" type="number" min="0" value={omzet} onChange={(e) => setOmzet(e.target.value)} className="mt-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">Total penjualan kotor — termasuk semua channel (offline + online).</p>
        </div>
        <div>
          <Label className="text-sm font-semibold">Status Usaha</Label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setBadanUsaha("op")}
              className={cn("rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px]", badanUsaha === "op" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-primary/40")}
            >
              Orang Pribadi
            </button>
            <button
              type="button"
              onClick={() => setBadanUsaha("badan")}
              className={cn("rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px]", badanUsaha === "badan" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-primary/40")}
            >
              Badan Usaha
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            PPh final 0,5%: orang pribadi sampai 2028, badan sampai TA 2025 (PP 55/2022 & UU HPP).
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 space-y-3">
        <h3 className="font-bold flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" aria-hidden /> Hasil Hitungan</h3>
        <dl className="space-y-2 text-sm">
          <Row label="Omzet setahun (proyeksi)" value={formatRupiah(result.omzetTahun)} />
          <Row label="PPh Final 0,5% per bulan" value={formatRupiah(result.pphBulan)} highlight />
          <Row label="PPh Final setahun" value={formatRupiah(result.pphTahun)} />
          <Row label="Tarif efektif" value="0,5% dari omzet" />
          <div className="h-px bg-border" />
          <div className="flex items-start justify-between gap-3">
            <dt className="text-muted-foreground">Status kuota Rp4,8 M</dt>
            <dd>
              <Badge className={result.melewatiBatas ? "bg-red-100 text-red-800 border border-red-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"}>
                {result.melewatiBatas ? "Melewati batas" : `Sisa kuota ${formatNumber(result.sisaKuota / 1_000_000)} jt`}
              </Badge>
            </dd>
          </div>
        </dl>
        <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden />
          <p>
            {result.melewatiBatas
              ? "Omzet melewati Rp4,8 M — Anda wajib transisi ke rezim umum + pengukuhan PKP (faktur pajak). Kami bantu restrukturisasi tanpa drama."
              : "Anda masih layak 0,5%. Bandingkan: bila margin usaha Anda rendah & banyak biaya, rezim umum dengan pengurang bisa lebih hemat — konsultasikan gratis."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// TAB 3: PPN
// ------------------------------------------------------------

function PpnCalculator() {
  const [harga, setHarga] = useState("1000000");
  const [ppnInclude, setPpnInclude] = useState<"exclude" | "include">("exclude");

  const result = useMemo(() => {
    const nilai = parseFloat(harga) || 0;
    // PMK 131/2024: tarif 12% untuk barang mewah dengan DPP nilai lain 11/12 → efektif 11%
    const tarifEfektif = 11;
    const ppn = ppnInclude === "exclude" ? nilai * 0.11 : nilai - nilai * (100 / 111);
    const dpp = nilai - (ppnInclude === "include" ? ppn : 0);
    return { nilai, ppn, dpp, tarifEfektif, total: dpp + ppn };
  }, [harga, ppnInclude]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="harga-ppn" className="text-sm font-semibold">Nilai Transaksi (Rp)</Label>
          <Input id="harga-ppn" type="number" min="0" value={harga} onChange={(e) => setHarga(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-sm font-semibold">Cara Pencantuman Harga</Label>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPpnInclude("exclude")}
              className={cn("rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px]", ppnInclude === "exclude" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-primary/40")}
            >
              Belum termasuk PPN
            </button>
            <button
              type="button"
              onClick={() => setPpnInclude("include")}
              className={cn("rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all min-h-[44px]", ppnInclude === "include" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:border-primary/40")}
            >
              Sudah termasuk PPN
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-muted/60 p-4 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Catatan PPN 2025:</strong> Tarif nominal naik menjadi 12%, namun hanya untuk barang mewah — dengan DPP Nilai Lain 11/12 sehingga beban efektif tetap 11%. Untuk barang/jasa umum, tarif efektif tetap 11% (PMK 131/2024).
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 space-y-3">
        <h3 className="font-bold flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" aria-hidden /> Hasil Hitungan</h3>
        <dl className="space-y-2 text-sm">
          <Row label="DPP (Dasar Pengenaan Pajak)" value={formatRupiah(result.dpp)} />
          <Row label="PPN terutang" value={formatRupiah(result.ppn)} highlight />
          <Row label="Total yang harus dibayar" value={formatRupiah(result.total)} bold />
          <Row label="Tarif efektif" value={`${result.tarifEfektif}%`} />
        </dl>
        <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden />
          <p>Pengusaha PKP wajib terbit faktur pajak untuk setiap penjualan B2B & kirim SPT Masa PPN paling lambat tanggal 20 bulan berikutnya. Bukan PKP? Anda tidak boleh mencantumkan PPN di invoice.</p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// TAB 4: Jual-Beli Properti
// ------------------------------------------------------------

function PropertiCalculator() {
  const [harga, setHarga] = useState("800000000");
  const [njop, setNjop] = useState("500000000");
  const [npoptkp, setNpoptkp] = useState("80000000");

  const result = useMemo(() => {
    const hargaTransaksi = parseFloat(harga) || 0;
    const njopTanah = parseFloat(njop) || 0;
    const npoptkpNilai = parseFloat(npoptkp) || 0;
    const npop = Math.max(hargaTransaksi, njopTanah);
    const pphPenjual = hargaTransaksi * 0.025; // PPh final pengalihan hak
    const dppBphtb = Math.max(0, npop - npoptkpNilai);
    const bphtbPembeli = dppBphtb * 0.05;
    return { hargaTransaksi, njopTanah, npop, pphPenjual, dppBphtb, bphtbPembeli, totalBeban: pphPenjual + bphtbPembeli };
  }, [harga, njop, npoptkp]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="harga-prop" className="text-sm font-semibold">Harga Transaksi (Rp)</Label>
          <Input id="harga-prop" type="number" min="0" value={harga} onChange={(e) => setHarga(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="njop" className="text-sm font-semibold">NJOP / Nilai Pasar (Rp)</Label>
          <Input id="njop" type="number" min="0" value={njop} onChange={(e) => setNjop(e.target.value)} className="mt-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">Dasar pajak = yang lebih tinggi antara harga transaksi dan NJOP.</p>
        </div>
        <div>
          <Label htmlFor="npoptkp" className="text-sm font-semibold">NPOPTKP (Rp)</Label>
          <Input id="npoptkp" type="number" min="0" value={npoptkp} onChange={(e) => setNpoptkp(e.target.value)} className="mt-1.5" />
          <p className="mt-1 text-xs text-muted-foreground">Pengurangan BPHTB daerah — umumnya Rp80-120 juta untuk rumah pertama (cek aturan daerah Anda).</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 space-y-3">
        <h3 className="font-bold flex items-center gap-2"><Calculator className="h-4 w-4 text-primary" aria-hidden /> Hasil Hitungan</h3>
        <dl className="space-y-2 text-sm">
          <Row label="NPOP (dasar pajak)" value={formatRupiah(result.npop)} />
          <div className="h-px bg-border" />
          <Row label="PPh Final 2,5% — dibayar PENJUAL" value={formatRupiah(result.pphPenjual)} highlight />
          <Row label="DPP BPHTB (NPOP − NPOPTKP)" value={formatRupiah(result.dppBphtb)} />
          <Row label="BPHTB 5% — dibayar PEMBELI" value={formatRupiah(result.bphtbPembeli)} highlight />
          <div className="h-px bg-border" />
          <Row label="Total beban pajak transaksi" value={formatRupiah(result.totalBeban)} bold />
        </dl>
        <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden />
          <p>PPh final ditanggung penjual (Pasal 4 ayat 2), BPHTB ditanggung pembeli — keduanya wajib dibayar sebelum balik nama (PPAT). Harga di bawah pasar bisa dinilai ulang fiskal!</p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------

export function TaxCalculator() {
  return (
    <Tabs defaultValue="pph21" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 mb-8">
        <TabsTrigger value="pph21" className="text-xs lg:text-sm py-2.5">PPh 21 Karyawan</TabsTrigger>
        <TabsTrigger value="umkm" className="text-xs lg:text-sm py-2.5">UMKM 0,5%</TabsTrigger>
        <TabsTrigger value="ppn" className="text-xs lg:text-sm py-2.5">PPN</TabsTrigger>
        <TabsTrigger value="properti" className="text-xs lg:text-sm py-2.5">Jual-Beli Properti</TabsTrigger>
      </TabsList>

      <TabsContent value="pph21"><Pph21Calculator /></TabsContent>
      <TabsContent value="umkm"><UmkmCalculator /></TabsContent>
      <TabsContent value="ppn"><PpnCalculator /></TabsContent>
      <TabsContent value="properti"><PropertiCalculator /></TabsContent>
    </Tabs>
  );
}
