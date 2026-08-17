export type CatalogItem = { name: string; label?: string; intro: string; description: string; price?: string; image?: string; status?: string };
export type TrainingTopic = { title: string; intro: string };
export type Testimonial = { name: string; role: string; quote: string; image?: string };

export const JOE_COFFEE_DESCRIPTION = "Joe Coffee is a blend of Arabica and Robusta coffee beans from Temanggung, Wonosobo, and surrounding areas. The blend is crafted for a balanced cup—not too acidic and not too bitter.";

export const DASHBOARD_CATEGORIES = [
  { number: "01", title: "Joe Coffee", href: "#joe-coffee", intro: JOE_COFFEE_DESCRIPTION, items: ["Joe 100", "Joe 200", "Joe 500", "Joe 1kg"] },
  { number: "02", title: "TQ Business Learning Center", href: "#tq-business", intro: "Training dan short course praktis untuk pengembangan people, systems, dan business performance.", items: ["Topik Pelatihan", "Foto-foto", "Company Profile", "Team Pengajar", "Testimoni Pelatihan"] },
  { number: "03", title: "Buku & E-Books", href: "#buku-ebook", intro: "Buku fisik dan e-book.", items: ["PINESTHI", "MERAPI", "Mengapa Tuhan Seakan Diam", "Warung Ramai, Ramai, Untungnya Kemana?"] },
  { number: "04", title: "Kuliner", href: "#kuliner", intro: "Pilihan makanan dan minuman JOE.", items: ["Mie Ayam Kriuk", "Nasgomer (Nasi Goreng Merah)", "Mie Godhog Merah", "Es Kopi", "Es Kopi Susu", "Es Kopi Jahe Serai", "Joe Espresso", "Joe Kopi Susu 1 Liter", "Monin - Tofico Coffee"] },
  { number: "05", title: "Testimoni", href: "#testimoni", intro: "Cerita dan pengalaman pelanggan, peserta pelatihan, pembaca, dan mitra.", items: ["Peserta Training", "Pelanggan", "Pembaca", "Mitra"] },
] as const;

export const JOE_COFFEE: CatalogItem[] = [
  { name: "Joe 100", label: "100 gram", intro: "Ukuran praktis untuk mencoba Joe Coffee atau menemani kebutuhan kopi harian.", description: JOE_COFFEE_DESCRIPTION, price: "Rp33.000", image: "/produk-kopi-bubuk-100gr.jpeg" },
  { name: "Joe 200", label: "200 gram", intro: "Ukuran yang pas untuk persediaan kopi di rumah.", description: JOE_COFFEE_DESCRIPTION, price: "Rp66.000", image: "/produk-kopi-bubuk-200gr.jpeg" },
  { name: "Joe 500", label: "500 gram", intro: "Pilihan untuk peminum rutin, kantor kecil, atau persediaan mingguan.", description: JOE_COFFEE_DESCRIPTION, price: "Konfirmasi harga", image: "/produk-kopi-bubuk-500gr.jpeg" },
  { name: "Joe 1kg", label: "1 kilogram", intro: "Kemasan besar untuk kantor, event, reseller, atau kebutuhan kopi yang lebih banyak.", description: JOE_COFFEE_DESCRIPTION, price: "Rp285.000", image: "/produk-kopi-bubuk-1kg.jpeg" },
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

export const COMPANY_PROFILE = { title: "TQ Business Learning Center", intro: "Pusat pembelajaran bisnis dan pengembangan sumber daya manusia.", description: "TQ Business Learning Center menghadirkan training dan short course praktis untuk pemilik usaha, supervisor, HR, dan profesional. Pembelajaran diarahkan pada pengembangan people, systems, leadership, communication, performance, dan strategic management." };
export const TRAINING_PHOTOS: { title: string; image?: string; caption?: string }[] = [];
export const TRAINERS: { name: string; role: string; expertise?: string; image?: string }[] = [];
export const TRAINING_TESTIMONIALS: Testimonial[] = [];

export const CULINARY: CatalogItem[] = [
  { name: "Mie Ayam Kriuk", intro: "Mie Ayam Kriuk JOE.", description: "Mie Telor Tiga Ayam + Semur Ayam + Saos Merah Rimbaria + Kriuk + Sambal.", image: "/mie-ayam-kriuk.jpg" },
  { name: "Nasgomer (Nasi Goreng Merah)", intro: "Nasgomer, Nasi Goreng Merah JOE.", description: "Nasi + Suwir Ayam + Sosis + Saos Merah Rimbaria + Telur Orek + Telur Dadar + Krupuk + Sambal.", image: "/nasgomer.jpg" },
  { name: "Mie Godhog Merah", intro: "Mie Godhog Merah JOE.", description: "Mie Telor 3 Ayam + Suwir Ayam + Saos Merah Rimbaria + Telur Orek + Sambal.", image: "/mie-godhog-merah.jpg" },
  { name: "Es Kopi", intro: "Es Kopi JOE.", description: "2 shot espresso + es.", image: "/produk-es-kopi.webp" },
  { name: "Es Kopi Susu", intro: "Es Kopi Susu JOE.", description: "2 shot espresso + Susu Diamond + Gula Aren + es.", image: "/produk-es-kopi-susu.webp" },
  { name: "Es Kopi Jahe Serai", intro: "Es Kopi Jahe Serai JOE.", description: "2 shot espresso + Susu Diamond + Gula Aren + Jahe + Serai + es.", image: "/produk-es-kopi-jahe-serai.webp" },
  { name: "Joe Espresso", intro: "Joe Espresso.", description: "1 shot espresso.", image: "/produk-joe-espresso.webp" },
  { name: "Joe Kopi Susu 1 Liter", intro: "Joe Kopi Susu kemasan 1 liter.", description: "Joe Coffee + Susu Diamond + Gula Aren, kemasan botol 1 liter.", image: "/produk-joe-kopi-susu-1-liter.webp" },
  { name: "Monin - Tofico Coffee", intro: "Monin - Tofico Coffee.", description: "2 shot espresso + Monin (Tofico) syrup + Gula Aren + Susu Diamond + es.", image: "/produk-monin-tofico-coffee.webp" },
];

export const BOOKS: CatalogItem[] = [
  { name: "PINESTHI", label: "Buku Fisik", intro: "Novel Bahasa Jawa.", description: "", image: "/pinesthi.jpg" },
  { name: "MERAPI", label: "Buku Fisik", intro: "Antologi Geguritan Basa Jawa.", description: "", image: "/merapi.jpg" },
];

export const EBOOKS: CatalogItem[] = [
  { name: "Mengapa Tuhan Seakan Diam", label: "E-Book", intro: "Rohani Kristen.", description: "", image: "/mengapa-tuhan-seakan-diam.jpg" },
  { name: "Warung Ramai, Ramai, Untungnya Kemana?", label: "E-Book", intro: "Seri UMKM.", description: "", image: "/warung-ramai-untung-kemana.jpg" },
];

export const TESTIMONIALS: Testimonial[] = [];
