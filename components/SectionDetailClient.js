"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import SectionLabel from "@/components/SectionLabel";
import SectionDownloadGate from "@/components/SectionDownloadGate";

function formatDownloads(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n;
}

// Line fade-in for code lines
function CodeLine({ line, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -6 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25, delay: Math.min(index * 0.008, 0.4) }}
            className="flex w-full min-w-0 items-start"
        >
            <span
                className="shrink-0 select-none pr-4 text-right text-muted/40"
                style={{ minWidth: "2.75rem" }}
            >
                {index + 1}
            </span>
            <span className="min-w-0 flex-1 whitespace-pre-wrap break-words text-lime/90">
                {line || " "}
            </span>
        </motion.div>
    );
}

export default function SectionDetailClient({ section, allSections }) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("preview");

    const [gateOpen, setGateOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); // "download" | "copy" | "unlock"
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

    // Preview shows ~40% (min 8, max 20 lines)
    const PREVIEW_LINES = Math.max(
        8,
        Math.min(20, Math.ceil(codeLines.length * 0.4))
    );

    // ── Silent tracking helper ──
    const trackAction = (userData, action) => {
        if (!userData?.email) return;

        const trackKey = `bbs_tracked:${userData.email}:${section.slug}:${action}`;
        if (typeof window !== "undefined" && localStorage.getItem(trackKey)) {
            return;
        }

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
            .then(() => {
                localStorage.setItem(trackKey, "1");
            })
            .catch((err) => {
                console.warn("Track failed:", err);
            });
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
            // "unlock" doesn't need to do anything if already unlocked
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
        // "unlock" — nothing more needed, code reveals automatically

        setPendingAction(null);
    };

    const related = allSections
        .filter(
            (s) =>
                s.slug !== section.slug &&
                (s.category === section.category || s.platform === section.platform)
        )
        .slice(0, 3);

    // Lines visible based on unlock state
    const visibleLines = isUnlocked
        ? codeLines
        : codeLines.slice(0, PREVIEW_LINES);

    return (
        <>
            <section className="mx-auto max-w-6xl overflow-x-hidden px-5 pb-24 pt-16 md:px-8 md:pt-24">
                <Reveal>
                    <Breadcrumb
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sections", href: "/sections" },
                            { label: section.title },
                        ]}
                    />
                </Reveal>

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
                            <p className="mt-4 max-w-2xl font-display text-lg text-muted">
                                {section.longDescription || section.description}
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={0.15}>
                        <div className="flex flex-wrap items-center gap-3 md:justify-end">
                            {hasCode && (
                                <>
                                    <button
                                        onClick={() => requestAction("copy")}
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
                                        onClick={() => requestAction("download")}
                                        className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-lime px-5 py-2.5 font-mono text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
                                    >
                                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                        <svg className="relative h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                        </svg>
                                        <span className="relative">download {section.slug}{section.ext}</span>
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

                <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="min-w-0">
                        {/* Tabs */}
                        <div className="flex items-center gap-2 border-b border-line">
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`relative px-4 py-3 font-mono text-xs transition-colors ${activeTab === "preview" ? "text-lime" : "text-muted hover:text-ink"
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
                                    className={`relative px-4 py-3 font-mono text-xs transition-colors ${activeTab === "code" ? "text-lime" : "text-muted hover:text-ink"
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

                        {/* PREVIEW */}
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
                                        preview — {section.slug}
                                    </span>
                                </div>
                                <div className="relative aspect-video overflow-hidden bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:20px_20px]">
                                    <img
                                        src={section.previewImage}
                                        alt={`${section.title} preview`}
                                        className="h-full w-full object-cover"
                                        onError={(e) => (e.currentTarget.style.display = "none")}
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

                        {/* CODE — locked/unlocked */}
                        {activeTab === "code" && hasCode && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6 w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-[#0b1220]"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-line/60 bg-[#080e1a] px-4 py-2.5">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-coral/70" />
                                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime/60" />
                                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet/70" />
                                        <span className="ml-2 truncate font-mono text-[11px] text-muted">
                                            {section.slug}
                                            {section.ext}
                                        </span>
                                    </div>

                                    {/* Header status */}
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

                                        {/* Fake blurred tail + unlock CTA */}
                                        {!isUnlocked && (
                                            <div className="relative mt-3">
                                                {/* Blurred fake lines */}
                                                <div
                                                    className="pointer-events-none select-none space-y-1 blur-[3px] opacity-40"
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
                                                                {"lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-"}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Fade + unlock card */}
                                                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#0b1220] via-[#0b1220]/95 to-transparent pt-6">
                                                    <motion.div
                                                        initial={{ scale: 0.85, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                                                        className="flex h-12 w-12 items-center justify-center rounded-full border border-lime/40 bg-lime/10 text-lime shadow-lg shadow-lime/20"
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
                                                        Enter your name &amp; email to reveal the complete
                                                        {" "}{section.slug}
                                                        {section.ext} file
                                                    </p>

                                                    <button
                                                        onClick={() => {
                                                            setPendingAction("unlock");
                                                            setGateOpen(true);
                                                        }}
                                                        className="mt-4 flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-[11px] font-semibold text-black transition-transform hover:-translate-y-0.5"
                                                    >
                                                        unlock now
                                                        <span>→</span>
                                                    </button>

                                                    <p className="mt-2 font-mono text-[9px] text-muted">
                                                        {codeLines.length - PREVIEW_LINES} more lines hidden
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* FEATURES */}
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

                        {/* INSTALLATION */}
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

                    {/* SIDEBAR */}
                    <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
                        <Reveal>
                            <div className="rounded-2xl border border-line bg-panel p-5">
                                <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
                                    metadata
                                </p>
                                <dl className="mt-4 space-y-3 text-sm">
                                    <div className="flex items-center justify-between gap-3">
                                        <dt className="font-mono text-xs text-muted">platform</dt>
                                        <dd className="truncate font-mono text-xs capitalize text-ink">{section.platform}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <dt className="font-mono text-xs text-muted">category</dt>
                                        <dd className="truncate font-mono text-xs text-ink">{section.category}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <dt className="font-mono text-xs text-muted">language</dt>
                                        <dd className="truncate font-mono text-xs capitalize text-ink">{section.language}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <dt className="font-mono text-xs text-muted">file</dt>
                                        <dd className="truncate font-mono text-xs text-violet">
                                            {section.slug}{section.ext}
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
                                        onClick={() => requestAction("download")}
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

                        {section.compatibility?.length > 0 && (
                            <Reveal delay={0.05}>
                                <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
                                        compatible with
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {section.compatibility.map((c) => (
                                            <span key={c} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        {section.tags?.length > 0 && (
                            <Reveal delay={0.1}>
                                <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-lime">tags</p>
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
                                    get in touch <span>→</span>
                                </Link>
                            </div>
                        </Reveal>
                    </aside>
                </div>

                {/* RELATED */}
                {related.length > 0 && (
                    <Reveal className="mt-20">
                        <div className="mb-6 flex items-end justify-between">
                            <h2 className="font-display text-2xl font-semibold text-ink">More like this</h2>
                            <Link href="/sections" className="font-mono text-xs text-muted transition-colors hover:text-lime">
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
                                            onError={(e) => (e.currentTarget.style.display = "none")}
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

                {/* BOTTOM CTA */}
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