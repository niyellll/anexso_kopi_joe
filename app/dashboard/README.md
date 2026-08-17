# Panduan Isi Dashboard

Dashboard preview berada di `app/dashboard/page.tsx` dan data isinya berada di `app/dashboard/content.ts`.

Tujuan pemisahan ini adalah agar penambahan produk, topik pelatihan, buku, e-book, dan testimoni tidak perlu mengubah layout utama.

## 1. Menambah produk Joe Coffee atau Kuliner

Buka `app/dashboard/content.ts`, lalu tambahkan satu object pada array yang sesuai (`JOE_COFFEE` atau `CULINARY`).

Contoh:

```ts
{
  name: "Nama Produk",
  label: "Ukuran / jenis",
  intro: "Pendahuluan singkat produk.",
  description: "Deskripsi produk yang lebih lengkap.",
  price: "Rp00.000",
  image: "/nama-file-foto.jpeg",
  status: "Opsional",
},
```

Simpan foto produk di folder `public`, kemudian tuliskan path-nya pada field `image`.

## 2. Menambah topik pelatihan

Tambahkan data pada array `TRAINING_TOPICS`:

```ts
{
  title: "Judul Pelatihan",
  intro: "Penjelasan singkat materi pelatihan.",
},
```

## 3. Menambah Buku dan E-Book

Gunakan array `BOOKS` untuk buku cetak dan `EBOOKS` untuk produk digital. Field yang digunakan sama dengan produk lainnya: nama, label, pendahuluan, deskripsi, harga, cover, dan status.

## 4. Menambah Testimoni

Tambahkan ke `TESTIMONIALS`:

```ts
{
  name: "Nama",
  role: "Jabatan / Instansi / Keterangan",
  quote: "Isi testimoni.",
  image: "/foto-testimoni.jpeg",
},
```

## 5. Foto Pelatihan dan Team Pengajar

Saat foto final sudah tersedia, simpan foto ke folder `public`. Area dokumentasi dan Team Pengajar saat ini masih berupa placeholder agar halaman dapat direview tanpa menggunakan foto yang belum diberikan.

## Catatan

Branch preview: `agent/dashboard-4-kategori`.

Jangan merge ke `main` sebelum tampilan dan isi disetujui.
