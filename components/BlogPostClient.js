"use client";

import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Share button component
function ShareButtons({ url, title }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            color: "hover:bg-[#1877F2] hover:text-white",
        },
        {
            name: "twitter",
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            icon: (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
            color: "hover:bg-[#1DA1F2] hover:text-white",
        },
        {
            name: "whatsapp",
            href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            icon: (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            color: "hover:bg-[#25D366] hover:text-white",
        },
        {
            name: "copy",
            href: "#",
            icon: (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            color: "hover:bg-gray-600 hover:text-white",
            onClick: (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(url);
                // Optional: show a toast
                alert("Link copied to clipboard!");
            },
        },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {shareLinks.map((btn) => (
                <a
                    key={btn.name}
                    href={btn.href}
                    target={btn.name !== "copy" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    onClick={btn.onClick}
                    className={`flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-all ${btn.color}`}
                >
                    {btn.icon}
                    <span className="hidden sm:inline">{btn.name}</span>
                </a>
            ))}
        </div>
    );
}

export default function BlogPostClient({ slug }) {
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    // Sort all posts by date descending
    const sortedPosts = [...blogPosts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

    // Recent articles (exclude current, show 5 newest)
    const recentPosts = sortedPosts
        .filter((p) => p.slug !== slug)
        .slice(0, 5);

    return (
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pt-24 blog-list">
            {/* Breadcrumb */}
            <Reveal>
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Blog", href: "/blog" },
                        { label: post.title },
                    ]}
                />
            </Reveal>

            <Reveal>
                <SectionLabel index={post.category?.toLowerCase() || "blog"}>
                    {post.category}
                </SectionLabel>
            </Reveal>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_300px]">
                {/* Main content */}
                <div>
                    {/* Back to blog link */}
                    <Reveal delay={0.02}>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-lime transition-colors mb-4"
                        >
                            ← Back to blog
                        </Link>
                    </Reveal>

                    <Reveal>
                        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                            {post.title}
                        </h1>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
                            <span>{post.author}</span>
                            <span className="h-1 w-1 rounded-full bg-muted" />
                            <span>{post.date}</span>
                            <span className="h-1 w-1 rounded-full bg-muted" />
                            <span>{post.readTime}</span>
                        </div>
                    </Reveal>

                    {/* Featured image */}
                    <Reveal delay={0.1}>
                        <div className="mt-6 overflow-hidden rounded-xl border border-line">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full object-cover"
                            />
                        </div>
                    </Reveal>

                    {/* Article content */}
                    <Reveal delay={0.15}>
                        <div
                            className="prose mt-10 max-w-none font-inter text-muted
                prose-headings:font-display prose-headings:text-ink prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:leading-relaxed prose-p:text-muted
                prose-a:text-lime prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink prose-li:text-muted
                prose-code:font-mono prose-code:text-sm
                prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </Reveal>

                    {/* Share section */}
                    <Reveal delay={0.2} className="mt-12 border-t border-line pt-6">
                        <p className="font-mono text-xs uppercase tracking-wider text-lime mb-4">
                            Share this article
                        </p>
                        {currentUrl && <ShareButtons url={currentUrl} title={post.title} />}
                    </Reveal>

                    {/* Previous / Next article navigation */}
                    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {prevPost ? (
                            <Link
                                href={`/blog/${prevPost.slug}`}
                                className="group rounded-xl border border-line bg-panel p-4 transition-colors hover:border-lime/40 text-left"
                            >
                                <span className="font-mono text-xs text-muted">← Previous</span>
                                <h4 className="mt-1 font-display text-sm font-semibold text-ink group-hover:text-lime transition-colors">
                                    {prevPost.title}
                                </h4>
                            </Link>
                        ) : (
                            <div />
                        )}
                        {nextPost ? (
                            <Link
                                href={`/blog/${nextPost.slug}`}
                                className="group rounded-xl border border-line bg-panel p-4 transition-colors hover:border-lime/40 text-right"
                            >
                                <span className="font-mono text-xs text-muted">Next →</span>
                                <h4 className="mt-1 font-display text-sm font-semibold text-ink group-hover:text-lime transition-colors">
                                    {nextPost.title}
                                </h4>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>

                {/* Sticky sidebar – recent articles (unchanged) */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        <Reveal>
                            <h3 className="font-mono text-xs uppercase tracking-wider text-lime">
                                Recent articles
                            </h3>
                        </Reveal>

                        <div className="space-y-4">
                            {recentPosts.map((recent) => (
                                <Reveal key={recent.id}>
                                    <Link
                                        href={`/blog/${recent.slug}`}
                                        className="group block rounded-lg border border-line bg-panel/60 p-3 transition-colors hover:border-lime/40"
                                    >
                                        <div className="flex gap-3">
                                            <img
                                                src={recent.image}
                                                alt={recent.title}
                                                className="h-16 w-16 shrink-0 rounded-md object-cover"
                                            />
                                            <div className="min-w-0">
                                                <p className="text-xs font-mono text-muted">
                                                    {recent.category} · {recent.readTime}
                                                </p>
                                                <h4 className="mt-1 text-sm font-medium text-ink group-hover:text-lime transition-colors line-clamp-2">
                                                    {recent.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal>
                            <Link
                                href="/contact"
                                className="block rounded-lg border border-lime/40 bg-lime/5 p-4 text-center font-mono text-sm text-lime hover:bg-lime/10 transition-colors"
                            >
                                Need help? Let’s talk →
                            </Link>
                        </Reveal>
                    </div>
                </aside>
            </div>
        </section>
    );
}