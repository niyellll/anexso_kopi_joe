'use client'

import React, { useEffect, useMemo, useState } from 'react'

const BRAND = 'Anexso Kopi JOE'
const TAGLINE =
  'Kopi pilihan untuk dinikmati di rumah, kantor, maupun hadiah—rasa konsisten, kemasan rapi, dan layanan cepat.'
const ADDRESS =
  'Gg. Kamboja CTX No.36, Karang Asem, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281'
const PHONE_DISPLAY = '+62 858-9999-3742'
const PHONE_WA = '6285899993742'
const EMAIL = 'nielpickup@gmail.com'

type Product = {
  id: string
  name: string
  variant: string
  price: number
  note: string
  highlights: string[]
}

const PRODUCTS: Product[] = [
  {
    id: 'instan-50g',
    name: 'JOE Kopi Bubuk Instan',
    variant: '50 gram',
    price: 17000,
    note: 'Praktis untuk harian, rasa tetap mantap.',
    highlights: ['Praktis', 'Aroma kuat', 'Cocok untuk pemula'],
  },
  {
    id: 'sachet-10g',
    name: 'JOE Coffee Bubuk Sachet',
    variant: '10 gram',
    price: 35000,
    note: 'Sachet ringkas untuk dibawa kemana saja.',
    highlights: ['Ringkas', 'Mudah seduh', 'Travel-friendly'],
  },
  {
    id: 'bubuk-200g',
    name: 'JOE Coffee Bubuk',
    variant: '200 gram',
    price: 63000,
    note: 'Pilihan favorit untuk stok mingguan.',
    highlights: ['Value terbaik', 'Rasa seimbang', 'Kemasan aman'],
  },
  {
    id: 'bubuk-100g',
    name: 'JOE Coffee Kopi Bubuk',
    variant: '100 gram',
    price: 33000,
    note: 'Porsi pas untuk coba rasa sebelum stok besar.',
    highlights: ['Pas untuk trial', 'Fresh', 'Cocok untuk hadiah'],
  },
  {
    id: 'biji-1kg',
    name: 'JOE Coffee Bubuk / Biji',
    variant: '1 Kg',
    price: 290000,
    note: 'Untuk kebutuhan kantor, event, atau reseller.',
    highlights: ['Hemat', 'Konsisten', 'Siap untuk bisnis'],
  },
]

const TESTIMONIALS = [
  {
    name: 'Dina',
    meta: 'Karyawan • Sleman',
    quote:
      'Kemasannya rapi, aromanya wangi. Repeat order karena rasanya konsisten.',
  },
  {
    name: 'Raka',
    meta: 'Owner UMKM • Depok',
    quote:
      'Respons cepat, pengiriman aman. Cocok untuk stok jualan karena kualitas stabil.',
  },
  {
    name: 'Maya',
    meta: 'Mahasiswa • Yogyakarta',
    quote:
      'Enak buat daily coffee. Ukuran 100g pas banget buat coba dulu.',
  },
]

function formatIDR(n: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)
}

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ')
}

function Icon({ name }: { name: 'moon' | 'sun' | 'shield' | 'truck' | 'spark' | 'whatsapp' | 'phone' | 'mail' | 'map' | 'cart' }) {
  const common = 'w-5 h-5'
  switch (name) {
    case 'moon':
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
      )
    case 'sun':
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
      )
    case 'shield':
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
      )
    case 'truck':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 7h11v10H3V7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M14 11h4l3 3v3h-7v-6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      )
    case 'spark':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M19 13l.7 2.3L22 16l-2.3.7L19 19l-.7-2.3L16 16l2.3-.7L19 13Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'whatsapp':
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
      )
    case 'phone':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 3h3l2 5-2 1c1 2 3 4 5 5l1-2 5 2v3c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'mail':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16v12H4V6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m4 7 8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'map':
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
      )
    case 'cart':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6h15l-2 9H7L6 6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M6 6 5 3H2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M9 20a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 9 20ZM17 20a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 17 20Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      )
    default:
      return null
  }
}

