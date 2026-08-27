"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QRIS_IMAGE, SITE_URL, waLink } from "./site-config";
import { bookProducts, formatRupiah, joeProducts, type Product, type TqProgram } from "./site-data";

const CART_KEY = "anexso-cart-v1";
const CART_EVENT = "anexso-cart-change";
const CART_MIGRATION_KEY = "anexso-cart-default-qty-v14";
const SACHET_NAME = "Sachet 10gr";
const SACHET_MIN_QTY = 10;
const JOE_PRODUCT_NAMES = new Set(joeProducts.map((item) => item.name));

type CartItem = Product & { qty: number };
type Participant = { name: string; email: string; whatsapp: string; company: string; position: string };

function minimumQty(product: Pick<Product, "name">) {
  return product.name === SACHET_NAME ? SACHET_MIN_QTY : 1;
}

function readRawCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function migrateLegacyDefaultQuantity() {
  if (localStorage.getItem(CART_MIGRATION_KEY) === "1") return;
  const current = readRawCart();
  const migrated = current.map((item) => {
    const wasLegacyTen = item.name !== SACHET_NAME && JOE_PRODUCT_NAMES.has(item.name) && Number(item.qty) === SACHET_MIN_QTY;
    return wasLegacyTen ? { ...item, category: "Joe Coffee", qty: 1 } : item;
  });
  localStorage.setItem(CART_KEY, JSON.stringify(migrated));
  localStorage.setItem(CART_MIGRATION_KEY, "1");
  window.dispatchEvent(new Event(CART_EVENT));
}

