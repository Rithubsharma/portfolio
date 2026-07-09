import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "distributed-saga-pattern",
    title: "Building Reliable Distributed Workflows with the Saga Pattern",
    excerpt:
      "How I built a saga orchestration framework at GoDaddy that handles 10,000+ daily provisioning requests with automatic failure compensation — and what I learned about distributed transaction design.",
    date: "2025-03-15",
    readingTime: "12 min read",
    tags: ["distributed-systems", "go", "aws", "backend"],
    published: true,
  },
  {
    slug: "go-pprof-production",
    title: "Live Profiling Go Services in Production Without Restarts",
    excerpt:
      "A deep dive into Go's pprof tooling, how we built a zero-downtime profiling platform on Kubernetes, and the surprising things we found in production flame graphs.",
    date: "2025-01-28",
    readingTime: "10 min read",
    tags: ["go", "performance", "kubernetes", "observability"],
    published: true,
  },
  {
    slug: "llm-root-cause-analysis",
    title: "Using Claude Sonnet to Automate Root-Cause Analysis",
    excerpt:
      "How we integrated Claude Sonnet 4 into our observability pipeline to correlate pprof profiles, Prometheus metrics, and distributed traces — and generate actionable diagnostics automatically.",
    date: "2025-05-10",
    readingTime: "8 min read",
    tags: ["ai", "llm", "observability", "go"],
    published: true,
  },
  {
    slug: "kafka-exactly-once",
    title: "Kafka Exactly-Once Semantics: The Complete Guide",
    excerpt:
      "Breaking down Kafka's transaction protocol, idempotent producers, and exactly-once delivery — from theory to practical Java implementation with the real edge cases nobody talks about.",
    date: "2024-11-05",
    readingTime: "14 min read",
    tags: ["kafka", "distributed-systems", "java", "backend"],
    published: true,
  },
  {
    slug: "redis-caching-patterns",
    title: "Redis Caching Patterns That Scale: Lessons from Millions of Requests",
    excerpt:
      "The caching patterns I use when designing systems that need to serve millions of requests — cache-aside, write-through, stampede prevention, and when to break the rules.",
    date: "2024-08-20",
    readingTime: "9 min read",
    tags: ["redis", "caching", "backend", "performance"],
    published: true,
  },
  {
    slug: "dynamodb-single-table",
    title: "DynamoDB Single-Table Design for Backend Engineers",
    excerpt:
      "A practical guide to single-table DynamoDB design patterns — partition key strategies, GSI modeling, and the access pattern-first mindset that makes or breaks DynamoDB performance.",
    date: "2024-06-12",
    readingTime: "11 min read",
    tags: ["dynamodb", "aws", "databases", "backend"],
    published: true,
  },
];
