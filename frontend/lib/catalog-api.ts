const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  language: string;
};

export type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  price: number;
  isUpcoming: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
};

type ListResponse<T> = {
  items: T[];
};

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(price);

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));

export async function getEvents() {
  const data = await getJson<ListResponse<EventItem>>("/events?limit=100", { items: [] });
  return data.items;
}

export async function getUpcomingEvents() {
  return getJson<EventItem[]>("/events/upcoming", []);
}

export async function getRecentEvents() {
  return getJson<EventItem[]>("/events/recent", []);
}

export async function getCourses() {
  const data = await getJson<ListResponse<Course>>("/courses?limit=100", { items: [] });
  return data.items;
}

export async function getProducts() {
  const data = await getJson<ListResponse<Product>>("/products?limit=100", { items: [] });
  return data.items;
}

export async function getEventBySlug(slug: string) {
  return getJson<EventItem | null>(`/events/${slug}`, null);
}

export async function getCourseBySlug(slug: string) {
  return getJson<Course | null>(`/courses/${slug}`, null);
}

export async function getProductBySlug(slug: string) {
  return getJson<Product | null>(`/products/${slug}`, null);
}

export async function getCategories() {
  return getJson<{ courses: string[]; products: string[]; events: string[] }>("/categories", {
    courses: [],
    products: [],
    events: []
  });
}
