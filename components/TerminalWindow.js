"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getExperience = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();
  const months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  return `${years}+ years`;
};

const CODE_LINES = [
  { indent: 0, text: "const engineer = {" },

  { indent: 1, text: 'name: "Saurav Prajapati",' },
  { indent: 1, text: 'role: "Shopify & Frontend Developer",' },
  { indent: 1, text: `experience: "${getExperience("2022-09-01")}",` },
  { indent: 1, text: 'location: "Delhi, India",' },

  {
    indent: 1,
    text: 'stack: ["Shopify", "React", "Next.js", "TypeScript", "Node.js", "WordPress"],',
  },

  { indent: 1, text: 'speciality: "Performance & Scalable UI",' },
  { indent: 1, text: 'projectsDelivered: "50+",' },
  { indent: 1, text: 'shopifyStores: "20+",' },
  { indent: 1, text: 'shopifyApps: 2,' },

  { indent: 1, text: 'currently: "Shopify Developer @ Eglogics Softech",' },

  { indent: 1, text: 'status: "Open to Work",' },

  {
    indent: 1,
    text: 'availableFor: ["Full-time", "Freelance", "Contract"],',
  },

  { indent: 0, text: "};" },
];

// Types out the code line by line on mount — the hero's signature
// moment: a code editor that writes the intro for you.
export default function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    let line = 0;
    let char = 0;
    const interval = setInterval(() => {
      if (line >= CODE_LINES.length) {
        clearInterval(interval);
        return;
      }
      char += 1;
      setCharCount(char);
      if (char >= CODE_LINES[line].text.length) {
        line += 1;
        char = 0;
        setVisibleLines(line);
      }
    }, 14);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-xl border border-line bg-panel terminal-shadow"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
        <span className="ml-3 font-mono text-xs text-muted">profile.ts</span>
      </div>
      <pre className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-7 text-ink">
        {CODE_LINES.map((line, i) => {
          if (i > visibleLines) return null;
          const isCurrent = i === visibleLines;
          const text = isCurrent ? line.text.slice(0, charCount) : line.text;
          return (
            <div key={i} style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
              <span className={line.text.includes(":") ? "text-ink" : "text-violet"}>
                {colorize(text)}
              </span>
              {isCurrent && <span className="animate-blink text-lime">▍</span>}
            </div>
          );
        })}
      </pre>
    </motion.div>
  );
}

function colorize(text) {
  // Very small, purely-visual "syntax highlight" — not a real parser.
  const parts = text.split(/(".*?")/g);
  return parts.map((part, i) =>
    part.startsWith('"') ? (
      <span key={i} className="text-lime">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
