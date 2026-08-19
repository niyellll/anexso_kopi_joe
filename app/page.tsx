import Link from "next/link";
import { BenefitStrip, PageShell, SectionTitle, TrustStrip, TqMark } from "./site-ui";

export default function HomePage() {
  return <PageShell active="Beranda">
    <main>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="hero-copy"><h1>MINUM.<br/><span>BELAJAR.</span><br/>BERTUMBUH.</h1><div className="gold-line"/><p>Dari secangkir kopi, lahir ide.<br/>Dari pembelajaran, lahir perubahan.<br/>Satu ekosistem untuk menikmati kopi, mengembangkan kompetensi, membangun bisnis, dan mendapatkan pengetahuan yang bisa diterapkan.</p><div className="hero-actions"><Link className="gold-btn" href="/tq-business">⌁ Jelajahi Program</Link><Link className="outline-btn light" href="/joe-coffee">▢ Belanja Produk</Link></div></div>
          <div className="hero-ecosystem"><div className="ecosystem-logos"><img src="/joe-coffee-logo-brand.webp" alt="Joe Coffee"/><TqMark/></div><div className="ecosystem-divider"/><div className="ecosystem-features"><div><b>☕</b><strong>Coffee & Culinary</strong><span>Nikmati kopi berkualitas dan kuliner pilihan</span></div><div><b>♧</b><strong>Training & Short Course</strong><span>Tingkatkan kompetensi diri dan tim Anda</span></div><div><b>▣</b><strong>Business Consulting</strong><span>Solusi praktis untuk bisnis Anda</span></div><div><b>▤</b><strong>Books & E-Books</strong><span>Pengetahuan praktis kapan saja</span></div></div></div>
        </div>
      </section>
      <section className="home-categories section-pad"><div className="container"><SectionTitle title="SATU EKOSISTEM, BANYAK MANFAAT"/><div className="category-grid">
        <Link href="/joe-coffee" className="category-card"><img src="/produk-kopi-bubuk-100gr.jpeg" alt="Joe Coffee"/><h3>JOE COFFEE</h3><p>Kopi blend Robusta & Arabika pilihan untuk menemani setiap momen Anda.</p><span>Jelajahi Joe Coffee →</span></Link>
        <Link href="/tq-business" className="category-card"><div className="category-art tq-art"><TqMark/></div><h3>TQ BUSINESS & LEARNING CENTER</h3><p>Program training, short course, coaching dan pengembangan SDM untuk individu maupun perusahaan.</p><span>Lihat Program TQ →</span></Link>
        <Link href="/buku-ebook" className="category-card"><div className="book-stack"><img src="/pinesthi.jpg" alt="Buku"/><img src="/merapi.jpg" alt="Buku"/></div><h3>BUKU & E-BOOK</h3><p>Pengetahuan praktis yang dapat dipelajari kapan saja dan diterapkan langsung.</p><span>Lihat Buku & E-Book →</span></Link>
        <Link href="/kuliner" className="category-card"><img src="/nasgomer.jpg" alt="Kuliner"/><h3>KULINER</h3><p>Makanan dan minuman lezat untuk dinikmati bersama kopi dan orang-orang yang Anda sayangi.</p><span>Lihat Menu Kuliner →</span></Link>
      </div></div></section>
      <TrustStrip/>
      <BenefitStrip items={[["☕","Coffee Berkualitas","Blend Robusta & Arabika pilihan."],["♧","Belajar Berkualitas","Training, buku, dan e-book."],["◎","Kuliner Berkualitas","Menu enak, sehat, dan higienis."],["♡","Joyfulness","Ekosistem yang tumbuh bersama Anda."]]}/>
    </main>
  </PageShell>;
}
