"use client";

import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/siteConfig";

function CountUp({ target, suffix = "", duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

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

export default function WhyWork() {

    return (
        <>

            {/* Bento grid with icons & animated counters */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
                {siteConfig.differentiators.map((item, i) => {
                    const isLarge = i === 2 || i === 4;
                    const isTall = i === 0 || i === 3;
                    let cardClasses = "col-span-1 row-span-1";
                    if (isLarge) cardClasses = "col-span-1 row-span-1 md:row-span-2";
                    if (isTall) cardClasses = "col-span-1 row-span-2";

                    return (
                        <Reveal key={item.id} delay={i * 0.08} className={cardClasses}>
                            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-lime/30 hover:shadow-xl hover:shadow-lime/5">
                                {/* Gradient top line */}
                                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r" />

                                {/* Icon & number */}
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime/10 text-lime transition-all duration-300 group-hover:scale-110 group-hover:bg-lime/20">
                                        {item.icon}
                                    </div>
                                    <div className="font-display text-4xl font-bold text-ink sm:text-5xl">
                                        <CountUp target={item.number} suffix={item.suffix} />
                                    </div>
                                </div>

                                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                                    {item.label}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted flex-1">
                                    {item.description}
                                </p>

                                {/* Animated corner glow */}
                                <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-lime/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-lime/10" />
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            {/* Animated marquee */}
            <Reveal delay={0.4} className="mt-12">
                <div className="overflow-hidden rounded-xl border border-line bg-panel/40 py-4">
                    <div className="flex animate-marquee space-x-8 whitespace-nowrap font-mono text-sm text-muted">
                        {["Shopify", "React", "Next.js", "WordPress", "Graphic Design", "Video Editing", "Java", "Photography", "Performance", "UX", "Figma", "App Design", "Java Backend"].map(
                            (word) => (
                                <span key={word} className="inline-block">
                                    {word} ✦
                                </span>
                            )
                        )}
                    </div>
                </div>
            </Reveal>
        </>
    );
}