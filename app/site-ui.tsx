import Link from "next/link";
import type { ReactNode } from "react";
import { BuyButton, CartNavLink } from "./commerce-widgets-v14";
import { CONTACT_WA } from "./site-config";
import { formatRupiah, type Product, type TqProgram } from "./site-data";

const nav = [
  ["Beranda", "/"],
  ["Joe Coffee", "/joe-coffee"],
  ["TQ Business", "/tq-business"],
  ["Buku & E-Book", "/buku-ebook"],
  ["Kuliner", "/kuliner"],
  ["Tentang Kami", "/tentang-kami"],
] as const;

export function SiteHeader({ active = "" }: { active?: string }) {
  return (
    <>
      <div className="topline"><div className="container topline-inner"><span>MINUM. BELAJAR. BERTUMBUH.</span><span className="socials">◎ ◉ in f</span></div></div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="ANEXSO Joe Coffee">
            <img src="/joe-coffee-logo-brand.webp" alt="Joe Coffee" />
            <div><strong>ANEXSO | JOE COFFEE</strong><span>Coffee • Business • Learning</span></div>
          </Link>
          <nav className="desktop-nav">
            {nav.map(([label, href]) => <Link className={active === label ? "active" : ""} key={href} href={href}>{label}</Link>)}
          </nav>
          <div className="nav-actions">
            <CartNavLink />
            <Link className="icon-btn" href="/tentang-kami#kontak" aria-label="Akun">♙</Link>
            <a className="gold-btn compact" href={CONTACT_WA} target="_blank" rel="noreferrer">Hubungi Kami ↗</a>
          </div>
        </div>
        <div className="mobile-nav container">{nav.map(([label, href]) => <Link className={active === label ? "active" : ""} key={href} href={href}>{label}</Link>)}</div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="kontak">
      <div className="container footer-grid">
        <div><div className="brand footer-brand"><img src="/joe-coffee-logo-brand.webp" alt="Joe Coffee" /><div><strong>ANEXSO | JOE COFFEE</strong><span>Coffee • Business • Learning</span></div></div><p>Ekosistem kopi, pembelajaran, kuliner, buku, dan pengembangan bisnis.</p></div>
        <div><h4>Jelajahi</h4><Link href="/joe-coffee">Joe Coffee</Link><Link href="/tq-business">TQ Business</Link><Link href="/buku-ebook">Buku & E-Book</Link><Link href="/kuliner">Kuliner</Link></div>
        <div><h4>TQ Business</h4><Link href="/tq-business">10 Program Unggulan</Link><Link href="/tq-business/konsultasi">Konsultasi Program</Link><Link href="/tq-business/daftar?program=the-new-manager">Daftar Program</Link></div>
        <div><h4>Hubungi Kami</h4><p>Chat langsung melalui WhatsApp untuk produk Joe Coffee, buku, kuliner, dan informasi program.</p><a className="outline-btn" href={CONTACT_WA} target="_blank" rel="noreferrer">Chat WhatsApp →</a></div>
      </div>
      <div className="container copyright">© 2026 ANEXSO | Joe Coffee. Minum. Belajar. Bertumbuh.</div>
    </footer>
  );
}

export function PageShell({ active, children }: { active?: string; children: ReactNode }) {
  return <><SiteHeader active={active} />{children}<Footer /></>;
}

export function Breadcrumb({ children }: { children: ReactNode }) {
  return <div className="container breadcrumb"><Link href="/">Beranda</Link><span>›</span><span>{children}</span></div>;
}

export function SectionTitle({ eyebrow, title, copy, center = true }: { eyebrow?: string; title: string; copy?: string; center?: boolean }) {
  return <div className={center ? "section-title center" : "section-title"}>{eyebrow ? <span>{eyebrow}</span> : null}<h2>{title}</h2>{copy ? <p>{copy}</p> : null}</div>;
}

export function ProductCard({ product, button = "Beli Sekarang", href = "/keranjang" }: { product: Product; button?: string; href?: string }) {
  return <article className="product-card">
    <div className="product-image"><img src={product.image} alt={product.name} /></div>
    <h3>{product.name}</h3><p>{product.subtitle}</p><strong>{formatRupiah(product.price)}</strong>
    {href === "/keranjang" ? <BuyButton product={product} label={button} /> : <Link href={href} className="small-gold-btn">{button} →</Link>}
  </article>;
}

export function ProgramCard({ program }: { program: TqProgram }) {
  return <article className="program-card">
    <span className="program-number">{program.number}</span><div className="program-icon">{program.icon}</div>
    <h3>{program.title}</h3><p>{program.short}</p>
    <div className="program-links"><Link href={`/tq-business/${program.slug}`}>Lihat Detail</Link><Link href={`/tq-business/daftar?program=${program.slug}`}>Daftar →</Link></div>
  </article>;
}

export function TrustStrip({ items }: { items?: [string, string][] }) {
  const useItems = items || [["5.000+", "Peserta Training"], ["300+", "Perusahaan Klien"], ["200+", "Program Pelatihan"], ["50+", "Trainer Profesional"]];
  return <section className="trust-strip"><div className="container trust-grid">{useItems.map(([big, label]) => <div key={label}><strong>{big}</strong><span>{label}</span></div>)}</div></section>;
}

export function BenefitStrip({ items }: { items: [string, string, string][] }) {
  return <section className="benefit-strip"><div className="container benefit-grid">{items.map(([icon, title, text]) => <div key={title}><span>{icon}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}</div></section>;
}

export function TqMark() {
  return <div className="tq-mark"><b>TQ</b><span>BUSINESS &<br/>LEARNING CENTER</span></div>;
}
