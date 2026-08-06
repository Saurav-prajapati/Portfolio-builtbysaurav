import { siteConfig } from "@/lib/siteConfig";

export default function MarqueeStrip() {
  const items = siteConfig.stack;
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-panel py-3">
      <div className="flex w-max animate-marquee gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-muted"
          >
            <span className="text-lime">{"//"}</span> {item.name}
            <span className="text-line">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
