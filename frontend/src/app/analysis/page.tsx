import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisWorkspace from "@/components/analysis/AnalysisWorkspace";

export const metadata = {
  title: "Analisis Kulit | Skinova AI",
  description:
    "Lakukan pemindaian wajah dan dapatkan insight kondisi kulit melalui Skinova AI.",
};

export default function AnalysisPage() {
  return (
    <>
      <Navbar />
      <AnalysisWorkspace />
      <Footer />
    </>
  );
}
