"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const BRAND = "Anexso Kopi JOE";

// ✅ Keterangan kopi + taste note sesuai request
const COFFEE_DESC = "Blend Robusta + Arabika — tanpa dicampur bahan lainnya.";
const TASTE_NOTE = "Kopi pahit tanpa gula.";

const TAGLINE =
  "Kopi pilihan untuk dinikmati di rumah, kantor, maupun hadiah — rasa konsisten, kemasan rapi, dan layanan cepat. " +
  `${COFFEE_DESC} ${TASTE_NOTE}`;

const ADDRESS =
  "Gg. kamboja CTX No.36, Karang Asem, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281";
const PHONE_DISPLAY = "+62 858-9999-3742";
const PHONE_WA = "6285899993742";
const EMAIL = "nielpickup@gmail.com";
const TOKOPEDIA_URL = "https://www.tokopedia.com/anexso-kopi-joe";

// ✅ Pembayaran (placeholder — kamu isi detailnya)
const PAYMENT = {
  bankName: "BCA / BRI / Mandiri",
  accountName: "ANEXSO KOPI JOE (isi nama penerima)",
  accountNo: "1234567890 (isi nomor rekening)",
  qrisImage: "", // contoh: "/qris-joe.png" (taruh filenya di /public)
  hasQRIS: true,
};

// ✅ Media links (kosong = placeholder)
const SOCIAL = {
  youtube: "", // contoh: "https://youtube.com/..."
  instagram: "", // contoh: "https://instagram.com/..."
  tiktok: "", // contoh: "https://tiktok.com/..."
  facebook: "", // contoh: "https://facebook.com/..."
};

// ✅ Tempat foto (isi src nanti kalau sudah ada)
const GALLERY: Array<{ title: string; src: string }> = [
  { title: "Foto produk 1", src: "" },
  { title: "Foto produk 2", src: "" },
  { title: "Foto packaging", src: "" },
  { title: "Foto aktivitas / booth", src: "" },
  { title: "Foto Dine In (nanti)", src: "" },
  { title: "Foto customer / testimoni", src: "" },
];

// ✅ Tempat video / embed (isi link nanti)
const VIDEOS: Array<{ title: string; platform: "YouTube" | "Instagram" | "TikTok" | "Facebook"; url: string }> =
  [
    { title: "Video profil / promo", platform: "YouTube", url: "" },
    { title: "Reels IG", platform: "Instagram", url: "" },
    { title: "TikTok promo", platform: "TikTok", url: "" },
    { title: "Facebook video", platform: "Facebook", url: "" },
  ];

// Angka statistik (⚠️ ganti sesuai data asli kamu)
const STATS = {
  shipped: "10K+",
  rating: "4.9/5",
  satisfaction: "100%",
};

type Product = {
  id: string;
  name: string;
  variant: string;
  price: number;
  note: string;
  bullets: string[];
};

const PRODUCTS: Product[] = [
  {
    id: "instan-50g",
    name: "JOE Kopi Bubuk Instan",
    variant: "50 gram",
    price: 17000,
    note: `Praktis untuk harian, rasa tetap mantap. ${COFFEE_DESC} ${TASTE_NOTE}`,
    bullets: ["Praktis", "Aroma kuat", "Pahit tanpa gula"],
  },
  {
    id: "sachet-10g",
    name: "JOE Coffee Bubuk Sachet",
    variant: "10 gram",
    price: 35000,
    note: `Sachet ringkas untuk dibawa kemana saja. ${COFFEE_DESC} ${TASTE_NOTE}`,
    bullets: ["Ringkas", "Mudah seduh", "Pahit tanpa gula"],
  },
  {
    id: "bubuk-200g",
    name: "JOE Coffee Bubuk",
    variant: "200 gram",
    price: 63000,
    note: `Pilihan favorit untuk stok mingguan. ${COFFEE_DESC} ${TASTE_NOTE}`,
    bullets: ["Value", "Rasa seimbang", "Pahit tanpa gula"],
  },
  {
    id: "bubuk-100g",
    name: "JOE Coffee Kopi Bubuk",
    variant: "100 gram",
    price: 33000,
    note: `Porsi pas untuk coba rasa sebelum stok besar. ${COFFEE_DESC} ${TASTE_NOTE}`,
    bullets: ["Pas untuk trial", "Fresh", "Pahit tanpa gula"],
  },
  {
    id: "biji-1kg",
    name: "JOE Coffee Bubuk / Biji",
    variant: "1 Kg",
    price: 290000,
    note: `Untuk kantor, event, atau reseller. ${COFFEE_DESC} ${TASTE_NOTE}`,
    bullets: ["Hemat", "Konsisten", "Pahit tanpa gula"],
  },
];

