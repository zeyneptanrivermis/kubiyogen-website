"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
  itemType: "COURSE" | "EVENT" | "PRODUCT";
  itemId: string;
};

export function AddToCartButton({ itemType, itemId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage("");

    const result = await apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({ itemType, itemId, quantity: 1 })
    });

    setLoading(false);

    if (result.error) {
      if (result.error.toLowerCase().includes("auth") || result.error.toLowerCase().includes("token") || result.error.toLowerCase().includes("yetki")) {
        setMessage("Lütfen sepete eklemek için giriş yapın.");
        router.push("/giris");
      } else {
        setMessage(result.error);
      }
      return;
    }

    setMessage("Ürün sepete eklendi!");
    router.push("/sepet");
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full rounded-lg bg-brand-700 px-4 py-3 font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
      >
        {loading ? "Ekleniyor..." : "Sepete Ekle"}
      </button>
      {message ? (
        <p className="mt-2 text-center text-xs font-semibold text-brand-700 bg-brand-50 p-2 rounded-lg border border-brand-100">
          {message}
        </p>
      ) : null}
    </div>
  );
}
