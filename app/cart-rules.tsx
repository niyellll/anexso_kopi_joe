"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "./site-data";

const CART_KEY = "anexso-cart-v1";
const CART_EVENT = "anexso-cart-change";
const SACHET_NAME = "Sachet 10gr";
const SACHET_MIN_QTY = 10;
const JOE_SINGLE_QTY_PRODUCTS = new Set([
  "Pouch 100gr",
  "Pouch 200gr",
  "Pouch 500gr",
  "Joe Coffee 1kg",
]);

type CartItem = Product & { qty: number };

function normalizeJoeProduct(product: Product): Product {
  if (product.name === SACHET_NAME) return product;
  if (JOE_SINGLE_QTY_PRODUCTS.has(product.name)) return { ...product, category: "Joe Coffee" };
  return product;
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

function readRawCart(): CartItem[] {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function migrateLegacyCart() {
  const current = readRawCart();
  let changed = false;

  const migrated = current.map((item) => {
    if (item.name === SACHET_NAME) {
      const nextQty = Math.max(SACHET_MIN_QTY, Number(item.qty) || SACHET_MIN_QTY);
      if (nextQty !== item.qty) changed = true;
      return { ...item, qty: nextQty };
    }

    if (JOE_SINGLE_QTY_PRODUCTS.has(item.name)) {
      const wasLegacyForcedTen = !item.category && !item.kind && Number(item.qty) === SACHET_MIN_QTY;
      const nextQty = wasLegacyForcedTen ? 1 : Math.max(1, Number(item.qty) || 1);
      if (item.category !== "Joe Coffee" || nextQty !== item.qty) changed = true;
      return { ...item, category: "Joe Coffee", qty: nextQty };
    }

    return item;
  });

  if (changed) {
    localStorage.setItem(CART_KEY, JSON.stringify(migrated));
    window.dispatchEvent(new Event(CART_EVENT));
  }
}

export function CartRulesMigration() {
  useEffect(() => {
    migrateLegacyCart();
  }, []);
  return null;
}

export function JoeCoffeeBuyButton({ product, label = "Beli Sekarang", className = "small-gold-btn" }: { product: Product; label?: string; className?: string }) {
  const router = useRouter();

  function buy() {
    const normalized = normalizeJoeProduct(product);
    const items = readRawCart().map((item) => {
      if (JOE_SINGLE_QTY_PRODUCTS.has(item.name)) return { ...item, category: "Joe Coffee" };
      return item;
    });
    const index = items.findIndex((item) => item.name === product.name);
    const minimum = product.name === SACHET_NAME ? SACHET_MIN_QTY : 1;

    if (index >= 0) {
      const existing = items[index];
      const legacyForcedTen = product.name !== SACHET_NAME && !existing.kind && Number(existing.qty) === SACHET_MIN_QTY;
      items[index] = {
        ...existing,
        ...normalized,
        qty: legacyForcedTen ? 1 : Math.max(minimum, Number(existing.qty) || minimum),
      };
    } else {
      items.push({ ...normalized, qty: minimum });
    }

    writeCart(items);
    router.push("/keranjang");
  }

  return <button type="button" className={className} onClick={buy}>{label} →</button>;
}

export function BookDirectBuyButton({ product, label = "BELI SEKARANG 🛒", className = "book-buy-button" }: { product: Product; label?: string; className?: string }) {
  const router = useRouter();

  function buy() {
    writeCart([{ ...product, qty: 1 }]);
    router.push("/keranjang");
  }

  return <button type="button" className={className} onClick={buy}>{label} →</button>;
}
