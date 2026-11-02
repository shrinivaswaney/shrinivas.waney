import { t, type LocalizedText, type TimelineEntry } from '@/data/portfolio';

export type Experience = TimelineEntry & {
  role: LocalizedText;
  organization: LocalizedText;
  highlights: readonly LocalizedText[];
  href?: string;
};

export const experiences = [
  {
    id: 'sctpl-associate-product-engineer',
    role: t('Associate Product Engineer'),
    organization: t('Switch Climate Tech'),
    period: t('Oct 2026 - Present'),
    location: t('Pune (Remote)'),
    highlights: [
      t(
        'Building a sustainability product from zero to launch, with deployment readiness as the goal from day one.',
      ),
      t('Designed the data extraction UI for browsing and managing 100,000+ records.'),
    ],
  },
  {
    id: 'sctpl-product-engineer-intern',
    role: t('Product Engineer Intern'),
    organization: t('Switch Climate Tech'),
    period: t('Mar 2026 - Sep 2026'),
    location: t('Pune (Remote)'),
    highlights: [
      t(
        'Shipped 35+ pull requests across 6+ repositories of a multi-micro-frontend carbon-accounting SaaS platform, closing 110+ Jira tickets from spec to merge.',
      ),
      t(
        'Resolved 20+ P0/P1 defects across 28+ emission category configurations, ending recurring blank-page crashes and broken filters that blocked core assessment workflows.',
      ),
      t(
        'Built a drag-and-drop dashboard layout system that saves automatically, replacing manual widget configuration.',
      ),
      t(
        'Delivered the report watermark feature end to end: a Settings toggle with Node.js backend support, applied across GHG, BRSR, BRSR Lite, ESG, ECR and CBAM reports.',
      ),
      t(
        'Rebuilt Emissions Summary navigation and visualization, and upgraded the downloadable report into a branded GHG report with Scope 1, 2 and 3 breakdowns.',
      ),
      t(
        'Overhauled the GHG Data Collection UI (Main, Upload and Extract pages) and refined Emissions assessment UX, including document zoom, date validation and stale-data fixes.',
      ),
      t('Improved the Portfolio module, and replaced localStorage with react-secure-storage.'),
      t(
        'Ran recurring functional testing across the Emissions, Insights and Settings modules, and drove QA-to-staging feature parity.',
      ),
    ],
  },
  {
    id: 'codexintern-web-development',
    role: t('Web Development Intern (Full Stack)'),
    organization: t('CodexIntern'),
    period: t('Nov 2024'),
    location: t('Mumbai (Remote)'),
    highlights: [
      t(
        'Built 15+ reusable UI components in React and TypeScript, improving modularity and maintainability.',
      ),
      t('Developed 5+ RESTful APIs with Node.js and MongoDB, using an optimized schema design.'),
      t('Cut API response latency by 30% through query optimization and indexing.'),
      t('Containerized applications with Docker to standardize deployment.'),
    ],
    href: '/certificates/CodexIntern.jpg',
  },
] as const satisfies readonly Experience[];
