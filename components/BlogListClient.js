"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";

export default function BlogListClient() {
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
            <Reveal>
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Blog" }, // current page, no link
                    ]}
                />
            </Reveal>
            <Reveal>
                <SectionLabel index="blog.tsx">Articles & Insights</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
                <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                    Latest from the studio
                </h1>
            </Reveal>
            <Reveal delay={0.1}>
                <p className="mt-4 max-w-2xl text-lg text-muted">
                    Guides, tutorials, and thoughts on Shopify, React, design, and more..
                </p>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {sortedPosts.map((post, i) => (
                    <Reveal key={post.id} delay={i * 0.05}>
                        <article className="group rounded-xl border border-line bg-panel transition-colors hover:border-lime/40 overflow-hidden">
                            <Link href={`/blog/${post.slug}`}>
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 text-xs text-muted font-mono">
                                        <span className="rounded-full border border-line px-2 py-0.5 text-lime">
                                            {post.category}
                                        </span>
                                        <span>{post.readTime}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-lime transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-muted line-clamp-2">
                                        {post.metaDescription}
                                    </p>
                                </div>
                            </Link>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
