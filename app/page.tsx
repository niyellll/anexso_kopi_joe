"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const BRAND = "Anexso Kopi JOE";
const TAGLINE =
  "Kopi pilihan untuk dinikmati di rumah, kantor, maupun hadiah — rasa konsisten, kemasan rapi, dan layanan cepat.";

const COFFEE_TRUTH = "Blend Robusta + Arabika — tanpa dicampur bahan lainnya.";
const TASTE_NOTE = "Kopi pahit tanpa gula.";

const ADDRESS =
  "Gg. kamboja CTX No.36, Karang Asem, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281";
const PHONE_DISPLAY = "+62 858-9999-3742";
const PHONE_WA = "6285899993742";
const EMAIL = "nielpickup@gmail.com";
const TOKOPEDIA_URL = "https://www.tokopedia.com/anexso-kopi-joe";

/** Audio */
const AUDIO_SRC = "/mars-kopi-joe.mp3";
const MUSIC_VOLUME = 0.12; // volume pelan

/** Sosial (isi link kamu nanti) */
const SOCIAL = {
  instagram: "#",
  tiktok: "#",
  facebook: "#",
  youtube: "#",
};

const PAYMENT = {
  bankNote:
    "Transfer Bank (isi rekening di sini):\n- Bank: (contoh BCA)\n- No Rek: (0000xxxx)\n- a.n: (Nama penerima)",
  qrisImage: "/qris-joe.jpg", // taruh gambar QRIS di /public/qris-joe.jpg
};

// Angka statistik (ganti sesuai data asli)
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

const BASE_NOTE = `${COFFEE_TRUTH} ${TASTE_NOTE}`;

