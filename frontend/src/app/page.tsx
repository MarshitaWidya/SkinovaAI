import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  ClipboardCheck,
  ScanFace,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Capture your skin",
    description:
      "Ambil foto wajah secara langsung atau unggah foto dengan pencahayaan yang cukup.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Share your skin profile",
    description:
      "Lengkapi informasi jenis kulit, kebiasaan, dan rutinitas skincare yang sedang digunakan.",
  },
  {
    number: "03",
    icon: ScanFace,
    title: "Discover your skin insight",
    description:
      "Sistem AI menganalisis foto dan memberikan informasi indikasi kondisi kulit beserta rekomendasi edukatif.",
  },
];

const educationItems = [
  {
    category: "SKINCARE BASICS",
    title: "Memahami dasar perawatan kulit wajah",
    description:
      "Kenali langkah dasar untuk menjaga kebersihan dan kesehatan skin barrier.",
    icon: Sparkles,
  },
  {
    category: "ACTIVE INGREDIENTS",
    title: "Mengenal kandungan aktif skincare",
    description:
      "Pelajari fungsi kandungan seperti niacinamide, salicylic acid, dan retinol.",
    icon: BookOpen,
  },
  {
    category: "DAILY ROUTINE",
    title: "Membangun rutinitas skincare",
    description:
      "Pahami rutinitas pagi dan malam yang dapat disesuaikan dengan kebutuhan kulit.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/* ABOUT */}
        <section id="about" className="scroll-mt-24 py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <span className="section-label">ABOUT SKINOVA AI</span>

              <h2 className="editorial-heading mt-5 max-w-xl text-4xl text-[#30352F] sm:text-5xl">
                A little more understanding, a better way to care.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-8 text-[#777D73]">
                Skinova AI merupakan platform edukasi dan analisis kulit wajah
                yang memanfaatkan teknologi Artificial Intelligence untuk
                membantu pengguna mengenali indikasi kondisi kulit.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-8 text-[#777D73]">
                Melalui pemindaian wajah dan informasi mengenai kebiasaan
                perawatan, Skinova AI menyajikan insight serta rekomendasi
                edukatif yang dapat menjadi langkah awal untuk memahami
                kebutuhan kulit.
              </p>

              <Link
                href="/analysis"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#65765F] hover:text-[#3F503A]"
              >
                Kenali kondisi kulitmu
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-[#E4E8DD]" />

              <div className="relative grid min-h-[360px] place-items-center overflow-hidden rounded-[180px_180px_24px_24px] bg-[#DDE2D6] p-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EAEADF] via-[#DCE2D5] to-[#B8C5B1]" />

                <div className="relative max-w-sm text-center">
                  <Sparkles
                    size={34}
                    strokeWidth={1.2}
                    className="mx-auto text-[#687A61]"
                  />

                  <p className="font-editorial mt-7 text-4xl italic text-[#465342]">
                    Your skin is unique.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[#65715E]">
                    Start by understanding what it needs.
                  </p>
                </div>

                <span className="absolute bottom-6 text-[9px] tracking-[0.2em] text-[#788572]">
                  SKINOVA AI · SKIN INSIGHT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="scroll-mt-24 border-y border-[#e8e8dc] bg-[#F1F1E8] py-24 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-label">HOW IT WORKS</span>

              <h2 className="editorial-heading mt-5 text-4xl text-[#30352F] sm:text-5xl">
                Your skin journey, made simple.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#777D73]">
                Tiga langkah sederhana untuk mendapatkan gambaran awal mengenai
                kondisi kulit wajahmu.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="rounded-2xl border border-[#e2e4d9] bg-[#FAF9EE] p-7"
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#E5E9DF] text-[#697A63]">
                        <Icon size={21} />
                      </div>

                      <span className="font-editorial text-2xl italic text-[#A2AF9B]">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-editorial mt-8 text-2xl text-[#394136]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#7B8075]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link href="/analysis" className="sage-button">
                Mulai perjalanan kulitmu
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* EDUCATION PREVIEW */}
        <section className="py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="section-label">SKIN KNOWLEDGE</span>

                <h2 className="editorial-heading mt-5 max-w-xl text-4xl text-[#30352F] sm:text-5xl">
                  Learn to care for your skin.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#777D73]">
                  Temukan informasi seputar skincare, kandungan aktif, dan
                  kebiasaan yang mendukung perawatan kulit.
                </p>
              </div>

              <Link
                href="/education"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#65765F] hover:text-[#3F503A]"
              >
                Lihat semua edukasi
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {educationItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    href="/education"
                    key={item.title}
                    className="group overflow-hidden rounded-2xl border border-[#e6e6dc] bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div
                      className={`grid aspect-[16/10] place-items-center ${
                        index === 0
                          ? "bg-[#E8E9DF]"
                          : index === 1
                            ? "bg-[#E8E2D9]"
                            : "bg-[#E2E7DE]"
                      }`}
                    >
                      <Icon
                        size={43}
                        strokeWidth={1.1}
                        className="text-[#75836E]"
                      />
                    </div>

                    <div className="p-6">
                      <p className="text-[10px] font-bold tracking-[0.16em] text-[#819078]">
                        {item.category}
                      </p>

                      <h3 className="font-editorial mt-3 text-2xl text-[#3B4338]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#85897F]">
                        {item.description}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#65765F]">
                        Baca selengkapnya
                        <ArrowRight
                          size={14}
                          className="transition group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* MEDICAL DISCLAIMER */}
        <section className="px-5 pb-24 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-[#e2e4d9] bg-[#E9EADF] p-7 sm:flex-row sm:items-start sm:p-10">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#75836E]">
              <ShieldCheck size={23} />
            </div>

            <div>
              <span className="section-label">A FRIENDLY REMINDER</span>

              <h2 className="font-editorial mt-3 text-3xl text-[#3D4639]">
                Your skin deserves informed care.
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-[#73796D]">
                Hasil analisis Skinova AI merupakan estimasi berdasarkan deteksi
                model AI dan informasi yang diberikan pengguna. Informasi serta
                rekomendasi yang ditampilkan bersifat edukatif, bukan diagnosis
                atau pengganti konsultasi dengan dokter kulit maupun tenaga
                medis profesional.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
