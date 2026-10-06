import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRY_SERVICE_PAGES, getIndustryServicePage } from "@/lib/seo-pages";
import { classifyPage } from "@/lib/seo-policy";
import { SeoLandingView } from "@/components/seo/landing-renderer";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string; service: string }[] {
  return INDUSTRY_SERVICE_PAGES.map((p) => ({
    slug: p.industrySlug!,
    service: p.serviceId!,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}): Promise<Metadata> {
  const { slug, service } = await params;
  const page = getIndustryServicePage(slug, service);
  if (!page) return {};
  const prose = `${page.intro.join(" ")} ${page.sections
    .map((s) => `${s.heading} ${(s.paras ?? []).join(" ")} ${(s.bullets ?? []).join(" ")}`)
    .join(" ")}`;
  const index = classifyPage({
    slug: page.slug,
    kind: page.kind,
    intro: prose,
    faq: page.faq,
    features: page.sections.map((s) => s.heading),
  }).index;
  return {
    title: page.title,
    description: page.metaDesc,
    keywords: page.keywords,
    alternates: { canonical: `/industri/${page.slug}` },
    openGraph: { title: page.title, description: page.metaDesc, url: `/industri/${page.slug}`, type: "article", siteName: "PusatPerizinan.com", locale: "id_ID" },
    twitter: { card: "summary_large_image", title: page.title, description: page.metaDesc },
    robots: { index, follow: true },
  };
}

export default async function IndustryServicePage({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug, service } = await params;
  const page = getIndustryServicePage(slug, service);
  if (!page) notFound();
  return <SeoLandingView page={page} />;
}
