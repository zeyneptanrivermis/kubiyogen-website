"use client";

import { useCartStore } from "@/store/cartStore";
import { QuantitySelector } from "@/components/store/QuantitySelector";
import Link from "next/link";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, remove, update, total } = useCartStore();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-lg font-semibold text-ink">Sepetim</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-ink">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">Sepetiniz boş.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col gap-2 border-b border-line pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.category}</p>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-xs text-slate-400 hover:text-red-500"
                    >
                      Kaldır
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantitySelector
                      initialValue={item.quantity}
                      onChange={(q) => update(item.id, q)}
                    />
                    <span className="text-sm font-semibold text-ink">
                      {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 py-4">
            <div className="flex items-center justify-between text-sm font-semibold text-ink">
              <span>Toplam</span>
              <span>
                {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(total())}
              </span>
            </div>
            <Link
              href="/sepet"
              onClick={onClose}
              className="mt-4 block w-full rounded-lg bg-brand-700 px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Sepete Git
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
