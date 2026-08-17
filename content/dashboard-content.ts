export const DASHBOARD_CATEGORIES = [
  {
    id: "joe-coffee",
    title: "Joe Coffee",
    items: ["Joe 100", "Joe 200", "Joe 500", "Joe 1kg"],
  },
  {
    id: "tq-business-learning",
    title: "TQ Business & Learning",
    items: [
      "Leadership",
      "Communication",
      "Positive Attitude",
      "Team Building",
      "Standard Operating Procedure (SOP)",
      "Key Performance Indicator (KPI)",
      "Strategic Management",
    ],
    sections: ["Pendahuluan", "Deskripsi Pelatihan", "Foto-foto", "Testimoni"],
  },
  {
    id: "kuliner",
    title: "Kuliner",
    items: [
      "Mie Kriuk",
      "Nasgomer",
      "Mie Godhog Kuah Merah",
      "Es Kopi Susu Gula Aren",
      "Es Kopi Susu Jahe",
      "Dimsum",
      "Katsu",
    ],
  },
  {
    id: "buku-ebook",
    title: "Buku & E-Book",
    groups: [
      {
        title: "Buku",
        items: ["Geguritan Merapi", "Pinesthi"],
      },
      {
        title: "E-Book",
        items: ["Mengapa Tuhan Seakan Diam", "Warung Ramai Ramai Untungnya Kemana"],
      },
    ],
  },
] as const;

export const TESTIMONIAL_SECTION = {
  title: "Testimoni",
  description: "Pengalaman pelanggan, peserta pelatihan, dan pembaca.",
  fields: ["Nama", "Foto", "Jabatan/Instansi", "Produk/Pelatihan", "Isi Testimoni"],
  items: [],
} as const;
