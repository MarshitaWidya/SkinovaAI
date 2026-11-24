import { Sparkles, Brain, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Memanfaatkan teknologi Artificial Intelligence untuk membantu mengenali indikasi kondisi kulit wajah.",
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    description:
      "Memberikan informasi dan rekomendasi perawatan kulit berdasarkan hasil analisis serta informasi pengguna.",
  },
  {
    icon: ShieldCheck,
    title: "Easy and Accessible",
    description:
      "Menghadirkan pengalaman analisis kulit yang praktis, mudah dipahami, dan dapat diakses melalui website.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold tracking-[.2em] text-violet">
              TENTANG SKINOVA AI
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
              Kenali kulitmu, mulai perjalanan perawatan yang lebih tepat.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Skinova AI merupakan platform berbasis Artificial Intelligence
              yang membantu pengguna mengenali indikasi kondisi kulit wajah
              melalui teknologi analisis gambar.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Melalui analisis foto wajah, informasi kebiasaan, dan jenis kulit,
              Skinova AI memberikan insight serta rekomendasi perawatan yang
              dapat membantu pengguna memahami kebutuhan kulitnya.
            </p>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex gap-5 rounded-2xl border border-violet-100 bg-[#FAF9FF] p-5"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lilac text-violet">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-ink">{feature.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
