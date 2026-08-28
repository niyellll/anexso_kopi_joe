import { NextResponse } from "next/server";
import { bookProducts, joeProducts } from "../../../site-data";

const PRODUCT_WEIGHT_GRAMS: Record<string, number> = {
  "Sachet 10gr": 10,
  "Pouch 100gr": 100,
  "Pouch 200gr": 200,
  "Pouch 500gr": 500,
  "Joe Coffee 1kg": 1000,
  PINESTHI: 450,
  MERAPI: 450,
};

const KNOWN_PRODUCTS = new Map(
  [...joeProducts, ...bookProducts].map((product) => [product.name, product]),
);

type IncomingItem = {
  name?: unknown;
  qty?: unknown;
};

type BiteshipPricing = {
  courier_name?: string;
  courier_code?: string;
  courier_service_name?: string;
  courier_service_code?: string;
  duration?: string;
  price?: number;
};

function fallback(message: string, detail?: string) {
  return NextResponse.json({
    success: false,
    fallback: true,
    message,
    detail: detail || "",
    rates: [],
  });
}

function normalizePostalCode(value: unknown) {
  return String(value || "").replace(/\D/g, "").slice(0, 5);
}

function buildItems(items: IncomingItem[]) {
  return items.flatMap((incoming) => {
    const name = String(incoming?.name || "").trim();
    const product = KNOWN_PRODUCTS.get(name);
    if (!product) return [];

    const quantity = Math.max(1, Math.min(100, Number(incoming?.qty) || 1));
    const weight = PRODUCT_WEIGHT_GRAMS[name] || 500;

    return [{
      name: product.name,
      description: product.subtitle,
      value: product.price,
      weight,
      quantity,
    }];
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      destinationPostalCode?: unknown;
      items?: IncomingItem[];
    };

    const destinationPostalCode = normalizePostalCode(body.destinationPostalCode);
    if (destinationPostalCode.length !== 5) {
      return fallback("Kode pos tujuan harus 5 digit.");
    }

    const items = buildItems(Array.isArray(body.items) ? body.items : []);
    if (!items.length) {
      return fallback("Produk yang membutuhkan kurir belum ditemukan.");
    }

    const token = process.env.BITESHIP_API_TOKEN?.trim();
    const originPostalCode = normalizePostalCode(process.env.ANEXSO_ORIGIN_POSTAL_CODE);
    const couriers = process.env.ANEXSO_COURIERS?.trim() || "jne,tiki,wahana";

    if (!token || originPostalCode.length !== 5) {
      return fallback(
        "TUNGGU KONFIRMASI ONGKIR",
        "API ongkir belum diaktifkan. Admin akan mengonfirmasi ongkir dan total akhir melalui WhatsApp.",
      );
    }

    const response = await fetch("https://api.biteship.com/v1/rates/couriers", {
      method: "POST",
      headers: {
        authorization: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        origin_postal_code: Number(originPostalCode),
        destination_postal_code: Number(destinationPostalCode),
        couriers,
        items,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });

    const data = await response.json().catch(() => ({})) as {
      success?: boolean;
      message?: string;
      pricing?: BiteshipPricing[];
    };

    if (!response.ok || data.success === false) {
      return fallback(
        "TUNGGU KONFIRMASI ONGKIR",
        data.message || `Shipping API mengembalikan HTTP ${response.status}.`,
      );
    }

    const rates = (Array.isArray(data.pricing) ? data.pricing : [])
      .map((rate) => ({
        id: `${rate.courier_code || "courier"}:${rate.courier_service_code || rate.courier_service_name || "service"}`,
        courierName: rate.courier_name || rate.courier_code || "Kurir",
        courierCode: rate.courier_code || "",
        serviceName: rate.courier_service_name || rate.courier_service_code || "Layanan",
        serviceCode: rate.courier_service_code || "",
        duration: rate.duration || "",
        price: Math.max(0, Number(rate.price) || 0),
      }))
      .filter((rate) => rate.price > 0)
      .sort((a, b) => a.price - b.price)
      .slice(0, 12);

    if (!rates.length) {
      return fallback(
        "TUNGGU KONFIRMASI ONGKIR",
        "Kurir otomatis tidak tersedia untuk kode pos ini. Admin akan mengecek ongkir secara manual.",
      );
    }

    return NextResponse.json({
      success: true,
      fallback: false,
      rates,
      destinationPostalCode,
    });
  } catch (error) {
    return fallback(
      "TUNGGU KONFIRMASI ONGKIR",
      error instanceof Error ? error.message : "Shipping API tidak dapat dihubungi.",
    );
  }
}
