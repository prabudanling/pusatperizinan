"use client";

// ============================================================
// PUSATPERIZINAN.COM — Section Tim Konsultan
// Founder featured card + grid 5 konsultan senior.
// Bilingual id/en via useLanguage (fallback: Indonesia).
// ============================================================

import { motion } from "framer-motion";
import { BadgeCheck, Crown, ShieldCheck } from "lucide-react";
import { FOUNDER, TEAM, type LocalizedText, type TeamMember } from "@/lib/team-data";
import { useLanguage } from "@/lib/i18n/language-provider";

function Avatar({ initials, featured }: { initials: string; featured?: boolean }) {
  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-extrabold tracking-tight shadow-lg ${
        featured
          ? "h-16 w-16 bg-gradient-to-br from-emerald-500 to-emerald-700 text-amber-300 text-xl ring-2 ring-amber-400/40"
          : "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white"
      }`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function MemberCard({ member, featured = false, index = 0 }: { member: TeamMember; featured?: boolean; index?: number }) {
  const { lang } = useLanguage();
  const L = (v: LocalizedText) => (lang === "en" ? v.en : v.id);
  const focus = lang === "en" ? member.focus.en : member.focus.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className={`glass-card group relative overflow-hidden rounded-2xl p-6 ${
        featured ? "md:col-span-2 ring-1 ring-amber-400/30" : ""
      }`}
    >
      {featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-500">
          <Crown className="h-3.5 w-3.5" aria-hidden="true" />
          {lang === "en" ? "Founder" : "Pendiri"}
        </span>
      )}
      <div className="flex items-start gap-4">
        <Avatar initials={member.initials} featured={featured} />
        <div className="min-w-0">
          <h3 className={`font-bold leading-snug ${featured ? "text-lg" : "text-base"}`}>
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {L(member.title)}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            {member.credentials}
          </p>
        </div>
      </div>
      <p className={`mt-4 text-sm leading-relaxed text-muted-foreground ${featured ? "md:max-w-3xl" : ""}`}>
        {L(member.bio)}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={lang === "en" ? "Areas of expertise" : "Bidang keahlian"}>
        {focus.map((f) => (
          <li
            key={f}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300"
          >
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function TeamSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="tim" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            {lang === "en" ? "Our Consultants" : "Tim Kami"}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            {lang === "en" ? (
              <>
                Handled by <span className="text-gradient-brand">Senior Experts</span>, Not Salespeople
              </>
            ) : (
              <>
                Ditangani <span className="text-gradient-brand">Konsultan Senior</span>, Bukan Sales
              </>
            )}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {lang === "en"
              ? "Your permits are managed by seasoned practitioners — a founder network with McKinsey-alumni & geopolitical advisory, backed by specialists in legal, halal, building, and investment licensing."
              : "Izin Anda dikelola praktisi berpengalaman — jaringan founder bersama advisory alumni McKinsey & geopolitik, didukung spesialis legal, halal, bangunan, dan investasi."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MemberCard member={FOUNDER} featured index={0} />
          {TEAM.map((m, i) => (
            <MemberCard key={m.name} member={m} index={i + 1} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t("footerRights").replace("{year}", String(new Date().getFullYear()))} ·{" "}
          PT Digital Bisnis Manajemen
        </p>
      </div>
    </section>
  );
}
