"use client";

import { Alert, Button, Checkbox, DatePicker, ImageUpload, Input, RichEditor, Select, Textarea } from "@/components/ui";

type ContentFormProps = {
  type: "event" | "course" | "product";
};

const typeLabels = {
  event: "Etkinlik",
  course: "Kurs",
  product: "Urun"
};

export function ContentForm({ type }: ContentFormProps) {
  const isEvent = type === "event";
  const isCourse = type === "course";
  const label = typeLabels[type];

  return (
    <form className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5">
        <Alert title="Form durumu" tone="info">
          Alanlar frontend validasyonuna hazir. API endpointleri baglandiginda kaydetme aksiyonu aktive edilecek.
        </Alert>
        <Input label={`${label} basligi`} placeholder={`${label} adini yazin`} required />
        <Textarea label="Kisa aciklama" placeholder="Liste kartinda gorunecek ozet metin" />
        <RichEditor label="Detay icerigi" />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Fiyat" placeholder="1250 TL" />
          {isEvent ? <DatePicker label="Tarih" /> : null}
          {isCourse ? (
            <Select
              label="Dil"
              options={[
                { label: "Turkce", value: "tr" },
                { label: "Ingilizce", value: "en" }
              ]}
            />
          ) : null}
          {type === "product" ? <Input label="Stok" type="number" min={0} placeholder="24" /> : null}
        </div>
      </div>
      <aside className="space-y-5">
        <ImageUpload label={`${label} gorseli`} />
        <Select
          label="Durum"
          options={[
            { label: "Yayinda", value: "published" },
            { label: "Taslak", value: "draft" }
          ]}
        />
        <Checkbox label="One cikar" description="Ana sayfa veya admin dashboard icin one cikan olarak isaretler." />
        <div className="flex gap-2">
          <Button className="flex-1">Kaydet</Button>
          <Button className="flex-1" variant="secondary">
            Taslak
          </Button>
        </div>
      </aside>
    </form>
  );
}
