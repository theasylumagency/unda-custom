export interface SiteLinkItem {
  label: string;
  href: string;
  external?: boolean;
  emphasis?: boolean;
}

export const primaryNavigation: readonly SiteLinkItem[] = [
  {
    label: "Solutions",
    href: "#operator-profiles",
  },
  {
    label: "Social Operator",
    href: "https://social.unda.ai",
    external: true,
  },
  {
    label: "Start a Project",
    href: "#operator-intake",
    emphasis: true,
  },
];

export const footerGroups: ReadonlyArray<{
  title: string;
  links: readonly SiteLinkItem[];
}> = [
  {
    title: "CUSTOM",
    links: [
      { label: "Solutions", href: "#operator-profiles" },
      { label: "Start a Project", href: "#operator-intake", emphasis: true },
    ],
  },
  {
    title: "PRODUCTS",
    links: [
      {
        label: "Social Operator",
        href: "https://social.unda.ai",
        external: true,
      },
    ],
  },
  {
    title: "ECOSYSTEM",
    links: [
      { label: "unda.ai", href: "https://unda.ai", external: true },
      {
        label: "theasylum.agency",
        href: "https://theasylum.agency",
        external: true,
      },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
