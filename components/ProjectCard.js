"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    if (!project.fullImage) return;
    const container = containerRef.current;
    const img = imgRef.current;
    if (container && img) {
      const imgHeight = img.offsetHeight;
      const containerHeight = container.clientHeight;
      setScrollDistance(Math.max(0, imgHeight - containerHeight));
    }
  }, [project.fullImage]);

  const handleImageLoad = () => {
    if (containerRef.current && imgRef.current) {
      const imgHeight = imgRef.current.offsetHeight;
      const containerHeight = containerRef.current.clientHeight;
      setScrollDistance(Math.max(0, imgHeight - containerHeight));
    }
  };

  return (
    <motion.a
      href={project.link}
      data-cursor="view"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-panel p-4 transition-colors hover:border-violet/60 sm:p-6"
      target="_blank"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      {project.fullImage ? (
        <div
          ref={containerRef}
          className="relative -mx-4 -mt-4 mb-4 h-48 overflow-hidden bg-panel sm:-mx-6 sm:-mt-6 sm:mb-5 sm:h-60"
        >
          <motion.div
            className="w-full"
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -scrollDistance : 0 }}
            transition={{
              duration: isHovered ? 4 : 0.4,
              ease: "linear",
            }}
          >
            <img
              ref={imgRef}
              src={project.fullImage}
              alt={project.title}
              className="w-full"
              onLoad={handleImageLoad}
            />
          </motion.div>
          <div className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
            scroll
          </div>
        </div>
      ) : (
        <div className="relative -mx-4 -mt-4 mb-4 aspect-video overflow-hidden sm:-mx-6 sm:-mt-6 sm:mb-5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="min-w-0">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted sm:text-xs">
          <span>{String(index).padStart(2, "0")}</span>
          <span className="rounded-full border border-line px-2 py-0.5 text-lime">
            {project.stack}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-lime sm:mt-5 sm:text-2xl">
          {project.title}
        </h3>
      </div>

      {/* Tags & year */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 sm:mt-6">
        <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((t) => (
            <span key={t} className="font-mono text-[10px] text-muted sm:text-[11px]">
              #{t.toLowerCase().replace(/[\s./]/g, "")}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] text-muted sm:text-xs">{project.year}</span>
      </div>

      {/* Background glow */}
      <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet/0 blur-2xl transition-colors duration-300 group-hover:bg-violet/20" />
    </motion.a>
  );
}