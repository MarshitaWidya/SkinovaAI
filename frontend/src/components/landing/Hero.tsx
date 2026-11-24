import { ArrowRight, ScanFace, ShieldCheck, Sparkles } from "lucide-react";
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-24 h-[500px] w-[500px] rounded-full bg-violet-100/70 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-semibold text-violet">
            <Sparkles size={14} /> SMART SKIN INSIGHT
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Kenali kulitmu, <span className="text-violet">rawat dengan</span>{" "}
            lebih tepat.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
            Kenali indikasi kondisi kulit melalui pemindaian wajah dan dapatkan
            informasi perawatan yang lebih terarah. Mulai dengan foto yang jelas
            dan pencahayaan yang baik.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#scanner"
              className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
            >
              Mulai pemindaian <ArrowRight size={17} />
            </a>
            <a
              href="#cara-kerja"
              className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink hover:border-violet"
            >
              Pelajari cara kerja
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-violet" /> Privasi
              diutamakan
            </span>
            <span className="flex items-center gap-2">
              <ScanFace size={16} className="text-violet" /> Panduan foto wajah
            </span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-violet-200 to-cyan-100 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between px-2 py-3">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  SKINOVA AI
                </p>
                <p className="font-semibold text-ink">Skin overview</p>
              </div>
              <span className="rounded-full bg-lilac px-3 py-1.5 text-xs font-semibold text-violet">
                Preview
              </span>
            </div>
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#e9e4ff] via-[#f7f4ff] to-[#dff5f3]">
              <div className="absolute h-56 w-44 rounded-[48%] border-2 border-dashed border-violet/50" />
              <div className="relative grid h-44 w-36 place-items-center rounded-[48%] bg-gradient-to-b from-[#e9c9b8] to-[#c99182] shadow-inner">
                <div className="absolute top-[42%] flex w-24 justify-between">
                  <span className="h-1 w-3 rounded-full bg-[#79534d]" />
                  <span className="h-1 w-3 rounded-full bg-[#79534d]" />
                </div>
                <div className="absolute top-[57%] h-3 w-5 rounded-b-full border-b-2 border-[#a45e61]" />
              </div>
              <span className="absolute bottom-4 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-medium text-ink backdrop-blur">
                Ilustrasi tampilan pemindaian
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 p-2 pt-4">
              {["Skin clarity", "Skin balance", "Skin comfort"].map((v) => (
                <div key={v} className="rounded-xl bg-[#faf9ff] p-3">
                  <div className="mb-2 h-1.5 rounded-full bg-violet-100">
                    <div className="h-1.5 w-2/3 rounded-full bg-violet-400" />
                  </div>
                  <p className="text-[10px] font-medium text-slate-500">{v}</p>
                  <p className="mt-1 text-xs font-semibold text-ink">
                    Akan dianalisis
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
