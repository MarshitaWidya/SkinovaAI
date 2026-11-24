import Link from "next/link";
import { notFound } from "next/navigation";

type Article = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  introduction: string;
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];
  related: string[];
};

const articles: Article[] = [
  {
    slug: "jenis-permasalahan-kulit",
    title: "Mengenal Jenis Permasalahan Kulit dan Cara Mengidentifikasinya",
    category: "Skin Concerns",
    readTime: "6 menit",
    introduction:
      "Setiap orang dapat memiliki kondisi kulit yang berbeda. Memahami tanda-tanda pada kulit merupakan langkah awal untuk menentukan perawatan yang sesuai.",
    sections: [
      {
        heading: "1. Jerawat (Acne)",
        paragraphs: [
          "Jerawat merupakan kondisi kulit yang terjadi ketika folikel rambut tersumbat oleh minyak dan sel kulit mati. Jerawat dapat muncul dalam bentuk komedo, papula, pustula, maupun benjolan yang lebih dalam.",
          "Area wajah seperti dahi, hidung, pipi, dan dagu merupakan lokasi yang sering mengalami jerawat.",
        ],
        points: [
          "Munculnya benjolan atau bintik pada wajah.",
          "Terdapat komedo hitam maupun komedo putih.",
          "Sebagian jerawat dapat disertai kemerahan dan peradangan.",
        ],
      },
      {
        heading: "2. Kulit Berminyak",
        paragraphs: [
          "Kulit berminyak terjadi ketika kelenjar sebaceous menghasilkan sebum dalam jumlah yang relatif tinggi. Sebum sebenarnya membantu menjaga kelembapan kulit, tetapi produksi berlebih dapat membuat wajah terlihat mengilap.",
        ],
        points: [
          "Wajah terlihat mengilap, terutama pada area T-zone.",
          "Pori-pori dapat terlihat lebih besar.",
          "Kulit terasa lebih berminyak beberapa jam setelah dibersihkan.",
        ],
      },
      {
        heading: "3. Kulit Kering",
        paragraphs: [
          "Kulit kering terjadi ketika kulit kekurangan kelembapan atau tidak mampu mempertahankan air dengan baik. Kondisi ini dapat membuat permukaan kulit terasa kasar dan tidak nyaman.",
        ],
        points: [
          "Kulit terasa tertarik setelah mencuci wajah.",
          "Permukaan kulit tampak bersisik atau mengelupas.",
          "Kulit terasa kasar dan terkadang gatal.",
        ],
      },
      {
        heading: "4. Kemerahan pada Kulit",
        paragraphs: [
          "Kemerahan dapat muncul karena iritasi, sensitivitas, paparan lingkungan, atau kondisi kulit tertentu. Kemerahan yang terlihat tidak selalu menunjukkan penyebab yang sama.",
        ],
        points: [
          "Area wajah tampak lebih merah dari biasanya.",
          "Kulit dapat terasa panas, perih, atau gatal.",
          "Kemerahan dapat muncul pada area tertentu atau menyebar.",
        ],
      },
      {
        heading: "5. Dark Spots atau Noda Hitam",
        paragraphs: [
          "Dark spots merupakan area kulit yang tampak lebih gelap dibandingkan bagian sekitarnya. Salah satu penyebabnya adalah hiperpigmentasi, yaitu peningkatan produksi melanin pada area tertentu.",
        ],
        points: [
          "Muncul bintik atau bercak berwarna kecokelatan.",
          "Dapat terlihat setelah jerawat mereda.",
          "Warna dan ukuran noda dapat berbeda pada setiap orang.",
        ],
      },
      {
        heading: "Bagaimana Memulai Perawatan Kulit?",
        paragraphs: [
          "Kenali kondisi kulit terlebih dahulu sebelum memilih produk skincare. Mulailah dengan rutinitas sederhana seperti membersihkan wajah, menggunakan pelembap, dan memakai sunscreen pada pagi hari.",
          "Jika keluhan menetap, memburuk, atau disertai rasa sakit, konsultasikan dengan dokter kulit.",
        ],
      },
    ],
    related: ["perawatan-kulit-berjerawat", "basic-skincare", "skin-barrier"],
  },
  {
    slug: "salicylic-acid",
    title: "Salicylic Acid: Solusi untuk Kulit Berjerawat dan Berminyak",
    category: "Skincare Ingredients",
    readTime: "5 menit",
    introduction:
      "Salicylic Acid merupakan salah satu bahan aktif yang sering digunakan dalam produk perawatan kulit, terutama untuk membantu merawat kulit berminyak dan rentan berjerawat.",
    sections: [
      {
        heading: "Apa Itu Salicylic Acid?",
        paragraphs: [
          "Salicylic Acid termasuk kelompok beta hydroxy acid (BHA). Bahan ini bersifat larut dalam minyak sehingga dapat membantu membersihkan penumpukan sel kulit mati dan minyak pada pori-pori.",
        ],
      },
      {
        heading: "Manfaat Salicylic Acid",
        paragraphs: [
          "Salicylic Acid banyak digunakan dalam produk untuk kulit yang rentan mengalami penyumbatan pori-pori.",
        ],
        points: [
          "Membantu mengangkat sel kulit mati.",
          "Membantu membersihkan pori-pori yang tersumbat.",
          "Membantu merawat kulit yang rentan berkomedo dan berjerawat.",
          "Membantu mengurangi penumpukan minyak pada kulit.",
        ],
      },
      {
        heading: "Bagaimana Cara Menggunakannya?",
        paragraphs: [
          "Gunakan produk sesuai petunjuk pada kemasan. Jika baru pertama kali mencoba, mulailah secara bertahap dan perhatikan reaksi kulit.",
          "Gunakan pelembap untuk membantu menjaga kelembapan kulit dan sunscreen pada pagi atau siang hari.",
        ],
      },
      {
        heading: "Hal yang Perlu Diperhatikan",
        paragraphs: [
          "Penggunaan Salicylic Acid dapat menyebabkan kulit kering atau iritasi pada sebagian orang. Hindari penggunaan berlebihan dan jangan menggabungkan banyak bahan aktif sekaligus tanpa memahami kecocokannya.",
          "Hentikan penggunaan jika terjadi reaksi yang mengganggu dan konsultasikan dengan tenaga medis jika diperlukan.",
        ],
      },
    ],
    related: ["perawatan-kulit-berjerawat", "niacinamide", "basic-skincare"],
  },
  {
    slug: "basic-skincare",
    title: "Panduan Basic Skincare untuk Pemula",
    category: "Skincare Routine",
    readTime: "4 menit",
    introduction:
      "Memulai rutinitas skincare tidak harus menggunakan banyak produk. Rutinitas sederhana dan konsisten dapat menjadi langkah awal dalam menjaga kesehatan kulit.",
    sections: [
      {
        heading: "1. Cleanser (Pembersih Wajah)",
        paragraphs: [
          "Cleanser berfungsi membersihkan kotoran, minyak, sisa sunscreen, dan kotoran lain yang menempel pada wajah. Pilih pembersih yang sesuai dengan kondisi kulit dan tidak membuat kulit terasa terlalu kering.",
        ],
      },
      {
        heading: "2. Moisturizer (Pelembap)",
        paragraphs: [
          "Moisturizer membantu menjaga kelembapan kulit dan mendukung fungsi skin barrier. Kulit berminyak juga tetap membutuhkan pelembap.",
        ],
      },
      {
        heading: "3. Sunscreen (Tabir Surya)",
        paragraphs: [
          "Sunscreen membantu melindungi kulit dari paparan sinar ultraviolet. Gunakan sunscreen dengan perlindungan broad-spectrum minimal SPF 30 dan ikuti petunjuk pemakaian serta pengaplikasian ulang.",
        ],
      },
      {
        heading: "Urutan Basic Skincare",
        paragraphs: [
          "Urutan sederhana yang dapat digunakan sebagai panduan awal adalah:",
        ],
        points: [
          "Pagi: Cleanser, moisturizer, dan sunscreen.",
          "Malam: Cleanser dan moisturizer.",
        ],
      },
      {
        heading: "Tips untuk Pemula",
        paragraphs: [
          "Tidak perlu langsung mencoba banyak produk. Perkenalkan produk baru secara bertahap dan perhatikan reaksi kulit.",
          "Konsistensi lebih penting daripada menggunakan banyak produk sekaligus. Sesuaikan rutinitas dengan kebutuhan kulit masing-masing.",
        ],
      },
    ],
    related: ["skin-barrier", "niacinamide", "jenis-permasalahan-kulit"],
  },
  {
    slug: "perawatan-kulit-berjerawat",
    title: "Cara Merawat Kulit Berjerawat dengan Tepat",
    category: "Skin Concerns",
    readTime: "7 menit",
    introduction:
      "Kulit berjerawat membutuhkan perawatan yang konsisten dan tidak berlebihan. Memahami kebiasaan yang tepat dapat membantu menjaga kondisi kulit.",
    sections: [
      {
        heading: "Mengapa Jerawat Bisa Muncul?",
        paragraphs: [
          "Jerawat dapat terbentuk ketika folikel rambut tersumbat oleh minyak dan sel kulit mati. Perubahan hormon, faktor genetik, dan beberapa faktor lingkungan juga dapat berperan.",
        ],
      },
      {
        heading: "Rutinitas Perawatan Kulit Berjerawat",
        paragraphs: [
          "Mulailah dengan rutinitas dasar yang lembut. Bersihkan wajah secara teratur, gunakan pelembap, dan lindungi kulit dari sinar matahari.",
        ],
        points: [
          "Gunakan cleanser yang lembut.",
          "Pilih moisturizer yang sesuai dengan kondisi kulit.",
          "Gunakan sunscreen pada pagi hari.",
          "Pilih bahan aktif sesuai kebutuhan kulit dan petunjuk pemakaian.",
        ],
      },
      {
        heading: "Kebiasaan yang Sebaiknya Dihindari",
        paragraphs: [
          "Beberapa kebiasaan dapat memperburuk iritasi dan membuat jerawat lebih sulit ditangani.",
        ],
        points: [
          "Memencet atau menggaruk jerawat.",
          "Menggosok wajah terlalu keras.",
          "Menggunakan terlalu banyak bahan aktif sekaligus.",
          "Mengabaikan kelembapan kulit.",
        ],
      },
      {
        heading: "Kapan Harus Berkonsultasi?",
        paragraphs: [
          "Jika jerawat terasa nyeri, meninggalkan bekas luka, semakin parah, atau tidak membaik dengan perawatan biasa, konsultasikan dengan dokter kulit untuk mendapatkan penanganan yang sesuai.",
        ],
      },
    ],
    related: ["salicylic-acid", "basic-skincare", "niacinamide"],
  },
  {
    slug: "niacinamide",
    title: "Niacinamide dan Manfaatnya untuk Kesehatan Kulit",
    category: "Skincare Ingredients",
    readTime: "5 menit",
    introduction:
      "Niacinamide merupakan salah satu bentuk vitamin B3 yang banyak digunakan dalam produk skincare. Kandungan ini dikenal karena manfaatnya dalam mendukung kesehatan dan fungsi pelindung kulit.",
    sections: [
      {
        heading: "Apa Itu Niacinamide?",
        paragraphs: [
          "Niacinamide merupakan bahan aktif yang dapat ditemukan dalam berbagai produk perawatan kulit seperti serum, moisturizer, dan toner.",
        ],
      },
      {
        heading: "Manfaat Niacinamide",
        paragraphs: [
          "Niacinamide memiliki beberapa manfaat yang membuatnya sering digunakan dalam rutinitas perawatan kulit.",
        ],
        points: [
          "Membantu mendukung fungsi skin barrier.",
          "Membantu menjaga kelembapan kulit.",
          "Membantu mengurangi tampilan minyak berlebih.",
          "Membantu menyamarkan tampilan noda gelap secara bertahap.",
        ],
      },
      {
        heading: "Bagaimana Cara Menggunakannya?",
        paragraphs: [
          "Gunakan produk Niacinamide sesuai petunjuk pada kemasan. Kandungan ini tersedia dalam berbagai konsentrasi dan bentuk produk.",
          "Jika baru pertama kali menggunakannya, coba secara bertahap dan perhatikan reaksi kulit.",
        ],
      },
      {
        heading: "Apakah Cocok untuk Semua Jenis Kulit?",
        paragraphs: [
          "Niacinamide umumnya digunakan dalam berbagai jenis produk skincare, tetapi kecocokan tetap dapat berbeda pada setiap orang. Jika muncul iritasi, hentikan penggunaan dan evaluasi produk yang digunakan.",
        ],
      },
    ],
    related: ["skin-barrier", "salicylic-acid", "basic-skincare"],
  },
  {
    slug: "skin-barrier",
    title: "Skin Barrier: Fungsi dan Cara Menjaganya",
    category: "Skin Health",
    readTime: "6 menit",
    introduction:
      "Skin barrier merupakan lapisan pelindung kulit yang membantu menjaga kelembapan dan melindungi kulit dari faktor lingkungan. Menjaganya merupakan bagian penting dari rutinitas skincare.",
    sections: [
      {
        heading: "Apa Itu Skin Barrier?",
        paragraphs: [
          "Skin barrier merupakan bagian terluar dari lapisan kulit yang berperan sebagai pelindung. Lapisan ini membantu mengurangi kehilangan air dan melindungi kulit dari paparan lingkungan.",
        ],
      },
      {
        heading: "Tanda Skin Barrier Mengalami Gangguan",
        paragraphs: [
          "Ketika fungsi pelindung kulit terganggu, kulit dapat menjadi lebih mudah mengalami ketidaknyamanan.",
        ],
        points: [
          "Kulit terasa kering atau tertarik.",
          "Kulit lebih mudah mengalami kemerahan.",
          "Muncul rasa perih atau sensitif.",
          "Permukaan kulit terasa kasar atau mengelupas.",
        ],
      },
      {
        heading: "Faktor yang Dapat Mengganggu Skin Barrier",
        paragraphs: [
          "Penggunaan produk yang terlalu keras, eksfoliasi berlebihan, dan kebiasaan membersihkan wajah secara berlebihan dapat mengganggu kondisi pelindung kulit.",
        ],
      },
      {
        heading: "Cara Menjaga Skin Barrier",
        paragraphs: [
          "Perawatan yang sederhana dan konsisten dapat membantu menjaga fungsi pelindung kulit.",
        ],
        points: [
          "Gunakan pembersih wajah yang lembut.",
          "Gunakan moisturizer secara teratur.",
          "Gunakan sunscreen pada pagi hari.",
          "Hindari eksfoliasi secara berlebihan.",
          "Perkenalkan bahan aktif secara bertahap.",
        ],
      },
    ],
    related: ["basic-skincare", "niacinamide", "jenis-permasalahan-kulit"],
  },
];

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.related
    .map((relatedSlug) => articles.find((item) => item.slug === relatedSlug))
    .filter((item): item is Article => Boolean(item));

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#292B27]">
      {/* ARTICLE HEADER */}
      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/education"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#68735E] transition hover:text-[#414B3D]"
          >
            ← Kembali ke Education
          </Link>

          <div className="mt-10">
            <span className="inline-flex rounded-full bg-[#E8EDE3] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#566251]">
              {article.category}
            </span>

            <h1 className="mt-6 font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#77796F]">
              {article.introduction}
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#898B81]">
              <span>Skinova Education</span>
              <span>•</span>
              <span>{article.readTime} membaca</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-5 pb-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex min-h-52 items-center justify-center overflow-hidden rounded-[2rem] bg-[#E8E8DF]">
            <div className="text-center">
              <span className="font-serif text-5xl text-[#566251]">
                Skinova
              </span>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#75816B]">
                Skin Knowledge
              </p>
            </div>
          </div>

          <article className="rounded-3xl border border-[#E8E5DE] bg-white p-6 sm:p-10">
            {article.sections.map((section, index) => (
              <section
                key={index}
                className={
                  index === 0 ? "" : "mt-10 border-t border-[#F0EEE8] pt-8"
                }
              >
                <h2 className="font-serif text-2xl font-semibold text-[#414B3D]">
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="mt-4 text-sm leading-8 text-[#686B62] sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.points && (
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="flex gap-3 text-sm leading-7 text-[#686B62] sm:text-base"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#89977D]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="bg-[#F0F0E9] px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#89917E]">
            Recommended for You
          </p>

          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            Rekomendasi Artikel Terkait
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#77796F]">
            Pelajari topik lainnya untuk memperluas pemahamanmu tentang
            kesehatan dan perawatan kulit.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/education/${related.slug}`}
                className="group rounded-3xl border border-[#E1DED6] bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-[#89917E]">
                  {related.category}
                </span>

                <h3 className="mt-3 text-lg font-semibold leading-7 text-[#292B27] transition group-hover:text-[#68735E]">
                  {related.title}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#566251]">
                  Baca Selengkapnya
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI ANALYSIS CTA */}
      <section className="px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#566251] px-7 py-10 text-white sm:px-12 sm:py-14 lg:px-16">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#E2E8DD]">
                  Skinova AI Personalization
                </span>

                <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
                  Ingin Mengenal Kondisi Kulitmu Lebih Jauh?
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                  Coba fitur analisis kulit Skinova AI untuk memperoleh
                  informasi awal mengenai kondisi kulit dan rekomendasi
                  perawatan yang relevan.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                <Link
                  href="/analysis"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#E5E9DE] px-7 py-4 text-sm font-semibold text-[#414B3D] transition hover:bg-white sm:w-auto"
                >
                  Mulai Analisis Kulit
                  <span>→</span>
                </Link>

                <p className="text-xs leading-6 text-white/60 lg:text-right">
                  Hasil analisis AI bersifat informatif dan bukan diagnosis
                  medis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEDICAL NOTICE */}
      <section className="px-5 pb-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#E5DFD3] bg-[#F3EFE7] p-6 sm:p-8">
            <h2 className="text-sm font-semibold text-[#514A3E]">
              Pemberitahuan Medis
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#756F63]">
              Artikel ini ditujukan untuk edukasi dan membantu pengguna memahami
              perawatan kulit. Informasi di dalamnya bukan diagnosis medis dan
              tidak menggantikan konsultasi dengan dokter kulit atau tenaga
              medis profesional. Jika mengalami keluhan yang menetap atau
              memburuk, konsultasikan dengan tenaga medis.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
