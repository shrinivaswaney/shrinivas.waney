'use client';

import { SplitText, useProximityWeight } from '@/components/ui/Kinetic';
import { siteCopy } from '@/data/meta';
import { navigationLinks } from '@/data/nav';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { useLocalTime } from '@/hooks/useLocalTime';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { markIntroDone, onIntroDone } from '@/lib/motion';
import { gsap } from 'gsap';
import React, { Suspense, lazy, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  ActionArrow,
  ActionLinks,
  Announcement,
  AnnouncementArrow,
  AnnouncementBadge,
  AnnouncementCta,
  AnnouncementText,
  BlinkingColon,
  BottomVeil,
  Content,
  FooterTagline,
  GhostButton,
  Hero,
  HeroHeading,
  HeroLine,
  HeroLogo,
  HeroVeil,
  IndexArrow,
  IndexHeading,
  IndexLink,
  IndexLinkText,
  IndexList,
  IndexNav,
  IndexNumber,
  IntroCard,
  IntroText,
  LargeStarButton,
  LargeStarGlyph,
  LocationCell,
  LogoPicture,
  MetaCell,
  MetaRow,
  MetaText,
  MobileStarButton,
  OpenLabel,
  RoleCell,
  ScrollArrow,
  ScrollLink,
  SideVeil,
  Signature,
  SignatureFooter,
  SignatureTop,
  SolidButton,
  StarGlyph,
  StatusDot,
  StatusDotCore,
  StatusPing,
  TimeAndStarCell,
  TimeBlock,
  TitleBlock,
  TitleLayout,
} from './styles/HeroSection.styles';

const DitherHero = lazy(() => import('@/components/webgl/DitherHero'));

const STAR_STORAGE_KEY = 'sw-hero-star';
const STAR_CHANGE_EVENT = 'sw-hero-star-change';
const INDEX_LINKS = ['about', 'projects', 'contact'] as const;

const subscribeToStar = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  window.addEventListener(STAR_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(STAR_CHANGE_EVENT, onChange);
  };
};

