"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/lib/site-data";
import { Container } from "@/components/container";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasChildren = (
    item: (typeof navigation)[number]
  ): item is Extract<(typeof navigation)[number], { children: readonly { label: string; href: string }[] }> =>
    "children" in item;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-brand-800">
            Kubiyogen
          </Link>

          <div className="hidden min-w-[260px] flex-1 lg:block lg:max-w-md">
            <input
              className="w-full rounded-lg border border-line bg-soft px-4 py-2.5 text-sm outline-none placeholder:text-slate-400"
              placeholder="Egitim, etkinlik veya urun ara"
              type="search"
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink lg:hidden"
          >
            Menu
          </button>
        </div>

        <nav className="mt-4 hidden items-center justify-between gap-4 lg:flex">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
            {navigation.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex rounded-lg px-3 py-2 transition hover:bg-soft hover:text-brand-800"
                >
                  {item.label}
                </Link>

                {hasChildren(item) ? (
                  <div className="invisible absolute left-0 top-full z-50 w-64 translate-y-2 rounded-lg border border-line bg-white p-2 opacity-0 shadow-card transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-soft hover:text-brand-800"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <Link
            href="/sepet"
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
          >
            Sepete Git
          </Link>
        </nav>

        {mobileOpen ? (
          <div className="mt-4 rounded-lg border border-line bg-white p-4 lg:hidden">
            <div className="mb-4">
              <input
                className="w-full rounded-lg border border-line bg-soft px-4 py-2.5 text-sm outline-none placeholder:text-slate-400"
                placeholder="Egitim, etkinlik veya urun ara"
                type="search"
              />
            </div>

            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <div key={item.href} className="rounded-lg border border-line/70 p-2">
                  <Link href={item.href} className="block rounded-md px-2 py-2 font-medium text-ink">
                    {item.label}
                  </Link>
                  {hasChildren(item) ? (
                    <div className="mt-1 flex flex-col gap-1 border-t border-line/70 pt-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-md px-2 py-2 text-sm text-slate-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
