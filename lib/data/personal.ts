import type { SocialLink } from "@/types";
import { asset } from "@/lib/site";

export const personal = {
  name: "Rishav Sharma",
  firstName: "Rishav",
  lastName: "Sharma",
  role: "Software Development Engineer",
  currentRole: "Software Engineer 2",
  company: "GoDaddy",
  location: "Bangalore, India",
  shortBio:
    "Software Development Engineer with 4+ years building backend services, distributed systems and cloud-native applications in Go and Java.",
  email: "rishavsharma3673@gmail.com",
  resumeUrl: asset("/resume.pdf"),
  linkedinUrl: "https://www.linkedin.com/in/rishav-sharma-023482188/",
  githubUrl: "https://github.com/Rithubsharma",
  youtubeUrl: "https://www.youtube.com/@rishav.sharma860",
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: personal.linkedinUrl, note: "rishav-sharma" },
  { label: "GitHub", href: personal.githubUrl, note: "Rithubsharma" },
  { label: "YouTube", href: personal.youtubeUrl, note: "Dance videos" },
  { label: "Resume", href: personal.resumeUrl, note: "PDF" },
];

export const facts: { term: string; detail: string }[] = [
  { term: "Now", detail: "Software Engineer 2 at GoDaddy, Bangalore" },
  { term: "Before", detail: "Software Engineer 1 at DP World, 2022 to 2025" },
  {
    term: "Education",
    detail: "B.Tech, Indian Institute of Technology Roorkee, 2018 to 2022. CGPA 8.00 / 10.00",
  },
  {
    term: "Recognition",
    detail:
      "DP World Kudos Award, given quarterly, for delivering critical features ahead of schedule",
  },
  {
    term: "On stage",
    detail:
      "Joint Secretary of the Choreography and Dance Section at IIT Roorkee, 2019 to 2020. Inter-IIT group dance winners in 2018, first runners-up in 2019",
  },
];
