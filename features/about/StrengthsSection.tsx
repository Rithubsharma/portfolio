import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { strengths } from "@/lib/data";

export function StrengthsSection() {
  return (
    <section className="section bg-background-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Strengths"
          title="What I bring to the table"
          className="mb-16"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {strengths.map((strength, i) => (
            <StaggerItem key={strength.title}>
              <div className="flex gap-5 rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-border-strong hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <span className="text-sm font-bold text-accent">0{i + 1}</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-text-primary">
                    {strength.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {strength.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
