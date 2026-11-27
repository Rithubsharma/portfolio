"use client";

import { useState, type CSSProperties } from "react";
import { InView } from "@/components/motion/InView";
import { skillGroups } from "@/lib/data";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <section id="skills" className="shell py-20 lg:py-32">
      <InView as="h2" className="section-title rv-title">
        Skills
      </InView>

      {/* Readout: stays in view while you move through the list. */}
      <div
        aria-live="polite"
        className="sticky top-16 z-10 mt-10 flex min-h-16 items-center border-y border-border-strong bg-background py-3 lg:mt-16"
      >
        {active ? (
          <p className="text-base sm:text-lg">
            <span className="bg-tape px-1.5 font-semibold text-tape-ink">{active.name}</span>
            <span className="text-text-secondary"> used in </span>
            <span className="text-text-primary">{active.usedIn.join("; ")}</span>
          </p>
        ) : (
          <p className="text-base text-text-secondary sm:text-lg">
            Pick an underlined skill to see where I used it.
          </p>
        )}
      </div>

      <div>
        {skillGroups.map((group) => (
          <InView key={group.label} className="relative grid gap-4 py-8 lg:grid-cols-12 lg:gap-12 lg:py-10">
            <span aria-hidden className="rv-rule absolute inset-x-0 bottom-0 h-px bg-border" />
            <h3 className="rv-up font-sans text-base font-semibold tracking-normal text-text-secondary lg:col-span-3 lg:pt-3">
              {group.label}
            </h3>
            <ul style={{ "--i": 1 } as CSSProperties} className="rv-up flex flex-wrap items-baseline gap-x-7 gap-y-2 lg:col-span-9">
              {group.skills.map((skill) => {
                const linked = skill.usedIn.length > 0;
                const type =
                  "font-display text-[clamp(1.6rem,3.6vw,3rem)] font-extrabold leading-tight";
                return (
                  <li key={skill.name}>
                    {linked ? (
                      <button
                        type="button"
                        aria-pressed={active?.name === skill.name}
                        onMouseEnter={() => setActive(skill)}
                        onFocus={() => setActive(skill)}
                        onClick={() => setActive(skill)}
                        className={cn(
                          type,
                          "stretch underline decoration-2 underline-offset-[0.18em]",
                          active?.name === skill.name
                            ? "text-accent decoration-accent [font-stretch:112%]"
                            : "decoration-border-strong hover:text-accent"
                        )}
                      >
                        {skill.name}
                      </button>
                    ) : (
                      <span className={cn(type, "text-text-tertiary [font-stretch:78%]")}>
                        {skill.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </InView>
        ))}
      </div>
    </section>
  );
}
