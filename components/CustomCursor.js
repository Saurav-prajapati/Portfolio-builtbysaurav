"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// The signature interaction of the site: a cursor that behaves like a
// code editor's caret + inspector readout. It reads data-cursor
// attributes off whatever it's hovering to change label/shape.
export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [hoverLabel, setHoverLabel] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 900, damping: 50, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 900, damping: 50, mass: 0.4 });

  const trailX = useSpring(mx, { stiffness: 200, damping: 30, mass: 0.6 });
  const trailY = useSpring(my, { stiffness: 200, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setIsFinePointer(fine);
    if (!fine) return;

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target.closest("[data-cursor]");
      setHoverLabel(target ? target.getAttribute("data-cursor") : null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFinePointer) return null;

  const isHover = Boolean(hoverLabel);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {/* trailing ghost */}
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="rounded-full border border-violet/40"
          style={{ width: isHover ? 56 : 28, height: isHover ? 56 : 28, transition: "width .25s, height .25s" }}
        />
      </motion.div>

      {/* primary caret / bracket */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        animate={{ opacity: visible ? 1 : 0 }}
      >
        {isHover ? (
          <div className="flex items-center gap-1 rounded-full bg-lime px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-base shadow-[0_0_30px_rgba(198,255,82,0.5)]">
            <span>{`</>`}</span>
            <span>{hoverLabel}</span>
          </div>
        ) : (
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 rounded-full bg-lime" />
            <span className="absolute h-[1px] w-4 bg-lime/70" />
            <span className="absolute h-4 w-[1px] bg-lime/70" />
          </div>
        )}
      </motion.div>

      {/* coordinate readout, like an editor's Ln/Col indicator */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed left-0 top-0 hidden translate-x-4 translate-y-4 font-mono text-[10px] text-muted md:block"
        animate={{ opacity: visible && !isHover ? 0.6 : 0 }}
      >
        x:{Math.round(pos.x)} y:{Math.round(pos.y)}
      </motion.div>
    </div>
  );
}
