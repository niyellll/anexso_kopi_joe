import Image from "next/image";
import {
  BOOKS,
  CULINARY,
  DASHBOARD_CATEGORIES,
  EBOOKS,
  JOE_COFFEE,
  TESTIMONIALS,
  TRAINING_TOPICS,
  type CatalogItem,
} from "./content";

const PHONE_WA = "6281395955293";

function waLink(message: string) {
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(message)}`;
}

function SectionHead({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
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
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-dashed border-[color:var(--border)] text-xl">＋</div>
        <div className="mt-3 text-xs font-bold text-[color:var(--muted)]">{label}</div>
      </div>
    </div>
  );
}

function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
      {item.image ? (
        <div className="relative aspect-[4/3] border-b border-[color:var(--border)] bg-black/5">
          <Image src={item.image} alt={item.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : (
        <EmptyVisual label="Foto / cover dapat ditambahkan" />
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            {item.label && <div className="text-xs font-bold uppercase tracking-wide text-[color:var(--primary)]">{item.label}</div>}
            <h3 className="mt-1 text-lg font-black">{item.name}</h3>
          </div>
          {item.price && (
            <span className="rounded-full border border-[color:var(--border)] bg-white/50 px-3 py-1 text-xs font-black dark:bg-white/10">
              {item.price}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm font-semibold">{item.intro}</p>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{item.description}</p>
        {item.status && <div className="mt-4 text-xs font-bold text-[color:var(--muted)]">{item.status}</div>}
      </div>
    </article>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--card)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[color:var(--primary)] text-sm font-black text-[color:var(--primary-foreground)]">JOE</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-black">JOE Coffee × TQ Business Learning Center</div>
              <div className="truncate text-xs text-[color:var(--muted)]">Dashboard Preview</div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#joe-coffee">Joe Coffee</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#tq-business">TQ Business</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#kuliner">Kuliner</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#buku-ebook">Buku & E-Book</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#testimoni">Testimoni</a>
          </nav>

          <a
            href={waLink("Halo JOE Coffee / TQ Business Learning Center, saya ingin bertanya mengenai produk atau program yang tersedia.")}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl bg-[color:var(--primary)] px-4 py-2.5 text-xs font-black text-[color:var(--primary-foreground)]"
          >
            Hubungi WA
          </a>
        </div>
      </header>

      <section id="home" className="mx-auto max-w-7xl px-4 pb-12 pt-10 md:pb-16 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-[color:var(--border)] bg-white/40 px-3 py-2 text-xs font-black uppercase tracking-wide text-[color:var(--primary)] dark:bg-white/5">
              JOE Coffee × TQ Business Learning Center
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Produk yang bisa <span className="text-[color:var(--primary)]">diminum, dipelajari, dan dibawa pulang.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[color:var(--muted)] md:text-lg">
              Satu dashboard untuk Joe Coffee, TQ Business & Learning Center, kuliner, buku & e-book, serta testimoni pelanggan dan peserta.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#dashboard" className="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-black text-[color:var(--primary-foreground)]">Lihat Dashboard</a>
              <a href="#tq-business" className="rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-black dark:bg-white/5">Lihat Training</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[color:var(--muted)]">
              <span>✓ Produk fisik & digital</span>
              <span>✓ Training & short course</span>
              <span>✓ Katalog mudah dikembangkan</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow)]">
            <div className="relative aspect-[4/3]">
              <Image src="/produk-kopi-bubuk-500gr.jpeg" alt="JOE Coffee" fill priority className="object-cover" sizes="(min-width:1024px) 38vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <div className="text-xs font-black uppercase tracking-[0.18em]">JOE Coffee</div>
                <div className="mt-1 text-2xl font-black">Joyfulness Starts From Here</div>
                <div className="mt-2 text-sm text-white/80">Joe 100 • Joe 200 • Joe 500 • Joe 1kg</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="border-y border-[color:var(--border)] bg-white/20 py-12 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            eyebrow="Dashboard"
            title="Pilih kategori utama"
            description="Struktur ini mengikuti konsep dashboard pada file referensi: pengunjung memilih area utama lebih dulu, lalu masuk ke produk, program, atau informasi yang dibutuhkan."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DASHBOARD_CATEGORIES.map((category) => (
              <a
                key={category.number}
                href={category.href}
                className="group rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-black tracking-[0.2em] text-[color:var(--primary)]">{category.number}</span>
                  <span className="text-sm text-[color:var(--primary)] transition group-hover:translate-x-1">→</span>
                </div>
                <h3 className="mt-5 text-xl font-black">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{category.intro}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="rounded-full border border-[color:var(--border)] bg-white/50 px-3 py-1 text-xs font-semibold dark:bg-white/10">{item}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="joe-coffee" className="mx-auto max-w-7xl px-4 py-14">
        <SectionHead
          eyebrow="01 • Joe Coffee"
          title="Joe Coffee"
          description="Empat produk utama kopi JOE. Data produk dibuat terpisah agar nama, pendahuluan, deskripsi, harga, dan foto dapat diubah tanpa membongkar layout halaman."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {JOE_COFFEE.map((item) => <CatalogCard key={item.name} item={item} />)}
        </div>
      </section>

      <section id="tq-business" className="border-y border-[color:var(--border)] bg-white/20 py-14 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            eyebrow="02 • TQ Business & Learning Center"
            title="Training & Short Course"
            description="Modul pelatihan disusun sebagai katalog topik. Foto kegiatan, company profile, team pengajar, dan testimoni dapat dilengkapi setelah materi final tersedia."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TRAINING_TOPICS.map((topic, index) => (
              <article key={topic.title} className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-[var(--shadow-soft)]">
                <div className="text-xs font-black tracking-[0.18em] text-[color:var(--primary)]">MODULE {String(index + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 text-lg font-black">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{topic.intro}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)]">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Company Profile</div>
              <h3 className="mt-2 text-xl font-black">TQ Business & Learning Center</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                Area ini disiapkan untuk pendahuluan lembaga, latar belakang, kompetensi, layanan, pengalaman, dan informasi perusahaan. Isi final akan mengikuti materi company profile yang diberikan.
              </p>
              <div className="mt-5 rounded-2xl border border-dashed border-[color:var(--border)] p-5 text-sm text-[color:var(--muted)]">Logo / company profile / materi pendukung dapat ditambahkan di sini.</div>
            </article>

            <article className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)]">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Team Pengajar</div>
              <h3 className="mt-2 text-xl font-black">Trainer & Facilitator</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                Area ini disiapkan untuk foto pengajar, nama, jabatan, kompetensi utama, pengalaman, serta topik pelatihan yang dibawakan.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Pengajar 1", "Pengajar 2", "Pengajar 3"].map((name) => (
                  <div key={name} className="grid aspect-square place-items-center rounded-2xl border border-dashed border-[color:var(--border)] text-center text-xs font-bold text-[color:var(--muted)]">{name}<br />foto menyusul</div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Dokumentasi</div>
                <h3 className="mt-1 text-xl font-black">Foto-foto Pelatihan</h3>
              </div>
              <span className="text-xs text-[color:var(--muted)]">Foto asli akan ditambahkan setelah diunggah.</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Dokumentasi Training 1", "Dokumentasi Training 2", "Dokumentasi Training 3"].map((label) => (
                <div key={label} className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
                  <EmptyVisual label={label} />
                  <div className="p-4 text-sm font-black">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="kuliner" className="mx-auto max-w-7xl px-4 py-14">
        <SectionHead
          eyebrow="03 • Kuliner"
          title="Produk Kuliner"
          description="Daftar awal kuliner. Produk yang belum mempunyai foto, harga, atau deskripsi final sengaja diberi placeholder agar tidak mengarang informasi yang belum tersedia."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CULINARY.map((item) => <CatalogCard key={item.name} item={item} />)}
        </div>
      </section>

      <section id="buku-ebook" className="border-y border-[color:var(--border)] bg-white/20 py-14 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            eyebrow="04 • Buku & E-Book"
            title="Buku dan Produk Digital"
            description="Buku cetak dan e-book dipisahkan secara jelas agar calon pembeli mudah membedakan jenis produk serta cara mendapatkannya."
          />

          <div>
            <div className="mb-4 text-lg font-black">Buku</div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BOOKS.map((item) => <CatalogCard key={item.name} item={item} />)}
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 text-lg font-black">E-Book</div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {EBOOKS.map((item) => <CatalogCard key={item.name} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="testimoni" className="mx-auto max-w-7xl px-4 py-14">
        <SectionHead
          eyebrow="05 • Testimoni"
          title="Apa kata peserta & pelanggan"
          description="Bagian ini disiapkan untuk foto, nama, jabatan atau instansi, program/produk yang diikuti, serta isi testimoni."
        />

        {TESTIMONIALS.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <article key={`${item.name}-${item.quote}`} className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)]">
                <p className="text-sm leading-relaxed">“{item.quote}”</p>
                <div className="mt-5 text-sm font-black">{item.name}</div>
                <div className="text-xs text-[color:var(--muted)]">{item.role}</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {["Testimoni Peserta Training", "Testimoni Pelanggan", "Testimoni Mitra"].map((label) => (
              <article key={label} className="rounded-[var(--radius)] border border-dashed border-[color:var(--border)] bg-[color:var(--card)] p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-dashed border-[color:var(--border)] text-xl">＋</div>
                <div className="mt-4 text-sm font-black">{label}</div>
                <div className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]">Foto, nama, jabatan/instansi, dan isi testimoni akan ditambahkan setelah materinya diterima.</div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-[color:var(--border)] bg-[color:var(--card)] py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          <div>
            <div className="font-black">JOE Coffee</div>
            <p className="mt-2 text-sm text-[color:var(--muted)]">Joe 100 • Joe 200 • Joe 500 • Joe 1kg</p>
          </div>
          <div>
            <div className="font-black">TQ Business & Learning Center</div>
            <p className="mt-2 text-sm text-[color:var(--muted)]">Training • Short Course • Company Profile • Team Pengajar</p>
          </div>
          <div>
            <div className="font-black">Kontak</div>
            <a className="mt-2 inline-block text-sm font-bold text-[color:var(--primary)]" href={waLink("Halo, saya ingin mendapatkan informasi lebih lanjut.")} target="_blank" rel="noreferrer">WhatsApp →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
