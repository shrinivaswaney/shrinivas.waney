import { ProjectsPage } from '@/components/projects/ProjectsPage';
import { projectsPageCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import type { Metadata } from 'next';

const name = getLocalizedText(profile.name);
const description = getLocalizedText(projectsPageCopy.description);

export const metadata: Metadata = {
  title: `Projects | ${name}`,
  description,
  openGraph: {
    title: `Projects | ${name}`,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Projects | ${name}`,
    description,
  },
};

export default function ProjectsRoute() {
  return <ProjectsPage />;
}
