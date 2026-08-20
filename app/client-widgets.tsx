"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QRIS_IMAGE, waLink } from "./site-config";
import { formatRupiah, joeProducts, type Product, type TqProgram } from "./site-data";

const CART_KEY = "anexso-cart-v1";
const CART_EVENT = "anexso-cart-change";

type CartItem = Product & { qty: number };

function readCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem => Boolean(item?.name && item?.image && item?.price && item?.qty));
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

function addCartItem(items: CartItem[], product: Product) {
  const exists = items.some((item) => item.name === product.name);
  return exists
    ? items.map((item) => item.name === product.name ? { ...item, qty: item.qty + 1 } : item)
    : [...items, { ...product, qty: 1 }];
}

export function BuyButton({ product, label = "Beli Sekarang", className = "small-gold-btn" }: { product: Product; label?: string; className?: string }) {
  const router = useRouter();

  function buy() {
    writeCart(addCartItem(readCart(), product));
    router.push("/keranjang");
  }

  return <button type="button" className={className} onClick={buy}>{label} →</button>;
}

export function CartNavLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(readCart().reduce((sum, item) => sum + item.qty, 0));
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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
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
  const changeQty = (name: string, delta: number) => setItems((prev) => prev.map((item) => item.name === name ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const remove = (name: string) => setItems((prev) => prev.filter((item) => item.name !== name));
  const checkoutWa = useMemo(() => waLink([
    "Halo ANEXSO | Joe Coffee, saya ingin konfirmasi pesanan:",
    ...items.map((item) => `- ${item.name} x${item.qty}: ${formatRupiah(item.price * item.qty)}`),
    `Subtotal: ${formatRupiah(subtotal)}`,
    `Ongkir: ${shipping ? formatRupiah(shipping) : "Gratis"}`,
    `Total: ${formatRupiah(total)}`,
    `Metode pembayaran: ${payment}`,
    `Nama: ${customer.name || "-"}`,
    `Nomor WhatsApp: ${customer.whatsapp || "-"}`,
    `Alamat: ${customer.address || "-"}`,
  ].join("\n")), [customer, items, payment, shipping, subtotal, total]);

  function continueCheckout() {
    if (!items.length) return;
    setCheckoutOpen(true);
    window.setTimeout(() => document.querySelector("#checkout-payment")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  return <>
    <div className="cart-layout container">
      <section className="cart-main">
        <div className="cart-title-row"><div><h1>🛒 KERANJANG BELANJA</h1><p>Review produk Anda sebelum melanjutkan ke pengiriman.</p></div><Link href="/joe-coffee">Lanjut Belanja →</Link></div>
        <div className="cart-table">
          <div className="cart-head"><span>Produk</span><span>Harga</span><span>Jumlah</span><span>Subtotal</span></div>
          {!ready ? <div className="cart-empty">Memuat keranjang...</div> : items.length === 0 ? <div className="cart-empty"><h2>Keranjang masih kosong</h2><p>Pilih produk Joe Coffee, buku, e-book, atau kuliner yang Anda inginkan.</p><Link className="gold-btn" href="/joe-coffee">Mulai Belanja →</Link></div> : items.map((item) => <div className="cart-row" key={item.name}>
            <div className="cart-product"><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><span>{item.category || item.kind || "Joe Coffee"}</span><span>{item.subtitle}</span></div></div>
            <b>{formatRupiah(item.price)}</b>
            <div className="qty"><button type="button" aria-label={`Kurangi ${item.name}`} onClick={() => changeQty(item.name, -1)}>−</button><span>{item.qty}</span><button type="button" aria-label={`Tambah ${item.name}`} onClick={() => changeQty(item.name, 1)}>+</button></div>
            <div className="subtotal-cell"><b>{formatRupiah(item.price * item.qty)}</b><button type="button" aria-label={`Hapus ${item.name}`} onClick={() => remove(item.name)}>⌫</button></div>
          </div>)}
        </div>
        {items.length > 0 ? <div className="promo-row"><div><strong>Punya Kode Promo?</strong><div className="promo-input"><input placeholder="Masukkan kode promo"/><button type="button">Gunakan</button></div></div><div className="shipping-note"><span>🚚</span><div><strong>{shipping === 0 ? "Gratis Ongkir" : "Ongkir Hemat"}</strong><small>Belanja minimal Rp100.000</small></div><b>✓</b></div></div> : null}

        <h2 className="recommend-title">Anda Mungkin Juga Suka</h2>
        <div className="recommend-grid">{joeProducts.filter((p) => !items.some(i => i.name === p.name)).slice(0,5).map((p) => <article key={p.name}><img src={p.image} alt={p.name}/><strong>{p.name}</strong><span>{p.subtitle}</span><b>{formatRupiah(p.price)}</b><button type="button" onClick={() => setItems((prev) => addCartItem(prev, p))}>＋ Keranjang</button></article>)}</div>
      </section>
      <aside className="order-summary"><h2>RINGKASAN PESANAN</h2><div><span>Subtotal ({items.reduce((sum, item) => sum + item.qty, 0)} produk)</span><b>{formatRupiah(subtotal)}</b></div><div><span>Ongkos Kirim</span><b>{shipping ? formatRupiah(shipping) : "Gratis"}</b></div><div><span>Promo</span><b>- Rp 0</b></div><hr/><div className="total"><span>Total Pembayaran</span><b>{formatRupiah(total)}</b></div><button type="button" disabled={!items.length} onClick={continueCheckout} className="gold-btn wide">Lanjut ke Pengiriman →</button><small>🔒 Transaksi aman dan data Anda terjaga</small></aside>
    </div>
    {checkoutOpen && items.length > 0 ? <section id="checkout-payment" className="checkout-payment container">
      <div className="checkout-customer form-card"><h2>DATA PENGIRIMAN</h2><div className="form-grid two"><label>Nama Lengkap *<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Masukkan nama lengkap"/></label><label>Nomor WhatsApp *<input required value={customer.whatsapp} onChange={(event) => setCustomer({ ...customer, whatsapp: event.target.value })} placeholder="08xxxxxxxxxx"/></label></div><label>Alamat Pengiriman *<textarea required rows={4} value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="Tuliskan alamat lengkap dan patokan"/></label></div>
      <div className="checkout-method form-card"><h2>METODE PEMBAYARAN</h2><p>Pilih metode; detail pembayaran akan muncul otomatis.</p><div className="payment-grid two-payments">{(["QRIS", "Transfer Bank"] as const).map((method) => <button type="button" key={method} onClick={() => setPayment(method)} className={payment === method ? "payment active" : "payment"}><span>{method === "QRIS" ? "▦" : "🏦"}</span><b>{method}</b><small>{method === "QRIS" ? "Pindai atau simpan gambar QRIS." : "Minta rekening resmi melalui WhatsApp."}</small></button>)}</div>{payment === "QRIS" ? <div className="payment-detail qris-detail"><div><h3>QRIS JOE COFFEE (ANEXSO)</h3><p>Pindai dari aplikasi pembayaran atau simpan gambarnya ke galeri.</p><a className="gold-btn" href={QRIS_IMAGE} download="QRIS-Joe-Coffee.jpeg">Simpan QRIS ↓</a></div><img src={QRIS_IMAGE} alt="QRIS JOE Coffee ANEXSO"/></div> : <div className="payment-detail bank-detail"><div><h3>TRANSFER BANK</h3><p>Demi keamanan, nomor rekening resmi diberikan lewat WhatsApp saat pesanan dikonfirmasi.</p></div><a className="gold-btn" href={checkoutWa} target="_blank" rel="noreferrer">Minta Rekening Resmi ↗</a></div>}<a className="gold-btn wide confirm-order" href={checkoutWa} target="_blank" rel="noreferrer">Konfirmasi Pesanan via WhatsApp →</a></div>
    </section> : null}
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

export function RegistrationForm({ program }: { program: TqProgram }) {
  const [success, setSuccess] = useState(false);
  const [format, setFormat] = useState("Online");
  const [payment, setPayment] = useState<"QRIS" | "Transfer Bank">("QRIS");
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(2026, 8, 1, 12));
  const [selectedDate, setSelectedDate] = useState("2026-09-18");

  const selectedStart = parseDate(selectedDate);
  const selectedEnd = new Date(selectedStart);
  selectedEnd.setDate(selectedEnd.getDate() + 1);
  const scheduleLabel = `${DATE_FORMATTER.format(selectedStart)} - ${DATE_FORMATTER.format(selectedEnd)}`;
  const monthDays = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const monthOffset = (new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay() + 6) % 7;
  const paymentWa = waLink(`Halo TQ Business & Learning Center, saya mendaftar program ${program.title} pada ${scheduleLabel} dan memilih pembayaran Transfer Bank. Mohon kirimkan rekening resmi.`);

  function moveMonth(delta: number) {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1, 12));
  }

  return <>
    <section className="registration-hero">
      <div className="container registration-hero-grid"><div><span className="eyebrow">◌ PENDAFTARAN PROGRAM</span><h1>Mulai Perjalanan Belajar<br/>Anda Bersama TQ</h1><p>Lengkapi data pendaftaran di bawah ini untuk mengikuti program pilihan Anda.</p></div><div className="selected-program"><span>PROGRAM YANG DIPILIH</span><h2>{program.title}</h2><p>{program.tagline}</p><div className="selected-meta"><b>◷ {program.duration}</b><b>▣ {format}</b><b>▣ {program.openTraining}</b></div><h4>YANG ANDA DAPATKAN</h4><ul>{program.benefits.slice(0,6).map(x => <li key={x}>✓ {x}</li>)}</ul></div></div>
    </section>
    <form className="registration-form container" onSubmit={(event) => { event.preventDefault(); setSuccess(true); window.setTimeout(() => document.querySelector(".success-card")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50); }}>
      <section className="form-card participant-card"><h2>DATA PESERTA</h2><p>Informasi Pribadi</p><div className="form-grid two"><label>Nama Lengkap *<input required placeholder="Masukkan nama lengkap Anda"/></label><label>Email *<input required type="email" placeholder="nama@email.com"/></label><label>Nomor WhatsApp *<input required placeholder="08xxxxxxxxxx"/></label><label>Nama Perusahaan / Instansi<input placeholder="Masukkan nama perusahaan / instansi"/></label><label>Jabatan / Posisi<input placeholder="Masukkan jabatan / posisi Anda"/></label></div></section>
      <section className="form-card format-card"><h2>PILIH FORMAT PELATIHAN</h2><p>Pilih format yang paling sesuai dengan kebutuhan Anda.</p><div className="choice-grid">{["Online", "Offline", "Hybrid", "In-House Training"].map((choice) => <button type="button" onClick={() => setFormat(choice)} className={format === choice ? "choice active" : "choice"} key={choice}><span>{choice === "Online" ? "💻" : choice === "Offline" ? "👥" : choice === "Hybrid" ? "▣" : "🏢"}</span><b>{choice}</b><small>{choice === "Online" ? "Mengikuti pelatihan secara virtual dari mana saja." : choice === "Offline" ? "Mengikuti pelatihan langsung di lokasi yang telah ditentukan." : choice === "Hybrid" ? "Pilihan mengikuti pelatihan secara online maupun offline." : "Program khusus untuk perusahaan atau organisasi Anda."}</small></button>)}</div></section>
      <section className="form-card schedule-card"><h2>PILIH JADWAL</h2><p>Klik tanggal mulai yang Anda inginkan. Jadwal berlangsung selama dua hari.</p><div className="schedule-layout"><div className="calendar"><div className="calendar-head"><button type="button" onClick={() => moveMonth(-1)} aria-label="Bulan sebelumnya">‹</button><b>{MONTH_FORMATTER.format(calendarMonth)}</b><button type="button" onClick={() => moveMonth(1)} aria-label="Bulan berikutnya">›</button></div><div className="days"><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>{Array.from({ length: monthOffset }, (_, index) => <i key={`blank-${index}`} />)}{Array.from({ length: monthDays }, (_, index) => { const day = index + 1; const current = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day, 12); const currentKey = dateKey(current); return <button type="button" className={selectedDate === currentKey ? "selected-day" : ""} aria-label={`Pilih ${DATE_FORMATTER.format(current)}`} aria-pressed={selectedDate === currentKey} onClick={() => setSelectedDate(currentKey)} key={currentKey}>{day}</button>; })}</div></div><div className="schedule-detail"><h3>Detail Jadwal</h3><p>▣ <b>{scheduleLabel}</b></p><p>◷ <b>09.00 - 16.00 WIB</b></p><p>⌖ <b>{format === "Online" ? "Online (Zoom Meeting)" : "Lokasi menyesuaikan format"}</b></p><p>✓ <b>Tanggal pilihan Anda sudah tersimpan</b></p></div></div></section>
      <section className="form-card summary-card"><h2>RINGKASAN PENDAFTARAN</h2><div><span>Program</span><b>{program.title}</b></div><div><span>Format</span><b>{format}</b></div><div><span>Tanggal</span><b>{scheduleLabel}</b></div><div><span>Peserta</span><b>1 Orang</b></div><div><span>Investasi per peserta</span><b>{program.openTraining}</b></div><hr/><div className="summary-total"><span>TOTAL INVESTASI</span><b>{program.openTraining}</b></div></section>
      <section className="form-card confirm-card"><h2>KONFIRMASI PENDAFTARAN</h2><label className="check"><input required type="checkbox"/> Saya telah membaca dan menyetujui Syarat & Ketentuan TQ Business & Learning Center.</label><label className="check"><input required type="checkbox"/> Saya menyetujui penggunaan data saya untuk kebutuhan administrasi pendaftaran program.</label><button className="gold-btn" type="submit">KONFIRMASI & LANJUTKAN →</button></section>
      <section className="form-card payment-card"><h2>PEMBAYARAN</h2><p>Pilih metode; detail pembayaran akan muncul otomatis.</p><div className="payment-grid two-payments">{(["QRIS", "Transfer Bank"] as const).map((method) => <button type="button" onClick={() => setPayment(method)} className={payment === method ? "payment active" : "payment"} key={method}><span>{method === "QRIS" ? "▦" : "🏦"}</span><b>{method}</b><small>{method === "QRIS" ? "Pindai atau simpan gambar QRIS." : "Minta rekening resmi TQ melalui WhatsApp."}</small></button>)}</div>{payment === "QRIS" ? <div className="payment-detail qris-detail"><div><h3>QRIS JOE COFFEE (ANEXSO)</h3><p>Pindai QRIS atau simpan gambarnya ke galeri.</p><a className="gold-btn" href={QRIS_IMAGE} download="QRIS-Joe-Coffee.jpeg">Simpan QRIS ↓</a></div><img src={QRIS_IMAGE} alt="QRIS JOE Coffee ANEXSO"/></div> : <div className="payment-detail bank-detail"><div><h3>TRANSFER BANK</h3><p>Nomor rekening resmi diberikan melalui WhatsApp agar data pembayaran tetap terverifikasi.</p></div><a className="gold-btn" href={paymentWa} target="_blank" rel="noreferrer">Minta Rekening Resmi ↗</a></div>}</section>
      {success ? <section className="form-card success-card"><span>✓</span><div><h2>PENDAFTARAN BERHASIL!</h2><h3>Selamat! Pendaftaran Anda Berhasil.</h3><p>Terima kasih telah mendaftar di TQ Business & Learning Center. Tim kami akan menghubungi Anda untuk proses berikutnya.</p><div className="success-meta"><b>Program: {program.title}</b><b>Tanggal: {scheduleLabel}</b><b>Pembayaran: {payment}</b><b>Status: Pendaftaran diterima</b></div></div></section> : null}
    </form>
  </>;
}

