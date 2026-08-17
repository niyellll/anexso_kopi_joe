export type CatalogItem = {
  name: string;
  label?: string;
  intro: string;
  description: string;
  price?: string;
  image?: string;
  status?: string;
};

export type TrainingTopic = {
  title: string;
  intro: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image?: string;
};

export const DASHBOARD_CATEGORIES = [
  {
    number: "01",
    title: "Joe Coffee",
    href: "#joe-coffee",
    intro: "Produk utama Joe Coffee dalam empat pilihan kemasan.",
    items: ["Joe 100", "Joe 200", "Joe 500", "Joe 1kg"],
  },
  {
    number: "02",
    title: "TQ Business Learning Center",
    href: "#tq-business",
    intro: "Training, company profile, team pengajar, dokumentasi kegiatan, dan testimoni peserta.",
    items: ["Topik Pelatihan", "Foto-foto", "Company Profile", "Team Pengajar", "Testimoni Pelatihan"],
  },
  {
    number: "03",
    title: "Buku & E-Books",
    href: "#buku-ebook",
    intro: "Buku cetak dan e-book untuk bacaan, refleksi, pembelajaran, dan pengembangan usaha.",
    items: ["Geguritan Merapi", "Pinesthi", "Mengapa Tuhan Seakan Diam", "Warung Ramai Ramai Untungnya Kemana"],
  },
  {
    number: "04",
    title: "Kuliner",
    href: "#kuliner",
    intro: "Pilihan makanan dan minuman JOE yang dapat dipesan dan dikembangkan sebagai katalog kuliner.",
    items: ["Mie Kriuk", "Nasgomer", "Mie Godhog Kuah Merah", "Es Kopi Susu Gula Aren", "Es Kopi Susu Jahe"],
  },
  {
    number: "05",
    title: "Testimoni",
    href: "#testimoni",
    intro: "Pengalaman pelanggan, peserta pelatihan, pembaca, dan mitra.",
    items: ["Peserta Training", "Pelanggan", "Pembaca", "Mitra"],
  },
] as const;

export const JOE_COFFEE: CatalogItem[] = [
  {
    name: "Joe 100",
    label: "100 gram",
    intro: "Ukuran praktis untuk mencoba rasa JOE Coffee atau stok harian kecil.",
    description: "Blend Robusta dan Arabika, tanpa bahan pengawet dan tanpa campuran lainnya.",
    price: "Rp33.000",
    image: "/produk-kopi-bubuk-100gr.jpeg",
  },
  {
    name: "Joe 200",
    label: "200 gram",
    intro: "Ukuran favorit untuk persediaan kopi di rumah.",
    description: "JOE Kopi Bubuk dikemas 200 gram dengan takaran seduh sekitar 10 gram per sajian.",
    price: "Rp66.000",
    image: "/produk-kopi-bubuk-200gr.jpeg",
  },
  {
    name: "Joe 500",
    label: "500 gram",
    intro: "Ukuran sedang untuk peminum rutin, kantor kecil, atau stok mingguan.",
    description: "Harga dan ketersediaan dapat dikonfirmasi melalui WhatsApp.",
    price: "Konfirmasi harga",
    image: "/produk-kopi-bubuk-500gr.jpeg",
  },
  {
    name: "Joe 1kg",
    label: "1 kilogram",
    intro: "Ukuran besar untuk kantor, event, reseller, atau stok lebih lama.",
    description: "JOE Kopi Bubuk dalam kemasan 1 kilogram untuk kebutuhan yang lebih besar.",
    price: "Rp285.000",
    image: "/produk-kopi-bubuk-1kg.jpeg",
  },
];

