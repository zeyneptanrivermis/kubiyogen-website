"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest, API_BASE_URL } from "@/lib/api-client";
import { RequireAuth } from "@/components/require-auth";

type CatalogItem = {
  id: string;
  title?: string;
  name?: string;
  price: number;
};

type CatalogList = {
  items: CatalogItem[];
};

type CartLine = {
  id?: string;
  itemType: "COURSE" | "EVENT" | "PRODUCT";
  itemId: string;
  title: string;
  quantity: number;
  price: number;
};

type BackendCartItem = {
  id: string;
  itemType: "COURSE" | "EVENT" | "PRODUCT";
  itemId: string;
  quantity: number;
  catalogItem: {
    id: string;
    title?: string;
    name?: string;
    price: number;
  };
};

type OrderResponse = {
  id: string;
};

export function CartCheckout() {
  const [catalog, setCatalog] = useState<CartLine[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [message, setMessage] = useState("");

  const fetchCart = async () => {
    const result = await apiRequest<{ items: BackendCartItem[] }>("/cart");
    if (result.data) {
      setCart(
        result.data.items.map((item) => ({
          id: item.id,
          itemType: item.itemType,
          itemId: item.itemId,
          title: item.catalogItem.title ?? item.catalogItem.name ?? "Bilinmeyen Ürün",
          quantity: item.quantity,
          price: item.catalogItem.price
        }))
      );
    }
  };

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/courses`).then((res) => res.json() as Promise<CatalogList>),
      fetch(`${API_BASE_URL}/events`).then((res) => res.json() as Promise<CatalogList>),
      fetch(`${API_BASE_URL}/products`).then((res) => res.json() as Promise<CatalogList>)
    ])
      .then(([courses, events, products]) => {
        setCatalog([
          ...(courses.items ?? []).map((item) => ({ itemType: "COURSE" as const, itemId: item.id, title: item.title ?? "", quantity: 1, price: item.price })),
          ...(events.items ?? []).map((item) => ({ itemType: "EVENT" as const, itemId: item.id, title: item.title ?? "", quantity: 1, price: item.price })),
          ...(products.items ?? []).map((item) => ({ itemType: "PRODUCT" as const, itemId: item.id, title: item.name ?? "", quantity: 1, price: item.price }))
        ]);
        fetchCart();
      })
      .catch(() => setMessage("Katalog alınamadı. Backend çalışıyor mu kontrol edin."));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = async (catalogItem: CartLine) => {
    setMessage("");
    const result = await apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({
        itemType: catalogItem.itemType,
        itemId: catalogItem.itemId,
        quantity: 1
      })
    });
    if (result.error) {
      setMessage(result.error);
      return;
    }
    fetchCart();
  };

  const updateQuantity = async (id: string, quantity: number) => {
    setMessage("");
    const result = await apiRequest(`/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity })
    });
    if (result.error) {
      setMessage(result.error);
      return;
    }
    fetchCart();
  };

  const removeItem = async (id: string) => {
    setMessage("");
    const result = await apiRequest(`/cart/${id}`, {
      method: "DELETE"
    });
    if (result.error) {
      setMessage(result.error);
      return;
    }
    fetchCart();
  };

  const createOrder = async () => {
    const result = await apiRequest<OrderResponse>("/orders", {
      method: "POST",
      body: JSON.stringify({
        items: cart.map((item) => ({ itemType: item.itemType, itemId: item.itemId, quantity: item.quantity }))
      })
    });
    if (result.error || !result.data) {
      setMessage(result.error ?? "Sipariş oluşturulamadı.");
      return;
    }
    setMessage(`Sipariş oluştu: ${result.data.id}. PayTR bilgileri girilince ödeme iframe'i açılacak.`);
    fetchCart(); // refresh empty cart
  };

  return (
    <RequireAuth title="Sepet için giriş gerekli">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="rounded-lg border border-line bg-white p-6 shadow-card">
        <p className="text-sm font-semibold text-brand-700">Hızlı Ekle</p>
        <h2 className="mt-2 text-xl font-semibold text-ink">Ürün ve eğitimler</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
          {catalog.map((item) => (
            <button
              key={`${item.itemType}-${item.itemId}`}
              onClick={() => addToCart(item)}
              className="rounded-lg border border-line px-4 py-3 text-left text-sm transition hover:border-brand-200 hover:bg-soft"
            >
              <span className="block font-semibold text-ink">{item.title}</span>
              <span className="mt-1 block text-slate-500">{item.price} TL</span>
            </button>
          ))}
        </div>
      </section>
      <aside className="rounded-lg border border-line bg-white p-6 shadow-card">
        <p className="text-sm font-semibold text-brand-700">Sipariş Özeti</p>
        <h2 className="mt-2 text-xl font-semibold text-ink">Sepet</h2>
        <div className="mt-5 grid gap-3 text-sm">
          {cart.length === 0 ? <p className="text-slate-600">Sepete ürün ekleyin.</p> : null}
          {cart.map((item, index) => (
            <div key={`${item.itemId}-${index}`} className="grid gap-3 rounded-lg bg-soft p-4 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-slate-500">{item.price} TL</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                  className="h-9 w-9 rounded-lg border border-line bg-white font-semibold text-ink"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-ink">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                  className="h-9 w-9 rounded-lg border border-line bg-white font-semibold text-ink"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id!)}
                  className="rounded-lg border border-line bg-white px-3 py-2 font-semibold text-ink"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-lg font-bold text-ink">Toplam: {total} TL</p>
        <button disabled={cart.length === 0} onClick={createOrder} className="mt-5 w-full rounded-lg bg-brand-700 px-4 py-3 font-semibold text-white disabled:opacity-60">
          Sipariş Oluştur
        </button>
        <Link href="/odeme" className="mt-3 inline-flex text-sm font-semibold text-brand-800">Ödeme sayfasına git</Link>
        {message ? <p className="mt-4 rounded-lg bg-soft p-3 text-sm text-slate-700">{message}</p> : null}
      </aside>
      </div>
    </RequireAuth>
  );
}
