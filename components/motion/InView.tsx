"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

interface InViewProps {
  as?: ElementType;
  /** Stay marked after the first sighting. Set false for loops that should pause off screen. */
  once?: boolean;
  margin?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
}

/**
 * Marks itself with data-inview once it scrolls into view. All the motion lives in
 * CSS (`.rv-*`, `.mark`, `.dia` in globals.css), keyed off that attribute.
 */
export function InView({
  as = "div",
  once = true,
  margin = "0px 0px -12% 0px",
  children,
  ...rest
}: InViewProps) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin]);

  return (
    <Tag ref={ref} data-inview={inView} {...rest}>
      {children}
    </Tag>
  );
}
