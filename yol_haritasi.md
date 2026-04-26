KUBİYOGEN
Web Sitesi Geliştirme Yol Haritası
Next.js 14  ·  Node.js  ·  PostgreSQL  ·  PayTR
4 Haftalık Detaylı Geliştirme Planı

Teknoloji Yığını

Konu / Alan	Görevler & Detaylar	Dosya / Endpoint
Frontend	• Next.js 14 (App Router)
• TypeScript
• Tailwind CSS v3
• Zustand (state yönetimi)
• Embla Carousel (slider)	app/ dizini
components/
store/
styles/
Backend	• Next.js API Routes (Node.js runtime)
• Prisma ORM
• PostgreSQL
• NextAuth.js v5
• Zod (validasyon)	app/api/
prisma/
lib/
middleware.ts
Ödeme	• PayTR iFrame API
• Webhook doğrulama
• Sunucu taraflı token üretimi	lib/paytr.ts
app/api/payment/
Medya & CDN	• Cloudinary (görsel yönetimi)
• next/image (optimizasyon)
• Tiptap (zengin metin)	lib/cloudinary.ts
components/ui/RichEditor.tsx
Deployment	• Vercel (frontend + API)
• Supabase / Railway (PostgreSQL)
• GitHub Actions (CI/CD)	vercel.json
.github/workflows/ci.yml
Test	• Jest + React Testing Library
• Playwright (E2E)
• Lighthouse (performans)	__tests__/
e2e/
jest.config.ts


Hafta 1 — Temel Altyapı & Kurulum
Süre: Gün 1–7  |  Odak: Proje iskeleti, veritabanı, kimlik doğrulama, SEO altyapısı, temel UI bileşenleri

Konu / Alan	Görevler & Detaylar	Dosya / Endpoint
Proje Kurulumu	• Next.js 14 App Router ile proje iskelet
• TypeScript konfigürasyonu
• ESLint + Prettier kurulumu
• Tailwind CSS v3 entegrasyonu
• Husky + lint-staged (pre-commit hooks)	package.json
tsconfig.json
tailwind.config.ts
.eslintrc.json
next.config.js
Veritabanı Tasarımı	• PostgreSQL şema tasarımı (Users, Courses, Events, Orders, Products)
• Prisma ORM kurulumu ve migration
• Seed data hazırlama
• Veritabanı ilişkileri (Foreign Keys)	prisma/schema.prisma
prisma/seed.ts
prisma/migrations/
lib/db.ts
Kimlik Doğrulama	• NextAuth.js v5 entegrasyonu
• Email/Şifre ile kayıt & giriş
• Google OAuth (isteğe bağlı)
• JWT token yönetimi
• Şifre hash (bcrypt)
• Session yönetimi	app/api/auth/[...nextauth]/route.ts
app/(auth)/login/page.tsx
app/(auth)/register/page.tsx
middleware.ts
lib/auth.ts
Admin Panel Temeli	• Admin dashboard layout
• Route guard (admin-only middleware)
• Admin giriş sayfası
• Yan menü ve navigasyon
• Temel istatistik kartları	app/admin/layout.tsx
app/admin/page.tsx
app/admin/dashboard/page.tsx
components/admin/Sidebar.tsx
Temel UI Bileşenleri	• Tasarım sistemini oluştur (renk paleti, tipografi)
• Button, Input, Modal, Badge bileşenleri
• Navbar bileşeni (logo + menü + arama + sepet)
• Footer bileşeni
• Loading & Error states	components/ui/Button.tsx
components/ui/Modal.tsx
components/layout/Navbar.tsx
components/layout/Footer.tsx
styles/globals.css
SEO Altyapısı	• next/metadata API yapılandırması
• robots.txt ve sitemap.xml oluşturma
• Open Graph meta etiketleri
• JSON-LD structured data şablonları
• Canonical URL yönetimi	app/layout.tsx (root metadata)
app/sitemap.ts
app/robots.ts
lib/seo.ts (helper)

