export const LOCALES = ["en", "fr", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type LocalizedText = { en: string } & Partial<
  Record<Exclude<Locale, "en">, string>
>;

export const getLocalizedText = (
  text: LocalizedText,
  locale: Locale = DEFAULT_LOCALE,
): string => text[locale] ?? text.en;

const t = <S extends string>(en: S) => ({ en }) as const;

type TimelineEntry = {
  id: string;
  period: LocalizedText;
  location: LocalizedText;
};

export type ContactChannel = {
  id: string;
  label: LocalizedText;
  value: string;
  href: string;
};

export type Profile = {
  name: LocalizedText;
  brand: LocalizedText;
  initials: string;
  role: LocalizedText;
  introduction: LocalizedText;
  headline: readonly LocalizedText[];
  location: LocalizedText;
  contactChannels: readonly ContactChannel[];
  resumePath: string;
  imagePath: string;
};

export const profile = {
  name: t("Shrinivas Waney"),
  brand: t("Shrinivas.Waney"),
  initials: "SW",
  role: t("Product Engineer | Full Stack Developer | AI Engineer"),
  introduction: t("Building software that leaves an impact."),
  headline: [t("Building software"), t("that leaves an"), t("impact")],
  location: t("Nagpur"),
  contactChannels: [
    {
      id: "email",
      label: t("Email"),
      value: "shrinivaswaney@gmail.com",
      href: "mailto:shrinivaswaney@gmail.com",
    },
    {
      id: "phone",
      label: t("Phone"),
      value: "+91-9518988549",
      href: "tel:+91-9518988549",
    },
    {
      id: "linkedin",
      label: t("LinkedIn"),
      value: "Shrinivas Waney",
      href: "https://www.linkedin.com/in/shrinivas-waney",
    },
    {
      id: "instagram",
      label: t("Instagram"),
      value: "shri.waney",
      href: "https://www.instagram.com/shri.waney",
    },
    {
      id: "github",
      label: t("Github"),
      value: "shrinivaswaney22",
      href: "https://www.github.com/shrinivaswaney22",
    },
  ],
  resumePath: "/Shrinivas_Waney_Resume.pdf",
  imagePath: "/profile.png",
} as const satisfies Profile;

export const siteCopy = {
  metadataDescription: t(
    "Portfolio of Shrinivas Waney, Associate Product Engineer. Explore selected software projects, skills, and education.",
  ),
  heroEyebrow: t("Product engineering · Full-stack · AI"),
  heroPanelDescription: t(
    "Full-stack products, reliable systems, and AI-powered software.",
  ),
  navigationLabel: t("Main navigation"),
  openNavigation: t("Open navigation menu"),
  closeNavigation: t("Close navigation menu"),
  homeLabel: t("Home"),
  skipToMain: t("Skip to main content"),
  exploreProjects: t("Explore projects"),
  getInTouch: t("Get in touch"),
  downloadResume: t("Download resume"),
  backToTop: t("Back to top ↑"),
} as const satisfies Record<string, LocalizedText>;

export type NavigationLink = {
  id: string;
  href: `#${string}`;
  label: LocalizedText;
};

export const navigationLinks = [
  { id: "about", href: "#about", label: t("About") },
  { id: "projects", href: "#projects", label: t("Projects") },
  { id: "experience", href: "#experience", label: t("Experience") },
  { id: "contact", href: "#contact", label: t("Contact") },
] as const satisfies readonly NavigationLink[];

export type Section = {
  id: string;
  index?: number;
  label: LocalizedText;
  title: LocalizedText;
};

export const sections = [
  { id: "manifesto", label: t("Point of view"), title: t("Build with intent") },
  { id: "about", index: 1, label: t("About"), title: t("About") },
  { id: "projects", index: 2, label: t("Work"), title: t("Selected projects") },
  {
    id: "experience",
    index: 3,
    label: t("Professional Experience"),
    title: t("Experience"),
  },
  { id: "contact", index: 4, label: t("Contact"), title: t("Let’s connect") },
] as const satisfies readonly Section[];

export type SkillGroup = {
  id: string;
  category: LocalizedText;
  skills: readonly string[];
};

export const skillGroups = [
  {
    id: "languages",
    category: t("Languages"),
    skills: ["JavaScript", "Typescript", "SQL", "Python", "Java"],
  },
  {
    id: "frontend",
    category: t("Frontend"),
    skills: ["Next.js", "React.js", "HTML5", "CSS3", "React Native"],
  },
  {
    id: "backend",
    category: t("Backend"),
    skills: ["Node.js", "REST APIs", "Python", "SpringBoot"],
  },
  {
    id: "databases",
    category: t("Databases"),
    skills: ["PostgreSQL", "MongoDB", "Redis", "NeonDB"],
  },
  {
    id: "tools",
    category: t("Tools"),
    skills: ["Version Control", "Git", "Postman", "Vercel", "Jira"],
  },
  { id: "ai", category: t("AI"), skills: ["Prompt Engineering"] },
  {
    id: "core-concepts",
    category: t("Core concepts"),
    skills: ["OOPs", "DBMS", "System Design", "OS", "CCN", "DSA"],
  },
] as const satisfies readonly SkillGroup[];

export type Experience = TimelineEntry & {
  role: LocalizedText;
  organization: LocalizedText;
  highlights: readonly LocalizedText[];
  href?: string;
};

export const experiences = [
  {
    id: "sctpl-associate-product-engineer",
    role: t("Associate Product Engineer"),
    organization: t("Switch Climate Tech"),
    period: t("Oct 2026 - PRESENT"),
    location: t("Pune (Remote)"),
    highlights: [
      t("Building a sustainability product from 0 to 1, ready for deployment."),
      t(
        "Designed the data extraction page UI for displaying and managing 1,00,000+ records.",
      ),
    ],
  },
  {
    id: "sctpl-product-engineer-intern",
    role: t("Product Engineer Intern"),
    organization: t("Switch Climate Tech"),
    period: t("Mar 2026 - Sep 2026"),
    location: t("Pune (Remote)"),
    highlights: [
      t(
        "Shipped 35+ pull requests across 6+ repositories on the company’s multi-micro-frontend carbon-accounting SaaS platform, closing 110+ Jira tickets end-to-end from spec to merge.",
      ),
      t(
        "Resolved 20+ P0/P1 defects across 28+ emission category configurations, eliminating recurring blank-page crashes and broken filters that blocked core assessment workflows.",
      ),
      t(
        "Built a drag-and-drop, auto-persisting dashboard layout system, replacing manual widget configuration with a zero-touch, self-saving layout for the company’s modules.",
      ),
      t(
        "Delivered the report watermark feature end to end: a Settings toggle with Node.js backend support, integrated across GHG, BRSR, BRSR Lite, ESG, ECR and CBAM reports.",
      ),
      t(
        "Rebuilt Emissions Summary navigation and visualization, and upgraded the downloadable report into a branded GHG report with Scope 1, 2 and 3 details, fixing double renders and zero-emission categories leaking into it.",
      ),
      t(
        "Refined the Emissions listing and assessment UX on the new UI: zoom in/out for document previews, assessment category fixes, date validations, stale past-assessment data fixes, and Bill Parser shown only for supported categories.",
      ),
      t(
        "Overhauled the GHG Data Collection UI across the Main, Upload and Extract pages.",
      ),
      t(
        "Enhanced the Portfolio module (receipt and status labels, purchase history, redundant-UI fixes), corrected purchase certificates to show the organization’s name, and replaced localStorage with react-secure-storage.",
      ),
      t(
        "Drove QA-to-staging feature parity and ran recurring UI sanity and functional testing across the Emissions MFE (via the Core host), Insights, and Login and Profile Settings modules, documenting and fixing the bugs found.",
      ),
    ],
  },
  {
    id: "codexintern-web-development",
    role: t("Web Development Intern (Full Stack)"),
    organization: t("CodexIntern"),
    period: t("Nov 2024"),
    location: t("Mumbai (Remote)"),
    highlights: [
      t(
        "Developed 15+ reusable UI components using React.js and TypeScript, improving modularity and maintainability.",
      ),
      t(
        "Engineered 5+ RESTful APIs using Node.js and MongoDB with optimized schema design.",
      ),
      t(
        "Reduced API response latency by 30% through MongoDB query optimization and indexing.",
      ),
      t(
        "Containerized applications using Docker, standardizing deployment workflows.",
      ),
    ],
    href: "/certificates/CodexIntern.jpg",
  },
] as const satisfies readonly Experience[];

export type Education = TimelineEntry & {
  program: LocalizedText;
  institution: LocalizedText;
  grade?: LocalizedText;
};

export const education = [
  {
    id: "btech-computer-engineering",
    program: t("B.Tech in Computer Engineering"),
    institution: t("Bhavan’s Sardar Patel Institute of Technology"),
    period: t("Nov 2022 – Jul 2026"),
    location: t("Mumbai, MH, India"),
  },
  {
    id: "higher-secondary-kv-vsn",
    program: t("Higher Secondary Certification"),
    institution: t("Kendriya Vidyalaya, VSN"),
    period: t("Jun 2020 – Jul 2022"),
    location: t("Nagpur, MH, India"),
    grade: t("79.8%"),
  },
  {
    id: "higher-secondary-bhavans-bp",
    program: t("Higher Secondary Certification"),
    institution: t("Bhavan’s B.P. Vidya Mandir, Civil Lines"),
    period: t("Jul 2019 – Jun 2020"),
    location: t("Nagpur, MH, India"),
    grade: t("91.8%"),
  },
] as const satisfies readonly Education[];

export type Project = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  technologies: readonly string[];
  highlights: readonly LocalizedText[];
  sourceUrl?: string;
};

