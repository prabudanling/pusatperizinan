"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle, ArrowLeft, CheckCircle2, CircleDashed, Eye, FileText,
  Loader2, Newspaper, PenLine, Plus, RefreshCw, Save, Search, Trash2, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { relativeTime } from "@/components/admin/shared";
import type { CmsPost } from "@/lib/blog-cms";

// ============================================================
// MISSION CONTROL — Tab "Konten & SEO"
// CMS ala WordPress tapi fokus: tulis → cek skor SEO → terbit.
// Artikel tersimpan di database, langsung tampil di /blog tanpa deploy.
// ============================================================

const CATEGORIES = [
  "Panduan", "Biaya & Modal", "Regulasi", "Studi Kasus",
  "Internasional", "Tambang & Energi", "Travel Ibadah", "Pajak",
];

const ANCHORS = [
  { value: "#konsultasi", label: "Konsultasi (#konsultasi)" },
  { value: "#kalkulator", label: "Kalkulator (#kalkulator)" },
  { value: "#cek-izin", label: "Cek Izin (#cek-izin)" },
  { value: "#layanan", label: "Layanan (#layanan)" },
  { value: "#panduan", label: "Panduan (#panduan)" },
];

interface SectionForm { heading: string; paragraphs: string; bullets: string; }
interface FaqForm { question: string; answer: string; }

interface PostForm {
  id: string | null;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  sections: SectionForm[];
  faq: FaqForm[];
  ctaText: string;
  ctaAnchor: string;
  relatedArticles: string;
  relatedGuides: string;
  status: "DRAFT" | "PUBLISHED";
  noindex: boolean;
}

interface SeoItem { label: string; ok: boolean; hint: string; }

function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function emptyForm(): PostForm {
  return {
    id: null, slug: "", title: "", metaTitle: "", metaDescription: "",
    focusKeyword: "", keywords: "", category: "Panduan", excerpt: "",
    author: "Tim PusatPerizinan", authorRole: "Konsultan Perizinan",
    sections: [{ heading: "", paragraphs: "", bullets: "" }],
    faq: [{ question: "", answer: "" }],
    ctaText: "Konsultasi Sekarang", ctaAnchor: "#konsultasi",
    relatedArticles: "", relatedGuides: "", status: "DRAFT", noindex: false,
  };
}

function postToForm(p: CmsPost): PostForm {
  return {
    id: p.id, slug: p.slug, title: p.title, metaTitle: p.metaTitle,
    metaDescription: p.metaDescription, focusKeyword: p.focusKeyword,
    keywords: p.keywords, category: p.category, excerpt: p.excerpt,
    author: p.author, authorRole: p.authorRole,
    sections: p.sections.length > 0
      ? p.sections.map((s) => ({
          heading: s.heading,
          paragraphs: s.paragraphs.join("\n"),
          bullets: (s.bullets ?? []).join("\n"),
        }))
      : [{ heading: "", paragraphs: "", bullets: "" }],
    faq: p.faq.length > 0 ? p.faq.map((f) => ({ question: f.question, answer: f.answer })) : [{ question: "", answer: "" }],
    ctaText: p.cta?.text ?? "Konsultasi Sekarang",
    ctaAnchor: p.cta?.anchor ?? "#konsultasi",
    relatedArticles: p.relatedArticles.join(", "),
    relatedGuides: p.relatedGuides.join(", "),
    status: p.status, noindex: p.noindex,
  };
}

function formToPayload(f: PostForm) {
  return {
    slug: f.slug || f.title,
    title: f.title,
    metaTitle: f.metaTitle,
    metaDescription: f.metaDescription,
    focusKeyword: f.focusKeyword,
    keywords: f.keywords,
    category: f.category,
    excerpt: f.excerpt,
    author: f.author,
    authorRole: f.authorRole,
    sections: f.sections
      .filter((s) => s.heading.trim())
      .map((s) => ({
        heading: s.heading.trim(),
        paragraphs: s.paragraphs.split("\n").map((x) => x.trim()).filter(Boolean),
        bullets: s.bullets.split("\n").map((x) => x.trim()).filter(Boolean),
      })),
    faq: f.faq
      .filter((q) => q.question.trim() && q.answer.trim())
      .map((q) => ({ question: q.question.trim(), answer: q.answer.trim() })),
    ctaText: f.ctaText,
    ctaAnchor: f.ctaAnchor,
    relatedArticles: f.relatedArticles.split(",").map((x) => x.trim()).filter(Boolean),
    relatedGuides: f.relatedGuides.split(",").map((x) => x.trim()).filter(Boolean),
    status: f.status,
    noindex: f.noindex,
  };
}

