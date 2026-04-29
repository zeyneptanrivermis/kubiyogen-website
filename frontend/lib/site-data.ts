export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  {
    label: "Magaza",
    href: "/magaza",
    children: [
      { label: "Yuz Yuze Egitimler", href: "/magaza/yuz-yuze-egitimler" },
      { label: "Dijital Egitimler", href: "/magaza/dijital-egitimler" },
      { label: "Aksesuarlar", href: "/magaza/aksesuarlar" }
    ]
  },
  {
    label: "Etkinlikler",
    href: "/etkinlikler",
    children: [
      { label: "Yaklasan Etkinlikler", href: "/etkinlikler/yaklasan" },
      { label: "Son Etkinlikler", href: "/etkinlikler/son" }
    ]
  },
  { label: "Hakkimizda", href: "/hakkimizda" },
  { label: "Iletisim", href: "/iletisim" },
  { label: "Sepet", href: "/sepet" }
] as const;

export const heroSlides = [
  {
    title: "Kubiyogen ile kariyer yolculugunu yonlendir",
    description:
      "Kariyer gelisimi, teknik egitimler ve topluluk deneyimini ayni cati altinda bulusturan sade bir dijital vitrin.",
    badge: "Kubiyogen Nedir?",
    cta: "Programlari Incele"
  },
  {
    title: "Online egitimlerle esnek ogrenme deneyimi",
    description:
      "Turkce ve Ingilizce dijital egitimler icin acik, net ve kolay gezilen bir katalog yapisi.",
    badge: "Dijital Egitimler",
    cta: "Dijital Egitimlere Git"
  },
  {
    title: "Yuz yuze egitimlerle uygulamali deneyim",
    description:
      "Kontenjan, egitmen, tarih ve ucret detaylarini gorup hizlica sepete ekleyebilecegin etkinlik benzeri egitim sayfalari.",
    badge: "Yuz Yuze Egitimler",
    cta: "Yaklasan Egitimleri Gor"
  },
  {
    title: "Yaklasan etkinlikleri one cikar",
    description:
      "En yakin etkinlikleri ana sayfada guclu bir ilk izlenimle sunan kartlar ve yonlendirmeler.",
    badge: "Yaklasan Etkinlik",
    cta: "Etkinlik Takvimine Git"
  }
] as const;

export const upcomingEvents = [
  {
    title: "Kariyer Haritasi Atolyesi",
    date: "12 Mayis 2026",
    location: "Istanbul",
    instructor: "Kubiyogen Ekibi",
    price: "1.200 TL",
    quota: "18 kisilik kontenjan"
  },
  {
    title: "Yapay Zeka ile Uretkenlik",
    date: "19 Mayis 2026",
    location: "Online",
    instructor: "Konuk Egitmen",
    price: "950 TL",
    quota: "25 kisilik kontenjan"
  },
  {
    title: "CV ve Mulakat Klinigi",
    date: "25 Mayis 2026",
    location: "Ankara",
    instructor: "Danisman Ekip",
    price: "800 TL",
    quota: "14 kisilik kontenjan"
  }
] as const;

export const pastEvents = [
  {
    title: "Portfolyo Gelistirme Bulusmasi",
    date: "15 Nisan 2026",
    summary: "Katilimcilar portfolyo kurgusu, sunum dili ve geri bildirim alma pratikleri uzerine calisti."
  },
  {
    title: "LinkedIn Profili Guclendirme Oturumu",
    date: "02 Nisan 2026",
    summary: "LinkedIn profili duzenleme, icerik dili ve ag kurma stratejileri ele alindi."
  },
  {
    title: "Uygulamali Ekip Calismasi Gunu",
    date: "20 Mart 2026",
    summary: "Gercek senaryolar uzerinden ekip ici iletisim ve gorev dagilimi deneyimlendi."
  }
] as const;

export const products = [
  {
    title: "Kubiyogen Not Defteri",
    price: "280 TL",
    category: "Aksesuar"
  },
  {
    title: "Mentorluk Calisma Karti",
    price: "190 TL",
    category: "Aksesuar"
  },
  {
    title: "Planlama Seti",
    price: "340 TL",
    category: "Aksesuar"
  }
] as const;

export const shopCategories = [
  {
    title: "Yuz Yuze Uygulamali Egitimler",
    description: "Etkinlik benzeri satin alma akisi, kontenjan ve egitmen bilgileriyle."
  },
  {
    title: "Dijital Egitimler",
    description: "Turkce ve Ingilizce ayrimli katalog yapisi ile listelenecek."
  },
  {
    title: "Aksesuarlar",
    description: "Urun bilgisi, fiyat, adet secimi ve sepet akisi ile desteklenecek."
  }
] as const;

export const contactLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "WhatsApp", href: "https://wa.me/900000000000" }
] as const;
