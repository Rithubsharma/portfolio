import type { SocialLink } from "@/types";

export const personal = {
  name: "Rishav Sharma",
  firstName: "Rishav",
  lastName: "Sharma",
  role: "Software Development Engineer",
  tagline: "I build distributed systems that scale.",
  bio: `Software Development Engineer with 4+ years of experience building backend services, distributed systems, and cloud-native applications. I specialize in designing scalable APIs and infrastructure that handles serious load — from real-time Kafka pipelines to AI-powered diagnostics platforms running on AWS EKS.

Currently at GoDaddy building security platform infrastructure and an AI-driven runtime diagnostics engine. Previously at DP World shipping warehouse management systems serving millions of requests at sub-200ms latency.

B.Tech from IIT Roorkee. I care about performance, reliability, and writing software that's correct at scale.`,
  shortBio:
    "Software Development Engineer with 4+ years building distributed systems, cloud-native applications, and high-performance backend services.",
  email: "rishavsharma3673@gmail.com",
  phone: "+91 9068511974",
  location: "Bangalore, India",
  availableForWork: false,
  resumeUrl: "/resume.pdf",
  linkedinUrl: "https://www.linkedin.com/in/rishav-sharma-023482188/",
  githubUrl: "https://github.com/Rithubsharma",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Rithubsharma", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rishav-sharma-023482188/",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:rishavsharma3673@gmail.com", icon: "mail" },
];

export const strengths = [
  {
    title: "Distributed Systems",
    description:
      "Designing fault-tolerant, scalable architectures — from saga orchestration frameworks to real-time Kafka pipelines handling high-volume transactions.",
  },
  {
    title: "Cloud-Native Infrastructure",
    description:
      "Building and operating production services on AWS EKS and Kubernetes. Terraform, CDK, and infrastructure-as-code for everything.",
  },
  {
    title: "AI-Powered Tooling",
    description:
      "Integrating LLMs into real engineering workflows — from automated root-cause analysis to intelligent performance diagnostics using Claude Sonnet.",
  },
  {
    title: "Performance Engineering",
    description:
      "Profiling Go microservices with pprof, tuning database queries, and designing systems with latency SLOs from day one.",
  },
];

export const interests = [
  "Distributed systems & consensus algorithms",
  "AI-powered developer tooling",
  "Platform & infrastructure engineering",
  "Observability & performance profiling",
  "Open source backend tooling",
];

export const hobbies = [
  {
    title: "Dance",
    description: "Passionate dancer — I post videos on YouTube. Dance is how I decompress after deep engineering work.",
    youtubeUrl: "https://www.youtube.com/@rishav.sharma860",
    icon: "🎭",
  },
  {
    title: "Cricket",
    description: "Avid cricket fan and weekend player. There's something about the strategy of the game that feels like systems design.",
    icon: "🏏",
  },
];