export const projects = [
  {
    id: "finance-ai",
    title: t("Finance AI – Financial Observability Platform"),
    summary: t(
      "A financial observability platform with a double-entry ledger, transactional workflows, and expense categorization.",
    ),
    technologies: ["Spring Boot", "PostgreSQL", "Redis", "Docker", "Next.js"],
    highlights: [
      t(
        "Designed an immutable double-entry ledger with debit–credit validation for 10K+ transactions.",
      ),
      t(
        "Built ACID-compliant workflows and a snapshot-based net-worth system with sub-50ms analytics retrieval.",
      ),
      t(
        "Added idempotent CSV ingestion and LLM-powered expense categorization.",
      ),
    ],
  },
  {
    id: "aimpact",
    title: t("AImpact – AI Interview Platform"),
    summary: t(
      "A full-stack interview platform for mock interviews and contextual question-and-answer evaluation.",
    ),
    technologies: ["Next.js", "Gemini API", "MongoDB", "Clerk"],
    highlights: [
      t("Integrated an LLM API to generate structured interview feedback."),
      t(
        "Implemented authentication and protected routing with JWT-based sessions.",
      ),
      t(
        "Designed MongoDB session tracking and deployed the production build on Vercel with CI/CD.",
      ),
    ],
    sourceUrl: "https://github.com/shrinivaswaney22/aimpact",
  },
] as const satisfies readonly Project[];

