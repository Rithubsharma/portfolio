import type { Metadata } from "next";
import { BlogList } from "@/features/blog/BlogList";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Thoughts on distributed systems, backend engineering, Kafka, Go, and the craft of building reliable software at scale.",
};

export default function BlogPage() {
  return <BlogList posts={getAllPosts()} />;
}
