import { SectionHeader } from "@/components/shared/SectionHeader";
import { Marquee } from "@/components/shared/Marquee";
import { skillCategories } from "@/lib/data";

export function SkillsSection() {
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.label }))
  );

  const midpoint = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, midpoint);
  const row2 = allSkills.slice(midpoint);

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="expertise"
          title="Technical Stack"
          description="Technologies I reach for when building production systems."
          className="mb-16"
        />
      </div>

      <div className="space-y-3">
        <Marquee direction="left" speed="normal">
          {row1.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex shrink-0 items-center rounded-full border border-border bg-surface px-4 py-2 font-mono text-sm text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
            >
              {skill.name}
            </span>
          ))}
        </Marquee>
        <Marquee direction="right" speed="slow">
          {row2.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex shrink-0 items-center rounded-full border border-border bg-surface px-4 py-2 font-mono text-sm text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
            >
              {skill.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
