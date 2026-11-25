import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

const navigationLinks = [
  { label: "Beranda", href: "/" },
  { label: "Analisis Kulit", href: "/analysis" },
  { label: "Edukasi", href: "/education" },
  { label: "Tentang", href: "/#about" },
];

const technologies = [
  "YOLO11n Detection",
  "OpenCV Processing",
  "Ingredient Intelligence",
];

const information = [
  "Kebijakan Privasi",
  "Syarat Penggunaan",
  "Panduan Keamanan",
];

export default function Footer() {
  return (
    <footer
      id="tentang"
      className="w-full border-t border-[#DCCFC0]/40 bg-[#F4F4ED] pb-10 pt-16 text-[#444841]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 gap-10 border-b border-[#DCCFC0]/50 pb-12 md:grid-cols-12">
          {/* Brand Description */}
          <div className="space-y-4 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo-1.png"
                alt="Skinova AI"
                width={180}
                height={61}
                priority
                className="h-10 w-auto object-contain sm:h-11"
              />
            </Link>

            <p className="max-w-sm pr-4 text-sm leading-7 text-[#666D63]">
              Platform edukasi dan analisis kondisi kulit berbasis Computer
              Vision &amp; Deep Learning untuk merawat kulit dengan pemahaman
              ilmiah yang terpercaya.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#1A1C18]">
              Navigasi
            </h3>

            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666D63] transition-colors hover:text-[#566251]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-4 md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#1A1C18]">
              Teknologi
            </h3>

            <ul className="space-y-3">
              {technologies.map((technology) => (
                <li key={technology} className="text-sm text-[#666D63]">
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#1A1C18]">
              Informasi
            </h3>

            <ul className="space-y-3">
              {information.map((item) => (
                <li key={item} className="text-sm text-[#666D63]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs leading-6 text-[#777D73]">
            © {new Date().getFullYear()} Skinova AI. Dermatological Intelligence
            &amp; Skincare Education. Hak cipta dilindungi.
          </p>

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#777D73]">
            Kelompok 3 - Mata Kuliah Kecerdasan Tiruan
          </span>
        </div>
      </div>
    </footer>
  );
}