export type Certification = {
  id: string;
  title: LocalizedText;
  provider: string;
  href?: string;
};

export const professionalDevelopment = [
  {
    id: "systems-thinking",
    title: t("Systems Thinking"),
    provider: "SystemsTree",
    href: "/certificates/SystemsThinking.pdf",
  },
  {
    id: "communication-skills",
    title: t("Communication Skills"),
    provider: "TcsIon",
    href: "/certificates/CommunicationSkills.pdf",
  },
  {
    id: "soft-skills",
    title: t("Soft Skills"),
    provider: "TcsIon",
    href: "/certificates/SoftSkills.pdf",
  },
  {
    id: "envs-203",
    title: t("Environmental Ethics, Justice, and World Views"),
    provider: "Saylor.Org",
    href: "/certificates/ENVS203.pdf",
  },
  {
    id: "react-redux",
    title: t("React and Redux Certification"),
    provider: "Complete Coding",
  },
  {
    id: "javascript",
    title: t("JavaScript Certification"),
    provider: "Complete Coding",
  },
  { id: "html", title: t("HTML Certification"), provider: "Complete Coding" },
] as const satisfies readonly Certification[];

export type Pillar = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type LabHighlight = {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  href: string;
};

export const impactStatements: readonly LocalizedText[] = [];
export const pillars: readonly Pillar[] = [];
export const labHighlights: readonly LabHighlight[] = [];
