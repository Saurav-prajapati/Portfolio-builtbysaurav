"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Breadcrumb from "@/components/Breadcrumb";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechStackGrid from "@/components/TechStackGrid";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/lib/siteConfig";
import MarqueeStrip from "./MarqueeStrip";

// ──────────────────────────────────────────────
// Animated counter
// ──────────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 1.8 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const increment = target / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

const values = [
    {
        num: "01",
        title: "Ship fast, not sloppy",
        desc: "Tight deadlines don’t mean cutting corners. We write clean, tested code and deliver on time.",
        accent: "from-lime to-emerald-400",
    },
    {
        num: "02",
        title: "Design is not decoration",
        desc: "Every pixel earns its place. Hierarchy, rhythm, and micro-interactions that feel premium.",
        accent: "from-violet to-purple-400",
    },
    {
        num: "03",
        title: "Performance is a feature",
        desc: "90+ PageSpeed, Core Web Vitals passing, instant interactions. Fast sites convert better.",
        accent: "from-coral to-rose-400",
    },
    {
        num: "04",
        title: "One studio, zero handoff",
        desc: "Strategy, design, development, launch — all under one roof. No agency ping-pong.",
        accent: "from-cyan-400 to-blue-500",
    },
];

export default function AboutPageClient() {
    const marqueeWords = [
        "Craft",
        "Performance",
        "Precision",
        "Design",
        "Ship",
        "Scale",
        "Detail",
        "Speed",
    ];

    return (
        <>
            {/* ═════════════════════════ STORY — Editorial with photo ══════════════════════════════ */}
            <section className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
                <Reveal>
                    <SectionLabel index="01">The Story</SectionLabel>
                </Reveal>

                <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
                    {/* Left: photo */}
                    <Reveal>
                        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-panel">
                                <img
                                    src="/me.png"
                                    alt="Saurav Prajapati"
                                    className="h-full w-full object-cover"
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:16px_16px]">
                                    <span className="font-mono text-5xl font-bold text-lime/20">SP</span>
                                    <p className="font-mono text-[10px] text-muted">
                                        add /public/about/saurav.webp
                                    </p>
                                </div>
                            </div>

                            {/* Signature strip under photo */}
                            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                    saurav prajapati
                                </p>
                                <p className="font-mono text-[10px] text-lime">
                                    est. 2022
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right: bio */}
                    <div className="min-w-0">
                        {siteConfig.bio.map((para, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <p
                                    className={`leading-relaxed ${i === 0
                                            ? "mb-5 text-base text-ink sm:text sm:leading-relaxed"
                                            : "mb-5 text-base text-ink sm:text sm:leading-relaxed"
                                        }`}
                                >
                                    {para}
                                </p>
                            </Reveal>
                        ))}

                        {/* ── Unified info grid ── */}
                        <Reveal delay={0.15}>
                            <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-panel/40">
                                {/* Top row: quick facts */}
                                <div className="grid grid-cols-2 divide-x divide-line">
                                    {[
                                        { label: "Based in", value: "Delhi, India" },
                                        { label: "Availability", value: "Open" },
                                    ].map((fact, i) => (
                                        <div key={fact.label} className="p-3 sm:p-4">
                                            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                                {fact.label}
                                            </p>
                                            <p
                                                className={`mt-1 truncate font-mono text-xs font-semibold sm:text-sm ${fact.value === "Open" ? "text-lime" : "text-ink"
                                                    }`}
                                            >
                                                {fact.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-line" />

                                {/* Bottom row: stats */}
                                <div className="grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
                                    {siteConfig.stats.map((stat, i) => {
                                        const match = String(stat.value).match(/^(\d+)/);
                                        const num = match ? parseInt(match[1], 10) : 0;
                                        const suffix = String(stat.value).replace(/^\d+/, "");

                                        return (
                                            <div key={stat.label} className="p-4 sm:p-5">
                                                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                                                    {num ? <CountUp target={num} suffix={suffix} /> : stat.value}
                                                </p>
                                                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Reveal>

                        {/* CTAs */}
                        <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/portfolio"
                                className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-lime hover:text-lime"
                            >
                                see our work
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 font-mono text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
                            >
                                start a project
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ Marquee strip ═══════════════════════ */}
            <MarqueeStrip />

            {/* ════════════════════════════ VALUES ══════════════════════════════ */}
            <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
                <Reveal>
                    <SectionLabel index="02">How we think</SectionLabel>
                </Reveal>

                <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:justify-between">
                    <Reveal delay={0.05}>
                        <h2 className="max-w-xl font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                            Four principles that guide every project.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="max-w-xs text-xs text-muted sm:text-sm md:text-right">
                            Rules we build by — no exceptions.
                        </p>
                    </Reveal>
                </div>

                {/* Numbered editorial list with always-visible accents */}
                <div className="mt-12 divide-y divide-line border-y border-line">
                    {values.map((v, i) => {
                        const icons = [
                            // Rocket — ship fast
                            <svg key="1" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                            </svg>,
                            // Palette — design
                            <svg key="2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                            </svg>,
                            // Lightning — performance
                            <svg key="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>,
                            // Box — one studio
                            <svg key="4" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                            </svg>,
                        ];

                        return (
                            <Reveal key={v.num} delay={i * 0.05}>
                                <div className="group relative grid grid-cols-[auto_1fr] gap-5 py-6 transition-colors hover:bg-panel/30 sm:grid-cols-[auto_80px_1fr_auto] sm:gap-8 sm:py-8">
                                    {/* Left accent bar (always visible, brightens on hover) */}
                                    <div className="absolute left-0 top-0 h-full w-[2px] bg-line transition-colors group-hover:bg-lime" />

                                    {/* Icon with gradient ring */}
                                    <div className="ml-4 flex items-start sm:ml-6">
                                        <div
                                            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-muted transition-all duration-300 group-hover:border-lime/40 group-hover:bg-lime/5 group-hover:text-lime`}
                                        >
                                            {/* Always-visible gradient dot */}
                                            <span
                                                className={`absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gradient-to-br ${v.accent}`}
                                            />
                                            {icons[i]}
                                        </div>
                                    </div>

                                    {/* Number */}
                                    <div className="hidden items-start sm:flex">
                                        <span className="font-mono text-xs font-bold text-muted/60 transition-colors group-hover:text-lime">
                                            /{v.num}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0">
                                        <div className="flex items-baseline gap-3">
                                            {/* Mobile-only number */}
                                            <span className="font-mono text-[11px] font-bold text-muted/60 sm:hidden">
                                                /{v.num}
                                            </span>
                                            <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-lime sm:text-xl">
                                                {v.title}
                                            </h3>
                                        </div>
                                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                                            {v.desc}
                                        </p>
                                    </div>

                                    {/* Gradient accent line (draws on hover) */}
                                    <div className="hidden items-center justify-end sm:flex">
                                        <span
                                            className={`h-px w-12 origin-right scale-x-0 bg-gradient-to-r ${v.accent} transition-transform duration-500 group-hover:scale-x-100`}
                                        />
                                    </div>

                                    {/* Hover glow — soft radial on the right */}
                                    <div className="pointer-events-none absolute right-0 top-0 h-full w-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="absolute right-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-lime/10 blur-3xl" />
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Bottom summary strip — always visible, adds visual weight */}
                <Reveal delay={0.3}>
                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel/40 p-5">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/40" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
                            </span>
                            <p className="font-mono text-xs text-muted">
                                Same rules, every project. No shortcuts.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="group flex items-center gap-2 font-mono text-xs text-lime"
                        >
                            start a project
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* ═════════════════════════════════ EXPERIENCE ═══════════════════════════════════ */}
            {/* <ExperienceTimeline /> */}

            {/* ════════════════════════════ STACK ═════════════════════════════ */}
            <TechStackGrid />

            {/* ════════════════════════ FINAL CTA ══════════════════════════════ */}
            <FinalCTA />
        </>
    );
}