'use client';

import { SplitText, useProximityWeight } from '@/components/ui/Kinetic';
import { getLocalizedText, navigationLinks, profile, siteCopy } from '@/data/portfolio';
import { useLocalTime } from '@/hooks/useLocalTime';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { markIntroDone, onIntroDone } from '@/lib/motion';
import { ArrowDownIcon, ArrowRight, ArrowRightIcon, StarIcon } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import React, { Suspense, lazy, useEffect, useRef, useState, useSyncExternalStore } from 'react';

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

    const elements = container.querySelectorAll('.animate-in');
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
    <section
      ref={containerRef}
      className="grain relative flex min-h-[calc(100svh-3.5rem)] w-full flex-col overflow-hidden lg:h-[calc(100svh-4rem)] lg:min-h-155"
      id="top"
    >
      <Suspense fallback={null}>
        <DitherHero intro={introDone} />
      </Suspense>

      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/30 lg:to-ink/70"
        aria-hidden="true"
      />
      {/* Mobile / tablet: veil under the text (bottom half), the sphere stays crisp above */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-ink from-55% via-ink/80 to-transparent lg:hidden"
        aria-hidden="true"
      />
      {/* Side veil for title legibility: large screens only (portrait keeps the sphere above the text) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-linear-to-r from-ink via-ink/70 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-5 pt-5 sm:px-6 md:px-10 lg:pb-[2.2vh] lg:pt-[2.2vh]">
        {/* Announcement banner */}
        <a
          href="#contact"
          data-scroll-to="contact"
          className="animate-in group mx-auto hidden w-full max-w-2xl items-center gap-3 border border-line bg-ink/70 px-3 py-2 backdrop-blur-sm transition-colors hover:border-paper/50 md:flex md:gap-4 [@media(min-width:1024px)_and_(max-height:820px)]:hidden"
        >
          <span className="border border-paper/60 px-1 font-display text-[13px] font-semibold leading-tight">
            SW
          </span>
          <span className="flex-1 truncate font-mono text-[11px] uppercase tracking-[0.08em] text-paper/80 md:text-[12px]">
            {getLocalizedText(siteCopy.heroAnnounce)}
          </span>
          <span className="hidden font-mono text-[10px] uppercase text-paper/55 sm:inline">
            {getLocalizedText(siteCopy.heroAnnounceCta)}
          </span>
          <ArrowRight
            className="h-3.5 w-3.5 text-paper/70 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Hidden star (mobile: the meta row is hidden to leave room for the sphere) */}
        <button
          type="button"
          onClick={handleStarClick}
          className="absolute right-3 top-3 z-10 p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-paper md:hidden"
          aria-label={starLabel}
          aria-pressed={starFound}
        >
          <StarIcon
            className="h-5 w-5 text-paper"
            weight={starFound ? 'fill' : 'regular'}
            aria-hidden="true"
          />
        </button>

        {/* Meta row (tablet and up) */}
        <div className="-mx-4 mt-0 hidden shrink-0 grid-cols-2 gap-y-4 border-y border-line bg-ink/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 md:-mx-10 md:mt-8 md:grid md:grid-cols-4 md:px-10 lg:mt-[2.4vh] lg:py-[1.6vh]">
          <div className="animate-in">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">
              {firstName}
            </p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">
              {lastName}
            </p>
          </div>
          <div className="animate-in text-right md:text-left">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">
              {location}
            </p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">
              {region}
            </p>
          </div>
          <div className="animate-in hidden md:block">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">{role}</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">
              {roleDetail}
            </p>
          </div>
          <div className="animate-in hidden items-start justify-end gap-6 md:flex">
            <div className="md:text-right">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper/55">
                {getLocalizedText(siteCopy.localTime)}
              </p>
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-paper">
                <span>{hours}</span>
                <span className="animate-blink">:</span>
                <span>{minutes}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleStarClick}
              data-magnetic
              className="-mt-1 p-1 transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-paper"
              aria-label={starLabel}
              aria-pressed={starFound}
            >
              <StarIcon
                className="star-icon h-6 w-6 text-paper transition-colors duration-300"
                weight={starFound ? 'fill' : 'regular'}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-6 py-6 md:gap-8 md:py-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:py-[3vh]">
          <div ref={titleRef} className="relative" data-sphere-bottom>
            <div className="animate-in label mb-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-paper" />
              </span>
              <span>[ 00 ] · {getLocalizedText(siteCopy.heroOpenToWork)}</span>
            </div>
            {/* Thin weight (250) with a mouse; more legible (420) on touch screens where it does not react */}
            <h1 className="display text-[clamp(3rem,min(8.5vw,9.5vh),11rem)] [font-variation-settings:'wght'_250] max-lg:[font-variation-settings:'wght'_420] [@media(hover:none)]:[font-variation-settings:'wght'_420]">
              {headline.map((line, index) => (
                <SplitText
                  key={line}
                  as="span"
                  trigger="intro"
                  text={line}
                  className={index === 1 ? 'block text-outline-strong' : 'block'}
                  delay={0.1 + index * 0.1}
                />
              ))}
            </h1>
          </div>

          <div className="animate-in w-full max-w-sm shrink-0 backdrop-blur-md md:border md:border-line md:bg-ink/95 md:p-5 lg:mb-3 lg:p-[2vh]">
            <p className="text-[15px] leading-relaxed text-paper/80 lg:text-[clamp(13px,1.7vh,16px)]">
              {getLocalizedText(profile.introduction)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3 lg:mt-[2vh] [&_a]:max-sm:px-3.5">
              <a
                href="#projects"
                data-scroll-to="projects"
                data-magnetic
                className="btn-ghost backdrop-blur-sm"
              >
                {getLocalizedText(siteCopy.exploreProjects)}
              </a>
              <a href="#contact" data-scroll-to="contact" data-magnetic className="btn-solid">
                {getLocalizedText(siteCopy.getInTouch)}{' '}
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="animate-in shrink-0">
          <div className="mb-4 flex items-stretch gap-6 lg:mb-[1.8vh]">
            {/* Full-width wordmark: it scales with the container and never distorts */}
            <picture className="block w-full min-w-0 shrink">
              <source
                srcSet="/assets/logo/logo-400.webp 400w, /assets/logo/logo-800.webp 800w, /assets/logo/logo.webp 999w"
                sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc(100vw - 3rem), calc(100vw - 5rem)"
                type="image/webp"
              />
              <img
                src="/assets/logo/logo.png"
                alt={name}
                width="1584"
                height="396"
                loading="eager"
                decoding="async"
                className="hero-logo block h-auto w-full"
              />
            </picture>

            {/* Wide, short screens: the wordmark is height-limited, so use the free space */}
            <nav
              aria-label={getLocalizedText(siteCopy.indexTitle)}
              className="hidden min-w-50 flex-1 flex-col justify-between border-l border-line pl-5 min-[1024px]:[@media(min-aspect-ratio:23/10)]:flex"
            >
              <p className="label flex justify-between">
                <span>{getLocalizedText(siteCopy.indexTitle)}</span>
                <span>21.15°N · 79.09°E</span>
              </p>
              <ul className="space-y-1">
                {indexLinks.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      data-scroll-to={item.id}
                      className="group flex items-baseline justify-between gap-3 font-mono text-[12px] uppercase tracking-widest text-paper/70 transition-colors hover:text-paper"
                    >
                      <span className="truncate">
                        <span className="mr-2 text-paper/55">0{index + 1}</span>
                        {getLocalizedText(item.label)}
                      </span>
                      <ArrowRightIcon
                        className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-between border-t border-line pt-3 lg:pt-[1.4vh]">
            <p className="label text-paper/80">
              {getLocalizedText(siteCopy.heroTagline)} — {year}
            </p>
            <a
              href="#about"
              data-scroll-to="about"
              className="label -my-1 flex items-center gap-2 py-1 hover:text-paper"
            >
              {getLocalizedText(siteCopy.scroll)}{' '}
              <ArrowDownIcon className="h-3 w-3 animate-bounce" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
