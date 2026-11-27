import type { NavItem } from "@/types";

/** Sections of the home page, in scroll order. */
export const SECTIONS: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export const NAV_ITEMS: NavItem[] = [
  ...SECTIONS.slice(0, 4),
  { label: "Writing", href: "/writing" },
  SECTIONS[4],
];
