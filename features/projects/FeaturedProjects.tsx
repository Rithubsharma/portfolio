import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
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

        <StaggerContainer className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <CaseStudyCard project={project} />
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

function CaseStudyCard({ project }: { project: (typeof featuredProjects)[0] }) {
  const metrics = project.impact.slice(0, 2).join(" · ");

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col bg-background p-7 transition-colors duration-150 hover:bg-surface-hover"
    >
      {/* Category */}
      <span className="mb-6 font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
        {project.category}
      </span>

      {/* Title */}
      <h3 className="mb-3 text-base font-semibold text-text-primary transition-colors duration-150 group-hover:text-accent">
        {project.title}
      </h3>

      {/* Impact metrics */}
      {metrics && (
        <p className="mb-4 font-mono text-xs leading-relaxed text-text-tertiary">
          {metrics}
        </p>
      )}

      {/* Description */}
      <p className="mb-8 flex-1 text-sm leading-relaxed text-text-secondary">
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
    </Link>
  );
}
