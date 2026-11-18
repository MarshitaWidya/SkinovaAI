import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skinova AI — Kenali dan Pahami Kondisi Kulitmu",
  description:
    "Kenali indikasi kondisi kulit wajah melalui teknologi AI dan pelajari perawatan kulit yang lebih terarah bersama Skinova AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
