import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ScanFace,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[#e9e9df]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dfe3d8] bg-white/70 px-4 py-2">
            <Sparkles size={14} className="text-[#75866E]" />
            <span className="text-[10px] font-semibold tracking-[0.17em] text-[#66745F]">
              YOUR PERSONAL SKIN INSIGHT
            </span>
          </div>

          <h1 className="editorial-heading max-w-2xl text-[52px] text-[#30352F] sm:text-6xl lg:text-[76px]">
            Understand
            <br />
            your skin,
            <br />
            <span className="italic text-[#819078]">embrace</span> your
            <br />
            natural beauty.
          </h1>

          <p className="mt-7 max-w-lg text-sm leading-8 text-[#777D73] sm:text-base">
            Setiap kulit memiliki cerita yang berbeda. Kenali indikasi kondisi
            kulit wajahmu melalui teknologi AI dan temukan wawasan perawatan
            yang lebih sesuai dengan kebutuhanmu.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/analysis" className="sage-button">
              Mulai Analisis Kulit
              <ArrowUpRight size={16} />
            </Link>

            <Link href="/#how-it-works" className="outline-button">
              Pelajari Cara Kerja
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-7 border-t border-[#e5e6dc] pt-6">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-[#819078]" />
              <span className="text-xs text-[#777D73]">
                Informasi yang edukatif
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <ScanFace size={18} className="text-[#819078]" />
              <span className="text-xs text-[#777D73]">
                AI-assisted skin analysis
              </span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[510px]">
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#DCE2D5] opacity-60 blur-3xl" />

          <div className="relative rounded-[220px_220px_24px_24px] border border-white bg-[#E9E8DC] p-3 shadow-[0_25px_70px_rgba(70,80,62,0.12)]">
            <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-[210px_210px_17px_17px] bg-[#D7DCCF]">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E9E9DF] via-[#D9DED2] to-[#BFCAB9]" />

              <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
              <div className="absolute bottom-12 right-6 h-32 w-32 rounded-full bg-[#A2AF9B]/50 blur-2xl" />

              <div className="relative flex h-[270px] w-[220px] items-center justify-center">
                <div className="absolute h-[260px] w-[195px] rounded-[48%] border border-white/70" />

                <div className="relative h-[230px] w-[174px] rounded-[48%_48%_45%_45%] bg-gradient-to-b from-[#E6C9B4] via-[#D8B59D] to-[#B88E78] shadow-[inset_-14px_-12px_25px_rgba(111,76,57,0.12)]">
                  <div className="absolute left-7 right-7 top-[88px] flex justify-between">
                    <span className="h-2 w-5 rounded-full bg-[#655247]" />
                    <span className="h-2 w-5 rounded-full bg-[#655247]" />
                  </div>

                  <div className="absolute left-1/2 top-[112px] h-9 w-4 -translate-x-1/2 rounded-full border-r border-[#AD806B]/60" />

                  <div className="absolute left-1/2 top-[157px] h-4 w-9 -translate-x-1/2 rounded-b-full border-b-2 border-[#9E655F]" />
                </div>

                <div className="absolute inset-0 rounded-[48%] border border-dashed border-white/80" />
              </div>

              <div className="absolute bottom-7 left-5 right-5 rounded-2xl border border-white/70 bg-white/70 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.2em] text-[#819078]">
                      SKINOVA AI
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#41483E]">
                      Your skin overview
                    </p>
                  </div>

                  <span className="rounded-full bg-[#E3E8DE] px-3 py-1.5 text-[10px] font-semibold text-[#64735D]">
                    AI Insight
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["Skin texture", "Skin tone", "Skin health"].map((item) => (
                    <div key={item} className="rounded-xl bg-[#F4F4EC] p-2.5">
                      <div className="mb-2 h-1 rounded-full bg-[#DCE2D5]">
                        <div className="h-1 w-2/3 rounded-full bg-[#899881]" />
                      </div>
                      <p className="text-[9px] text-[#777D73]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-7 top-1/3 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-lg backdrop-blur-md sm:block">
            <Sparkles size={17} className="text-[#82917B]" />
            <p className="mt-2 text-xs font-semibold text-[#41483E]">
              Understand your skin
            </p>
            <p className="mt-1 text-[10px] text-[#899083]">
              One step at a time
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-6 lg:px-8">
        <span className="text-[10px] tracking-[0.18em] text-[#9A9E91]">
          SKINCARE STARTS WITH UNDERSTANDING
        </span>

        <a
          href="#about"
          className="flex items-center gap-2 text-[10px] font-semibold tracking-wider text-[#75836F]"
        >
          DISCOVER MORE
          <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