const TESTIMONIALS = [
  {
    name: "Dina",
    meta: "Sleman",
    quote: "Kemasannya rapi, aromanya wangi. Repeat order karena rasanya konsisten.",
  },
  {
    name: "Raka",
    meta: "Depok",
    quote: "Respon cepat, pengiriman aman. Cocok untuk stok jualan.",
  },
  {
    name: "Maya",
    meta: "Yogyakarta",
    quote: "Enak buat daily coffee. Ukuran 100g pas buat coba dulu.",
  },
];

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Icon({
  name,
}: {
  name:
    | "moon"
    | "sun"
    | "shield"
    | "truck"
    | "clock"
    | "heart"
    | "cart"
    | "whatsapp"
    | "tokopedia"
    | "phone"
    | "mail"
    | "map"
    | "volumeOn"
    | "volumeOff"
    | "bank"
    | "qris"
    | "media";
}) {
  const common = "w-5 h-5";
  switch (name) {
    case "moon":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 13.2A8.5 8.5 0 0 1 10.8 3 7.5 7.5 0 1 0 21 13.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sun":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2 20 6v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "truck":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 11h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path
            d="M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "clock":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "heart":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21s-7-4.6-9.2-9C1.3 8.3 3.4 5.8 6.3 5.5c1.6-.2 3.1.5 3.9 1.6.8-1.1 2.3-1.8 3.9-1.6 2.9.3 5 2.8 3.5 6.5C19 16.4 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cart":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6h15l-2 9H7L6 6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M9 20a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 9 20ZM17 20a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 17 20Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 12a8 8 0 0 1-12.9 6.2L4 19l.9-3.1A8 8 0 1 1 20 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.6 9.3c.2-.4.3-.4.6-.4h.5c.2 0 .4.1.5.4l.6 1.3c.1.3.1.5-.1.7l-.4.4c-.1.1-.2.2-.1.4.3.7 1.2 1.6 2 2 .2.1.3 0 .4-.1l.5-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3-.1.5-.5.7-.5.3-1.5.4-2.6-.1-1.1-.5-2.6-1.7-3.5-3.1-.9-1.4-1.1-2.4-.8-3 .1-.3.3-.5.5-.7Z"
            fill="currentColor"
          />
        </svg>
      );
    case "tokopedia":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16l-1 14H5L4 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 7a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "phone":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 3h3l2 5-2 1c1 2 3 4 5 5l1-2 5 2v3c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "map":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "volumeOn":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M15.5 8.5a4.5 4.5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M17.8 6.2a7.8 7.8 0 0 1 0 11.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "volumeOff":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "bank":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 10h18M5 10V20m4-10V20m6-10V20m4-10V20M3 20h18M12 4 3 9h18L12 4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case "qris":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 10v-6h6v6h-6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "media":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m9 11 2 2 4-4 3 3v4H6v-3l3-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function SoftCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "gpro-card rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)] backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

function PlaceholderMedia({ title }: { title: string }) {
  return (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-dashed border-[color:var(--border)] bg-white/40 p-4 text-center text-xs font-semibold text-[color:var(--muted)] dark:bg-white/5">
      <div>
        <div className="text-sm font-black text-[var(--foreground)]">{title}</div>
        <div className="mt-1">Tempat foto/video</div>
      </div>
    </div>
  );
}

function SocialButton({
  label,
  url,
}: {
  label: "YouTube" | "Instagram" | "TikTok" | "Facebook";
  url: string;
}) {
  const disabled = !url;
  return (
    <a
      href={disabled ? "#media" : url}
      target={disabled ? undefined : "_blank"}
      rel={disabled ? undefined : "noreferrer"}
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
      className={cx(
        "inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm font-black",
        disabled
          ? "cursor-not-allowed bg-white/40 text-[color:var(--muted)] dark:bg-white/5"
          : "bg-white/40 hover:opacity-90 dark:bg-white/5"
      )}
      title={disabled ? `${label} (belum diisi)` : `Buka ${label}`}
    >
      {label}
    </a>
  );
}

export default function Page() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);

  // ===== MUSIC =====
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // theme init (sync with localStorage + OS preference)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
    else if (saved === "light") setDark(false);
    else {
      const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      setDark(Boolean(prefers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // music init (persist)
  useEffect(() => {
    const saved = localStorage.getItem("music");
    if (saved === "off") setMusicOn(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("music", musicOn ? "on" : "off");
  }, [musicOn]);

  // try autoplay (volume pelan)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.volume = 0.12;
    el.loop = true;

    if (!musicOn) {
      el.pause();
      return;
    }

    (async () => {
      try {
        setAutoplayBlocked(false);
        await el.play();
      } catch {
        setAutoplayBlocked(true);
      }
    })();
  }, [musicOn]);

  // scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal on scroll
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).classList.add("is-visible");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const mapsLink = useMemo(() => {
    const q = encodeURIComponent(`${BRAND} ${ADDRESS}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.variant} ${p.note} ${p.bullets.join(" ")}`.toLowerCase().includes(q)
    );
  }, [query]);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const cartItems = useMemo(() => {
    return PRODUCTS.filter((p) => cart[p.id]).map((p) => ({
      ...p,
      qty: cart[p.id],
      subtotal: cart[p.id] * p.price,
    }));
  }, [cart]);

  const cartTotal = useMemo(() => cartItems.reduce((sum, i) => sum + i.subtotal, 0), [cartItems]);

  function addToCart(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }
  function decFromCart(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      const qty = (next[id] ?? 0) - 1;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }
  function removeFromCart(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }
  function clearCart() {
    setCart({});
  }

  const waCheckoutLink = useMemo(() => {
    const lines = [
      `Halo ${BRAND}, saya mau pesan:`,
      ...cartItems.map((i) => `- ${i.name} (${i.variant}) x${i.qty} = ${formatIDR(i.subtotal)}`),
      cartItems.length ? `Total: ${formatIDR(cartTotal)}` : "(keranjang masih kosong)",
      "",
      "Metode bayar: Transfer bank / QRIS (JOE Coffee sudah punya QRIS).",
      "Mohon info ketersediaan & ongkir ya. Terima kasih.",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${PHONE_WA}?text=${text}`;
  }, [cartItems, cartTotal]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Audio (taruh file: /public/mars-kopi-joe.mp3) */}
      <audio ref={audioRef} src="/mars-kopi-joe.mp3" preload="auto" />

      {/* background subtle */}
      <div className="pointer-events-none fixed inset-0 -z-10 gpro-animated-bg opacity-80" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--card)] backdrop-blur">
        {/* progress bar */}
        <div className="h-1 w-full bg-[color:var(--border)]">
          <div className="h-1 bg-[color:var(--primary)]" style={{ width: `${progress}%` }} />
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[color:var(--border)] bg-white/40 font-black tracking-tight dark:bg-white/5">
              JOE
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black">{BRAND}</div>
              <div className="text-xs text-[color:var(--muted)]">Sleman • Yogyakarta</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[color:var(--muted)] md:flex">
            <a className="hover:opacity-80" href="#produk">
              Produk
            </a>
            <a className="hover:opacity-80" href="#dinein">
              Dine In
            </a>
            <a className="hover:opacity-80" href="#media">
              Media
            </a>
            <a className="hover:opacity-80" href="#testimoni">
              Testimoni
            </a>
            <a className="hover:opacity-80" href="#kontak">
              Kontak
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Music toggle */}
            <button
              onClick={() => setMusicOn((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-3 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              aria-label="Toggle music"
              title="Music"
            >
              {musicOn ? <Icon name="volumeOn" /> : <Icon name="volumeOff" />}
              <span className="hidden sm:inline">{musicOn ? "Music" : "Muted"}</span>
            </button>

            <button
              onClick={() => setDark((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-3 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {dark ? <Icon name="moon" /> : <Icon name="sun" />}
              <span className="hidden sm:inline">{dark ? "Dark" : "Light"}</span>
            </button>

            <a
              href={TOKOPEDIA_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5 sm:inline-flex"
              title="Buka Tokopedia"
            >
              <Icon name="tokopedia" />
              Tokopedia
            </a>

            <a
              href={waCheckoutLink}
              className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-4 py-2 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
              title="Order via WhatsApp"
            >
              <Icon name="whatsapp" />
              Order
            </a>

            <a
              href="#checkout"
              className="relative inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-3 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              title="Keranjang"
            >
              <Icon name="cart" />
              <span className="hidden sm:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-[color:var(--primary)] px-1 text-xs font-black text-[color:var(--primary-foreground)]">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* kalau autoplay diblokir, kasih CTA klik */}
      {autoplayBlocked && musicOn && (
        <button
          onClick={async () => {
            try {
              await audioRef.current?.play();
              setAutoplayBlocked(false);
            } catch {}
          }}
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm font-black shadow-[var(--shadow)] backdrop-blur"
        >
          Tap untuk nyalakan musik 🎵
        </button>
      )}

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="gpro-reveal" data-reveal>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/40 px-3 py-1 text-xs font-semibold text-[color:var(--muted)] dark:bg-white/5">
                <span className="h-2 w-2 rounded-full bg-[color:var(--primary)]" />
                Ready stock • Packing aman • Respon cepat
                <span className="mx-1 opacity-60">•</span>
                <span className="font-black text-[color:var(--primary)]">Robusta + Arabika</span>
                <span className="mx-1 opacity-60">•</span>
                Tanpa campuran
                <span className="mx-1 opacity-60">•</span>
                Pahit tanpa gula
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                Kopi yang bikin <span className="text-[color:var(--primary)]">percaya</span>
                <br />
                dari rasa sampai pelayanan.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">{TAGLINE}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waCheckoutLink}
                  className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
                >
                  <Icon name="whatsapp" />
                  Order via WhatsApp
                </a>

                <a
                  href={TOKOPEDIA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-black hover:opacity-90 dark:bg-white/5"
                >
                  <Icon name="tokopedia" />
                  Beli di Tokopedia
                </a>

                <a
                  href={`tel:${PHONE_WA}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
                >
                  <Icon name="phone" />
                  Telepon
                </a>

                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
                >
                  <Icon name="map" />
                  Lokasi
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <SoftCard className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
                      <Icon name="shield" />
                    </span>
                    <div>
                      <div className="text-sm font-black">Blend Jujur</div>
                      <div className="text-xs text-[color:var(--muted)]">Robusta + Arabika, tanpa campuran.</div>
                    </div>
                  </div>
                </SoftCard>

                <SoftCard className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
                      <Icon name="truck" />
                    </span>
                    <div>
                      <div className="text-sm font-black">Packing Aman</div>
                      <div className="text-xs text-[color:var(--muted)]">Rapi, cocok juga untuk hadiah.</div>
                    </div>
                  </div>
                </SoftCard>

                <SoftCard className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
                      <Icon name="heart" />
                    </span>
                    <div>
                      <div className="text-sm font-black">Taste</div>
                      <div className="text-xs text-[color:var(--muted)]">Pahit tanpa gula, mantap.</div>
                    </div>
                  </div>
                </SoftCard>
              </div>
            </div>

            {/* Right card */}
            <SoftCard className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-black">Cari produk</div>
                  <div className="text-xs text-[color:var(--muted)]">Ketik nama/varian</div>
                </div>
                <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-black dark:bg-white/10">
                  {filteredProducts.length} item
                </span>
              </div>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: 200g, sachet, instan..."
                className="mt-4 w-full rounded-2xl border border-[color:var(--border)] bg-white/60 px-4 py-3 text-sm outline-none placeholder:text-[color:var(--muted)] dark:bg-white/5"
              />

              <div className="mt-5 space-y-3">
                {filteredProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 dark:bg-white/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-black">{p.name}</div>
                        <div className="text-xs text-[color:var(--muted)]">
                          {p.variant} • {formatIDR(p.price)}
                        </div>
                        <div className="mt-2 text-xs text-[color:var(--muted)]">{p.note}</div>
                      </div>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="shrink-0 rounded-xl bg-[color:var(--primary)] px-3 py-2 text-xs font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
                      >
                        + Keranjang
                      </button>
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 text-xs text-[color:var(--muted)] dark:bg-white/5">
                  Tip: Tambahkan ke keranjang, lalu checkout via WhatsApp. Pembayaran bisa transfer bank atau QRIS.
                </div>
              </div>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* Produk */}
      <section id="produk" className="mx-auto max-w-6xl px-4 py-10">
        <div className="gpro-reveal" data-reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Produk Kopi</h2>
              <p className="mt-2 max-w-2xl text-sm text-[color:var(--muted)]">
                {COFFEE_DESC} {TASTE_NOTE} Pilih ukuran sesuai kebutuhan.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={TOKOPEDIA_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              >
                <Icon name="tokopedia" />
                Tokopedia
              </a>
              <a
                href={waCheckoutLink}
                className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-4 py-2 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
              >
                <Icon name="whatsapp" />
                Order WA
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => {
              const qty = cart[p.id] ?? 0;
              return (
                <SoftCard key={p.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-[color:var(--muted)]">{p.variant}</div>
                      <div className="text-lg font-black leading-tight">{p.name}</div>
                    </div>
                    <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-black dark:bg-white/10">
                      {formatIDR(p.price)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[color:var(--muted)]">{p.note}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.bullets.map((b) => (
                      <span
                        key={b}
                        className="rounded-full border border-[color:var(--border)] bg-white/50 px-3 py-1 text-xs font-semibold dark:bg-white/10"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    {qty > 0 ? (
                      <div className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/50 px-2 py-1 dark:bg-white/10">
                        <button
                          onClick={() => decFromCart(p.id)}
                          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/60 dark:hover:bg-white/10"
                          aria-label="Kurangi"
                        >
                          −
                        </button>
                        <div className="min-w-8 text-center text-sm font-black">{qty}</div>
                        <button
                          onClick={() => addToCart(p.id)}
                          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/60 dark:hover:bg-white/10"
                          aria-label="Tambah"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(p.id)}
                        className="rounded-xl bg-[color:var(--primary)] px-4 py-2 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
                      >
                        + Keranjang
                      </button>
                    )}

                    <a
                      href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                        `Halo ${BRAND}, saya mau pesan ${p.name} (${p.variant}). ${COFFEE_DESC} ${TASTE_NOTE} Mohon info stok & ongkir ya.`
                      )}`}
                      className="text-sm font-semibold text-[color:var(--primary)] hover:opacity-80"
                    >
                      Chat WA →
                    </a>
                  </div>

                  {qty > 0 && (
                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="mt-3 w-full rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-xs font-black hover:opacity-90 dark:bg-white/5"
                    >
                      Hapus dari keranjang
                    </button>
                  )}
                </SoftCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dine In (placeholder) */}
      <section id="dinein" className="mx-auto max-w-6xl px-4 py-14">
        <div className="gpro-reveal" data-reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Menu Dine In</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                (Coming soon) Nanti tinggal kamu isi menu + harga + foto.
              </p>
            </div>
            <span className="rounded-full border border-[color:var(--border)] bg-white/40 px-3 py-1 text-xs font-black text-[color:var(--muted)] dark:bg-white/5">
              Akan ditambahkan
            </span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <SoftCard className="p-5">
              <div className="text-sm font-black">Contoh item Dine In</div>
              <div className="mt-2 text-xs text-[color:var(--muted)]">
                Nama menu • Deskripsi singkat • Harga
              </div>
              <div className="mt-4">
                <PlaceholderMedia title="Foto menu Dine In" />
              </div>
            </SoftCard>

            <SoftCard className="p-5">
              <div className="text-sm font-black">Contoh item Dine In</div>
              <div className="mt-2 text-xs text-[color:var(--muted)]">
                Nama menu • Deskripsi singkat • Harga
              </div>
              <div className="mt-4">
                <PlaceholderMedia title="Foto menu Dine In" />
              </div>
            </SoftCard>

            <SoftCard className="p-5">
              <div className="text-sm font-black">Contoh item Dine In</div>
              <div className="mt-2 text-xs text-[color:var(--muted)]">
                Nama menu • Deskripsi singkat • Harga
              </div>
              <div className="mt-4">
                <PlaceholderMedia title="Foto menu Dine In" />
              </div>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* Media (foto / video / social) */}
      <section id="media" className="mx-auto max-w-6xl px-4 py-14">
        <div className="gpro-reveal" data-reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Media</h2>
              <p className="mt-2 max-w-2xl text-sm text-[color:var(--muted)]">
                Tempat foto & video. Kamu tinggal isi link YouTube/IG/TikTok/FB dan upload fotonya nanti.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <SocialButton label="YouTube" url={SOCIAL.youtube} />
              <SocialButton label="Instagram" url={SOCIAL.instagram} />
              <SocialButton label="TikTok" url={SOCIAL.tiktok} />
              <SocialButton label="Facebook" url={SOCIAL.facebook} />
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-5">
            <SoftCard className="p-6 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-black">Galeri Foto</div>
                <div className="text-xs text-[color:var(--muted)]">Placeholder (isi nanti)</div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {GALLERY.map((g) => (
                  <div key={g.title}>
                    {g.src ? (
                      <img
                        src={g.src}
                        alt={g.title}
                        className="aspect-[4/3] w-full rounded-2xl border border-[color:var(--border)] object-cover"
                      />
                    ) : (
                      <PlaceholderMedia title={g.title} />
                    )}
                  </div>
                ))}
              </div>
            </SoftCard>

            <SoftCard className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-black">Video</div>
                <div className="text-xs text-[color:var(--muted)]">Link/embed (isi nanti)</div>
              </div>

              <div className="mt-4 space-y-3">
                {VIDEOS.map((v) => (
                  <div key={v.title} className="rounded-2xl border border-[color:var(--border)] bg-white/50 p-4 dark:bg-white/10">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-black">{v.title}</div>
                        <div className="text-xs text-[color:var(--muted)]">{v.platform}</div>
                      </div>
                      <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black dark:bg-white/10">
                        {v.url ? "Link OK" : "Belum diisi"}
                      </span>
                    </div>

                    <div className="mt-3">
                      {v.url ? (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-4 py-2 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
                        >
                          <Icon name="media" />
                          Buka video
                        </a>
                      ) : (
                        <PlaceholderMedia title={`Tempat ${v.platform} embed / link`} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section id="testimoni" className="mx-auto max-w-6xl px-4 py-14">
        <div className="gpro-reveal" data-reveal>
          <h2 className="text-2xl font-black md:text-3xl">Testimoni Pelanggan</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <SoftCard key={t.name} className="p-6">
                <p className="text-sm leading-relaxed text-[color:var(--muted)]">“{t.quote}”</p>
                <div className="mt-4 text-sm font-black">{t.name}</div>
                <div className="text-xs text-[color:var(--muted)]">{t.meta}</div>
              </SoftCard>
            ))}
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            <Faq q="Bisa kirim luar kota?" a="Bisa. Packing aman dan pengiriman sesuai layanan ekspedisi yang tersedia." />
            <Faq q="Bisa untuk kantor / reseller?" a="Bisa. Varian 1 Kg cocok untuk kantor, event, atau reseller. Chat WA untuk diskusi." />
            <Faq q="Pembayaran bagaimana?" a="Bisa transfer bank atau QRIS. JOE Coffee sudah punya QRIS — tinggal minta via WhatsApp." />
            <Faq q="Kopinya manis atau pahit?" a="Ciri khas JOE Coffee: pahit tanpa gula (tanpa campuran bahan lainnya)." />
          </div>
        </div>
      </section>

      {/* Checkout */}
      <section id="checkout" className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <div className="gpro-reveal" data-reveal>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Checkout</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Keranjang akan dibuat menjadi pesan otomatis untuk WhatsApp. Pembayaran: Transfer bank / QRIS.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={clearCart}
                className="rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              >
                Kosongkan
              </button>
              <a
                href={waCheckoutLink}
                className={cx(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black",
                  cartItems.length
                    ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
                    : "cursor-not-allowed bg-white/40 text-[color:var(--muted)] dark:bg-white/5"
                )}
                aria-disabled={!cartItems.length}
                onClick={(e) => {
                  if (!cartItems.length) e.preventDefault();
                }}
              >
                <Icon name="whatsapp" />
                Kirim via WA
              </a>
              <a
                href={TOKOPEDIA_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-black hover:opacity-90 dark:bg-white/5"
              >
                <Icon name="tokopedia" />
                Tokopedia
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <SoftCard className="p-6 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-black">Item di keranjang</div>
                <div className="text-xs text-[color:var(--muted)]">{cartCount} item</div>
              </div>

              <div className="mt-4 space-y-3">
                {cartItems.length ? (
                  cartItems.map((i) => (
                    <div
                      key={i.id}
                      className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 dark:bg-white/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-black">{i.name}</div>
                          <div className="text-xs text-[color:var(--muted)]">
                            {i.variant} • {formatIDR(i.price)}
                          </div>
                          <div className="mt-2 text-xs font-black">Subtotal: {formatIDR(i.subtotal)}</div>
                          <div className="mt-1 text-xs text-[color:var(--muted)]">
                            {COFFEE_DESC} {TASTE_NOTE}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/50 px-2 py-1 dark:bg-white/10">
                            <button
                              onClick={() => decFromCart(i.id)}
                              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/60 dark:hover:bg-white/10"
                            >
                              −
                            </button>
                            <div className="min-w-8 text-center text-sm font-black">{i.qty}</div>
                            <button
                              onClick={() => addToCart(i.id)}
                              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/60 dark:hover:bg-white/10"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(i.id)}
                            className="text-xs font-black text-[color:var(--primary)] hover:opacity-80"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-[color:var(--border)] p-6 text-sm text-[color:var(--muted)]">
                    Keranjang kosong. Tambahkan produk dari bagian{" "}
                    <a className="font-black underline" href="#produk">
                      Produk
                    </a>
                    .
                  </div>
                )}
              </div>
            </SoftCard>

            <SoftCard className="p-6 lg:col-span-2">
              <div className="text-sm font-black">Ringkasan</div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-[color:var(--muted)]">
                  <span>Total item</span>
                  <span className="font-black text-[var(--foreground)]">{cartCount}</span>
                </div>
                <div className="flex items-center justify-between text-[color:var(--muted)]">
                  <span>Total harga</span>
                  <span className="font-black text-[var(--foreground)]">{formatIDR(cartTotal)}</span>
                </div>

                <div className="mt-3 rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 text-xs text-[color:var(--muted)] dark:bg-white/5">
                  Ongkir & ketersediaan dikonfirmasi via WhatsApp sesuai alamat pengiriman.
                </div>
              </div>

              {/* ✅ Payment methods */}
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-sm font-black">
                    <Icon name="bank" />
                    Transfer Bank
                  </div>
                  <div className="mt-2 text-xs text-[color:var(--muted)]">
                    {PAYMENT.bankName}
                    <br />
                    a.n. {PAYMENT.accountName}
                    <br />
                    No. {PAYMENT.accountNo}
                  </div>
                </div>

                <div className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 dark:bg-white/5">
                  <div className="flex items-center gap-2 text-sm font-black">
                    <Icon name="qris" />
                    QRIS (JOE Coffee)
                  </div>
                  <div className="mt-2 text-xs text-[color:var(--muted)]">
                    {PAYMENT.hasQRIS ? "QRIS tersedia (minta via WA)." : "QRIS belum tersedia."}
                  </div>
                  <div className="mt-3">
                    {PAYMENT.qrisImage ? (
                      <img
                        src={PAYMENT.qrisImage}
                        alt="QRIS JOE Coffee"
                        className="w-full rounded-2xl border border-[color:var(--border)] object-cover"
                      />
                    ) : (
                      <PlaceholderMedia title="Tempat gambar QRIS (upload nanti)" />
                    )}
                  </div>
                </div>
              </div>

              <a
                href={waCheckoutLink}
                className={cx(
                  "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black",
                  cartItems.length
                    ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
                    : "cursor-not-allowed bg-white/40 text-[color:var(--muted)] dark:bg-white/5"
                )}
                aria-disabled={!cartItems.length}
                onClick={(e) => {
                  if (!cartItems.length) e.preventDefault();
                }}
              >
                <Icon name="whatsapp" />
                Checkout via WhatsApp
              </a>

              <a
                href={`tel:${PHONE_WA}`}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              >
                <Icon name="phone" />
                {PHONE_DISPLAY}
              </a>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="mx-auto max-w-6xl px-4 pb-20 pt-4">
        <div className="gpro-reveal" data-reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <SoftCard className="p-6">
              <h2 className="text-2xl font-black md:text-3xl">Hubungi Kami</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Ada pertanyaan? Kami siap membantu. Pembayaran bisa transfer bank atau QRIS.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 dark:bg-white/5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[color:var(--primary)]">
                      <Icon name="map" />
                    </span>
                    <div>
                      <div className="text-sm font-black">Alamat</div>
                      <div className="mt-1 text-sm text-[color:var(--muted)]">{ADDRESS}</div>
                      <a
                        href={mapsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-sm font-black text-[color:var(--primary)] hover:opacity-80"
                      >
                        Buka di Google Maps →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={waCheckoutLink}
                    className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 hover:opacity-90 dark:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[color:var(--primary)]">
                        <Icon name="whatsapp" />
                      </span>
                      <div>
                        <div className="text-sm font-black">WhatsApp</div>
                        <div className="text-sm text-[color:var(--muted)]">{PHONE_DISPLAY}</div>
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 hover:opacity-90 dark:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[color:var(--primary)]">
                        <Icon name="mail" />
                      </span>
                      <div>
                        <div className="text-sm font-black">Email</div>
                        <div className="text-sm text-[color:var(--muted)]">{EMAIL}</div>
                      </div>
                    </div>
                  </a>
                </div>

                <a
                  href={TOKOPEDIA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
                >
                  <Icon name="tokopedia" />
                  Kunjungi Tokopedia Resmi
                </a>
              </div>
            </SoftCard>

            <SoftCard className="p-6">
              <h3 className="text-lg font-black">Kirim Pesan Cepat</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">Klik tombol untuk langsung chat (pesan otomatis).</p>

              <div className="mt-5 grid gap-3">
                <QuickMessage
                  label="Tanya stok & rekomendasi"
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                    `Halo ${BRAND}, saya mau tanya stok & rekomendasi kopi. ${COFFEE_DESC} ${TASTE_NOTE}`
                  )}`}
                />
                <QuickMessage
                  label="Minta QRIS / info transfer bank"
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                    `Halo ${BRAND}, saya mau minta QRIS dan/atau info rekening untuk pembayaran. Terima kasih.`
                  )}`}
                />
                <QuickMessage
                  label="Kerja sama / reseller"
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                    `Halo ${BRAND}, saya tertarik kerja sama/reseller. Mohon info syarat & harga grosir.`
                  )}`}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 text-xs text-[color:var(--muted)] dark:bg-white/5">
                © {new Date().getFullYear()} {BRAND}. All rights reserved.
              </div>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* Floating WA (desktop) */}
      <a
        href={waCheckoutLink}
        className="fixed bottom-5 right-5 z-50 hidden items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 py-3 text-sm font-black text-[color:var(--primary-foreground)] shadow-[var(--shadow)] hover:bg-[color:var(--primary-hover)] md:inline-flex"
        aria-label="Chat WhatsApp"
      >
        <Icon name="whatsapp" />
        Chat WhatsApp
      </a>

      {/* Sticky bottom bar (mobile) */}
      <div className="fixed bottom-3 left-1/2 z-50 w-[min(680px,calc(100%-24px))] -translate-x-1/2 md:hidden">
        <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 shadow-[var(--shadow)] backdrop-blur">
          <a
            href={waCheckoutLink}
            className="flex-1 rounded-xl bg-[color:var(--primary)] px-4 py-3 text-center text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
          >
            Order WA
          </a>
          <a
            href={TOKOPEDIA_URL}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-3 text-center text-sm font-black hover:opacity-90 dark:bg-white/5"
          >
            Tokopedia
          </a>
        </div>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="gpro-card rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-[var(--shadow-soft)]">
      <summary className="cursor-pointer text-sm font-black">{q}</summary>
      <p className="mt-2 text-sm text-[color:var(--muted)]">{a}</p>
    </details>
  );
}

function QuickMessage({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="gpro-card inline-flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-white/60 px-4 py-4 text-sm font-black hover:opacity-90 dark:bg-white/5"
    >
      <span>{label}</span>
      <span className="text-[color:var(--primary)]">→</span>
    </a>
  );
}
