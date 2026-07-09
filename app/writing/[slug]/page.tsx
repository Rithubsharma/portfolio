import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/FadeIn";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="section pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <FadeIn>
          <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2">
            <Link href="/writing">
              <ArrowLeft size={16} /> All Posts
            </Link>
          </Button>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.05} className="mb-12 space-y-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.meta.tags.map((tag) => (
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
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {post.meta.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg leading-relaxed text-text-secondary">
            {post.meta.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 border-t border-border pt-5 text-sm text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.meta.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.meta.readingTime}
            </span>
          </div>
        </FadeIn>

        {/* MDX Content */}
        <FadeIn delay={0.1}>
          <div className="prose prose-sm sm:prose-base max-w-none
            prose-headings:text-text-primary prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-primary prose-strong:font-semibold
            prose-code:text-text-primary prose-code:bg-surface-active prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-blockquote:border-l-accent prose-blockquote:text-text-secondary
            prose-ul:text-text-secondary prose-ol:text-text-secondary
            prose-li:text-text-secondary
            prose-hr:border-border
          ">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark",
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.15} className="mt-16 border-t border-border pt-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/writing">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
