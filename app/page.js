"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import MarqueeStrip from "@/components/MarqueeStrip";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ProjectCard from "@/components/ProjectCard";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  const featured = siteConfig.projects.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <HeroSection />
      {/* <section className="dot-grid relative mx-auto flex max-w-6xl flex-col items-start gap-14 px-5 pb-20 pt-16 md:flex-row md:items-center md:pt-24 md:px-8">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
            {siteConfig.role} / {siteConfig.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {siteConfig.name}
            <span className="block text-outline">builds for the web.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 max-w-md text-lg leading-relaxed text-muted"
          >
            {siteConfig.tagline} From Shopify storefronts to Next.js apps — I ship across five
            stacks and keep every one of them fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex-1 md:pl-6"
        >
          <div className="animate-floaty">
            <TerminalWindow />
          </div>
        </motion.div>
      </section> */}

      <MarqueeStrip />

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal>
          <SectionLabel index="01">Selected work</SectionLabel>
        </Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              A few things I've shipped.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden sm:block">
            <Link
              href="/portfolio"
              data-cursor="view"
              className="font-mono text-sm text-muted transition-colors hover:text-lime"
            >
              all projects →
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <Reveal>
            <SectionLabel index="02">What I do</SectionLabel>
          </Reveal>
          <div className="grid gap-0 divide-y divide-line border-y border-line md:grid-cols-5 md:divide-x md:divide-y-0">
            {siteConfig.services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.06} className="group px-1 py-6 md:px-4">
                <p className="font-mono text-xs text-muted">{service.code}</p>
                <p className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-lime transition-colors">
                  {service.title}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8">
            <Link
              href="/services"
              data-cursor="view"
              className="font-mono text-sm text-muted transition-colors hover:text-lime"
            >
              see full services →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <Reveal>
            <SectionLabel index="03">Stack</SectionLabel>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.stack.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <div className="group rounded-lg border border-line bg-panel p-5 transition-colors hover:border-violet/60">
                  <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-lime transition-colors">
                    {s.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">{s.tag}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal>
          <SectionLabel index="04">Experience</SectionLabel>
        </Reveal>
        <div className="relative border-l border-line pl-8">
          {siteConfig.experience.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.1} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_12px_rgba(198,255,82,0.6)]" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted">{exp.period}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{exp.role}</h3>
              <p className="mt-1 font-mono text-sm text-violet">{exp.org}</p>
              <ul className="mt-4 flex flex-col gap-2 text-muted">
                {exp.points.map((p, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
