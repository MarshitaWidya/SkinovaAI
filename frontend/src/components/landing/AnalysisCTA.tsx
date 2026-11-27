import { ArrowRight, ScanFace } from "lucide-react";

export default function CTA() {
  return (
    <section id="mulai-analisis" className="w-full px-5 py-10 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#EBDECE]/50 px-7 py-12 sm:px-10 lg:px-16 lg:py-16">
        {/* Decorative ambient elements */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#A2AF9B]/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-[#D9E7D1]/50 blur-3xl" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#566251]">
            Mulai Langkah Pertama
          </span>

          <h2 className="font-['Newsreader'] text-4xl leading-tight tracking-tight text-[#1A1C18] sm:text-5xl lg:text-6xl">
            Your Skin Deserves Better Understanding.
          </h2>

          <p className="max-w-xl text-sm leading-7 text-[#444841] sm:text-base sm:leading-8">
            Mulai kenali kebutuhan kulitmu dan dapatkan informasi perawatan
            berdasarkan hasil analisis AI yang transparan, aman, dan berbasis
            data ilmiah.
          </p>

          <div className="pt-2">
            <a
              href="/analysis"
              className="inline-flex items-center gap-3 rounded-full bg-[#566251] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#3E4A3A] hover:shadow-md"
            >
              <span>Mulai Analisis Sekarang</span>
              <ScanFace size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
