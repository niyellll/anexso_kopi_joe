import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import RevealOnScroll from "./reveal-on-scroll";
import SiteControls from "./site-controls";
import { SITE_NAME, SITE_URL } from "./site-config";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "ANEXSO | Joe Coffee, TQ Business, Kuliner & Buku", template: `%s | ${SITE_NAME}` },
  description: "ANEXSO menghadirkan Joe Coffee, TQ Business Learning Center, produk kuliner, buku fisik, dan e-book dalam satu pusat informasi.",
  keywords: ["ANEXSO", "Joe Coffee", "kopi robusta arabika", "kopi bubuk", "TQ Business Learning Center", "pelatihan leadership", "pelatihan komunikasi", "kuliner", "buku Bahasa Jawa", "e-book UMKM"],
  alternates: { canonical: "/" },
  icons: { icon: "/joe-coffee-logo-brand.webp", apple: "/joe-coffee-logo-brand.webp" },
  openGraph: { type: "website", locale: "id_ID", url: SITE_URL, siteName: SITE_NAME, title: "ANEXSO | Coffee • Training • Learning", description: "Joe Coffee, TQ Business Learning Center, kuliner, buku fisik, dan e-book.", images: [{ url: "/anexso-hero.webp", width: 960, height: 720, alt: "ANEXSO Kopi JOE, TQ Business Learning Center, dan Joe Coffee" }] },
  twitter: { card: "summary_large_image", title: "ANEXSO | Coffee • Training • Learning", description: "Joe Coffee, training, kuliner, buku fisik, dan e-book.", images: ["/anexso-hero.webp"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5efe0" }, { media: "(prefers-color-scheme: dark)", color: "#090806" }] };

function ThemeInitScript() {
  const code = `(function(){try{var saved=localStorage.getItem("theme");var prefersDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;var theme=(saved==="light"||saved==="dark")?saved:(prefersDark?"dark":"light");document.documentElement.classList.toggle("dark",theme==="dark");}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="id" suppressHydrationWarning className={geist.variable}><body className="antialiased"><ThemeInitScript /><RevealOnScroll /><SiteControls />{children}</body></html>;
}
