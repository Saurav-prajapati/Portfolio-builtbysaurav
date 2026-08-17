"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { blogPosts } from "@/lib/blog";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";

const SITE_URL = "https://www.builtbysaurav.in";

// ---------------------------------------------------------
// Share Buttons
// ---------------------------------------------------------

function ShareButtons({ url, title }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: (
                <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            color: "hover:bg-[#1877F2] hover:text-white",
        },

        {
            name: "twitter",
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            icon: (
                <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
            color: "hover:bg-[#1DA1F2] hover:text-white",
        },

        {
            name: "whatsapp",
            href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            icon: (
                <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            color: "hover:bg-[#25D366] hover:text-white",
        },

        {
            name: "copy",
            href: "#",
            icon: (
                <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "hover:bg-gray-600 hover:text-white",

            onClick: async (e) => {
                e.preventDefault();

                try {
                    await navigator.clipboard.writeText(url);
                } catch (error) {
                    console.error("Unable to copy link:", error);
                }
            },
        },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {shareLinks.map((btn) => (
                <a
                    key={btn.name}
                    href={btn.href}
                    target={btn.name !== "copy" ? "_blank" : undefined}
                    rel={
                        btn.name !== "copy"
                            ? "noopener noreferrer"
                            : undefined
                    }
                    onClick={btn.onClick}
                    aria-label={
                        btn.name === "copy"
                            ? "Copy article link"
                            : `Share ${title} on ${btn.name}`
                    }
                    className={`flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-all ${btn.color}`}
                >
                    {btn.icon}

                    <span className="hidden sm:inline">
                        {btn.name}
                    </span>
                </a>
            ))}
        </div>
    );
}

// ---------------------------------------------------------
// Blog Post Component
// ---------------------------------------------------------

export default function BlogPostClient({ slug }) {
    const [currentUrl, setCurrentUrl] = useState("");

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    useEffect(() => {
        setCurrentUrl(`${SITE_URL}/blog/${post.slug}`);
    }, [post.slug]);

    // ---------------------------------------------------------
    // Sort posts
    // ---------------------------------------------------------

    const sortedPosts = useMemo(() => {
        return [...blogPosts].sort(
            (a, b) =>
                new Date(b.date).getTime() -
                new Date(a.date).getTime()
        );
    }, []);

    const currentIndex = sortedPosts.findIndex(
        (p) => p.slug === slug
    );

    const prevPost =
        currentIndex < sortedPosts.length - 1
            ? sortedPosts[currentIndex + 1]
            : null;

    const nextPost =
        currentIndex > 0
            ? sortedPosts[currentIndex - 1]
            : null;

    const recentPosts = sortedPosts
        .filter((p) => p.slug !== slug)
        .slice(0, 5);

    const articleUrl = `${SITE_URL}/blog/${post.slug}`;

    // ---------------------------------------------------------
    // Article Schema
    // ---------------------------------------------------------

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,

        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
        },

        headline: post.title,

        description: post.metaDescription,

        image: [`${SITE_URL}${post.image}`],

        datePublished: post.date,

        ...(post.updatedDate
            ? {
                dateModified: post.updatedDate,
            }
            : {}),

        author: {
            "@type": "Person",
            name: "Saurav Prajapati",
            url: `${SITE_URL}/about`,
        },

        publisher: {
            "@type": "Organization",
            name: "Built by Saurav",
            url: SITE_URL,
        },

        articleSection: post.category,

        keywords: post.tags
            ? post.tags.join(", ")
            : "",

        url: articleUrl,
    };

    // ---------------------------------------------------------
    // Breadcrumb Schema
    // ---------------------------------------------------------

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",

        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${SITE_URL}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: articleUrl,
            },
        ],
    };

    return (
        <main className="min-w-0 overflow-x-hidden">

            {/* ================================================= */}
            {/* STRUCTURED DATA */}
            {/* ================================================= */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema
                    ),
                }}
            />

            {/* ================================================= */}
            {/* ARTICLE */}
            {/* ================================================= */}

            <article
                className="
                    mx-auto
                    w-full
                    max-w-6xl
                    px-4
                    pb-20
                    pt-12
                    sm:px-5
                    sm:pb-24
                    sm:pt-16
                    md:px-8
                    md:pt-24
                "
                itemScope
                itemType="https://schema.org/BlogPosting"
            >

                {/* Breadcrumb */}

                <Reveal>
                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Blog",
                                href: "/blog",
                            },
                            {
                                label: post.title,
                            },
                        ]}
                    />
                </Reveal>

                {/* Category */}

                <Reveal>
                    <SectionLabel
                        index={
                            post.category?.toLowerCase() ||
                            "blog"
                        }
                    >
                        {post.category}
                    </SectionLabel>
                </Reveal>

                {/* ================================================= */}
                {/* RESPONSIVE GRID */}
                {/* ================================================= */}

                <div
                    className="
                        mt-7
                        grid
                        min-w-0
                        grid-cols-1
                        gap-10
                        lg:mt-8
                        lg:grid-cols-[minmax(0,1fr)_280px]
                        lg:gap-12
                    "
                >

                    {/* ================================================= */}
                    {/* MAIN CONTENT */}
                    {/* ================================================= */}

                    <div className="min-w-0">

                        {/* Back to blog */}

                        <Reveal delay={0.02}>
                            <Link
                                href="/blog"
                                className="
                                    mb-4
                                    inline-flex
                                    items-center
                                    gap-1
                                    font-mono
                                    text-xs
                                    text-muted
                                    transition-colors
                                    hover:text-lime
                                "
                            >
                                ← Back to blog
                            </Link>
                        </Reveal>

                        {/* ================================================= */}
                        {/* TITLE */}
                        {/* ================================================= */}

                        <Reveal>
                            <header>

                                <h1
                                    className="
                                        max-w-4xl
                                        break-words
                                        font-display
                                        text-3xl
                                        font-semibold
                                        leading-[1.12]
                                        text-ink
                                        sm:text-4xl
                                        md:text-5xl
                                        lg:text-6xl
                                    "
                                    itemProp="headline"
                                >
                                    {post.title}
                                </h1>

                                {/* SEO description */}

                                <p
                                    className="
                                        mt-5
                                        max-w-3xl
                                        break-words
                                        text-sm
                                        leading-6
                                        text-muted
                                        sm:leading-7
                                    "
                                    itemProp="description"
                                >
                                    {post.metaDescription}
                                </p>

                            </header>
                        </Reveal>

                        {/* ================================================= */}
                        {/* META */}
                        {/* ================================================= */}

                        <Reveal delay={0.05}>
                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-x-3
                                    gap-y-2
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-wide
                                    text-muted
                                    sm:gap-x-4
                                    sm:text-xs
                                "
                            >

                                <Link
                                    href="/about"
                                    className="transition-colors hover:text-ink"
                                    rel="author"
                                >
                                    {post.author}
                                </Link>

                                <span
                                    className="h-1 w-1 rounded-full bg-muted"
                                    aria-hidden="true"
                                />

                                <time
                                    dateTime={post.date}
                                    itemProp="datePublished"
                                >
                                    {new Date(
                                        post.date
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </time>

                                <span
                                    className="h-1 w-1 rounded-full bg-muted"
                                    aria-hidden="true"
                                />

                                <span>
                                    {post.readTime}
                                </span>

                            </div>
                        </Reveal>

                        {/* ================================================= */}
                        {/* TAGS */}
                        {/* ================================================= */}

                        {post.tags?.length > 0 && (
                            <Reveal delay={0.08}>
                                <div
                                    className="
                                        mt-5
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                    aria-label="Article topics"
                                >
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="
                                                max-w-full
                                                rounded-full
                                                border
                                                border-line
                                                px-3
                                                py-1
                                                font-mono
                                                text-[10px]
                                                leading-4
                                                text-muted
                                                sm:text-[11px]
                                            "
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        )}

                        {/* ================================================= */}
                        {/* FEATURED IMAGE */}
                        {/* ================================================= */}

                        <Reveal delay={0.1}>
                            <figure
                                className="
                                    relative
                                    mt-7
                                    aspect-[14/9]
                                    w-full
                                    overflow-hidden
                                    rounded-lg
                                    border
                                    border-line
                                    bg-panel
                                    sm:mt-8
                                    sm:rounded-xl
                                "
                            >
                                <Image
                                    src={post.image}
                                    alt={`${post.title} — Built by Saurav`}
                                    fill
                                    priority
                                    sizes="
                                        (max-width: 640px) 100vw,
                                        (max-width: 1024px) 90vw,
                                        900px
                                    "
                                    className="object-cover"
                                    itemProp="image"
                                />

                                <figcaption className="sr-only">
                                    {post.title}
                                </figcaption>
                            </figure>
                        </Reveal>

                        {/* ================================================= */}
                        {/* ARTICLE BODY */}
                        {/* ================================================= */}

                        <Reveal delay={0.15}>
                            <div
                                className="
                                    blog-content
                                    prose
                                    mt-8
                                    max-w-none
                                    overflow-hidden
                                    font-inter
                                    text-sm
                                    text-muted
                                    sm:mt-10

                                    prose-headings:font-display
                                    prose-headings:break-words
                                    prose-headings:text-ink
                                    prose-headings:tracking-tight

                                    prose-h2:mt-10
                                    prose-h2:mb-4
                                    prose-h2:text-xl
                                    sm:prose-h2:text-2xl

                                    prose-h3:mt-8
                                    prose-h3:mb-3
                                    prose-h3:text-lg
                                    sm:prose-h3:text-xl

                                    prose-p:leading-7
                                    sm:prose-p:leading-8

                                    prose-a:text-lime
                                    prose-a:no-underline
                                    hover:prose-a:underline

                                    prose-strong:text-ink

                                    prose-li:text-muted
                                    prose-li:leading-7

                                    prose-code:font-mono
                                    prose-code:text-xs
                                    sm:prose-code:text-sm

                                    prose-img:max-w-full
                                    prose-img:h-auto
                                    prose-img:rounded-xl

                                    prose-blockquote:border-l-lime
                                    prose-blockquote:text-muted
                                "
                                itemProp="articleBody"
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />
                        </Reveal>

                        {/* ================================================= */}
                        {/* AUTHOR BOX */}
                        {/* ================================================= */}

                        <Reveal delay={0.18}>
                            <section
                                aria-labelledby="about-author"
                                className="
                                    mt-12
                                    border-y
                                    border-line
                                    py-7
                                    sm:mt-14
                                    sm:py-8
                                "
                            >

                                <p
                                    className="
                                        font-mono
                                        text-[10px]
                                        uppercase
                                        tracking-wider
                                        text-lime
                                        sm:text-xs
                                    "
                                >
                                    About the author
                                </p>

                                <div
                                    className="
                                        mt-3
                                        flex
                                        flex-col
                                        gap-4
                                        sm:flex-row
                                        sm:items-end
                                        sm:justify-between
                                    "
                                >

                                    <div className="min-w-0">

                                        <h2
                                            id="about-author"
                                            className="
                                                font-display
                                                text-xl
                                                font-semibold
                                                text-ink
                                                sm:text-2xl
                                            "
                                        >
                                            Saurav Prajapati
                                        </h2>

                                        <p
                                            className="
                                                mt-2
                                                max-w-2xl
                                                text-sm
                                                leading-6
                                                text-muted
                                            "
                                        >
                                            Shopify & Frontend Developer
                                            sharing practical experience
                                            with Shopify, Liquid, React,
                                            Next.js, APIs, and modern web
                                            development.
                                        </p>

                                    </div>

                                    <Link
                                        href="/about"
                                        className="
                                            w-fit
                                            shrink-0
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-[0.14em]
                                            text-ink
                                            underline
                                            underline-offset-4
                                        "
                                        rel="author"
                                    >
                                        View profile →
                                    </Link>

                                </div>

                            </section>
                        </Reveal>

                        {/* ================================================= */}
                        {/* SHARE */}
                        {/* ================================================= */}

                        <Reveal
                            delay={0.2}
                            className="
                                mt-8
                                border-t
                                border-line
                                pt-6
                                sm:mt-10
                            "
                        >

                            <p
                                className="
                                    mb-4
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    text-lime
                                    sm:text-xs
                                "
                            >
                                Share this article
                            </p>

                            {currentUrl && (
                                <ShareButtons
                                    url={currentUrl}
                                    title={post.title}
                                />
                            )}

                        </Reveal>

                        {/* ================================================= */}
                        {/* PREVIOUS / NEXT */}
                        {/* ================================================= */}

                        <nav
                            aria-label="Blog post navigation"
                            className="
                                mt-10
                                grid
                                grid-cols-1
                                gap-3
                                sm:grid-cols-2
                                sm:gap-4
                            "
                        >

                            {prevPost ? (
                                <Link
                                    href={`/blog/${prevPost.slug}`}
                                    className="
                                        group
                                        min-w-0
                                        rounded-xl
                                        border
                                        border-line
                                        bg-panel
                                        p-4
                                        text-left
                                        transition-colors
                                        hover:border-lime/40
                                    "
                                >
                                    <span className="font-mono text-xs text-muted">
                                        ← Previous
                                    </span>

                                    <h2
                                        className="
                                            mt-2
                                            break-words
                                            font-display
                                            text-sm
                                            font-semibold
                                            text-ink
                                            transition-colors
                                            group-hover:text-lime
                                        "
                                    >
                                        {prevPost.title}
                                    </h2>
                                </Link>
                            ) : (
                                <div />
                            )}

                            {nextPost ? (
                                <Link
                                    href={`/blog/${nextPost.slug}`}
                                    className="
                                        group
                                        min-w-0
                                        rounded-xl
                                        border
                                        border-line
                                        bg-panel
                                        p-4
                                        text-left
                                        sm:text-right
                                        transition-colors
                                        hover:border-lime/40
                                    "
                                >
                                    <span className="font-mono text-xs text-muted">
                                        Next →
                                    </span>

                                    <h2
                                        className="
                                            mt-2
                                            break-words
                                            font-display
                                            text-sm
                                            font-semibold
                                            text-ink
                                            transition-colors
                                            group-hover:text-lime
                                        "
                                    >
                                        {nextPost.title}
                                    </h2>
                                </Link>
                            ) : (
                                <div />
                            )}

                        </nav>

                        {/* ================================================= */}
                        {/* MOBILE RELATED ARTICLES */}
                        {/* ================================================= */}

                        <section
                            className="mt-14 lg:hidden"
                            aria-labelledby="mobile-related"
                        >

                            <div className="border-t border-line pt-8">

                                <h2
                                    id="mobile-related"
                                    className="
                                        font-mono
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-lime
                                    "
                                >
                                    Recent articles
                                </h2>

                                <div className="mt-5 space-y-3">

                                    {recentPosts.slice(0, 3).map(
                                        (recent) => (
                                            <Link
                                                key={recent.id}
                                                href={`/blog/${recent.slug}`}
                                                className="
                                                    group
                                                    flex
                                                    min-w-0
                                                    gap-3
                                                    rounded-lg
                                                    border
                                                    border-line
                                                    bg-panel/60
                                                    p-3
                                                    transition-colors
                                                    hover:border-lime/40
                                                "
                                            >

                                                <div
                                                    className="
                                                        relative
                                                        h-16
                                                        w-16
                                                        shrink-0
                                                        overflow-hidden
                                                        rounded-md
                                                    "
                                                >
                                                    <Image
                                                        src={
                                                            recent.image
                                                        }
                                                        alt={
                                                            recent.title
                                                        }
                                                        fill
                                                        sizes="64px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="font-mono text-[10px] text-muted">
                                                        {
                                                            recent.category
                                                        }{" "}
                                                        ·{" "}
                                                        {
                                                            recent.readTime
                                                        }
                                                    </p>

                                                    <h3
                                                        className="
                                                            mt-1
                                                            line-clamp-2
                                                            text-sm
                                                            font-medium
                                                            leading-5
                                                            text-ink
                                                            transition-colors
                                                            group-hover:text-lime
                                                        "
                                                    >
                                                        {
                                                            recent.title
                                                        }
                                                    </h3>

                                                </div>

                                            </Link>
                                        )
                                    )}

                                </div>

                            </div>

                        </section>

                    </div>

                    {/* ================================================= */}
                    {/* DESKTOP SIDEBAR */}
                    {/* ================================================= */}

                    <aside
                        className="sticky top-24 hidden min-w-0 lg:block"
                        aria-label="Recent articles"
                    >

                        <div className="space-y-6">

                            <Reveal>
                                <h2
                                    className="
                                        font-mono
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-lime
                                    "
                                >
                                    Recent articles
                                </h2>
                            </Reveal>

                            <div className="space-y-4">

                                {recentPosts.map((recent) => (
                                    <Reveal key={recent.id}>

                                        <Link
                                            href={`/blog/${recent.slug}`}
                                            className="
                                                group
                                                block
                                                min-w-0
                                                rounded-lg
                                                border
                                                border-line
                                                bg-panel/60
                                                p-3
                                                transition-colors
                                                hover:border-lime/40
                                            "
                                        >

                                            <div className="flex gap-3">

                                                <div
                                                    className="
                                                        relative
                                                        h-16
                                                        w-16
                                                        shrink-0
                                                        overflow-hidden
                                                        rounded-md
                                                    "
                                                >
                                                    <Image
                                                        src={
                                                            recent.image
                                                        }
                                                        alt={
                                                            recent.title
                                                        }
                                                        fill
                                                        sizes="64px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="font-mono text-[10px] text-muted">
                                                        {
                                                            recent.category
                                                        }{" "}
                                                        ·{" "}
                                                        {
                                                            recent.readTime
                                                        }
                                                    </p>

                                                    <h3
                                                        className="
                                                            mt-1
                                                            line-clamp-2
                                                            break-words
                                                            text-sm
                                                            font-medium
                                                            text-ink
                                                            transition-colors
                                                            group-hover:text-lime
                                                        "
                                                    >
                                                        {
                                                            recent.title
                                                        }
                                                    </h3>

                                                </div>

                                            </div>

                                        </Link>

                                    </Reveal>
                                ))}

                            </div>

                            <Reveal>

                                <Link
                                    href="/contact"
                                    className="
                                        block
                                        rounded-lg
                                        border
                                        border-lime/40
                                        bg-lime/5
                                        p-4
                                        text-center
                                        font-mono
                                        text-sm
                                        text-lime
                                        transition-colors
                                        hover:bg-lime/10
                                    "
                                >
                                    Need help? Let’s talk →
                                </Link>

                            </Reveal>

                        </div>

                    </aside>

                </div>
            </article>
        </main>
    );
}