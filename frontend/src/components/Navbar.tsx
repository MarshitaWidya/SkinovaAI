import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/#home" },
  { label: "Analisis Kulit", href: "/analysis" },
  { label: "Edukasi", href: "/education" },
  { label: "Tentang", href: "/#about" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e8dc] bg-[#FAF9EE]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#65765F] text-white">
            <Sparkles size={17} />
          </span>

          <span className="text-xl font-semibold tracking-tight text-[#30352F]">
            skinova<span className="text-[#82917B]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium text-[#697064] transition hover:text-[#52634D]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/analysis" className="sage-button !px-5 !py-3">
          Mulai Analisis
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </header>
  );
}
