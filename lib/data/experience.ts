import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "godaddy",
    company: "GoDaddy",
    role: "Software Engineer 2",
    startDate: "2025-12",
    endDate: null,
    location: "Bangalore, India",
    description:
      "Building security platform infrastructure and AI-powered developer tooling on AWS EKS. Architecting distributed systems for GoDaddy's Patchstack security product.",
    responsibilities: [
      "Architected the Patchstack security platform, processing 50,000+ provisioning requests at 99.5% success rate and enabling $1.9M in revenue",
      "Built a distributed saga orchestration framework handling 10,000+ daily requests and 500 concurrent operations, reducing provisioning latency by 60%",
      "Designed and built an AI-powered runtime diagnostics platform for Go microservices on AWS EKS, enabling live production profiling and automated bottleneck detection without service restarts",
      "Developed an AI-driven performance analysis engine using Claude Sonnet 4 and rule-based detection to correlate traces, logs, and runtime metrics, generating automated root-cause analysis and optimization recommendations",
    ],
    technologies: ["Go", "AWS SQS", "DynamoDB", "PostgreSQL", "AWS CDK", "Kubernetes", "AWS EKS", "Prometheus", "pprof", "Claude Sonnet 4"],
    metrics: [
      "50,000+ provisioning requests processed",
      "99.5% provisioning success rate",
      "$1.9M in revenue enabled",
      "60% reduction in provisioning latency",
      "500 concurrent operations handled",
    ],
    companyUrl: "https://godaddy.com",
  },
  {
    id: "dpworld",
    company: "DP World",
    role: "Software Engineer 1",
    startDate: "2022-07",
    endDate: "2025-11",
    location: "Bangalore, India",
    description:
      "Built and owned core modules of DP World's Warehouse Management System, shipping Kafka integrations, high-performance product pages, and lead generation tooling.",
    responsibilities: [
      "Contributed to the IMS Service for Warehouse Management, designing and owning the Inbound module — collaborated with a team of 4 SDEs to deliver seamless integration with the Warehouse System, reducing inventory discrepancies by 80%",
      "Implemented a Kafka-based integration between IMS and WMS, enabling real-time data exchange, reducing latency by 40%, and ensuring scalable, fault-tolerant handling of high-volume transactions",
      "Designed and enhanced the PDP (Product Description Page) to serve product pages within a response time of 200ms for millions of requests",
      "Managed the development of Dubuy Connect for lead generation for customized orders on demand",
    ],
    technologies: ["Java", "Spring Boot", "Kafka", "Redis", "MySQL", "Azure Blob"],
    metrics: [
      "80% reduction in inventory discrepancies",
      "40% reduction in data exchange latency",
      "200ms response time for millions of requests",
      "DP World Kudos Award recipient",
    ],
    companyUrl: "https://dpworld.com",
  },
  {
    id: "turtlemint",
    company: "Turtlemint",
    role: "Machine Learning Intern",
    startDate: "2021-02",
    endDate: "2021-05",
    location: "Mumbai, India",
    description:
      "Built recommendation and next-action prediction models based on user activity data.",
    responsibilities: [
      "Improved a recommendation system using textual and YouTube data based on user activity",
      "Calculated similarity scores between items using cosine similarity",
      "Developed an ML model to predict the next 5 actions for a user based on their last activity on the company's website",
    ],
    technologies: ["Python", "Scikit-learn", "NLP", "Cosine Similarity"],
    metrics: [],
    companyUrl: "https://turtlemint.com",
  },
  {
    id: "intelligence-node",
    company: "Intelligence Node",
    role: "Software Engineering Intern",
    startDate: "2020-06",
    endDate: "2020-07",
    location: "Mumbai, India",
    description:
      "Built a classification and product matching model to enable automated pattern identification.",
    responsibilities: [
      "Developed a classification model using the Decision Tree algorithm to enable automated identification of patterns",
      "Matched products and ranked them on the basis of likelihood from the search pool",
      "Implemented feature engineering to create new features and defined the target variable by performing EDA",
    ],
    technologies: ["Python", "Scikit-learn", "Decision Trees", "EDA"],
    metrics: [],
    companyUrl: "https://intelligencenode.com",
  },
];

export const education = [
  {
    id: "iit-roorkee",
    institution: "Indian Institute of Technology, Roorkee",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    startYear: "2018",
    endYear: "2022",
    gpa: "8.00 / 10.00",
    highlights: [
      "DP World Kudos Award — delivered critical features ahead of schedule",
      "ACM competitive programming community member",
    ],
  },
];
