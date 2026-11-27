import type { SkillGroup } from "@/types";

const PATCHSTACK = "Patchstack platform, GoDaddy";
const SAGA = "Saga orchestration, GoDaddy";
const DIAGNOSTICS = "Runtime diagnostics, GoDaddy";
const INBOUND = "Warehouse inbound, DP World";
const PDP = "Product page, DP World";
const DUBUY = "Dubuy Connect, DP World";

/** Groups and names follow the resume. `usedIn` lists only work the resume ties to the skill. */
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { name: "Java", usedIn: [INBOUND, PDP, DUBUY] },
      { name: "Golang", usedIn: [PATCHSTACK, SAGA, DIAGNOSTICS] },
      { name: "Python", usedIn: [] },
      { name: "C++", usedIn: [] },
      { name: "SQL", usedIn: [] },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Spring Boot", usedIn: [INBOUND, PDP, DUBUY] },
      { name: "Microservices", usedIn: [DIAGNOSTICS] },
      { name: "Distributed Systems", usedIn: [SAGA, DIAGNOSTICS] },
      { name: "Kafka", usedIn: [INBOUND] },
      { name: "System Design", usedIn: [] },
      { name: "REST APIs", usedIn: [] },
    ],
  },
  {
    label: "Cloud",
    skills: [
      { name: "AWS EKS", usedIn: [DIAGNOSTICS] },
      { name: "SQS", usedIn: [PATCHSTACK, SAGA] },
      { name: "Kubernetes", usedIn: [DIAGNOSTICS] },
      { name: "Docker", usedIn: [] },
    ],
  },
  {
    label: "Databases and tools",
    skills: [
      { name: "PostgreSQL", usedIn: [PATCHSTACK, SAGA, DIAGNOSTICS] },
      { name: "DynamoDB", usedIn: [PATCHSTACK, SAGA] },
      { name: "Redis", usedIn: [PDP] },
      { name: "Prometheus", usedIn: [DIAGNOSTICS] },
      { name: "Grafana", usedIn: [] },
      { name: "Elasticsearch", usedIn: [] },
      { name: "CloudWatch", usedIn: [] },
    ],
  },
];
