"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  readTime: string;
  color: string;
  keywords: string;
};

const articles: Article[] = [
  {
    slug: "jenis-permasalahan-kulit",
    title: "Mengenal Jenis Permasalahan Kulit dan Cara Mengidentifikasinya",
    description:
      "Kenali berbagai kondisi kulit wajah, mulai dari jerawat, komedo, kemerahan, hingga noda hitam.",
    category: "skin-concerns",
    categoryLabel: "Skin Concerns",
    readTime: "6 menit",
    color: "bg-[#E9E3D9]",
    keywords: "acne jerawat blackheads komedo redness kemerahan dark spots",
  },
  {
    slug: "salicylic-acid",
    title: "Salicylic Acid: Solusi untuk Kulit Berjerawat dan Berminyak",
    description:
      "Pelajari cara kerja Salicylic Acid, manfaatnya, serta hal yang perlu diperhatikan saat menggunakannya.",
    category: "ingredients",
    categoryLabel: "Ingredients",
    readTime: "5 menit",
    color: "bg-[#E4E9DF]",
    keywords: "bha salicylic acid minyak pori acne jerawat",
  },
  {
    slug: "basic-skincare",
    title: "Panduan Basic Skincare untuk Pemula",
    description:
      "Mulai rutinitas skincare dari langkah paling sederhana untuk menjaga kesehatan kulit.",
    category: "routine",
    categoryLabel: "Skincare Routine",
    readTime: "4 menit",
    color: "bg-[#F1E5DB]",
    keywords: "cleanser moisturizer sunscreen pemula basic routine",
  },
  {
    slug: "perawatan-kulit-berjerawat",
    title: "Cara Merawat Kulit Berjerawat dengan Tepat",
    description:
      "Memahami rutinitas perawatan, kebiasaan yang perlu dihindari, dan cara menjaga kulit berjerawat.",
    category: "skin-concerns",
    categoryLabel: "Skin Concerns",
    readTime: "7 menit",
    color: "bg-[#E8DFE5]",
    keywords: "acne jerawat breakout perawatan kulit",
  },
  {
    slug: "niacinamide",
    title: "Niacinamide dan Manfaatnya untuk Kesehatan Kulit",
    description:
      "Kenali fungsi Niacinamide untuk membantu menjaga skin barrier, tampilan minyak, dan warna kulit.",
    category: "ingredients",
    categoryLabel: "Ingredients",
    readTime: "5 menit",
    color: "bg-[#E2E8E8]",
    keywords: "niacinamide vitamin b3 serum dark spots minyak",
  },
  {
    slug: "skin-barrier",
    title: "Skin Barrier: Fungsi dan Cara Menjaganya",
    description:
      "Mengapa skin barrier penting dan bagaimana mengenali tanda ketika lapisan pelindung kulit terganggu.",
    category: "skin-health",
    categoryLabel: "Skin Health",
    readTime: "6 menit",
    color: "bg-[#EFE7D8]",
    keywords: "skin barrier kulit kering iritasi sensitif hidrasi",
  },
];

const categories = [
  { id: "all", label: "Semua Artikel" },
  { id: "skin-concerns", label: "Skin Concerns" },
  { id: "ingredients", label: "Skincare Ingredients" },
  { id: "routine", label: "Skincare Routine" },
  { id: "skin-health", label: "Skin Health" },
];

const relatedArticles = [
  {
    slug: "retinol",
    category: "Ingredients",
    title: "Retinol: Panduan Penggunaan untuk Pemula",
    description:
      "Memahami manfaat retinol, cara memulai, dan hal yang perlu diperhatikan.",
    color: "bg-[#E9E3D9]",
  },
  {
    slug: "skin-barrier",
    category: "Skin Health",
    title: "Indikator Kerusakan Barrier Kulit yang Kerap Terabaikan",
    description:
      "Kenali tanda-tanda kulit membutuhkan perhatian ekstra dan perawatan yang lebih lembut.",
    color: "bg-[#E2E8E8]",
  },
  {
    slug: "skincare-ingredients",
    category: "Ingredients",
    title: "Memahami Kombinasi Kandungan dalam Skincare",
    description:
      "Pelajari cara menggunakan bahan aktif dalam rutinitas skincare dengan lebih bijak.",
    color: "bg-[#E4E9DF]",
  },
];

