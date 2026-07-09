import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("font-mono text-xs", className)}>
      {tech}
    </Badge>
  );
}

export function TechBadgeList({
  technologies,
  className,
}: {
  technologies: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {technologies.map((tech) => (
        <TechBadge key={tech} tech={tech} />
      ))}
    </div>
  );
}
