"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/site-data";
import { Container } from "@/components/container";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="bg-[linear-gradient(180deg,#fcfbff_0%,#f3edff_100%)] py-12 sm:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-line bg-white p-8 shadow-card sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                {activeSlide.badge}
              </span>
              <span className="text-sm text-slate-400">
                {String(activeIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {activeSlide.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              {activeSlide.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/magaza"
                className="rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white"
              >
                {activeSlide.cta}
              </Link>
              <Link
                href="/etkinlikler/yaklasan"
                className="rounded-lg border border-line bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                Yaklasan Etkinlikler
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition ${
                    index === activeIndex ? "w-10 bg-brand-700" : "w-2.5 bg-brand-200"
                  }`}
                  aria-label={`${index + 1}. slide`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-lg border p-6 text-left shadow-card transition ${
                  index === activeIndex
                    ? "border-brand-300 bg-brand-50"
                    : "border-line bg-white hover:border-brand-200"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {slide.badge}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-ink">{slide.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{slide.description}</p>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
