import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function RecentPosts() {
  const recent = blogPosts.filter((p) => p.published).slice(0, 3);

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <SectionHeader
            eyebrow="Writing"
            title="Latest Posts"
            description="Thoughts on distributed systems, backend engineering, and the craft of building reliable software."
            align="left"
          />
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/writing">
              All posts <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="space-y-4">
          {recent.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition-colors duration-150 hover:border-border-strong sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex-1 space-y-2">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-active px-2 py-0.5 text-xs text-text-tertiary"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-text-primary transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex shrink-0 items-center gap-3 text-xs text-text-tertiary sm:flex-col sm:items-end sm:gap-1.5">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readingTime}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/writing">
              View all posts <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
