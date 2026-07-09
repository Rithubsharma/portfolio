import type { Metadata } from "next";
import { BlogList } from "@/features/blog/BlogList";
import { getAllPosts } from "@/lib/mdx";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on distributed systems, backend engineering, Kafka, Go, and the craft of building reliable software at scale.",
};

export default function BlogPage() {
  // Use MDX posts if available, fall back to static data
  const mdxPosts = getAllPosts();
  const posts = mdxPosts.length > 0 ? mdxPosts : blogPosts;

  return <BlogList posts={posts} />;
}
