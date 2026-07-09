import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    icon: "Code2",
    skills: [
      { name: "Java", proficiency: "expert" },
      { name: "Go", proficiency: "expert" },
      { name: "Python", proficiency: "advanced" },
      { name: "C++", proficiency: "advanced" },
      { name: "SQL", proficiency: "expert" },
      { name: "TypeScript", proficiency: "intermediate" },
    ],
  },
  {
    label: "Backend",
    icon: "Server",
    skills: [
      { name: "Spring Boot", proficiency: "expert" },
      { name: "Microservices", proficiency: "expert" },
      { name: "REST APIs", proficiency: "expert" },
      { name: "System Design", proficiency: "expert" },
      { name: "Distributed Systems", proficiency: "expert" },
      { name: "Kafka", proficiency: "expert" },
      { name: "gRPC", proficiency: "advanced" },
    ],
  },
  {
    label: "Cloud",
    icon: "Cloud",
    skills: [
      { name: "AWS EKS", proficiency: "expert" },
      { name: "AWS SQS", proficiency: "expert" },
      { name: "AWS DynamoDB", proficiency: "expert" },
      { name: "AWS CDK", proficiency: "advanced" },
      { name: "Kubernetes", proficiency: "advanced" },
      { name: "Docker", proficiency: "expert" },
      { name: "Azure Blob", proficiency: "intermediate" },
    ],
  },
  {
    label: "Databases",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", proficiency: "expert" },
      { name: "DynamoDB", proficiency: "expert" },
      { name: "Redis", proficiency: "expert" },
      { name: "MySQL", proficiency: "advanced" },
      { name: "Elasticsearch", proficiency: "advanced" },
    ],
  },
  {
    label: "Observability",
    icon: "Terminal",
    skills: [
      { name: "Prometheus", proficiency: "advanced" },
      { name: "Grafana", proficiency: "advanced" },
      { name: "CloudWatch", proficiency: "advanced" },
      { name: "pprof", proficiency: "advanced" },
      { name: "OpenTelemetry", proficiency: "intermediate" },
    ],
  },
  {
    label: "AI / ML",
    icon: "Cpu",
    skills: [
      { name: "Claude Sonnet", proficiency: "advanced" },
      { name: "LLM Integration", proficiency: "advanced" },
      { name: "RAG Pipelines", proficiency: "intermediate" },
      { name: "Scikit-learn", proficiency: "intermediate" },
      { name: "Decision Trees", proficiency: "intermediate" },
    ],
  },
];
