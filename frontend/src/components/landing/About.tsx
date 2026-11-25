import { ScanFace, Sparkles, FlaskConical } from "lucide-react";

const features = [
  {
    icon: ScanFace,
    title: "AI-Powered Detection",
    description:
      "Deteksi visual lima kondisi utama kulit, yaitu Acne, Komedo, Dark Spots, Kemerahan, dan Garis Halus menggunakan teknologi Computer Vision dan deep learning.",
    label: "YOLO11n Multi-Class Precision",
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    description:
      "Rekomendasi bahan aktif dan panduan perawatan yang disesuaikan dengan profil serta kebutuhan kulit berdasarkan hasil analisis.",
    label: "Evidence-Based Curation",
  },
  {
    icon: FlaskConical,
    title: "Ingredient Awareness",
    description:
      "Informasi kompatibilitas kandungan aktif untuk membantu pengguna memahami potensi iritasi, over-exfoliation, dan interaksi bahan skincare.",
    label: "Safety & Harmony Index",
  },
];

export default function About() {
  return (
    <section id="about" className="w-full bg-[#F4F4ED] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#566251]">
            Scientific Rigor & Vision
          </span>

          <h2 className="font-serif text-3xl font-normal tracking-tight text-[#1A1C18] md:text-[40px] md:leading-[1.2]">
            More Than Skin Analysis.
          </h2>

          <p className="max-w-3xl text-[15px] leading-7 text-[#444841] md:text-[17px] md:leading-8">
            Skinova AI menggabungkan Computer Vision (YOLO11n & OpenCV) dengan
            pemahaman dermatologis terapan untuk menerjemahkan kondisi tampak
            pada kulit menjadi wawasan rutinitas yang terstruktur, rasional, dan
            aman.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex flex-col justify-between space-y-8 rounded-2xl bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A2AF9B]/20 text-[#566251]">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[22px] font-medium leading-[30px] text-[#1A1C18]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] leading-6 text-[#444841]">
                    {feature.description}
                  </p>
                </div>

                {/* Technology Label */}
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#566251]">
                  {feature.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
