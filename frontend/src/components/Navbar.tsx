"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Analisis Kulit", href: "/analysis" },
  { label: "Edukasi", href: "/education" },
  { label: "Tentang", href: "/#about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#DCCFC0]/40 bg-[#FAFAF3]/85 shadow-[0_1px_8px_rgba(41,43,39,0.03)] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-12">
        {/* Brand */}

        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/images/logo-2.png"
            alt="Skinova AI"
            width={180}
            height={61}
            priority
            className="h-10 w-auto object-contain sm:h-11"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wide text-[#444841] transition-colors duration-200 hover:text-[#566251]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 md:block">
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 rounded-full bg-[#A2AF9B] px-5 py-2.5 text-sm font-semibold text-[#374333] shadow-[0_2px_8px_rgba(41,43,39,0.06)] transition-all duration-200 hover:bg-[#566251] hover:text-white"
          >
            Mulai Analisis
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="grid h-10 w-10 place-items-center rounded-full text-[#566251] transition-colors hover:bg-[#F4F4ED] md:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[#DCCFC0]/50 bg-[#FAFAF3] px-5 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#444841] transition-colors hover:bg-[#F4F4ED] hover:text-[#566251]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/analysis"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#566251] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3E4A3A]"
            >
              Mulai Analisis
              <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
