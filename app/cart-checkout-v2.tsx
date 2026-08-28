"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QRIS_IMAGE, SITE_URL, waLink } from "./site-config";
import {
  bookProducts,
  culinaryProducts,
  formatRupiah,
  joeProducts,
  type Product,
} from "./site-data";

const CART_KEY = "anexso-cart-v1";
const CART_EVENT = "anexso-cart-change";
const SACHET_NAME = "Sachet 10gr";
const SACHET_MIN_QTY = 10;
const JOE_NAMES = new Set(joeProducts.map((item) => item.name));
const CULINARY_NAMES = new Set(culinaryProducts.map((item) => item.name));

type CartItem = Product & { qty: number };
type PaymentMethod = "QRIS" | "Transfer Bank";
type ShippingMode = "idle" | "loading" | "ready" | "manual";
type CourierRate = {
  id: string;
  courierName: string;
  courierCode: string;
  serviceName: string;
  serviceCode: string;
  duration: string;
  price: number;
};

type ShippingApiResponse = {
  success?: boolean;
  fallback?: boolean;
  message?: string;
  detail?: string;
  rates?: CourierRate[];
};

function minimumQty(product: Pick<Product, "name">) {
  return product.name === SACHET_NAME ? SACHET_MIN_QTY : 1;
}

function readCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is CartItem => Boolean(item?.name && item?.image && item?.price && item?.qty))
      .map((item) => ({
        ...item,
        qty: Math.max(minimumQty(item), Number(item.qty) || minimumQty(item)),
      }));
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

function addCartItem(items: CartItem[], product: Product) {
  const existing = items.find((item) => item.name === product.name);
  if (!existing) return [...items, { ...product, qty: minimumQty(product) }];
  return items.map((item) =>
    item.name === product.name
      ? { ...item, qty: Math.max(minimumQty(item), item.qty + 1) }
      : item,
  );
}

function isEbookProduct(item: Product) {
  return item.category === "E-Book" || Boolean(item.kind?.includes("E-Book"));
}

function isCulinaryProduct(item: Product) {
  return CULINARY_NAMES.has(item.name);
}

function isStandardPhysical(item: Product) {
  return !isEbookProduct(item) && !isCulinaryProduct(item);
}

function isBookProduct(item: Product) {
  return item.category === "Buku" || item.category === "E-Book" || Boolean(item.kind?.includes("Buku") || item.kind?.includes("E-Book"));
}

function productGroupLabel(item: Product) {
  if (isCulinaryProduct(item)) return "Kuliner";
  if (JOE_NAMES.has(item.name)) return "Joe Coffee";
  if (isEbookProduct(item)) return "E-Book / Digital";
  return item.category || item.kind || "Produk Fisik";
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

function createOrderRef() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `ANX-${y}${m}${d}-${suffix}`;
}

