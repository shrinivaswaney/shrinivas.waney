'use client';

import { Counter } from '@/components/ui/Counter';
import { SplitText } from '@/components/ui/Kinetic';
import { projectsPageCopy, siteCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { ArrowLeftIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { ProjectFilter } from './ProjectFilter';
import { ProjectIndex } from './ProjectIndex';
import {
  BackLink,
  Explorer,
  Header,
  HeroBlock,
  HeroRow,
  Page,
  PageTitle,
  ProfileLink,
  SectionLabelBar,
  SectionLabelCurrent,
  SectionLabelIndex,
  SectionLabelRow,
  Shell,
  Stat,
  StatLabel,
  Stats,
  StatValue,
  TopBar,
} from './styles/Projects.styles';

const UNIQUE_TECHNOLOGY = (technology: string, index: number, list: string[]) =>
  list.indexOf(technology) === index;

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);

  const availableTechnologies = useMemo(
    () => projects.flatMap((project) => project.technologies).filter(UNIQUE_TECHNOLOGY),
    [],
  );
  const github = profile.contactChannels.find((channel) => channel.id === 'github');
  const query = searchTerm.trim().toLowerCase();

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesTechnology =
          !selectedTechnology ||
          project.technologies.some((technology) => technology === selectedTechnology);
        if (!matchesTechnology) return false;
        if (!query) return true;

        const searchable = [
          getLocalizedText(project.title),
          getLocalizedText(project.summary),
          ...project.technologies,
          ...project.highlights.map((highlight) => getLocalizedText(highlight)),
        ]
          .join(' ')
          .toLowerCase();

        return searchable.includes(query);
      }),
    [query, selectedTechnology],
  );

  return (
    <Page id="main">
      <Shell>
        <Header>
          <TopBar>
            <BackLink href="/">
              <ArrowLeftIcon size={12} aria-hidden="true" />
              {getLocalizedText(projectsPageCopy.backHome)}
            </BackLink>
            {github && (
              <ProfileLink href={github.href} target="_blank" rel="noopener noreferrer">
                <GithubLogoIcon size={14} aria-hidden="true" />
                {getLocalizedText(projectsPageCopy.githubProfile)}
              </ProfileLink>
            )}
          </TopBar>

          <HeroRow>
            <HeroBlock>
              <SectionLabelRow>
                <SectionLabelBar aria-hidden="true" />
                <SectionLabelIndex aria-hidden="true">
                  [ <SectionLabelCurrent>01</SectionLabelCurrent> / 01 ]
                </SectionLabelIndex>
                <span aria-hidden="true">·</span>
                <span>{getLocalizedText(projectsPageCopy.allProjects)}</span>
              </SectionLabelRow>
              <PageTitle>
                <SplitText
                  as="span"
                  trigger="scroll"
                  text={getLocalizedText(siteCopy.indexTitle)}
                />
              </PageTitle>
            </HeroBlock>

            <Stats>
              <Stat>
                <StatValue>
                  <Counter value={projects.length} />
                </StatValue>
                <StatLabel>{getLocalizedText(projectsPageCopy.caseStudies)}</StatLabel>
              </Stat>
              <Stat>
                <StatValue>
                  <Counter value={availableTechnologies.length} />
                </StatValue>
                <StatLabel>{getLocalizedText(projectsPageCopy.technologies)}</StatLabel>
              </Stat>
            </Stats>
          </HeroRow>
        </Header>

        <Explorer>
          <ProjectFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTechnology={selectedTechnology}
            setSelectedTechnology={setSelectedTechnology}
            availableTechnologies={availableTechnologies}
          />
          <ProjectIndex projects={filteredProjects} />
        </Explorer>
      </Shell>
    </Page>
  );
}
