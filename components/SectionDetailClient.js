"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import SectionLabel from "@/components/SectionLabel";

function formatDownloads(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n;
}

export default function SectionDetailClient({ section, allSections }) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("preview"); // preview | code

    const hasCode = Boolean(section.code);

    // Copy to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(section.code || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    // Download as file
    const handleDownload = () => {
        const blob = new Blob([section.code || ""], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = section.id + section.ext;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Related sections
    const related = allSections
        .filter(
            (s) =>
                s.slug !== section.slug &&
                (s.category === section.category || s.platform === section.platform)
        )
        .slice(0, 3);

    const codeLines = (section.code || "").split("\n");

    return (
        <section className="mx-auto max-w-6xl overflow-x-hidden px-5 pb-24 pt-16 md:px-8 md:pt-24">
            {/* Breadcrumb */}
            <Reveal>
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Sections", href: "/sections" },
                        { label: section.title },
                    ]}
                />
            </Reveal>

            {/* ── HEADER ── */}
            <Reveal>
                <SectionLabel index={section.ext}>
                    {section.category} · {section.platform}
                </SectionLabel>
            </Reveal>

            <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
                <div className="min-w-0">
                    <Reveal delay={0.05}>
                        <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                            {section.title}
                        </h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-4 max-w-2xl text-lg text-muted">
                            {section.longDescription || section.description}
                        </p>
                    </Reveal>
                </div>

                {/* Quick actions */}
                <Reveal delay={0.15}>
                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        {hasCode && (
                            <>
                                <button
                                    onClick={handleCopy}
                                    className="group flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-2.5 font-mono text-xs text-ink transition-all hover:border-lime hover:text-lime"
                                >
                                    {copied ? (
                                        <>
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            copy code
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
                                >
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                    </svg>
                                    download {section.id}{section.ext}
                                </button>
                            </>
                        )}
                        {section.demoUrl && (
                            <a
                                href={section.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-5 py-2.5 font-mono text-xs text-violet transition-colors hover:bg-violet/20"
                            >
                                live demo ↗
                            </a>
                        )}
                    </div>
                </Reveal>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                {/* LEFT COLUMN — Preview / Code tabs */}
                <div className="min-w-0">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 border-b border-line">
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`relative px-4 py-3 font-mono text-xs transition-colors ${activeTab === "preview"
                                    ? "text-lime"
                                    : "text-muted hover:text-ink"
                                }`}
                        >
                            preview
                            {activeTab === "preview" && (
                                <motion.span
                                    layoutId="detail-tab"
                                    className="absolute inset-x-0 bottom-0 h-[2px] bg-lime"
                                />
                            )}
                        </button>
                        {hasCode && (
                            <button
                                onClick={() => setActiveTab("code")}
                                className={`relative px-4 py-3 font-mono text-xs transition-colors ${activeTab === "code"
                                        ? "text-lime"
                                        : "text-muted hover:text-ink"
                                    }`}
                            >
                                code
                                {activeTab === "code" && (
                                    <motion.span
                                        layoutId="detail-tab"
                                        className="absolute inset-x-0 bottom-0 h-[2px] bg-lime"
                                    />
                                )}
                            </button>
                        )}
                        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-muted">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                            </svg>
                            {formatDownloads(section.downloads)} downloads
                        </span>
                    </div>

                    {/* PREVIEW TAB */}
                    {activeTab === "preview" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 overflow-hidden rounded-2xl border border-line bg-panel"
                        >
                            <div className="flex items-center gap-2 border-b border-line bg-base/60 px-4 py-2.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-lime/60" />
                                <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
                                <span className="ml-3 truncate font-mono text-[11px] text-muted">
                                    preview — {section.title.toLowerCase().replace(/\s+/g, "-")}
                                </span>
                            </div>
                            <div className="relative aspect-video overflow-hidden bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:20px_20px]">
                                <img
                                    src={section.previewImage}
                                    alt={`${section.title} preview`}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-3">
                                    <span className="font-mono text-6xl font-bold text-lime/10">
                                        {section.ext}
                                    </span>
                                    <p className="font-mono text-xs text-muted">
                                        preview image coming soon
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CODE TAB */}
                    {activeTab === "code" && hasCode && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-[#0b1220]"
                        >
                            {/* Code header */}
                            <div className="flex items-center justify-between border-b border-line/60 bg-[#080e1a] px-4 py-2.5">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-coral/70" />
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime/60" />
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet/70" />
                                    <span className="ml-2 truncate font-mono text-[11px] text-muted">
                                        {section.id}
                                        {section.ext}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="shrink-0 rounded-full border border-line/60 px-3 py-1 font-mono text-[10px] text-muted transition-colors hover:border-lime hover:text-lime"
                                >
                                    {copied ? "copied ✓" : "copy"}
                                </button>
                            </div>

                            {/* Code with wrapped lines + line numbers */}
                            <div className="max-h-[600px] w-full overflow-y-auto overflow-x-hidden">
                                <div className="w-full p-4 font-mono text-[12px] leading-relaxed sm:text-[12.5px]">
                                    {codeLines.map((line, i) => (
                                        <div key={i} className="flex w-full min-w-0 items-start">
                                            {/* Line number */}
                                            <span
                                                className="shrink-0 select-none pr-4 text-right text-muted/40"
                                                style={{ minWidth: "2.75rem" }}
                                            >
                                                {i + 1}
                                            </span>
                                            {/* Code content — wraps naturally */}
                                            <span className="min-w-0 flex-1 whitespace-pre-wrap break-words text-lime/90">
                                                {line || " "}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── FEATURES ── */}
                    {section.features?.length > 0 && (
                        <Reveal className="mt-10">
                            <h2 className="font-display text-2xl font-semibold text-ink">
                                Features
                            </h2>
                            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                                {section.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                                            <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    )}

                    {/* ── INSTALLATION ── */}
                    {section.installation?.length > 0 && (
                        <Reveal className="mt-10">
                            <h2 className="font-display text-2xl font-semibold text-ink">
                                How to install
                            </h2>
                            <ol className="mt-4 space-y-3">
                                {section.installation.map((step, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime/40 bg-lime/10 font-mono text-[11px] font-bold text-lime">
                                            {i + 1}
                                        </span>
                                        <p className="pt-0.5 text-sm leading-relaxed text-muted">
                                            {step}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </Reveal>
                    )}
                </div>

                {/* RIGHT COLUMN — Sticky sidebar */}
                <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
                    <Reveal>
                        <div className="rounded-2xl border border-line bg-panel p-5">
                            <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
                                metadata
                            </p>

                            <dl className="mt-4 space-y-3 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="font-mono text-xs text-muted">platform</dt>
                                    <dd className="truncate font-mono text-xs capitalize text-ink">
                                        {section.platform}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="font-mono text-xs text-muted">category</dt>
                                    <dd className="truncate font-mono text-xs text-ink">
                                        {section.category}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="font-mono text-xs text-muted">language</dt>
                                    <dd className="truncate font-mono text-xs capitalize text-ink">
                                        {section.language}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="font-mono text-xs text-muted">file</dt>
                                    <dd className="truncate font-mono text-xs text-violet">
                                        {section.id}
                                        {section.ext}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
                                    <dt className="font-mono text-xs text-muted">downloads</dt>
                                    <dd className="font-mono text-xs text-lime">
                                        {section.downloads.toLocaleString()}
                                    </dd>
                                </div>
                            </dl>

                            {hasCode && (
                                <button
                                    onClick={handleDownload}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 font-mono text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
                                >
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                    </svg>
                                    download file
                                </button>
                            )}
                        </div>
                    </Reveal>

                    {/* Compatibility */}
                    {section.compatibility?.length > 0 && (
                        <Reveal delay={0.05}>
                            <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
                                <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
                                    compatible with
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {section.compatibility.map((c) => (
                                        <span
                                            key={c}
                                            className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Tags */}
                    {section.tags?.length > 0 && (
                        <Reveal delay={0.1}>
                            <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
                                <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
                                    tags
                                </p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {section.tags.map((t) => (
                                        <span key={t} className="font-mono text-[11px] text-muted">
                                            #{t.toLowerCase().replace(/\s+/g, "")}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Help CTA */}
                    <Reveal delay={0.15}>
                        <div className="mt-6 rounded-2xl border border-lime/30 bg-lime/5 p-5">
                            <p className="font-display text-sm font-semibold text-ink">
                                Need customization?
                            </p>
                            <p className="mt-2 text-xs text-muted">
                                I can tailor this section to match your brand and store.
                            </p>
                            <Link
                                href="/contact"
                                className="mt-4 flex items-center justify-between rounded-full border border-lime/40 bg-base/40 px-4 py-2.5 font-mono text-xs text-lime transition-colors hover:bg-lime/10"
                            >
                                get in touch
                                <span>→</span>
                            </Link>
                        </div>
                    </Reveal>
                </aside>
            </div>

            {/* ── RELATED SECTIONS ── */}
            {related.length > 0 && (
                <Reveal className="mt-20">
                    <div className="mb-6 flex items-end justify-between">
                        <h2 className="font-display text-2xl font-semibold text-ink">
                            More like this
                        </h2>
                        <Link
                            href="/sections"
                            className="font-mono text-xs text-muted transition-colors hover:text-lime"
                        >
                            all sections →
                        </Link>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((r) => (
                            <Link
                                key={r.id}
                                href={`/sections/${r.slug}`}
                                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-all hover:-translate-y-1 hover:border-lime/40"
                            >
                                <div className="relative aspect-video overflow-hidden bg-base">
                                    <img
                                        src={r.previewImage}
                                        alt={r.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                    <span className="absolute right-2 top-2 rounded-full border border-lime/40 bg-black/60 px-2 py-0.5 font-mono text-[9px] text-lime backdrop-blur-sm">
                                        {r.ext}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-display text-sm font-semibold text-ink transition-colors group-hover:text-lime">
                                        {r.title}
                                    </h3>
                                    <p className="mt-1 font-mono text-[10px] text-muted">
                                        {r.category} · {formatDownloads(r.downloads)} dl
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Reveal>
            )}

            {/* ── BOTTOM CTA ── */}
            <Reveal className="mt-20">
                <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-gradient-to-br from-panel to-base p-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-display text-2xl font-semibold text-ink">
                            Want sections like these built for you?
                        </h2>
                        <p className="mt-2 text-sm text-muted">
                            I build custom Shopify themes, sections, and apps tailored to your brand.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="group flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                    >
                        hire me
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                </div>
            </Reveal>
        </section>
    );
}