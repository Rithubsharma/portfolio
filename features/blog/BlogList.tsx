import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="shell pb-24 pt-28 sm:pt-32 lg:pt-36">
      <h1 className="section-title">Writing</h1>
      <p className="mt-6 max-w-[56ch] text-lg text-text-secondary">
        Notes on distributed systems, Go and Kafka, written from the work.
      </p>

      {posts.length > 0 ? (
        <ul className="mt-12 border-t border-border-strong lg:mt-20">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <Link
                href={`/writing/${post.slug}`}
                className="group grid gap-x-12 gap-y-3 py-8 lg:grid-cols-12"
              >
                <p className="text-sm text-text-secondary lg:col-span-3 lg:pt-2">
                  {formatDate(post.date)}
                  <br />
                  {post.readingTime}
                </p>
                <div className="lg:col-span-9">
                  <h2 className="stretch-child text-3xl leading-tight group-hover:text-accent group-hover:[font-stretch:100%] sm:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-[64ch] text-base text-text-secondary">{post.excerpt}</p>
                  <p className="mt-3 text-sm text-text-tertiary">{post.tags.join(", ")}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-lg text-text-secondary">
          Nothing published yet. <Link href="/#work" className="link">See the work instead</Link>.
        </p>
      )}
    </section>
  );
}
