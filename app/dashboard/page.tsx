import Image from "next/image";
import MobileNav from "../mobile-nav";
import { SITE_NAME, SITE_URL, waLink } from "../site-config";
import {
  BOOKS,
  COMPANY_PROFILE,
  CULINARY,
  DASHBOARD_CATEGORIES,
  EBOOKS,
  JOE_COFFEE,
  JOE_COFFEE_DESCRIPTION,
  TESTIMONIALS,
  TRAINERS,
  TRAINING_PHOTOS,
  TRAINING_TESTIMONIALS,
  TRAINING_TOPICS,
  type CatalogItem,
  type Testimonial,
} from "./content";

function SectionHead({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="gpro-reveal mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--primary)]">{eyebrow}</div>
        <h2 className="mt-2 text-2xl font-black md:text-3xl">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">{description}</p>
    </div>
  );
}

function EmptyVisual({ label }: { label: string }) {
  return (
    <div className="grid aspect-[4/3] place-items-center border-b border-[color:var(--border)] bg-black/[0.03] p-6 text-center dark:bg-white/[0.04]">
      <div>
        <Image src="/joe-coffee-logo-brand.webp" alt="" width={56} height={56} className="mx-auto rounded-2xl" />
        <div className="mt-3 text-xs font-bold text-[color:var(--muted)]">{label}</div>
      </div>
    </div>
  );
}

