import {
  Camera,
  ScanSearch,
  ChartNoAxesColumn,
  CalendarDays,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Share Your Photo",
    description:
      "Unggah foto wajah dengan resolusi jelas atau ambil langsung melalui kamera dengan pencahayaan alami tanpa filter digital.",
    meta: "Format JPG, PNG, WEBP",
    icon: Camera,
  },
  {
    number: "02",
    title: "Skin Assessment",
    description:
      "Sistem memvalidasi ketajaman visual menggunakan OpenCV dan mendeteksi titik permasalahan kulit dengan inferensi model deep learning.",
    meta: "Real-time Inference",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Personalized Insights",
    description:
      "Jelajahi pemetaan area terdeteksi dengan skor confidence detail dan rekomendasi bahan aktif yang terarah sesuai temuan.",
    meta: "Probabilitas & Lokasi",
    icon: ChartNoAxesColumn,
  },
  {
    number: "04",
    title: "Understand Routine",
    description:
      "Pahami cara kerja zat aktif, urutan pemakaian harian (AM/PM), serta panduan peringatan interaksi zat demi menjaga skin barrier.",
    meta: "Panduan Terpadu",
    icon: CalendarDays,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12"
    >
      <div className="space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#566251]">
              Alur Metodologis
            </span>

            <h2 className="font-['Newsreader'] text-3xl font-normal tracking-tight text-[#1A1C18] md:text-[40px] md:leading-[1.2]">
              Cara Kerja Skinova AI
            </h2>
            <p className="max-w-3xl text-[15px] leading-7 text-[#444841] md:text-[17px] md:leading-8">
              Empat tahapan non-invasif dari potret digital hingga pembentukan
              pemahaman mandiri yang menyeluruh.
            </p>
          </div>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="flex flex-col justify-between space-y-8 rounded-2xl bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="space-y-6">
                  {/* Number */}
                  <div className="font-['Newsreader'] text-5xl font-normal leading-none text-[#A2AF9B] md:text-[56px]">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-['Newsreader'] text-[22px] font-medium leading-[30px] text-[#1A1C18]">
                      {step.title}
                    </h3>

                    <p className="text-[13px] leading-6 text-[#444841]">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="flex items-center gap-2 border-t border-[#E8E9E2] pt-4 text-xs text-[#444841]">
                  <Icon
                    size={15}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#566251]"
                  />

                  <span>{step.meta}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
