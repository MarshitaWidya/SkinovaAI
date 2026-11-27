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
];

export default function DermatologyKnowledge() {
  return (
    <section
      id="edukasi"
      className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#566251]">
              Dermatology Knowledge
            </span>

            <h2 className="font-['Newsreader'] text-3xl leading-tight text-[#1A1C18] sm:text-4xl">
              Edukasi Dermatologis Pilihan
            </h2>
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#7A8075]">
            3 Topik Pilihan
          </span>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
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
      </div>
    </section>
  );
}
