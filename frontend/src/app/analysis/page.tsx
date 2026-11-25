import Footer from "@/components/Footer";
import SkinScanner from "@/components/SkinScanner";

export const metadata = {
  title: "Analisis Kulit | Skinova AI",
  description:
    "Analisis kondisi kulit wajah menggunakan teknologi AI dari Skinova AI.",
};

export default function AnalysisPage() {
  return (
    <>
      <main className="min-h-screen bg-[#FAFAF3]">
        <SkinScanner />
      </main>
      <Footer />
    </>
  );
}
