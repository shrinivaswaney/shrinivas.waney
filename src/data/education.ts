import { t, type LocalizedText, type TimelineEntry } from '@/data/portfolio';

export type Education = TimelineEntry & {
  program: LocalizedText;
  institution: LocalizedText;
  grade?: LocalizedText;
};

export const education = [
  {
    id: 'btech-computer-engineering',
    program: t('B.Tech in Computer Engineering'),
    institution: t('Bhavan’s Sardar Patel Institute of Technology'),
    period: t('Nov 2022 - Jul 2026'),
    location: t('Mumbai, MH, India'),
  },
  {
    id: 'higher-secondary-kv-vsn',
    program: t('Higher Secondary Certification'),
    institution: t('Kendriya Vidyalaya, VSN'),
    period: t('Jun 2020 - Jul 2022'),
    location: t('Nagpur, MH, India'),
    grade: t('79.8%'),
  },
  {
    id: 'higher-secondary-bhavans-bp',
    program: t('Higher Secondary Certification'),
    institution: t('Bhavan’s B.P. Vidya Mandir, Civil Lines'),
    period: t('Jul 2019 - Jun 2020'),
    location: t('Nagpur, MH, India'),
    grade: t('91.8%'),
  },
] as const satisfies readonly Education[];