export default function Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Record<string, number>>({})

  // Init theme (localStorage -> system preference)
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
      return
    }
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial: 'light' | 'dark' = prefersDark ? 'dark' : 'light'
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  // Apply theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PRODUCTS
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.variant} ${p.note} ${p.highlights.join(' ')}`.toLowerCase().includes(q)
    )
  }, [query])

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart]
  )

  const cartItems = useMemo(() => {
    return PRODUCTS.filter((p) => cart[p.id]).map((p) => ({
      ...p,
      qty: cart[p.id],
      subtotal: cart[p.id] * p.price,
    }))
  }, [cart])

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.subtotal, 0),
    [cartItems]
  )

  function addToCart(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }
  function decFromCart(id: string) {
    setCart((prev) => {
      const next = { ...prev }
      const qty = (next[id] ?? 0) - 1
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }
  function removeFromCart(id: string) {
    setCart((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const mapsLink = useMemo(() => {
    const q = encodeURIComponent(`Anexso Kopi JOE ${ADDRESS}`)
    return `https://www.google.com/maps/search/?api=1&query=${q}`
  }, [])

  const waLink = useMemo(() => {
    const lines = [
      `Halo ${BRAND}, saya mau pesan:`,
      ...cartItems.map((i) => `- ${i.name} (${i.variant}) x${i.qty} = ${formatIDR(i.subtotal)}`),
      cartItems.length ? `Total: ${formatIDR(cartTotal)}` : '(belum ada item)',
      '',
      'Mohon info ketersediaan & ongkir ya. Terima kasih.',
    ]
    const text = encodeURIComponent(lines.join('\n'))
    return `https://wa.me/${PHONE_WA}?text=${text}`
  }, [cartItems, cartTotal])

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
              <span className="text-sm font-black tracking-tight">JOE</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{BRAND}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Yogyakarta • Coffee & Supply</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#produk" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Produk</a>
            <a href="#kenapa" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Kenapa Kami</a>
            <a href="#testimoni" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Testimoni</a>
            <a href="#kontak" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Kontak</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/40"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {theme === 'dark' ? <Icon name="moon" /> : <Icon name="sun" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>

            <a
              href={waLink}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <Icon name="whatsapp" />
              Order
              <span className="hidden sm:inline">via WA</span>
            </a>

            <a
              href="#checkout"
              className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900/40"
              title="Lihat keranjang"
              aria-label="Lihat keranjang"
            >
              <Icon name="cart" />
              <span className="hidden sm:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-emerald-500 px-1 text-xs font-black text-white">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.28),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.14),transparent_35%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(30,41,59,0.65),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.18),transparent_35%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:pb-16 md:pt-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
                <Icon name="spark" />
                Ready stock • Respon cepat • Packing aman
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Kopi yang bikin yakin:
                <span className="block text-slate-700 dark:text-slate-200">
                  kualitas rapi, layanan profesional.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {TAGLINE}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={waLink}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-500"
                >
                  <Icon name="whatsapp" />
                  Konsultasi & Order
                </a>

                <a
                  href={`tel:${PHONE_WA}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-bold text-slate-800 shadow-sm hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100 dark:hover:bg-slate-900/40"
                >
                  <Icon name="phone" />
                  Telepon
                </a>

                <a
                  href="#produk"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/40"
                >
                  Lihat Produk
                  <span aria-hidden>→</span>
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <TrustCard title="Aman & Rapi" desc="Packing aman, cocok untuk gift." icon="shield" />
                <TrustCard title="Pengiriman" desc="Proses cepat sesuai antrian." icon="truck" />
                <TrustCard title="Kualitas" desc="Rasa konsisten, siap repeat." icon="spark" />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Cari produk</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Ketik nama/varian</div>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
                  {filtered.length} item
                </span>
              </div>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: 200g, sachet, instan..."
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-500 dark:focus:border-slate-700"
              />

              <div className="mt-5 space-y-3">
                {filtered.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div>
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {p.variant} • {formatIDR(p.price)}
                      </div>
                      <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">{p.note}</div>
                    </div>

                    <button
                      onClick={() => addToCart(p.id)}
                      className="shrink-0 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                    >
                      + Keranjang
                    </button>
                  </div>
                ))}

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  Tip: klik <span className="font-bold">+ Keranjang</span>, lalu checkout lewat WhatsApp.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produk */}
      <section id="produk" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">Produk Kopi</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Pilih ukuran sesuai kebutuhan. Semua produk dipacking rapi dan siap kirim.
            </p>
          </div>
          <a
            href={waLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900/40"
          >
            <Icon name="whatsapp" />
            Tanya stok / reseller
          </a>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => {
            const qty = cart[p.id] ?? 0
            return (
              <div
                key={p.id}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{p.variant}</div>
                    <div className="text-lg font-black leading-tight">{p.name}</div>
                  </div>
                  <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {formatIDR(p.price)}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{p.note}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-200"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  {qty > 0 ? (
                    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1 dark:border-slate-800 dark:bg-slate-950">
                      <button
                        onClick={() => decFromCart(p.id)}
                        className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/40"
                        aria-label="Kurangi"
                      >
                        −
                      </button>
                      <div className="min-w-8 text-center text-sm font-bold">{qty}</div>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/40"
                        aria-label="Tambah"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(p.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                    >
                      + Keranjang
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                      `Halo ${BRAND}, saya mau pesan ${p.name} (${p.variant}). Mohon info stok & ongkir ya.`
                    )}`}
                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Chat WA →
                  </a>
                </div>

                {qty > 0 && (
                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/40"
                  >
                    Hapus dari keranjang
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Kenapa kami */}
      <section id="kenapa" className="border-y border-slate-200/70 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">Kenapa {BRAND}?</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Kami fokus pada hal yang bikin pelanggan nyaman: komunikasi jelas, kualitas stabil, dan pengiriman aman.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Feature
              title="Kualitas konsisten"
              desc="Rasa dan aroma dijaga stabil. Cocok untuk repeat order maupun kebutuhan bisnis."
            />
            <Feature
              title="Pelayanan profesional"
              desc="Respons cepat, info jelas, dan siap bantu rekomendasi sesuai selera dan kebutuhan."
            />
            <Feature
              title="Packing aman"
              desc="Kemasan rapi dan aman untuk pengiriman, cocok juga untuk hadiah."
            />
          </div>

          <div className="mt-10 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:grid-cols-3">
            <Stat label="Lokasi" value="Sleman, DIY" />
            <Stat label="Channel order" value="WhatsApp / Telepon" />
            <Stat label="Skala" value="Retail • Kantor • Reseller" />
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section id="testimoni" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Testimoni Pelanggan</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Beberapa feedback dari pelanggan kami (contoh). Kamu bisa ganti nama & kata-katanya.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">“{t.quote}”</p>
              <div className="mt-4 text-sm font-bold">{t.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.meta}</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-black">FAQ</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Faq q="Bisa kirim luar kota?" a="Bisa. Kami packing aman dan kirim sesuai layanan ekspedisi yang tersedia." />
            <Faq q="Bisa pesan untuk kantor / event?" a="Bisa. Varian 1 Kg cocok untuk kantor, event, atau reseller. Hubungi WA untuk diskusi." />
            <Faq q="Bisa pilih bubuk atau biji?" a="Tersedia bubuk dan (jika tersedia) biji. Tanyakan stok terbaru via WhatsApp." />
            <Faq q="Pembayaran bagaimana?" a="Konfirmasi via WhatsApp, lalu kami info metode pembayaran yang tersedia." />
          </div>
        </div>
      </section>

      {/* Checkout */}
      <section id="checkout" className="border-t border-slate-200/70 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">Checkout</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Keranjang kamu akan dibuat menjadi pesan otomatis untuk WhatsApp.
              </p>
            </div>
            <a
              href={waLink}
              className={cx(
                'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black shadow-sm',
                cartItems.length
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-slate-300 text-slate-600 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400'
              )}
              aria-disabled={!cartItems.length}
              onClick={(e) => {
                if (!cartItems.length) e.preventDefault()
              }}
            >
              <Icon name="whatsapp" />
              Kirim Pesanan via WA
            </a>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">Item di keranjang</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{cartCount} item</div>
                </div>

                <div className="mt-4 space-y-3">
                  {cartItems.length ? (
                    cartItems.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
                      >
                        <div>
                          <div className="text-sm font-semibold">{i.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {i.variant} • {formatIDR(i.price)}
                          </div>
                          <div className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                            Subtotal: {formatIDR(i.subtotal)}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-1 dark:border-slate-800">
                            <button
                              onClick={() => decFromCart(i.id)}
                              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/40"
                              aria-label="Kurangi"
                            >
                              −
                            </button>
                            <div className="min-w-8 text-center text-sm font-black">{i.qty}</div>
                            <button
                              onClick={() => addToCart(i.id)}
                              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/40"
                              aria-label="Tambah"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(i.id)}
                            className="text-xs font-bold text-rose-600 hover:text-rose-500"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                      Keranjang masih kosong. Tambahkan produk dari bagian <a className="font-bold underline" href="#produk">Produk</a>.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="text-sm font-bold">Ringkasan</div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Total item</span>
                    <span className="font-bold text-slate-900 dark:text-white">{cartCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Total harga</span>
                    <span className="font-black text-slate-900 dark:text-white">{formatIDR(cartTotal)}</span>
                  </div>
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-300">
                    Ongkir & ketersediaan dikonfirmasi via WhatsApp sesuai alamat pengiriman.
                  </div>
                </div>

                <a
                  href={waLink}
                  className={cx(
                    'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black shadow-sm',
                    cartItems.length
                      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                      : 'bg-slate-300 text-slate-600 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400'
                  )}
                  aria-disabled={!cartItems.length}
                  onClick={(e) => {
                    if (!cartItems.length) e.preventDefault()
                  }}
                >
                  <Icon name="whatsapp" />
                  Checkout via WhatsApp
                </a>

                <a
                  href={`tel:${PHONE_WA}`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900/40"
                >
                  <Icon name="phone" />
                  Telepon: {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">Kontak & Lokasi</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Untuk pemesanan, kerja sama, atau reseller—hubungi kami via WhatsApp/telepon/email.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-emerald-600"><Icon name="map" /></div>
                  <div>
                    <div className="text-sm font-bold">Alamat</div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{ADDRESS}</div>
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400"
                    >
                      Buka di Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(`Halo ${BRAND}, saya mau tanya produk & stok ya.`)}`}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-emerald-600"><Icon name="whatsapp" /></div>
                    <div>
                      <div className="text-sm font-black">WhatsApp</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{PHONE_DISPLAY}</div>
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-emerald-600"><Icon name="mail" /></div>
                    <div>
                      <div className="text-sm font-black">Email</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{EMAIL}</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="text-sm font-black">Tentang Kami</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {BRAND} melayani pembelian kopi dalam berbagai ukuran (instan, sachet, 100g, 200g, hingga 1kg)
              untuk kebutuhan personal maupun bisnis. Kami mengutamakan kualitas, komunikasi yang jelas, dan
              pengiriman yang aman.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-200">
              <div className="font-black">Jam respon</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Setiap hari (menyesuaikan antrian). Untuk order cepat, WhatsApp lebih disarankan.
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waLink}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-500"
              >
                <Icon name="whatsapp" />
                Chat Sekarang
              </a>
              <a
                href={`tel:${PHONE_WA}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900/40"
              >
                <Icon name="phone" />
                Telepon
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </footer>
      </section>
    </div>
  )
}

function TrustCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: 'shield' | 'truck' | 'spark'
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-emerald-600">
          <Icon name={icon} />
        </div>
        <div>
          <div className="text-sm font-black">{title}</div>
          <div className="text-xs text-slate-600 dark:text-slate-300">{desc}</div>
        </div>
      </div>
    </div>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="text-sm font-black">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{desc}</p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-black">{value}</div>
    </div>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm open:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <summary className="cursor-pointer text-sm font-black">{q}</summary>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{a}</p>
    </details>
  )
}
