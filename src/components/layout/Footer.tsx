'use client';

import { SocialIcon } from '@/app/resume/SocialIcons';
import { useProximityWeight } from '@/components/ui/Kinetic';
import { siteCopy } from '@/data/meta';
import { navigationLinks } from '@/data/nav';
import { getLocalizedText, t } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { aboutInterests } from '@/data/sectionsMeta';
import {
  ArrowUpIcon,
  CompassRoseIcon,
  DownloadSimpleIcon,
  EyeIcon,
  MapPinIcon,
} from '@phosphor-icons/react';
import { useRef, type ReactNode } from 'react';
import {
  ArtBand,
  ArtImage,
  ArtOverlay,
  BackToTop,
  BottomBar,
  BottomInfo,
  BrandColumn,
  BrandRow,
  Column,
  ColumnIndex,
  ColumnTitle,
  Coordinates,
  Copyright,
  Credits,
  Description,
  ExternalLink,
  FocusLine,
  FooterGrid,
  FooterRoot,
  InternalLink,
  LinkList,
  LocationName,
  Monogram,
  Signature,
  Tagline,
} from './styles/Footer.styles';

const SOCIAL_IDS = ['github', 'linkedin', 'instagram', 'email'] as const;

const ColumnShell = ({
  index,
  title,
  label,
  children,
}: {
  index: number;
  title: string;
  label?: string;
  children: ReactNode;
}) => (
  <Column aria-label={label ?? title}>
    <ColumnIndex aria-hidden="true">{String(index).padStart(2, '0')}</ColumnIndex>
    <ColumnTitle>{title}</ColumnTitle>
    <LinkList>{children}</LinkList>
  </Column>
);

/** Giant signature: the weight of each letter follows the pointer. */
const FooterSignature = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  useProximityWeight(ref, { min: 120, max: 900, radius: 340 });

  return (
    <Signature ref={ref} aria-hidden="true">
      {Array.from(getLocalizedText(profile.name)).map((character, index) => (
        <span key={`${character}-${index}`} className="char">
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </Signature>
  );
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const name = getLocalizedText(profile.name);
  const socialChannels = SOCIAL_IDS.map((id) =>
    profile.contactChannels.find((channel) => channel.id === id),
  ).filter((channel): channel is NonNullable<typeof channel> => Boolean(channel));

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <FooterRoot role="contentinfo">
      <ArtBand>
        <ArtImage
          src="/assets/art/ridge-lines.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <ArtOverlay aria-hidden="true" />
        <FooterSignature />
      </ArtBand>

      <FooterGrid>
        <BrandColumn>
          <BrandRow>
            <Monogram>{profile.initials}</Monogram>
          </BrandRow>
          <Tagline>{getLocalizedText(siteCopy.heroTagline)}</Tagline>
          <Description>{getLocalizedText(profile.introduction)}</Description>
          <FocusLine>
            {aboutInterests.map((interest) => getLocalizedText(interest)).join(' · ')}
          </FocusLine>
        </BrandColumn>

        <ColumnShell index={1} title={getLocalizedText(navigationLinks[1].label)} label="Projects">
          {projects.map((project) => (
            <li key={project.id}>
              <InternalLink href={`/projects#${project.id}`}>
                {getLocalizedText(project.title)}
              </InternalLink>
            </li>
          ))}
        </ColumnShell>

        <ColumnShell
          index={2}
          title={getLocalizedText(siteCopy.indexTitle)}
          label={getLocalizedText(siteCopy.navigationLabel)}
        >
          {navigationLinks.map((item) => (
            <li key={item.id}>
              <InternalLink href={item.href.startsWith('/') ? item.href : `/${item.href}`}>
                {getLocalizedText(item.label)}
              </InternalLink>
            </li>
          ))}
        </ColumnShell>

        <ColumnShell index={3} title="Social" label="Social links">
          {socialChannels.map((channel) => (
            <li key={channel.id}>
              <ExternalLink
                href={channel.href}
                {...(channel.id === 'email'
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <SocialIcon name={channel.id} /> {getLocalizedText(channel.label)} ↗
              </ExternalLink>
            </li>
          ))}
        </ColumnShell>

        <ColumnShell index={4} title="Location" label="Location and resume">
          <li>
            <LocationName>
              <MapPinIcon size={16} /> {getLocalizedText(profile.location)}
            </LocationName>
          </li>
          <li>
            <Coordinates>
              <CompassRoseIcon size={16} /> {getLocalizedText(t('21.15°N · 79.09°E'))}
            </Coordinates>
          </li>
          <li>
            <InternalLink href="/resume">
              <EyeIcon size={16} /> {getLocalizedText(siteCopy.viewResume)}
            </InternalLink>
          </li>
          <li>
            <ExternalLink href={profile.resumePath} download>
              <DownloadSimpleIcon size={16} /> {getLocalizedText(siteCopy.downloadResume)}
            </ExternalLink>
          </li>
        </ColumnShell>
      </FooterGrid>

      <BottomBar>
        <BottomInfo>
          <Copyright>
            © {currentYear} {name}. All rights reserved.
          </Copyright>
          <Credits>
            Design &amp; code — {name} · Big Shoulders Display, Geist · Next.js, GSAP, Ant Design,
            Styled Components, Phosphor Icons.
          </Credits>
        </BottomInfo>
        <BackToTop
          type="button"
          onClick={scrollToTop}
          aria-label={getLocalizedText(siteCopy.backToTop)}
        >
          Back to top
          <ArrowUpIcon size={12} aria-hidden="true" />
        </BackToTop>
      </BottomBar>
    </FooterRoot>
  );
}

export default Footer;
