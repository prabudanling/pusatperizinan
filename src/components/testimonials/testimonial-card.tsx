import Link from "next/link";
import { Star, Quote, BadgeCheck, ThumbsUp, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatTanggalID, type Testimonial } from "@/lib/testimonials-data";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5 bintang`}>
      {[...Array(rating)].map((_, j) => (
        <Star key={j} className={`${className} fill-amber-400 text-amber-400`} aria-hidden />
      ))}
    </div>
  );
}

/**
 * Kartu testimoni versi server component — dipakai di /testimoni,
 * /testimoni/[kategori], dan section testimoni halaman programatik.
 */
export function TestimonialCard({
  t,
  truncateTo,
  showHelpful = true,
}: {
  t: Testimonial;
  truncateTo?: number;
  showHelpful?: boolean;
}) {
  const body =
    truncateTo && t.content.length > truncateTo
      ? `${t.content.slice(0, truncateTo).trimEnd()}…`
      : t.content;

  return (
    <Card className="h-full border-border/70 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <Stars rating={t.rating} />
          <Quote className="h-5 w-5 text-primary/20" aria-hidden="true" />
        </div>
        <p className="mt-4 text-sm text-foreground/85 leading-relaxed flex-1">
          &ldquo;{body}&rdquo;
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-[10px] font-medium">
            {t.service}
          </Badge>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" aria-hidden />
            {formatTanggalID(t.date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden />
            {t.city}
          </span>
        </div>
        <div className="mt-4 pt-4 border-t flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-xs font-bold">
              {initialsOf(t.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold flex items-center gap-1.5 truncate">
              {t.name}
              {t.verified && (
                <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" aria-label="Klien terverifikasi" />
              )}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {t.role}, {t.company}
            </p>
          </div>
          {showHelpful && (
            <span
              className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0"
              aria-label={`${t.helpful} orang menilai ulasan ini membantu`}
            >
              <ThumbsUp className="h-3 w-3" aria-hidden /> {t.helpful}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/** Grid responsif kartu testimoni */
export function TestimonialGrid({ items, truncateTo }: { items: Testimonial[]; truncateTo?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <TestimonialCard key={t.id} t={t} truncateTo={truncateTo} />
      ))}
    </div>
  );
}

/** Link internal antar kategori testimoni */
export function CategoryLinks({
  categories,
  excludeSlug,
}: {
  categories: { slug: string; label: string; count: number }[];
  excludeSlug?: string;
}) {
  const list = categories.filter((c) => c.slug !== excludeSlug);
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((c) => (
        <Link
          key={c.slug}
          href={`/testimoni/${c.slug}`}
          className="group flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          {c.label}
          <span className="text-xs text-muted-foreground">({c.count})</span>
        </Link>
      ))}
    </div>
  );
}
