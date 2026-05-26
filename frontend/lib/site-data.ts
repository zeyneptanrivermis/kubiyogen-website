export const brand = {
  name: "Kubiyogen",
  tagline: "Kariyer yolculuğunu şekillendir",
  whatsapp: "905000000000"
} as const;

export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  {
    label: "Mağaza",
    href: "/magaza",
    children: [
      { label: "Yüz Yüze Eğitimler", href: "/magaza/yuz-yuze-egitimler" },
      { label: "Dijital Eğitimler", href: "/magaza/dijital-egitimler" },
      { label: "Aksesuarlar", href: "/magaza/aksesuarlar" }
    ]
  },
  {
    label: "Etkinlikler",
    href: "/etkinlikler",
    children: [
      { label: "Yaklaşan Etkinlikler", href: "/etkinlikler/yaklasan" },
      { label: "Son Etkinlikler", href: "/etkinlikler/son" }
    ]
  },
  { label: "Görsel Stüdyo", href: "/gorsel-studyo" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" }
] as const;

export const heroSlides = [
  {
    title: "Kubiyogen ile kariyer yolculuğunu yönlendir",
    description:
      "Kariyer gelişimi, teknik eğitimler ve topluluk deneyimini aynı çatı altında buluşturan sade bir dijital vitrin.",
    badge: "Kubiyogen Nedir?",
    cta: "Programlari Incele"
  },
  {
    title: "Online eğitimlerle esnek öğrenme deneyimi",
    description:
      "Türkçe ve İngilizce dijital eğitimler için açık, net ve kolay gezilen bir katalog yapısı.",
    badge: "Dijital Eğitimler",
    cta: "Dijital Eğitimlere Git"
  },
  {
    title: "Yüz yüze eğitimlerle uygulamalı deneyim",
    description:
      "Kontenjan, eğitmen, tarih ve ücret detaylarını görüp hızlıca sepete ekleyebileceğin etkinlik benzeri eğitim sayfaları.",
    badge: "Yüz Yüze Eğitimler",
    cta: "Yaklaşan Eğitimleri Gör"
  },
  {
    title: "Yaklaşan etkinlikleri öne çıkar",
    description:
      "En yakın etkinlikleri ana sayfada güçlü bir ilk izlenimle sunan kartlar ve yönlendirmeler.",
    badge: "Yaklaşan Etkinlik",
    cta: "Etkinlik Takvimine Git"
  }
] as const;

export const upcomingEvents = [
  {
    title: "Kariyer Haritası Atölyesi",
    date: "12 Mayıs 2026",
    location: "Istanbul",
    instructor: "Kubiyogen Ekibi",
    price: "1.200 TL",
    quota: "18 kişilik kontenjan",
    image: undefined as string | undefined
  },
  {
    title: "Yapay Zeka ile Üretkenlik",
    date: "19 Mayıs 2026",
    location: "Online",
    instructor: "Konuk Egitmen",
    price: "950 TL",
    quota: "25 kişilik kontenjan",
    image: undefined as string | undefined
  },
  {
    title: "CV ve Mülakat Kliniği",
    date: "25 Mayıs 2026",
    location: "Ankara",
    instructor: "Danışman Ekip",
    price: "800 TL",
    quota: "14 kişilik kontenjan",
    image: undefined as string | undefined
  }
] as const;

export const pastEvents = [
  {
    title: "Portfolyo Geliştirme Buluşması",
    date: "15 Nisan 2026",
    summary: "Katılımcılar portfolyo kurgusu, sunum dili ve geri bildirim alma pratikleri üzerine çalıştı.",
    image: undefined as string | undefined
  },
  {
    title: "LinkedIn Profili Güçlendirme Oturumu",
    date: "02 Nisan 2026",
    summary: "LinkedIn profili düzenleme, içerik dili ve ağ kurma stratejileri ele alındı.",
    image: undefined as string | undefined
  },
  {
    title: "Uygulamalı Ekip Çalışması Günü",
    date: "20 Mart 2026",
    summary: "Gerçek senaryolar üzerinden ekip içi iletişim ve görev dağılımı deneyimlendi.",
    image: undefined as string | undefined
  }
] as const;

