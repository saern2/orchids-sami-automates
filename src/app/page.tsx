import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import IntroSection from "@/components/sections/intro";
import HowItWorks from "@/components/sections/how-it-works";
import Services from "@/components/sections/services";
import PortfolioSection from "@/components/sections/portfolio-section";
import IndustriesSection from "@/components/sections/industries";
import AboutMe from "@/components/sections/about-me";
import FAQ from "@/components/sections/faq";
import FinalCTASection from "@/components/sections/cta-final";
import ContactFormSection from "@/components/sections/contact-form";
import Footer from "@/components/sections/footer";
import { getSetting } from "@/lib/content";

export default async function Home() {
  const [fiverr, contact] = await Promise.all([getSetting("fiverr"), getSetting("contact")]);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <HowItWorks />
        <Services />
        <PortfolioSection />
        <IndustriesSection />
        <AboutMe fiverr={fiverr} />
        <FAQ email={contact?.email ?? null} />
        <FinalCTASection />
        <ContactFormSection />
      </main>
      <Footer contact={contact} />
    </div>
  );
}
