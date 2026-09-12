"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Global switch: reducedMotion="user" makes every framer-motion animation
// in the app respect the OS-level prefers-reduced-motion setting
// automatically, without hand-checking it in each component.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
