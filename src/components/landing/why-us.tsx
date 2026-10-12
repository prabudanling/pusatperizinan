"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Wallet,
  Headset,
  FileSearch,
  MapPinned,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Garansi 100% Uang Kembali",
    desc: "Satu-satunya konsultan yang berani menjamin: izin gagal terbit karena kesalahan kami? Dana Anda kembali penuh, tertulis di kontrak.",
  },
  {
    icon: Clock,
    title: "Tercepat di Kelasnya",
    desc: "Tim internal + sistem tracking memangkas birokrasi. NIB selesai 1 hari, PT 3 hari — rata-rata 3x lebih cepat dari pesaing.",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    desc: "Satu harga all-in di awal: jasa + biaya resmi + notaris. Tidak ada biaya siluman di tengah jalan. Invoice resmi untuk tiap pembayaran.",
  },
  {
    icon: Headset,
    title: "1 Konsultan = 1 PIC",
    desc: "Tidak didelegasikan ke call center. Anda pegang nomor WA personal konsultan yang update progres tiap hari, 7 hari seminggu.",
  },
  {
    icon: FileSearch,
    title: "Ahli Regulasi Terkini",
    desc: "Kami kaji UU Cipta Kerja, PP 5/2021, OSS-RBA & peraturan sektor setiap bulannya. KBLI & strategi pajak kami pilihkan yang paling menguntungkan.",
  },
  {
    icon: MapPinned,
    title: "Menjangkau 38 Provinsi & 514 Kab/Kota",
    desc: "Proses online + kurir dokumen. Dari Sabang sampai Merauke — tim on-site untuk AMDAL, audit fisik & sektor tambang.",
  },
];

export function WhyUs() {
  const { t } = useLanguage();
  return (
    <section id="keunggulan" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/10 text-gold-foreground text-xs font-semibold px-4 py-1">
            Kenapa PusatPerizinan?
          </span>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("whyT1")} <span className="text-gradient-brand">{t("whyTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("whySub")}
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-border/70 bg-card p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/25 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <reason.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{reason.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
