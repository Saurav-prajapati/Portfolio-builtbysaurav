import BlogListClient from "@/components/BlogListClient";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
    title: `Blog – ${siteConfig.name}`,
    description:
        "Read articles on Shopify development, React, Next.js, WordPress, graphic design, video editing, and more. Tips, guides, and insights from Built by Saurav.",
};

export default function BlogPage() {
    return <BlogListClient />;
}