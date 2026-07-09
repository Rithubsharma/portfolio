import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  published?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

function calcReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(contentDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;

      return {
        slug,
        title: frontmatter.title ?? "",
        excerpt: frontmatter.excerpt ?? "",
        date: frontmatter.date ?? "",
        tags: frontmatter.tags ?? [],
        published: frontmatter.published ?? true,
        readingTime: calcReadingTime(content),
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): {
  meta: PostMeta;
  content: string;
} | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    meta: {
      slug,
      title: frontmatter.title ?? "",
      excerpt: frontmatter.excerpt ?? "",
      date: frontmatter.date ?? "",
      tags: frontmatter.tags ?? [],
      published: frontmatter.published ?? true,
      readingTime: calcReadingTime(content),
    },
    content,
  };
}
