import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechBadgeList } from "@/components/shared/TechBadge";
import { featuredProjects } from "@/lib/data";

export function FeaturedProjects() {
  return (
    <section className="section bg-background-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <SectionHeader
            eyebrow="Projects"
            title="Things I've Built"
            description="A selection of projects I'm proud of."
            align="left"
          />
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/projects">
              All projects <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/projects">
              View all projects <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof featuredProjects)[0] }) {
  const categoryColors: Record<string, string> = {
    backend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    infrastructure: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    fullstack: "bg-green-500/10 text-green-400 border-green-500/20",
    "open-source": "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-border-strong hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Top row */}
      <div className="mb-4 flex items-start justify-between">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${categoryColors[project.category] ?? ""}`}
        >
          {project.category}
        </span>
        <ArrowUpRight
          size={16}
          className="text-text-tertiary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mb-5 text-sm leading-relaxed text-text-secondary line-clamp-3">
        {project.description}
      </p>

      {/* Impact metrics */}
      {project.impact.length > 0 && (
        <div className="mb-4 space-y-1">
          {project.impact.slice(0, 2).map((metric) => (
            <div key={metric} className="flex items-center gap-2 text-xs text-text-tertiary">
              <span className="h-1 w-1 rounded-full bg-success" />
              {metric}
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-md border border-border bg-surface-active px-2 py-0.5 font-mono text-xs text-text-secondary"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs text-text-tertiary">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>
    </Link>
  );
}
