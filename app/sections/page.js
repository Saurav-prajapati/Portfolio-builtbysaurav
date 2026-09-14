import SectionsListClient from "@/components/SectionsListClient";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
    title: "Free Shopify Sections & Liquid Code Snippets",
    description:
        "Download free, production‑ready Shopify sections written in Liquid. Custom banner sliders, product cards, announcement bars, footers, and more — built by Saurav Prajapati.",
    keywords: [
        "free shopify sections",
        "shopify liquid code",
        "custom banner slider shopify",
        "shopify product card liquid",
        "shopify section download",
    ],
    openGraph: {
        title: "Free Shopify Sections & Liquid Code Snippets",
        description:
            "Download free, production‑ready Shopify sections written in Liquid.",
        url: `${siteConfig.siteUrl}/sections`,
    },
};

export default function SectionsPage() {
    return <SectionsListClient />;
}