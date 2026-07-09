"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  from?: "bottom" | "top" | "left" | "right" | "scale";
  className?: string;
  children: React.ReactNode;
}

const directionVariants = {
  bottom: { y: 12, opacity: 0 },
  top: { y: -12, opacity: 0 },
  left: { x: -12, opacity: 0 },
  right: { x: 12, opacity: 0 },
  scale: { scale: 0.97, opacity: 0 },
};

export function FadeIn({
  delay = 0,
  duration = 0.2,
  from = "bottom",
  className,
  children,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={directionVariants[from]}
      whileInView={{ y: 0, x: 0, scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
