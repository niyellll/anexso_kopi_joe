# ANEXSO Kopi JOE

Website resmi ANEXSO yang menjadi hub untuk:

- Joe Coffee
- TQ Business Learning Center
- Kuliner
- Buku fisik & e-book
- Testimoni

Stack utama: Next.js 16, React 19, Tailwind CSS 4, dan `next/image`.

## Menjalankan project

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run lint
npm run build
```

## Struktur konten

- `app/page.tsx` — entry point
- `app/dashboard/page.tsx` — layout halaman utama
- `app/dashboard/content.ts` — data produk, topik training, buku, e-book, dan testimoni
- `app/site-config.ts` — URL situs dan nomor WhatsApp
- `app/layout.tsx` — metadata SEO, font, dark mode, musik
- `app/robots.ts` — robots.txt
- `app/sitemap.ts` — sitemap.xml

## Menambah produk

Edit array yang sesuai di `app/dashboard/content.ts`.

```ts
{
  name: "Nama Produk",
  label: "Jenis / ukuran",
  intro: "Pendahuluan singkat.",
  description: "Deskripsi produk.",
  price: "Rp00.000",
  image: "/nama-foto.webp",
}
```

Simpan foto di folder `public/`. Gunakan WebP bila memungkinkan dan usahakan ukuran file di bawah 150 KB. `next/image` menangani resize dan lazy loading pada halaman.

Jika `price` tidak diisi, kartu tetap tampil dan tombol WhatsApp berubah menjadi **Tanya via WA**.

## Menambah materi pelatihan

Judul topik berada di `TRAINING_TOPICS`. Materi dan deskripsi dapat ditambahkan setelah naskah final tersedia. Foto training, team pengajar, dan testimoni tidak ditampilkan jika array datanya masih kosong.

## Menambah testimoni

Tambahkan ke `TESTIMONIALS` atau `TRAINING_TESTIMONIALS`:

```ts
{
  name: "Nama",
  role: "Jabatan / instansi",
  quote: "Isi testimoni",
  image: "/foto-testimoni.webp",
}
```

Section Testimoni otomatis muncul setelah terdapat data asli.

## WhatsApp

Setiap kartu produk membuat pesan WhatsApp berdasarkan nama produk dan harga. Nomor tujuan diatur melalui `PHONE_WA` pada `app/site-config.ts`.

## SEO

Project menyediakan metadata Open Graph, Twitter Card, JSON-LD, `robots.txt`, `sitemap.xml`, dan manifest. Untuk domain custom, set:

```bash
NEXT_PUBLIC_SITE_URL=https://domain-anda.com
```

Tanpa environment variable tersebut, situs menggunakan domain produksi Vercel.
