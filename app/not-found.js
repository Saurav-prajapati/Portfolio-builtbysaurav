// app/not-found.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      {/* Glitch 404 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <span className="font-display text-[10rem] font-bold leading-none text-lime sm:text-[14rem]">
          404
        </span>
      </motion.div>

      {/* Subtitle */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl"
      >
        Page not found
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 max-w-md text-muted"
      >
        Oops! The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.
      </motion.p>

      {/* Action buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/"
          className="rounded-full bg-lime px-8 py-3.5 font-mono text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
        >
          go home →
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-line px-8 py-3.5 font-mono text-sm text-ink transition-colors hover:border-lime hover:text-lime"
        >
          contact support
        </Link>
      </motion.div>
    </section>
  );
}