import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import SiteControls from "./site-controls";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anexso Kopi JOE",
  description:
    "Anexso Kopi JOE - kopi bubuk pouch 100gr, 200gr, 500gr, 1kg serta Es Kopi Tanpa Ampas dan Es Kopi Susu Gula Aren.",
  icons: {
    icon: "/joe-coffee-logo.jpeg",
    apple: "/joe-coffee-logo.jpeg",
  },
  openGraph: {
    title: "Anexso Kopi JOE",
    description:
      "Kopi bubuk pouch dan menu es kopi Joe Coffee. Order via WhatsApp atau katalog resmi.",
    images: ["/joe-coffee-logo.jpeg"],
  },
};

function ThemeInitScript() {
  // anti-flicker theme (ambil dari localStorage; kalau belum ada -> ikut OS)
  const code = `
(function(){
  try{
    var saved = localStorage.getItem("theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = (saved === "light" || saved === "dark") ? saved : (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }catch(e){}
})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeInitScript />
        <SiteControls />
        {children}
      </body>
    </html>
  );
}
