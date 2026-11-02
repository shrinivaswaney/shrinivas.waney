import { t, type LocalizedText } from '@/data/portfolio';

export const siteCopy = {
  metadataDescription: t(
    'Portfolio of Shrinivas Waney, a Product Engineer building full-stack products and AI-powered software. Explore selected projects, skills, and experience.',
  ),
  heroEyebrow: t('Product engineering · Full-stack · AI'),
  heroPanelDescription: t(
    'Full-stack products, dependable systems, and AI-powered software built to ship.',
  ),
  heroAnnounce: t('Open to new opportunities — building products end to end'),
  heroAnnounceCta: t('Say hello'),
  heroOpenToWork: t('Open to new opportunities'),
  heroTagline: t('Full-stack developer | product engineer | AI engineer'),
  localTime: t('Local time'),
  indexTitle: t('Index'),
  scroll: t('Scroll'),
  manifestoSub: t('Software, AI and cloud serving real-world operations.'),
  aboutKicker: t('Profile'),
  aboutTitle: t('From code to operations'),
  aboutAI: t('Agents & applied AI'),
  aboutAIText: t(
    'AI-assisted interfaces and LLM integrations that turn messy inputs into useful, reviewable output.',
  ),
  aboutOps: t('Automation & data'),
  aboutOpsText: t(
    'Python and Node.js pipelines that move data between APIs, reports and product surfaces — less manual work, fewer places for things to drift.',
  ),
  aboutCloud: t('Cloud & observability'),
  aboutCloudText: t(
    'Deployment, monitoring and release workflows across Vercel, Neon and Docker: fast systems with enough visibility to fix them when they are not.',
  ),
  aboutIntro: t(
    'I am a product engineer working across full-stack development, applied AI and the cloud. I like taking a rough workflow, shaping it into a clear interface, and building the systems that keep it dependable in production.',
  ),
  aboutExpertise: t(
    'My day-to-day spans React, Next.js, TypeScript, Python and Node.js, with APIs, data modelling and deployment close behind. I have shipped product work across multi-repository front ends, built data-heavy interfaces, and delivered features from specification through QA and release.',
  ),
  aboutPassion: t(
    'I am most interested in applied AI, automation and developer experience: agents and LLM integrations that remove real work, dashboards that make complex data legible, and infrastructure that stays observable after launch.',
  ),
  aboutSkills: t('Skills'),
  aboutExperience: t('Professional Experience'),
  aboutEducation: t('Education'),
  aboutImpact: t('Impact & Results'),
  aboutInterests: t('Areas of focus'),
  aboutBasedIn: t('Based in'),
  aboutRole: t('Role'),
  aboutAt: t('At'),
  aboutFocusLabel: t('Focus'),
  aboutFocus: t('Full-stack · AI · Cloud'),
  stackKicker: t('Stack'),
  pathKicker: t('Path'),
  impactKicker: t('Results'),
  viewResume: t('View resume'),
  readMore: t('Read more'),
  readLess: t('Show less'),
  navigationLabel: t('Main navigation'),
  openNavigation: t('Open navigation menu'),
  closeNavigation: t('Close navigation menu'),
  switchToLightMode: t('Switch to light mode'),
  switchToDarkMode: t('Switch to dark mode'),
  homeLabel: t('Home'),
  skipToMain: t('Skip to main content'),
  exploreProjects: t('Explore projects'),
  getInTouch: t('Get in touch'),
  downloadResume: t('Download resume'),
  backToTop: t('Back to top ↑'),
} as const satisfies Record<string, LocalizedText>;

export const impactStatements: readonly LocalizedText[] = [
  t('Shipped 35+ pull requests across a multi-repository carbon-accounting platform.'),
  t('Closed 110+ Jira tickets from specification to merge.'),
  t('Resolved 20+ P0/P1 defects across 28+ emission category configurations.'),
  t('Designed a data extraction UI for browsing and managing 100,000+ records.'),
  t('Cut API response latency by 30% through query optimization and indexing.'),
  t('Delivered compliant report generation across GHG, BRSR, ESG, ECR and CBAM.'),
];
