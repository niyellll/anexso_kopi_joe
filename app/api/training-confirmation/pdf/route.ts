import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TrainingPayload = { type?: string; name?: string; email?: string; whatsapp?: string; company?: string; position?: string; program?: string; date?: string; format?: string; payment?: string; participants?: string; investment?: string };

const clean = (value: unknown) => String(value ?? "").trim();

function decodePayload(data: string): TrainingPayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch { return null; }
}

function pdfText(value: unknown) {
  return (clean(value) || "-").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "?").replace(/([\\()])/g, "\\$1");
}

function wrap(value: unknown, max = 72) {
  const words = (clean(value) || "-").split(/\s+/); const lines: string[] = []; let line = "";
  for (const word of words) { const next = line ? `${line} ${word}` : word; if (next.length <= max) line = next; else { if (line) lines.push(line); line = word; } }
  if (line) lines.push(line); return lines.length ? lines : ["-"];
}

function buildPdf(payload: TrainingPayload) {
  const ops: string[] = [];
  const add = (text: string, y: number, size = 11, bold = false) => ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf 50 ${y} Td (${pdfText(text)}) Tj ET`);
  const field = (label: string, value: unknown, y: number) => { add(label.toUpperCase(), y, 8, true); const lines = wrap(value); lines.forEach((line, i) => add(line, y - 14 - i * 14)); return y - 21 - lines.length * 14; };
  add("ANEXSO | TQ BUSINESS & LEARNING CENTER", 800, 15, true); add("DOKUMEN KONFIRMASI PENDAFTARAN PROGRAM", 776, 12, true); add("Status: PENDAFTARAN DITERIMA", 750, 11, true);
  let y = 718; y = field("Nama Peserta", payload.name, y); y = field("Nomor WhatsApp", payload.whatsapp, y); y = field("Email", payload.email, y); y = field("Perusahaan / Instansi", payload.company || "-", y); y = field("Jabatan / Posisi", payload.position || "-", y); y = field("Program", payload.program, y); y = field("Format", payload.format, y); y = field("Jumlah Peserta", payload.participants || "1 Orang", y); y = field("Jadwal", payload.date, y); y = field("Investasi", payload.investment, y); y = field("Metode Pembayaran", payload.payment, y);
  wrap("Konfirmasi akhir peserta dilakukan setelah bukti pembayaran diverifikasi oleh tim TQ Business & Learning Center.", 88).forEach((line, i) => add(line, Math.max(82, y - 4) - i * 12, 9)); add("ANEXSO | TQ Business & Learning Center - Minum. Belajar. Bertumbuh.", 48, 8);
  const stream = ops.join("\n");
  const objects = ["1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n", "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n", "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n", "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n", "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n", `6 0 obj\n<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream\nendobj\n`];
  let pdf = "%PDF-1.4\n"; const offsets = [0]; for (const object of objects) { offsets.push(Buffer.byteLength(pdf, "latin1")); pdf += object; } const xref = Buffer.byteLength(pdf, "latin1"); pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`; for (let i = 1; i <= objects.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`; pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Uint8Array(Buffer.from(pdf, "latin1"));
}

function safeName(value: unknown) { return (clean(value) || "Peserta").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "Peserta"; }

export async function GET(request: NextRequest) {
  const payload = decodePayload(request.nextUrl.searchParams.get("data") || "");
  if (!payload || payload.type !== "training" || !clean(payload.name) || !clean(payload.program)) return NextResponse.json({ ok: false, error: "Data dokumen konfirmasi tidak valid." }, { status: 400 });
  return new NextResponse(buildPdf(payload), { status: 200, headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="Konfirmasi-Pendaftaran-${safeName(payload.name)}.pdf"`, "Cache-Control": "private, no-store, max-age=0", "X-Content-Type-Options": "nosniff" } });
}
