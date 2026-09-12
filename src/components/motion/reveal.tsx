"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Shared fade+rise used across the page for a consistent, restrained
// entrance feel — small offset, quick duration, no bounce. Respecting
// prefers-reduced-motion is handled once, globally, via the <MotionConfig
// reducedMotion="user"> wrapper in the root layout rather than per-use.
const variants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

/** Animates in once on mount — for above-the-fold content visible on load. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Animates in the first time it scrolls into view — for below-the-fold sections. */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      variants={variants}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
