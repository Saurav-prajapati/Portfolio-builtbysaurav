"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";

const TABS = [
  { href: "/", file: "home.tsx" },
  { href: "/about", file: "about.tsx" },
  { href: "/portfolio", file: "portfolio.tsx" },
  { href: "/services", file: "services.tsx" },
  { href: "/contact", file: "contact.tsx" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8">
        {/* fake window controls, like a code editor titlebar */}
        <div className="flex items-center gap-4 py-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
          </div>
          <Link
            href="/"
            data-cursor="home"
            className="font-mono text-sm font-medium tracking-tight text-ink"
          >
            ~/{siteConfig.handle.replace("@", "")}
          </Link>
        </div>

        {/* tab bar nav, desktop */}
        <nav className="hidden items-stretch md:flex">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                data-cursor="open"
                className={`group relative flex items-center gap-2 border-r border-line px-4 py-3 font-mono text-[13px] transition-colors ${
                  active ? "bg-panel text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    active ? "bg-lime" : "bg-line group-hover:bg-violet"
                  }`}
                />
                {tab.file}
                {active && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-lime"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 py-3 md:flex">
          <a
            href={`mailto:${siteConfig.email}`}
            data-cursor="mail"
            className="rounded-full border border-line px-4 py-1.5 font-mono text-xs text-ink transition-colors hover:border-lime hover:text-lime"
          >
            let's talk
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          data-cursor="menu"
          className="flex flex-col gap-1.5 py-3 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-[2px] w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-panel md:hidden"
          >
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 border-b border-line px-5 py-4 font-mono text-sm ${
                  pathname === tab.href ? "text-lime" : "text-ink"
                }`}
              >
                <span className="text-muted">{"//"}</span> {tab.file}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
