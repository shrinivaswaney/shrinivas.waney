import { t, type LocalizedText } from '@/data/portfolio';

export type SkillGroup = {
  id: string;
  category: LocalizedText;
  skills: readonly string[];
};

export const skillGroups = [
  {
    id: 'languages',
    category: t('Languages'),
    skills: ['JavaScript', 'TypeScript', 'SQL', 'Python', 'Java'],
  },
  {
    id: 'frontend',
    category: t('Frontend'),
    skills: ['Next.js', 'React.js', 'HTML5', 'CSS3', 'React Native'],
  },
  {
    id: 'backend',
    category: t('Backend'),
    skills: ['Node.js', 'REST APIs', 'Python', 'Spring Boot'],
  },
  {
    id: 'databases',
    category: t('Databases'),
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Neon'],
  },
  {
    id: 'tools',
    category: t('Tools'),
    skills: ['Git', 'Postman', 'Vercel', 'Jira'],
  },
  { id: 'ai', category: t('AI'), skills: ['Prompt Engineering'] },
  {
    id: 'core-concepts',
    category: t('Core concepts'),
    skills: ['OOP', 'DBMS', 'System Design', 'Operating Systems', 'Computer Networks', 'DSA'],
  },
] as const satisfies readonly SkillGroup[];
