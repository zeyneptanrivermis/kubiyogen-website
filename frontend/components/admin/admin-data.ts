export const adminStats = [
  { label: "Toplam satis", value: "148.250 TL", change: "+18%" },
  { label: "Siparis", value: "126", change: "+12%" },
  { label: "Kullanici", value: "892", change: "+9%" },
  { label: "Aktif icerik", value: "34", change: "+6%" }
];

export const adminEvents = [
  { title: "Kariyer Atolyesi", date: "2026-05-08", status: "Yayinda", price: "1.250 TL" },
  { title: "CV ve Mulakat Kampi", date: "2026-05-16", status: "Taslak", price: "950 TL" },
  { title: "Liderlik Bulusmasi", date: "2026-06-02", status: "Yayinda", price: "1.750 TL" }
];

export const adminCourses = [
  { title: "Dijital Kariyer Seti", language: "TR", status: "Yayinda", price: "2.400 TL" },
  { title: "Interview Practice", language: "EN", status: "Taslak", price: "120 USD" },
  { title: "Yuz Yuze Mentor Programi", language: "TR", status: "Yayinda", price: "4.800 TL" }
];

export const adminProducts = [
  { title: "Planlama Defteri", stock: 42, status: "Yayinda", price: "420 TL" },
  { title: "Motivasyon Kartlari", stock: 18, status: "Yayinda", price: "280 TL" },
  { title: "Kubiyogen Canta", stock: 0, status: "Taslak", price: "650 TL" }
];

export const adminOrders = [
  {
    id: "kby-1008",
    code: "KBY-1008",
    user: "Ayse Demir",
    amount: "2.820 TL",
    status: "PAID",
    date: "2026-04-29",
    payment: "PayTR",
    items: "Dijital Kariyer Seti, Planlama Defteri"
  },
  {
    id: "kby-1007",
    code: "KBY-1007",
    user: "Mert Kaya",
    amount: "950 TL",
    status: "PENDING",
    date: "2026-04-28",
    payment: "PayTR beklemede",
    items: "CV ve Mulakat Kampi"
  },
  {
    id: "kby-1006",
    code: "KBY-1006",
    user: "Elif Sahin",
    amount: "420 TL",
    status: "CANCELLED",
    date: "2026-04-27",
    payment: "Iptal",
    items: "Planlama Defteri"
  }
];

export const adminUsers = [
  { name: "Ayse Demir", email: "ayse@example.com", role: "USER", orders: 4 },
  { name: "Sumeyye", email: "sumeyye@example.com", role: "ADMIN", orders: 0 },
  { name: "Mert Kaya", email: "mert@example.com", role: "USER", orders: 2 }
];
