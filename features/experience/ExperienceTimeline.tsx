"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, MapPin, Calendar, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { Badge } from "@/components/ui/badge";
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
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Experience
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Work History
          </h1>
          <p className="max-w-xl text-base text-text-secondary sm:text-lg">
            4+ years building backend systems at scale — from warehouse management at DP World to distributed security infrastructure at GoDaddy.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border sm:left-[23px]" />

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
            ? "border-accent bg-accent/20"
            : "border-border-strong bg-background"
        )}
      >
        {isPresent && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-30" />
        )}
      </div>

      {/* Card */}
      <button
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={isExpanded}
      >
        <div
          className={cn(
            "rounded-xl border bg-surface p-5 transition-all duration-200",
            isExpanded
              ? "border-accent/30 shadow-md"
              : "border-border hover:border-border-strong hover:shadow-sm"
          )}
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-text-primary">
                  {exp.role}
                </h3>
                {isPresent && (
                  <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                <span className="font-medium">{exp.company}</span>
                <span className="flex items-center gap-1 text-text-tertiary">
                  <MapPin size={12} />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1 text-text-tertiary">
                  <Calendar size={12} />
                  {formatDate(exp.startDate)} —{" "}
                  {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </span>
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

          {/* Description preview (always visible) */}
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {exp.description}
          </p>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-xl border border-border bg-surface p-5 space-y-6">
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
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-text-primary">Impact</h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {exp.metrics.map((metric) => (
                      <div
                        key={metric}
                        className="flex items-center gap-2.5 rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-sm text-text-secondary"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                        {metric}
                      </div>
                    ))}
                  </div>
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
