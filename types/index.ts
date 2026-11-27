export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Short note shown beside the link, e.g. the handle. */
  note: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  location: string;
  /** `[[double brackets]]` mark a figure to highlight. */
  points: string[];
  stack: string[];
  companyUrl?: string;
}

export type ProjectDiagram = "dots" | "bars" | "flame" | "lanes" | "ruler";

export interface Project {
  id: string;
  title: string;
  company: string;
  /** The one figure shown on the collapsed row. */
  headline: string;
  what: string;
  contribution: string;
  outcomes: string[];
  stack: string[];
  diagram: ProjectDiagram;
}

export interface Skill {
  name: string;
  /** Where the resume ties this skill to specific work. Empty when it does not. */
  usedIn: string[];
}

export interface SkillGroup {
  label: string;
  skills: Skill[];
}