const getStarSnapshot = () => {
  try {
    return window.localStorage.getItem(STAR_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const getStarServerSnapshot = () => false;

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const localTime = useLocalTime();
  const [hours, minutes] = localTime.split(':');
  const prefersReducedMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const starFound = useSyncExternalStore(subscribeToStar, getStarSnapshot, getStarServerSnapshot);
  const year = new Date().getFullYear();

  const name = getLocalizedText(profile.name);
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');
  const [location, region] = getLocalizedText(profile.location)
    .split(',')
    .map((part) => part.trim());
  const [role, ...roleDetails] = getLocalizedText(profile.role)
    .split('|')
    .map((part) => part.trim());
  const roleDetail = roleDetails.join(' · ');
  const headline = profile.headline.map((line) => getLocalizedText(line));
  const indexLinks = navigationLinks.filter((link) =>
    INDEX_LINKS.includes(link.id as (typeof INDEX_LINKS)[number]),
  );

  useProximityWeight(titleRef, { min: 250, max: 800, radius: 300 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('[data-animate-in]');
    gsap.set(elements, { opacity: 0, y: prefersReducedMotion ? 0 : 18 });

    const stop = onIntroDone(() => {
      setIntroDone(true);
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: prefersReducedMotion ? 0.3 : 1.1,
        stagger: prefersReducedMotion ? 0 : 0.05,
        delay: 0.35,
        ease: 'expo.out',
      });
    });

    // No preloader is mounted yet, so the hero starts the entrance itself.
    markIntroDone();

    return stop;
  }, [prefersReducedMotion]);

  const handleStarClick = () => {
    try {
      window.localStorage.setItem(STAR_STORAGE_KEY, '1');
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(STAR_CHANGE_EVENT));

    if (!prefersReducedMotion) {
      const starElement = document.querySelector('.star-icon');
      if (starElement) {
        gsap.from(starElement, {
          scale: 0.5,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      }
    }
  };

  const starLabel = starFound ? 'Star found' : 'Hidden star';

  return (
    <Hero ref={containerRef} id="top">
      <Suspense fallback={null}>
        <DitherHero intro={introDone} />
      </Suspense>

      <HeroVeil aria-hidden="true" />
      {/* Mobile / tablet: veil under the text (bottom half), the sphere stays crisp above */}
      <BottomVeil aria-hidden="true" />
      {/* Side veil for title legibility: large screens only (portrait keeps the sphere above the text) */}
      <SideVeil aria-hidden="true" />

      <Content>
        {/* Announcement banner */}
        <Announcement href="#contact" data-scroll-to="contact" data-animate-in>
          <AnnouncementBadge>SW</AnnouncementBadge>
          <AnnouncementText>{getLocalizedText(siteCopy.heroAnnounce)}</AnnouncementText>
          <AnnouncementCta>{getLocalizedText(siteCopy.heroAnnounceCta)}</AnnouncementCta>
          <AnnouncementArrow aria-hidden="true" />
        </Announcement>

        {/* Hidden star (mobile: the meta row is hidden to leave room for the sphere) */}
        <MobileStarButton
          type="button"
          onClick={handleStarClick}
          aria-label={starLabel}
          aria-pressed={starFound}
        >
          <StarGlyph weight={starFound ? 'fill' : 'regular'} aria-hidden="true" />
        </MobileStarButton>

        {/* Meta row (tablet and up) */}
        <MetaRow>
          <MetaCell data-animate-in>
            <MetaText>{firstName}</MetaText>
            <MetaText $muted>{lastName}</MetaText>
          </MetaCell>
          <LocationCell data-animate-in>
            <MetaText>{location}</MetaText>
            <MetaText $muted>{region}</MetaText>
          </LocationCell>
          <RoleCell data-animate-in>
            <MetaText>{role}</MetaText>
            <MetaText $muted>{roleDetail}</MetaText>
          </RoleCell>
          <TimeAndStarCell data-animate-in>
            <TimeBlock>
              <MetaText $muted>{getLocalizedText(siteCopy.localTime)}</MetaText>
              <MetaText>
                <span>{hours}</span>
                <BlinkingColon>:</BlinkingColon>
                <span>{minutes}</span>
              </MetaText>
            </TimeBlock>
            <LargeStarButton
              type="button"
              onClick={handleStarClick}
              data-magnetic
              aria-label={starLabel}
              aria-pressed={starFound}
            >
              <LargeStarGlyph
                className="star-icon"
                weight={starFound ? 'fill' : 'regular'}
                aria-hidden="true"
              />
            </LargeStarButton>
          </TimeAndStarCell>
        </MetaRow>

        {/* Title */}
        <TitleLayout>
          <TitleBlock ref={titleRef} data-sphere-bottom>
            <OpenLabel data-animate-in>
              <StatusDot>
                <StatusPing />
                <StatusDotCore />
              </StatusDot>
              <span>[ 00 ] · {getLocalizedText(siteCopy.heroOpenToWork)}</span>
            </OpenLabel>
            {/* Thin weight (250) with a mouse; more legible (420) on touch screens where it does not react */}
            <HeroHeading>
              {headline.map((line, index) => (
                <HeroLine key={line} $outlined={index === 1}>
                  <SplitText as="span" trigger="intro" text={line} delay={0.1 + index * 0.1} />
                </HeroLine>
              ))}
            </HeroHeading>
          </TitleBlock>

          <IntroCard data-animate-in>
            <IntroText>{getLocalizedText(profile.introduction)}</IntroText>
            <ActionLinks>
              <GhostButton href="#projects" data-scroll-to="projects" data-magnetic>
                {getLocalizedText(siteCopy.exploreProjects)}
              </GhostButton>
              <SolidButton href="#contact" data-scroll-to="contact" data-magnetic>
                {getLocalizedText(siteCopy.getInTouch)} <ActionArrow aria-hidden="true" />
              </SolidButton>
            </ActionLinks>
          </IntroCard>
        </TitleLayout>

        {/* Signature */}
        <Signature data-animate-in>
          <SignatureTop>
            {/* Full-width wordmark: it scales with the container and never distorts */}
            <LogoPicture>
              <source
                srcSet="/assets/logo/logo-400.webp 400w, /assets/logo/logo-800.webp 800w, /assets/logo/logo.webp 999w"
                sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc(100vw - 3rem), calc(100vw - 5rem)"
                type="image/webp"
              />
              <HeroLogo
                src="/assets/logo/logo.png"
                alt={name}
                width="999"
                height="126"
                loading="eager"
                decoding="async"
              />
            </LogoPicture>

            {/* Wide, short screens: the wordmark is height-limited, so use the free space */}
            <IndexNav aria-label={getLocalizedText(siteCopy.indexTitle)}>
              <IndexHeading>
                <span>{getLocalizedText(siteCopy.indexTitle)}</span>
                <span>21.15°N · 79.09°E</span>
              </IndexHeading>
              <IndexList>
                {indexLinks.map((item, index) => (
                  <li key={item.id}>
                    <IndexLink href={item.href} data-scroll-to={item.id}>
                      <IndexLinkText>
                        <IndexNumber>0{index + 1}</IndexNumber>
                        {getLocalizedText(item.label)}
                      </IndexLinkText>
                      <IndexArrow aria-hidden="true" />
                    </IndexLink>
                  </li>
                ))}
              </IndexList>
            </IndexNav>
          </SignatureTop>

          <SignatureFooter>
            <FooterTagline>
              {getLocalizedText(siteCopy.heroTagline)} — {year}
            </FooterTagline>
            <ScrollLink href="#about" data-scroll-to="about">
              {getLocalizedText(siteCopy.scroll)} <ScrollArrow aria-hidden="true" />
            </ScrollLink>
          </SignatureFooter>
        </Signature>
      </Content>
    </Hero>
  );
};
