"use client";

import { useEffect, useState } from "react";

type State = "idle" | "sending" | "sent" | "fallback";

function textOf(selector: string) {
  return document.querySelector(selector)?.textContent?.trim() || "";
}

function inputFromLabel(form: HTMLFormElement, prefix: string) {
  const label = Array.from(form.querySelectorAll("label")).find((item) => item.textContent?.trim().startsWith(prefix));
  return (label?.querySelector("input,textarea,select") as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value?.trim() || "";
}

function summaryValue(form: HTMLFormElement, label: string) {
  const row = Array.from(form.querySelectorAll(".summary-card > div")).find((item) => item.querySelector("span")?.textContent?.trim() === label);
  return row?.querySelector("b")?.textContent?.trim() || "";
}

export function TrainingConfirmationAutomation() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const form = document.querySelector("form.registration-form") as HTMLFormElement | null;
    if (!form) return;

    const submit = async () => {
      const payload = {
        type: "training",
        name: inputFromLabel(form, "Nama Lengkap"),
        email: inputFromLabel(form, "Email"),
        whatsapp: inputFromLabel(form, "Nomor WhatsApp"),
        company: inputFromLabel(form, "Nama Perusahaan"),
        position: inputFromLabel(form, "Jabatan"),
        program: textOf(".selected-program h2"),
        format: textOf(".format-card .choice.active b"),
        date: summaryValue(form, "Tanggal"),
        payment: textOf(".payment-card .payment.active b"),
        investment: summaryValue(form, "Investasi per peserta"),
      };
      if (!payload.name || !payload.whatsapp || !payload.program) return;

      const fingerprint = [payload.whatsapp, payload.program, payload.date, payload.format, payload.payment].join("|");
      if (sessionStorage.getItem("anexso-training-confirmation-v15") === fingerprint) return;

      setState("sending");
      setMessage("Mengirim PDF konfirmasi otomatis ke WhatsApp peserta...");
      try {
        const response = await fetch("/api/whatsapp/training-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store",
        });
        const json = await response.json().catch(() => null);
        setPdfUrl(String(json?.pdfUrl || ""));
        if (!response.ok || !json?.ok) {
          setState("fallback");
          setMessage(String(json?.error || "Pengiriman WhatsApp otomatis belum tersedia. PDF tetap sudah dibuat."));
          return;
        }
        sessionStorage.setItem("anexso-training-confirmation-v15", fingerprint);
        setState("sent");
        setMessage("PDF konfirmasi sudah terkirim otomatis ke WhatsApp peserta.");
      } catch {
        setState("fallback");
        setMessage("Pengiriman WhatsApp otomatis belum tersedia. PDF tetap dapat dibuka dari dokumen konfirmasi.");
      }
    };

    form.addEventListener("submit", submit);
    return () => form.removeEventListener("submit", submit);
  }, []);

  if (state === "idle") return null;
  return <div className="container" style={{ marginBottom: 28 }} aria-live="polite">
    <div className="form-card" style={{ borderColor: state === "sent" ? "#8bc79b" : undefined }}>
      <b>{state === "sending" ? "Mengirim dokumen..." : state === "sent" ? "✓ Dokumen terkirim" : "Dokumen PDF sudah disiapkan"}</b>
      <p style={{ margin: "6px 0 0" }}>{message}</p>
      {pdfUrl ? <a className="gold-btn" style={{ marginTop: 10 }} href={pdfUrl} target="_blank" rel="noreferrer">Buka PDF Konfirmasi</a> : null}
    </div>
  </div>;
}