/** Skor SEO live — 10 pemeriksaan ala Yoast, bobot total 100 */
function computeSeoAudit(f: PostForm): { score: number; items: SeoItem[] } {
  const kw = f.focusKeyword.trim().toLowerCase();
  const titleSeo = (f.metaTitle || f.title).trim();
  const desc = (f.metaDescription || f.excerpt).trim();
  const slug = slugify(f.slug || f.title);
  const firstPara = f.sections.find((s) => s.heading.trim())?.paragraphs.split("\n").map((x) => x.trim()).filter(Boolean)[0] ?? "";
  const contentSections = f.sections.filter(
    (s) => s.heading.trim() && (s.paragraphs.trim() || s.bullets.trim())
  ).length;
  const realFaq = f.faq.filter((q) => q.question.trim() && q.answer.trim()).length;

  const items: SeoItem[] = [
    {
      label: "Kata kunci fokus ditentukan", ok: kw.length > 0,
      hint: "Tentukan 1 frasa utama yang dicari calon klien, mis. \u201cbiaya pendirian PT\u201d",
    },
    {
      label: "Kata kunci ada di judul SEO", ok: kw.length > 0 && titleSeo.toLowerCase().includes(kw),
      hint: "Sisipkan kata kunci secara natural di judul",
    },
    {
      label: `Panjang judul SEO 30\u201360 karakter (kini ${titleSeo.length})`,
      ok: titleSeo.length >= 30 && titleSeo.length <= 60,
      hint: "Judul terlalu pendek terpotong peluang; terlalu panjang terpotong di hasil pencarian",
    },
    {
      label: "Kata kunci ada di meta description", ok: kw.length > 0 && desc.toLowerCase().includes(kw),
      hint: "Meta description yang mengandung kata kunci ditebalkan Google",
    },
    {
      label: `Panjang meta description 110\u2013160 karakter (kini ${desc.length})`,
      ok: desc.length >= 110 && desc.length <= 160,
      hint: "Terlalu pendek = informasi kurang; terlalu panjang = terpotong",
    },
    {
      label: "Kata kunci ada di URL (slug)", ok: kw.length > 0 && slug.includes(slugify(kw)),
      hint: "URL yang mengandung kata kunci memperkuat relevansi",
    },
    {
      label: "Kata kunci ada di paragraf pembuka", ok: kw.length > 0 && firstPara.toLowerCase().includes(kw),
      hint: "Sebut kata kunci di 100 kata pertama",
    },
    {
      label: `Minimal 3 bagian berisi (kini ${contentSections})`,
      ok: contentSections >= 3,
      hint: "Artikel mendalam butuh struktur H2 yang jelas",
    },
    {
      label: `Minimal 3 FAQ (kini ${realFaq})`,
      ok: realFaq >= 3,
      hint: "FAQ membuka peluang rich snippet di Google",
    },
    {
      label: `Ringkasan \u2265 100 karakter (kini ${f.excerpt.trim().length})`,
      ok: f.excerpt.trim().length >= 100,
      hint: "Ringkasan tampil di kartu blog & meta default",
    },
  ];

  const weights = [10, 12, 12, 10, 12, 10, 10, 10, 8, 6];
  const score = items.reduce((n, it, i) => n + (it.ok ? weights[i] : 0), 0);
  return { score, items };
}

interface Stats { total: number; published: number; draft: number; noindex: number; }

