"use client";

import Link from "next/link";

export default function Breadcrumb({ items }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 font-mono text-xs text-muted">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-lime transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-ink">{item.label}</span>
                        )}
                        {i < items.length - 1 && <span className="text-line">/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}