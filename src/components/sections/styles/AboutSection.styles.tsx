import { ScrollWords } from '@/components/ui/Kinetic';
import { PixelImage } from '@/components/ui/PixelImage';
import styled, { css } from 'styled-components';

const labelStyles = css`
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

const headingStyles = css`
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 0.95;
`;

const crosshair = css`
  position: relative;

  &::before,
  &::after {
    position: absolute;
    color: color-mix(in oklab, var(--color-paper) 45%, transparent);
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1;
    pointer-events: none;
    content: '+';
  }

  &::before {
    top: -8px;
    left: -5px;
  }

  &::after {
    right: -5px;
    bottom: -8px;
  }
`;

/** Mobile: horizontal snap carousel instead of a long vertical stack. */
const carousel = css`
  @media (max-width: 767px) {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    scroll-padding-inline: 1rem;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const slide = css`
  @media (max-width: 767px) {
    width: 82vw;
    flex-shrink: 0;
    scroll-snap-align: start;
    border: 1px solid var(--color-line);
  }
`;

const About = styled.section`
  width: 100%;
  scroll-margin-top: 4rem;
  background: var(--color-ink);
  color: var(--color-paper);
`;

const Header = styled.div`
  padding: 5rem 1rem 0;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding-top: 7rem;
    padding-inline: 2.5rem;
  }
`;

const SectionLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  ${labelStyles}
`;

const SectionLabelBar = styled.span`
  width: 1px;
  height: 0.75rem;
  flex-shrink: 0;
  background: var(--color-paper);
`;

const SectionLabelIndex = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
`;

const SectionLabelCurrent = styled.span`
  color: var(--color-paper);
`;

const AboutHeading = styled.h2`
  display: block;
  margin-top: 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 0.86;
  text-transform: uppercase;
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2.5rem;
  border-bottom: 1px solid var(--color-line);
  padding: 3rem 1rem;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding-block: 4rem;
    padding-inline: 2.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
`;

const IntroColumn = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 7;
  }
`;

const IntroText = styled(ScrollWords)`
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.6vw, 2.6rem);
  font-weight: 400;
  line-height: 1.12;
  color: var(--color-paper);
`;

const ReadMoreBody = styled.div`
  padding-top: 1.5rem;

  > p + p {
    margin-top: 1.5rem;
  }
`;

const IntroReadMore = styled.div`
  margin-top: 1.25rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const BodyParagraph = styled.p`
  line-height: 1.625;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
`;

const Aside = styled.aside`
  @media (min-width: 1024px) {
    grid-column: 9 / span 4;
  }
`;

const ProfileCard = styled.div`
  ${crosshair}
  border: 1px solid var(--color-line);
  padding: 1.25rem;
`;

const ProfileKicker = styled.p`
  margin-bottom: 0.75rem;
  ${labelStyles}
`;

const MetaRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--color-line);
  padding-block: 0.5rem;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MetaKey = styled.span`
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
`;

const MetaValue = styled.span`
  text-align: right;
  color: color-mix(in oklab, var(--color-paper) 90%, transparent);
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.5rem;
  margin-top: 1.25rem;

  > a {
    white-space: nowrap;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const actionLink = css`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background-color 200ms ease,
    color 200ms ease,
    border-color 200ms ease;
`;

const SolidLink = styled.a`
  ${actionLink}
  background: var(--color-paper);
  color: var(--color-ink);

  &:hover {
    background: #ffffff;
  }
`;

const GhostLink = styled.a`
  ${actionLink}
  border: 1px solid var(--color-line);
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-paper);

  &:hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }
`;

const DownloadMeta = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
`;

const PillarsWrap = styled.div`
  padding: 2.5rem 1rem 0.5rem;
  ${carousel}

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    display: block;
    overflow: visible;
    padding: 0 2.5rem;
  }
`;

const Pillar = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 1.25rem;
  border-bottom: 1px solid var(--color-line);
  padding: 1rem;
  ${slide}

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4rem;
    width: auto;
    padding: 4rem 0;
    border: 0;
    border-bottom: 1px solid var(--color-line);
  }

  &:nth-child(even) > :first-child {
    @media (min-width: 768px) {
      order: 2;
    }
  }
