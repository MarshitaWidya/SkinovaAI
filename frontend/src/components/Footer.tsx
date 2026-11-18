import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#30382F] text-[#F5F4EA]">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkles size={19} />
              <span className="text-xl font-semibold">
                skinova<span className="text-[#A2AF9B]">.</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
              Understand your skin, embrace your natural beauty. Kenali indikasi
              kondisi kulit dan temukan wawasan perawatan yang lebih terarah.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] text-[#C9D2C2]">
              EXPLORE
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <Link href="/" className="hover:text-white">
                Beranda
              </Link>
              <Link href="/analysis" className="hover:text-white">
                Analisis Kulit
              </Link>
              <Link href="/education" className="hover:text-white">
                Edukasi
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] text-[#C9D2C2]">
              GET STARTED
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/65">
              Mulai memahami kebutuhan kulitmu melalui analisis berbasis AI.
            </p>

            <Link
              href="/analysis"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D6E0D0] hover:text-white"
            >
              Mulai analisis
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-7 text-[11px] text-white/40 sm:flex-row">
          <p>© 2026 Skinova AI. Educational prototype.</p>
          <p>Hasil analisis AI bukan merupakan diagnosis medis profesional.</p>
        </div>
      </div>
    </footer>
  );
}
