import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { GovernmentChannels } from "@/components/landing/government-channels";
import { Services } from "@/components/landing/services";
import { TaxServices } from "@/components/landing/tax-services";
import { WorkAbroad } from "@/components/landing/work-abroad";
import { VirtualOfficeSection } from "@/components/landing/virtual-office";
import { CertificationsSection } from "@/components/landing/certifications";
import { LicenseChecker } from "@/components/landing/license-checker";
import { KnowledgeHub } from "@/components/landing/knowledge-hub";
import { BlogHub } from "@/components/landing/blog-hub";
import { EmailCourse } from "@/components/landing/email-course";
import { HtmlSitemap } from "@/components/landing/html-sitemap";
import { CoverageSection } from "@/components/landing/coverage";
import { CostCalculator } from "@/components/landing/cost-calculator";
import { WhyUs } from "@/components/landing/why-us";
import { Process } from "@/components/landing/process";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { TeamSection } from "@/components/landing/team";
import { Comparison } from "@/components/landing/comparison";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { ChatWidget } from "@/components/landing/chat-widget";
import { AdminDeploy } from "@/components/landing/admin-deploy";
import { CatalogTeaser } from "@/components/landing/catalog-teaser";

// ============================================================
// PUSATPERIZINAN.COM — Landing Page Utama
// Konsultan Perizinan, Perpajakan & Penempatan PMI #1 Indonesia
// SEO Architecture: Layanan Hulu-Hilir + Jasa Pajak + Kerja Luar Negeri
//   + Virtual Office (1.200+ halaman) + Knowledge Hub + Blog Content Hub + Kursus Email
//   + Jangkauan Nasional + Kalkulator Biaya + Perbandingan + Peta Situs HTML
// Lead Generation Engine + AI Consultant 24/7
// ============================================================

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <GovernmentChannels />
        <Services />
        <TaxServices />
        <WorkAbroad />
        <VirtualOfficeSection />
        <CertificationsSection />
        <CatalogTeaser />
        <LicenseChecker />
        <CostCalculator />
        <KnowledgeHub />
        <BlogHub />
        <EmailCourse />
        <CoverageSection />
        <WhyUs />
        <Process />
        <Pricing />
        <Testimonials />
        <TeamSection />
        <Comparison />
        <Faq />
        <FinalCta />
        <HtmlSitemap />
      </main>
      <Footer />
      <ChatWidget />
      {/* Panel deploy privat — hanya aktif via /?admin=1, tidak tampil di publik */}
      <AdminDeploy />
    </div>
  );
}
