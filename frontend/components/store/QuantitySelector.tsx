"use client";

import { useState } from "react";

type QuantitySelectorProps = {
  max?: number;
  initialValue?: number;
  onChange?: (quantity: number) => void;
};

export function QuantitySelector({ max = 99, initialValue = 1, onChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue);

  function decrement() {
    if (quantity <= 1) return;
    const next = quantity - 1;
    setQuantity(next);
    onChange?.(next);
  }

  function increment() {
    if (quantity >= max) return;
    const next = quantity + 1;
    setQuantity(next);
    onChange?.(next);
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={decrement}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink disabled:opacity-40"
        disabled={quantity <= 1}
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold text-ink">{quantity}</span>
      <button
        onClick={increment}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink disabled:opacity-40"
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}
