"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/** A paragraph whose words come up to full strength as it scrolls through the viewport. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 35%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          from={i / words.length}
          to={Math.min(1, (i + 3) / words.length)}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  progress,
  from,
  to,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  children: string;
}) {
  const opacity = useTransform(progress, [from, to], [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="scrub-word">
        {children}
      </motion.span>{" "}
    </>
  );
}
