"use client";

import { useEffect, useMemo, useState } from "react";

type OrderItem = { name: string; qty: number; price?: number };
type CourierInfo = { courierName?: string; serviceName?: string; duration?: string; price?: number };
type PrintPayload = {
  type?: "order" | "training";
  orderRef?: string;
  name?: string;
  whatsapp?: string;
  address?: string;
  postalCode?: string;
  payment?: string;
  subtotal?: number;
  shipping?: number;
  total?: number;
  courier?: CourierInfo | null;
  items?: OrderItem[];
  email?: string;
  company?: string;
  position?: string;
  program?: string;
  date?: string;
  format?: string;
  investment?: string;
  participants?: string;
};

type OrderDocument = "label" | "invoice" | "tax";

function decodePayload(hash: string): PrintPayload | null {
  try {
    const encoded = hash.replace(/^#/, "");
    if (!encoded) return null;
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - encoded.length % 4) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

function normalizeWa(value = "") {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

function rupiah(value = 0) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function printDate() {
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(new Date());
}

export default function PrintOrderPage() {
  const [payload, setPayload] = useState<PrintPayload | null>(null);
  const [ready, setReady] = useState(false);
  const [orderDocument, setOrderDocument] = useState<OrderDocument>("label");

  useEffect(() => {
    setPayload(decodePayload(window.location.hash));
    setReady(true);
  }, []);

  const isTraining = payload?.type === "training";
  const customerChat = useMemo(() => {
    const phone = normalizeWa(payload?.whatsapp);
    if (!phone) return "";
    const message = isTraining
      ? `Halo ${payload?.name || ""}, pendaftaran program ${payload?.program || "TQ Business"} sudah kami terima. Berikut dokumen konfirmasi Anda.`
      : `Halo ${payload?.name || ""}, pesanan Anda di ANEXSO | JOE COFFEE sedang kami proses.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [isTraining, payload]);

  function printOrderDocument(next: OrderDocument) {
    setOrderDocument(next);
    window.setTimeout(() => window.print(), 80);
  }

  if (!ready) return <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>Menyiapkan dokumen...</main>;
  if (!payload) return <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}><h1>Data cetak tidak tersedia</h1><p>Buka halaman ini melalui link cetak yang dikirim bersama notifikasi WhatsApp pesanan.</p></main>;

  const isA4 = isTraining || orderDocument !== "label";
  const sheetClass = isTraining ? "print-sheet training-sheet" : orderDocument === "label" ? "print-sheet order-label" : "print-sheet invoice-sheet";
  const items = payload.items || [];
  const invoiceRef = payload.orderRef || "ANX-PESANAN";
  const courierText = payload.courier?.courierName
    ? `${payload.courier.courierName}${payload.courier.serviceName ? ` - ${payload.courier.serviceName}` : ""}`
    : payload.shipping ? "Kurir / pengiriman" : "-";

  return <main className={sheetClass}>
    <style>{`
      *{box-sizing:border-box}body{margin:0;background:#eee;color:#111;font-family:Arial,Helvetica,sans-serif}.print-sheet{background:#fff;margin:24px auto;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,.12)}.order-label{max-width:520px}.training-sheet,.invoice-sheet{max-width:850px}.print-actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}.print-actions button,.print-actions a{border:0;background:#111;color:#fff;padding:11px 16px;border-radius:8px;text-decoration:none;font-weight:700;cursor:pointer}.print-actions button.secondary{background:#3c3c3c}.print-actions button.tax-action{background:#8a5a0d}.brand-line{border-bottom:3px solid #d99a13;padding-bottom:14px;margin-bottom:18px}.brand-line h1{font-size:22px;margin:0}.brand-line p{margin:5px 0 0;color:#555}.label-name{font-size:30px;font-weight:900;margin:8px 0}.label-phone{font-size:18px;font-weight:800}.label-address{font-size:18px;line-height:1.45;border:2px solid #222;border-radius:10px;padding:14px;margin:16px 0}.item-list{margin:0;padding:0;list-style:none}.item-list li{display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid #ddd;padding:9px 0;font-weight:700}.label-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;font-size:14px}.training-title{text-align:center;margin:18px 0 28px}.training-title h1{font-size:28px;margin:0}.training-title p{color:#666}.training-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.training-field{border:1px solid #ccc;border-radius:8px;padding:12px}.training-field span{display:block;color:#666;font-size:12px;text-transform:uppercase;margin-bottom:5px}.training-field b{font-size:16px}.training-status{margin-top:24px;padding:16px;border:2px solid #1c8c4c;border-radius:10px;background:#f1fff6}.training-footer{margin-top:35px;border-top:1px solid #ddd;padding-top:15px;color:#666;font-size:12px}.invoice-head{display:flex;justify-content:space-between;gap:24px;border-bottom:3px solid #d99a13;padding-bottom:18px;margin-bottom:22px}.invoice-head h1{margin:0;font-size:27px}.invoice-head p{margin:4px 0;color:#555}.invoice-number{text-align:right}.invoice-number b{display:block;font-size:16px}.invoice-parties{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:24px}.party-box{border:1px solid #ccc;border-radius:8px;padding:14px;min-height:120px}.party-box small{display:block;color:#666;font-weight:700;text-transform:uppercase;margin-bottom:8px}.party-box strong{font-size:17px}.invoice-table{width:100%;border-collapse:collapse;margin:15px 0 20px}.invoice-table th,.invoice-table td{padding:10px 8px;border-bottom:1px solid #ddd;text-align:left}.invoice-table th{background:#f5f2eb;font-size:12px;text-transform:uppercase}.invoice-table .num{text-align:right;white-space:nowrap}.invoice-totals{margin-left:auto;width:min(360px,100%)}.invoice-totals>div{display:flex;justify-content:space-between;gap:20px;padding:7px 0}.invoice-totals .grand{border-top:2px solid #111;margin-top:6px;padding-top:12px;font-size:20px}.invoice-note{margin-top:28px;padding-top:14px;border-top:1px solid #ddd;color:#555;font-size:12px}.tax-warning{padding:12px 14px;border:2px solid #c48312;background:#fff8e8;border-radius:8px;margin:0 0 20px;font-size:12px}.tax-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;margin-bottom:18px}.tax-field{border-bottom:1px solid #ccc;padding:8px 0}.tax-field span{display:block;color:#666;font-size:11px;text-transform:uppercase}.tax-field b{display:block;margin-top:3px}.tax-unset{color:#a15c00}@media(max-width:640px){.training-grid,.invoice-parties,.tax-grid{grid-template-columns:1fr}.print-sheet{margin:0;box-shadow:none}.label-name{font-size:25px}.invoice-head{display:block}.invoice-number{text-align:left;margin-top:12px}.print-actions button,.print-actions a{width:100%;text-align:center}}@media print{body{background:#fff}.print-sheet{margin:0 auto;box-shadow:none;padding:0}.no-print{display:none!important}}${isA4 ? "@page{size:A4 portrait;margin:14mm}" : "@page{size:A6 portrait;margin:8mm}"}
    `}</style>

    {isTraining ? <div className="print-actions no-print"><button type="button" onClick={() => window.print()}>Cetak / Simpan PDF</button>{customerChat ? <a href={customerChat} target="_blank" rel="noreferrer">Chat Customer via WhatsApp</a> : null}</div> : <div className="print-actions no-print">
      <button type="button" onClick={() => printOrderDocument("label")}>Cetak Label</button>
      <button type="button" className="secondary" onClick={() => printOrderDocument("invoice")}>Cetak Faktur</button>
      <button type="button" className="tax-action" onClick={() => printOrderDocument("tax")}>Cetak Faktur Pajak</button>
      {customerChat ? <a href={customerChat} target="_blank" rel="noreferrer">Chat Customer via WhatsApp</a> : null}
    </div>}

    {isTraining ? <>
      <div className="brand-line"><h1>ANEXSO | TQ BUSINESS & LEARNING CENTER</h1><p>Dokumen Konfirmasi Pendaftaran Program</p></div>
      <div className="training-title"><h1>KONFIRMASI PENDAFTARAN</h1><p>Dokumen ini dapat disimpan sebagai PDF dan dikirim kembali kepada peserta melalui WhatsApp.</p></div>
      <div className="training-grid">
        <div className="training-field"><span>Nama Peserta</span><b>{payload.name || "-"}</b></div>
        <div className="training-field"><span>Nomor WhatsApp</span><b>{payload.whatsapp || "-"}</b></div>
        <div className="training-field"><span>Email</span><b>{payload.email || "-"}</b></div>
        <div className="training-field"><span>Perusahaan / Instansi</span><b>{payload.company || "-"}</b></div>
        <div className="training-field"><span>Jabatan</span><b>{payload.position || "-"}</b></div>
        <div className="training-field"><span>Program</span><b>{payload.program || "-"}</b></div>
        <div className="training-field"><span>Format</span><b>{payload.format || "-"}</b></div>
        <div className="training-field"><span>Jadwal</span><b>{payload.date || "-"}</b></div>
        <div className="training-field"><span>Jumlah Peserta</span><b>{payload.participants || "1 Orang"}</b></div>
        <div className="training-field"><span>Investasi</span><b>{payload.investment || "-"}</b></div>
        <div className="training-field"><span>Metode Pembayaran</span><b>{payload.payment || "-"}</b></div>
      </div>
      <div className="training-status"><b>Status: PENDAFTARAN DITERIMA</b><p>Konfirmasi akhir peserta dilakukan setelah bukti pembayaran diverifikasi oleh tim TQ Business & Learning Center.</p></div>
      <div className="training-footer">ANEXSO | TQ Business & Learning Center — Minum. Belajar. Bertumbuh.</div>
    </> : orderDocument === "label" ? <>
      <div className="brand-line"><h1>ANEXSO | JOE COFFEE</h1><p>LABEL PENGIRIMAN PESANAN</p></div>
      <div className="label-name">Kepada Yth. {payload.name || "-"}</div>
      <div className="label-phone">HP/WA: {payload.whatsapp || "-"}</div>
      <div className="label-address">{payload.address || "-"}{payload.postalCode ? <><br/><b>Kode Pos: {payload.postalCode}</b></> : null}</div>
      <h3>PRODUK</h3>
      <ul className="item-list">{items.map((item, index) => <li key={`${item.name}-${index}`}><span>{item.name}</span><span>x{item.qty}</span></li>)}</ul>
      <div className="label-meta"><b>No. Pesanan</b><span>{invoiceRef}</span><b>Pengiriman</b><span>{courierText}</span><b>Pembayaran</b><span>{payload.payment || "-"}</span><b>Total</b><span>{rupiah(payload.total)}</span></div>
    </> : orderDocument === "invoice" ? <>
      <div className="invoice-head"><div><h1>ANEXSO | JOE COFFEE</h1><p>FAKTUR PENJUALAN</p></div><div className="invoice-number"><small>No. Faktur</small><b>{invoiceRef}</b><small>Tanggal Cetak: {printDate()}</small></div></div>
      <div className="invoice-parties"><div className="party-box"><small>Dari</small><strong>ANEXSO | JOE COFFEE</strong><p>Dokumen transaksi penjualan ANEXSO.</p></div><div className="party-box"><small>Ditagihkan Kepada</small><strong>{payload.name || "-"}</strong><p>HP/WA: {payload.whatsapp || "-"}<br/>{payload.address || "-"}{payload.postalCode ? `, ${payload.postalCode}` : ""}</p></div></div>
      <table className="invoice-table"><thead><tr><th>Produk</th><th className="num">Qty</th><th className="num">Harga</th><th className="num">Jumlah</th></tr></thead><tbody>{items.map((item, index) => <tr key={`${item.name}-${index}`}><td>{item.name}</td><td className="num">{item.qty}</td><td className="num">{rupiah(item.price || 0)}</td><td className="num">{rupiah((item.price || 0) * item.qty)}</td></tr>)}</tbody></table>
      <div className="invoice-totals"><div><span>Subtotal Produk</span><b>{rupiah(payload.subtotal)}</b></div><div><span>Ongkos Kirim {courierText !== "-" ? `(${courierText})` : ""}</span><b>{rupiah(payload.shipping)}</b></div><div className="grand"><span>Total Pembayaran</span><b>{rupiah(payload.total)}</b></div><div><span>Metode Pembayaran</span><b>{payload.payment || "-"}</b></div></div>
      <div className="invoice-note">Faktur penjualan ini dibuat berdasarkan data pesanan {invoiceRef}. Gunakan menu cetak browser untuk mencetak ke printer atau pilih <b>Save as PDF / Simpan sebagai PDF</b>.</div>
    </> : <>
      <div className="invoice-head"><div><h1>ANEXSO | JOE COFFEE</h1><p>FAKTUR PAJAK — DRAFT / DOKUMEN PENDUKUNG</p></div><div className="invoice-number"><small>Referensi Pesanan</small><b>{invoiceRef}</b><small>Tanggal Cetak: {printDate()}</small></div></div>
      <div className="tax-warning"><b>PENTING:</b> Dokumen ini belum merupakan e-Faktur resmi DJP. Nomor faktur pajak, identitas PKP/NPWP, DPP dan PPN tidak boleh dibuat otomatis tanpa data perpajakan yang sah. Dokumen ini dapat dicetak/disimpan PDF sebagai draft atau dokumen pendukung transaksi.</div>
      <div className="tax-grid"><div className="tax-field"><span>Penjual</span><b>ANEXSO | JOE COFFEE</b></div><div className="tax-field"><span>NPWP / Identitas PKP Penjual</span><b className="tax-unset">Belum dikonfigurasi</b></div><div className="tax-field"><span>Pembeli</span><b>{payload.name || "-"}</b></div><div className="tax-field"><span>NPWP / NIK Pembeli</span><b className="tax-unset">Belum tersedia pada pesanan</b></div><div className="tax-field"><span>Alamat Pembeli</span><b>{payload.address || "-"}</b></div><div className="tax-field"><span>Nomor Faktur Pajak</span><b className="tax-unset">Belum diterbitkan</b></div></div>
      <table className="invoice-table"><thead><tr><th>Barang / Jasa</th><th className="num">Qty</th><th className="num">Nilai</th></tr></thead><tbody>{items.map((item, index) => <tr key={`${item.name}-${index}`}><td>{item.name}</td><td className="num">{item.qty}</td><td className="num">{rupiah((item.price || 0) * item.qty)}</td></tr>)}</tbody></table>
      <div className="invoice-totals"><div><span>Nilai Produk</span><b>{rupiah(payload.subtotal)}</b></div><div><span>Ongkos Kirim</span><b>{rupiah(payload.shipping)}</b></div><div><span>DPP</span><b className="tax-unset">Belum ditetapkan</b></div><div><span>PPN</span><b className="tax-unset">Belum ditetapkan</b></div><div className="grand"><span>Total Transaksi</span><b>{rupiah(payload.total)}</b></div></div>
      <div className="invoice-note">Untuk menjadi faktur pajak resmi, data perpajakan harus diisi dari sumber yang sah dan penerbitannya harus mengikuti mekanisme perpajakan yang berlaku. Tombol ini tidak menggantikan penerbitan e-Faktur resmi.</div>
    </>}
  </main>;
}
