import { GraduationCap, Award } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { education } from "@/lib/data";

export function EducationSection() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Education"
          title="Academic Background"
          align="left"
          className="mb-12"
        />

        <div className="space-y-6">
          {education.map((edu) => (
            <FadeIn key={edu.id}>
              <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <GraduationCap size={22} className="text-accent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">
                          {edu.institution}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {edu.degree} · {edu.field}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-1 sm:items-end">
                        <span className="text-sm font-medium text-text-primary">
                          {edu.startYear} — {edu.endYear}
                        </span>
                        {edu.gpa && (
                          <span className="inline-flex items-center rounded-md border border-accent/20 bg-accent/5 px-2 py-0.5 text-xs font-medium text-accent">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="space-y-2">
                        {edu.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-start gap-2.5 text-sm text-text-secondary"
                          >
                            <Award size={14} className="mt-0.5 shrink-0 text-accent" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
