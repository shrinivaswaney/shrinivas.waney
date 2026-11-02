import { t, type LocalizedText } from '@/data/portfolio';

export type NavigationLink = {
  id: string;
  href: string;
  label: LocalizedText;
};

export const navigationLinks = [
  { id: 'about', href: '/#about', label: t('About') },
  { id: 'experience', href: '/#experience', label: t('Experience') },
  { id: 'projects', href: '/#projects', label: t('Projects') },
  { id: 'contact', href: '/#contact', label: t('Contact') },
] as const satisfies readonly NavigationLink[];
