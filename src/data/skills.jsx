// Cards shown in the Skills section.

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const skills = [
  {
    title: "Web Applications",
    description:
      "React and TypeScript front ends backed by Node/Express or Supabase, with responsive UI built in Tailwind CSS.",
    icon: (
      <svg {...iconProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform apps with React Native and Expo, including features that use the device's camera and SMS.",
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    title: "Databases & APIs",
    description:
      "PostgreSQL and Supabase (auth, storage, policies), MongoDB, and REST APIs in Node and Express.",
    icon: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    title: "Deployment & Infrastructure",
    description:
      "Linux servers, Docker, automated backups, Git workflows, and deploys to Vercel and Cloudflare.",
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="3" width="20" height="7" rx="2" />
        <rect x="2" y="14" width="20" height="7" rx="2" />
        <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
        <line x1="6" y1="17.5" x2="6.01" y2="17.5" />
      </svg>
    ),
  },
];

export default skills;
