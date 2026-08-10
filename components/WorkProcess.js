"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";

const steps = [
    {
        number: "01",
        title: "Discovery Call",
        description:
            "We chat about your goals, audience, and project scope. No jargon, just clarity.",
        color: "from-lime to-lime",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Strategy & Planning",
        description:
            "We map out the architecture, tech stack, and timeline. You get a clear roadmap.",
        color: "from-lime to-lime",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Design & Prototype",
        description:
            "We create high‑fidelity mockups and interactive prototypes. You see it before we build it.",
        color: "from-lime to-lime",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Development",
        description:
            "Clean, performant code: Shopify themes, React apps, WordPress sites, or Java backends.",
        color: "from-lime to-lime",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        number: "05",
        title: "Testing & Revisions",
        description:
            "We test on real devices, fix any issues, and polish until you’re 100% satisfied.",
        color: "from-lime to-lime",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12l4-4" />
            </svg>
        ),
    },
    {
        number: "06",
        title: "Launch & Support",
        description:
            "We go live, monitor performance, and offer ongoing support.",
        color: "from-lime to-lime",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
];

function StepNode({ step, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Outer glow ring (active only on hover) */}
            <div
                className={`absolute -inset-2 rounded-full bg-gradient-to-r ${step.color} opacity-0 blur-md transition-all duration-300 ${isHovered ? "opacity-30 scale-150" : ""
                    }`}
            />

            {/* Main orb */}
            <div
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-line bg-panel text-ink transition-all duration-300 group hover:border-lime/50 hover:scale-110 ${isHovered ? "border-lime bg-lime/10 text-lime shadow-lg shadow-lime/20" : ""
                    }`}
            >
                {/* Subtle "?" hint – only visible when not hovered */}
                {!isHovered && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime/20 text-[10px] font-bold text-lime animate-pulse">
                        ?
                    </span>
                )}
                <span className="font-mono text-sm font-bold">{step.number}</span>
            </div>

            {/* Tooltip (visible on hover) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full mt-4 w-52 rounded-xl border border-line bg-panel/90 p-4 backdrop-blur-md shadow-xl z-20 pointer-events-none"
                style={{ left: "0%", transform: "translateX(-50%)", top: "-50px" }}
            >
                <div className="flex items-center gap-2 text-lime mb-1">
                    {step.icon}
                    <h4 className="font-display text-sm font-semibold text-ink">{step.title}</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed">{step.description}</p>
            </motion.div>
        </motion.div>
    );
}

export default function WorkProcessV2() {
    return (

        <>
            {/* Horizontal timeline – desktop */}
            <div className="relative hidden md:block">
                {/* Animated pulse line */}
                <div className="absolute left-0 right-0 top-7 h-0.5 bg-line">
                    <div className="h-full w-full bg-gradient-to-r bg-[length:200%_auto] animate-gradient" />
                </div>

                {/* Nodes – no activeStep state needed */}
                <div className="flex justify-between items-start relative z-10">
                    {steps.map((step, i) => (
                        <StepNode key={step.number} step={step} index={i} />
                    ))}
                </div>
            </div>

            {/* Mobile vertical timeline unchanged */}
            <div className="space-y-8 md:hidden">
                {steps.map((step, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                        <div className="flex items-start gap-4 p-4 rounded-xl border border-line bg-panel/60 hover:border-lime/30 transition-colors">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-base`}
                            >
                                <span className="font-mono text-sm font-bold">{step.number}</span>
                            </div>
                            <div>
                                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                                <p className="mt-1 text-sm text-muted">{step.description}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </>
    );
}