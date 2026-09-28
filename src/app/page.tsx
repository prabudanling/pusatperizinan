import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { Services } from "@/components/landing/services";
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

// ============================================================
// PUSATPERIZINAN.COM — Landing Page Utama
// Konsultan Perizinan Usaha #1 Indonesia
// SEO Architecture: Layanan + Knowledge Hub + Blog Content Hub + Kursus Email
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
        <Services />
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
