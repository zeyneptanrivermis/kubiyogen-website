import {
  digitalTrainings as fallbackDigitalTrainings,
  pastEvents as fallbackPastEvents,
  products as fallbackProducts,
  upcomingEvents as fallbackUpcomingEvents
} from "@/lib/site-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type ApiListResponse<T> = {
  data: T[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type ApiMedia = {
  url: string;
};

type ApiInstructor = {
  name: string;
  title?: string | null;
};

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images?: ApiMedia[];
};

type ApiCourse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  language: string;
  instructor?: ApiInstructor | null;
  images?: ApiMedia[];
};

type ApiEvent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  price: number;
  instructor?: ApiInstructor | null;
  images?: ApiMedia[];
};

export type StoreCardItem = {
  title: string;
  price: string;
  category: string;
  description: string;
  image?: string;
};

export type EventCardItem = {
  title: string;
  date: string;
  location?: string;
  instructor?: string;
  price?: string;
  quota?: string;
  image?: string;
  summary?: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: price % 1 === 0 ? 0 : 2
  }).format(price);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function firstImage(images?: ApiMedia[], fallback?: string) {
  return images?.[0]?.url ?? fallback;
}

function mapProduct(product: ApiProduct, fallbackImage?: string): StoreCardItem {
  return {
    title: product.name,
    price: formatPrice(product.price),
    category: product.stock > 0 ? "Stokta" : "Stokta Yok",
    description: product.description,
    image: firstImage(product.images, fallbackImage)
  };
}

function mapCourse(course: ApiCourse, fallbackImage?: string): StoreCardItem {
  return {
    title: course.title,
    price: formatPrice(course.price),
    category: course.category || "Dijital Eğitim",
    description: course.description,
    image: firstImage(course.images, fallbackImage)
  };
}

function mapEvent(event: ApiEvent, fallbackImage?: string): EventCardItem {
  return {
    title: event.title,
    date: formatDate(event.date),
    location: event.location,
    instructor: event.instructor?.name ?? "Kubiyogen Biyoteknoloji",
    price: formatPrice(event.price),
    quota: "Kontenjanlı program",
    image: firstImage(event.images, fallbackImage),
    summary: event.description
  };
}

export async function getProducts(): Promise<StoreCardItem[]> {
  const response = await apiGet<ApiListResponse<ApiProduct>>("/products?limit=24");
  if (!response?.data?.length) return [...fallbackProducts];

  return response.data.map((product, index) => mapProduct(product, fallbackProducts[index % fallbackProducts.length]?.image));
}

export async function getDigitalTrainings(): Promise<StoreCardItem[]> {
  const response = await apiGet<ApiListResponse<ApiCourse>>("/courses?limit=24");
  if (!response?.data?.length) return [...fallbackDigitalTrainings];

  return response.data.map((course, index) => mapCourse(course, fallbackDigitalTrainings[index % fallbackDigitalTrainings.length]?.image));
}

export async function getUpcomingEvents(): Promise<EventCardItem[]> {
  const response = await apiGet<ApiEvent[]>("/events/upcoming");
  if (!response?.length) return [...fallbackUpcomingEvents];

  return response.map((event, index) => mapEvent(event, fallbackUpcomingEvents[index % fallbackUpcomingEvents.length]?.image));
}

export async function getRecentEvents(): Promise<EventCardItem[]> {
  const response = await apiGet<ApiEvent[]>("/events/recent");
  if (!response?.length) return [...fallbackPastEvents];

  return response.map((event, index) => mapEvent(event, fallbackPastEvents[index % fallbackPastEvents.length]?.image));
}

export async function getHomeContent() {
  const [products, digitalTrainings, upcomingEvents, recentEvents] = await Promise.all([
    getProducts(),
    getDigitalTrainings(),
    getUpcomingEvents(),
    getRecentEvents()
  ]);

  return {
    products,
    digitalTrainings,
    upcomingEvents,
    recentEvents
  };
}
