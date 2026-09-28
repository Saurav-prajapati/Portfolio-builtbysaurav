import AboutPageClient from "@/components/AboutPageClient";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "About – Built by Saurav | Full-Service Digital Studio in Delhi",
  description:
    "Built by Saurav is a Delhi-based digital studio with 3+ years of experience building Shopify stores, React & Next.js apps, WordPress sites, graphic design, video editing, and photography. 50+ projects delivered.",
  keywords: [
    "about Built by Saurav",
    "Shopify developer Delhi",
    "React developer India",
    "full service digital studio Delhi",
    "graphic design studio",
    "video editing services",
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
  openGraph: {
    title: "About – Built by Saurav | Full-Service Digital Studio",
    description:
      "Delhi-based digital studio crafting Shopify stores, React apps, WordPress sites, and stunning brand visuals.",
    url: `${siteConfig.siteUrl}/about`,
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "About Built by Saurav",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About – Built by Saurav",
    description:
      "Delhi-based digital studio crafting Shopify stores, React apps, WordPress sites, and stunning brand visuals.",
    images: [`${siteConfig.siteUrl}/og-image.png`],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}