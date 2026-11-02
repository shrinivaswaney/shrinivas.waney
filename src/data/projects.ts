import { t, type LocalizedText } from '@/data/portfolio';

export type Project = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  technologies: readonly string[];
  highlights: readonly LocalizedText[];
  sourceUrl?: string;
  previewImage?: string;
  previewUrl?: string;
};

export const projects = [
  {
    id: 'finance-ai',
    title: t('Finance AI: Financial Observability Platform'),
    summary: t(
      'A financial platform with a double-entry ledger, transactional workflows and AI-assisted expense categorization.',
    ),
    technologies: ['Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'Next.js'],
    highlights: [
      t(
        'Designed an immutable double-entry ledger with debit-credit validation across 10K+ transactions.',
      ),
      t(
        'Built ACID-compliant workflows and a snapshot-based net-worth system with sub-50 ms analytics retrieval.',
      ),
      t('Added idempotent CSV ingestion and LLM-powered expense categorization.'),
    ],
    previewImage: '/assets/art/globe-halftone.png',
  },
  {
    id: 'aimpact',
    title: t('AImpact: AI Interview Platform'),
    summary: t(
      'A full-stack mock interview platform that evaluates answers in context and returns structured feedback.',
    ),
    technologies: ['Next.js', 'Gemini API', 'MongoDB', 'Clerk'],
    highlights: [
      t('Integrated an LLM API to generate structured interview feedback.'),
      t('Implemented authentication and protected routes with JWT-based sessions.'),
      t('Tracked sessions in MongoDB and deployed to Vercel with CI/CD.'),
    ],
    sourceUrl: 'https://github.com/shrinivaswaney22/aimpact',
    previewImage: '/projects/aimpact.png',
    previewUrl: 'https://aimpact-tawny.vercel.app/',
  },
  {
    id: 'polaris',
    title: t('Polaris: Travel Planning Platform'),
    summary: t(
      'A travel marketplace for discovering curated itineraries from agencies and managing trip details in one place.',
    ),
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind CSS'],
    highlights: [
      t('Built itinerary discovery with featured trips, popular destinations, and search filters.'),
      t('Implemented account registration with password hashing and NextAuth authentication.'),
      t(
        'Designed a relational data model for travelers, agencies, itineraries, bookings, payments, and reviews.',
      ),
    ],
    sourceUrl: 'https://github.com/shrinivaswaney/polaris',
    previewImage: '/projects/polaris.png',
    previewUrl: '',
  },
] as const satisfies readonly Project[];
