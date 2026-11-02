import { t, type LocalizedText } from '@/data/portfolio';

export type Section = {
  id: string;
  index?: number;
  label: LocalizedText;
  title: LocalizedText;
};

export const manifestoWords: readonly LocalizedText[] = [
  t('Automate'),
  t('Integrate'),
  t('Deploy'),
];

export const aboutInterests: readonly LocalizedText[] = [
  t('Applied AI & agents'),
  t('Product engineering'),
  t('Automation & data flows'),
  t('Cloud & observability'),
  t('Developer experience'),
];

export const sections = [
  { id: 'manifesto', label: t('Point of view'), title: t('Build with intent') },
  { id: 'about', index: 1, label: t('About'), title: t('About') },
  { id: 'projects', index: 2, label: t('Work'), title: t('Selected projects') },
  {
    id: 'experience',
    index: 3,
    label: t('Professional Experience'),
    title: t('Experience'),
  },
  { id: 'contact', index: 4, label: t('Contact'), title: t('Let’s connect') },
] as const satisfies readonly Section[];
