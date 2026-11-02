'use client';

import { Expandable, ExpandButton } from '@/components/ui/Expandable';
import { SplitText } from '@/components/ui/Kinetic';
import { experiences } from '@/data/experience';
import { impactStatements, siteCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { aboutInterests, sections } from '@/data/sectionsMeta';
import { skillGroups } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { firstLines } from '@/lib/collapse';
import { ArrowRightIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import {
  About,
  AboutHeading,
  ActionGrid,
  Aside,
  BlockHeader,
  BlockTitle,
  BodyParagraph,
  Chip,
  ChipRow,
  DownloadMeta,
  GhostLink,
  Header,
  ImpactBlock,
  ImpactCard,
  ImpactGrid,
  ImpactNumber,
  ImpactText,
  InterestItem,
  InterestList,
  Interests,
  InterestSeparator,
  InterestsKicker,
  IntroColumn,
  IntroGrid,
  IntroReadMore,
  IntroText,
  Kicker,
  MetaKey,
  MetaRow,
  MetaValue,
  Pillar,
  PillarImage,
  PillarKicker,
  PillarsWrap,
  PillarText,
  PillarTitle,
  ProfileCard,
  ProfileKicker,
  ReadMoreBody,
  SectionLabelBar,
  SectionLabelCurrent,
  SectionLabelIndex,
  SectionLabelRow,
  SkillCard,
  SkillCardHeader,
  SkillCardIndex,
  SkillCardTitle,
  SkillsBlock,
  SkillsGrid,
  SolidLink,
} from './styles/AboutSection.styles';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    image: '/assets/hero/ray-burst-800.webp',
    title: siteCopy.aboutAI,
    text: siteCopy.aboutAIText,
    tag: 'AI',
  },
  {
    image: '/assets/art/ridge-lines.png',
    title: siteCopy.aboutOps,
    text: siteCopy.aboutOpsText,
    tag: 'OPS',
  },
  {
    image: '/assets/art/globe-halftone.png',
    title: siteCopy.aboutCloud,
    text: siteCopy.aboutCloudText,
    tag: 'CLOUD',
  },
] as const;

