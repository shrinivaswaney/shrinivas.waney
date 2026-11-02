'use client';

import { Expandable, ExpandButton } from '@/components/ui/Expandable';
import { SplitText } from '@/components/ui/Kinetic';
import { experiences } from '@/data/experience';
import { siteCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { firstLines } from '@/lib/collapse';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import {
  ExperienceBody,
  ExperienceChip,
  ExperienceChips,
  ExperienceCompany,
  ExperienceItem,
  ExperienceList,
  ExperienceMain,
  ExperienceMeta,
  ExperienceNumber,
  ExperienceRole,
  ExperienceSectionContainer,
  ExperienceText,
  ExperienceTitle,
  PathKicker,
  ReadMoreSpacer,
  SectionHeader,
} from './styles/ExperienceSection.styles';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const [openExperience, setOpenExperience] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const readMoreLabel = getLocalizedText(siteCopy.readMore);
  const readLessLabel = getLocalizedText(siteCopy.readLess);

  const roles = experiences.map((experience) => ({
    id: experience.id,
    period: getLocalizedText(experience.period),
    title: getLocalizedText(experience.role),
    company: getLocalizedText(experience.organization),
    description: experience.highlights[0] ? getLocalizedText(experience.highlights[0]) : '',
    highlights: experience.highlights.slice(1).map((highlight) => getLocalizedText(highlight)),
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    let context: gsap.Context | null = null;
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (cancelled) return;
      context = gsap.context(() => {
        section.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power4.out',
              scrollTrigger: { trigger: element, start: 'top bottom-=80' },
            },
          );
        });
      }, section);
    });

    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    window.addEventListener('load', refresh);
    void document.fonts?.ready.then(refresh);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('load', refresh);
      context?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <ExperienceSectionContainer ref={sectionRef} id="experience">
      <SectionHeader>
        <ExperienceTitle>
          <SplitText as="span" text={getLocalizedText(siteCopy.aboutExperience)} />
        </ExperienceTitle>
        <PathKicker>{getLocalizedText(siteCopy.pathKicker)}</PathKicker>
      </SectionHeader>

      <ExperienceList>
        {roles.map((role, index) => (
          <ExperienceItem key={role.id} data-reveal>
            <ExperienceMeta>
              <ExperienceNumber>#{index + 1}</ExperienceNumber> · {role.period}
            </ExperienceMeta>
            <ExperienceMain>
              <ExperienceRole>{role.title}</ExperienceRole>
              <ExperienceCompany>{role.company}</ExperienceCompany>
            </ExperienceMain>
            <ExperienceBody>
              <Expandable
                id={`exp-${index}`}
                open={!!openExperience[index]}
                collapsed={firstLines(3)}
              >
                <ExperienceText>{role.description}</ExperienceText>
                {role.highlights.length > 0 && (
                  <ExperienceChips>
                    {role.highlights.map((highlight) => (
                      <ExperienceChip key={`${role.id}-${highlight}`}>{highlight}</ExperienceChip>
                    ))}
                  </ExperienceChips>
                )}
              </Expandable>
              <ReadMoreSpacer>
                <ExpandButton
                  open={!!openExperience[index]}
                  onClick={() =>
                    setOpenExperience((current) => ({
                      ...current,
                      [index]: !current[index],
                    }))
                  }
                  controls={`exp-${index}`}
                  label={readMoreLabel}
                  openLabel={readLessLabel}
                />
              </ReadMoreSpacer>
            </ExperienceBody>
          </ExperienceItem>
        ))}
      </ExperienceList>
    </ExperienceSectionContainer>
  );
};

export default ExperienceSection;
