"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import SectionDownloadGate from "@/components/SectionDownloadGate";

function formatDownloads(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n;
}

function CodeLine({ line, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -6 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25, delay: Math.min(index * 0.008, 0.4) }}
            className="flex w-full min-w-0 items-start hover:bg-white/[0.02]"
        >
            <span
                className="shrink-0 select-none pr-4 text-right font-mono text-muted/30"
                style={{ minWidth: "2.75rem" }}
            >
                {index + 1}
            </span>
            <span className="min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-lime/90">
                {line || " "}
            </span>
        </motion.div>
    );
}

export default function SectionDetailClient({ section, allSections }) {
    const [copied, setCopied] = useState(false);
    const [gateOpen, setGateOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("bbs_user");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Date.now() - parsed.ts < 30 * 24 * 60 * 60 * 1000) {
                    setUser(parsed);
                }
            }
        } catch { }
    }, []);

    const hasCode = Boolean(section.code);
    const codeLines = (section.code || "").split("\n");
    const isUnlocked = Boolean(user);
    const PREVIEW_LINES = Math.max(8, Math.min(20, Math.ceil(codeLines.length * 0.35)));

    const trackAction = (userData, action) => {
        if (!userData?.email) return;
        const trackKey = `bbs_tracked:${userData.email}:${section.slug}:${action}`;
        if (typeof window !== "undefined" && localStorage.getItem(trackKey)) return;

        fetch("/api/sections/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                sectionTitle: section.title,
                slug: section.slug,
                action,
            }),
        })
            .then(() => localStorage.setItem(trackKey, "1"))
            .catch((err) => console.warn("Track failed:", err));
    };

    const doCopy = async (userData) => {
        try {
            await navigator.clipboard.writeText(section.code || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            trackAction(userData, "copy");
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const doDownload = (userData) => {
        trackAction(userData, "download");
        const blob = new Blob([section.code || ""], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = section.slug + section.ext;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const requestAction = (action) => {
        if (user) {
            if (action === "download") doDownload(user);
            else if (action === "copy") doCopy(user);
        } else {
            setPendingAction(action);
            setGateOpen(true);
        }
    };

    const handleGateSuccess = ({ name, email }) => {
        const userData = { name, email, ts: Date.now() };
        try {
            localStorage.setItem("bbs_user", JSON.stringify(userData));
        } catch { }
        setUser(userData);
        if (pendingAction === "download") doDownload(userData);
        else if (pendingAction === "copy") doCopy(userData);
        setPendingAction(null);
    };

    const related = allSections
        .filter(
            (s) =>
                s.slug !== section.slug &&
                (s.category === section.category || s.platform === section.platform)
        )
        .slice(0, 3);

    const visibleLines = isUnlocked ? codeLines : codeLines.slice(0, PREVIEW_LINES);

    return (
        <>
            <section className="mx-auto max-w-6xl overflow-x-hidden px-5 pb-24 pt-16 md:px-8 md:pt-20">
                <Reveal>
                    <Breadcrumb
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sections", href: "/sections" },
                            { label: section.title },
                        ]}
                    />
                </Reveal>

                {/* ═══════════════════════════════════════════════
            HERO — Preview image + Info side by side
        ═══════════════════════════════════════════════ */}
                <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:items-center">
                    {/* LEFT: Big clickable preview */}
                    <Reveal>
                        <button
                            onClick={() => requestAction("download")}
                            className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-panel text-left transition-colors hover:border-lime/50"
                            aria-label={`Download ${section.title}`}
                        >
                            {/* Browser chrome */}
                            <div className="flex items-center gap-3 border-b border-line bg-base/40 px-4 py-2.5">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-coral/50" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-lime/50" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-violet/50" />
                                </div>
                                <div className="mx-2 hidden flex-1 items-center gap-2 rounded-md border border-line bg-base px-2.5 py-1 font-mono text-[10px] text-muted sm:flex">
                                    <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    builtbysaurav.in/sections/{section.slug}
                                </div>
                                <span className="ml-auto rounded-md border border-lime/30 bg-lime/5 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-lime">
                                    {section.ext.replace(".", "")}
                                </span>
                            </div>

                            {/* Preview area */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(#22c55e08_1px,transparent_1px)] [background-size:20px_20px]">
                                {/* Fallback pattern — visible only if image fails */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-mono text-5xl font-bold text-lime/10 sm:text-7xl">
                                        {section.ext}
                                    </span>
                                </div>

                                {/* Image — always visible */}
                                <img
                                    src={section.previewImage}
                                    alt={`${section.title} preview`}
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                    className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />

                                {/* Always-visible download badge */}
                                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-lime/40 bg-base/90 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-lime backdrop-blur-sm">
                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                    </svg>
                                    {isUnlocked ? "download" : "unlock"}
                                </div>

                                {/* Hover hint — bottom slide-in */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-base via-base/90 to-transparent p-4 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="flex items-center justify-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-lime">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                        </svg>
                                        click to {isUnlocked ? "download" : "unlock & download"}
                                    </div>
                                </div>
                            </div>

                            {/* Footer strip */}
                            <div className="flex items-center justify-between border-t border-line bg-base/40 px-4 py-3">
                                <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
                                    <span className="text-lime">●</span>
                                    <span>{section.category}</span>
                                    <span>·</span>
                                    <span>{section.platform}</span>
                                </div>
                                <span className="font-mono text-[10px] text-muted">
                                    {formatDownloads(section.downloads)} downloads
                                </span>
                            </div>
                        </button>
                    </Reveal>

                    {/* RIGHT: Info + actions */}
                    <div className="min-w-0">
                        <Reveal>
                            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                                <span className="rounded-full border border-lime/30 bg-lime/5 px-2.5 py-1 text-lime">
                                    {section.category}
                                </span>
                                <span className="text-muted">·</span>
                                <span className="text-muted">{section.platform}</span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.05}>
                            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                                {section.title}
                            </h1>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                                {section.longDescription || section.description}
                            </p>
                        </Reveal>

                        {/* Actions */}
                        <Reveal delay={0.15}>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                {hasCode && (
                                    <>
                                        <button
                                            onClick={() => requestAction("download")}
                                            className="group flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-xs font-semibold text-black transition-all hover:gap-3"
                                        >
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                            </svg>
                                            download {section.ext}
                                        </button>

                                        <button
                                            onClick={() => requestAction("copy")}
                                            className="flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-2.5 font-mono text-xs text-ink transition-colors hover:border-lime hover:text-lime"
                                        >
                                            {copied ? (
                                                <>
                                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    copied
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
                                    </>
                                )}

                                {section.demoUrl && (
                                    <a
                                        href={section.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 rounded-full border border-violet/40 bg-violet/5 px-5 py-2.5 font-mono text-xs text-violet transition-colors hover:bg-violet/10"
                                    >
                                        live demo
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </Reveal>

                        {/* Quick facts — inline, no boxes */}
                        <Reveal delay={0.2}>
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 font-mono text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted">language</span>
                                    <span className="capitalize text-violet">{section.language}</span>
                                </div>
                                <div className="h-3 w-px bg-line" />
                                <div className="flex items-center gap-2">
                                    <span className="text-muted">file</span>
                                    <span className="text-ink">
                                        {section.slug}
                                        {section.ext}
                                    </span>
                                </div>
                                <div className="h-3 w-px bg-line" />
                                <div className="flex items-center gap-2">
                                    <span className="text-muted">lines</span>
                                    <span className="text-ink">{codeLines.length}</span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Compatibility + Tags inline */}
                        {(section.compatibility?.length > 0 || section.tags?.length > 0) && (
                            <Reveal delay={0.25}>
                                <div className="mt-6 flex flex-wrap items-center gap-2">
                                    {section.compatibility?.map((c) => (
                                        <span
                                            key={c}
                                            className="rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-[10px] text-muted"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                    {section.tags?.map((t) => (
                                        <span
                                            key={t}
                                            className="font-mono text-[10px] text-lime/70"
                                        >
                                            #{t.toLowerCase().replace(/\s+/g, "")}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        )}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════
            CODE — Always visible
        ═══════════════════════════════════════════════ */}
                {hasCode && (
                    <Reveal className="mt-20">
                        <div className="mb-4 flex items-end justify-between">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
                                    source
                                </p>
                                <h2 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">
                                    The full code
                                </h2>
                            </div>
                            <p className="hidden font-mono text-[10px] text-muted sm:block">
                                {codeLines.length} lines · {section.language}
                            </p>
                        </div>

                        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-[#0a0f1a]">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-line bg-[#060b14] px-4 py-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-coral/60" />
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime/60" />
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet/60" />
                                    <span className="ml-2 truncate font-mono text-[11px] text-muted">
                                        {section.slug}
                                        {section.ext}
                                    </span>
                                </div>

                                {isUnlocked ? (
                                    <button
                                        onClick={() => requestAction("copy")}
                                        className="shrink-0 rounded-full border border-line/60 px-3 py-1 font-mono text-[10px] text-muted transition-colors hover:border-lime hover:text-lime"
                                    >
                                        {copied ? "copied ✓" : "copy"}
                                    </button>
                                ) : (
                                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-lime/40 bg-lime/5 px-3 py-1 font-mono text-[10px] text-lime">
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth={2} />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4" />
                                        </svg>
                                        locked
                                    </span>
                                )}
                            </div>

                            {/* Code body */}
                            <div className="relative max-h-[600px] w-full overflow-y-auto overflow-x-hidden">
                                <div className="w-full p-4 font-mono text-[12px] leading-relaxed sm:text-[12.5px]">
                                    {visibleLines.map((line, i) => (
                                        <CodeLine key={i} line={line} index={i} />
                                    ))}

                                    {!isUnlocked && (
                                        <div className="relative mt-3">
                                            <div
                                                className="pointer-events-none select-none space-y-1 blur-[3px] opacity-30"
                                                aria-hidden="true"
                                            >
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <div key={i} className="flex w-full min-w-0 items-start">
                                                        <span
                                                            className="shrink-0 select-none pr-4 text-right text-muted/40"
                                                            style={{ minWidth: "2.75rem" }}
                                                        >
                                                            {PREVIEW_LINES + i + 1}
                                                        </span>
                                                        <span className="min-w-0 flex-1 break-all text-lime/40">
                                                            {"const hidden_line = () => { return null; }"}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/95 to-transparent pt-6">
                                                <motion.div
                                                    initial={{ scale: 0.85, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-lime/40 bg-lime/10 text-lime shadow-lg shadow-lime/10"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth={2} />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4" />
                                                    </svg>
                                                </motion.div>

                                                <p className="mt-3 font-display text-sm font-semibold text-ink">
                                                    Unlock the full code
                                                </p>
                                                <p className="mt-1 max-w-[260px] text-center font-mono text-[10px] leading-relaxed text-muted">
                                                    Enter your name &amp; email to reveal {codeLines.length - PREVIEW_LINES} more lines
                                                </p>

                                                <button
                                                    onClick={() => {
                                                        setPendingAction("unlock");
                                                        setGateOpen(true);
                                                    }}
                                                    className="mt-4 flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-[11px] font-semibold text-black transition-all hover:gap-3"
                                                >
                                                    unlock now
                                                    <span>→</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status bar */}
                            <div className="flex items-center justify-between border-t border-line bg-[#060b14] px-4 py-2 font-mono text-[10px] text-muted">
                                <span className="text-lime">● {section.language}</span>
                                <span>
                                    {visibleLines.length}/{codeLines.length} lines
                                </span>
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* ═══════════════════════════════════════════════
            FEATURES + INSTALL
        ═══════════════════════════════════════════════ */}
                {(section.features?.length > 0 || section.installation?.length > 0) && (
                    <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {section.features?.length > 0 && (
                            <Reveal>
                                <div>
                                    <div className="flex items-center gap-3 border-b border-line pb-3">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">01</span>
                                        <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                                            What's included
                                        </h2>
                                    </div>
                                    <ul className="mt-6 space-y-3">
                                        {section.features.map((f) => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-muted">
                                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lime" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        )}

                        {section.installation?.length > 0 && (
                            <Reveal delay={0.1}>
                                <div>
                                    <div className="flex items-center gap-3 border-b border-line pb-3">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet">02</span>
                                        <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                                            How to install
                                        </h2>
                                    </div>
                                    <ol className="mt-6 space-y-4">
                                        {section.installation.map((step, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-violet/30 bg-violet/5 font-mono text-[10px] font-bold text-violet">
                                                    {i + 1}
                                                </span>
                                                <p className="pt-0.5 text-sm leading-relaxed text-muted">{step}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </Reveal>
                        )}
                    </div>
                )}

                {/* ═══════════════════════════════════════════════
            RELATED
        ═══════════════════════════════════════════════ */}
                {related.length > 0 && (
                    <Reveal className="mt-20">
                        <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
                            <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                                More like this
                            </h2>
                            <Link
                                href="/sections"
                                className="font-mono text-xs text-muted transition-colors hover:text-lime"
                            >
                                all sections →
                            </Link>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                        />
                                        <span className="absolute right-2 top-2 rounded-md border border-lime/40 bg-black/60 px-2 py-0.5 font-mono text-[9px] text-lime backdrop-blur-sm">
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

                {/* ═══════════════════════════════════════════════
            BOTTOM CTA
        ═══════════════════════════════════════════════ */}
                <Reveal className="mt-20">
                    <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-panel p-8 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                                Want sections like these built for you?
                            </h2>
                            <p className="mt-2 text-sm text-muted">
                                Custom Shopify themes, sections, and apps tailored to your brand.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="group flex shrink-0 items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-black transition-all hover:gap-3"
                        >
                            hire me
                            <span>→</span>
                        </Link>
                    </div>
                </Reveal>
            </section>

            <SectionDownloadGate
                open={gateOpen}
                action={pendingAction}
                section={section}
                onClose={() => {
                    setGateOpen(false);
                    setPendingAction(null);
                }}
                onSuccess={handleGateSuccess}
            />
        </>
    );
}