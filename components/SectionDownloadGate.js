"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SectionDownloadGate({
    open,
    action,          // "download" | "copy" | "unlock"
    section,
    onClose,
    onSuccess,
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        if (open) {
            setName("");
            setEmail("");
            setStatus("idle");
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("loading");
        setStatus("success");
        setTimeout(() => {
            onSuccess?.({ name: name.trim(), email: email.trim() });
            onClose?.();
        }, 500);
    };

    // Copy variations
    const heading =
        action === "download"
            ? "Get the code"
            : action === "copy"
                ? "Copy the code"
                : "Unlock the full code";

    const buttonLabel =
        action === "download"
            ? "Get the code"
            : action === "copy"
                ? "Copy the code"
                : "Unlock now";

    const subtext =
        action === "download"
            ? "Just drop your name and email — I’ll send you updates when new sections land."
            : action === "copy"
                ? "Just drop your name and email to copy this section — updates whenever new ones land."
                : "Enter your name and email to reveal the complete file. No spam, unsubscribe anytime.";

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-panel"
                    >
                        <div className="h-1 w-full bg-gradient-to-r from-lime via-violet to-lime bg-[length:200%_auto] animate-gradient" />

                        <button
                            onClick={onClose}
                            className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/40 hover:text-ink"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        <div className="p-6 sm:p-8">
                            <motion.div
                                initial={{ scale: 0.6, rotate: -8 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/10 text-lime"
                            >
                                {action === "copy" ? (
                                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                ) : action === "unlock" ? (
                                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="3" y="11" width="18" height="11" rx="2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                ) : (
                                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                    </svg>
                                )}
                            </motion.div>

                            <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
                                {heading}
                            </h2>
                            <p className="mt-2 text-sm text-muted">{subtext}</p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                                        name
                                    </label>
                                    <input
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="mt-2 w-full cursor-text rounded-lg border border-line bg-base px-4 py-3 font-mono text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-lime"
                                    />
                                </div>
                                <div>
                                    <label className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                                        email
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@email.com"
                                        className="mt-2 w-full cursor-text rounded-lg border border-line bg-base px-4 py-3 font-mono text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-lime"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                                >
                                    {status === "idle" && (
                                        <>
                                            {buttonLabel}
                                            <span>→</span>
                                        </>
                                    )}
                                    {status === "loading" && "just a sec…"}
                                    {status === "success" && "unlocked ✓"}
                                    {status === "error" && "try again"}
                                </button>
                            </form>

                            <p className="mt-5 text-center font-mono text-[10px] text-muted">
                                🔒 Your email is only used for updates — never sold.
                            </p>
                        </div>

                        <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-lime/10 blur-3xl" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}