import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TrainingPayload = {
  type?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  company?: string;
  position?: string;
  program?: string;
  date?: string;
  format?: string;
  payment?: string;
  participants?: string;
  investment?: string;
};

type RateBucket = { count: number; resetAt: number };
type RateGlobal = typeof globalThis & { __anexsoWaRateV15?: Map<string, RateBucket> };
const rateGlobal = globalThis as RateGlobal;
const rateMap = rateGlobal.__anexsoWaRateV15 ?? new Map<string, RateBucket>();
rateGlobal.__anexsoWaRateV15 = rateMap;

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeWa(value: unknown) {
  const digits = clean(value).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

function encodePayload(payload: TrainingPayload) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function filename(name: unknown) {
  const safe = clean(name).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "Peserta";
  return `Konfirmasi-Pendaftaran-${safe}.pdf`;
}

function clientIp(request: NextRequest) {
  return clean(request.headers.get("x-forwarded-for")?.split(",")[0]) || clean(request.headers.get("x-real-ip")) || "unknown";
}

function allowedByRate(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = rateMap.get(key);
  if (!current || current.resetAt <= now) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= max) return false;
  current.count += 1;
  rateMap.set(key, current);
  return true;
}

function config() {
  return {
    accessToken: clean(process.env.WHATSAPP_ACCESS_TOKEN),
    phoneNumberId: clean(process.env.WHATSAPP_PHONE_NUMBER_ID),
    graphVersion: clean(process.env.WHATSAPP_GRAPH_VERSION) || "v23.0",
    templateName: clean(process.env.WHATSAPP_CONFIRMATION_TEMPLATE_NAME),
    templateLanguage: clean(process.env.WHATSAPP_TEMPLATE_LANGUAGE) || "id",
  };
}

function fixedCaption(payload: TrainingPayload) {
  return `Halo ${clean(payload.name)}, pendaftaran program ${clean(payload.program)} sudah kami terima. Berikut dokumen konfirmasi Anda.`;
}

export async function GET() {
  const cfg = config();
  return NextResponse.json({
    ok: true,
    configured: Boolean(cfg.accessToken && cfg.phoneNumberId),
    mode: cfg.templateName ? "template-document" : "document",
  });
}

export async function POST(request: NextRequest) {
  let payload: TrainingPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Payload tidak valid." }, { status: 400 });
  }

  const name = clean(payload.name);
  const program = clean(payload.program);
  const to = normalizeWa(payload.whatsapp);
  if (payload.type !== "training" || name.length < 2 || program.length < 2 || !/^62\d{8,14}$/.test(to)) {
    return NextResponse.json({ ok: false, error: "Nama, program, atau nomor WhatsApp peserta tidak valid." }, { status: 400 });
  }

  const ip = clientIp(request);
  if (!allowedByRate(`ip:${ip}`, 5, 10 * 60_000) || !allowedByRate(`phone:${to}`, 2, 30 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Pengiriman terlalu sering. Coba kembali beberapa saat lagi." }, { status: 429 });
  }

  const origin = clean(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "") || request.nextUrl.origin;
  const normalizedPayload: TrainingPayload = {
    type: "training",
    name,
    email: clean(payload.email),
    whatsapp: clean(payload.whatsapp),
    company: clean(payload.company),
    position: clean(payload.position),
    program,
    date: clean(payload.date),
    format: clean(payload.format),
    payment: clean(payload.payment),
    participants: clean(payload.participants),
    investment: clean(payload.investment),
  };
  const pdfUrl = `${origin}/api/training-confirmation/pdf?data=${encodeURIComponent(encodePayload(normalizedPayload))}`;
  const cfg = config();

  if (!cfg.accessToken || !cfg.phoneNumberId) {
    return NextResponse.json({
      ok: false,
      code: "WHATSAPP_NOT_CONFIGURED",
      error: "WhatsApp Business Cloud API belum dikonfigurasi di environment Vercel.",
      pdfUrl,
    }, { status: 503 });
  }

  const endpoint = `https://graph.facebook.com/${cfg.graphVersion}/${cfg.phoneNumberId}/messages`;
  const document = { link: pdfUrl, filename: filename(name) };
  const body = cfg.templateName
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: cfg.templateName,
          language: { code: cfg.templateLanguage },
          components: [
            { type: "header", parameters: [{ type: "document", document }] },
            { type: "body", parameters: [
              { type: "text", text: name },
              { type: "text", text: program },
              { type: "text", text: clean(payload.date) || "-" },
            ] },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "document",
        document: { ...document, caption: fixedCaption(normalizedPayload) },
      };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const json: any = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("[ANEXSO_WA_TRAINING_V15] Meta API failed", response.status, json?.error?.message || json);
      return NextResponse.json({
        ok: false,
        code: "WHATSAPP_SEND_FAILED",
        error: clean(json?.error?.message) || "WhatsApp menolak pengiriman dokumen.",
        pdfUrl,
      }, { status: 502 });
    }
    return NextResponse.json({ ok: true, sent: true, messageId: json?.messages?.[0]?.id || null, pdfUrl });
  } catch (error: any) {
    console.error("[ANEXSO_WA_TRAINING_V15] request failed", clean(error?.message || error));
    return NextResponse.json({ ok: false, error: "Gagal menghubungi WhatsApp Business API.", pdfUrl }, { status: 502 });
  }
}
