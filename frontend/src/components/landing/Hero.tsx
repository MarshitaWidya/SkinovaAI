import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  ScanFace,
} from "lucide-react";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-7xl min-h-screen overflow-hidden px-6 pb-12 lg:px-12 lg:pb-24 pt-28 md:pt-32 lg:pt-36">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 lg:mt-5">
        {/* Left Column */}
        <div className="relative z-10 flex flex-col items-start space-y-8 lg:col-span-7">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="max-w-2xl font-['Newsreader'] text-4xl font-normal leading-[1.1] tracking-tight text-[#1A1C18] sm:text-5xl lg:text-[56px]">
              Understand Your Skin,{" "}
              <span className="italic">Care With Confidence.</span>
            </h1>

            <p className="max-w-xl text-[15px] leading-7 text-[#444841] md:text-[17px] md:leading-8">
              Kenali kondisi kulitmu lebih dalam melalui teknologi AI dan
              temukan informasi perawatan yang sesuai dengan kebutuhan kulitmu
              secara terarah dan terpercaya.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/analysis"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#566251] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:opacity-90"
            >
              <span>Mulai Analisis Kulit</span>
              <ArrowRight size={17} />
            </a>

            <a
              href="#cara-kerja"
              className="inline-flex items-center justify-center rounded-full bg-[#F4F4ED] px-7 py-3.5 text-sm font-semibold text-[#1A1C18] transition-colors duration-200 hover:bg-[#E8E9E2]"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 text-xs text-[#444841]/80">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#566251]" />
              <span>Tervalidasi 5 Kategori</span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-[#C5C8BF] sm:block" />

            <div className="flex items-center gap-2">
              <LockKeyhole size={16} className="text-[#566251]" />
              <span>Privasi Terjamin</span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-[#C5C8BF] sm:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#566251]" />
              <span>Bebas Biaya</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Portrait */}
        <div className="relative lg:col-span-5 sm:display-none lg:block">
          <div className="relative mx-auto max-w-md lg:max-w-none hidden lg:block">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute -inset-4 -rotate-1 rounded-3xl bg-[#F4F4ED]" />

            {/* Portrait Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#E8E9E2]">
                <img
                  src="/images/hero.png"
                  alt="Editorial portrait wajah dengan tekstur kulit alami"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2F312D]/40 via-transparent to-transparent" />

              {/* Quality Validation Badge */}
              <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-xl bg-white/90 px-3.5 py-2 shadow-md backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-[#A2AF9B]" />

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#444841]">
                    Quality Validation
                  </p>

                  <p className="text-sm font-semibold text-[#1A1C18]">
                    Pemeriksaan Foto Aktif
                  </p>
                </div>
              </div>

              {/* Detection Categories Badge */}
              <div className="absolute inset-x-5 bottom-5 rounded-xl bg-white/95 p-4 shadow-md backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#444841]">
                    5 Deteksi Utama
                  </span>

                  <span className="text-[10px] font-semibold text-[#566251]">
                    YOLO11n Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Acne", "Komedo", "Flek Hitam", "Redness", "Wrinkles"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#EEEEE8] px-2.5 py-1 text-xs text-[#1A1C18]"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
