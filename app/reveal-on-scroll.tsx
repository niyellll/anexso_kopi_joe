"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".gpro-reveal"));
    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * 1.08) element.classList.add("is-visible");
    }
    document.documentElement.classList.add("gpro-reveal-ready");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("gpro-reveal-ready");
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    elements.filter((element) => !element.classList.contains("is-visible")).forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); document.documentElement.classList.remove("gpro-reveal-ready"); };
  }, []);
  return null;
}
