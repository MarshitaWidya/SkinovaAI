import Navbar from "@/components/Navbar";
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
      <Navbar />

      <main>
        <SkinScanner />
      </main>

      <Footer />
    </>
  );
}