const PRODUCTS: Product[] = [
  {
    id: "instan-50g",
    name: "JOE Kopi Bubuk Instan",
    variant: "50 gram",
    price: 17000,
    note: `Praktis untuk harian, rasa tetap mantap. ${BASE_NOTE}`,
    bullets: ["Praktis", "Aroma kuat", "Pahit mantap"],
  },
  {
    id: "sachet-10g",
    name: "JOE Coffee Bubuk Sachet",
    variant: "10 gram (isi 10 sachet)",
    price: 35000,
    note: `Sachet ringkas untuk dibawa kemana saja. Isi 10 sachet. ${BASE_NOTE}`,
    bullets: ["Isi 10 sachet", "Ringkas", "Mudah seduh"],
  },
  {
    id: "bubuk-200g",
    name: "JOE Coffee Bubuk",
    variant: "200 gram",
    price: 63000,
    note: `Pilihan favorit untuk stok mingguan. ${BASE_NOTE}`,
    bullets: ["Value", "Rasa seimbang", "Kemasan aman"],
  },
  {
    id: "bubuk-100g",
    name: "JOE Coffee Kopi Bubuk",
    variant: "100 gram",
    price: 33000,
    note: `Porsi pas untuk coba rasa sebelum stok besar. ${BASE_NOTE}`,
    bullets: ["Pas untuk trial", "Fresh", "Cocok hadiah"],
  },
  {
    id: "biji-1kg",
    name: "JOE Coffee Bubuk / Biji",
    variant: "1 Kg",
    price: 290000,
    note: `Untuk kantor, event, atau reseller. ${BASE_NOTE}`,
    bullets: ["Hemat", "Konsisten", "Siap bisnis"],
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

const MEDIA_IMAGES = [
  { label: "Foto produk 1", src: "/media-1.jpg" },
  { label: "Foto produk 2", src: "/media-2.jpg" },
  { label: "Foto packing", src: "/media-3.jpg" },
  { label: "Foto toko", src: "/media-4.jpg" },
  { label: "Foto event", src: "/media-5.jpg" },
  { label: "Foto lainnya", src: "/media-6.jpg" },
];

// kalau mau embed video youtube: isi id-nya (contoh: "dQw4w9WgXcQ")
const YOUTUBE_IDS: string[] = [
  // "dQw4w9WgXcQ",
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
    | "music"
    | "pause"
    | "instagram"
    | "tiktok"
    | "facebook"
    | "youtube"
    | "image"
    | "video";
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
    case "music":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 18V6l12-2v12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M18.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "pause":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 3v10.2a4.3 4.3 0 1 1-3.2-4.1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 3c.7 2.7 2.7 4.7 5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v3H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z"
            fill="currentColor"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12s0-3.5-.5-5c-.3-.9-1-1.6-1.9-1.9C17.1 4.5 12 4.5 12 4.5s-5.1 0-6.6.6C4.5 5.4 3.8 6.1 3.5 7 3 8.5 3 12 3 12s0 3.5.5 5c.3.9 1 1.6 1.9 1.9 1.5.6 6.6.6 6.6.6s5.1 0 6.6-.6c.9-.3 1.6-1 1.9-1.9.5-1.5.5-5 .5-5Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="m10 15 6-3-6-3v6Z" fill="currentColor" />
        </svg>
      );
    case "image":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16v12H4V6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M8 10h.01" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path
            d="M20 16l-5-5-6 6-2-2-3 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "video":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h11v10H4V7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M15 10l5-3v10l-5-3V10Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function SoftCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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

export default function Page() {
  const [dark, setDark] = useState(false);

  // buyer & address
  const [buyerName, setBuyerName] = useState("");
  const [shipTo, setShipTo] = useState("");

  // search & cart
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  // scroll progress
  const [progress, setProgress] = useState(0);

  // music
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState<boolean>(true); // default ON (first time)
  const [needsTap, setNeedsTap] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

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

  // music init from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("music"); // "on" | "off"
    setMusicOn(saved ? saved === "on" : true);
  }, []);

  // apply music state
  useEffect(() => {
    localStorage.setItem("music", musicOn ? "on" : "off");
    const a = audioRef.current;
    if (!a) return;

    a.loop = true;
    a.preload = "auto";
    a.volume = MUSIC_VOLUME;

    setAudioError(null);

    if (!musicOn) {
      setNeedsTap(false);
      try {
        a.pause();
        a.currentTime = 0;
      } catch {}
      return;
    }

    const tryPlay = async () => {
      try {
        await a.play();
        setNeedsTap(false);
      } catch (e: any) {
        // Autoplay blocked (mobile) OR file format not supported
        setNeedsTap(true);
      }
    };

    tryPlay();
  }, [musicOn]);

  // if autoplay blocked, try again on first user gesture
  useEffect(() => {
    if (!needsTap) return;

    const onGesture = async () => {
      const a = audioRef.current;
      if (!a) return;
      a.volume = MUSIC_VOLUME;
      try {
        await a.play();
        setNeedsTap(false);
      } catch {
        setNeedsTap(true);
      }
    };

    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("touchstart", onGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, [needsTap]);

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
      "",
      buyerName ? `Nama: ${buyerName}` : "Nama: (isi nama)",
      shipTo ? `Alamat tujuan: ${shipTo}` : "Alamat tujuan: (isi alamat tujuan)",
      "Catatan alamat: boleh shareloc untuk patokan alamat ya 🙏",
      "",
      ...cartItems.map((i) => `- ${i.name} (${i.variant}) x${i.qty} = ${formatIDR(i.subtotal)}`),
      cartItems.length ? `Total: ${formatIDR(cartTotal)}` : "(keranjang masih kosong)",
      "",
      `Catatan kopi: ${COFFEE_TRUTH} ${TASTE_NOTE}`,
      "",
      "Metode bayar: Transfer Bank / QRIS (JOE Coffee). Mohon info ongkir ya. Terima kasih.",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${PHONE_WA}?text=${text}`;
  }, [cartItems, cartTotal, buyerName, shipTo]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] gpro-safe-bottom">
      {/* audio element (hidden) */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        onError={() => {
          setAudioError("Audio gagal dimuat. Pastikan file ada di /public/mars-kopi-joe.mp3 dan formatnya benar.");
        }}
      />

      {/* background subtle */}
      <div className="pointer-events-none fixed inset-0 -z-10 gpro-animated-bg opacity-80" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--card)] backdrop-blur">
        {/* progress bar */}
        <div className="h-1 w-full bg-[color:var(--border)]">
          <div className="h-1 bg-[color:var(--primary)]" style={{ width: `${progress}%` }} />
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[color:var(--border)] bg-white/40 font-black tracking-tight dark:bg-white/5">
              JOE
            </div>
            <div className="leading-tight">
              <div className="text-sm font-black">{BRAND}</div>
              <div className="text-xs text-[color:var(--muted)]">Sleman • Yogyakarta</div>
            </div>
          </div>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-5 text-sm text-[color:var(--muted)] md:flex">
            <a className="hover:opacity-80" href="#produk">Produk</a>
            <a className="hover:opacity-80" href="#dinein">Dine In</a>
            <a className="hover:opacity-80" href="#media">Media</a>
            <a className="hover:opacity-80" href="#testimoni">Testimoni</a>
            <a className="hover:opacity-80" href="#kontak">Kontak</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Music */}
            <button
              onClick={() => setMusicOn((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-3 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              title={musicOn ? "Matikan musik" : "Nyalakan musik"}
            >
              {musicOn ? <Icon name="pause" /> : <Icon name="music" />}
              <span className="hidden sm:inline">Music</span>
            </button>

            {/* Theme */}
            <button
              onClick={() => setDark((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-3 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {dark ? <Icon name="moon" /> : <Icon name="sun" />}
              <span className="hidden sm:inline">{dark ? "Dark" : "Light"}</span>
            </button>

            {/* Tokopedia (desktop) */}
            <a
              href={TOKOPEDIA_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5 lg:inline-flex"
              title="Buka Tokopedia"
            >
              <Icon name="tokopedia" />
              Tokopedia
            </a>

            {/* Order WA */}
            <a
              href={waCheckoutLink}
              className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-4 py-2 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)]"
              title="Order via WhatsApp"
            >
              <Icon name="whatsapp" />
              <span className="hidden sm:inline">Order</span>
            </a>

            {/* Cart */}
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

      {/* Toast: tap to enable music */}
      {musicOn && needsTap && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 md:bottom-6">
          <button
            onClick={async () => {
              const a = audioRef.current;
              if (!a) return;
              try {
                a.volume = MUSIC_VOLUME;
                await a.play();
                setNeedsTap(false);
              } catch {
                setNeedsTap(true);
              }
            }}
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-xs font-black shadow-[var(--shadow)] backdrop-blur hover:opacity-90"
          >
            Tap untuk nyalakan musik 🎵
          </button>
        </div>
      )}

      {/* Audio error (if file not supported) */}
      {audioError && (
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <div className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 text-sm text-[color:var(--muted)] dark:bg-white/5">
            <div className="font-black text-[var(--foreground)]">Info Musik</div>
            <div className="mt-1">{audioError}</div>
            <div className="mt-2 text-xs">
              Kalau URL audio kebuka tapi durasi 0:00, biasanya file kamu <b>bukan MP3 asli</b> (cuma rename).
              Solusi: convert ke mp3 beneran lalu upload ulang ke <code>/public</code>.
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="gpro-reveal" data-reveal>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/40 px-3 py-2 text-xs font-semibold text-[color:var(--muted)] dark:bg-white/5">
                <span className="h-2 w-2 rounded-full bg-[color:var(--primary)]" />
                Ready stock • Packing aman • Respon cepat
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="font-black text-[color:var(--primary)]">Robusta + Arabika</span>
                <span className="mx-2 hidden sm:inline">•</span>
                Tanpa campuran • Pahit tanpa gula
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                Kopi yang bikin{" "}
                <span className="text-[color:var(--primary)]">percaya</span>
                <br />
                dari rasa sampai pelayanan.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
                {TAGLINE} {COFFEE_TRUTH} {TASTE_NOTE}
              </p>

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
                      <div className="text-xs text-[color:var(--muted)]">{COFFEE_TRUTH}</div>
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
                      <div className="text-xs text-[color:var(--muted)]">{TASTE_NOTE}</div>
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
                Pilih ukuran sesuai kebutuhan. Semua produk dipacking rapi dan siap kirim. {COFFEE_TRUTH} {TASTE_NOTE}
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
                        `Halo ${BRAND}, saya mau pesan ${p.name} (${p.variant}). Mohon info stok & ongkir ya. (${COFFEE_TRUTH} ${TASTE_NOTE})`
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
      <section id="dinein" className="mx-auto max-w-6xl px-4 py-12">
        <div className="gpro-reveal" data-reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Dine In</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                (Placeholder) Nanti kamu bisa isi menu dine in, jam buka, paket, dll.
              </p>
            </div>
            <a
              href={waCheckoutLink}
              className="hidden rounded-xl bg-[color:var(--primary)] px-4 py-2 text-sm font-black text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)] sm:inline-flex"
            >
              Reservasi via WA
            </a>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <SoftCard className="p-6">
              <div className="text-sm font-black">Menu Dine In</div>
              <div className="mt-2 text-sm text-[color:var(--muted)]">
                Tambahkan daftar menu di sini (espresso, americano, manual brew, dsb).
              </div>
            </SoftCard>
            <SoftCard className="p-6">
              <div className="text-sm font-black">Jam Operasional</div>
              <div className="mt-2 text-sm text-[color:var(--muted)]">
                Tambahkan jam buka/tutup & hari operasional.
              </div>
            </SoftCard>
            <SoftCard className="p-6">
              <div className="text-sm font-black">Lokasi & Ambience</div>
              <div className="mt-2 text-sm text-[color:var(--muted)]">
                Tambahkan foto tempat / suasana (bisa taruh di section Media).
              </div>
            </SoftCard>
          </div>
        </div>
      </section>

      {/* Media (foto/video placeholder + socials) */}
      <section id="media" className="mx-auto max-w-6xl px-4 py-12">
        <div className="gpro-reveal" data-reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Media</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Tempat foto & video. Kamu tinggal upload file ke folder <b>/public</b> sesuai nama yang dipakai di sini.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5">
                <Icon name="instagram" /> IG
              </a>
              <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5">
                <Icon name="tiktok" /> TikTok
              </a>
              <a href={SOCIAL.facebook} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5">
                <Icon name="facebook" /> FB
              </a>
              <a href={SOCIAL.youtube} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-4 py-2 text-sm font-semibold hover:opacity-90 dark:bg-white/5">
                <Icon name="youtube" /> YouTube
              </a>
            </div>
          </div>

          {/* image grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MEDIA_IMAGES.map((m) => (
              <SoftCard key={m.label} className="overflow-hidden">
                <div className="grid aspect-[16/10] place-items-center border-b border-[color:var(--border)] bg-white/40 text-[color:var(--muted)] dark:bg-white/5">
                  <div className="text-center">
                    <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-2xl border border-[color:var(--border)] bg-white/50 dark:bg-white/10">
                      <Icon name="image" />
                    </div>
                    <div className="text-sm font-black">{m.label}</div>
                    <div className="mt-1 text-xs">Taruh file: <code>{m.src}</code></div>
                  </div>
                </div>
                <div className="p-4 text-xs text-[color:var(--muted)]">
                  Kalau file sudah ada, ganti bagian ini dengan <code>&lt;img src="{m.src}" /&gt;</code> atau langsung replace block ini.
                </div>
              </SoftCard>
            ))}
          </div>

          {/* youtube embeds */}
          <div className="mt-8">
            <div className="flex items-center gap-2 text-sm font-black">
              <Icon name="video" /> Video (YouTube)
            </div>

            {YOUTUBE_IDS.length ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {YOUTUBE_IDS.map((id) => (
                  <SoftCard key={id} className="overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${id}`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </SoftCard>
                ))}
              </div>
            ) : (
              <SoftCard className="mt-3 p-6">
                <div className="text-sm font-black">Placeholder Video</div>
                <div className="mt-2 text-sm text-[color:var(--muted)]">
                  Isi array <code>YOUTUBE_IDS</code> dengan ID video YouTube kamu (contoh: <code>dQw4w9WgXcQ</code>).
                </div>
              </SoftCard>
            )}
          </div>
        </div>
      </section>

      {/* Kenapa pilih */}
      <section id="kenapa" className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="gpro-reveal" data-reveal>
            <div
              className="rounded-[var(--radius)] border border-[color:var(--border)] p-8 shadow-[var(--shadow)] md:p-10"
              style={{
                background: "linear-gradient(180deg, rgba(42,26,16,0.92), rgba(42,26,16,0.86))",
                color: "#fff7ee",
              }}
            >
              <h2 className="text-center text-3xl font-black md:text-4xl">Kenapa Pilih JOE Coffee?</h2>
              <p className="mt-2 text-center text-sm opacity-85">Komitmen kami untuk kepuasan Anda</p>

              <div className="mt-10 grid gap-8 md:grid-cols-4">
                <Reason icon={<Icon name="shield" />} title="Blend Jujur" desc={COFFEE_TRUTH} />
                <Reason icon={<Icon name="truck" />} title="Pengiriman Cepat" desc="Proses cepat sesuai antrian & packing aman." />
                <Reason icon={<Icon name="clock" />} title="Fresh & Wangi" desc="Aroma maksimal untuk pengalaman coffee lovers." />
                <Reason icon={<Icon name="heart" />} title="Taste" desc={TASTE_NOTE} />
              </div>

              <div className="mt-10 rounded-[var(--radius)] bg-white/10 p-6">
                <div className="grid gap-6 text-center md:grid-cols-3">
                  <StatBig value={STATS.shipped} label="Paket Terkirim" />
                  <StatBig value={STATS.rating} label="Rating Pelanggan" />
                  <StatBig value={STATS.satisfaction} label="Kepuasan" />
                </div>
                <p className="mt-4 text-center text-xs opacity-75">
                  *Ganti angka statistik sesuai data asli kamu agar lebih kredibel.
                </p>
              </div>
            </div>
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
            <Faq q="Pembayaran bagaimana?" a="Pembayaran bisa transfer bank atau QRIS (JOE Coffee sudah punya QRIS)." />
            <Faq q="Bisa tanya rekomendasi?" a="Bisa. Ceritakan selera kamu (pahit/medium/smooth), nanti kami bantu rekomendasi." />
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
                Keranjang akan dibuat menjadi pesan otomatis untuk WhatsApp.
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
            {/* Left */}
            <SoftCard className="p-6 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-black">Data pembeli & pengiriman</div>
                <div className="text-xs text-[color:var(--muted)]">akan ikut di pesan WA</div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-bold text-[color:var(--muted)]">Nama pembeli</div>
                  <input
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: Budi"
                    className="mt-2 w-full rounded-2xl border border-[color:var(--border)] bg-white/60 px-4 py-3 text-sm outline-none placeholder:text-[color:var(--muted)] dark:bg-white/5"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[color:var(--muted)]">Alamat tujuan</div>
                  <input
                    value={shipTo}
                    onChange={(e) => setShipTo(e.target.value)}
                    placeholder="Contoh: Jl. ..., RT/RW, Kota..."
                    className="mt-2 w-full rounded-2xl border border-[color:var(--border)] bg-white/60 px-4 py-3 text-sm outline-none placeholder:text-[color:var(--muted)] dark:bg-white/5"
                  />
                  <div className="mt-1 text-[11px] text-[color:var(--muted)]">
                    Tips: bisa juga cukup tulis patokan, lalu nanti shareloc via WA.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
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

            {/* Right */}
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
                  Ongkir & ketersediaan dikonfirmasi via WhatsApp sesuai alamat pengiriman (boleh shareloc).
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
                href={TOKOPEDIA_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-white/40 px-5 py-3 text-sm font-black hover:opacity-90 dark:bg-white/5"
              >
                <Icon name="tokopedia" />
                Beli via Tokopedia
              </a>

              {/* Payment methods */}
              <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-white/60 p-4 text-xs text-[color:var(--muted)] dark:bg-white/5 whitespace-pre-line">
                <div className="text-sm font-black text-[var(--foreground)]">Pembayaran</div>
                <div className="mt-2">✅ Transfer Bank / ✅ QRIS</div>
                <div className="mt-3 font-semibold text-[var(--foreground)]">Info Transfer</div>
                <div className="mt-1">{PAYMENT.bankNote}</div>

                <div className="mt-4 font-semibold text-[var(--foreground)]">QRIS (placeholder)</div>
                <div className="mt-2 rounded-2xl border border-dashed border-[color:var(--border)] bg-white/40 p-3 dark:bg-white/5">
                  Taruh gambar QRIS di: <code>{PAYMENT.qrisImage}</code>
                </div>
              </div>

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
              <p className="mt-2 text-sm text-[color:var(--muted)]">Ada pertanyaan? Kami siap membantu.</p>

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
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Klik tombol untuk langsung chat (pesan otomatis).
              </p>

              <div className="mt-5 grid gap-3">
                <QuickMessage
                  label="Tanya stok & rekomendasi"
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                    `Halo ${BRAND}, saya mau tanya stok & rekomendasi kopi yang cocok untuk saya. (${COFFEE_TRUTH} ${TASTE_NOTE})`
                  )}`}
                />
                <QuickMessage
                  label="Tanya ongkir & estimasi kirim (boleh shareloc)"
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                    `Halo ${BRAND}, saya mau tanya ongkir & estimasi pengiriman. Saya bisa shareloc untuk patokan alamat ya.`
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

function Reason({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/15">
        <span className="text-white">{icon}</span>
      </div>
      <div className="mt-3 text-sm font-black">{title}</div>
      <div className="mt-2 text-xs opacity-85">{desc}</div>
    </div>
  );
}

function StatBig({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-black md:text-4xl">{value}</div>
      <div className="mt-1 text-xs opacity-85">{label}</div>
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
