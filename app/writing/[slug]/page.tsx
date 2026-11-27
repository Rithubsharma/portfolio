import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
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
    <article className="shell pb-24 pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-3xl">
        <Link href="/writing" className="link text-sm font-medium">
          All writing
        </Link>

        <header className="mt-8 border-b border-border-strong pb-8">
          <h1 className="text-4xl leading-[1.02] [font-stretch:88%] sm:text-5xl lg:text-6xl">
            {post.meta.title}
          </h1>
          <p className="mt-5 text-lg text-text-secondary">{post.meta.excerpt}</p>
          <p className="mt-5 text-sm text-text-tertiary">
            {formatDate(post.meta.date)}, {post.meta.readingTime}. {post.meta.tags.join(", ")}
          </p>
        </header>

        <div className="post mt-10">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
                ],
              },
            }}
          />
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border-strong pt-8">
          <Link href="/writing" className="link text-sm font-medium">
            All writing
          </Link>
          <Link
            href="/#contact"
            className="btn"
          >
            Get in touch
          </Link>
        </footer>
      </div>
    </article>
  );
}
