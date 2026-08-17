export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://anexsokopijoe.vercel.app";
export const SITE_NAME = "ANEXSO Kopi JOE";
export const PHONE_WA = "6281395955293";
export function waLink(message: string) { return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(message)}`; }