Hafta 1 Teslim Kriterleri
→ Proje GitHub'a push edilmiş, CI pipeline çalışıyor
→ Veritabanı şeması migrate edilmiş, seed data yüklenmiş
→ Kayıt / giriş sayfaları çalışıyor (JWT tabanlı)
→ Admin girişi ve temel dashboard görüntüleniyor
→ Navbar, Footer, temel bileşenler responsive çalışıyor


Hafta 2 — Sayfa Geliştirme & API Endpoint'leri
Süre: Gün 8–14  |  Odak: Tüm kullanıcı sayfaları, içerik listeleme, temel API endpoint'leri

Konu / Alan	Görevler & Detaylar	Dosya / Endpoint
Ana Sayfa	• Hero slider (Kubiyogen tanıtım, online/yüz yüze eğitimler, en yakın etkinlik)
• Otomatik + manuel geçiş (Embla Carousel)
• Yaklaşan Etkinlikler bölümü (max 3)
• Son Yapılan Etkinlikler bölümü (max 3)
• Aksesuarlar bölümü (max 3 ürün)
• Motivasyon/CTA banner
• WhatsApp & Chatbot köşe simgeleri	app/(site)/page.tsx
components/home/HeroSlider.tsx
components/home/UpcomingEvents.tsx
components/home/RecentEvents.tsx
components/home/Accessories.tsx
components/common/FloatingButtons.tsx
Etkinlikler Sayfaları	• Yaklaşan Etkinlikler liste sayfası
• Son Etkinlikler liste sayfası
• Etkinlik detay sayfası (tarih, saat, ücret, eğitmen, içerik)
• Sepete ekleme & adet seçimi
• Etkinlik görselleri galerisi
• Katılımcı yorumları bölümü	app/(site)/etkinlikler/page.tsx
app/(site)/etkinlikler/yaklaşan/page.tsx
app/(site)/etkinlikler/[slug]/page.tsx
components/events/EventCard.tsx
components/events/EventDetail.tsx
Mağaza - Eğitimler	• Mağaza ana sayfası (3 kategori kartı: Yüz Yüze, Dijital, Aksesuarlar)
• Yüz Yüze Eğitimler listesi
• Dijital Eğitimler (TR / EN sekmeli)
• Eğitim detay sayfası (müfredat, eğitmen, fiyat)
• Sepete ekleme butonu
• Filtreleme & arama	app/(site)/magaza/page.tsx
app/(site)/magaza/yuz-yuze/page.tsx
app/(site)/magaza/dijital/page.tsx
app/(site)/magaza/dijital/[slug]/page.tsx
components/store/CourseCard.tsx
Mağaza - Aksesuarlar	• Aksesuar liste sayfası
• Ürün detay sayfası
• Adet seçimi + sepete ekle
• Ürün görseli galerisi
• Stok durumu gösterimi	app/(site)/magaza/aksesuarlar/page.tsx
app/(site)/magaza/aksesuarlar/[slug]/page.tsx
components/store/ProductCard.tsx
components/store/QuantitySelector.tsx
Hakkımızda & İletişim	• Hakkımızda sayfası (minimal başlıklar, sembolsüz)
• İletişim sayfası (tel, adres, sosyal medya linkleri)
• Instagram & LinkedIn yönlendirme linkleri
• İletişim formu (e-posta gönderimi)
• Footer sosyal medya ikonları (WA, LinkedIn, Instagram)	app/(site)/hakkimizda/page.tsx
app/(site)/iletisim/page.tsx
components/contact/ContactForm.tsx
components/layout/Footer.tsx
Backend API - Temel Endpoint'ler	• GET /api/events - tüm etkinlikler
• GET /api/events/upcoming - yaklaşan etkinlikler
• GET /api/events/recent - son etkinlikler
• GET /api/events/[slug] - etkinlik detayı
• GET /api/courses - tüm kurslar
• GET /api/courses/[slug] - kurs detayı
• GET /api/products - tüm ürünler
• GET /api/products/[slug] - ürün detayı	app/api/events/route.ts
app/api/events/upcoming/route.ts
app/api/events/recent/route.ts
app/api/events/[slug]/route.ts
app/api/courses/route.ts
app/api/products/route.ts

