"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { navigation } from "@/lib/site-data";
import { Container } from "@/components/container";

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

type NavItem = (typeof navigation)[number];
const hasChildren = (item: NavItem): item is Extract<NavItem, { children: readonly { label: string; href: string }[] }> =>
  "children" in item;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""}`}>
      <Container className="py-3">
        {/* Main row */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 text-xl font-bold text-brand-800" onClick={() => setMobileOpen(false)}>
            Kubiyogen
          </Link>

          {/* Desktop search bar */}
          {searchOpen && (
            <div className="hidden flex-1 lg:block lg:max-w-md">
              <input
                autoFocus
                type="search"
                placeholder="Egitim, etkinlik veya urun ara..."
                className="w-full rounded-lg border border-line bg-soft px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
            </div>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Search icon */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Ara"
              className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-soft hover:text-ink lg:flex"
            >
              <SearchIcon />
            </button>

            {/* Cart icon */}
            <Link
              href="/sepet"
              aria-label="Sepet"
              className="relative rounded-lg p-2 text-slate-600 transition hover:bg-soft hover:text-ink"
            >
              <CartIcon />
              {/* badge — will be driven by cart store on Day 13 */}
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-700 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            {/* User icon */}
            <Link
              href="/profil"
              aria-label="Hesabim"
              className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-soft hover:text-ink lg:flex"
            >
              <UserIcon />
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Menuyu kapat" : "Menuyu ac"}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-soft lg:hidden"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="mt-3 hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-soft hover:text-brand-800"
              >
                {item.label}
                {hasChildren(item) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </Link>

              {hasChildren(item) && (
                <div className="invisible absolute left-0 top-full z-50 w-52 translate-y-2 rounded-xl border border-line bg-white p-1.5 opacity-0 shadow-card transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-soft hover:text-brand-800"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mt-3 rounded-xl border border-line bg-white p-4 lg:hidden">
            {/* Mobile search */}
            <input
              type="search"
              placeholder="Egitim, etkinlik veya urun ara..."
              className="mb-4 w-full rounded-lg border border-line bg-soft px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />

            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 font-medium text-ink hover:bg-soft"
                  >
                    {item.label}
                  </Link>
                  {hasChildren(item) && (
                    <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l-2 border-line pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-soft hover:text-brand-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
