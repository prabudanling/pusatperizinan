import Link from "next/link";

const shortcuts = [
  { href: "/layanan/nib", title: "NIB & OSS", detail: "Lihat persyaratan dan proses pengurusan." },
  { href: "/layanan/pt", title: "Pendirian PT", detail: "Pelajari dokumen, tahapan, dan estimasi biaya." },
  { href: "/layanan/cv", title: "Pendirian CV", detail: "Temukan informasi sebelum memulai usaha." },
  { href: "/layanan/halal", title: "Sertifikasi Halal", detail: "Kenali persyaratan untuk produk Anda." },
  { href: "/layanan/bpom", title: "Izin BPOM", detail: "Pelajari kebutuhan izin edar produk." },
  { href: "/bandingkan", title: "Bandingkan Pilihan", detail: "Pertimbangkan layanan sesuai kebutuhan." },
];

/** Server-rendered links remain usable without JavaScript. */
export function ServiceShortcuts() {
  return (
    <section aria-labelledby="pilih-layanan" className="border-y bg-card py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="pilih-layanan" className="text-2xl font-bold">Apa yang ingin Anda urus?</h2>
        <p className="mt-2 text-muted-foreground">Mulai dari kebutuhan Anda, lalu periksa syarat dan estimasi biayanya.</p>
        <nav aria-label="Layanan pilihan" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <span className="font-semibold text-primary">{item.title} →</span>
              <span className="mt-1 block text-sm text-muted-foreground">{item.detail}</span>
            </Link>
          ))}
        </nav>
        <p className="mt-5 text-sm">
          Belum tahu harus mulai dari mana?{" "}
          <Link href="/cek-dokumen" className="font-semibold text-primary underline">Cek kesiapan dokumen</Link>
          {" atau "}<Link href="/kontak" className="font-semibold text-primary underline">hubungi tim konsultasi</Link>.
        </p>
      </div>
    </section>
  );
}