function readCart(): CartItem[] {
  return readRawCart()
    .filter((item): item is CartItem => Boolean(item?.name && item?.image && item?.price && item?.qty))
    .map((item) => ({ ...item, qty: Math.max(minimumQty(item), Number(item.qty) || minimumQty(item)) }));
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

function addCartItem(items: CartItem[], product: Product) {
  const exists = items.some((item) => item.name === product.name);
  return exists
    ? items.map((item) => item.name === product.name ? { ...item, qty: Math.max(minimumQty(item), item.qty + 1) } : item)
    : [...items, { ...product, qty: minimumQty(product) }];
}

function encodePrintPayload(payload: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function printUrl(payload: unknown) {
  return `${SITE_URL}/pesanan/cetak#${encodePrintPayload(payload)}`;
}

function isBookProduct(item: Product) {
  return item.category === "Buku" || item.category === "E-Book" || Boolean(item.kind?.includes("Buku") || item.kind?.includes("E-Book"));
}

export function BuyButton({ product, label = "Beli Sekarang", className = "small-gold-btn" }: { product: Product; label?: string; className?: string }) {
  const router = useRouter();
  function buy() {
    migrateLegacyDefaultQuantity();
    writeCart(addCartItem(readCart(), product));
    router.push("/keranjang");
  }
  return <button type="button" className={className} onClick={buy}>{label} →</button>;
}

export function CartNavLink() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => {
      migrateLegacyDefaultQuantity();
      setCount(readCart().reduce((sum, item) => sum + item.qty, 0));
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener(CART_EVENT, update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener(CART_EVENT, update);
    };
  }, []);
  return <Link className="icon-btn" href="/keranjang" aria-label={`Keranjang, ${count} produk`}>🛒{count > 0 ? <b>{count}</b> : null}</Link>;
}

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payment, setPayment] = useState<"QRIS" | "Transfer Bank">("QRIS");
  const [customer, setCustomer] = useState({ name: "", whatsapp: "", address: "" });
  const [checkoutError, setCheckoutError] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      migrateLegacyDefaultQuantity();
      setItems(readCart());
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (ready) writeCart(items);
  }, [items, ready]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const shipping = subtotal >= 100000 ? 0 : 10000;
  const total = subtotal + shipping;
  const bookOnlyCart = items.length > 0 && items.every(isBookProduct);
  const recommendations = (bookOnlyCart ? bookProducts : joeProducts).filter((product) => !items.some((item) => item.name === product.name)).slice(0, 5);
  const changeQty = (name: string, delta: number) => setItems((prev) => prev.map((item) => item.name === name ? { ...item, qty: Math.max(minimumQty(item), item.qty + delta) } : item));
  const remove = (name: string) => setItems((prev) => prev.filter((item) => item.name !== name));

  const requestBankWa = useMemo(() => waLink([
    "Halo ANEXSO | Joe Coffee, saya ingin meminta rekening resmi untuk pesanan berikut:",
    ...items.map((item) => `- ${item.name} x${item.qty}`),
    `Total: ${formatRupiah(total)}`,
    `Nama: ${customer.name || "-"}`,
    `Nomor WhatsApp: ${customer.whatsapp || "-"}`,
  ].join("\n")), [customer.name, customer.whatsapp, items, total]);

  function continueCheckout() {
    if (!items.length) return;
    setCompleted(false);
    setCheckoutOpen(true);
    window.setTimeout(() => document.querySelector("#checkout-payment")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function confirmOrder() {
    if (!customer.name.trim() || !customer.whatsapp.trim() || !customer.address.trim()) {
      setCheckoutError("Lengkapi nama, nomor WhatsApp, dan alamat pengiriman terlebih dahulu.");
      return;
    }
    setCheckoutError("");
    const labelUrl = printUrl({
      type: "order",
      name: customer.name.trim(),
      whatsapp: customer.whatsapp.trim(),
      address: customer.address.trim(),
      payment,
      subtotal,
      shipping,
      total,
      items: items.map((item) => ({ name: item.name, qty: item.qty, price: item.price })),
    });
    const message = [
      "PESANAN BARU - ANEXSO | JOE COFFEE",
      "",
      ...items.map((item) => `- ${item.name} x${item.qty}: ${formatRupiah(item.price * item.qty)}`),
      `Subtotal: ${formatRupiah(subtotal)}`,
      `Ongkir: ${shipping ? formatRupiah(shipping) : "Gratis"}`,
      `Total: ${formatRupiah(total)}`,
      `Pembayaran: ${payment}`,
      "",
      `Nama: ${customer.name.trim()}`,
      `No. HP/WA: ${customer.whatsapp.trim()}`,
      `Alamat: ${customer.address.trim()}`,
      "",
      `CETAK LABEL PEMBELI: ${labelUrl}`,
      "",
      `Saya akan mengirim bukti ${payment === "QRIS" ? "pembayaran QRIS" : "transfer"} di chat ini.`,
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    writeCart([]);
    setItems([]);
    setCheckoutOpen(false);
    setCompleted(true);
    window.setTimeout(() => document.querySelector("#order-complete")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  return <>
    <div className="cart-layout container">
      <section className="cart-main">
        <div className="cart-title-row"><div><h1>🛒 KERANJANG BELANJA</h1><p>Review produk Anda sebelum melanjutkan ke pengiriman.</p></div><Link href={bookOnlyCart ? "/buku-ebook" : "/joe-coffee"}>Lanjut Belanja →</Link></div>
        <div className="cart-table">
          <div className="cart-head"><span>Produk</span><span>Harga</span><span>Jumlah</span><span>Subtotal</span></div>
          {!ready ? <div className="cart-empty">Memuat keranjang...</div> : items.length === 0 ? <div className="cart-empty"><h2>Keranjang masih kosong</h2><p>Pilih produk Joe Coffee, buku, e-book, atau kuliner yang Anda inginkan.</p><Link className="gold-btn" href="/joe-coffee">Mulai Belanja →</Link></div> : items.map((item) => <div className="cart-row" key={item.name}>
            <div className="cart-product"><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><span>{item.category || item.kind || "Joe Coffee"}</span><span>{item.subtitle}</span></div></div>
            <b>{formatRupiah(item.price)}</b>
            <div className="qty"><button type="button" aria-label={`Kurangi ${item.name}`} disabled={item.qty <= minimumQty(item)} onClick={() => changeQty(item.name, -1)}>−</button><span>{item.qty}</span><button type="button" aria-label={`Tambah ${item.name}`} onClick={() => changeQty(item.name, 1)}>+</button></div>
            <div className="subtotal-cell"><b>{formatRupiah(item.price * item.qty)}</b><button type="button" aria-label={`Hapus ${item.name}`} onClick={() => remove(item.name)}>⌫</button></div>
          </div>)}
        </div>
        {items.length > 0 ? <div className="promo-row"><div><strong>Punya Kode Promo?</strong><div className="promo-input"><input placeholder="Masukkan kode promo"/><button type="button">Gunakan</button></div></div><div className="shipping-note"><span>🚚</span><div><strong>{shipping === 0 ? "Gratis Ongkir" : "Ongkir Hemat"}</strong><small>Belanja minimal Rp100.000</small></div><b>✓</b></div></div> : null}
        {items.length > 0 ? <><h2 className="recommend-title">Anda Mungkin Juga Suka</h2><div className="recommend-grid">{recommendations.map((product) => <article key={product.name}><img src={product.image} alt={product.name}/><strong>{product.name}</strong><span>{product.subtitle}</span><b>{formatRupiah(product.price)}</b><button type="button" onClick={() => setItems((prev) => addCartItem(prev, product))}>＋ Keranjang</button></article>)}</div></> : null}
      </section>
      <aside className="order-summary"><h2>RINGKASAN PESANAN</h2><div><span>Subtotal ({items.reduce((sum, item) => sum + item.qty, 0)} produk)</span><b>{formatRupiah(subtotal)}</b></div><div><span>Ongkos Kirim</span><b>{items.length ? (shipping ? formatRupiah(shipping) : "Gratis") : "-"}</b></div><div><span>Promo</span><b>- Rp 0</b></div><hr/><div className="total"><span>Total Pembayaran</span><b>{formatRupiah(items.length ? total : 0)}</b></div><button type="button" disabled={!items.length} onClick={continueCheckout} className="gold-btn wide">Lanjut ke Pengiriman →</button><small>🔒 Transaksi aman dan data Anda terjaga</small></aside>
    </div>
    {checkoutOpen && items.length > 0 ? <section id="checkout-payment" className="checkout-payment container">
      <div className="checkout-customer form-card"><h2>DATA PENGIRIMAN</h2><div className="form-grid two"><label>Nama Lengkap *<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Masukkan nama lengkap"/></label><label>Nomor WhatsApp *<input required value={customer.whatsapp} onChange={(event) => setCustomer({ ...customer, whatsapp: event.target.value })} placeholder="08xxxxxxxxxx"/></label></div><label>Alamat Pengiriman *<textarea required rows={4} value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="Tuliskan alamat lengkap dan patokan"/></label>{checkoutError ? <p role="alert"><b>{checkoutError}</b></p> : null}</div>
      <div className="checkout-method form-card"><h2>METODE PEMBAYARAN</h2><p>Pilih metode pembayaran. Setelah membayar, klik tombol konfirmasi untuk membuka WhatsApp dan kirim bukti pembayaran.</p><div className="payment-grid two-payments">{(["QRIS", "Transfer Bank"] as const).map((method) => <button type="button" key={method} onClick={() => setPayment(method)} className={payment === method ? "payment active" : "payment"}><span>{method === "QRIS" ? "▦" : "🏦"}</span><b>{method}</b><small>{method === "QRIS" ? "Pindai atau simpan gambar QRIS." : "Minta rekening resmi melalui WhatsApp."}</small></button>)}</div>{payment === "QRIS" ? <div className="payment-detail qris-detail"><div><h3>QRIS JOE COFFEE (ANEXSO)</h3><p>Pindai dari aplikasi pembayaran atau simpan gambarnya ke galeri.</p><a className="gold-btn" href={QRIS_IMAGE} download="QRIS-Joe-Coffee.jpeg">Simpan QRIS ↓</a></div><img src={QRIS_IMAGE} alt="QRIS JOE Coffee ANEXSO"/></div> : <div className="payment-detail bank-detail"><div><h3>TRANSFER BANK</h3><p>Demi keamanan, nomor rekening resmi diberikan lewat WhatsApp.</p></div><a className="gold-btn" href={requestBankWa} target="_blank" rel="noreferrer">Minta Rekening Resmi ↗</a></div>}<button className="gold-btn wide confirm-order" type="button" onClick={confirmOrder}>Konfirmasi & Kirim Bukti via WhatsApp →</button></div>
    </section> : null}
    {completed ? <section id="order-complete" className="checkout-payment container"><div className="form-card success-card"><span>✓</span><div><h2>PESANAN TERKONFIRMASI</h2><h3>Keranjang sudah dikosongkan.</h3><p>WhatsApp telah dibuka dengan detail pesanan dan link cetak label pembeli untuk admin.</p><Link className="gold-btn" href="/">Kembali ke Beranda →</Link></div></div></section> : null}
  </>;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });
const MONTH_FORMATTER = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDate(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function parseRupiahLabelV16(value: string) {
  const match = String(value || "").match(/Rp\s*([\d.]+)/i);
  if (!match) return 0;
  const amount = Number(match[1].replace(/\./g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export function RegistrationForm({ program }: { program: TqProgram }) {
  const [success, setSuccess] = useState(false);
  const [format, setFormat] = useState("Online");
  const [payment, setPayment] = useState<"QRIS" | "Transfer Bank">("QRIS");
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(2026, 8, 1, 12));
  const [selectedDate, setSelectedDate] = useState("2026-09-18");
  const [participant, setParticipant] = useState<Participant>({ name: "", email: "", whatsapp: "", company: "", position: "" });
  const [inHouseParticipantsV16, setInHouseParticipantsV16] = useState("");

  const selectedStart = parseDate(selectedDate);
  const selectedEnd = new Date(selectedStart);
  selectedEnd.setDate(selectedEnd.getDate() + 1);
  const scheduleLabel = `${DATE_FORMATTER.format(selectedStart)} - ${DATE_FORMATTER.format(selectedEnd)}`;
  const monthDays = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const monthOffset = (new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay() + 6) % 7;
  const isInHouseV16 = format === "In-House Training";
  const inHouseBaseV16 = parseRupiahLabelV16(program.inHouse);
  const inHousePerParticipantV16 = inHouseBaseV16 > 0 ? Math.round(inHouseBaseV16 / 10) : 0;
  const enteredParticipantsV16 = Number(inHouseParticipantsV16);
  const validInHouseParticipantsV16 = Number.isInteger(enteredParticipantsV16) && enteredParticipantsV16 >= 10 && enteredParticipantsV16 <= 25;
  const participantCountV16 = isInHouseV16 ? (validInHouseParticipantsV16 ? enteredParticipantsV16 : 0) : 1;
  const participantLabelV16 = isInHouseV16 ? (validInHouseParticipantsV16 ? `${enteredParticipantsV16} Orang` : "Belum diisi") : "1 Orang";
  const unitInvestmentLabelV16 = isInHouseV16 ? `${formatRupiah(inHousePerParticipantV16)}/orang` : program.openTraining;
  const totalInvestmentAmountV16 = isInHouseV16
    ? (validInHouseParticipantsV16 ? inHousePerParticipantV16 * enteredParticipantsV16 : 0)
    : parseRupiahLabelV16(program.openTraining);
  const totalInvestmentLabelV16 = isInHouseV16 && !validInHouseParticipantsV16
    ? "Isi jumlah peserta (10–25)"
    : formatRupiah(totalInvestmentAmountV16);
  const paymentWa = waLink(`Halo TQ Business & Learning Center, saya ${participant.name || "peserta"} mendaftar program ${program.title} pada ${scheduleLabel}${isInHouseV16 && validInHouseParticipantsV16 ? ` untuk ${enteredParticipantsV16} peserta` : ""} dan memilih pembayaran Transfer Bank. Mohon kirimkan rekening resmi.`);
  const trainingAdminUrl = printUrl({ type: "training", ...participant, program: program.title, date: scheduleLabel, format, payment, participants: participantLabelV16, investment: totalInvestmentLabelV16 });
  const trainingWa = waLink([
    "PENDAFTARAN TRAINING BARU - TQ BUSINESS",
    "",
    `Nama: ${participant.name}`,
    `Email: ${participant.email}`,
    `No. HP/WA: ${participant.whatsapp}`,
    `Perusahaan: ${participant.company || "-"}`,
    `Jabatan: ${participant.position || "-"}`,
    `Program: ${program.title}`,
    `Format: ${format}`,
    `Jumlah Peserta: ${participantLabelV16}`,
    `Tanggal: ${scheduleLabel}`,
    `Investasi: ${totalInvestmentLabelV16}`,
    `Pembayaran: ${payment}`,
    "",
    `TEMPLATE ADMIN / SIMPAN PDF: ${trainingAdminUrl}`,
    "",
    `Saya akan mengirim bukti ${payment === "QRIS" ? "pembayaran QRIS" : "transfer"} di chat ini.`,
  ].join("\n"));

  function moveMonth(delta: number) {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1, 12));
  }

  return <>
    <section className="registration-hero"><div className="container registration-hero-grid"><div><span className="eyebrow">◌ PENDAFTARAN PROGRAM</span><h1>Mulai Perjalanan Belajar<br/>Anda Bersama TQ</h1><p>Lengkapi data pendaftaran di bawah ini untuk mengikuti program pilihan Anda.</p></div><div className="selected-program"><span>PROGRAM YANG DIPILIH</span><h2>{program.title}</h2><p>{program.tagline}</p><div className="selected-meta"><b>◷ {program.duration}</b><b>▣ {format}</b><b>▣ {isInHouseV16 ? totalInvestmentLabelV16 : program.openTraining}</b></div><h4>YANG ANDA DAPATKAN</h4><ul>{program.benefits.slice(0,6).map((item) => <li key={item}>✓ {item}</li>)}</ul></div></div></section>
    <form className="registration-form container" onSubmit={(event) => { event.preventDefault(); setSuccess(true); window.setTimeout(() => document.querySelector(".success-card")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50); }}>
      <section className="form-card participant-card"><h2>DATA PESERTA</h2><p>Informasi Pribadi</p><div className="form-grid two"><label>Nama Lengkap *<input required value={participant.name} onChange={(event) => setParticipant({ ...participant, name: event.target.value })} placeholder="Masukkan nama lengkap Anda"/></label><label>Email *<input required type="email" value={participant.email} onChange={(event) => setParticipant({ ...participant, email: event.target.value })} placeholder="nama@email.com"/></label><label>Nomor WhatsApp *<input required value={participant.whatsapp} onChange={(event) => setParticipant({ ...participant, whatsapp: event.target.value })} placeholder="08xxxxxxxxxx"/></label><label>Nama Perusahaan / Instansi<input value={participant.company} onChange={(event) => setParticipant({ ...participant, company: event.target.value })} placeholder="Masukkan nama perusahaan / instansi"/></label><label>Jabatan / Posisi<input value={participant.position} onChange={(event) => setParticipant({ ...participant, position: event.target.value })} placeholder="Masukkan jabatan / posisi Anda"/></label></div></section>
      <section className="form-card format-card"><h2>PILIH FORMAT PELATIHAN</h2><p>Pilih format yang paling sesuai dengan kebutuhan Anda.</p><div className="choice-grid">{["Online", "Offline", "Hybrid", "In-House Training"].map((choice) => <button type="button" onClick={() => setFormat(choice)} className={format === choice ? "choice active" : "choice"} key={choice}><span>{choice === "Online" ? "💻" : choice === "Offline" ? "👥" : choice === "Hybrid" ? "▣" : "🏢"}</span><b>{choice}</b><small>{choice === "Online" ? "Mengikuti pelatihan secara virtual dari mana saja." : choice === "Offline" ? "Mengikuti pelatihan langsung di lokasi yang telah ditentukan." : choice === "Hybrid" ? "Pilihan mengikuti pelatihan secara online maupun offline." : "Program khusus untuk perusahaan atau organisasi Anda."}</small></button>)}</div>{isInHouseV16 ? <div className="form-grid two" style={{marginTop:18}}><label>Jumlah Peserta *<input required type="number" min={10} max={25} step={1} inputMode="numeric" value={inHouseParticipantsV16} onChange={(event) => setInHouseParticipantsV16(event.target.value)} onBlur={(event) => { if (!event.target.value) return; const next = Math.min(25, Math.max(10, Math.round(Number(event.target.value) || 10))); setInHouseParticipantsV16(String(next)); }} placeholder="10 - 25"/><small style={{display:"block",marginTop:6}}>Minimum 10 peserta, maksimum 25 peserta.</small></label><div style={{border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",background:"var(--bg)",display:"grid",alignContent:"center",gap:5}}><span style={{fontSize:12,color:"var(--text-muted)",fontWeight:700}}>TOTAL INVESTASI IN-HOUSE</span><b style={{fontSize:22}}>{totalInvestmentLabelV16}</b><small style={{color:"var(--text-muted)"}}>Paket minimum {program.inHouse}. Total menyesuaikan jumlah peserta.</small></div></div> : null}</section>
      <section className="form-card schedule-card"><h2>PILIH JADWAL</h2><p>Klik tanggal mulai yang Anda inginkan. Jadwal berlangsung selama dua hari.</p><div className="schedule-layout"><div className="calendar"><div className="calendar-head"><button type="button" onClick={() => moveMonth(-1)} aria-label="Bulan sebelumnya">‹</button><b>{MONTH_FORMATTER.format(calendarMonth)}</b><button type="button" onClick={() => moveMonth(1)} aria-label="Bulan berikutnya">›</button></div><div className="days"><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>{Array.from({ length: monthOffset }, (_, index) => <i key={`blank-${index}`} />)}{Array.from({ length: monthDays }, (_, index) => { const day = index + 1; const current = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day, 12); const currentKey = dateKey(current); return <button type="button" className={selectedDate === currentKey ? "selected-day" : ""} aria-label={`Pilih ${DATE_FORMATTER.format(current)}`} aria-pressed={selectedDate === currentKey} onClick={() => setSelectedDate(currentKey)} key={currentKey}>{day}</button>; })}</div></div><div className="schedule-detail"><h3>Detail Jadwal</h3><p>▣ <b>{scheduleLabel}</b></p><p>◷ <b>09.00 - 16.00 WIB</b></p><p>⌖ <b>{format === "Online" ? "Online (Zoom Meeting)" : "Lokasi menyesuaikan format"}</b></p><p>✓ <b>Tanggal pilihan Anda sudah tersimpan</b></p></div></div></section>
      <section className="form-card summary-card"><h2>RINGKASAN PENDAFTARAN</h2><div><span>Program</span><b>{program.title}</b></div><div><span>Format</span><b>{format}</b></div><div><span>Tanggal</span><b>{scheduleLabel}</b></div><div><span>Peserta</span><b>{participantLabelV16}</b></div><div><span>Investasi per peserta</span><b>{unitInvestmentLabelV16}</b></div><hr/><div className="summary-total"><span>TOTAL INVESTASI</span><b>{totalInvestmentLabelV16}</b></div></section>
      <section className="form-card confirm-card"><h2>KONFIRMASI PENDAFTARAN</h2><label className="check"><input required type="checkbox"/> Saya telah membaca dan menyetujui Syarat & Ketentuan TQ Business & Learning Center.</label><label className="check"><input required type="checkbox"/> Saya menyetujui penggunaan data saya untuk kebutuhan administrasi pendaftaran program.</label><button className="gold-btn" type="submit">KONFIRMASI & LANJUTKAN →</button></section>
      <section className="form-card payment-card"><h2>PEMBAYARAN</h2><p>Pilih metode pembayaran. Setelah membayar, gunakan tombol WhatsApp di bagian konfirmasi untuk mengirim bukti.</p><div className="payment-grid two-payments">{(["QRIS", "Transfer Bank"] as const).map((method) => <button type="button" onClick={() => setPayment(method)} className={payment === method ? "payment active" : "payment"} key={method}><span>{method === "QRIS" ? "▦" : "🏦"}</span><b>{method}</b><small>{method === "QRIS" ? "Pindai atau simpan gambar QRIS." : "Minta rekening resmi TQ melalui WhatsApp."}</small></button>)}</div>{payment === "QRIS" ? <div className="payment-detail qris-detail"><div><h3>QRIS JOE COFFEE (ANEXSO)</h3><p>Pindai QRIS atau simpan gambarnya ke galeri.</p><a className="gold-btn" href={QRIS_IMAGE} download="QRIS-Joe-Coffee.jpeg">Simpan QRIS ↓</a></div><img src={QRIS_IMAGE} alt="QRIS JOE Coffee ANEXSO"/></div> : <div className="payment-detail bank-detail"><div><h3>TRANSFER BANK</h3><p>Nomor rekening resmi diberikan melalui WhatsApp agar data pembayaran tetap terverifikasi.</p></div><a className="gold-btn" href={paymentWa} target="_blank" rel="noreferrer">Minta Rekening Resmi ↗</a></div>}</section>
      {success ? <section className="form-card success-card"><span>✓</span><div><h2>PENDAFTARAN BERHASIL!</h2><h3>Selamat! Pendaftaran Anda Berhasil.</h3><p>Setelah melakukan pembayaran, klik tombol WhatsApp berikut dan kirim bukti transfer/QRIS di chat yang terbuka.</p><div className="success-meta"><b>Program: {program.title}</b><b>Peserta: {participantLabelV16}</b><b>Investasi: {totalInvestmentLabelV16}</b><b>Tanggal: {scheduleLabel}</b><b>Pembayaran: {payment}</b><b>Status: Pendaftaran diterima</b></div><a className="gold-btn" href={trainingWa} target="_blank" rel="noreferrer">Kirim Bukti Pembayaran via WhatsApp →</a></div></section> : null}
    </form>
  </>;
}
