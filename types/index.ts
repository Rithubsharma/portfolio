export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  metrics?: string[];
  companyUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  challenges: string[];
  learnings: string[];
  impact: string[];
  techStack: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  heroImage?: string;
}

export type ProjectCategory =
  | "backend"
  | "fullstack"
  | "infrastructure"
  | "ai"
  | "open-source";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  published: boolean;
}

export interface Skill {
  name: string;
  proficiency?: "expert" | "advanced" | "intermediate";
}

export interface SkillCategory {
  label: string;
  icon: string;
  skills: Skill[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa?: string;
  highlights?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
