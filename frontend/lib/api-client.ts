export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type ApiResult<T> = {
  data?: T;
  error?: string;
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("kubiyogen_token");
};

export const setToken = (token: string) => {
  window.localStorage.setItem("kubiyogen_token", token);
};

export const clearToken = () => {
  window.localStorage.removeItem("kubiyogen_token");
};

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers
      }
    });
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;
    if (!response.ok) {
      return { error: body?.message ?? "Islem tamamlanamadi" };
    }
    return { data: body as T };
  } catch {
    return { error: "Backend API'ye ulasilamadi. Lutfen backend sunucusunun calistigindan emin olun." };
  }
}
