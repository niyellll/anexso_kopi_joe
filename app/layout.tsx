import "./globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Anexso Kopi JOE",
  description:
    "Anexso Kopi JOE — kopi pilihan untuk dinikmati di rumah, kantor, maupun hadiah. Order via WhatsApp atau Tokopedia.",
};

function ThemeInitScript() {
  // bikin theme tidak flicker pas load (ambil dari localStorage; kalau belum ada -> ikut OS)
  const code = `
  (function(){
    try{
      var saved = localStorage.getItem('theme');
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = (saved === 'light' || saved === 'dark') ? saved : (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }catch(e){}
  })();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeInitScript />
        {children}
      </body>
    </html>
  );
}
