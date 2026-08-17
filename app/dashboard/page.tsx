import Image from "next/image";
import {
  BOOKS,
  COMPANY_PROFILE,
  CULINARY,
  DASHBOARD_CATEGORIES,
  EBOOKS,
  JOE_COFFEE,
  TESTIMONIALS,
  TRAINERS,
  TRAINING_PHOTOS,
  TRAINING_TESTIMONIALS,
  TRAINING_TOPICS,
  type CatalogItem,
  type Testimonial,
} from "./content";

const PHONE_WA = "6281395955293";

function waLink(message: string) {
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(message)}`;
}

function SectionHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
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

function EmptyVisual({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) {
  return (
    <div className={`grid ${ratio} place-items-center border-b border-[color:var(--border)] bg-black/[0.03] p-6 text-center dark:bg-white/[0.04]`}>
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
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <EmptyVisual label="Foto / cover dapat ditambahkan" />
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            {item.label && (
              <div className="text-xs font-bold uppercase tracking-wide text-[color:var(--primary)]">{item.label}</div>
            )}
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

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
      {item.image ? (
        <div className="relative aspect-[16/10] border-b border-[color:var(--border)]">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" />
        </div>
      ) : null}
      <div className="p-6">
        <p className="text-sm leading-relaxed">“{item.quote}”</p>
        <div className="mt-5 text-sm font-black">{item.name}</div>
        <div className="text-xs text-[color:var(--muted)]">{item.role}</div>
      </div>
    </article>
  );
}

function PlaceholderTestimonial({ title }: { title: string }) {
  return (
    <article className="rounded-[var(--radius)] border border-dashed border-[color:var(--border)] bg-[color:var(--card)] p-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-dashed border-[color:var(--border)] text-xl">＋</div>
      <div className="mt-4 text-sm font-black">{title}</div>
      <div className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]">
        Foto, nama, jabatan/instansi, program atau produk, dan isi testimoni dapat ditambahkan di sini.
      </div>
    </article>
  );
}

function DashboardCard({ category }: { category: (typeof DASHBOARD_CATEGORIES)[number] }) {
  return (
    <a
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
          <span key={item} className="rounded-full border border-[color:var(--border)] bg-white/50 px-3 py-1 text-xs font-semibold dark:bg-white/10">
            {item}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function DashboardPage() {
  const primaryCategories = DASHBOARD_CATEGORIES.slice(0, 3);
  const secondaryCategories = DASHBOARD_CATEGORIES.slice(3);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--card)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[color:var(--primary)] text-sm font-black text-[color:var(--primary-foreground)]">JOE</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-black">JOE Coffee × TQ Business Learning Center</div>
              <div className="truncate text-xs text-[color:var(--muted)]">Produk • Training • Kuliner • Buku • E-Book</div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#joe-coffee">Joe Coffee</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#tq-business">TQ Business</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#buku-ebook">Buku & E-Book</a>
            <a className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/10" href="#kuliner">Kuliner</a>
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
              Satu website untuk Joe Coffee, TQ Business Learning Center, kuliner, buku & e-book, serta testimoni pelanggan dan peserta.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#dashboard" className="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-black text-[color:var(--primary-foreground)]">Lihat Produk & Program</a>
              <a href="#tq-business" className="rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-black dark:bg-white/5">Lihat Pelatihan</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[color:var(--muted)]">
              <span>✓ Produk fisik & digital</span>
              <span>✓ Training & short course</span>
              <span>✓ Konten mudah ditambah</span>
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
            title="Pilih area utama"
            description="Tiga area utama ditampilkan lebih dulu seperti pola pada referensi: Joe Coffee, TQ Business Learning Center, dan Buku & E-Books. Kuliner dan Testimoni tersedia sebagai area berikutnya."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {primaryCategories.map((category) => <DashboardCard key={category.number} category={category} />)}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {secondaryCategories.map((category) => <DashboardCard key={category.number} category={category} />)}
          </div>
        </div>
      </section>

      <section id="joe-coffee" className="mx-auto max-w-7xl px-4 py-14">
        <SectionHead
          eyebrow="01 • Joe Coffee"
          title="Joe Coffee"
          description="Empat produk utama kopi JOE dengan tempat untuk nama produk, pendahuluan, deskripsi, harga, dan foto."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {JOE_COFFEE.map((item) => <CatalogCard key={item.name} item={item} />)}
        </div>
      </section>

      <section id="tq-business" className="border-y border-[color:var(--border)] bg-white/20 py-14 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            eyebrow="02 • TQ Business Learning Center"
            title="Modul Pelatihan"
            description="Topik pelatihan, Company Profile, Team Pengajar, foto-foto kegiatan, dan testimoni peserta berada dalam satu area yang jelas."
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

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)]">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Company Profile</div>
              <h3 className="mt-2 text-xl font-black">{COMPANY_PROFILE.title}</h3>
              <p className="mt-3 text-sm font-semibold">{COMPANY_PROFILE.intro}</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{COMPANY_PROFILE.description}</p>
              <div className="mt-5 rounded-2xl border border-dashed border-[color:var(--border)] p-5 text-sm text-[color:var(--muted)]">Logo, profil perusahaan, pengalaman, klien, dan materi pendukung dapat ditambahkan di area ini.</div>
            </article>

            <article className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-soft)]">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Team Pengajar</div>
              <h3 className="mt-2 text-xl font-black">Trainer & Facilitator</h3>
              {TRAINERS.length ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {TRAINERS.map((trainer) => (
                    <div key={trainer.name} className="rounded-2xl border border-[color:var(--border)] p-4">
                      {trainer.image ? (
                        <div className="relative mb-3 aspect-square overflow-hidden rounded-xl">
                          <Image src={trainer.image} alt={trainer.name} fill className="object-cover" sizes="200px" />
                        </div>
                      ) : null}
                      <div className="text-sm font-black">{trainer.name}</div>
                      <div className="text-xs text-[color:var(--muted)]">{trainer.role}</div>
                      {trainer.expertise && <div className="mt-2 text-xs">{trainer.expertise}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {["Pengajar 1", "Pengajar 2", "Pengajar 3"].map((name) => (
                    <div key={name} className="grid aspect-square place-items-center rounded-2xl border border-dashed border-[color:var(--border)] text-center text-xs font-bold text-[color:var(--muted)]">{name}<br />foto & profil menyusul</div>
                  ))}
                </div>
              )}
            </article>
          </div>

          <div className="mt-9">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Dokumentasi</div>
                <h3 className="mt-1 text-xl font-black">Foto-foto Pelatihan</h3>
              </div>
              <span className="text-xs text-[color:var(--muted)]">Foto asli dapat ditambahkan setelah materi diterima.</span>
            </div>
            {TRAINING_PHOTOS.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TRAINING_PHOTOS.map((photo) => (
                  <article key={photo.title} className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
                    {photo.image ? (
                      <div className="relative aspect-[16/10]">
                        <Image src={photo.image} alt={photo.title} fill className="object-cover" sizes="(min-width:1024px) 33vw, 100vw" />
                      </div>
                    ) : (
                      <EmptyVisual label={photo.title} ratio="aspect-[16/10]" />
                    )}
                    <div className="p-4">
                      <div className="text-sm font-black">{photo.title}</div>
                      {photo.caption && <div className="mt-1 text-xs text-[color:var(--muted)]">{photo.caption}</div>}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {["Dokumentasi Training 1", "Dokumentasi Training 2", "Dokumentasi Training 3"].map((label) => (
                  <div key={label} className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
                    <EmptyVisual label={label} ratio="aspect-[16/10]" />
                    <div className="p-4 text-sm font-black">{label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-9">
            <div className="mb-4">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--primary)]">Testimoni Pelatihan</div>
              <h3 className="mt-1 text-xl font-black">Apa kata peserta pelatihan</h3>
            </div>
            {TRAINING_TESTIMONIALS.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {TRAINING_TESTIMONIALS.map((item) => <TestimonialCard key={`${item.name}-${item.quote}`} item={item} />)}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-3">
                {["Peserta Pelatihan 1", "Peserta Pelatihan 2", "Peserta Pelatihan 3"].map((label) => <PlaceholderTestimonial key={label} title={label} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="buku-ebook" className="mx-auto max-w-7xl px-4 py-14">
        <SectionHead
          eyebrow="03 • Buku & E-Books"
          title="Buku dan E-Book"
          description="Buku cetak dan produk digital dipisahkan agar calon pembeli mudah melihat jenis produk, pendahuluan, deskripsi, cover, dan cara mendapatkannya."
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
      </section>

      <section id="kuliner" className="border-y border-[color:var(--border)] bg-white/20 py-14 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            eyebrow="04 • Kuliner"
            title="Produk Kuliner"
            description="Mie Kriuk, Nasgomer, Mie Godhog Kuah Merah, Es Kopi Susu Gula Aren, dan Es Kopi Susu Jahe. Foto, harga, pendahuluan, serta deskripsi dapat dilengkapi bertahap."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CULINARY.map((item) => <CatalogCard key={item.name} item={item} />)}
          </div>
        </div>
      </section>

      <section id="testimoni" className="mx-auto max-w-7xl px-4 py-14">
        <SectionHead
          eyebrow="05 • Testimoni"
          title="Testimoni pelanggan, peserta, pembaca & mitra"
          description="Area testimoni umum untuk pengalaman terhadap produk Joe Coffee, kuliner, pelatihan, buku, e-book, maupun kerja sama."
        />
        {TESTIMONIALS.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => <TestimonialCard key={`${item.name}-${item.quote}`} item={item} />)}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {["Testimoni Pelanggan", "Testimoni Peserta", "Testimoni Pembaca", "Testimoni Mitra"].map((label) => <PlaceholderTestimonial key={label} title={label} />)}
          </div>
        )}
      </section>

      <footer className="border-t border-[color:var(--border)] bg-[color:var(--card)] py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          <div>
            <div className="font-black">JOE Coffee</div>
            <p className="mt-2 text-sm text-[color:var(--muted)]">Joe 100 • Joe 200 • Joe 500 • Joe 1kg</p>
          </div>
          <div>
            <div className="font-black">TQ Business Learning Center</div>
            <p className="mt-2 text-sm text-[color:var(--muted)]">Training • Company Profile • Team Pengajar • Dokumentasi • Testimoni</p>
          </div>
          <div>
            <div className="font-black">Kontak</div>
            <a className="mt-2 inline-block text-sm font-bold text-[color:var(--primary)]" href={waLink("Halo, saya ingin mendapatkan informasi lebih lanjut.")} target="_blank" rel="noreferrer">WhatsApp →</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
