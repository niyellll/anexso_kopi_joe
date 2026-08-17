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

export const JOE_COFFEE_DESCRIPTION =
  "Joe Coffee is a blend of Arabica and Robusta coffee beans from Temanggung, Wonosobo, and surrounding areas. The blend is crafted for a balanced cup—not too acidic and not too bitter.";

export const DASHBOARD_CATEGORIES = [
  {
    number: "01",
    title: "Joe Coffee",
    href: "#joe-coffee",
    intro: JOE_COFFEE_DESCRIPTION,
    items: ["Joe 100", "Joe 200", "Joe 500", "Joe 1kg"],
  },
  {
    number: "02",
    title: "TQ Business Learning Center",
    href: "#tq-business",
    intro: "Training dan short course praktis untuk pengembangan people, systems, dan business performance.",
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
    intro: "Pilihan makanan dan minuman JOE untuk menemani waktu santai, bekerja, maupun berkumpul.",
    items: ["Mie Kriuk", "Nasgomer", "Mie Godhog Kuah Merah", "Es Kopi Susu Gula Aren", "Es Kopi Susu Jahe"],
  },
  {
    number: "05",
    title: "Testimoni",
    href: "#testimoni",
    intro: "Cerita dan pengalaman pelanggan, peserta pelatihan, pembaca, dan mitra.",
    items: ["Peserta Training", "Pelanggan", "Pembaca", "Mitra"],
  },
] as const;

export const JOE_COFFEE: CatalogItem[] = [
  {
    name: "Joe 100",
    label: "100 gram",
    intro: "Ukuran praktis untuk mencoba Joe Coffee atau menemani kebutuhan kopi harian.",
    description: JOE_COFFEE_DESCRIPTION,
    price: "Rp33.000",
    image: "/produk-kopi-bubuk-100gr.jpeg",
  },
  {
    name: "Joe 200",
    label: "200 gram",
    intro: "Ukuran yang pas untuk persediaan kopi di rumah.",
    description: JOE_COFFEE_DESCRIPTION,
    price: "Rp66.000",
    image: "/produk-kopi-bubuk-200gr.jpeg",
  },
  {
    name: "Joe 500",
    label: "500 gram",
    intro: "Pilihan untuk peminum rutin, kantor kecil, atau persediaan mingguan.",
    description: JOE_COFFEE_DESCRIPTION,
    price: "Konfirmasi harga",
    image: "/produk-kopi-bubuk-500gr.jpeg",
  },
  {
    name: "Joe 1kg",
    label: "1 kilogram",
    intro: "Kemasan besar untuk kantor, event, reseller, atau kebutuhan kopi yang lebih banyak.",
    description: JOE_COFFEE_DESCRIPTION,
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
    "TQ Business Learning Center menghadirkan training dan short course praktis untuk pemilik usaha, supervisor, HR, dan profesional. Pembelajaran diarahkan pada pengembangan people, systems, leadership, communication, performance, dan strategic management.",
};

export const TRAINING_PHOTOS: { title: string; image?: string; caption?: string }[] = [];

export const TRAINERS: { name: string; role: string; expertise?: string; image?: string }[] = [];

export const TRAINING_TESTIMONIALS: Testimonial[] = [];

export const CULINARY: CatalogItem[] = [
  {
    name: "Mie Kriuk",
    intro: "Menu kuliner JOE.",
    description: "",
  },
  {
    name: "Nasgomer",
    intro: "Menu kuliner JOE.",
    description: "",
  },
  {
    name: "Mie Godhog Kuah Merah",
    intro: "Menu kuliner JOE.",
    description: "",
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
    description: "",
  },
  {
    name: "Pinesthi",
    label: "Buku",
    intro: "Buku cetak.",
    description: "",
  },
];

export const EBOOKS: CatalogItem[] = [
  {
    name: "Mengapa Tuhan Seakan Diam",
    label: "E-Book",
    intro: "Bacaan digital.",
    description: "",
  },
  {
    name: "Warung Ramai Ramai Untungnya Kemana",
    label: "E-Book",
    intro: "Bacaan digital.",
    description: "",
  },
];

export const TESTIMONIALS: Testimonial[] = [];