function CatalogCard({ item }: { item: CatalogItem }) {
  const isBook = item.label === "Buku Fisik" || item.label === "E-Book";
  const orderMessage = `Halo ${SITE_NAME}, saya ingin ${item.price ? "pesan" : "bertanya tentang"} ${item.name}${item.price ? ` (${item.price})` : ""}.`;

  return (
    <article className="gpro-card gpro-reveal overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
      {item.image ? (
        <div className={`relative border-b border-[color:var(--border)] bg-black/5 ${isBook ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
          <Image src={item.image} alt={item.name} fill quality={75} sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" className={isBook ? "object-contain p-3" : "object-cover"} />
        </div>
      ) : (
        <EmptyVisual label={item.label ?? item.name} />
      )}

      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            {item.label && <div className="text-xs font-bold uppercase tracking-wide text-[color:var(--primary)]">{item.label}</div>}
            <h3 className="mt-1 text-lg font-black">{item.name}</h3>
          </div>
          {item.price && <span className="rounded-full border border-[color:var(--border)] bg-white/50 px-3 py-1 text-xs font-black dark:bg-white/10">{item.price}</span>}
        </div>
        <p className="mt-3 text-sm font-semibold">{item.intro}</p>
        {item.description && <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{item.description}</p>}
        <a href={waLink(orderMessage)} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-xl bg-[color:var(--primary)] px-4 py-2.5 text-xs font-black text-[color:var(--primary-foreground)]" aria-label={`${item.price ? "Pesan" : "Tanya"} ${item.name} melalui WhatsApp`}>
          {item.price ? "Pesan via WA" : "Tanya via WA"}
        </a>
      </div>
    </article>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="gpro-card gpro-reveal overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
      {item.image && <div className="relative aspect-[16/10] border-b border-[color:var(--border)]"><Image src={item.image} alt={item.name} fill quality={75} className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" /></div>}
      <div className="p-6"><p className="text-sm leading-relaxed">“{item.quote}”</p><div className="mt-5 text-sm font-black">{item.name}</div><div className="text-xs text-[color:var(--muted)]">{item.role}</div></div>
    </article>
  );
}

function DashboardCard({ category }: { category: (typeof DASHBOARD_CATEGORIES)[number] }) {
  return (
    <a href={category.href} className="gpro-card gpro-reveal group rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-4"><span className="text-xs font-black tracking-[0.2em] text-[color:var(--primary)]">{category.number}</span><span className="text-sm text-[color:var(--primary)] transition group-hover:translate-x-1">→</span></div>
      <h3 className="mt-5 text-xl font-black">{category.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{category.intro}</p>
      <div className="mt-5 flex flex-wrap gap-2">{category.items.map((item) => <span key={item} className="rounded-full border border-[color:var(--border)] bg-white/50 px-3 py-1 text-xs font-semibold dark:bg-white/10">{item}</span>)}</div>
    </a>
  );
}

export default function DashboardPage() {
  const showTestimonials = TESTIMONIALS.length > 0;
  const visibleCategories = DASHBOARD_CATEGORIES.filter((category) => category.number !== "05" || showTestimonials);
  const primaryCategories = visibleCategories.slice(0, 3);
  const secondaryCategories = visibleCategories.slice(3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/joe-coffee-logo-brand.webp`,
        description: "Wirausaha dan pengembangan SDM melalui coffee, training, learning, kuliner, buku, dan e-book.",
        contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: "+62-813-9595-5293", availableLanguage: ["id", "en"] },
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "id-ID" },
      {
        "@type": "ItemList",
        name: "Joe Coffee",
        itemListElement: JOE_COFFEE.map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Product", name: item.name, description: item.description ?? item.intro, image: item.image ? `${SITE_URL}${item.image}` : undefined, brand: { "@type": "Brand", name: "Joe Coffee" } } })),
      },
      {
        "@type": "ItemList",
        name: "Buku dan E-Book",
        itemListElement: [...BOOKS, ...EBOOKS].map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: item.name, description: item.intro, image: item.image ? `${SITE_URL}${item.image}` : undefined } })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--card)]/95 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Kembali ke halaman utama">
            <Image src="/joe-coffee-logo-brand.webp" alt="Joe Coffee" width={52} height={52} priority className="h-[52px] w-[52px] shrink-0 rounded-[14px] object-cover shadow-[var(--shadow-soft)]" />
            <div className="min-w-0"><div className="truncate text-[0.78rem] font-black leading-tight tracking-[0.02em] sm:text-sm">WIRAUSAHA DAN PENGEMBANGAN SDM</div><div className="mt-1 truncate text-[0.64rem] font-bold tracking-[0.08em] text-[color:var(--muted)] sm:text-xs">COFFEE • TRAINING • LEARNING</div></div>
          </a>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigasi utama">
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10" href="#joe-coffee">Joe Coffee</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10" href="#tq-business">TQ Business</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10" href="#buku-ebook">Buku & E-Book</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10" href="#kuliner">Kuliner</a>
            {showTestimonials && <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10" href="#testimoni">Testimoni</a>}
          </nav>
          <div className="flex shrink-0 items-center gap-2"><MobileNav showTestimonials={showTestimonials} /><a href={waLink(`Halo ${SITE_NAME}, saya ingin bertanya mengenai produk atau program yang tersedia.`)} target="_blank" rel="noreferrer" className="rounded-xl bg-[color:var(--primary)] px-3 py-2.5 text-xs font-black text-[color:var(--primary-foreground)] sm:px-4"><span className="hidden sm:inline">Hubungi WA</span><span className="sm:hidden">WA</span></a></div>
        </div>
      </header>

      <section id="home" className="gpro-hero-glow mx-auto max-w-7xl px-4 pb-12 pt-10 md:pb-16 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="gpro-reveal"><span className="inline-flex rounded-full border border-[color:var(--border)] bg-white/40 px-3 py-2 text-xs font-black uppercase tracking-wide text-[color:var(--primary)] dark:bg-white/5">JOE Coffee × TQ Business Learning Center</span><h1 className="mobile-title mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Produk yang bisa <span className="text-[color:var(--primary)]">diminum, dipelajari, dan dibawa pulang.</span></h1><p className="mt-5 max-w-3xl text-base leading-relaxed text-[color:var(--muted)] md:text-lg">Satu website untuk Joe Coffee, TQ Business Learning Center, kuliner, buku & e-book.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#dashboard" className="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-black text-[color:var(--primary-foreground)]">Lihat Produk & Program</a><a href="#tq-business" className="rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-black dark:bg-white/5">Lihat Pelatihan</a></div><div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[color:var(--muted)]"><span>✓ Produk fisik & digital</span><span>✓ Training & short course</span><span>✓ Pilihan kuliner</span></div></div>
          <div className="gpro-card gpro-reveal overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-white shadow-[var(--shadow)]"><div className="relative aspect-[4/3]"><Image src="/anexso-hero.webp" alt="ANEXSO Kopi JOE, TQ Business Learning Center, dan Joe Coffee" fill priority quality={75} className="object-contain" sizes="(min-width:1024px) 38vw, 100vw" /></div></div>
        </div>
      </section>

      <section id="dashboard" className="border-y border-[color:var(--border)] bg-white/20 py-12 dark:bg-white/[0.02]"><div className="mx-auto max-w-7xl px-4"><SectionHead eyebrow="Dashboard" title="Pilih area utama" description="Joe Coffee, TQ Business Learning Center, buku & e-book, dan pilihan kuliner dalam satu payung ANEXSO." /><div className="grid gap-4 lg:grid-cols-3">{primaryCategories.map((category) => <DashboardCard key={category.number} category={category} />)}</div>{secondaryCategories.length > 0 && <div className="mt-4 grid gap-4 md:grid-cols-2">{secondaryCategories.map((category) => <DashboardCard key={category.number} category={category} />)}</div>}</div></section>

      <section id="joe-coffee" className="mx-auto max-w-7xl px-4 py-14"><SectionHead eyebrow="01 • Joe Coffee" title="Joe Coffee" description={JOE_COFFEE_DESCRIPTION} /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{JOE_COFFEE.map((item) => <CatalogCard key={item.name} item={item} />)}</div></section>

      <section id="tq-business" className="border-y border-[color:var(--border)] bg-white/20 py-14 dark:bg-white/[0.02]"><div className="mx-auto max-w-7xl px-4"><SectionHead eyebrow="02 • TQ Business Learning Center" title="Topik Pelatihan" description="Pusat Pengembangan Bisnis & Kompetensi." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{TRAINING_TOPICS.map((topic, index) => <article key={topic.title} className="gpro-card gpro-reveal rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-[var(--shadow-soft)]"><div className="text-xs font-black tracking-[0.18em] text-[color:var(--primary)]">MODULE {String(index + 1).padStart(2, "0")}</div><h3 className="mt-3 text-lg font-black">{topic.title}</h3></article>)}</div><article className="gpro-card gpro-reveal mt-9 rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)]"><div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Company Profile</div><h3 className="mt-2 text-xl font-black">{COMPANY_PROFILE.title}</h3><p className="mt-3 text-sm font-semibold">{COMPANY_PROFILE.intro}</p><p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{COMPANY_PROFILE.principles}</p></article>
      {TRAINERS.length > 0 && <div className="mt-10"><SectionHead eyebrow="Team Pengajar" title="Trainer & Facilitator" description="Tim pengajar TQ Business Learning Center." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{TRAINERS.map((trainer) => <article key={trainer.name} className="gpro-card gpro-reveal rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-[var(--shadow-soft)]">{trainer.image && <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl"><Image src={trainer.image} alt={trainer.name} fill quality={75} className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" /></div>}<h3 className="font-black">{trainer.name}</h3><p className="mt-1 text-sm text-[color:var(--muted)]">{trainer.role}</p>{trainer.expertise && <p className="mt-2 text-sm">{trainer.expertise}</p>}</article>)}</div></div>}
      {TRAINING_PHOTOS.length > 0 && <div className="mt-10"><SectionHead eyebrow="Dokumentasi" title="Foto Pelatihan" description="Dokumentasi kegiatan TQ Business Learning Center." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{TRAINING_PHOTOS.map((photo) => <figure key={photo.image} className="gpro-card gpro-reveal overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]"><div className="relative aspect-[4/3]"><Image src={photo.image} alt={photo.title} fill quality={75} className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" /></div>{(photo.title || photo.caption) && <figcaption className="p-4"><div className="font-black">{photo.title}</div>{photo.caption && <div className="mt-1 text-sm text-[color:var(--muted)]">{photo.caption}</div>}</figcaption>}</figure>)}</div></div>}
      {TRAINING_TESTIMONIALS.length > 0 && <div className="mt-10"><SectionHead eyebrow="Testimoni Pelatihan" title="Pengalaman Peserta" description="Cerita peserta TQ Business Learning Center." /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{TRAINING_TESTIMONIALS.map((item) => <TestimonialCard key={`${item.name}-${item.quote}`} item={item} />)}</div></div>}
      </div></section>

      <section id="buku-ebook" className="mx-auto max-w-7xl px-4 py-14"><SectionHead eyebrow="03 • Buku & E-Books" title="Buku dan E-Book" description="Buku fisik dan bacaan digital." /><div><div className="gpro-reveal mb-4 text-lg font-black">Buku Fisik</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{BOOKS.map((item) => <CatalogCard key={item.name} item={item} />)}</div></div><div className="mt-10"><div className="gpro-reveal mb-4 text-lg font-black">E-Book</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{EBOOKS.map((item) => <CatalogCard key={item.name} item={item} />)}</div></div></section>

      <section id="kuliner" className="border-y border-[color:var(--border)] bg-white/20 py-14 dark:bg-white/[0.02]"><div className="mx-auto max-w-7xl px-4"><SectionHead eyebrow="04 • Kuliner" title="Produk Kuliner" description="Mie Ayam Kriuk, Nasgomer, Mie Godhog Merah, serta pilihan minuman JOE Coffee." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{CULINARY.map((item) => <CatalogCard key={item.name} item={item} />)}</div></div></section>

      {showTestimonials && <section id="testimoni" className="mx-auto max-w-7xl px-4 py-14"><SectionHead eyebrow="05 • Testimoni" title="Cerita dari pelanggan, peserta, pembaca & mitra" description="Pengalaman bersama ANEXSO, Joe Coffee, TQ Business Learning Center, kuliner, buku, dan e-book." /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{TESTIMONIALS.map((item) => <TestimonialCard key={`${item.name}-${item.quote}`} item={item} />)}</div></section>}

      <footer className="border-t border-[color:var(--border)] bg-[color:var(--card)] py-10"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3"><div><div className="font-black">ANEXSO Kopi JOE</div><p className="mt-2 text-sm text-[color:var(--muted)]">WIRAUSAHA DAN PENGEMBANGAN SDM</p></div><div><div className="font-black">Coffee • Training • Learning</div><p className="mt-2 text-sm text-[color:var(--muted)]">Joe Coffee • TQ Business Learning Center • Kuliner • Buku & E-Book</p></div><div className="md:text-right"><a href={waLink(`Halo ${SITE_NAME}, saya ingin bertanya.`)} target="_blank" rel="noreferrer" className="inline-flex rounded-xl bg-[color:var(--primary)] px-4 py-2.5 text-xs font-black text-[color:var(--primary-foreground)]">Hubungi WhatsApp</a></div></div></footer>
    </main>
  );
}
