import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#fafafc] py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl font-extrabold text-slate-800 md:text-4xl tracking-tight">
            Bizimle İletişime Geçin
          </h1>
          <div className="w-12 h-1 bg-[#7c3aed] mx-auto mt-4 rounded-full" />
          <p className="mt-4 max-w-2xl mx-auto text-sm text-slate-500 leading-relaxed font-medium">
            Sorularınız, önerileriniz veya iş birliği talepleriniz için bize ulaşmaktan
            çekinmeyin. Eğitim yolculuğunuzda size destek olmak için buradayız.
          </p>
        </div>

        {/* Form and Info Columns */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr] items-start mb-12">
          
          {/* Left Column: Info & Socials */}
          <div className="space-y-6">
            
            {/* Contact Info Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <h2 className="text-base font-bold text-slate-800 border-l-4 border-[#7c3aed] pl-3 mb-6">İletişim Bilgileri</h2>
              
              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#eef2ff] flex items-center justify-center text-[#4f46e5] shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telefon</span>
                    <span className="text-sm font-semibold text-slate-700 mt-0.5 block">+90 (5XX) XXX XX XX</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#eef2ff] flex items-center justify-center text-[#4f46e5] shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adres</span>
                    <span className="text-sm font-semibold text-slate-700 mt-0.5 block leading-relaxed">
                      Merkez Ofis, Eğitim Mahallesi, No: 42, İstanbul
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#eef2ff] flex items-center justify-center text-[#4f46e5] shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-posta</span>
                    <span className="text-sm font-semibold text-slate-700 mt-0.5 block">destek@kubiyogen.com</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <Link
                href="https://wa.me/900000000000"
                target="_blank"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.99] px-4 py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.2)] transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.19-1.361a9.929 9.929 0 004.82 1.251h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.923-7.062A9.923 9.923 0 0012.012 2zm5.72 13.916c-.244.686-1.42 1.254-1.95 1.293-.483.036-.968.21-3.082-.622-2.543-1-4.14-3.585-4.267-3.756-.127-.17-1.03-1.372-1.03-2.617 0-1.246.65-1.854.88-2.103.228-.25.503-.311.67-.311h.482c.153 0 .356-.01.512.356.162.38.558 1.362.607 1.463.048.1.08.218.016.347-.066.13-.098.217-.194.331-.096.113-.203.253-.29.346-.096.102-.198.213-.086.406.112.193.5.823 1.07 1.332.736.655 1.357.859 1.55.956.193.096.305.08.417-.05.112-.132.483-.564.61-.756.13-.193.259-.162.437-.097.18.065 1.137.536 1.33.633.193.096.321.144.369.227.048.082.048.477-.196 1.163z"/>
                </svg>
                WhatsApp ile Ulaş
              </Link>
            </div>

            {/* Follow Us Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
              <h2 className="text-base font-bold text-slate-800 border-l-4 border-[#7c3aed] pl-3 mb-4">Bizi Takip Edin</h2>
              
              <div className="flex items-center gap-3">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="w-10 h-10 rounded-2xl bg-[#eef2ff] hover:bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.632-2.316m0 0a3 3 0 102.686-1.488 3 3 0 00-2.686 1.488zm0 0L8.684 13.258m0 0a3 3 0 102.686 1.488 3 3 0 00-2.686-1.488zm0 0L14.7 11.5" />
                  </svg>
                </Link>
                
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-10 h-10 rounded-2xl bg-[#eef2ff] hover:bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="w-10 h-10 rounded-2xl bg-[#eef2ff] hover:bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <ContactForm />

        </div>

        {/* Bottom Office Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[16/8] md:aspect-[21/9] lg:aspect-[2.8/1] shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-slate-100/80 group">
          {/* Background Image */}
          <img
            src="/images/iletisim_ofis.png"
            alt="Kubiyogen Ofis"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          
          {/* Top Right Location Badge */}
          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-1.5 rounded-full bg-white px-4.5 py-2 text-xs font-bold text-slate-700 shadow-sm border border-slate-100/50">
              <svg className="w-3.5 h-3.5 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              İstanbul, TR
            </div>
          </div>

          {/* Bottom Left Content Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Ofisimizi Ziyaret Edin
            </h3>
            <p className="text-sm text-white/95 mt-2 max-w-lg leading-relaxed font-medium">
              Sizi modern çalışma alanımızda bir kahve eşliğinde projelerimizi konuşmaya davet ediyoruz.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