export const products = [
  {
    title: "Kubiyogen Not Defteri",
    price: "280 TL",
    category: "Aksesuar",
    description: "Günlük notlar ve kariyer planlaması için özel tasarım defter.",
    image: undefined as string | undefined
  },
  {
    title: "Mentorluk Calisma Karti",
    price: "190 TL",
    category: "Aksesuar",
    description: "Mentorluk seanslarını yapılandırmak için pratik çalışma kartları.",
    image: undefined as string | undefined
  },
  {
    title: "Planlama Seti",
    price: "340 TL",
    category: "Aksesuar",
    description: "Haftalık ve aylık hedefleri takip etmek için kapsamlı planlama seti.",
    image: undefined as string | undefined
  }
] as const;

export const digitalTrainings = [
  {
    title: "Biyoteknolojiye Giriş",
    price: "1.200 TL",
    category: "Dijital Eğitim",
    description: "Biyoteknoloji dünyasına kapsamlı bir giriş kursu.",
    image: undefined as string | undefined
  },
  {
    title: "CRISPR ve Gen Düzenleme",
    price: "1.800 TL",
    category: "Dijital Eğitim",
    description: "CRISPR teknolojisi ve gen düzenleme uygulamaları.",
    image: undefined as string | undefined
  },
  {
    title: "Laboratuvar Teknikleri",
    price: "950 TL",
    category: "Dijital Eğitim",
    description: "Temel laboratuvar tekniklerini online öğrenin.",
    image: undefined as string | undefined
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

export const digitalCourses = [
  {
    title: "Bioinformatics Baslangic Paketi",
    language: "TR",
    duration: "6 saat",
    price: "1.490 TL",
    access: "90 gun kodlu erisim",
    summary: "Temel kavramlar, analiz akisi ve uygulamali veri okuma modulleri."
  },
  {
    title: "Scientific Career Toolkit",
    language: "EN",
    duration: "4 saat",
    price: "1.250 TL",
    access: "60 gun kodlu erisim",
    summary: "CV, portfolyo, arastirma sunumu ve mulakat hazirligi modulleri."
  },
  {
    title: "Lab Data Visualization",
    language: "TR/EN",
    duration: "5 saat",
    price: "1.750 TL",
    access: "120 gun kodlu erisim",
    summary: "Grafik okuma, raporlama ve gorsel anlatim icin ornekli egitim."
  }
] as const;

export const visualStudioPlans = [
  {
    title: "Ucretsiz Deneme",
    price: "0 TL",
    details: "3 gorsel cikti, Kubiyogen filigrani ile PNG indirme."
  },
  {
    title: "Pro Gorsel",
    price: "Tekil/Paket fiyat",
    details: "Filigransız çıktı, 3D sahne seçenekleri, yüksek çözünürlük export."
  },
  {
    title: "Ekip Lisansi",
    price: "Yonetici onayi",
    details: "Toplu kullanim hakki, marka sablonlari ve admin raporlama."
  }
] as const;

export const adminSections = [
  {
    title: "Etkinlikler",
    href: "/admin/etkinlikler",
    metric: "CRUD",
    description: "Yayinda/taslak etkinlikleri listeleme, ekleme, duzenleme ve silme."
  },
  {
    title: "Kurslar",
    href: "/admin/kurslar",
    metric: "TR/EN",
    description: "Dijital ve yuz yuze egitimleri fiyat, dil ve erisim suresiyle yonetme."
  },
  {
    title: "Urunler",
    href: "/admin/urunler",
    metric: "Stok",
    description: "Aksesuar stok, fiyat, gorsel ve yayinda/taslak durum kontrolleri."
  },
  {
    title: "Siparisler",
    href: "/admin/siparisler",
    metric: "Odeme",
    description: "PayTR durumu, siparis kalemleri ve iade/iptal sureci takibi."
  },
  {
    title: "Kullanicilar",
    href: "/admin/kullanicilar",
    metric: "Rol",
    description: "Kullanici arama, rol kontrolu, hesap durumu ve siparis gecmisi."
  },
  {
    title: "Kodlar",
    href: "/admin/kodlar",
    metric: "Log",
    description: "Erisim kodu uretme, iptal etme, kullanim limiti ve log inceleme."
  },
  {
    title: "Gorsel Studyo",
    href: "/admin/gorsel-studyo",
    metric: "Pro",
    description: "Ucretsiz hak, Pro durumu, filigran ve export limitlerini izleme."
  }
] as const;
