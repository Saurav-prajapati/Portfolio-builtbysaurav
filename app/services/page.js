"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

const PROCESS = [
  { step: "Scope", detail: "We define what the site needs to do, for who, and by when." },
  { step: "Build", detail: "I build in the open — you can see progress as it happens, not just at the end." },
  { step: "Launch", detail: "Deploy, test on real devices, and hand off with docs you can actually use." },
  { step: "Support", detail: "Fixes and small changes after launch, so the site keeps working." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pt-24">
        <Reveal>
          <SectionLabel index="services.tsx">What I can build for you</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Five stacks. One point of contact.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl divide-y divide-line border-y border-line px-5 md:px-8">
        {siteConfig.services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.05}>
            <div className="grid gap-6 py-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12">
              <p className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <p className="font-mono text-xs text-lime">{service.code}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 max-w-xl text-muted">{service.description}</p>
              </div>
              <ul className="flex flex-col gap-2 font-mono text-xs text-muted md:min-w-[220px]">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1 text-lime">{"//"}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <Reveal>
          <SectionLabel index="01">How we'd work together</SectionLabel>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="rounded-lg border border-line bg-panel p-6">
                <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-20 md:px-8">
          <Reveal>
            <h2 className="max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
              Have a project in one of these stacks?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              data-cursor="mail"
              className="rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
            >
              start a project →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
