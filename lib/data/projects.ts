import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "patchstack",
    title: "Patchstack platform",
    company: "GoDaddy",
    headline: "99.5% success",
    what: "The platform that provisions Patchstack security at GoDaddy.",
    contribution:
      "I architected it. It has processed more than 50,000 provisioning requests, and 99.5% of them succeeded.",
    outcomes: [
      "50,000+ provisioning requests processed",
      "99.5% success rate",
      "$1.9M in revenue enabled",
    ],
    stack: ["Go", "SQS", "DynamoDB", "PostgreSQL", "AWS CDK"],
    diagram: "dots",
  },
  {
    id: "saga",
    title: "Saga orchestration",
    company: "GoDaddy",
    headline: "60% less latency",
    what: "A distributed saga orchestration framework for provisioning workflows.",
    contribution:
      "I built the framework. It coordinates multi-step operations across services and holds up under 500 of them running at once.",
    outcomes: [
      "10,000+ requests handled daily",
      "500 concurrent operations",
      "Provisioning latency down 60%",
    ],
    stack: ["Go", "SQS", "PostgreSQL", "DynamoDB"],
    diagram: "bars",
  },
  {
    id: "diagnostics",
    title: "Runtime diagnostics",
    company: "GoDaddy",
    headline: "No restarts",
    what: "An AI-powered diagnostics platform for Go microservices running on AWS EKS.",
    contribution:
      "I designed and built the platform, which profiles services live in production and detects bottlenecks automatically. I also developed its analysis engine: Claude Sonnet 4 plus rule-based detection, correlating traces, logs and runtime metrics.",
    outcomes: [
      "Live production profiling without restarting a service",
      "Automated bottleneck detection",
      "Generated root-cause analysis and optimization recommendations",
    ],
    stack: [
      "Go",
      "Kubernetes",
      "AWS EKS",
      "PostgreSQL",
      "Prometheus",
      "pprof",
      "Claude Sonnet 4",
      "GoCaaS",
    ],
    diagram: "flame",
  },
  {
    id: "inbound",
    title: "Warehouse inbound",
    company: "DP World",
    headline: "80% fewer discrepancies",
    what: "The Inbound module of the IMS service for warehouse management, and its link to the warehouse system.",
    contribution:
      "I designed and owned the Inbound module, working with a team of four engineers on the warehouse integration. I then implemented the Kafka integration between IMS and WMS so the two exchange data in real time.",
    outcomes: [
      "Inventory discrepancies down 80%",
      "IMS to WMS latency down 40%",
      "Fault-tolerant handling of high-volume transactions",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "Kafka"],
    diagram: "lanes",
  },
  {
    id: "pdp",
    title: "Product page",
    company: "DP World",
    headline: "200 ms",
    what: "The product description page customers see before they buy.",
    contribution:
      "I designed and enhanced the page's backend so it reaches customers within 200 ms.",
    outcomes: ["Served within 200 ms", "Across millions of requests"],
    stack: ["Java", "Spring Boot", "Redis"],
    diagram: "ruler",
  },
];
