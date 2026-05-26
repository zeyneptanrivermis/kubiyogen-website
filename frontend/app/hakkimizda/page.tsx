import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.05),transparent_35%)] py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 space-y-24">

        {/* 1. Hero Section */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center rounded-full bg-purple-100/80 px-3.5 py-1.5 text-[10px] font-bold text-purple-700 uppercase tracking-widest">
              Kurumsal
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-[1.15]">
              Bilim, Deneyim ve Güven <br />
              <span className="text-[#7c3aed]">Tek Çatıda</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
              Kubiyogen, biyoteknoloji dünyasının kapılarını hem akademik hem de pratik düzeyde aralayan,
              geleceğin bilim insanlarını yetiştiren öncü bir eğitim ve araştırma platformudur.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                href="#vizyon"
                className="rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[0.98] text-white px-6 py-3.5 text-xs font-bold transition-all duration-200 shadow-[0_4px_12px_rgba(124,58,237,0.18)]"
              >
                Vizyonumuzu Keşfedin
              </Link>
              <Link
                href="/iletisim"
                className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-600 px-6 py-3.5 text-xs font-bold transition-all duration-200 shadow-sm"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>

          {/* Right Image/Mockup Column */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-800 group">
              <img
                src="/images/hakkimizda_hero.png"
                alt="Kubiyogen Araştırma"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-103"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              
              {/* Graduated Students Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-4.5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Topluluk</span>
                  <span className="text-xs font-extrabold text-slate-800">1000+ Mezun Öğrenci</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Kuruluş Amacımız Section */}
        <div className="text-center py-6 border-y border-slate-100">
          <h2 className="text-2xl font-extrabold text-[#7c3aed] tracking-tight">Kuruluş Amacımız</h2>
          <p className="mt-4 max-w-3xl mx-auto text-sm text-slate-500 leading-relaxed font-medium">
            2019 yılında, biyoteknoloji eğitiminde teori ile pratiği birleştirmek amacıyla yola çıktık. 
            Amacımız, sadece ders kitaplarında kalan bilgileri değil, laboratuvar masasında hayat bulan 
            deneyimi tüm Türkiye&apos;ye yaymaktır.
          </p>
        </div>

        {/* 3. Vizyonumuz & Değerlerimiz Section */}
        <div id="vizyon" className="grid gap-12 lg:grid-cols-12 items-start scroll-mt-24">
          {/* Left Card: Vizyonumuz */}
          <div className="lg:col-span-5 rounded-3xl border border-[#7c3aed]/10 bg-white p-8 shadow-[0_8px_30px_rgb(124,58,237,0.03)] relative overflow-hidden flex flex-col justify-between aspect-square lg:aspect-[1/1.05]">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">Vizyonumuz</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Türkiye&apos;nin biyoteknoloji alanındaki dışa bağımlılığını azaltacak, inovatif düşünebilen 
                ve evrensel bilim etiğine sahip nesiller yetiştirmek; bilimi sadece üniversite duvarları 
                arasında değil, toplumun her kesiminde erişilebilir kılmayı sağlamak.
              </p>
            </div>
            {/* Target Progress Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Bölgesel Liderlik Hedefi</span>
                <span className="text-[#7c3aed]">%75</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-gradient-to-r from-purple-500 to-[#7c3aed] rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Column: Key Values List */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Value 1 */}
            <div className="flex gap-5 p-5.5 rounded-3xl border border-transparent hover:border-[#7c3aed]/10 hover:bg-white hover:shadow-[0_8px_30px_rgb(124,58,237,0.03)] transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Pratik Eğitim</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
                  Hands-on deneyim odaklı kurslarımızla teorik bilgiyi beceriye dönüştürüyoruz.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex gap-5 p-5.5 rounded-3xl border border-transparent hover:border-[#7c3aed]/10 hover:bg-white hover:shadow-[0_8px_30px_rgb(124,58,237,0.03)] transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Erişilebilirlik</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
                  Coğrafi sınırları online platformumuz ve konaklama çözümlerimizle aşıyoruz.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex gap-5 p-5.5 rounded-3xl border border-transparent hover:border-[#7c3aed]/10 hover:bg-white hover:shadow-[0_8px_30px_rgb(124,58,237,0.03)] transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Akademik Etik</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
                  Bilimsel doğruluğu ve akademik dürüstlüğü tüm süreçlerimizin merkezine koyuyoruz.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Öne Çıkan Özelliklerimiz Section */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Öne Çıkan Özelliklerimiz</h2>
            <p className="mt-2 text-slate-500 text-sm">Kubiyogen farkını yaratan değerler sistemi.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Wide Card (spans 2 columns on lg screens) */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] md:col-span-2 flex flex-col md:flex-row gap-6 items-center justify-between overflow-hidden">
              <div className="space-y-4 max-w-sm">
                <div className="w-10 h-10 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-800">Yeni Nesil Laboratuvar Yaklaşımı</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Modern laboratuvar ortamlarında, son teknoloji cihazlarla birebir uygulama imkanı sunuyoruz.
                  Bilimi dokunarak öğrenin.
                </p>
              </div>
              <div className="w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                <img
                  src="/images/hakkimizda_microscope.png"
                  alt="Microscope"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>

            {/* Card 2: 7/24 Support (Solid Purple Card) */}
            <div className="rounded-3xl bg-[#7c3aed] p-8 text-white shadow-[0_8px_30px_rgba(124,58,237,0.15)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="mt-8 space-y-3">
                <h3 className="text-base font-bold">7/24 Kesintisiz Destek</h3>
                <p className="text-white/85 text-xs leading-relaxed font-medium">
                  Online eğitimlerimizde yalnız değilsiniz. Teknik ve akademik sorularınız için her an yanınızdayız.
                </p>
              </div>
            </div>

            {/* Card 3: Strategic Alliances */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="mt-8 space-y-2">
                <h3 className="text-base font-bold text-slate-800">Stratejik İş Birlikleri</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Üniversiteler ile yürüttüğümüz ortak projelerle akademik etik kurallar çerçevesinde somut çıktılar sağlıyoruz.
                </p>
              </div>
            </div>

            {/* Card 4: Accommodation */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="mt-8 space-y-2">
                <h3 className="text-base font-bold text-slate-800">Konaklama Kolaylığı</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Şehir dışından gelen katılımcılarımız için anlaşmalı kurumlarımızla güvenli konaklama çözümleri sunuyoruz.
                </p>
              </div>
            </div>

            {/* Card 5: Safe Payment */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="mt-8 space-y-2">
                <h3 className="text-base font-bold text-slate-800">Güvenli Ödeme</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  PayTR altyapısı ile tüm işlemleriniz 256-bit SSL koruması altında ve taksit seçenekleriyle güvende.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bilimin Estetik Yüzü Card Section (wide banner) */}
        <div className="rounded-[2.5rem] bg-gradient-to-r from-purple-900 to-[#7c3aed] p-8 md:p-12 text-white shadow-[0_12px_40px_rgba(124,58,237,0.12)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Bilimin Estetik Yüzü</h2>
            <p className="text-white/85 text-sm leading-relaxed font-medium">
              Görsel Stüdyomuzda bilimi estetikle buluşturuyoruz. Bilimsel verileri sanata dönüştüren 
              özgün tasarım ürünlerimizle laboratuvar stilinizi yaratın.
            </p>
            <div className="pt-2">
              <Link
                href="/gorsel-studyo"
                className="inline-flex rounded-xl bg-white hover:bg-slate-100 active:scale-[0.98] text-[#7c3aed] px-6 py-3 text-xs font-bold transition-all duration-200 shadow-sm"
              >
                Stüdyoyu İncele
              </Link>
            </div>
          </div>
          {/* Design Icons Side-by-side */}
          <div className="flex gap-4 shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-white/10 backdrop-blur flex items-center justify-center text-white/95">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-white/10 backdrop-blur flex items-center justify-center text-white/95">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
          </div>
        </div>

        {/* 6. Bottom Vision Section */}
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)`,
            backgroundSize: "24px 24px"
          }}
          className="rounded-[2.5rem] bg-[#1a2332] p-8 md:p-14 text-white text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative overflow-hidden"
        >
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight max-w-xl mx-auto leading-tight">
            Türkiye&apos;nin Biyoteknoloji <br />
            Vizyonuna Yön Veriyoruz
          </h2>
          <p className="mt-4 text-slate-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Kubiyogen olarak, bilimsel farkındalığı artırmak ve geleceği inşa edecek bilim 
            insanlarına rehberlik etmek için çalışmaya devam ediyoruz. Bize katılın, bilimin 
            geleceğini birlikte yazalım.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-700/50 max-w-lg mx-auto">
            <div>
              <span className="block text-2xl md:text-4xl font-black text-white">50+</span>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
                Aktif Eğitim Programı
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-4xl font-black text-white">15+</span>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
                Anlaşmalı Üniversite
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-4xl font-black text-white">81</span>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
                Farklı İlden Katılımcı
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