export const TRAINING_TOPICS: TrainingTopic[] = [
  { title: "Leadership", intro: "Pengembangan kemampuan memimpin, mengambil keputusan, mengarahkan, dan membangun tim." },
  { title: "Communications", intro: "Komunikasi efektif untuk penyampaian pesan, koordinasi, pelayanan, dan hubungan kerja." },
  { title: "Positive Attitude", intro: "Pengembangan sikap positif, tanggung jawab, dan pola pikir konstruktif dalam bekerja." },
  { title: "Team Building", intro: "Penguatan kerja sama, kepercayaan, pembagian peran, dan koordinasi dalam tim." },
  { title: "Standard Operating Procedure", intro: "Penyusunan dan penerapan SOP agar proses kerja lebih jelas, konsisten, dan mudah dikendalikan." },
  { title: "Key Performance Indicator", intro: "Pengenalan dan penyusunan KPI untuk membantu organisasi mengukur kinerja secara terarah." },
  { title: "Strategic Management", intro: "Menghubungkan tujuan organisasi, prioritas, strategi, program kerja, dan pelaksanaan." },
];

export const COMPANY_PROFILE = {
  title: "TQ Business Learning Center",
  intro: "Pusat pembelajaran bisnis dan pengembangan sumber daya manusia.",
  description:
    "Bagian Company Profile disiapkan untuk menjelaskan latar belakang, pengalaman, kompetensi, layanan, pendekatan pembelajaran, serta rekam jejak TQ Business Learning Center. Materi final dapat ditambahkan tanpa mengubah layout halaman.",
};

export const TRAINING_PHOTOS: { title: string; image?: string; caption?: string }[] = [];

export const TRAINERS: { name: string; role: string; expertise?: string; image?: string }[] = [];

export const TRAINING_TESTIMONIALS: Testimonial[] = [];

export const CULINARY: CatalogItem[] = [
  {
    name: "Mie Kriuk",
    intro: "Produk kuliner JOE.",
    description: "Foto, harga, pendahuluan produk, dan deskripsi lengkap dapat ditambahkan saat materi final tersedia.",
    status: "Materi produk disiapkan",
  },
  {
    name: "Nasgomer",
    intro: "Produk kuliner JOE.",
    description: "Foto, harga, pendahuluan produk, dan deskripsi lengkap dapat ditambahkan saat materi final tersedia.",
    status: "Materi produk disiapkan",
  },
  {
    name: "Mie Godhog Kuah Merah",
    intro: "Produk kuliner JOE.",
    description: "Foto, harga, pendahuluan produk, dan deskripsi lengkap dapat ditambahkan saat materi final tersedia.",
    status: "Materi produk disiapkan",
  },
  {
    name: "Es Kopi Susu Gula Aren",
    intro: "Minuman kopi susu dingin JOE.",
    description: "Joe Espresso, Susu Diamond, Gula Aren, dan Es.",
    image: "/produk-es-kopi-susu-gula-aren.jpeg",
  },
  {
    name: "Es Kopi Susu Jahe",
    intro: "Minuman kopi susu dingin dengan sentuhan jahe.",
    description: "Joe Espresso, Susu Diamond, Gula Aren, Es, dan Jahe.",
    image: "/produk-es-kopi-susu-gula-aren.jpeg",
  },
];

export const BOOKS: CatalogItem[] = [
  {
    name: "Geguritan Merapi",
    label: "Buku",
    intro: "Buku cetak.",
    description: "Cover, pendahuluan, sinopsis, harga, dan informasi pemesanan dapat ditambahkan saat materi final tersedia.",
    status: "Materi buku disiapkan",
  },
  {
    name: "Pinesthi",
    label: "Buku",
    intro: "Buku cetak.",
    description: "Cover, pendahuluan, sinopsis, harga, dan informasi pemesanan dapat ditambahkan saat materi final tersedia.",
    status: "Materi buku disiapkan",
  },
];

export const EBOOKS: CatalogItem[] = [
  {
    name: "Mengapa Tuhan Seakan Diam",
    label: "E-Book",
    intro: "Produk bacaan digital.",
    description: "Cover, pendahuluan, sinopsis, harga, dan tautan akses dapat ditambahkan saat materi final tersedia.",
    status: "Materi e-book disiapkan",
  },
  {
    name: "Warung Ramai Ramai Untungnya Kemana",
    label: "E-Book",
    intro: "Produk bacaan digital.",
    description: "Cover, pendahuluan, sinopsis, harga, dan tautan akses dapat ditambahkan saat materi final tersedia.",
    status: "Materi e-book disiapkan",
  },
];

export const TESTIMONIALS: Testimonial[] = [];
