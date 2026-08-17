import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ANEXSO Kopi JOE",
    short_name: "ANEXSO",
    description: "Coffee • Training • Learning",
    start_url: "/",
    display: "standalone",
    background_color: "#090806",
    theme_color: "#c98513",
    icons: [{ src: "/joe-coffee-logo-brand.webp", sizes: "512x512", type: "image/webp" }],
  };
}
