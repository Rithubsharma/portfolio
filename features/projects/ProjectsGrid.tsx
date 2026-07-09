"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { projects } from "@/lib/data";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "Backend", value: "backend" },
  { label: "AI / ML", value: "ai" },
  { label: "Infrastructure", value: "infrastructure" },
  { label: "Open Source", value: "open-source" },
];

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-16 space-y-3">
          <p className="font-mono text-xs text-text-tertiary">work</p>
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            Case Studies
          </h1>
          <p className="max-w-xl text-base text-text-secondary">
            Distributed systems, backend infrastructure, and AI-powered tooling.
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.05} className="mb-12">
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "relative pb-4 text-sm font-medium transition-colors duration-150",
                  activeCategory === cat.value
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                {cat.label}
                {activeCategory === cat.value && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => {
              const metrics = project.impact.slice(0, 2).join(" · ");
              return (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="group flex flex-col bg-background p-7 transition-colors duration-150 hover:bg-surface-hover"
                >
                  {/* Category + featured */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="font-mono text-[10px] text-text-tertiary/60">
                        featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-base font-semibold text-text-primary transition-colors duration-150 group-hover:text-accent">
                    {project.title}
                  </h3>

                  {/* Metrics */}
                  {metrics && (
                    <p className="mb-4 font-mono text-xs leading-relaxed text-text-tertiary">
                      {metrics}
                    </p>
                  )}

                  {/* Description */}
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                    {project.description}
                  </p>

                  {/* CTA */}
                  <span className="flex items-center gap-1.5 text-xs font-medium text-text-tertiary transition-colors duration-150 group-hover:text-accent">
                    Read Case Study
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
