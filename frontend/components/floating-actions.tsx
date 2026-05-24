import Link from "next/link";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <Link
        href="https://wa.me/900000000000"
        target="_blank"
        className="rounded-full bg-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-card"
      >
        WhatsApp
      </Link>
      <Link
        href="/iletisim"
        className="rounded-full border border-line bg-white px-4 py-3 text-sm font-semibold text-ink shadow-card"
      >
        Chatbot
      </Link>
    </div>
  );
}
