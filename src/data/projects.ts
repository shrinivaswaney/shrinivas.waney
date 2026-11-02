import { t, type LocalizedText } from '@/data/portfolio';

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
  },
] as const satisfies readonly Project[];
