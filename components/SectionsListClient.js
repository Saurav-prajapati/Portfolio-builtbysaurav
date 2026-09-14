"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    sections,
    sectionPlatforms,
    sectionCategories,
} from "@/lib/sections";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";

// Small icon per platform (extend as you add WP / React)
const platformIcons = {
    shopify: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.9 3.4a.6.6 0 0 0-.6-.5h-2.3l-.2 1.6h2.2a.3.3 0 0 1 .3.4l-.9 5.4a.6.6 0 0 1-.6.5h-2.2l-.2 1.5h2a.3.3 0 0 1 .3.4l-.8 5.4a.6.6 0 0 1-.6.5h-2.3l.2-1.6h2a.3.3 0 0 0 .3-.4l.8-5.4a.6.6 0 0 0-.6-.5h-2.2l.2-1.5h2a.3.3 0 0 0 .3-.4l.8-5.4a.6.6 0 0 0-.6-.5h-2.4l.2-1.4h2.7a.3.3 0 0 0 .3-.4l-.2-1.4a.6.6 0 0 0-.6-.5h-2.6l-.3 1.8H9.9l.3-1.6h2a.3.3 0 0 0 .3-.4l-.2-1.4a.6.6 0 0 0-.6-.5H9l-.3 1.8H6.5l-.3-1.8a.6.6 0 0 0-.6-.5H3.5l1.5 10.4h3l-.3 1.7h-2.1a.3.3 0 0 0-.3.4l.6 3.8a.6.6 0 0 0 .6.5h2l-.2 1.6h2.8l.2-1.6h2.2a.6.6 0 0 0 .6-.5l1.3-7.9a.3.3 0 0 0-.3-.4h-1.9l.2-1.5h2a.6.6 0 0 0 .6-.5l.7-4.4a.3.3 0 0 0-.3-.4h-1.7l.2-1.5h1.8a.3.3 0 0 0 .3-.4l-.2-1.4z" />
        </svg>
    ),
};

function formatDownloads(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n;
}

