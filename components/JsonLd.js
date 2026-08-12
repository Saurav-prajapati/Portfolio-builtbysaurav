import { siteConfig } from "@/lib/siteConfig";

export default function JsonLd() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Built by Saurav",
            alternateName: ["builtbysaurav", "builtbysaurav.in"],
            url: siteConfig.siteUrl,
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Saurav Prajapati",
            url: siteConfig.siteUrl,
            email: siteConfig.email,
            telephone: siteConfig.phone,
            jobTitle: "Shopify & Frontend Developer",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressRegion: "Delhi",
                addressCountry: "IN",
            },
            sameAs: siteConfig.socials
                .filter((s) => !s.href.startsWith("mailto:"))
                .map((s) => s.href),
        },
    ];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd),
            }}
        />
    );
}