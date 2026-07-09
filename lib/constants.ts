import type { NavItem } from "@/types";
import { personal, socialLinks } from "./data/personal";

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = socialLinks;

export const SITE_CONFIG = {
  name: personal.name,
  title: personal.role,
  email: personal.email,
  location: personal.location,
  availableForWork: personal.availableForWork,
};
