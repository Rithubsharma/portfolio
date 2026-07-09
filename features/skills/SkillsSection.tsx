import { Code2, Server, Cloud, Database, Terminal, Cpu, Layers, Zap } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Code2, Server, Cloud, Database, Terminal, Cpu, Layers, Zap,
};

const proficiencyColors = {
  expert: "text-accent border-accent/30 bg-accent/5",
  advanced: "text-text-secondary border-border bg-surface",
  intermediate: "text-text-tertiary border-border/50 bg-surface",
};

interface SkillsSectionProps {
  preview?: boolean;
}

export function SkillsSection({ preview = false }: SkillsSectionProps) {
  const displayed = preview ? skillCategories.slice(0, 4) : skillCategories;

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills"
          title="Technical Expertise"
          description="Technologies I use to build reliable, scalable systems."
          className="mb-16"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayed.map((category) => {
            const Icon = iconMap[category.icon] ?? Code2;
            return (
              <StaggerItem key={category.label}>
                <div className="group h-full rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-border-strong hover:shadow-md">
                  {/* Category header */}
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">
                      {category.label}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={cn(
                          "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
                          skill.proficiency
                            ? proficiencyColors[skill.proficiency]
                            : "text-text-secondary border-border bg-surface"
                        )}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
