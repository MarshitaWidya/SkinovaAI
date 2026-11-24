"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, BookOpen, Clock3 } from "lucide-react";

const categories = [
  { id: "Semua", label: "Semua Artikel" },
  { id: "Dasar Skincare", label: "Dasar Skincare" },
  { id: "Bahan Aktif", label: "Bahan Aktif" },
  { id: "Masalah Kulit", label: "Masalah Kulit" },
  { id: "Perawatan Kulit", label: "Perawatan Kulit" },
];

const articles = [
  {
    slug: "jenis-permasalahan-kulit",
    title: "Mengenal Jenis dan Permasalahan Kulit Wajah",
    category: "Masalah Kulit",
    readTime: "5 menit membaca",
    description:
      "Kenali berbagai jenis kulit wajah dan permasalahan yang sering terjadi agar kamu dapat menentukan perawatan yang tepat.",
    image: "/image_edukasi/perawatan_kulit.jpg",
    imageAlt: "Ilustrasi permasalahan kulit wajah",
  },
  {
    slug: "salicylic-acid",
    title: "Salicylic Acid: Manfaat untuk Kulit Berjerawat",
    category: "Bahan Aktif",
    readTime: "4 menit membaca",
    description:
      "Pelajari cara kerja Salicylic Acid dalam membantu membersihkan pori-pori dan merawat kulit yang rentan berjerawat.",
    image: "/image_edukasi/salicylic_acid.jpg",
    imageAlt: "Serum Salicylic Acid dengan latar beige",
  },
  {
    slug: "basic-skincare",
    title: "Basic Skincare: Langkah Awal Merawat Kulit",
    category: "Dasar Skincare",
    readTime: "6 menit membaca",
    description:
      "Pahami tiga langkah dasar skincare yang penting untuk menjaga kebersihan dan kesehatan kulit wajah.",
    image: "/image_edukasi/dasar_skincare.jpg",
    imageAlt: "Rangkaian produk basic skincare",
  },
  {
    slug: "perawatan-kulit-berjerawat",
    title: "Cara Merawat Kulit Wajah yang Berjerawat",
    category: "Perawatan Kulit",
    readTime: "5 menit membaca",
    description:
      "Temukan kebiasaan perawatan yang dapat membantu menjaga kulit berjerawat agar tetap bersih dan terawat.",
    image: "/image_edukasi/perawatan_kulit2.jpg",
    imageAlt: "Ilustrasi perawatan wajah berjerawat",
  },
  {
    slug: "niacinamide",
    title: "Niacinamide dan Manfaatnya untuk Kulit",
    category: "Bahan Aktif",
    readTime: "4 menit membaca",
    description:
      "Kenali manfaat Niacinamide untuk membantu menjaga kelembapan, merawat tampilan warna kulit, dan mendukung skin barrier.",
    image: "/image_edukasi/niacinamide.jpg",
    imageAlt: "Ilustrasi serum Niacinamide",
  },
  {
    slug: "skin-barrier",
    title: "Skin Barrier: Pelindung Alami Kulit Wajah",
    category: "Dasar Skincare",
    readTime: "5 menit membaca",
    description:
      "Pelajari fungsi skin barrier, tanda-tanda kerusakannya, serta cara sederhana untuk menjaga lapisan pelindung kulit.",
    image: "/image_edukasi/skinbarrier.jpg",
    imageAlt: "Ilustrasi lapisan pelindung kulit",
  },
];

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "Semua" || article.category === activeCategory;

      const search = searchQuery.toLowerCase();

      const matchesSearch =
        article.title.toLowerCase().includes(search) ||
        article.description.toLowerCase().includes(search) ||
        article.category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#292B27]">
      {/* KNOWLEDGE LIBRARY */}
      <section
        id="knowledge-library"
        className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89917E]">
            Jelajahi dan Pelajari
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#30372D] md:text-4xl">
            Perpustakaan Pengetahuan Kulit
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#85867D]">
            Perluas pengetahuanmu tentang kulit melalui berbagai panduan
            perawatan dan informasi skincare yang telah kami rangkum.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mx-auto mb-7 w-full max-w-2xl">
          <div className="flex w-full items-center rounded-full border border-[#E2E0D9] bg-white px-5 py-3.5 transition focus-within:border-[#89917E] focus-within:ring-2 focus-within:ring-[#89917E]/10">
            <Search size={19} className="mr-3 shrink-0 text-[#89917E]" />

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

        {/* CATEGORY FILTER */}
        <div className="mb-12 flex w-full flex-wrap items-center justify-center gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
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

        {/* ARTICLE COUNT */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-[#85867D]">
            Menampilkan{" "}
            <span className="font-semibold text-[#566251]">
              {filteredArticles.length}
            </span>{" "}
            artikel
          </p>
        </div>

        {/* ARTICLE CARDS */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/education/${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#EAE8E0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#454D3C]/5"
              >
                {/* IMAGE */}
                <div className="aspect-[16/10] overflow-hidden bg-[#EEEDE7]">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#EEF0E9] px-3 py-1.5 text-xs font-medium text-[#69755F]">
                      {article.category}
                    </span>

                    <span className="flex shrink-0 items-center gap-1.5 text-xs text-[#96968D]">
                      <Clock3 size={13} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug text-[#30372D] transition group-hover:text-[#75836C]">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#85867D]">
                    {article.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#F0EFE9] pt-4">
                    <span className="text-sm font-medium text-[#68745F]">
                      Baca selengkapnya
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F2EC] text-[#68745F] transition group-hover:bg-[#566251] group-hover:text-white">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#DADBD1] py-16 text-center">
            <Search className="mx-auto text-[#A0A096]" size={30} />

            <h3 className="mt-4 text-lg font-semibold text-[#30372D]">
              Artikel tidak ditemukan
            </h3>

            <p className="mt-2 text-sm text-[#85867D]">
              Coba gunakan kata kunci atau kategori yang berbeda.
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
              className="mt-5 text-sm font-medium text-[#68745F] underline underline-offset-4"
            >
              Tampilkan semua artikel
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#EAE8E0] bg-[#F3F2ED] px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-semibold tracking-wide text-[#566251]">
            SKINOVA-AI
          </p>

          <p className="text-xs text-[#929287]">
            © 2026 Skinova-AI. Learn, Understand, and Care for Your Skin.
          </p>
        </div>
      </footer>
    </main>
  );
}
