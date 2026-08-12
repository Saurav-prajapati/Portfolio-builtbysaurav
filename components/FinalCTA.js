"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function FinalCTA() {
    return (
        <section className="relative overflow-hidden border-t border-line bg-base py-20">
            {/* Background subtle glow – still dark and clean */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[30rem] w-[30rem] rounded-full bg-violet/5 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
                <Reveal>
                    <div className="flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
                        {/* ── LEFT COLUMN – content ── */}
                        <div className="max-w-2xl">
                            <Reveal>
                                <span className="inline-block rounded-full border border-lime/40 bg-lime/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-lime">
                                    Let&apos;s ship it
                                </span>
                            </Reveal>

                            <Reveal delay={0.05}>
                                <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                                    Ready to build
                                    <br />
                                    <span className="bg-gradient-to-r from-lime to-lime bg-clip-text text-transparent">
                                        something iconic?
                                    </span>
                                </h2>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                                    One message is all it takes to turn your idea into a live,
                                    high‑performing project. I&apos;m ready – you?
                                </p>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
                                    <span className="flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-lime" /> 24‑hour reply
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-violet" /> 50+ projects
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-lime" /> 100% satisfaction
                                    </span>
                                </div>
                            </Reveal>
                        </div>

                        {/* ── RIGHT COLUMN – stacked buttons ── */}
                        <div className="flex flex-col gap-4 sm:min-w-[280px]">
                            <Reveal delay={0.15}>
                                <Link
                                    href="/contact"
                                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-lime px-8 py-5 font-mono text-base font-semibold text-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-lime/20"
                                >
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-lime to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                    <span className="relative flex items-center gap-2">
                                        Start a project
                                        <motion.span
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                </Link>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <Link
                                    href="/portfolio"
                                    className="group flex items-center justify-center gap-2 rounded-full border border-line bg-panel/60 px-8 py-5 font-mono text-sm text-ink transition-all hover:border-lime hover:text-lime hover:scale-105 backdrop-blur"
                                >
                                    <span>See past work</span>
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                                </Link>
                            </Reveal>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}