export const AboutSection: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const aboutEntry = sections.find((section) => section.id === 'about');
  const aboutIndex = aboutEntry && 'index' in aboutEntry ? aboutEntry.index : 1;
  const sectionTotal = sections.reduce(
    (max, section) => Math.max(max, 'index' in section ? section.index : 0),
    0,
  );
  const primaryRole = experiences[0];
  const skills = skillGroups.map((group) => ({
    id: group.id,
    title: getLocalizedText(group.category),
    items: group.skills,
  }));
  const skillCount = skills.reduce((total, group) => total + group.items.length, 0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    let context: gsap.Context | null = null;
    let cancelled = false;

    // Expandables collapse after hydration (mobile), which changes the layout.
    // Create the triggers on the next frame so they measure the final heights.
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
    <About ref={sectionRef} id="about">
      <Header>
        <SectionLabelRow>
          <SectionLabelBar aria-hidden="true" />
          <SectionLabelIndex aria-hidden="true">
            [ <SectionLabelCurrent>{String(aboutIndex).padStart(2, '0')}</SectionLabelCurrent> /{' '}
            {String(sectionTotal).padStart(2, '0')} ]
          </SectionLabelIndex>
          <span aria-hidden="true">·</span>
          <span>{aboutEntry ? getLocalizedText(aboutEntry.label) : 'About'}</span>
        </SectionLabelRow>
        <AboutHeading>
          <SplitText as="span" text={getLocalizedText(siteCopy.aboutTitle)} />
        </AboutHeading>
      </Header>

      <IntroGrid>
        <IntroColumn>
          <IntroText text={getLocalizedText(siteCopy.aboutIntro)} />
          {/* On mobile only the first lines are shown until "read more". */}
          <Expandable id="about-more" open={showMore} collapsed={firstLines(2)}>
            <ReadMoreBody>
              <BodyParagraph data-reveal>{getLocalizedText(siteCopy.aboutExpertise)}</BodyParagraph>
              <BodyParagraph data-reveal>{getLocalizedText(siteCopy.aboutPassion)}</BodyParagraph>
            </ReadMoreBody>
          </Expandable>
          <IntroReadMore>
            <ExpandButton
              open={showMore}
              onClick={() => setShowMore((value) => !value)}
              controls="about-more"
              label={getLocalizedText(siteCopy.readMore)}
              openLabel={getLocalizedText(siteCopy.readLess)}
            />
          </IntroReadMore>
        </IntroColumn>

        <Aside data-reveal>
          <ProfileCard>
            <ProfileKicker>{getLocalizedText(siteCopy.aboutKicker)}</ProfileKicker>
            <MetaRow>
              <MetaKey>{getLocalizedText(siteCopy.aboutBasedIn)}</MetaKey>
              <MetaValue>{getLocalizedText(profile.location)}</MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaKey>{getLocalizedText(siteCopy.aboutRole)}</MetaKey>
              <MetaValue>
                {primaryRole ? getLocalizedText(primaryRole.role) : '—'}
              </MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaKey>{getLocalizedText(siteCopy.aboutAt)}</MetaKey>
              <MetaValue>
                {primaryRole ? getLocalizedText(primaryRole.organization) : '—'}
              </MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaKey>{getLocalizedText(siteCopy.aboutFocusLabel)}</MetaKey>
              <MetaValue>{getLocalizedText(siteCopy.aboutFocus)}</MetaValue>
            </MetaRow>

            <ActionGrid>
              <SolidLink href="/resume">
                {getLocalizedText(siteCopy.viewResume)}
                <ArrowRightIcon size={14} aria-hidden="true" />
              </SolidLink>
              <GhostLink href={profile.resumePath} download>
                {getLocalizedText(siteCopy.downloadResume)}
                <DownloadMeta>
                  PDF <DownloadSimpleIcon size={14} aria-hidden="true" />
                </DownloadMeta>
              </GhostLink>
            </ActionGrid>
          </ProfileCard>
        </Aside>
      </IntroGrid>

      <PillarsWrap>
        {PILLARS.map((pillar, index) => (
          <Pillar key={pillar.tag} data-reveal>
            <PillarImage src={pillar.image} alt={getLocalizedText(pillar.title)} />
            <div>
              <PillarKicker>
                #{String(index + 1).padStart(2, '0')} · {pillar.tag}
              </PillarKicker>
              <PillarTitle>{getLocalizedText(pillar.title)}</PillarTitle>
              <PillarText>{getLocalizedText(pillar.text)}</PillarText>
            </div>
          </Pillar>
        ))}
      </PillarsWrap>

      <SkillsBlock>
        <BlockHeader>
          <BlockTitle>
            <SplitText as="span" text={getLocalizedText(siteCopy.aboutSkills)} />
          </BlockTitle>
          <Kicker>
            {getLocalizedText(siteCopy.stackKicker)} · {skillCount}
          </Kicker>
        </BlockHeader>

        <SkillsGrid>
          {skills.map((group, index) => (
            <SkillCard key={group.id} data-reveal>
              <SkillCardHeader>
                <SkillCardTitle>{group.title}</SkillCardTitle>
                <SkillCardIndex>0{index + 1}</SkillCardIndex>
              </SkillCardHeader>
              <ChipRow>
                {group.items.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </ChipRow>
            </SkillCard>
          ))}
        </SkillsGrid>

        <Interests>
          <InterestsKicker>{getLocalizedText(siteCopy.aboutInterests)}</InterestsKicker>
          <InterestList>
            {aboutInterests.map((interest) => {
              const text = getLocalizedText(interest);
              return (
                <InterestItem key={text}>
                  {text}
                  <InterestSeparator aria-hidden="true">/</InterestSeparator>
                </InterestItem>
              );
            })}
          </InterestList>
        </Interests>
      </SkillsBlock>

      <ImpactBlock>
        <BlockHeader>
          <BlockTitle>
            <SplitText as="span" text={getLocalizedText(siteCopy.aboutImpact)} />
          </BlockTitle>
          <Kicker>{getLocalizedText(siteCopy.impactKicker)}</Kicker>
        </BlockHeader>

        <ImpactGrid>
          {impactStatements.map((statement, index) => {
            const text = getLocalizedText(statement);
            return (
              <ImpactCard key={text} data-reveal>
                <ImpactNumber>{String(index + 1).padStart(2, '0')}</ImpactNumber>
                <ImpactText>{text}</ImpactText>
              </ImpactCard>
            );
          })}
        </ImpactGrid>
      </ImpactBlock>
    </About>
  );
};

export default AboutSection;
