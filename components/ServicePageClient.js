"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

// Reusable fade-up animation wrapper
function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children for lists
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};
const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function ServicePage({ params }) {
  const { slug } = params;
  const service = (siteConfig.serviceinner || siteConfig.services).find(
    (s) => s.slug === slug
  );
  if (!service) notFound();

  // Parallax for the hero image
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Stats (example – you can replace with real data or make dynamic)
  const stats = [
    { value: service.deliverables?.length || 0, label: "Deliverables" },
    { value: service.process?.length || 0, label: "Process Steps" },
    { value: service.faqs?.length || 0, label: "FAQs" },
  ];

  return (
    <section className="overflow-hidden">
      {/* ─── HERO ─── */}
      <div
        ref={heroRef}
        className="relative mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-24"
      >
        <Reveal>
          <SectionLabel index={service.code}>{service.title}</SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-12 md:grid-cols-[1fr_1fr]">
          {/* Left column */}
          <div>
            <Reveal>
              <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                {service.longDescription || service.description}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-8 py-3.5 font-mono text-sm font-semibold text-base transition-all hover:-translate-y-0.5 hover:shadow-lime/20"
                >
                  enquire now
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
                <a
                  href="#process"
                  className="rounded-full border border-line px-8 py-3.5 font-mono text-sm text-ink transition-colors hover:border-lime hover:text-lime"
                >
                  how we work
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right – floating image */}
          <Reveal delay={0.05}>
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-panel"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
            </motion.div>
          </Reveal>
        </div>
      </div>

      {/* ─── DELIVERABLES ─── */}
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <AnimatedSection>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
            What you get
          </h2>
        </AnimatedSection>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {service.deliverables.map((d, i) => (
            <motion.li
              key={i}
              variants={item}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group rounded-xl border border-line bg-panel/60 p-6 backdrop-blur transition-colors hover:border-lime/40"
            >
              <span className="font-mono text-2xl font-bold text-lime/30 group-hover:text-lime transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-mono text-sm text-ink">{d}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* ─── PROCESS ─── */}
      <div id="process" className="border-t border-line bg-panel/40 py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <AnimatedSection>
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
              How we work
            </h2>
          </AnimatedSection>

          <div className="mt-12 space-y-10 md:space-y-0 md:grid md:grid-cols-5 md:gap-6">
            {service.process.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative pl-10 md:pl-0 md:pt-10">
                  {/* Vertical line on mobile, horizontal on desktop */}
                  <div className="absolute left-4 top-0 h-full w-px bg-lime/20 md:left-0 md:top-4 md:h-px md:w-full" />
                  <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-lime text-sm font-bold text-base md:left-1/2 md:-translate-x-1/2 md:-top-4">
                    {i + 1}
                  </span>
                  <h3 className="font-mono text-sm font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="rounded-xl border border-line bg-panel p-6 text-center backdrop-blur">
                <div className="font-display text-4xl font-bold text-lime sm:text-5xl">
                  <CountUp target={stat.value} />
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ─── FAQ ─── */}
      {service.faqs?.length > 0 && (
        <div className="border-t border-line bg-panel/20 py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <AnimatedSection>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-lime">
                Frequently asked
              </h2>
            </AnimatedSection>
            <div className="mt-8 divide-y divide-line border-t border-line">
              {service.faqs.map((faq, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <details className="group py-5">
                    <summary className="flex cursor-pointer items-center justify-between font-mono text-sm font-medium text-ink transition-colors hover:text-lime">
                      {faq.question}
                      <motion.span
                        className="text-muted group-open:rotate-45 transition-transform"
                        initial={{ rotate: 0 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </details>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── BOTTOM CTA ─── */}
      <div className="relative overflow-hidden border-t border-line py-20">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-96 w-96 rounded-full bg-lime/10 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
              Ready to build something great?
            </h2>
            <p className="mt-4 text-lg text-muted">
              Let’s discuss your project and create a custom plan that fits your business.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-10 py-4 font-mono text-sm font-semibold text-base transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-lime/20"
            >
              start your project
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Simple count‑up effect
function CountUp({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / 40; // slower for bigger numbers
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
}