import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { skillCategories } from "@/lib/data";

interface SkillsSectionProps {
  preview?: boolean;
}

export function SkillsSection({ preview = false }: SkillsSectionProps) {
  const displayed = preview ? skillCategories.slice(0, 6) : skillCategories;

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="expertise"
          title="Technical Stack"
          description="Technologies I reach for when building production systems."
          className="mb-16"
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((category) => (
            <StaggerItem key={category.label}>
              <div className="rounded-2xl border border-border bg-surface p-5 transition-colors duration-150 hover:border-border-strong">
                <p className="mb-4 text-sm font-medium text-text-primary">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-xs text-text-secondary"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