export default function EducationPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "all" || article.category === activeCategory;

      const searchableText =
        `${article.title} ${article.description} ${article.keywords}`.toLowerCase();

      const matchesSearch = searchableText.includes(
        searchQuery.toLowerCase().trim(),
      );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#292B27]">
      {/* HERO */}
      <section className="px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-5 inline-flex items-center rounded-full border border-[#D9DED3] bg-[#EEF1E9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#566251]">
                Skinova AI Education
              </span>

              <h1 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Kenali Kulitmu.
                <br />
                <span className="font-serif italic text-[#75816B]">
                  Rawat dengan Bijak.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#6B6D65] sm:text-lg">
                Temukan informasi seputar kesehatan kulit, bahan aktif skincare,
                dan rutinitas perawatan berdasarkan informasi yang mudah
                dipahami.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#articles"
                  className="inline-flex items-center justify-center rounded-full bg-[#566251] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#414B3D]"
                >
                  Jelajahi Artikel
                  <span className="ml-3">→</span>
                </a>

                <Link
                  href="/analysis"
                  className="inline-flex items-center justify-center rounded-full border border-[#D8D8CF] px-7 py-3.5 text-sm font-semibold text-[#566251] transition hover:bg-[#F0F0E9]"
                >
                  Analisis Kulit AI
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#77796F]">
                <span>Informasi perawatan kulit</span>
                <span className="hidden sm:inline">•</span>
                <span>Edukasi bahan aktif</span>
                <span className="hidden sm:inline">•</span>
                <span>Panduan skincare</span>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-[#E8E8DF] sm:min-h-[430px]">
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#D0D8C6]" />
              <div className="absolute -bottom-20 -left-12 h-72 w-72 rounded-full bg-[#D9CDBB]" />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -left-5 top-12 h-36 w-36 rounded-full bg-[#B9C2AF]/60 blur-sm" />

                  <div className="relative rounded-[2rem] border border-white/60 bg-white/55 p-7 shadow-xl backdrop-blur-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#68735E]">
                        Skin Knowledge
                      </span>
                      <span className="text-[#75816B]">✦</span>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl bg-[#F5F3ED] p-5">
                        <div className="mb-3 h-2 w-20 rounded-full bg-[#B8C2AD]" />
                        <p className="font-serif text-xl text-[#3D4638]">
                          Skin concerns
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#7A7C72]">
                          Memahami kondisi kulit dari tanda-tandanya.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[#E2E7DD] p-4">
                          <p className="text-xs text-[#67725F]">Ingredients</p>
                          <p className="mt-2 font-serif text-lg text-[#3D4638]">
                            Niacinamide
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#EAE1D7] p-4">
                          <p className="text-xs text-[#806C5D]">Routine</p>
                          <p className="mt-2 font-serif text-lg text-[#57493E]">
                            Skin basics
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-5 -right-3 rounded-full bg-white px-5 py-3 shadow-lg">
                    <span className="text-xs font-semibold text-[#566251]">
                      Learn • Understand • Care
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH + CATEGORY */}
      <section className="px-5 pb-20 pt-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* KNOWLEDGE LIBRARY HEADER */}
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89917E]">
              Knowledge Library
            </span>

            <h2 className="mt-3 font-serif text-3xl font-medium text-[#292B27] sm:text-4xl">
              Jelajahi Edukasi Kulit
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#77796F] sm:text-base">
              Temukan informasi dan panduan seputar kesehatan kulit, kandungan
              skincare, serta rutinitas perawatan yang sesuai dengan kebutuhan
              kulitmu.
            </p>
          </div>

          {/* Search */}
          <div className="mb-7 mx-auto w-full">
            <div className="flex w-full items-center rounded-full border border-[#E2E0D9] bg-[#FAF9F6] px-5 py-3.5 transition focus-within:border-[#89917E] focus-within:ring-2 focus-within:ring-[#89917E]/10">
              <span className="mr-3 text-lg text-[#89917E]">⌕</span>

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari artikel, bahan aktif, atau kondisi kulit..."
                aria-label="Cari artikel edukasi"
                className="w-full bg-transparent text-sm text-[#292B27] outline-none placeholder:text-[#A0A096]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="ml-3 text-sm text-[#77796F] hover:text-[#292B27]"
                  aria-label="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="flex w-full flex-wrap items-center justify-center gap-3 pb-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#566251] text-white"
                      : "bg-[#F1F0EB] text-[#77796F] hover:bg-[#E6E5DD]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <p className="text-sm text-[#77796F]">
              {filteredArticles.length} artikel ditemukan
            </p>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/education/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E8E5DE] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Article visual */}
                  <div
                    className={`relative flex h-52 items-center justify-center overflow-hidden ${article.color}`}
                  >
                    <div className="absolute h-40 w-40 rounded-full bg-white/30 transition duration-500 group-hover:scale-110" />

                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/70 bg-white/40 backdrop-blur-sm">
                      <span className="font-serif text-4xl text-[#566251]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#566251] backdrop-blur-sm">
                      {article.categoryLabel}
                    </span>
                  </div>

                  {/* Article content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-[#8A8B82]">
                      <span>{article.readTime} membaca</span>
                      <span>•</span>
                      <span>Skinova Education</span>
                    </div>

                    <h3 className="text-lg font-semibold leading-7 text-[#292B27] transition group-hover:text-[#68735E]">
                      {article.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-7 text-[#77796F]">
                      {article.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#F0EEE8] pt-4">
                      <span className="text-sm font-semibold text-[#566251]">
                        Baca Artikel
                      </span>

                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#E8E5DE] bg-white px-6 py-16 text-center">
              <h3 className="font-serif text-2xl">Artikel tidak ditemukan</h3>

              <p className="mt-3 text-sm text-[#77796F]">
                Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-6 rounded-full bg-[#566251] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#414B3D]"
              >
                Tampilkan Semua Artikel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MEDICAL NOTICE */}
      <section className="px-5 pb-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#E5DFD3] bg-[#F3EFE7] p-6 sm:p-8">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4DDD0] text-[#756956]">
                !
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#514A3E]">
                  Pemberitahuan Medis
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#756F63]">
                  Informasi pada halaman Education Skinova AI ditujukan untuk
                  edukasi dan membantu pengguna memahami perawatan kulit.
                  Informasi serta hasil analisis AI bukan diagnosis medis dan
                  tidak menggantikan konsultasi dengan dokter kulit atau tenaga
                  medis profesional. Kondisi kulit setiap individu dapat
                  berbeda. Apabila mengalami keluhan yang menetap, memburuk,
                  atau menimbulkan rasa tidak nyaman, konsultasikan dengan
                  tenaga medis profesional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