export function CartCheckoutV2() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>("QRIS");
  const [customer, setCustomer] = useState({
    name: "",
    whatsapp: "",
    email: "",
    address: "",
    postalCode: "",
  });
  const [ebookDelivery, setEbookDelivery] = useState<"WhatsApp" | "Email">("WhatsApp");
  const [checkoutError, setCheckoutError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [shippingMode, setShippingMode] = useState<ShippingMode>("idle");
  const [shippingRates, setShippingRates] = useState<CourierRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<CourierRate | null>(null);
  const [shippingMessage, setShippingMessage] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setItems(readCart());
      setReady(true);
    });
    const sync = () => setItems(readCart());
    window.addEventListener("storage", sync);
    window.addEventListener(CART_EVENT, sync);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", sync);
      window.removeEventListener(CART_EVENT, sync);
    };
  }, []);

  useEffect(() => {
    if (ready) writeCart(items);
  }, [items, ready]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );
  const hasEbook = items.some(isEbookProduct);
  const standardItems = useMemo(() => items.filter(isStandardPhysical), [items]);
  const culinaryItems = useMemo(() => items.filter(isCulinaryProduct), [items]);
  const hasStandardPhysical = standardItems.length > 0;
  const hasCulinary = culinaryItems.length > 0;
  const requiresShipping = hasStandardPhysical || hasCulinary;
  const ebookOnlyCart = items.length > 0 && hasEbook && !requiresShipping;
  const bookOnlyCart = items.length > 0 && items.every(isBookProduct);
  const culinaryOnlyCart = items.length > 0 && items.every(isCulinaryProduct);

  const standardSignature = useMemo(
    () => standardItems.map((item) => `${item.name}:${item.qty}`).sort().join("|"),
    [standardItems],
  );

  useEffect(() => {
    setShippingRates([]);
    setSelectedRate(null);
    setShippingMessage("");
    setShippingMode(hasStandardPhysical ? "idle" : "ready");
  }, [standardSignature, hasStandardPhysical]);

  const shippingLocked = !hasCulinary && (!hasStandardPhysical || Boolean(selectedRate));
  const shippingCost = selectedRate?.price || 0;
  const finalTotal = subtotal + shippingCost;
  const displayTotal = shippingLocked ? finalTotal : subtotal;

  const recommendations = (bookOnlyCart ? bookProducts : joeProducts)
    .filter((product) => !items.some((item) => item.name === product.name))
    .slice(0, 5);

  const continueShoppingHref = culinaryOnlyCart
    ? "/kuliner"
    : bookOnlyCart
      ? "/buku-ebook"
      : "/joe-coffee";

  const changeQty = (name: string, delta: number) => {
    setItems((current) => current.map((item) =>
      item.name === name
        ? { ...item, qty: Math.max(minimumQty(item), item.qty + delta) }
        : item,
    ));
  };

  const remove = (name: string) => setItems((current) => current.filter((item) => item.name !== name));

  function continueCheckout() {
    if (!items.length) return;
    setCompleted(false);
    setCheckoutError("");
    setOrderRef((current) => current || createOrderRef());
    setCheckoutOpen(true);
    window.setTimeout(() => {
      document.querySelector("#checkout-fulfillment")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function checkShippingRates() {
    const postalCode = customer.postalCode.replace(/\D/g, "");
    if (!customer.address.trim()) {
      setCheckoutError("Tuliskan alamat pengiriman terlebih dahulu.");
      return;
    }
    if (postalCode.length !== 5) {
      setCheckoutError("Tuliskan kode pos tujuan 5 digit untuk mengecek ongkir.");
      return;
    }

    setCheckoutError("");
    setShippingMode("loading");
    setShippingMessage("Mengecek tarif JNE, TIKI, Wahana, dan kurir aktif...");
    setShippingRates([]);
    setSelectedRate(null);

    try {
      const response = await fetch("/api/shipping/rates", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destinationPostalCode: postalCode,
          items: standardItems.map((item) => ({ name: item.name, qty: item.qty })),
        }),
      });
      const data = await response.json() as ShippingApiResponse;
      const rates = Array.isArray(data.rates) ? data.rates : [];

      if (data.success && rates.length) {
        setShippingRates(rates);
        setShippingMode("ready");
        setShippingMessage("Pilih satu layanan kurir. Total pembayaran akan dikunci setelah kurir dipilih.");
        return;
      }

      setShippingMode("manual");
      setShippingMessage(data.detail || data.message || "TUNGGU KONFIRMASI ONGKIR");
    } catch {
      setShippingMode("manual");
      setShippingMessage("Shipping API tidak dapat dihubungi. Admin akan mengonfirmasi ongkir melalui WhatsApp.");
    }
  }

  const shippingRequestWa = useMemo(() => {
    const ref = orderRef || "ANX-PENDING";
    const lines = [
      "PERMINTAAN KONFIRMASI ONGKIR - ANEXSO",
      `No. Pesanan: ${ref}`,
      "",
      ...items.map((item) => `- ${item.name} x${item.qty}: ${formatRupiah(item.price * item.qty)}`),
      `Total produk: ${formatRupiah(subtotal)}`,
      "",
      `Nama: ${customer.name.trim() || "-"}`,
      `WhatsApp: ${customer.whatsapp.trim() || "-"}`,
      `Alamat: ${customer.address.trim() || "-"}`,
      `Kode Pos: ${customer.postalCode.trim() || "-"}`,
      "",
    ];

    if (hasStandardPhysical) {
      lines.push(
        selectedRate
          ? `Kurir produk fisik: ${selectedRate.courierName} ${selectedRate.serviceName} - ${formatRupiah(selectedRate.price)}`
          : "Kurir produk fisik: mohon cek JNE / TIKI / Wahana / kurir aktif",
      );
    }
    if (hasCulinary) {
      lines.push("Kuliner: mohon cek ongkir GoSend sesuai alamat di atas.");
    }

    lines.push(
      "",
      "MOHON KONFIRMASI ONGKIR DAN TOTAL AKHIR SEBELUM SAYA MELAKUKAN PEMBAYARAN.",
      "Saya belum melakukan pembayaran.",
    );
    return waLink(lines.join("\n"));
  }, [customer, hasCulinary, hasStandardPhysical, items, orderRef, selectedRate, subtotal]);

  const requestBankWa = useMemo(() => waLink([
    "PERMINTAAN REKENING RESMI - ANEXSO",
    `No. Pesanan: ${orderRef || "-"}`,
    ...items.map((item) => `- ${item.name} x${item.qty}`),
    `Total produk: ${formatRupiah(subtotal)}`,
    `Ongkir final: ${formatRupiah(shippingCost)}`,
    `TOTAL PEMBAYARAN: ${formatRupiah(finalTotal)}`,
    `Nama: ${customer.name || "-"}`,
    `Nomor WhatsApp: ${customer.whatsapp || "-"}`,
  ].join("\n")), [customer.name, customer.whatsapp, finalTotal, items, orderRef, shippingCost, subtotal]);

  function validateCustomer() {
    if (!customer.name.trim()) return "Lengkapi nama penerima terlebih dahulu.";
    if (requiresShipping && !customer.whatsapp.trim()) return "Lengkapi nomor WhatsApp untuk konfirmasi pengiriman.";
    if (requiresShipping && !customer.address.trim()) return "Lengkapi alamat pengiriman.";
    if (hasStandardPhysical && customer.postalCode.replace(/\D/g, "").length !== 5) return "Lengkapi kode pos tujuan 5 digit.";
    if (hasEbook && ebookDelivery === "WhatsApp" && !customer.whatsapp.trim()) return "Tuliskan nomor WhatsApp tujuan pengiriman e-book.";
    if (hasEbook && ebookDelivery === "Email") {
      const email = customer.email.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Tuliskan alamat email yang valid untuk pengiriman e-book.";
    }
    return "";
  }

  function confirmOrder() {
    const validationError = validateCustomer();
    if (validationError) {
      setCheckoutError(validationError);
      return;
    }
    if (!shippingLocked) {
      setCheckoutError("Pembayaran dikunci sampai ongkir dan TOTAL AKHIR sudah terkonfirmasi.");
      return;
    }

    setCheckoutError("");
    const ebookRecipient = ebookDelivery === "WhatsApp" ? customer.whatsapp.trim() : customer.email.trim();
    const labelUrl = requiresShipping ? printUrl({
      type: "order",
      orderRef,
      name: customer.name.trim(),
      whatsapp: customer.whatsapp.trim(),
      email: customer.email.trim(),
      address: customer.address.trim(),
      postalCode: customer.postalCode.trim(),
      ebookDelivery: hasEbook ? ebookDelivery : "",
      ebookRecipient: hasEbook ? ebookRecipient : "",
      payment,
      subtotal,
      shipping: shippingCost,
      total: finalTotal,
      courier: selectedRate,
      items: items.map((item) => ({ name: item.name, qty: item.qty, price: item.price })),
    }) : "";

    const message = [
      "PESANAN - ANEXSO | JOE COFFEE",
      `No. Pesanan: ${orderRef}`,
      "",
      ...items.map((item) => `- ${item.name} x${item.qty}: ${formatRupiah(item.price * item.qty)}`),
      `Total Produk: ${formatRupiah(subtotal)}`,
      `Ongkir Final: ${formatRupiah(shippingCost)}${selectedRate ? ` (${selectedRate.courierName} ${selectedRate.serviceName})` : ""}`,
      `TOTAL PEMBAYARAN: ${formatRupiah(finalTotal)}`,
      `Pembayaran: ${payment}`,
      "",
      `Nama: ${customer.name.trim()}`,
      ...(requiresShipping ? [
        `No. HP/WA: ${customer.whatsapp.trim()}`,
        `Alamat: ${customer.address.trim()}`,
        `Kode Pos: ${customer.postalCode.trim()}`,
      ] : []),
      ...(hasEbook ? [
        `Pengiriman E-book: ${ebookDelivery}`,
        `${ebookDelivery === "WhatsApp" ? "Nomor WhatsApp" : "Email"}: ${ebookRecipient}`,
      ] : []),
      "",
      ...(requiresShipping ? [`CETAK LABEL PEMBELI: ${labelUrl}`, ""] : []),
      `Saya akan mengirim bukti ${payment === "QRIS" ? "pembayaran QRIS" : "transfer"} di chat ini.`,
    ].join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    writeCart([]);
    setItems([]);
    setCheckoutOpen(false);
    setCompleted(true);
    window.setTimeout(() => {
      document.querySelector("#order-complete")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  const shippingSummary = !items.length
    ? "-"
    : !requiresShipping
      ? "Rp 0"
      : shippingLocked
        ? formatRupiah(shippingCost)
        : "Belum final";

  const fulfillmentHeadline = ebookOnlyCart
    ? "Tanpa Ongkir"
    : culinaryOnlyCart
      ? "Kuliner via GoSend"
      : hasCulinary && hasStandardPhysical
        ? "Pengiriman Dipisah"
        : "Multi-Kurir Otomatis";

  const fulfillmentCaption = ebookOnlyCart
    ? "Produk digital langsung ke WhatsApp atau Email."
    : culinaryOnlyCart
      ? "Tarif GoSend dikonfirmasi admin sebelum pembayaran."
      : hasCulinary && hasStandardPhysical
        ? "Produk fisik via kurir nasional, kuliner via GoSend."
        : "JNE / TIKI / Wahana; fallback konfirmasi admin jika API gagal.";

  return <>
    <div className="cart-layout container">
      <section className="cart-main">
        <div className="cart-title-row">
          <div><h1>🛒 KERANJANG BELANJA</h1><p>Review produk Anda. Ongkir harus final sebelum pembayaran.</p></div>
          <Link href={continueShoppingHref}>Lanjut Belanja →</Link>
        </div>

        <div className="cart-table">
          <div className="cart-head"><span>Produk</span><span>Harga</span><span>Jumlah</span><span>Subtotal</span></div>
          {!ready ? <div className="cart-empty">Memuat keranjang...</div> : items.length === 0 ? <div className="cart-empty"><h2>Keranjang masih kosong</h2><p>Pilih produk Joe Coffee, buku, e-book, atau kuliner yang Anda inginkan.</p><Link className="gold-btn" href="/joe-coffee">Mulai Belanja →</Link></div> : items.map((item) => <div className="cart-row" key={item.name}>
            <div className="cart-product"><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><span>{productGroupLabel(item)}</span><span>{item.subtitle}</span></div></div>
            <b>{formatRupiah(item.price)}</b>
            <div className="qty"><button type="button" aria-label={`Kurangi ${item.name}`} disabled={item.qty <= minimumQty(item)} onClick={() => changeQty(item.name, -1)}>−</button><span>{item.qty}</span><button type="button" aria-label={`Tambah ${item.name}`} onClick={() => changeQty(item.name, 1)}>+</button></div>
            <div className="subtotal-cell"><b>{formatRupiah(item.price * item.qty)}</b><button type="button" aria-label={`Hapus ${item.name}`} onClick={() => remove(item.name)}>⌫</button></div>
          </div>)}
        </div>

        {items.length > 0 ? <div className="promo-row">
          <div><strong>Punya Kode Promo?</strong><div className="promo-input"><input placeholder="Masukkan kode promo"/><button type="button">Gunakan</button></div></div>
          <div className="shipping-note"><span>{ebookOnlyCart ? "📩" : "🚚"}</span><div><strong>{fulfillmentHeadline}</strong><small>{fulfillmentCaption}</small></div><b>✓</b></div>
        </div> : null}

        {items.length > 0 ? <><h2 className="recommend-title">Anda Mungkin Juga Suka</h2><div className="recommend-grid">{recommendations.map((product) => <article key={product.name}><img src={product.image} alt={product.name}/><strong>{product.name}</strong><span>{product.subtitle}</span><b>{formatRupiah(product.price)}</b><button type="button" onClick={() => setItems((current) => addCartItem(current, product))}>＋ Keranjang</button></article>)}</div></> : null}
      </section>

      <aside className="order-summary">
        <h2>RINGKASAN PESANAN</h2>
        <div><span>Subtotal ({items.reduce((sum, item) => sum + item.qty, 0)} produk)</span><b>{formatRupiah(subtotal)}</b></div>
        <div><span>Ongkos Kirim</span><b>{shippingSummary}</b></div>
        <div><span>Promo</span><b>Rp 0</b></div>
        <hr/>
        <div className="total"><span>{shippingLocked ? "Total Pembayaran" : "Total Sementara"}</span><b>{formatRupiah(items.length ? displayTotal : 0)}</b></div>
        {!shippingLocked && items.length ? <p className="summary-warning">⚠ Total belum final. Pembayaran belum dibuka.</p> : null}
        <button type="button" disabled={!items.length} onClick={continueCheckout} className="gold-btn wide">{ebookOnlyCart ? "Lanjut ke Pembayaran →" : "Lanjut ke Pengiriman →"}</button>
        <small>🔒 Pembayaran hanya aktif setelah ongkir dan total akhir terkunci.</small>
      </aside>
    </div>

    {checkoutOpen && items.length > 0 ? <section id="checkout-fulfillment" className="checkout-payment container">
      <div className="checkout-customer form-card">
        <h2>{requiresShipping ? "DATA PENGIRIMAN" : "DATA PEMBELI"}</h2>
        {orderRef ? <p className="order-ref"><b>No. Pesanan:</b> {orderRef}</p> : null}
        <div className="form-grid two">
          <label>Nama Lengkap *<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Masukkan nama lengkap"/></label>
          {(requiresShipping || (hasEbook && ebookDelivery === "WhatsApp")) ? <label>Nomor WhatsApp *<input required value={customer.whatsapp} onChange={(event) => setCustomer({ ...customer, whatsapp: event.target.value })} placeholder="08xxxxxxxxxx"/></label> : null}
        </div>

        {requiresShipping ? <>
          <label>Alamat Pengiriman *<textarea required rows={4} value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="Tuliskan alamat lengkap, kecamatan/kota, dan patokan"/></label>
          <div className="form-grid two postal-row">
            <label>Kode Pos *<input inputMode="numeric" maxLength={5} value={customer.postalCode} onChange={(event) => setCustomer({ ...customer, postalCode: event.target.value.replace(/\D/g, "").slice(0, 5) })} placeholder="Contoh 61234"/></label>
            <div className="address-note"><b>Aturan pembayaran</b><span>Jangan transfer sebelum ongkir dan TOTAL AKHIR sudah final.</span></div>
          </div>
        </> : null}

        {hasStandardPhysical ? <div className="shipping-control">
          <div className="shipping-control-head"><div><small>JOE COFFEE / PRODUK FISIK</small><h3>Kurir Nasional</h3><p>Tarif otomatis melalui Shipping API multi-kurir. Prioritas JNE, TIKI, dan Wahana.</p></div><button className="outline-btn" type="button" onClick={() => void checkShippingRates()} disabled={shippingMode === "loading"}>{shippingMode === "loading" ? "Mengecek..." : "Cek Ongkir Otomatis"}</button></div>
          {shippingMessage ? <p className={shippingMode === "manual" ? "shipping-alert manual" : "shipping-alert"}>{shippingMode === "manual" ? "TUNGGU KONFIRMASI ONGKIR — " : ""}{shippingMessage}</p> : null}
          {shippingRates.length ? <div className="rate-grid">{shippingRates.map((rate) => <button key={rate.id} type="button" className={selectedRate?.id === rate.id ? "rate-option active" : "rate-option"} onClick={() => setSelectedRate(rate)}><span><b>{rate.courierName}</b><small>{rate.serviceName}{rate.duration ? ` • ${rate.duration}` : ""}</small></span><strong>{formatRupiah(rate.price)}</strong></button>)}</div> : null}
        </div> : null}

        {hasCulinary ? <div className="shipping-control gosend-control"><div className="shipping-control-head"><div><small>KULINER</small><h3>GoSend</h3><p>Untuk tahap ini tarif GoSend dikonfirmasi manual oleh admin berdasarkan alamat customer.</p></div><span className="manual-badge">MANUAL</span></div><p className="shipping-alert manual"><b>TUNGGU KONFIRMASI ONGKIR.</b> Jangan melakukan pembayaran sebelum admin mengirim total produk + GoSend + total akhir.</p></div> : null}

        {(hasCulinary || shippingMode === "manual") ? <div className="manual-confirmation"><div><b>Ongkir belum final</b><span>Kirim data pesanan ke WhatsApp. Admin akan membalas nominal ongkir dan TOTAL AKHIR.</span></div><a className="gold-btn" href={shippingRequestWa} target="_blank" rel="noreferrer">Minta Konfirmasi Ongkir via WhatsApp ↗</a></div> : null}

        {hasEbook ? <div className="ebook-delivery"><p><b>E-book dikirim melalui *</b></p><div className="payment-grid two-payments"><button type="button" onClick={() => setEbookDelivery("WhatsApp")} className={ebookDelivery === "WhatsApp" ? "payment active" : "payment"}><span>💬</span><b>WhatsApp</b><small>E-book dikirim ke nomor WhatsApp.</small></button><button type="button" onClick={() => setEbookDelivery("Email")} className={ebookDelivery === "Email" ? "payment active" : "payment"}><span>✉</span><b>Email</b><small>E-book dikirim ke alamat email.</small></button></div>{ebookDelivery === "Email" ? <label>Email penerima *<input required type="email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} placeholder="nama@email.com"/></label> : null}</div> : null}

        {checkoutError ? <p role="alert" className="checkout-error"><b>{checkoutError}</b></p> : null}
      </div>

      {shippingLocked ? <div className="checkout-method form-card">
        <h2>METODE PEMBAYARAN</h2>
        <div className="final-total-box"><span>Total Produk</span><b>{formatRupiah(subtotal)}</b><span>Ongkir Final</span><b>{formatRupiah(shippingCost)}</b><strong>TOTAL PEMBAYARAN</strong><strong>{formatRupiah(finalTotal)}</strong></div>
        <p>Total sudah final. Silakan pilih metode pembayaran.</p>
        <div className="payment-grid two-payments">{(["QRIS", "Transfer Bank"] as const).map((method) => <button type="button" key={method} onClick={() => setPayment(method)} className={payment === method ? "payment active" : "payment"}><span>{method === "QRIS" ? "▦" : "🏦"}</span><b>{method}</b><small>{method === "QRIS" ? "Bayar sesuai TOTAL PEMBAYARAN final." : "Minta rekening resmi melalui WhatsApp."}</small></button>)}</div>
        {payment === "QRIS" ? <div className="payment-detail qris-detail"><div><h3>QRIS JOE COFFEE (ANEXSO)</h3><p>Pastikan nominal yang dibayar sama dengan TOTAL PEMBAYARAN di atas.</p><a className="gold-btn" href={QRIS_IMAGE} download="QRIS-Joe-Coffee.jpeg">Simpan QRIS ↓</a></div><img src={QRIS_IMAGE} alt="QRIS JOE Coffee ANEXSO"/></div> : <div className="payment-detail bank-detail"><div><h3>TRANSFER BANK</h3><p>Rekening resmi diberikan setelah total final terkunci.</p></div><a className="gold-btn" href={requestBankWa} target="_blank" rel="noreferrer">Minta Rekening Resmi ↗</a></div>}
        <button className="gold-btn wide confirm-order" type="button" onClick={confirmOrder}>Konfirmasi & Kirim Bukti via WhatsApp →</button>
      </div> : <div className="form-card payment-locked"><span>🔒</span><div><h2>PEMBAYARAN DIKUNCI</h2><h3>TUNGGU KONFIRMASI ONGKIR</h3><p>Metode pembayaran dan QRIS sengaja tidak ditampilkan sampai ongkir dan TOTAL AKHIR sudah final. Ini mencegah customer transfer dengan nominal yang kurang atau salah.</p></div></div>}
    </section> : null}

    {completed ? <section id="order-complete" className="checkout-payment container"><div className="form-card success-card"><span>✓</span><div><h2>PESANAN TERKONFIRMASI</h2><h3>Detail pesanan telah dibuka di WhatsApp.</h3><p>Nomor pesanan dan total final sudah disertakan agar customer dan admin menggunakan angka yang sama.</p><Link className="gold-btn" href="/">Kembali ke Beranda →</Link></div></div></section> : null}

    <style jsx>{`
      .summary-warning{margin:10px 0 14px!important;padding:9px 10px;border-radius:8px;background:#fff2cf;color:#f4c768!important;font-size:11px!important;text-align:left!important}
      .order-ref{margin:0 0 14px;padding:9px 11px;border:1px solid #ead9b7;border-radius:8px;background:#fffaf0;color:#6e4b12}
      .postal-row{margin-top:12px;align-items:end}.address-note{min-height:68px;border:1px solid #e3dbcf;border-radius:9px;background:#faf8f4;padding:10px 12px;display:flex;flex-direction:column;justify-content:center}.address-note b{font-size:12px;color:#8b5908}.address-note span{font-size:11px;color:#665f55}
      .shipping-control{margin-top:18px;padding:15px;border:1px solid #ded8ce;border-radius:11px;background:#fbfaf7}.shipping-control-head{display:flex;gap:18px;align-items:center;justify-content:space-between}.shipping-control-head small{font-size:10px;letter-spacing:.12em;font-weight:900;color:#ad7008}.shipping-control-head h3{margin:2px 0;font-size:17px}.shipping-control-head p{margin:0;color:#6c665c;font-size:11px;max-width:560px}.shipping-alert{margin:12px 0 0;padding:10px 12px;border-radius:8px;background:#eef7ee;color:#276b39;font-size:12px}.shipping-alert.manual{background:#fff2cf;color:#6f4a05;border:1px solid #edcc7a}.rate-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px}.rate-option{border:1px solid #ddd4c7;border-radius:9px;background:#fff;padding:10px 11px;display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;cursor:pointer}.rate-option span{display:flex;flex-direction:column}.rate-option small{font-size:10px;color:#6c665c}.rate-option strong{color:#9a6305}.rate-option.active{border:2px solid #e5a11b;background:#fff8e6}.manual-badge{padding:6px 9px;border-radius:999px;background:#fff2cf;color:#7b5005;font-size:10px;font-weight:900}.manual-confirmation{margin-top:14px;padding:13px;border:1px solid #e7bd62;border-radius:10px;background:#fff7df;display:flex;gap:14px;align-items:center;justify-content:space-between}.manual-confirmation>div{display:flex;flex-direction:column}.manual-confirmation b{color:#7b5005}.manual-confirmation span{font-size:11px;color:#66583e}.ebook-delivery{margin-top:18px}.ebook-delivery>label{display:block;margin-top:12px}.checkout-error{margin-top:14px;padding:10px 12px;border-radius:8px;background:#ffeaea;color:#9f1c1c}.final-total-box{display:grid;grid-template-columns:1fr auto;gap:8px 18px;padding:14px;border-radius:10px;background:#17130f;color:#fff;margin-bottom:12px}.final-total-box span{font-size:12px;color:#d1c7b9}.final-total-box>strong{border-top:1px solid #5f513d;padding-top:10px;color:#eda91f;font-size:15px}.payment-locked{display:flex!important;gap:16px!important;align-items:flex-start!important;background:#18140f!important;color:#fff!important}.payment-locked>span{font-size:30px}.payment-locked h2{margin:0;color:#fff}.payment-locked h3{margin:5px 0;color:#eda91f}.payment-locked p{color:#d6cec2;font-size:12px}.success-card{display:flex!important;gap:16px!important}.success-card>span{font-size:32px;color:#239348}
      @media(max-width:760px){.shipping-control-head,.manual-confirmation{align-items:stretch;flex-direction:column}.rate-grid{grid-template-columns:1fr}.postal-row{grid-template-columns:1fr!important}.final-total-box{grid-template-columns:1fr auto}}
    `}</style>
  </>;
}
