"use client";

import { useEffect, useRef, useState } from "react";

type DropdownItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
};

export function Dropdown({ trigger, items, align = "left" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>

      {open && (
        <div
          role="menu"
          className={`absolute top-full z-50 mt-1 min-w-[160px] rounded-xl border border-line bg-white p-1 shadow-card ${align === "right" ? "right-0" : "left-0"}`}
        >
          {items.map((item) => (
            <button
              key={item.label}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => { item.onClick(); setOpen(false); }}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
