import { notFound } from "next/navigation";
import SectionDetailClient from "@/components/SectionDetailClient";
import { sections } from "@/lib/sections";
import { siteConfig } from "@/lib/siteConfig";

// Generate static paths for all sections
export async function generateStaticParams() {
    return sections.map((section) => ({
        slug: section.slug,
    }));
}

// Per‑section metadata (SEO)
export async function generateMetadata({ params }) {
    const section = sections.find((s) => s.slug === params.slug);
    if (!section) return {};

    const title = `${section.title} for ${section.platform.charAt(0).toUpperCase() + section.platform.slice(1)} – Free ${section.ext} Code`;
    const description = section.description;

    return {
        title,
        description,
        keywords: section.seoKeywords || [],
        alternates: {
            canonical: `${siteConfig.siteUrl}/sections/${section.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteConfig.siteUrl}/sections/${section.slug}`,
            images: [
                {
                    url: `${siteConfig.siteUrl}${section.previewImage}`,
                    width: 1200,
                    height: 630,
                    alt: section.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteConfig.siteUrl}${section.previewImage}`],
        },
    };
}

export default function SectionPage({ params }) {
    const section = sections.find((s) => s.slug === params.slug);
    if (!section) notFound();

    // JSON‑LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: section.title,
        description: section.description,
        programmingLanguage: section.language,
        codeSampleType: "full",
        author: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.siteUrl,
        },
        codeRepository: `${siteConfig.siteUrl}/sections/${section.slug}`,
        datePublished: section.createdAt,
        dateModified: section.updatedAt,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SectionDetailClient section={section} allSections={sections} />
        </>
    );
}