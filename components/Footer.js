"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-panel">
      {/* status bar, like an editor's bottom bar */}
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-3 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
            available for work
          </span>
          <span>⎇ main</span>
          <span>build: passing</span>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>{siteConfig.location}</span>
          <span>© {year}</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-line px-5 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {"// next step"}
            </p>
            <Link
              href="/contact"
              data-cursor="mail"
              className="mt-3 block font-display text-4xl font-semibold leading-none text-ink transition-colors hover:text-lime sm:text-5xl"
            >
              Let's build something.
            </Link>
          </div>
          <div className="flex flex-col gap-2 font-mono text-sm text-muted">
            {siteConfig.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="visit"
                className="transition-colors hover:text-ink"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>Designed &amp; built by {siteConfig.name}</p>
          <p className="font-mono">{"<end-of-file/>"}</p>
        </div>
      </div>
    </footer>
  );
}