Hafta 2 Teslim Kriterleri
→ Ana sayfa slider, etkinlikler ve aksesuarlar bölümleri çalışıyor
→ Etkinlik detay sayfaları dinamik olarak render ediliyor
→ Mağaza sayfaları (yüz yüze, dijital TR/EN, aksesuarlar) tamamlandı
→ Hakkımızda ve İletişim sayfaları yayında
→ Tüm GET endpoint'leri test edildi ve çalışıyor


Hafta 3 — E-Ticaret, Ödeme & Admin Paneli
Süre: Gün 15–21  |  Odak: Sepet, PayTR ödeme, kullanıcı profili, süreli erişim kodları, admin içerik yönetimi

Konu / Alan	Görevler & Detaylar	Dosya / Endpoint
Sepet & Sipariş Sistemi	• Sepet state yönetimi (Zustand)
• Sepet sayfası (ürün listesi, adet, toplam)
• Sipariş oluşturma akışı
• Sipariş özeti sayfası
• POST /api/cart - sepete ekle
• DELETE /api/cart/[id] - sepetten kaldır
• POST /api/orders - sipariş oluştur	app/(site)/sepet/page.tsx
app/(site)/odeme/page.tsx
app/api/cart/route.ts
app/api/orders/route.ts
store/cartStore.ts (Zustand)
components/cart/CartDrawer.tsx
PayTR Ödeme Entegrasyonu	• PayTR iFrame API entegrasyonu
• Ödeme formu sayfası
• PayTR token oluşturma (sunucu taraflı)
• Webhook ile ödeme doğrulama
• Başarılı / başarısız ödeme sayfaları
• Sipariş durumu güncelleme	app/(site)/odeme/paytr/page.tsx
app/api/payment/paytr/token/route.ts
app/api/payment/paytr/webhook/route.ts
app/(site)/odeme/basarili/page.tsx
app/(site)/odeme/basarisiz/page.tsx
lib/paytr.ts
Kullanıcı Profil Sistemi	• Profil sayfası (avatar, isim, e-posta)
• Profil düzenleme
• Sipariş geçmişi
• Satın alınan kurslarım
• Aktif etkinliklerim
• Şifre değiştirme
• Hesap silme	app/(site)/profil/page.tsx
app/(site)/profil/siparisler/page.tsx
app/(site)/profil/kurslarim/page.tsx
app/(site)/profil/etkinliklerim/page.tsx
app/api/users/profile/route.ts
app/api/users/orders/route.ts
Dijital Eğitim & Oyun - Süreli Kod Sistemi	• Erişim kodu üretme (UUID + son kullanma tarihi)
• Kod doğrulama middleware
• Dijital içerik oynatıcı (web tabanlı, indirilemeyen)
• Oyun iframe wrapper (web-only, no download)
• Kod süresi dolunca erişim engeli
• POST /api/access-codes/generate
• POST /api/access-codes/validate	app/(site)/icerik/[code]/page.tsx
app/(site)/oyun/[code]/page.tsx
app/api/access-codes/generate/route.ts
app/api/access-codes/validate/route.ts
middleware.ts (kod doğrulama)
lib/accessCode.ts
Admin - İçerik Yönetimi	• Etkinlik ekleme / düzenleme / silme
• Kurs ekleme / düzenleme / silme
• Ürün ekleme / düzenleme / silme
• Görsel yükleme (Cloudinary veya S3)
• Zengin metin editörü (Tiptap/Quill)
• Yayınla / taslak durumu	app/admin/etkinlikler/page.tsx
app/admin/etkinlikler/yeni/page.tsx
app/admin/kurslar/page.tsx
app/admin/urunler/page.tsx
app/api/admin/events/route.ts
app/api/admin/courses/route.ts
lib/cloudinary.ts
Admin - Sipariş & Kullanıcı Yönetimi	• Tüm siparişleri listeleme & filtreleme
• Sipariş detay ve durum güncelleme
• Kullanıcı listesi ve profil görüntüleme
• Erişim kodu üretme (admin)
• İstatistik dashboard (satış, kullanıcı, ziyaretçi)
• GET /api/admin/orders
• GET /api/admin/users	app/admin/siparisler/page.tsx
app/admin/kullanicilar/page.tsx
app/admin/kodlar/page.tsx
app/api/admin/orders/route.ts
app/api/admin/users/route.ts
app/api/admin/access-codes/route.ts

