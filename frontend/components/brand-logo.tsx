import Link from "next/link";
import { brand } from "@/lib/site-data";

type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white shadow-sm">
        <span className="absolute h-7 w-1.5 rotate-[-28deg] rounded-full bg-brand-700" />
        <span className="absolute h-7 w-1.5 rotate-[28deg] rounded-full bg-fuchsia-500" />
        <span className="absolute left-2 right-2 top-3 h-1 rounded-full bg-brand-200" />
        <span className="absolute left-2 right-2 bottom-3 h-1 rounded-full bg-fuchsia-200" />
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-black tracking-wide text-brand-900">KUBİYOGEN</span>
        {!compact ? <span className="hidden text-[11px] font-semibold text-slate-500 sm:block">{brand.tagline}</span> : null}
      </span>
    </Link>
  );
}
