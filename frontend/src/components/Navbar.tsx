import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-violet-100/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet text-white">
            <Sparkles size={19} />
          </span>

          <span className="text-lg font-bold tracking-tight">
            skinova<span className="text-violet">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="hover:text-violet">
            Beranda
          </Link>

          <Link href="/analysis" className="hover:text-violet">
            Analisis kulit
          </Link>

          <Link href="/education" className="hover:text-violet">
            Edukasi
          </Link>

          <Link href="/#tentang" className="hover:text-violet">
            Tentang
          </Link>
        </nav>

        <Link
          href="/analysis"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet"
        >
          Mulai analisis <span aria-hidden>↗</span>
        </Link>
      </div>
    </header>
  );
}
