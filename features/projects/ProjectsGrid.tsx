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

const categoryColors: Record<string, string> = {
  backend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  infrastructure: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  fullstack: "bg-green-500/10 text-green-400 border-green-500/20",
  "open-source": "bg-accent/10 text-accent border-accent/20",
};

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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Projects</p>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Things I&apos;ve Built
          </h1>
          <p className="max-w-xl text-base text-text-secondary sm:text-lg">
            Backend systems, distributed infrastructure, and AI-powered tooling from production and side projects.
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  activeCategory === cat.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-border-strong hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Featured marker */}
                {project.featured && (
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      Featured
                    </span>
                  </div>
                )}

                {/* Category + external link */}
                <div className="mb-4 flex items-start justify-between">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize",
                      categoryColors[project.category] ?? ""
                    )}
                  >
                    {project.category}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-text-tertiary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>

                {/* Title + desc */}
                <h3 className="mb-2 text-base font-semibold text-text-primary transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                  {project.description}
                </p>

                {/* Impact bullets */}
                {project.impact.length > 0 && (
                  <div className="mb-4 space-y-1">
                    {project.impact.slice(0, 2).map((m) => (
                      <div key={m} className="flex items-center gap-2 text-xs text-text-tertiary">
                        <span className="h-1 w-1 rounded-full bg-success" />
                        {m}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md border border-border bg-surface-active px-2 py-0.5 font-mono text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs text-text-tertiary">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
