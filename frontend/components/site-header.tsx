"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site-data";
import { AuthActions } from "@/components/auth-actions";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const hasChildren = (
    item: (typeof navigation)[number]
  ): item is Extract<(typeof navigation)[number], { children: readonly { label: string; href: string }[] }> =>
    "children" in item;

  return (
    <header
      style={{
        background: "rgba(250, 245, 255, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(124, 58, 237, 0.12)",
        boxShadow: "0 8px 24px rgba(109, 40, 217, 0.06)"
      }}
      className="sticky top-0 z-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 w-full py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with elegant, bold yet slender brand typography */}
          <Link
            href="/"
            className="text-base font-bold tracking-[0.28em] uppercase text-brand-800 shrink-0 hover:opacity-80 transition-all duration-200"
          >
            Kubiyogen
          </Link>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-[180px] xl:max-w-xs shrink-0 relative group">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#7c3aed] transition-colors duration-200">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="w-full rounded-full border border-line bg-white/40 pl-8 pr-3 py-1.5 text-xs outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white/90 focus:border-[#7c3aed]/40 focus:ring-4 focus:ring-[#7c3aed]/5 shadow-sm"
              placeholder="Ara..."
              type="search"
            />
          </div>

          {/* Menu (Navigation) */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`inline-flex rounded-lg px-2.5 py-1.5 transition-all duration-200 border-b-2 whitespace-nowrap ${
                      isActive
                        ? "text-[#7c3aed] font-bold border-[#7c3aed]"
                        : "text-slate-600 hover:text-[#7c3aed] border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {hasChildren(item) ? (
                    <div
                      style={{
                        background: "rgba(250, 245, 255, 0.92)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        border: "1px solid rgba(124, 58, 237, 0.12)",
                        boxShadow: "0 8px 24px rgba(109, 40, 217, 0.08)"
                      }}
                      className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-xl p-1.5 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-1.5 group-hover:opacity-100"
                    >
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                              isChildActive
                                ? "bg-[#7c3aed]/10 text-[#7c3aed]"
                                : "text-slate-600 hover:bg-[#7c3aed]/5 hover:text-[#7c3aed]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* Giriş & Kayıt Ol buttons */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <AuthActions />
          </div>

          {/* Mobile trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-purple-50"
              aria-expanded={mobileOpen}
            >
              Menü
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="mt-3 rounded-lg border border-line bg-white p-4 lg:hidden">
            <div className="mb-4">
              <input
                className="w-full rounded-lg border border-line bg-soft px-4 py-2.5 text-sm outline-none placeholder:text-slate-400"
                placeholder="Eğitim, etkinlik veya ürün ara"
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
              <div className="grid grid-cols-2 gap-2 pt-2">
                <AuthActions mobile />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
