import { siteConfig } from "@/lib/siteConfig";

export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        jobTitle: siteConfig.role,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Delhi",
            addressRegion: "Delhi",
            addressCountry: "IN",
        },
        sameAs: siteConfig.socials.map((s) => s.href),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}