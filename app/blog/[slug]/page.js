import BlogPostClient from "@/components/BlogPostClient";
import { blogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) return {};
    return {
        title: `${post.title} – Built by Saurav`,
        description: post.metaDescription,
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            images: [post.image],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription,
            images: [post.image],
        },
    };
}

export default function BlogPostPage({ params }) {
    return <BlogPostClient slug={params.slug} />;
}