Hafta 3 Teslim Kriterleri
→ Sepet işlemleri (ekle, çıkar, güncelle) çalışıyor
→ PayTR test ortamında ödeme akışı tamamlanıyor
→ Kullanıcı profil sayfası ve sipariş geçmişi görüntüleniyor
→ Süreli erişim kodu üretimi ve doğrulaması çalışıyor
→ Admin panel üzerinden içerik CRUD işlemleri yapılabiliyor


Hafta 4 — Optimizasyon, Test & Yayın
Süre: Gün 22–28  |  Odak: SEO finalizasyonu, chatbot, testler, CI/CD, production deployment

Konu / Alan	Görevler & Detaylar	Dosya / Endpoint
Gelişmiş SEO & Performans	• Dinamik metadata (her sayfa için OG tag)
• Structured Data (Event, Course, Product JSON-LD)
• Image optimization (next/image)
• Lazy loading & code splitting
• Core Web Vitals optimizasyonu
• Google Search Console entegrasyonu	app/(site)/etkinlikler/[slug]/page.tsx (metadata export)
lib/seo.ts (generateMetadata helper)
components/seo/JsonLd.tsx
next.config.js (image domains)
public/sitemap.xml (dinamik)
Chatbot & İletişim Entegrasyonu	• WhatsApp yönlendirme butonu (sabit köşe)
• Chatbot widget entegrasyonu (Tidio / Crisp)
• İletişim formu e-posta gönderimi (Resend / Nodemailer)
• E-posta şablonları (sipariş onayı, hoş geldiniz)
• POST /api/contact - iletişim formu	components/common/WhatsAppButton.tsx
components/common/ChatbotWidget.tsx
app/api/contact/route.ts
emails/OrderConfirmation.tsx
emails/Welcome.tsx
lib/email.ts
Test & Kalite	• Unit testler (Jest + React Testing Library)
• API endpoint testleri
• E2E testler (Playwright) - checkout akışı
• Lighthouse performans audit
• Erişilebilirlik (a11y) kontrolleri
• Cross-browser & mobil uyumluluk testi	__tests__/api/events.test.ts
__tests__/components/CartDrawer.test.tsx
e2e/checkout.spec.ts
e2e/auth.spec.ts
playwright.config.ts
jest.config.ts
Deployment & CI/CD	• Vercel deployment konfigürasyonu
• Environment variables yönetimi (.env.production)
• GitHub Actions CI pipeline
• PostgreSQL production database (Supabase / Railway)
• Cloudinary production bucket kurulumu
• Domain & SSL yapılandırması	vercel.json
.env.example
.github/workflows/ci.yml
Dockerfile (isteğe bağlı)
DEPLOYMENT.md
İçerik & Görsel Uyumu	• Mevcut site içeriğinin aktarılması
• Eğitim afişlerinin site renk paletine uyarlanması
• Görsel boyut ve format standartlaştırma
• Alt text optimizasyonu (SEO)
• Mobil görsel optimizasyonu	public/images/ (optimized)
scripts/image-optimize.ts
components/ui/OptimizedImage.tsx
Son Kontroller & Teslim	• Tüm sayfa linklerinin kontrolü
• 404 / 500 hata sayfaları
• Robots.txt final kontrolü
• PayTR canlı mod testi
• Admin panel son kullanıcı testi
• Dokümantasyon (README + API docs)	app/not-found.tsx
app/error.tsx
README.md
docs/API.md
docs/ADMIN.md

