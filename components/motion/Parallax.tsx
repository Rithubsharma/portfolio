"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Pixels of travel in each direction across the viewport. */
  distance?: number;
}

/** Drifts its content a few pixels against the scroll. */
export function Parallax({ children, className, innerClassName, distance = 20 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
