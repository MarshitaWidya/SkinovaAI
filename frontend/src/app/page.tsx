import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/AnalysisCTA";
import EducationPreview from "@/components/landing/EducationPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <CTA />
        <EducationPreview />
      </main>

      <Footer />
    </>
  );
}