export default function SectionsListClient() {
    const [activePlatform, setActivePlatform] = useState("All");
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return sections.filter((s) => {
            const matchPlatform =
                activePlatform === "All" || s.platform === activePlatform;
            const matchCategory =
                activeCategory === "All" || s.category === activeCategory;
            const matchQuery =
                !q ||
                s.title.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q) ||
                s.tags.some((t) => t.toLowerCase().includes(q));
            return matchPlatform && matchCategory && matchQuery;
        });
    }, [activePlatform, activeCategory, query]);

    return (
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
            <Reveal>
                <Breadcrumb
                    items={[{ label: "Home", href: "/" }, { label: "Sections" }]}
                />
            </Reveal>

            {/* ── HERO HEADER ── */}
            <Reveal>
                <SectionLabel index="sections.tsx">Free Code Library</SectionLabel>
            </Reveal>

            <div className="mt-4 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
                <div>
                    <Reveal delay={0.05}>
                        <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                            Ship faster with
                            <br />
                            <span className=" bg-[length:200%_auto] bg-clip-text text-white animate-gradient">
                                production‑ready sections.
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-5 max-w-xl text-md text-muted">
                            Copy‑paste Shopify sections built with Liquid, OS 2.0, and clean
                            code. Free forever. No signup required.
                        </p>
                    </Reveal>
                </div>

                {/* Stat strip */}
                <Reveal delay={0.15}>
                    <div className="flex flex-wrap gap-4 font-mono text-xs text-muted md:justify-end">
                        <div className="rounded-xl border border-line bg-panel px-4 py-3">
                            <div className="font-display text-2xl font-bold text-lime">
                                {sections.length}+
                            </div>
                            <div className="mt-1">Sections</div>
                        </div>
                        <div className="rounded-xl border border-line bg-panel px-4 py-3">
                            <div className="font-display text-2xl font-bold text-violet">
                                100%
                            </div>
                            <div className="mt-1">Free</div>
                        </div>
                        <div className="rounded-xl border border-line bg-panel px-4 py-3">
                            <div className="font-display text-2xl font-bold text-ink">0</div>
                            <div className="mt-1">Signups</div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* ── SEARCH + FILTERS ── */}
            <Reveal delay={0.2}>
                <div className="mt-12 rounded-2xl border border-line bg-panel/50 p-4 backdrop-blur sm:p-5">
                    {/* Search */}
                    <div className="relative">
                        <svg
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                            />
                        </svg>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search sections — try 'slider', 'product card', 'footer'…"
                            className="w-full rounded-xl border border-line bg-base px-11 py-3 font-mono text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-lime"
                        />
                    </div>

                    {/* Platform filters */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {sectionPlatforms.map((p) => (
                            <button
                                key={p}
                                onClick={() => setActivePlatform(p)}
                                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all ${activePlatform === p
                                        ? "border-lime bg-lime text-black"
                                        : "border-line text-muted hover:border-lime/40 hover:text-ink"
                                    }`}
                            >
                                {p === "All" ? "All platforms" : p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Category filters */}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {sectionCategories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActiveCategory(c)}
                                className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-all ${activeCategory === c
                                        ? "border-violet bg-violet/10 text-violet"
                                        : "border-line text-muted hover:border-violet/40 hover:text-ink"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </Reveal>

            {/* ── RESULTS COUNT ── */}
            <Reveal delay={0.25}>
                <p className="mt-8 font-mono text-xs text-muted">
                    {filtered.length} section{filtered.length !== 1 ? "s" : ""} found
                </p>
            </Reveal>

            {/* ── GRID ── */}
            {filtered.length > 0 ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((section, i) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                        >
                            <Link
                                href={`/sections/${section.slug}`}
                                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-2xl hover:shadow-lime/5"
                            >
                                {/* Preview image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-base">
                                    <img
                                        src={section.previewImage}
                                        alt={`${section.title} preview`}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                    {/* Fallback pattern when image missing */}
                                    <div className="absolute inset-0 -z-10 flex items-center justify-center bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:16px_16px]">
                                        <span className="font-mono text-3xl font-bold text-lime/20">
                                            {section.ext}
                                        </span>
                                    </div>

                                    {/* File extension badge */}
                                    <span className="absolute right-3 top-3 rounded-full border border-lime/40 bg-black/60 px-2.5 py-1 font-mono text-[10px] font-semibold text-lime backdrop-blur-sm">
                                        {section.ext}
                                    </span>

                                    {/* Platform badge */}
                                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-line bg-black/60 px-2.5 py-1 font-mono text-[10px] text-ink backdrop-blur-sm">
                                        <span className="text-lime">
                                            {platformIcons[section.platform]}
                                        </span>
                                        {section.platform}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
                                        <span className="rounded-full border border-line px-2 py-0.5 text-violet">
                                            {section.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg
                                                className="h-3 w-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                                                />
                                            </svg>
                                            {formatDownloads(section.downloads)}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-lime">
                                        {section.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                                        {section.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {section.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer CTA */}
                                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                                        <span className="font-mono text-xs text-lime opacity-0 transition-opacity group-hover:opacity-100">
                                            view code
                                        </span>
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-all group-hover:border-lime group-hover:bg-lime group-hover:text-black">
                                            <svg
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                {/* Corner glow */}
                                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-lime/0 blur-2xl transition-all duration-500 group-hover:bg-lime/10" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* Empty state */
                <div className="mt-16 rounded-2xl border border-dashed border-line bg-panel/30 py-20 text-center">
                    <p className="font-mono text-sm text-muted">
                        No sections found. Try a different keyword.
                    </p>
                    <button
                        onClick={() => {
                            setQuery("");
                            setActivePlatform("All");
                            setActiveCategory("All");
                        }}
                        className="mt-4 rounded-full border border-line px-5 py-2 font-mono text-xs text-ink transition-colors hover:border-lime hover:text-lime"
                    >
                        clear filters
                    </button>
                </div>
            )}

            {/* ── CTA STRIP (bottom) ── */}
            <Reveal delay={0.3}>
                <div className="mt-20 flex flex-col items-start gap-6 rounded-2xl border border-line bg-gradient-to-br from-panel to-base p-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-display text-2xl font-semibold text-ink">
                            Need a custom section built for your store?
                        </h2>
                        <p className="mt-2 text-sm text-muted">
                            I build Shopify sections tailored to your brand and business — fast.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="group flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                    >
                        hire me
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </Reveal>
        </section>
    );
}