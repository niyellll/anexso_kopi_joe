export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://anexsokopijoe.vercel.app";
export const SITE_NAME = "ANEXSO Kopi JOE";
export const PHONE_WA = "6281395955293";
export const QRIS_IMAGE = "/qris-joe-coffee.jpeg";
export function waLink(message: string) { return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(message)}`; }

export const CONTACT_WA = waLink(
  "Halo ANEXSO | Joe Coffee, saya ingin bertanya tentang produk atau program yang tersedia.",
);