export function ConsultationForm() {
  const [sent, setSent] = useState(false);
  const [format, setFormat] = useState("In-House Training");
  return <form className="consult-layout container" onSubmit={(e)=>{e.preventDefault();setSent(true);}}>
    <main className="consult-main form-card"><h1>KONSULTASI PROGRAM</h1><p>Ceritakan kebutuhan pengembangan kompetensi di perusahaan Anda. Tim TQ akan membantu memberikan rekomendasi program terbaik.</p>
      <h2>▧ INFORMASI PERUSAHAAN</h2><div className="form-grid two"><label>Nama Perusahaan / Instansi *<input required placeholder="Masukkan nama perusahaan / instansi"/></label><label>Industri / Bidang Usaha *<select required defaultValue=""><option value="" disabled>Pilih industri / bidang usaha</option><option>Manufaktur</option><option>Jasa</option><option>Retail</option><option>Teknologi</option><option>Pendidikan</option><option>Lainnya</option></select></label><label>Nama PIC *<input required placeholder="Masukkan nama lengkap PIC"/></label><label>Jabatan *<input required placeholder="Masukkan jabatan"/></label><label>Email *<input required type="email" placeholder="nama@email.com"/></label><label>Nomor WhatsApp *<input required placeholder="08xxxxxxxxxx"/></label></div>
      <h2>▧ KEBUTUHAN TRAINING</h2><div className="form-grid"><label>Tujuan Konsultasi *<select required defaultValue=""><option value="" disabled>Pilih tujuan utama</option><option>Meningkatkan kompetensi</option><option>Meningkatkan kinerja tim</option><option>Pengembangan leadership</option><option>Menyelesaikan masalah bisnis</option><option>Custom program</option></select></label><label>Area / Kompetensi yang Dibutuhkan *<select required defaultValue=""><option value="" disabled>Pilih area atau kompetensi</option><option>Leadership</option><option>HR & Talent</option><option>Teamwork</option><option>KPI & Performance</option><option>Sales</option><option>Service Excellence</option><option>AI & Productivity</option></select></label><label>Tantangan / Masalah yang Dihadapi *<textarea required rows={5} placeholder="Ceritakan tantangan atau masalah yang sedang dihadapi perusahaan Anda"/></label><div className="form-grid three"><label>Jumlah Peserta (Estimasi)<input placeholder="Contoh: 20 orang"/></label><label>Level Peserta *<select required defaultValue=""><option value="" disabled>Pilih level peserta</option><option>Staff</option><option>Supervisor</option><option>Manager</option><option>Direksi</option><option>Campuran</option></select></label><label>Target Waktu Pelaksanaan *<select required defaultValue=""><option value="" disabled>Pilih bulan / periode</option><option>1 bulan ke depan</option><option>1–3 bulan</option><option>3–6 bulan</option><option>Fleksibel</option></select></label></div></div>
      <h2>♡ PREFERENSI PROGRAM</h2><label>Format Program yang Diinginkan</label><div className="choice-grid four">{["Online","Offline","Hybrid","In-House Training"].map(x => <button type="button" className={format===x?"choice active":"choice"} onClick={()=>setFormat(x)} key={x}><span>{x === "Online" ? "💻" : x === "Offline" ? "👥" : x === "Hybrid" ? "▣" : "🏢"}</span><b>{x}</b></button>)}</div><div className="form-grid two"><label>Durasi Program yang Diinginkan<select defaultValue=""><option value="">Pilih durasi</option><option>1 hari</option><option>2 hari</option><option>3 hari</option><option>Custom</option></select></label><label>Anggaran (Estimasi)<select defaultValue=""><option value="">Pilih range anggaran</option><option>&lt; Rp15 juta</option><option>Rp15–25 juta</option><option>Rp25–50 juta</option><option>&gt; Rp50 juta</option></select></label></div><label>Catatan Tambahan<textarea rows={3} placeholder="Tuliskan kebutuhan khusus / catatan tambahan lainnya (jika ada)"/></label><label className="check"><input required type="checkbox"/> Saya menyetujui bahwa data yang saya berikan akan digunakan untuk keperluan konsultasi program.</label><div className="form-actions"><button type="reset" className="outline-btn">↻ Reset Form</button><button type="submit" className="gold-btn">Kirim Permintaan Konsultasi ↗</button></div>{sent ? <div className="consult-success"><b>✓ Terima kasih. Permintaan konsultasi Anda telah kami terima.</b><p>Tim TQ akan mempelajari kebutuhan Anda dan menghubungi PIC untuk diskusi lebih lanjut.</p></div> : null}
    </main>
    <aside className="consult-aside"><section className="dark-panel"><span>PROGRAM CUSTOM UNTUK ANDA</span><h2>Program disesuaikan dengan kebutuhan perusahaan.</h2><ul><li>✓ Tujuan dan kebutuhan perusahaan</li><li>✓ Level dan jumlah peserta</li><li>✓ Industri dan budaya organisasi</li><li>✓ Durasi dan metode pelatihan</li><li>✓ Materi dan studi kasus relevan</li><li>✓ Lokasi dan jadwal pelaksanaan</li><li>✓ Anggaran program</li></ul></section><section className="side-panel"><h3>CONTOH PROGRAM POPULER</h3>{["Leadership for Business Performance","High Performance Team","Strategic HR & Talent Management","Sales Excellence & Consultative Selling","Customer Experience & Service Excellence"].map(x=><div key={x}>◌ {x} <span>›</span></div>)}<Link href="/tq-business">Lihat 10 Program Unggulan TQ</Link></section><section className="blue-panel"><h3>SETELAH MENGIRIM FORM</h3><p><b>◉ Tim TQ akan menghubungi Anda</b><br/>Maksimal 1x24 jam setelah form diterima.</p><p><b>◉ Diskusi kebutuhan lebih lanjut</b><br/>Kami akan menggali kebutuhan Anda secara detail.</p><p><b>◉ Kami kirimkan rekomendasi program</b><br/>Anda akan menerima proposal & penawaran.</p><p><b>◉ Program siap dijalankan</b><br/>Kami dampingi sampai program selesai.</p></section></aside>
  </form>;
}
