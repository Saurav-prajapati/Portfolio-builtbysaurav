"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";

export default function ExperienceTimeline() {
    return (
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <Reveal>
                <SectionLabel index="03">Where I've worked</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
                <h2 className="mb-12 font-display text-3xl font-semibold text-ink sm:text-4xl">
                    Professional journey.
                </h2>
            </Reveal>

            <div className="relative border-l-2 border-line ml-3 md:ml-6">
                {siteConfig.experience.map((exp, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                        <div className="mb-10 ml-6 md:ml-10 relative">
                            {/* Timeline dot */}
                            <span className="absolute -left-[calc(1.5rem+2px)] md:-left-[calc(2.5rem+2px)] top-1 h-4 w-4 rounded-full border-2 border-lime bg-panel" />

                            <span className="font-mono text-xs text-lime">{exp.period}</span>
                            <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                                {exp.role}
                            </h3>
                            <p className="font-mono text-sm text-muted">{exp.org}</p>

                            <ul className="mt-3 space-y-1.5">
                                {exp.points.map((point, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-muted">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet/60" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}