export function CmsTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<CmsPost[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [form, setForm] = useState<PostForm | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      const json = await res.json();
      if (res.status === 401) { window.location.reload(); return; }
      if (json.success) {
        setPosts(json.data.posts as CmsPost[]);
        setStats(json.data.stats as Stats);
      }
    } catch {
      // jaringan berkedip — coba lagi pada refresh berikutnya
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const audit = useMemo(() => (form ? computeSeoAudit(form) : null), [form]);

  function patch(p: Partial<PostForm>) {
    setForm((f) => (f ? { ...f, ...p } : f));
  }

  function onTitleChange(title: string) {
    setForm((f) =>
      f ? { ...f, title, slug: !slugTouched && f.id === null ? slugify(title) : f.slug } : f
    );
  }

  function openNew() {
    setForm(emptyForm());
    setSlugTouched(false);
  }

  function openEdit(p: CmsPost) {
    setForm(postToForm(p));
    setSlugTouched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save() {
    if (!form) return;
    if (!form.title.trim() || !form.excerpt.trim()) {
      toast({ title: "Lengkapi dulu", description: "Judul dan ringkasan wajib diisi." });
      return;
    }
    setBusy(true);
    try {
      const isNew = form.id === null;
      const res = await fetch(isNew ? "/api/admin/posts" : `/api/admin/posts/${form.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formToPayload(form)),
      });
      const json = await res.json();
      if (res.status === 401) { window.location.reload(); return; }
      if (json.success) {
        const saved = json.data as CmsPost;
        setForm(postToForm(saved));
        setSlugTouched(true);
        toast({
          title: saved.status === "PUBLISHED" ? "Artikel TERBIT ✓" : "Draft tersimpan",
          description: saved.status === "PUBLISHED"
            ? `Langsung tampil di /blog/${saved.slug}`
            : `Hanya admin yang bisa melihat pratinjau /blog/${saved.slug}`,
        });
        await load();
      } else {
        toast({ title: "Gagal menyimpan", description: json.error });
      }
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: CmsPost) {
    if (!confirm(`Hapus artikel "${p.title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/posts/${p.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast({ title: "Artikel dihapus", description: p.slug });
        if (form?.id === p.id) setForm(null);
        await load();
      } else {
        toast({ title: "Gagal menghapus", description: json.error });
      }
    } finally {
      setBusy(false);
    }
  }

  function toggleStatus() {
    if (!form) return;
    patch({ status: form.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" });
  }

  const filtered = (posts ?? []).filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.slug.includes(q);
  });

  // ===================== TAMPILAN EDITOR =====================
  if (form) {
    const grade =
      audit && audit.score >= 80
        ? { text: "Siap terbit", cls: "text-emerald-300" }
        : audit && audit.score >= 50
          ? { text: "Perlu perbaikan", cls: "text-amber-300" }
          : { text: "Lemah", cls: "text-rose-300" };

    return (
      <div className="space-y-6">
        {/* Header editor */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline" size="sm"
            onClick={() => setForm(null)}
            className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800"
          >
            <ArrowLeft aria-hidden className="mr-2 h-4 w-4" /> Daftar artikel
          </Button>
          <h2 className="text-lg font-bold">
            {form.id ? "Edit Artikel" : "Artikel Baru"}
          </h2>
          <Badge className={
            form.status === "PUBLISHED"
              ? "rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
              : "rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30"
          }>
            {form.status === "PUBLISHED" ? "TERBIT" : "DRAFT"}
          </Badge>
          <div className="ml-auto flex gap-2">
            {form.id && !form.noindex && (
              <Button
                variant="outline" size="sm"
                onClick={() => window.open(`/blog/${form.slug}`, "_blank")}
                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800"
              >
                <Eye aria-hidden className="mr-2 h-4 w-4" /> Pratinjau
              </Button>
            )}
            <Button size="sm" onClick={save} disabled={busy} className="bg-emerald-600 font-bold hover:bg-emerald-500">
              {busy ? <Loader2 aria-hidden className="mr-2 h-4 w-4 animate-spin" /> : <Save aria-hidden className="mr-2 h-4 w-4" />}
              {form.status === "PUBLISHED" ? "Simpan & Terbitkan" : "Simpan Draft"}
            </Button>
          </div>
        </div>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* ---------- Kolom utama: form ---------- */}
          <div className="space-y-5">
            {/* Identitas */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <PenLine aria-hidden className="h-4 w-4 text-emerald-400" /> Identitas Artikel
              </h3>
              <div className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cms-title" className="text-stone-400">Judul (H1) *</Label>
                  <Input id="cms-title" value={form.title} onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Cara Mengurus NIB Online 2026: Panduan Lengkap" className="border-stone-700 bg-stone-950 text-stone-100" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cms-slug" className="text-stone-400">
                    Slug URL <span className="text-stone-600">— /blog/{"{slug}"}</span>
                  </Label>
                  <Input id="cms-slug" value={form.slug}
                    onChange={(e) => { setSlugTouched(true); patch({ slug: e.target.value }); }}
                    placeholder="cara-mengurus-nib-online" className="border-stone-700 bg-stone-950 font-mono text-sm text-emerald-300" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-stone-400">Kategori</Label>
                    <Select value={form.category} onValueChange={(v) => patch({ category: v })}>
                      <SelectTrigger className="border-stone-700 bg-stone-950 text-stone-100"><SelectValue /></SelectTrigger>
                      <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
                        {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-keywords" className="text-stone-400">Kata kunci tambahan (koma)</Label>
                    <Input id="cms-keywords" value={form.keywords} onChange={(e) => patch({ keywords: e.target.value })}
                      placeholder="nib oss, nomor induk berusaha" className="border-stone-700 bg-stone-950 text-stone-100" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cms-excerpt" className="text-stone-400">Ringkasan (tampil di kartu blog & meta) *</Label>
                  <Textarea id="cms-excerpt" value={form.excerpt} onChange={(e) => patch({ excerpt: e.target.value })}
                    rows={3} placeholder="Ringkas isi artikel 1–2 kalimat yang memancing klik…" className="border-stone-700 bg-stone-950 text-stone-100" />
                  <p className="text-xs text-stone-500">{form.excerpt.trim().length} karakter — ideal 110–160</p>
                </div>
              </div>
            </section>

            {/* Konten */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-stone-200">
                  <FileText aria-hidden className="h-4 w-4 text-emerald-400" /> Isi Artikel (Bagian H2)
                </h3>
                <Button variant="outline" size="sm"
                  onClick={() => setForm((f) => f ? { ...f, sections: [...f.sections, { heading: "", paragraphs: "", bullets: "" }] } : f)}
                  className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800"
                >
                  <Plus aria-hidden className="mr-1 h-4 w-4" /> Bagian
                </Button>
              </div>
              <div className="mt-4 space-y-4">
                {form.sections.map((s, i) => (
                  <div key={i} className="rounded-xl border border-stone-800 bg-stone-950/60 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400">H2 #{i + 1}</span>
                      {form.sections.length > 1 && (
                        <button
                          onClick={() => setForm((f) => f ? { ...f, sections: f.sections.filter((_, j) => j !== i) } : f)}
                          aria-label={`Hapus bagian ${i + 1}`}
                          className="ml-auto rounded p-1 text-stone-500 hover:bg-rose-500/10 hover:text-rose-400"
                        >
                          <Trash2 aria-hidden className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <Input value={s.heading}
                      onChange={(e) => setForm((f) => f ? { ...f, sections: f.sections.map((x, j) => j === i ? { ...x, heading: e.target.value } : x) } : f)}
                      placeholder={`Judul bagian ${i + 1}, mis. "Syarat yang Harus Disiapkan"`}
                      className="mt-2 border-stone-700 bg-stone-950 font-semibold text-stone-100" />
                    <Textarea value={s.paragraphs} rows={4}
                      onChange={(e) => setForm((f) => f ? { ...f, sections: f.sections.map((x, j) => j === i ? { ...x, paragraphs: e.target.value } : x) } : f)}
                      placeholder={"Satu paragraf per baris…"} className="mt-2 border-stone-700 bg-stone-950 text-sm text-stone-100" />
                    <Textarea value={s.bullets} rows={2}
                      onChange={(e) => setForm((f) => f ? { ...f, sections: f.sections.map((x, j) => j === i ? { ...x, bullets: e.target.value } : x) } : f)}
                      placeholder={"Poin daftar (opsional) — satu poin per baris"} className="mt-2 border-stone-700 bg-stone-950 text-sm text-stone-100" />
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-stone-200">
                  <CircleDashed aria-hidden className="h-4 w-4 text-emerald-400" /> FAQ (rich snippet Google)
                </h3>
                <Button variant="outline" size="sm"
                  onClick={() => setForm((f) => f ? { ...f, faq: [...f.faq, { question: "", answer: "" }] } : f)}
                  className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800"
                >
                  <Plus aria-hidden className="mr-1 h-4 w-4" /> FAQ
                </Button>
              </div>
              <div className="mt-4 space-y-3">
                {form.faq.map((q, i) => (
                  <div key={i} className="rounded-xl border border-stone-800 bg-stone-950/60 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400">FAQ #{i + 1}</span>
                      {form.faq.length > 1 && (
                        <button
                          onClick={() => setForm((f) => f ? { ...f, faq: f.faq.filter((_, j) => j !== i) } : f)}
                          aria-label={`Hapus FAQ ${i + 1}`}
                          className="ml-auto rounded p-1 text-stone-500 hover:bg-rose-500/10 hover:text-rose-400"
                        >
                          <Trash2 aria-hidden className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <Input value={q.question}
                      onChange={(e) => setForm((f) => f ? { ...f, faq: f.faq.map((x, j) => j === i ? { ...x, question: e.target.value } : x) } : f)}
                      placeholder="Pertanyaan yang sering diajukan…" className="mt-2 border-stone-700 bg-stone-950 font-semibold text-stone-100" />
                    <Textarea value={q.answer} rows={2}
                      onChange={(e) => setForm((f) => f ? { ...f, faq: f.faq.map((x, j) => j === i ? { ...x, answer: e.target.value } : x) } : f)}
                      placeholder="Jawaban singkat & tegas…" className="mt-2 border-stone-700 bg-stone-950 text-sm text-stone-100" />
                  </div>
                ))}
              </div>
            </section>

            {/* Penutup & tautan */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-stone-200">
                <Newspaper aria-hidden className="h-4 w-4 text-emerald-400" /> Penutup & Tautan Internal
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="cms-cta" className="text-stone-400">Teks CTA akhir artikel</Label>
                  <Input id="cms-cta" value={form.ctaText} onChange={(e) => patch({ ctaText: e.target.value })}
                    className="border-stone-700 bg-stone-950 text-stone-100" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-stone-400">CTA menuju</Label>
                  <Select value={form.ctaAnchor} onValueChange={(v) => patch({ ctaAnchor: v })}>
                    <SelectTrigger className="border-stone-700 bg-stone-950 text-stone-100"><SelectValue /></SelectTrigger>
                    <SelectContent className="border-stone-700 bg-stone-900 text-stone-100">
                      {ANCHORS.map((a) => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cms-relart" className="text-stone-400">Artikel terkait (slug, koma)</Label>
                  <Input id="cms-relart" value={form.relatedArticles} onChange={(e) => patch({ relatedArticles: e.target.value })}
                    placeholder="cara-mengurus-nib-online, biaya-pendirian-pt" className="border-stone-700 bg-stone-950 text-sm text-stone-100" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cms-relguide" className="text-stone-400">Panduan terkait (id, koma)</Label>
                  <Input id="cms-relguide" value={form.relatedGuides} onChange={(e) => patch({ relatedGuides: e.target.value })}
                    placeholder="nib, pt, oss" className="border-stone-700 bg-stone-950 text-sm text-stone-100" />
                </div>
              </div>
            </section>
          </div>

          {/* ---------- Sidebar: SEO + publikasi ---------- */}
          <div className="space-y-5">
            {/* Publikasi */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <h3 className="text-sm font-bold text-stone-200">Publikasi</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-200">
                      {form.status === "PUBLISHED" ? "Terbit (publik)" : "Draft (pratinjau admin)"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {form.status === "PUBLISHED"
                        ? "Tampil di /blog, sitemap & RSS otomatis"
                        : "Belum terlihat pengunjung & mesin pencari"}
                    </p>
                  </div>
                  <Switch checked={form.status === "PUBLISHED"} onCheckedChange={toggleStatus}
                    aria-label="Terbitkan artikel" />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-stone-800 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-200">noindex</p>
                    <p className="text-xs text-stone-500">Sembunyikan dari Google (tetap bisa diakses)</p>
                  </div>
                  <Switch checked={form.noindex} onCheckedChange={(v) => patch({ noindex: v })}
                    aria-label="Set noindex" />
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-stone-800 pt-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-author" className="text-stone-400">Penulis</Label>
                    <Input id="cms-author" value={form.author} onChange={(e) => patch({ author: e.target.value })}
                      className="border-stone-700 bg-stone-950 text-sm text-stone-100" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cms-role" className="text-stone-400">Jabatan</Label>
                    <Input id="cms-role" value={form.authorRole} onChange={(e) => patch({ authorRole: e.target.value })}
                      className="border-stone-700 bg-stone-950 text-sm text-stone-100" />
                  </div>
                </div>
              </div>
            </section>

            {/* Skor SEO */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-200">Skor SEO</h3>
                <span className={`text-2xl font-extrabold ${grade.cls}`}>{audit?.score ?? 0}<span className="text-sm text-stone-500">/100</span></span>
              </div>
              <Progress value={audit?.score ?? 0} className="mt-3 h-2 bg-stone-800" aria-label={`Skor SEO ${audit?.score ?? 0} dari 100`} />
              <p className={`mt-2 text-xs font-semibold ${grade.cls}`}>{grade.text}</p>
              <ul className="mt-4 space-y-2.5">
                {audit?.items.map((it) => (
                  <li key={it.label} className="flex items-start gap-2.5 text-xs">
                    {it.ok
                      ? <CheckCircle2 aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      : <XCircle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-600" />}
                    <div>
                      <p className={it.ok ? "text-stone-300" : "text-stone-400"}>{it.label}</p>
                      {!it.ok && <p className="mt-0.5 text-[11px] leading-relaxed text-stone-600">{it.hint}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Meta preview (snippet Google) */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <h3 className="text-sm font-bold text-stone-200">Pratinjau Hasil Google</h3>
              <div className="mt-3 max-w-full overflow-hidden rounded-xl bg-white p-4">
                <p className="max-w-full truncate text-xs text-[#4d5156]">pusatperizinan.com › blog › {form.slug || "slug-artikel"}</p>
                <p className="mt-0.5 max-w-full truncate text-lg text-[#1a0dab]">{form.metaTitle || form.title || "Judul artikel"}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[#4d5156]">
                  {form.metaDescription || form.excerpt || "Meta description akan tampil di sini."}
                </p>
              </div>
            </section>

            {/* SEO meta */}
            <section className="rounded-2xl border border-stone-800 bg-stone-900/40 p-5">
              <h3 className="text-sm font-bold text-stone-200">Meta Tag</h3>
              <div className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cms-metattle" className="text-stone-400">Judul SEO (fallback: judul artikel)</Label>
                  <Input id="cms-metattle" value={form.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })}
                    className="border-stone-700 bg-stone-950 text-stone-100" />
                  <p className={`text-xs ${
                    (form.metaTitle || form.title).length >= 30 && (form.metaTitle || form.title).length <= 60
                      ? "text-emerald-400" : "text-amber-400"}`}>
                    {(form.metaTitle || form.title).length} / 60 karakter
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cms-metadesc" className="text-stone-400">Meta description (fallback: ringkasan)</Label>
                  <Textarea id="cms-metadesc" value={form.metaDescription} onChange={(e) => patch({ metaDescription: e.target.value })}
                    rows={3} className="border-stone-700 bg-stone-950 text-sm text-stone-100" />
                  <p className={`text-xs ${
                    (form.metaDescription || form.excerpt).length >= 110 && (form.metaDescription || form.excerpt).length <= 160
                      ? "text-emerald-400" : "text-amber-400"}`}>
                    {(form.metaDescription || form.excerpt).length} / 160 karakter
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cms-focus" className="text-stone-400">Kata kunci fokus</Label>
                  <Input id="cms-focus" value={form.focusKeyword} onChange={(e) => patch({ focusKeyword: e.target.value })}
                    placeholder="biaya pendirian pt" className="border-stone-700 bg-stone-950 text-stone-100" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // ===================== TAMPILAN DAFTAR =====================
  return (
    <div className="space-y-5">
      {/* Ringkasan */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total artikel CMS", value: stats?.total ?? 0, icon: FileText },
          { label: "Terbit (publik)", value: stats?.published ?? 0, icon: CheckCircle2 },
          { label: "Draft", value: stats?.draft ?? 0, icon: AlertTriangle },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-stone-800 bg-stone-900/40 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-stone-500">{s.label}</p>
                <Icon aria-hidden className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-1 text-2xl font-extrabold">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search aria-hidden className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari judul / slug…"
            className="border-stone-700 bg-stone-900/60 pl-9 text-stone-100" aria-label="Cari artikel" />
        </div>
        <Button onClick={openNew} className="bg-emerald-600 font-bold hover:bg-emerald-500">
          <Plus aria-hidden className="mr-2 h-4 w-4" /> Artikel Baru
        </Button>
        <Button variant="outline" size="icon" onClick={() => void load()}
          className="border-stone-700 bg-stone-900/60 hover:bg-stone-800"
          aria-label="Muat ulang daftar artikel" title="Muat ulang">
          <RefreshCw aria-hidden className="h-4 w-4" />
        </Button>
      </div>

      {/* Info konten statis */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-4 text-xs leading-relaxed text-stone-500">
        <strong className="text-stone-300">Info:</strong> 15 artikel bawaan repo (blog-content.ts) dikelola lewat kode &amp; tampil
        bersama artikel di bawah ini di /blog. Artikel CMS terbit langsung tanpa deploy — slug sama dengan artikel bawaan akan
        menimpanya. Sitemap &amp; RSS otomatis mengikuti (noindex otomatis dikecualikan).
      </div>

      {/* Daftar */}
      <div className="space-y-3">
        {posts === null && (
          <p className="flex items-center gap-2 p-6 text-sm text-stone-500">
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Memuat artikel…
          </p>
        )}
        {posts !== null && filtered.length === 0 && (
          <p className="p-6 text-sm text-stone-500">
            Belum ada artikel CMS. Klik <strong className="text-emerald-400">Artikel Baru</strong> untuk menulis yang pertama —
            skor SEO live akan memandu Anda sampai siap terbit.
          </p>
        )}
        {filtered.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-stone-800 bg-stone-900/40 p-4 transition-colors hover:border-emerald-500/30">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-bold text-stone-100">{p.title}</p>
                <Badge className={
                  p.status === "PUBLISHED"
                    ? "rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px]"
                    : "rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px]"
                }>
                  {p.status === "PUBLISHED" ? "TERBIT" : "DRAFT"}
                </Badge>
                {p.noindex && (
                  <Badge className="rounded-full bg-stone-700/50 text-stone-300 border border-stone-600 text-[10px]">noindex</Badge>
                )}
              </div>
              <p className="mt-1 truncate font-mono text-xs text-emerald-500/80">/blog/{p.slug}</p>
              <p className="mt-1 text-xs text-stone-500">
                {p.category} · diperbarui {relativeTime(p.updatedAt)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"
                onClick={() => window.open(`/blog/${p.slug}`, "_blank")}
                className="border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800">
                <Eye aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Lihat
              </Button>
              <Button variant="outline" size="sm" onClick={() => openEdit(p)}
                className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">
                <PenLine aria-hidden className="mr-1.5 h-3.5 w-3.5" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => remove(p)} disabled={busy}
                className="border-stone-700 bg-stone-900/60 text-stone-400 hover:bg-rose-500/10 hover:text-rose-300">
                <Trash2 aria-hidden className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
