"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorkIndexProps {
  items: { id: string; title: string }[];
}

/** A quiet running index of the case studies. It stays with you through the section. */
export function WorkIndex({ items }: WorkIndexProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id.replace("work-", ""));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(`work-${item.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case studies"
      className="sticky top-16 z-20 mt-12 hidden border-y border-border bg-background lg:block"
    >
      <ul className="shell flex items-center gap-10 py-3.5">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#work-${item.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "relative block text-sm font-medium transition-colors",
                  current ? "text-text-primary" : "text-text-tertiary hover:text-text-primary"
                )}
              >
                {current && (
                  <motion.span
                    layoutId="work-index-mark"
                    aria-hidden
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute -bottom-[15px] left-0 right-0 h-0.5 bg-accent"
                  />
                )}
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
