"use client";

import { useMemo, useState } from "react";
import { ProductCard, SectionTitle } from "./site-ui";
import { culinaryProducts } from "./site-data";

const CATEGORIES = [
  { label: "Semua Menu", icon: "▦" },
  { label: "Makanan Utama", icon: "♨" },
  { label: "Camilan", icon: "▣" },
  { label: "Minuman", icon: "☕" },
  { label: "Paket", icon: "▢" },
  { label: "Frozen / Siap Saji", icon: "❄" },
] as const;

export function CulinaryMenuFilter() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]["label"]>("Semua Menu");
  const filteredProducts = useMemo(
    () => activeCategory === "Semua Menu"
      ? culinaryProducts
      : culinaryProducts.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  function selectCategory(category: (typeof CATEGORIES)[number]["label"]) {
    setActiveCategory(category);
    const slug = category === "Semua Menu"
      ? "semua-menu"
      : category.toLowerCase().replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-");
    window.history.replaceState(null, "", `#${slug}`);
  }

  return <>
    <div className="category-tabs" role="tablist" aria-label="Kategori kuliner">
      {CATEGORIES.map((category) => {
        const active = activeCategory === category.label;
        return <button
          type="button"
          role="tab"
          aria-selected={active}
          className={active ? "active" : ""}
          style={active ? { background: "#111", color: "#fff", borderColor: "#111" } : undefined}
          onClick={() => selectCategory(category.label)}
          key={category.label}
        >{category.icon} {category.label}</button>;
      })}
    </div>
    <SectionTitle title="MENU FAVORIT" center={false}/>
    {filteredProducts.length > 0
      ? <div className="product-grid three">{filteredProducts.map((product) => <ProductCard key={product.name} product={product} button="Pesan Sekarang"/>)}</div>
      : <div className="form-card" role="status" style={{ marginBottom: 24 }}>
          <h3 style={{ marginTop: 0 }}>Menu kategori {activeCategory} belum tersedia.</h3>
          <p style={{ marginBottom: 0 }}>Silakan pilih kategori lain. Menu baru akan otomatis muncul di sini saat ditambahkan.</p>
        </div>}
  </>;
}
