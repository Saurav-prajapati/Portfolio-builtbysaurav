"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Sparkles,
    ArrowRight,
    TrendingUp,
    Zap,
    Activity,
    ShieldCheck,
    CheckCircle2,
    MousePointer,
    ShoppingBag,
    Code2,
    Palette,
    Camera,
} from "lucide-react";

export default function InteractiveHero() {
    const heroRef = useRef(null);
    const cardRef = useRef(null);
    const [activeMetric, setActiveMetric] = useState(0);

    const metrics = [
        { label: "Shopify Stores Shipped", val: "20+", trend: "Live & Scaling" },
        { label: "Avg. PageSpeed Score", val: "90+", trend: "Core Web Vitals" },
        { label: "Projects Delivered", val: "50+", trend: "Across 6 Services" },
    ];

    const services = [
        {
            title: "Shopify Development",
            status: "Custom Themes · OS 2.0",
            icon: ShoppingBag,
            color: "text-lime",
        },
        {
            title: "React & Next.js",
            status: "SSR · Headless Commerce",
            icon: Code2,
            color: "text-violet",
        },
        {
            title: "Graphic Design",
            status: "Branding · Packaging · Print",
            icon: Palette,
            color: "text-coral",
        },
        {
            title: "Video & Photography",
            status: "Edits · Product Shoots",
            icon: Camera,
            color: "text-lime",
        },
    ];

    // Auto-rotate metrics for dynamic visual feedback
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveMetric((prev) => (prev + 1) % metrics.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [metrics.length]);

    // High-performance mouse tracking via CSS variables (zero React re-renders)
    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        heroRef.current.style.setProperty("--mouse-x", x * 2);
        heroRef.current.style.setProperty("--mouse-y", y * 2);
        heroRef.current.style.setProperty("--px", `${e.clientX - rect.left}px`);
        heroRef.current.style.setProperty("--py", `${e.clientY - rect.top}px`);

        if (cardRef.current) {
            cardRef.current.style.transform = `rotateX(${y * -14}deg) rotateY(${x * 14}deg)`;
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        }
    };

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="dot-grid relative flex min-h-screen w-full select-none items-center justify-center overflow-hidden bg-base pt-16 pb-16 text-ink"
            style={{
                "--mouse-x": 0,
                "--mouse-y": 0,
                "--px": "50%",
                "--py": "50%",
            }}
        >
            {/* 1. Cursor spotlight — lime tint */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(700px circle at var(--px) var(--py), rgba(163, 230, 53, 0.10), transparent 80%)",
                }}
            />

            {/* 2. Interactive cyber grid */}
            <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"
                style={{
                    transform:
                        "translate3d(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -12px), 0)",
                }}
            />

            {/* 3. Ambient parallax glow orbs */}
            <div
                className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-lime/15 blur-[130px]"
                style={{
                    transform:
                        "translate3d(calc(var(--mouse-x) * 35px), calc(var(--mouse-y) * 35px), 0)",
                }}
            />
            <div
                className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-violet/15 blur-[140px]"
                style={{
                    transform:
                        "translate3d(calc(var(--mouse-x) * -40px), calc(var(--mouse-y) * -40px), 0)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-4">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    {/* ── LEFT COLUMN ── */}
                    <div className="space-y-8 text-center lg:col-span-7 lg:text-left">
                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/10 px-4 py-2 shadow-lg shadow-lime/5 backdrop-blur-xl"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
                            </span>
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-lime">
                                Full-Service Digital Studio
                            </span>
                            <span className="hidden text-line sm:inline">•</span>
                            <span className="hidden font-mono text-xs font-semibold text-muted sm:inline">
                                Shopify · React · Design
                            </span>
                        </motion.div>

                        {/* H1 — SEO optimized */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
                        >
                            {/* We build{" "}
                            <span className="relative inline-block bg-gradient-to-r from-lime via-violet to-lime bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                                Shopify stores
                            </span>
                            , React apps &amp; brands that{" "}
                            <span className="relative inline-block bg-gradient-to-r from-violet via-lime to-violet bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                                convert.
                            </span> */}
                            We build Shopify stores, React apps & brands that convert.
                        </motion.h1>

                        {/* Subtext — SEO rich */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0 font-display"
                        >
                            A full-service digital studio building high-performance{" "}
                            <strong className="font-semibold text-ink">Shopify stores</strong>, modern{" "}
                            <strong className="font-semibold text-ink">React &amp; Next.js apps</strong>,
                            WordPress websites, and brand-defining designs. From custom Liquid themes and
                            headless commerce to graphic design, video editing, and product photography —
                            everything your business needs to stand out online.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start"
                        >
                            <Link
                                href="/contact"
                                data-cursor="project"
                                className="rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
                            >Start a Project  →
                            </Link>

                            <Link
                                href="/services"
                                data-cursor="services"
                                className="rounded-full border border-line px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-lime hover:text-lime"
                            >Explore Services
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="mx-auto grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6 lg:mx-0"
                        >
                            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-muted">
                                <CheckCircle2 size={16} className="shrink-0 text-lime" />
                                <span>50+ Projects</span>
                            </div>
                            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-muted">
                                <ShieldCheck size={16} className="shrink-0 text-lime" />
                                <span>90+ PageSpeed</span>
                            </div>
                            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-muted">
                                <Activity size={16} className="shrink-0 text-lime" />
                                <span>24h Response</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── RIGHT COLUMN — 3D Interactive Card ── */}
                    <div className="relative flex justify-center lg:col-span-5">
                        <div
                            ref={cardRef}
                            className="relative w-full max-w-md rounded-3xl border border-line bg-gradient-to-b from-panel/90 via-panel/50 to-base/90 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-150 ease-out"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Terminal-style header */}
                            <div className="flex items-center justify-between border-b border-line pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-coral/80" />
                                    <div className="h-3 w-3 rounded-full bg-lime/80" />
                                    <div className="h-3 w-3 rounded-full bg-violet/80" />
                                    <span className="ml-2 font-mono text-[11px] font-bold text-muted">
                                        builtbysaurav.studio
                                    </span>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-md bg-lime/10 px-2 py-0.5 font-mono text-[10px] font-bold text-lime">
                                    <Activity size={10} className="animate-spin" />
                                    LIVE
                                </span>
                            </div>

                            {/* Cycling metric */}
                            <div className="group relative mt-6 overflow-hidden rounded-2xl border border-line bg-base/80 p-5 backdrop-blur-md">
                                <div className="absolute right-0 top-0 p-3 text-lime opacity-10 transition-opacity group-hover:opacity-20">
                                    <TrendingUp size={64} />
                                </div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                                    {metrics[activeMetric].label}
                                </span>
                                <div className="mt-2 flex items-baseline gap-2 text-4xl font-black tracking-tight text-ink">
                                    {metrics[activeMetric].val}
                                    <span className="rounded-full border border-lime/20 bg-lime/10 px-2 py-0.5 font-mono text-xs font-bold text-lime">
                                        {metrics[activeMetric].trend}
                                    </span>
                                </div>
                            </div>

                            {/* Services list */}
                            <div className="mt-4 space-y-2.5">
                                {services.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between rounded-xl border border-line/60 bg-panel/40 p-3.5 transition-all duration-300 hover:border-lime/40 hover:bg-panel/60"
                                            style={{ transform: `translateZ(${(idx + 1) * 12}px)` }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`rounded-lg border border-line bg-base p-2 ${item.color}`}
                                                >
                                                    <Icon size={16} />
                                                </div>
                                                <div>
                                                    <div className="font-mono text-xs font-bold text-ink">
                                                        {item.title}
                                                    </div>
                                                    <div className="font-mono text-[10px] text-muted">
                                                        {item.status}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-muted">
                                <span className="flex items-center gap-1.5">
                                    <MousePointer size={12} className="text-lime" />
                                    Mouse Reactive 3D
                                </span>
                                <span className="font-bold text-lime">Available for Work</span>
                            </div>

                            {/* Floating badge 1 */}
                            <div
                                className="absolute -right-6 -top-6 hidden items-center gap-2 rounded-2xl border border-lime/40 bg-panel/90 p-3 shadow-2xl backdrop-blur-xl sm:flex"
                                style={{
                                    transform:
                                        "translate3d(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px), 30px)",
                                }}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime/20 text-lime">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <div className="font-mono text-[11px] font-bold text-ink">
                                        6 Services
                                    </div>
                                    <div className="font-mono text-[9px] text-muted">One Studio</div>
                                </div>
                            </div>

                            {/* Floating badge 2 */}
                            <div
                                className="absolute -bottom-6 -left-6 hidden items-center gap-2.5 rounded-2xl border border-violet/40 bg-panel/90 p-3 shadow-2xl backdrop-blur-xl sm:flex"
                                style={{
                                    transform:
                                        "translate3d(calc(var(--mouse-x) * 25px), calc(var(--mouse-y) * 25px), 40px)",
                                }}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet/20 text-violet">
                                    <Sparkles size={14} />
                                </div>
                                <div>
                                    <div className="font-mono text-[11px] font-bold text-ink">
                                        Delhi, India
                                    </div>
                                    <div className="font-mono text-[9px] text-lime">
                                        Remote Worldwide
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}