`;

const PillarImage = styled(PixelImage)`
  aspect-ratio: 4 / 3;
  width: 100%;
`;

const PillarKicker = styled.p`
  margin-bottom: 1rem;
  ${labelStyles}
`;

const PillarTitle = styled.h3`
  ${headingStyles}
  font-size: clamp(2.4rem, 4.5vw, 4.25rem);
`;

const PillarText = styled.p`
  max-width: 28rem;
  margin-top: 1.25rem;
  line-height: 1.625;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
`;

const SkillsBlock = styled.div`
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 6rem 2.5rem;
  }
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const BlockTitle = styled.h3`
  display: block;
  ${headingStyles}
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  text-transform: uppercase;
`;

const Kicker = styled.p`
  display: none;

  @media (min-width: 768px) {
    display: block;
    ${labelStyles}
  }
`;

const SkillsGrid = styled.div`
  ${carousel}
  margin-inline: -1rem;
  padding-inline: 1rem;
  padding-bottom: 0.5rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
    margin-inline: 0;
    padding: 0;
    border-top: 1px solid var(--color-line);
    border-left: 1px solid var(--color-line);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const SkillCard = styled.div`
  ${crosshair}
  ${slide}
  padding: 1.25rem;

  @media (min-width: 768px) {
    width: auto;
    border: 0;
    border-right: 1px solid var(--color-line);
    border-bottom: 1px solid var(--color-line);
    padding: 1.5rem;
  }
`;

const SkillCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SkillCardTitle = styled.h4`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-paper);
`;

const SkillCardIndex = styled.span`
  ${labelStyles}
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--color-line);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  transition:
    border-color 200ms ease,
    color 200ms ease;

  &:hover {
    border-color: color-mix(in oklab, var(--color-paper) 60%, transparent);
    color: var(--color-paper);
  }
`;

const Interests = styled.div`
  margin-top: 2.5rem;
`;

const InterestsKicker = styled.p`
  margin-bottom: 1rem;
  ${labelStyles}
`;

const InterestList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
`;

const InterestItem = styled.li`
  width: 100%;
  border-bottom: 1px solid var(--color-line);
  padding-bottom: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: color-mix(in oklab, var(--color-paper) 80%, transparent);

  @media (min-width: 768px) {
    width: auto;
    border-bottom: 0;
    padding-bottom: 0;
    font-size: 1.875rem;
  }
`;

const InterestSeparator = styled.span`
  display: none;
  margin-left: 1.5rem;
  color: color-mix(in oklab, var(--color-paper) 25%, transparent);

  @media (min-width: 768px) {
    display: inline;
  }
`;

const ImpactBlock = styled.div`
  border-top: 1px solid var(--color-line);
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 6rem 2.5rem;
  }
`;

const ImpactGrid = styled.div`
  ${carousel}
  margin-inline: -1rem;
  padding-inline: 1rem;
  padding-bottom: 0.5rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
    margin-inline: 0;
    padding: 0;
    border-top: 1px solid var(--color-line);
    border-left: 1px solid var(--color-line);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ImpactCard = styled.div`
  ${slide}
  border-bottom: 1px solid var(--color-line);
  border-right: 1px solid var(--color-line);
  padding: 1.5rem;
  transition:
    background-color 200ms ease,
    color 200ms ease;

  &:hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }

  @media (min-width: 768px) {
    width: auto;
    border: 0;
    border-right: 1px solid var(--color-line);
    border-bottom: 1px solid var(--color-line);
  }
`;

const ImpactNumber = styled.p`
  font-family: var(--font-display);
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 1;
  color: color-mix(in oklab, var(--color-paper) 40%, transparent);
  transition: color 200ms ease;

  ${ImpactCard}:hover & {
    color: color-mix(in oklab, var(--color-ink) 40%, transparent);
  }
`;

const ImpactText = styled.p`
  margin-top: 1.5rem;
  line-height: 1.625;
`;

export {
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
  InterestSeparator,
  Interests,
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
};
