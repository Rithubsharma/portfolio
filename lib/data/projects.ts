import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "patchstack",
    title: "Patchstack Security Platform",
    slug: "patchstack",
    description:
      "Distributed security platform processing 50,000+ provisioning requests at 99.5% success rate, enabling $1.9M in revenue for GoDaddy.",
    longDescription:
      "Architected the backend infrastructure for GoDaddy's Patchstack security product — a platform that provisions and manages WordPress security tooling for GoDaddy customers at scale.",
    problem:
      "GoDaddy needed to provision security tooling for tens of thousands of customers simultaneously with high reliability. The existing system had no proper orchestration, leading to failures, inconsistent state, and poor customer experience.",
    solution:
      "Designed a distributed provisioning system on AWS using SQS for decoupled message processing, DynamoDB for state tracking, and PostgreSQL for relational data. Built robust retry logic, idempotency guarantees, and observability from the ground up.",
    challenges: [
      "Ensuring idempotency across SQS retries without duplicate provisioning",
      "Managing distributed state consistently across DynamoDB and PostgreSQL",
      "Achieving 99.5% success rate at 50k+ requests under production load",
    ],
    learnings: [
      "AWS CDK patterns for infrastructure-as-code at scale",
      "SQS message visibility timeout tuning for long-running operations",
      "DynamoDB single-table design for high-throughput provisioning state",
    ],
    impact: [
      "50,000+ provisioning requests processed",
      "99.5% provisioning success rate",
      "$1.9M in revenue enabled",
    ],
    techStack: ["Go", "AWS SQS", "DynamoDB", "PostgreSQL", "AWS CDK"],
    category: "backend",
    featured: true,
  },
  {
    id: "saga-orchestration",
    title: "Distributed Saga Orchestration Framework",
    slug: "saga-orchestration",
    description:
      "A saga orchestration framework handling 10,000+ daily requests and 500 concurrent operations, cutting provisioning latency by 60%.",
    longDescription:
      "Built a purpose-built saga orchestration framework in Go that coordinates multi-step distributed workflows across services, with automatic compensation on failure and full observability.",
    problem:
      "Provisioning a security product involves multiple steps across different services — each can fail independently. Without orchestration, partial failures left systems in inconsistent states with no automatic recovery path.",
    solution:
      "Implemented the saga pattern with a central orchestrator that manages step execution, failure detection, and compensating transactions. Used SQS for durable step messaging and PostgreSQL for saga state persistence.",
    challenges: [
      "Designing compensating transactions that are always safe to execute idempotently",
      "Handling partial network failures mid-saga without duplicate side effects",
      "Keeping latency low while handling 500 concurrent sagas",
    ],
    learnings: [
      "The nuances of saga vs. two-phase commit for distributed transactions",
      "Designing for compensatability from day one — much harder to retrofit",
      "How SQS FIFO queues affect ordering and throughput tradeoffs",
    ],
    impact: [
      "10,000+ daily requests handled",
      "500 concurrent operations supported",
      "60% reduction in provisioning latency",
    ],
    techStack: ["Go", "AWS SQS", "PostgreSQL", "DynamoDB"],
    category: "backend",
    featured: true,
  },
  {
    id: "ai-diagnostics",
    title: "AI-Powered Runtime Diagnostics Platform",
    slug: "ai-diagnostics",
    description:
      "Live production profiling and automated bottleneck detection for Go microservices on AWS EKS — no service restarts required.",
    longDescription:
      "Designed and built a platform that enables live pprof profiling of Go microservices running on Kubernetes without requiring restarts or redeployment. Correlates runtime profiles with traces and logs, then feeds them to Claude Sonnet 4 for automated root-cause analysis.",
    problem:
      "Diagnosing performance issues in production Go services required either restarting services (causing downtime) or relying on incomplete metrics. Engineers spent hours correlating data from Prometheus, CloudWatch, and application logs manually.",
    solution:
      "Built a sidecar agent that hooks into the Go runtime via pprof HTTP endpoints, collects CPU/memory/goroutine profiles, and correlates them with Prometheus metrics and distributed traces. An AI analysis engine powered by Claude Sonnet 4 generates plain-English optimization recommendations.",
    challenges: [
      "Attaching to live Go processes via pprof without performance overhead",
      "Correlating timing across pprof profiles, Prometheus metrics, and trace spans",
      "Designing prompts for Claude that produce actionable, specific recommendations",
    ],
    learnings: [
      "Go pprof internals — flame graphs, goroutine dumps, heap profiles",
      "AWS EKS pod-level networking for sidecar patterns",
      "Prompt engineering for structured diagnostic output from LLMs",
    ],
    impact: [
      "Zero-restart live profiling in production",
      "Automated bottleneck detection across 20+ services",
      "Mean time-to-diagnosis reduced significantly",
    ],
    techStack: [
      "Go",
      "Kubernetes",
      "AWS EKS",
      "PostgreSQL",
      "Prometheus",
      "pprof",
      "Claude Sonnet 4",
    ],
    category: "ai",
    featured: true,
  },
  {
    id: "ims-warehouse",
    title: "IMS Warehouse Management Service",
    slug: "ims-warehouse",
    description:
      "Inbound module for DP World's inventory management system, reducing inventory discrepancies by 80% across warehouse operations.",
    longDescription:
      "Owned the design and implementation of the Inbound module within DP World's IMS (Inventory Management Service), handling inbound shipment tracking, inventory reconciliation, and integration with the broader Warehouse Management System.",
    problem:
      "Warehouse inventory discrepancies were rampant due to manual reconciliation processes and lack of real-time sync between IMS and WMS. This caused order fulfillment errors and operational delays.",
    solution:
      "Built a robust Inbound module with strict data validation, automated reconciliation logic, and a Kafka-based event stream for real-time synchronization with WMS. Collaborated with 4 engineers to deliver end-to-end warehouse system integration.",
    challenges: [
      "Handling partial shipment records and reconciling against expected inventory",
      "Designing the Kafka integration for exactly-once semantics in inventory updates",
      "Coordinating across a 4-person team to maintain clean module boundaries",
    ],
    learnings: [
      "Domain modeling for warehouse operations — inbound, outbound, and inventory reconciliation",
      "Kafka consumer group coordination for reliable inventory event processing",
      "The value of clear module ownership in multi-team Spring Boot services",
    ],
    impact: [
      "80% reduction in inventory discrepancies",
      "40% reduction in IMS-WMS data exchange latency",
      "DP World Kudos Award for on-time delivery",
    ],
    techStack: ["Java", "Spring Boot", "Kafka", "MySQL"],
    category: "backend",
    featured: false,
  },
  {
    id: "pdp-optimization",
    title: "High-Performance Product Description Page",
    slug: "pdp-optimization",
    description:
      "Redesigned DP World's PDP backend to serve millions of requests at sub-200ms response time using Redis caching.",
    longDescription:
      "Redesigned and optimized the Product Description Page (PDP) API for DP World's e-commerce platform (Dubuy), handling millions of daily requests while maintaining sub-200ms p99 latency through intelligent Redis caching.",
    problem:
      "The existing PDP API was hitting the database on every request, causing slow response times under load and database saturation during traffic spikes on the Dubuy platform.",
    solution:
      "Implemented a multi-layer caching strategy using Redis, with cache warming, TTL-based invalidation, and fallback logic. Redesigned the data access layer to batch product lookups and reduce N+1 query patterns.",
    challenges: [
      "Designing cache invalidation that keeps product data fresh without cache stampedes",
      "Handling cold-start cache misses gracefully during deployment",
      "Balancing Redis memory usage against cache hit rate targets",
    ],
    learnings: [
      "Redis data structure selection for product catalog caching (Hashes vs. Strings)",
      "Cache-aside vs. write-through patterns and when each fits",
      "Profiling Spring Boot applications under load with JVM flight recorder",
    ],
    impact: [
      "Sub-200ms response time for millions of daily requests",
      "Significant database load reduction via cache hit rate improvement",
    ],
    techStack: ["Java", "Spring Boot", "Redis", "MySQL"],
    category: "backend",
    featured: false,
  },
  {
    id: "ml-recommendation",
    title: "User Activity Recommendation System",
    slug: "ml-recommendation",
    description:
      "ML-powered recommendation system using cosine similarity on textual and video data to predict next user actions.",
    longDescription:
      "Built at Turtlemint, this system analyzed user activity patterns to improve content recommendations and predict the next 5 actions a user would take on the platform.",
    problem:
      "Turtlemint's platform had low content engagement because recommendations were generic and not personalized to user activity patterns.",
    solution:
      "Built a content-based recommendation engine using cosine similarity on textual descriptions and YouTube metadata. Combined with a next-action prediction model trained on sequential user activity data.",
    challenges: [
      "Building a meaningful feature space from heterogeneous text and video metadata",
      "Handling sparse user activity data for new users (cold start problem)",
    ],
    learnings: [
      "Cosine similarity for high-dimensional text feature vectors",
      "Sequential modeling approaches for user behavior prediction",
      "Feature engineering for recommendation systems",
    ],
    impact: [
      "Improved recommendation relevance for active users",
      "Next-5-action prediction model deployed to production",
    ],
    techStack: ["Python", "Scikit-learn", "NLP", "Cosine Similarity"],
    category: "ai",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
