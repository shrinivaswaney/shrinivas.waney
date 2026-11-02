'use client';

import { SplitText } from '@/components/ui/Kinetic';
import { ScreenReaderOnly } from '@/components/ui/ScreenReaderOnly';
import { projectsPageCopy, projectsSectionCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { projects, type Project } from '@/data/projects';
import { sections } from '@/data/sectionsMeta';
import { ArrowRightIcon, ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import {
  Actions,
  AllArrow,
  AllLink,
  AllMeta,
  AllTitle,
  Card,
  CardBody,
  CardInfo,
  CardMeta,
  CardMetaIndex,
  CardText,
  CardTitle,
  Chip,
  ChipRow,
  GhostLink,
  Heading,
  IntroFooter,
  IntroPanel,
  Lead,
  MediaImage,
  MediaInner,
  MediaLink,
  ProgressBar,
  ProgressTrack,
  Projects,
  ScrollHint,
  SectionLabelBar,
  SectionLabelCurrent,
  SectionLabelIndex,
  SectionLabelRow,
  SolidLink,
  Track,
} from './styles/ProjectsSection.styles';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/**
 * Projects: horizontal gallery pinned on large screens, vertical stack on mobile
 * and for visitors who prefer reduced motion.
 */
export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const entry = sections.find((section) => section.id === 'projects');
  const sectionIndex = entry && 'index' in entry ? entry.index : 2;
  const sectionTotal = sections.reduce(
    (max, section) => Math.max(max, 'index' in section ? section.index : 0),
    0,
  );
  const total = String(projects.length).padStart(2, '0');
  const title = entry ? getLocalizedText(entry.title) : 'Selected projects';
  const featured: readonly Project[] = projects;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(GALLERY_QUERY, () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      if (distance() === 0) return;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Slight parallax on the visuals while the track moves sideways.
      track.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(
          element,
          { xPercent: 6 },
          {
            xPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      });

      return () => {
        if (progress) progress.style.transform = '';
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Projects ref={sectionRef} id="projects" aria-labelledby="projects-title">
      <Track ref={trackRef}>
        <IntroPanel>
          <div>
            <SectionLabelRow>
              <SectionLabelBar aria-hidden="true" />
              <SectionLabelIndex aria-hidden="true">
                [ <SectionLabelCurrent>{String(sectionIndex).padStart(2, '0')}</SectionLabelCurrent>{' '}
                / {String(sectionTotal).padStart(2, '0')} ]
              </SectionLabelIndex>
              <span aria-hidden="true">·</span>
              <span>{getLocalizedText(projectsSectionCopy.kicker)}</span>
            </SectionLabelRow>
            <Heading id="projects-title">
              <SplitText as="span" text={title} />
            </Heading>
          </div>

          <IntroFooter>
            <Lead>{getLocalizedText(projectsSectionCopy.lead)}</Lead>
            <ScrollHint>{getLocalizedText(projectsSectionCopy.scrollHint)} →</ScrollHint>
          </IntroFooter>
        </IntroPanel>

        {featured.map((project, index) => {
          const projectTitle = getLocalizedText(project.title);
          const projectSummary = getLocalizedText(project.summary);
          const href = `/projects#${project.id}`;

          return (
            <Card key={project.id}>
              <CardMeta>
                <span>
                  <CardMetaIndex>{String(index + 1).padStart(2, '0')}</CardMetaIndex> / {total}
                </span>
                <span>{getLocalizedText(projectsSectionCopy.caseStudy)}</span>
              </CardMeta>

              <MediaLink
                href={href}
                data-cursor={getLocalizedText(projectsSectionCopy.viewProject)}
                aria-label={`${getLocalizedText(projectsSectionCopy.viewProject)} — ${projectTitle}`}
              >
                <MediaInner data-parallax>
                  {project.previewImage && (
                    <MediaImage
                      src={project.previewImage}
                      original={project.previewImage}
                      alt={projectTitle}
                      position="center"
                    />
                  )}
                </MediaInner>
              </MediaLink>

              <CardBody>
                <CardTitle>{projectTitle}</CardTitle>
                <CardInfo>
                  <CardText>{projectSummary}</CardText>
                  <ChipRow>
                    <ScreenReaderOnly as="h4" data-screen-reader-only="">
                      {getLocalizedText(projectsPageCopy.technologiesLabel)}
                    </ScreenReaderOnly>
                    {project.technologies.map((technology) => (
                      <Chip key={technology}>{technology}</Chip>
                    ))}
                  </ChipRow>
                  <Actions>
                    <SolidLink href={href}>
                      {getLocalizedText(projectsSectionCopy.viewProject)}
                      <ArrowUpRightIcon size={13} aria-hidden="true" />
                    </SolidLink>
                    {project.previewUrl && (
                      <GhostLink
                        href={project.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getLocalizedText(projectsPageCopy.livePreview)}
                        <ArrowUpRightIcon size={13} aria-hidden="true" />
                      </GhostLink>
                    )}
                    {project.sourceUrl && (
                      <GhostLink href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <GithubLogoIcon size={14} aria-hidden="true" />
                        {getLocalizedText(projectsPageCopy.viewCode)}
                      </GhostLink>
                    )}
                  </Actions>
                </CardInfo>
              </CardBody>
            </Card>
          );
        })}

        <AllLink href="/projects" data-cursor={getLocalizedText(projectsSectionCopy.viewAll)}>
          <AllMeta>
            {getLocalizedText(projectsPageCopy.allProjects)} · {total}
          </AllMeta>
          <AllTitle>
            {getLocalizedText(projectsSectionCopy.viewAll)}
            <AllArrow aria-hidden="true">
              <ArrowRightIcon size={40} />
            </AllArrow>
          </AllTitle>
        </AllLink>
      </Track>

      <ProgressTrack aria-hidden="true">
        <ProgressBar ref={progressRef} />
      </ProgressTrack>
    </Projects>
  );
};

export default ProjectsSection;
