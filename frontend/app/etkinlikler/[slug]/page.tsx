import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { getEventBySlug, formatDate, formatPrice } from "@/lib/catalog-api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-soft">
      <PageHero
        title={event.title}
        description={`${formatDate(event.date)} - ${event.location}`}
      />
      
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <article className="rounded-lg border border-line bg-white p-8 shadow-card">
              <h2 className="text-2xl font-bold text-ink">Etkinlik Detayları</h2>
              <div className="mt-6 text-base leading-8 text-slate-700 space-y-4">
                {event.description.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="text-lg font-bold text-ink mb-4">Etkinlik Programı ve Çıktılar</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                  <li>Temel teorik biyoloji ve moleküler genetik anlatımı</li>
                  <li>Uygulamalı laboratuvar simülasyonları ve vaka analizleri</li>
                  <li>Soru-cevap oturumları ve interaktif akran tartışmaları</li>
                  <li>Katılım sertifikası ve dijital kaynak kütüphanesi erişimi</li>
                </ul>
              </div>
            </article>

            <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-card">
              <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide">Katılım Bilgileri</p>
              <div className="mt-4 space-y-4 text-sm font-semibold text-ink">
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Tarih:</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Lokasyon:</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-slate-500 font-medium">Kategori:</span>
                  <span className="text-brand-700">{event.isUpcoming ? "Yaklaşan Etkinlik" : "Geçmiş Etkinlik"}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500 font-medium">Bilet Ücreti:</span>
                  <span className="text-lg font-bold text-brand-800">{formatPrice(event.price)}</span>
                </div>
              </div>

              {event.isUpcoming ? (
                <div className="mt-6">
                  <AddToCartButton itemType="EVENT" itemId={event.id} />
                </div>
              ) : (
                <div className="mt-6 text-center rounded-lg bg-soft p-3 text-xs font-semibold text-slate-500 border border-line">
                  Bu etkinlik geçmiş tarihlidir. Yeni dönem kayıtları için takipte kalın.
                </div>
              )}

              <Link
                href="/etkinlikler"
                className="mt-4 block text-center text-xs font-bold text-slate-600 hover:text-brand-700"
              >
                ← Tüm Etkinliklere Dön
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
