import { t, type LocalizedText } from '@/data/portfolio';

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
  currentRole: LocalizedText;
  role: LocalizedText;
  introduction: LocalizedText;
  headline: readonly LocalizedText[];
  location: LocalizedText;
  contactChannels: readonly ContactChannel[];
  resumePath: string;
  imagePath: string;
};

export const profile = {
  name: t('Shrinivas Waney'),
  brand: t('Shrinivas.Waney'),
  initials: 'SW',
  currentRole: t('Associate Product Engineer'),
  role: t('Product Engineer | Full Stack Developer | AI Engineer'),
  introduction: t(
    'I build full-stack products and AI-powered software that hold up in production.',
  ),
  headline: [t('Building'), t('software'), t('that leaves an impact')],
  location: t('Nagpur, India'),
  contactChannels: [
    {
      id: 'email',
      label: t('Email'),
      value: 'shrinivaswaney@gmail.com',
      href: 'mailto:shrinivaswaney@gmail.com',
    },
    {
      id: 'phone',
      label: t('Phone'),
      value: '+91-9518988549',
      href: 'tel:+91-9518988549',
    },
    {
      id: 'linkedin',
      label: t('LinkedIn'),
      value: 'Shrinivas Waney',
      href: 'https://www.linkedin.com/in/shrinivas-waney',
    },
    {
      id: 'instagram',
      label: t('Instagram'),
      value: 'shri.waney',
      href: 'https://www.instagram.com/shri.waney',
    },
    {
      id: 'github',
      label: t('GitHub'),
      value: 'shrinivaswaney22',
      href: 'https://github.com/shrinivaswaney22',
    },
  ],
  resumePath: '/Shrinivas_Waney_Resume.pdf',
  imagePath: '/profile.png',
} as const satisfies Profile;
