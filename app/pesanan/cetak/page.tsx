"use client";

import { useEffect, useMemo, useState } from "react";

type OrderItem = { name: string; qty: number; price?: number };
type PrintPayload = {
  type?: "order" | "training";
  name?: string;
  whatsapp?: string;
  address?: string;
  payment?: string;
  subtotal?: number;
  shipping?: number;
  total?: number;
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

export default function PrintOrderPage() {
  const [payload, setPayload] = useState<PrintPayload | null>(null);
  const [ready, setReady] = useState(false);

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
      : `Halo ${payload?.name || ""}, pesanan Anda di ANEXSO|Joe Coffee sedang kami proses`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [isTraining, payload]);

  if (!ready) return <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>Menyiapkan dokumen...</main>;
  if (!payload) return <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}><h1>Data cetak tidak tersedia</h1><p>Buka halaman ini melalui link cetak yang dikirim bersama notifikasi WhatsApp pesanan.</p></main>;

  return <main className={isTraining ? "print-sheet training-sheet" : "print-sheet order-label"}>
    <style>{`
      *{box-sizing:border-box} body{margin:0;background:#eee;color:#111;font-family:Arial,Helvetica,sans-serif}.print-sheet{background:#fff;margin:24px auto;padding:28px;box-shadow:0 4px 24px rgba(0,0,0,.12)}.order-label{max-width:520px}.training-sheet{max-width:850px}.print-actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}.print-actions button,.print-actions a{border:0;background:#111;color:#fff;padding:11px 16px;border-radius:8px;text-decoration:none;font-weight:700;cursor:pointer}.brand-line{border-bottom:3px solid #d99a13;padding-bottom:14px;margin-bottom:18px}.brand-line h1{font-size:22px;margin:0}.brand-line p{margin:5px 0 0;color:#555}.label-name{font-size:30px;font-weight:900;margin:8px 0}.label-phone{font-size:18px;font-weight:800}.label-address{font-size:18px;line-height:1.45;border:2px solid #222;border-radius:10px;padding:14px;margin:16px 0}.item-list{margin:0;padding:0;list-style:none}.item-list li{display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid #ddd;padding:9px 0;font-weight:700}.label-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;font-size:14px}.training-title{text-align:center;margin:18px 0 28px}.training-title h1{font-size:28px;margin:0}.training-title p{color:#666}.training-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.training-field{border:1px solid #ccc;border-radius:8px;padding:12px}.training-field span{display:block;color:#666;font-size:12px;text-transform:uppercase;margin-bottom:5px}.training-field b{font-size:16px}.training-status{margin-top:24px;padding:16px;border:2px solid #1c8c4c;border-radius:10px;background:#f1fff6}.training-footer{margin-top:35px;border-top:1px solid #ddd;padding-top:15px;color:#666;font-size:12px}@media(max-width:640px){.training-grid{grid-template-columns:1fr}.print-sheet{margin:0;box-shadow:none}.label-name{font-size:25px}}@media print{body{background:#fff}.print-sheet{margin:0 auto;box-shadow:none;padding:0}.no-print{display:none!important}}${isTraining ? "@page{size:A4 portrait;margin:14mm}" : "@page{size:A6 portrait;margin:8mm}"}
    `}</style>
    <div className="print-actions no-print"><button type="button" onClick={() => window.print()}>{isTraining ? "Cetak / Simpan PDF" : "Cetak Label"}</button>{customerChat ? <a href={customerChat} target="_blank" rel="noreferrer">Chat Customer via WhatsApp</a> : null}</div>

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
    </> : <>
      <div className="brand-line"><h1>ANEXSO | JOE COFFEE</h1><p>LABEL PENGIRIMAN PESANAN</p></div>
      <div className="label-name">Kepada Yth. {payload.name || "-"}</div>
      <div className="label-phone">HP/WA: {payload.whatsapp || "-"}</div>
      <div className="label-address">{payload.address || "-"}</div>
      <h3>PRODUK</h3>
      <ul className="item-list">{(payload.items || []).map((item, index) => <li key={`${item.name}-${index}`}><span>{item.name}</span><span>x{item.qty}</span></li>)}</ul>
      <div className="label-meta"><b>Pembayaran</b><span>{payload.payment || "-"}</span><b>Total</b><span>{rupiah(payload.total)}</span></div>
    </>}
  </main>;
}
