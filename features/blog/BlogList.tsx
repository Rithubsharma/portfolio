"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, Tag, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/shared/StaggerContainer";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
}

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, search, activeTag]);

  return (
    <section className="section pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-12 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Writing
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Blog
          </h1>
          <p className="max-w-xl text-base text-text-secondary sm:text-lg">
            Deep dives on distributed systems, Go internals, Kafka, and building reliable backend infrastructure.
          </p>
        </FadeIn>

        {/* Search */}
        <FadeIn delay={0.1} className="mb-6">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-text-primary placeholder:text-text-placeholder focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </FadeIn>

        {/* Tags */}
        <FadeIn delay={0.15} className="mb-10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                activeTag === null
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface text-text-secondary hover:text-text-primary"
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                  activeTag === tag
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-surface text-text-secondary hover:text-text-primary"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Results count */}
        {(search || activeTag) && (
          <FadeIn className="mb-6">
            <p className="text-sm text-text-tertiary">
              {filtered.length} post{filtered.length !== 1 ? "s" : ""} found
            </p>
          </FadeIn>
        )}

        {/* Posts */}
        {filtered.length > 0 ? (
          <StaggerContainer className="space-y-4">
            {filtered.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:border-border-strong hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex-1 space-y-2.5">
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
                      <h2 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-accent">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex shrink-0 items-center gap-4 text-xs text-text-tertiary sm:flex-col sm:items-end sm:gap-2">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readingTime}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="hidden text-text-tertiary transition-colors group-hover:text-accent sm:block"
                      />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn>
            <div className="rounded-xl border border-border bg-surface p-12 text-center">
              <p className="text-text-tertiary">No posts match your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveTag(null); }}
                className="mt-3 text-sm text-accent hover:underline"
              >
                Clear filters
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
