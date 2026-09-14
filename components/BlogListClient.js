"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";

const INITIAL_COUNT = 12; // posts shown on first load
const LOAD_STEP = 6;      // posts added per load

export default function BlogListClient() {
    // Sort posts (newest first)
    const sortedPosts = [...blogPosts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const loaderRef = useRef(null);

    const visiblePosts = sortedPosts.slice(0, visibleCount);
    const hasMore = visibleCount < sortedPosts.length;

    const loadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + LOAD_STEP, sortedPosts.length)
        );
    };

    // Auto-load when the loader element enters the viewport
    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "200px" } // start loading 200px before reaching bottom
        );

        const el = loaderRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [hasMore, visibleCount]);

    return (
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
            <Reveal>
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Blog" },
                    ]}
                />
            </Reveal>
            <Reveal>
                <SectionLabel index="blog.tsx">Articles &amp; Insights</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
                <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                    Latest from the studio
                </h1>
            </Reveal>
            <Reveal delay={0.1}>
                <p className="mt-4 max-w-5xl text-md text-muted">
                    Practical guides, creative insights, and expert tips on Shopify, React & Next.js, WordPress, graphic design, video editing, and modern digital experiences. Explore ideas, tutorials, and resources to help you build better websites, stronger brands, and more engaging content.
                </p>
            </Reveal>

            {/* Blog grid */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post, i) => (
                    <Reveal key={post.id} delay={(i % LOAD_STEP) * 0.05}>
                        <article className="group overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-lime/40">
                            <Link href={`/blog/${post.slug}`}>
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                                        <span className="rounded-full border border-line px-2 py-0.5 text-lime">
                                            {post.category}
                                        </span>
                                        <span>{post.readTime}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="mt-3 font-display text-xl font-semibold text-ink transition-colors group-hover:text-lime">
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-muted">
                                        {post.metaDescription}
                                    </p>
                                </div>
                            </Link>
                        </article>
                    </Reveal>
                ))}
            </div>

            {/* Load more button + auto-loader trigger */}
            {hasMore ? (
                <div
                    ref={loaderRef}
                    className="mt-12 flex flex-col items-center gap-3"
                >
                    <button
                        onClick={loadMore}
                        className="rounded-full border border-line px-8 py-3 font-mono text-sm text-ink transition-all hover:border-lime hover:text-lime hover:scale-105"
                    >
                        Load more articles →
                    </button>
                    <span className="font-mono text-[11px] text-muted">
                        showing {visiblePosts.length} of {sortedPosts.length}
                    </span>
                </div>
            ) : (
                <p className="mt-12 text-center font-mono text-xs text-muted">
                    — you&apos;ve reached the end · {sortedPosts.length} articles —
                </p>
            )}
        </section>
    );
}