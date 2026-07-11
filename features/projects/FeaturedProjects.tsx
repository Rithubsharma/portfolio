import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/lib/data";

export function FeaturedProjects() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <SectionHeader
            eyebrow="selected work"
            title="Case Studies"
            description="Problems worth solving."
            align="left"
          />
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/work">
              All work <ArrowRight size={15} />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <StaggerItem
              key={project.id}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <SpotlightCard className="h-full rounded-2xl border border-border bg-background transition-colors duration-200 hover:border-border-strong">
                <CaseStudyCard project={project} featured={index === 0} />
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/work">
              All case studies <ArrowRight size={15} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const categoryGradients: Record<string, string> = {
  backend: "from-blue-500/20 to-cyan-500/10 dark:from-blue-400/30 dark:to-cyan-400/15",
  ai: "from-violet-500/20 to-fuchsia-500/10 dark:from-violet-400/30 dark:to-fuchsia-400/15",
};

function CaseStudyCard({
  project,
  featured = false,
}: {
  project: (typeof featuredProjects)[0];
  featured?: boolean;
}) {
  const metrics = project.impact.slice(0, 2).join(" · ");
  const gradient = categoryGradients[project.category] || categoryGradients.backend;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex h-full flex-col ${featured ? "p-0" : "p-0"}`}
    >
      {/* Gradient thumbnail */}
      <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br ${gradient} ${featured ? "p-8" : "p-5"}`}>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, featured ? 6 : 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[11px] text-text-primary backdrop-blur-sm dark:border-white/5 dark:bg-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col ${featured ? "p-8" : "p-6"}`}>
        {/* Category */}
        <span className="mb-4 font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
          {project.category}
        </span>

        {/* Title */}
        <h3
          className={`mb-2 font-semibold text-text-primary transition-colors duration-150 group-hover:text-accent ${featured ? "text-xl" : "text-base"}`}
        >
          {project.title}
        </h3>

        {/* Impact metrics */}
        {metrics && (
          <p className="mb-3 font-mono text-xs leading-relaxed text-accent/80">
            {metrics}
          </p>
        )}

        {/* Description */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary">
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
      </div>
    </Link>
  );
}
