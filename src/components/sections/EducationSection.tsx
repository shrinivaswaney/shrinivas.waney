'use client';

import { education } from '@/data/education';
import { getLocalizedText } from '@/data/portfolio';
import { siteCopy } from '@/data/meta';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import {
  EducationGrid,
  EducationItem,
  EducationLocation,
  EducationPeriod,
  EducationPlace,
  EducationProgram,
  EducationSectionContainer,
  EducationTitle,
} from './styles/EducationSection.styles';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const context = gsap.context(() => {
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

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <EducationSectionContainer ref={sectionRef} id="education">
      <EducationTitle>{getLocalizedText(siteCopy.aboutEducation)}</EducationTitle>
      <EducationGrid>
        {education.map((item) => (
          <EducationItem key={item.id} data-reveal>
            <EducationPeriod>{getLocalizedText(item.period)}</EducationPeriod>
            <EducationProgram>{getLocalizedText(item.program)}</EducationProgram>
            <EducationPlace>{getLocalizedText(item.institution)}</EducationPlace>
            <EducationLocation>{getLocalizedText(item.location)}</EducationLocation>
          </EducationItem>
        ))}
      </EducationGrid>
    </EducationSectionContainer>
  );
};

export default EducationSection;
