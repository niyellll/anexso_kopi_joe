"use client";

import { useState } from "react";

const links = [
  { href: "#joe-coffee", label: "Joe Coffee" },
  { href: "#tq-business", label: "TQ Business" },
  { href: "#buku-ebook", label: "Buku & E-Book" },
  { href: "#kuliner", label: "Kuliner" },
];

export default function MobileNav({ showTestimonials = false }: { showTestimonials?: boolean }) {
  const [open, setOpen] = useState(false);
  const visibleLinks = showTestimonials ? [...links, { href: "#testimoni", label: "Testimoni" }] : links;

  return (
    <div className="relative xl:hidden">
      <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)]" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Tutup menu" : "Buka menu"} onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">{open ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}</svg>
      </button>
      {open && <nav id="mobile-navigation" className="absolute right-0 top-12 z-[70] w-64 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-2 shadow-[var(--shadow)] backdrop-blur">{visibleLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold hover:bg-black/5 dark:hover:bg-white/10">{link.label}</a>)}</nav>}
    </div>
  );
}
