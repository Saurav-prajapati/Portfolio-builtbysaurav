"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/siteConfig";

function ExperienceItem({ exp, index, isLast }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative pl-8 sm:pl-12"
        >
            {/* Timeline dot */}
            <span className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center sm:left-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/40" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-lime bg-base" />
            </span>

            {/* Vertical line (except last item) */}
            {!isLast && (
                <span className="absolute left-[5px] top-4 h-full w-px bg-line sm:left-[7px]" />
            )}

            <div className="pb-12">
                {/* Period badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-lime">
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {exp.period}
                </span>

                {/* Role + Org */}
                <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
                    {exp.role}
                </h3>
                <p className="mt-1 font-mono text-xs text-violet sm:text-sm">
                    @ {exp.org}
                </p>

                {/* Points list */}
                <ul className="mt-4 space-y-2">
                    {exp.points?.map((point, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                        >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime/60" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.li>
    );
}

export default function ExperienceTimeline() {
    const experience = siteConfig.experience || [];

    if (!experience.length) return null;

    return (
        <section className="border-t border-line bg-base">
            <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
                <Reveal>
                    <SectionLabel index="experience.tsx">Where We've Worked</SectionLabel>
                </Reveal>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
                    {/* Left: sticky heading */}
                    <div className="lg:sticky lg:top-24 lg:h-fit">
                        <Reveal delay={0.05}>
                            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                                A track record of
                                <br />
                                <span className="bg-gradient-to-r from-lime to-violet bg-clip-text text-transparent">
                                    shipping real work.
                                </span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                                From freelance projects to full-time roles, here's where the
                                craft has been built over the years.
                            </p>
                        </Reveal>
                    </div>

                    {/* Right: timeline */}
                    <ol className="relative min-w-0">
                        {experience.map((exp, i) => (
                            <ExperienceItem
                                key={`${exp.org}-${i}`}
                                exp={exp}
                                index={i}
                                isLast={i === experience.length - 1}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}