Hafta 4 Teslim Kriterleri
→ Lighthouse skorları: Performans 90+, SEO 95+, Erişilebilirlik 90+
→ PayTR canlı mod entegrasyonu test edildi
→ Tüm E2E testler geçiyor (checkout, auth, admin)
→ Vercel üzerinde canlı yayın yapıldı
→ Admin kullanıcı rehberi ve API dokümantasyonu teslim edildi


Proje Yapısı — Klasör Ağacı

kubiyogen/ ├── app/ │   ├── (auth)/           # login, register │   ├── (site)/           # tüm kullanıcı sayfaları │   │   ├── page.tsx      # Ana sayfa │   │   ├── etkinlikler/ │   │   ├── magaza/ │   │   ├── hakkimizda/ │   │   ├── iletisim/ │   │   ├── sepet/ │   │   ├── odeme/ │   │   ├── profil/ │   │   ├── icerik/[code]/  # dijital içerik │   │   └── oyun/[code]/   # oyun (web-only) │   ├── admin/            # admin paneli │   └── api/              # tüm API endpoint'leri ├── components/           # yeniden kullanılabilir bileşenler ├── lib/                  # yardımcı fonksiyonlar ├── prisma/               # veritabanı şeması ├── store/                # Zustand state ├── emails/               # e-posta şablonları ├── e2e/                  # Playwright testleri └── __tests__/            # Jest testleri


Önemli Teknik Notlar

Oyun Web Tabanlı Sistem
•	Oyun, Next.js içinde iframe veya React bileşeni olarak çalışır.
•	Kullanıcılar oyunu indirEmez; tüm kaynak kodu sunucu taraflı şifrelenir.
•	Hem link (URL) hem de harici dosya formatında teslim: harici dosya = Next.js standalone build.

Süreli Erişim Kodu Sistemi
•	Her satın alma sonrası UUID tabanlı benzersiz kod üretilir.
•	Kodlar PostgreSQL'de son kullanma tarihi ile saklanır.
•	Middleware, her içerik isteğinde kodu doğrular; süresi dolmuşsa 403 döner.

PayTR Entegrasyonu
•	PayTR iFrame API kullanılır; kullanıcı siteyi terk etmez.
•	Ödeme token'ı sunucu taraflı üretilir (API secret asla client'a gönderilmez).
•	Webhook ile ödeme onayı alınır ve sipariş durumu güncellenir.

Admin Dashboard
•	Admin panel /admin altında ayrı layout ile korunur.
•	Sadece role=ADMIN olan kullanıcılar erişebilir (middleware koruması).
•	Wix'ten bağımsız; site kendi bünyesinde yönetilebilir.

Özet Zaman Çizelgesi

Konu / Alan	Görevler & Detaylar	Dosya / Endpoint
Hafta 1 Gün 1–7	• Proje kurulumu, DB, Auth, Admin temeli, UI bileşenleri, SEO altyapısı	✅ Foundation
Hafta 2 Gün 8–14	• Ana sayfa, tüm site sayfaları, mağaza, etkinlikler, GET API endpoint'leri	✅ Pages & API
Hafta 3 Gün 15–21	• Sepet, PayTR, Kullanıcı profili, Süreli kodlar, Admin CRUD	✅ E-Commerce
Hafta 4 Gün 22–28	• SEO final, testler, CI/CD, deployment, dokümantasyon	✅ Launch

KUBİYOGEN  ·  Kariyer yolculuğunu şekillendir
