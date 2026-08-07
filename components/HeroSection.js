"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import TerminalWindow from "@/components/TerminalWindow";
import { siteConfig } from "@/lib/siteConfig";

function DropText({ phrase, className }) {
    const characters = phrase.split("");

    return (
        <span className={className} style={{ display: "inline-block" }}>
            {characters.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    initial={{ y: -120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                        mass: 0.9,
                    }}
                    style={{
                        display: "inline-block",
                        whiteSpace: char === " " ? "pre" : "normal",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

export default function HeroSection() {
    const phrases = [
        "Builds Shopify stores.",
        "Designs stunning graphics.",
        "Crafts React apps.",
        "Edits engaging videos.",
        "Develops Java backends.",
        "Ships Next.js solutions.",
        "Optimizes WordPress.",
    ];

    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <section className="dot-grid relative">
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-14 px-5 pb-20 pt-16 md:flex-row md:items-center md:pt-24 md:px-8">
                {/* Left column */}
                <div className="flex-1">
                    {/* Status dot */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
                        {siteConfig.role} / {siteConfig.location}
                    </motion.p>

                    {/* Name with gradient */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        <span className="font-bold">{siteConfig.name}</span>
                        <span className="block text-outline text-5xl">
                            <AnimatePresence mode="wait">
                                <DropText key={phraseIndex} phrase={phrases[phraseIndex]} />
                            </AnimatePresence>
                        </span>
                    </motion.h1>

                    {/* Tagline – now shows the brand‑new message directly */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-7 max-w-md text-lg leading-relaxed text-muted font-display"
                    >
                        {siteConfig.tagline}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <Link
                            href="/portfolio"
                            data-cursor="view"
                            className="rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
                        >
                            view work →
                        </Link>
                        <Link
                            href="/contact"
                            data-cursor="mail"
                            className="rounded-full border border-line px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-lime hover:text-lime"
                        >
                            get in touch
                        </Link>
                        <a
                            href={siteConfig.resumeUrl}
                            download
                            className="rounded-full border border-line px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-violet hover:text-violet"
                        >
                            download cv
                        </a>
                    </motion.div>
                </div>

                {/* Right column – Terminal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full flex-1 md:pl-6 relative"
                >
                    <div className="animate-floaty relative z-0">
                        <TerminalWindow
                            commands={[
                                "whoami",
                                siteConfig.name,
                                "",
                                "role",
                                siteConfig.role,
                                "",
                                "location",
                                siteConfig.location,
                                "",
                                "stats",
                                ...siteConfig.stats.map((s) => `${s.value} ${s.label}`),
                                "",
                                "projects",
                                ...siteConfig.projects.map((p) => `— ${p.title}`),
                            ]}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}