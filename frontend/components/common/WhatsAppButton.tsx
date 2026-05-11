import Link from "next/link";
import { brand } from "@/lib/site-data";

type WhatsAppButtonProps = {
  phone?: string;
};

export function WhatsAppButton({ phone = brand.whatsapp }: WhatsAppButtonProps) {
  const message = encodeURIComponent("Merhaba, Kubiyogen eğitimleri hakkında bilgi almak istiyorum.");

  return (
    <Link
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      className="rounded-full bg-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-800"
    >
      WhatsApp
    </Link>
  );
}
