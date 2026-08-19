import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "ANEXSO | Joe Coffee", template: "%s | ANEXSO" },
  description: "ANEXSO | Joe Coffee — Coffee, Business, Learning, Books, E-Books, dan Culinary dalam satu ekosistem.",
  keywords: ["Joe Coffee", "ANEXSO", "TQ Business", "training", "pelatihan", "kuliner", "buku", "e-book"],
  icons: { icon: "/joe-coffee-logo-brand.webp", apple: "/joe-coffee-logo-brand.webp" },
  openGraph: { title: "ANEXSO | Joe Coffee", description: "Minum. Belajar. Bertumbuh.", images: ["/anexso-hero.webp"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0a08" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}
