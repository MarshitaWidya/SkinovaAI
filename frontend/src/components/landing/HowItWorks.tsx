import { Activity, Camera, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: Camera,
    number: "01",
    title: "Ambil Foto Wajah",
    description:
      "Gunakan kamera atau unggah foto wajah dengan pencahayaan yang baik agar sistem dapat melakukan analisis.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Pemeriksaan Kualitas",
    description:
      "Sistem akan memeriksa kualitas foto, termasuk pencahayaan, ketajaman, dan keberadaan wajah.",
  },
  {
    icon: Activity,
    number: "03",
    title: "Analisis dan Insight",
    description:
      "Model AI membantu mengenali indikasi kondisi kulit dan memberikan informasi serta rekomendasi perawatan.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold tracking-[.2em] text-violet">
          PROSES SEDERHANA
        </span>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Dari foto menjadi insight
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          Alur Skinova dirancang agar pengguna dapat memahami setiap tahap
          analisis kulit dengan mudah.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="rounded-2xl border border-violet-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/50"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-lilac text-violet">
                  <Icon size={22} />
                </span>

                <span className="text-sm font-bold text-violet">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 font-semibold text-ink">{step.title}</h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
