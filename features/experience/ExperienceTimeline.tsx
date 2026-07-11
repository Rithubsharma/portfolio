"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, MapPin, Calendar, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { experiences } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  const [expanded, setExpanded] = useState<string>(experiences[0].id);

  return (
    <section className="section pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-16 space-y-3">
          <p className="font-mono text-xs text-text-tertiary">experience</p>
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            Work History
          </h1>
          <p className="max-w-xl text-base text-text-secondary sm:text-lg">
            4+ years building backend systems at scale — from warehouse management at DP World to distributed security infrastructure at GoDaddy.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border opacity-50 sm:left-[23px]" />

          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 0.05}>
                <ExperienceCard
                  experience={exp}
                  isExpanded={expanded === exp.id}
                  onToggle={() =>
                    setExpanded(expanded === exp.id ? "" : exp.id)
                  }
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience: exp,
  isExpanded,
  onToggle,
}: {
  experience: (typeof experiences)[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isPresent = exp.endDate === null;

  return (
    <div className="relative pl-10 sm:pl-14">
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute left-[11px] top-5 h-4 w-4 rounded-full border-2 sm:left-[16px]",
          isPresent
            ? "border-accent bg-accent/30"
            : "border-border-strong bg-background"
        )}
      />

      {/* Card */}
      <button
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={isExpanded}
      >
        <div
          className={cn(
            "rounded-2xl border bg-surface p-5 transition-colors duration-150",
            isExpanded
              ? "border-border-strong"
              : "border-border hover:border-border-strong"
          )}
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-text-primary">
                  {exp.company}
                </h3>
                <span className="text-text-tertiary">·</span>
                <span className="text-sm font-medium text-text-secondary">
                  {exp.role}
                </span>
                {isPresent && (
                  <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                    current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-text-tertiary">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {formatDate(exp.startDate)} —{" "}
                  {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {exp.location}
                </span>
              </div>

              {/* Quick metrics (always visible) */}
              {exp.metrics && exp.metrics.length > 0 && (
                <p className="font-mono text-xs text-accent/80">
                  {exp.metrics.slice(0, 2).join(" · ")}
                </p>
              )}

              {/* Top technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-tertiary"
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 4 && (
                  <span className="px-1 font-mono text-[10px] text-text-tertiary">
                    +{exp.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            <ChevronDown
              size={18}
              className={cn(
                "mt-0.5 shrink-0 text-text-tertiary transition-transform duration-200",
                isExpanded && "rotate-180"
              )}
            />
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-2xl border border-border bg-surface p-5 space-y-5">
              {/* Responsibilities */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-text-primary">
                  Key Contributions
                </h4>
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                    >
                      <ChevronRight
                        size={14}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary">Impact</h4>
                  <p className="font-mono text-xs leading-relaxed text-text-tertiary">
                    {exp.metrics.join(" · ")}
                  </p>
                </div>
              )}

              {/* Tech stack */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-text-primary">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md border border-border bg-surface-active px-2 py-0.5 font-mono text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company link */}
              {exp.companyUrl && (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Visit {exp.company}
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
