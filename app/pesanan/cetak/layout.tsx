"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type Payload = { type?: string; name?: string; whatsapp?: string; program?: string; [key: string]: unknown };

function decodeHash(hash: string): Payload | null {
  try {
    const encoded = hash.replace(/^#/, ""); if (!encoded) return null;
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - encoded.length % 4) % 4);
    const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch { return null; }
}

function normalizeWa(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, ""); if (!digits) return ""; if (digits.startsWith("62")) return digits; if (digits.startsWith("0")) return `62${digits.slice(1)}`; return digits;
}

export default function PrintLayout({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState("");
  const [fallback, setFallback] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const payload = decodeHash(window.location.hash);
    if (!hash || payload?.type !== "training") return;
    const pdfUrl = `${window.location.origin}/api/training-confirmation/pdf?data=${encodeURIComponent(hash)}`;
    const key = `anexso-training-print-auto-v15:${hash.slice(-36)}`;
    if (sessionStorage.getItem(key) === "sent") { setNotice("PDF konfirmasi sudah dikirim otomatis ke WhatsApp peserta pada sesi ini."); return; }

    let cancelled = false;
    setNotice("Mengirim PDF konfirmasi otomatis ke WhatsApp peserta...");
    fetch("/api/whatsapp/training-confirmation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), cache: "no-store" })
      .then(async (response) => ({ response, json: await response.json().catch(() => null) }))
      .then(({ response, json }) => {
        if (cancelled) return;
        if (response.ok && json?.ok) { sessionStorage.setItem(key, "sent"); setNotice("✓ PDF konfirmasi sudah terkirim otomatis ke WhatsApp peserta."); return; }
        const phone = normalizeWa(payload.whatsapp);
        const text = `Halo ${String(payload.name || "")}, pendaftaran program ${String(payload.program || "TQ Business")} sudah kami terima. Berikut dokumen konfirmasi Anda.\n\nDokumen PDF: ${pdfUrl}`;
        setFallback(phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : pdfUrl);
        setNotice(String(json?.error || "Pengiriman attachment otomatis belum aktif. Link PDF sudah disiapkan sebagai fallback."));
      })
      .catch(() => { if (!cancelled) { setFallback(pdfUrl); setNotice("Pengiriman attachment otomatis belum aktif. PDF tetap sudah dibuat."); } });
    return () => { cancelled = true; };
  }, []);

  return <>{notice ? <div className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 16px", background: "#fff4d6", borderBottom: "1px solid #e1bb58", fontFamily: "Arial,sans-serif", fontSize: 13 }}><b>{notice}</b>{fallback ? <a href={fallback} target="_blank" rel="noreferrer" style={{ marginLeft: 12, textDecoration: "underline" }}>Kirim/Buka PDF</a> : null}</div> : null}{children}</>;
}
