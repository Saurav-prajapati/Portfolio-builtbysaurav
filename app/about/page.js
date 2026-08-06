"use client";

import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <SectionLabel index="about.tsx">Who's building this</SectionLabel>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div>
            <Reveal>
              <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                {siteConfig.name}, {siteConfig.role.toLowerCase()}.
              </h1>
            </Reveal>
            <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-muted">
              {siteConfig.bio.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative flex aspect-[4/5] w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-line bg-panel font-mono text-xs text-muted">
              <span>photo.jpg — drop your headshot here</span>
              <Image
                src="/me.png"
                alt="Headshot"
                fill
                className="rounded-xl object-cover"
              />
              <span className="absolute left-4 top-4 h-2 w-2 rounded-full bg-lime animate-blink" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <Reveal>
            <SectionLabel index="01">Stack</SectionLabel>
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
          <SectionLabel index="02">Experience</SectionLabel>
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
