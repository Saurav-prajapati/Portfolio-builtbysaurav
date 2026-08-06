"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ProjectCard from "@/components/ProjectCard";

// Optional display mapping (as before)
const stackDisplayNames = {
  Wordpress: "WordPress",
  Shopify: "Shopify",
  React: "React",
  "Next.js": "Next.js",
  "HTML/CSS/JS": "HTML/CSS/JS",
};

export default function PortfolioPage() {
  const [activeStack, setActiveStack] = useState("All");
  const [activeYear, setActiveYear] = useState("All");

  // 1. Unique stacks from data
  const uniqueStacks = useMemo(() => {
    const raw = siteConfig.projects.map((p) => p.stack);
    return ["All", ...Array.from(new Set(raw))];
  }, []);

  // 2. Unique years from data (sorted descending)
  const years = useMemo(() => {
    const raw = siteConfig.projects.map((p) => p.year);
    const unique = Array.from(new Set(raw)).sort((a, b) => b.localeCompare(a));
    return ["All", ...unique];
  }, []);

  // 3. Filtered projects – both stack and year
  const projects = useMemo(() => {
    return siteConfig.projects.filter((p) => {
      const stackMatch = activeStack === "All" || p.stack === activeStack;
      const yearMatch = activeYear === "All" || p.year === activeYear;
      return stackMatch && yearMatch;
    });
  }, [activeStack, activeYear]);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
      <Reveal>
        <SectionLabel index="portfolio.tsx">Everything I've shipped</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Projects across {uniqueStacks.length - 1} stacks.
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Filter by technology and year.
        </p>
      </Reveal>

      {/* Filter row: stack buttons + year dropdown */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        {/* Stack filters */}
        <div className="flex flex-wrap gap-2">
          {uniqueStacks.map((stack) => (
            <button
              key={stack}
              onClick={() => setActiveStack(stack)}
              data-cursor="filter"
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${activeStack === stack
                  ? "border-lime bg-lime text-base"
                  : "border-line text-muted hover:border-violet/60 hover:text-ink"
                }`}
            >
              {stackDisplayNames[stack] || stack}
            </button>
          ))}
        </div>

        {/* Year filter */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted">Year:</span>
          <select
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
            className="rounded-full border border-line bg-panel px-4 py-2 font-mono text-xs text-ink outline-none focus:border-lime transition-colors cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 6) * 0.06}>
            <ProjectCard project={project} index={i + 1} />
          </Reveal>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="mt-16 text-center font-mono text-sm text-muted">
          No projects match the current filters.
        </p>
      )}
    </section>
  );
}