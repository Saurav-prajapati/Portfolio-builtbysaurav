"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { siteConfig } from "@/lib/siteConfig";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export default function ContactPageClient() {
    const formRef = useRef(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        service: "",
        budget: "",
        message: "",
    });
    const [status, setStatus] = useState("idle");

    const update = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                    service: form.service || "Not specified",
                    budget: form.budget || "Not specified",
                    message: form.message,
                    time: new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "full",
                        timeStyle: "short",
                    }),
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );
            setStatus("success");
            setForm({ name: "", email: "", service: "", budget: "", message: "" });
        } catch (error) {
            console.error("EmailJS error:", error);
            setStatus("error");
        }
    };

    return (
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
            <Reveal>
                <SectionLabel index="contact.tsx">Get in touch</SectionLabel>
            </Reveal>
            <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
                {/* Left column */}
                <div>
                    <Reveal>
                        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                            Tell me about your project.
                        </h1>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-5 max-w-md text-lg text-muted">
                            Working on a Shopify store, a WordPress rebuild, or a React / Next.js app? Send the
                            details and I'll reply within a day or two.
                        </p>
                    </Reveal>

                    <Reveal delay={0.16} className="mt-10 flex flex-col gap-4 font-mono text-sm">
                        <a href={`mailto:${siteConfig.email}`} data-cursor="mail" className="flex items-center gap-3 text-ink transition-colors hover:text-lime">
                            <span className="text-muted">email</span> {siteConfig.email}
                        </a>
                        <a href={`tel:${siteConfig.phone}`} data-cursor="call" className="flex items-center gap-3 text-ink transition-colors hover:text-lime">
                            <span className="text-muted">phone</span> {siteConfig.phone}, +91 8881140487
                        </a>
                        <p className="flex items-center gap-3 text-ink">
                            <span className="text-muted">based in</span> {siteConfig.location}
                        </p>
                    </Reveal>

                    <Reveal delay={0.24} className="mt-10 flex flex-wrap gap-3">
                        {siteConfig.socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor="visit"
                                className="rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-lime hover:text-lime"
                            >
                                {s.label}
                            </a>
                        ))}
                    </Reveal>
                </div>

                {/* Form – same as before */}
                <Reveal delay={0.1}>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="rounded-xl border border-line bg-panel p-6 terminal-shadow sm:p-8"
                    >
                        <div className="mb-6 flex items-center gap-2 border-b border-line pb-4">
                            <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-lime/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
                            <span className="ml-3 font-mono text-xs text-muted">new-message.tsx</span>
                        </div>

                        <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                            name
                        </label>
                        <input
                            required
                            value={form.name}
                            onChange={update("name")}
                            placeholder="Your name"
                            className="mt-2 w-full rounded-md border border-line bg-base px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-lime"
                        />

                        <label className="mt-5 block font-mono text-xs uppercase tracking-wider text-muted">
                            email
                        </label>
                        <input
                            required
                            type="email"
                            value={form.email}
                            onChange={update("email")}
                            placeholder="you@email.com"
                            className="mt-2 w-full rounded-md border border-line bg-base px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-lime"
                        />

                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                                service needed
                                </label>
                                <select
                                value={form.service}
                                onChange={update("service")}
                                className="mt-2 w-full rounded-md border border-line bg-base px-4 py-3 text-ink outline-none transition-colors focus:border-lime font-mono text-sm"
                                >
                                <option value="">Select a service</option>
                                <option value="Shopify Development">Shopify Development</option>
                                <option value="React / Next.js App">React / Next.js App</option>
                                <option value="WordPress Website">WordPress Website</option>
                                <option value="HTML/CSS/JS Frontend">HTML/CSS/JS Frontend</option>
                                <option value="Graphic Design / Video Editing">Graphic Design / Video Editing</option>
                                <option value="Java Backend Development">Java Backend Development</option>
                                <option value="Other / Not sure">Other / Not sure</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                                budget range
                                </label>
                                <select
                                value={form.budget}
                                onChange={update("budget")}
                                className="mt-2 w-full rounded-md border border-line bg-base px-4 py-3 text-ink outline-none transition-colors focus:border-lime font-mono text-sm"
                                >
                                <option value="">Select a budget</option>
                                <option value="$100 - $500">$100 – $500</option>
                                <option value="$500 - $1,000">$500 – $1,000</option>
                                <option value="$1,000 - $3,000">$1,000 – $3,000</option>
                                <option value="$3,000 - $5,000">$3,000 – $5,000</option>
                                <option value="$5,000+">$5,000+</option>
                                <option value="Not sure yet">Not sure yet</option>
                                </select>
                            </div>
                            </div>

                        <label className="mt-5 block font-mono text-xs uppercase tracking-wider text-muted">
                            project details
                        </label>
                        <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={update("message")}
                            placeholder="What are you building, and what stack is it in?"
                            className="mt-2 w-full resize-none rounded-md border border-line bg-base px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-lime"
                        />

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            data-cursor="send"
                            className="mt-6 w-full rounded-full bg-lime px-6 py-3 font-mono text-sm font-semibold text-base transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "idle" && "send message →"}
                            {status === "loading" && "sending…"}
                            {status === "success" && "message sent ✓"}
                            {status === "error" && "error – try again"}
                        </button>

                        {status === "success" && (
                            <p className="mt-3 text-center font-mono text-xs text-lime">
                                Thanks! I’ll get back to you within 24 hours.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="mt-3 text-center font-mono text-xs text-coral">
                                Something went wrong. Please email me directly:{" "}
                                <a href={`mailto:${siteConfig.email}`} className="underline">
                                    {siteConfig.email}
                                </a>
                            </p>
                        )}
                        {status === "idle" && (
                            <p className="mt-3 text-center font-mono text-[11px] text-muted">
                                I'll reply within 24 hours.
                            </p>
                        )}
                    </form>
                </Reveal>
            </div>
        </section>
    );
}