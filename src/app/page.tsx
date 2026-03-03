import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import TrustedBrands from "@/components/sections/trusted-brands";
import StatsSection from "@/components/sections/stats";
import IntroSection from "@/components/sections/intro";
import HowItWorks from "@/components/sections/how-it-works";
import Services from "@/components/sections/services";
import PortfolioSection from "@/components/sections/portfolio-section";
import IndustriesSection from "@/components/sections/industries";
import TestimonialsSection from "@/components/sections/testimonials";
import FeaturedClient from "@/components/sections/featured-client";
import PricingCalculator from "@/components/sections/pricing-calculator";
import AboutMe from "@/components/sections/about-me";
import FAQ from "@/components/sections/faq";
import FinalCTASection from "@/components/sections/cta-final";
import ContactFormSection from "@/components/sections/contact-form";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBrands />
        <StatsSection />
        <IntroSection />
        <HowItWorks />
        <Services />
        <PortfolioSection />
        <IndustriesSection />
        <TestimonialsSection />
        <FeaturedClient />
        <PricingCalculator />
        <AboutMe />
        <FAQ />
        <FinalCTASection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
