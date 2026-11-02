import { t, type LocalizedText } from '@/data/portfolio';

export type Certification = {
  id: string;
  title: LocalizedText;
  provider: string;
  href?: string;
};

export const professionalDevelopment = [
  {
    id: 'systems-thinking',
    title: t('Systems Thinking'),
    provider: 'SystemsTree',
    href: '/certificates/SystemsThinking.pdf',
  },
  {
    id: 'communication-skills',
    title: t('Communication Skills'),
    provider: 'TCS Ion',
    href: '/certificates/CommunicationSkills.pdf',
  },
  {
    id: 'soft-skills',
    title: t('Soft Skills'),
    provider: 'TCS Ion',
    href: '/certificates/SoftSkills.pdf',
  },
  {
    id: 'envs-203',
    title: t('Environmental Ethics, Justice, and World Views'),
    provider: 'Saylor Academy',
    href: '/certificates/ENVS203.pdf',
  },
  {
    id: 'react-redux',
    title: t('React and Redux Certification'),
    provider: 'Complete Coding',
  },
  {
    id: 'javascript',
    title: t('JavaScript Certification'),
    provider: 'Complete Coding',
  },
  { id: 'html', title: t('HTML Certification'), provider: 'Complete Coding' },
] as const satisfies readonly Certification[];
