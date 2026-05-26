import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kubiyogen.com.tr";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function generateSeo({ title, description, path = "/", image = "/og-image.png" }: SeoOptions): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kubiyogen",
      locale: "tr_TR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kubiyogen",
    url: siteUrl,
    sameAs: ["https://www.instagram.com/kubiyogen", "https://tr.linkedin.com/company/kubiyogen"]
  };
}
