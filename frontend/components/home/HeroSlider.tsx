"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/site-data";
import { Container } from "@/components/container";

function PrevIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-[linear-gradient(180deg,#fcfbff_0%,#f0e9ff_100%)] py-12 sm:py-16">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card" ref={emblaRef}>
          <div className="flex">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.title}
                className="relative min-w-0 flex-[0_0_100%] px-8 py-14 sm:px-12 sm:py-20"
              >
                {/* Slide counter */}
                <span className="text-xs font-semibold text-slate-400">
                  {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
                </span>

                {/* Badge */}
                <span className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {slide.badge}
                </span>

                {/* Title */}
                <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/magaza"
                    className="rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/etkinlikler/yaklasan"
                    className="rounded-lg border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:bg-soft"
                  >
                    Yaklasan Etkinlikler
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="mt-5 flex items-center justify-between px-1">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`${index + 1}. slide`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-brand-700" : "w-2.5 bg-brand-200 hover:bg-brand-400"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Onceki slide"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-slate-600 transition hover:bg-soft hover:text-brand-700"
            >
              <PrevIcon />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Sonraki slide"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-slate-600 transition hover:bg-soft hover:text-brand-700"
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
