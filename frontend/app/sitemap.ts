import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kubiyogen.com.tr";

const routes = [
  "",
  "/magaza",
  "/magaza/yuz-yuze-egitimler",
  "/magaza/dijital-egitimler",
  "/magaza/aksesuarlar",
  "/etkinlikler",
  "/etkinlikler/yaklasan",
  "/etkinlikler/son",
  "/hakkimizda",
  "/iletisim",
  "/sepet"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
