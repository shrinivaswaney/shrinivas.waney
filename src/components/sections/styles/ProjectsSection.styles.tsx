import { PixelImage } from '@/components/ui/PixelImage';
import Link from 'next/link';
import styled, { css } from 'styled-components';

/** The pinned horizontal gallery only runs when motion is allowed. */
const GALLERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

const labelStyles = css`
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  line-height: 1.5;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

const focusRing = css`
  &:focus-visible {
    outline: 2px solid var(--color-paper);
    outline-offset: 4px;
  }
`;

const actionStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.1rem;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease;
  ${focusRing}
`;

export const Projects = styled.section`
  position: relative;
  width: 100%;
  scroll-margin-top: 4rem;
  overflow: hidden;
  border-top: 1px solid var(--color-line);
  background: var(--color-ink);
  color: var(--color-paper);

  @media ${GALLERY} {
    min-height: 100vh;
  }
`;

export const Track = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 4rem var(--page-gutter) 5rem;

  @media ${GALLERY} {
    width: max-content;
    min-height: 100vh;
    flex-direction: row;
    align-items: stretch;
    gap: 0;
    padding: 0;
    will-change: transform;
  }
`;

export const IntroPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;

  @media ${GALLERY} {
    width: 42vw;
    min-height: 100vh;
    padding: 6rem 2.5rem 3.5rem;
    border-right: 1px solid var(--color-line);
  }
`;

export const SectionLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  ${labelStyles}
`;

export const SectionLabelBar = styled.span`
  width: 1px;
  height: 0.75rem;
  flex-shrink: 0;
  background: var(--color-paper);
`;

export const SectionLabelIndex = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
`;

export const SectionLabelCurrent = styled.span`
  color: var(--color-paper);
`;

export const Heading = styled.h2`
  display: block;
  margin-top: 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 9vw, 9rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 0.86;
  text-transform: uppercase;
`;

export const IntroFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
`;

export const Lead = styled.p`
  max-width: 20rem;
  color: color-mix(in oklab, var(--color-paper) 65%, transparent);
  line-height: 1.6;
`;

export const ScrollHint = styled.p`
  display: none;
  ${labelStyles}
  white-space: nowrap;

  @media ${GALLERY} {
    display: block;
  }
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-line);
  padding-top: 1.5rem;

  @media ${GALLERY} {
    width: 58vw;
    min-height: 100vh;
    border-top: 0;
    border-right: 1px solid var(--color-line);
    padding: 6rem 2.5rem 3.5rem;
  }

  @media (min-width: 1280px) and (prefers-reduced-motion: no-preference) {
    width: 54vw;
  }
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  ${labelStyles}
`;

export const CardMetaIndex = styled.strong`
  font-weight: 400;
  color: var(--color-paper);
`;

export const MediaLink = styled(Link)`
  position: relative;
  display: block;
  margin-top: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--color-line);
  ${focusRing}

  @media ${GALLERY} {
    flex: 1 1 auto;
    min-height: 0;
    margin-top: 1.5rem;
    border: 0;
  }
`;

export const MediaInner = styled.div`
  height: 100%;

  @media ${GALLERY} {
    position: absolute;
    inset-block: 0;
    left: -6%;
    width: 112%;
  }
`;

export const MediaImage = styled(PixelImage)`
  width: 100%;
  aspect-ratio: 4 / 3;

  @media ${GALLERY} {
    height: 100%;
    aspect-ratio: auto;
  }
`;

export const CardBody = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 2rem;
  }
`;

export const CardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.2vw, 3.3rem);
  font-weight: 300;
  line-height: 0.95;
  text-transform: uppercase;

  @media (min-width: 768px) {
    grid-column: span 6;
  }
`;

export const CardInfo = styled.div`
  min-width: 0;

  @media (min-width: 768px) {
    grid-column: span 6;
  }
`;

export const CardText = styled.p`
  display: -webkit-box;
  overflow: hidden;
  color: color-mix(in oklab, var(--color-paper) 65%, transparent);
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  border: 1px solid var(--color-line);
  padding: 0.2rem 0.6rem;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
`;

export const SolidLink = styled(Link)`
  ${actionStyles}
  background: var(--color-paper);
  color: var(--color-ink);

  &:hover {
    background: #ffffff;
  }
`;

export const GhostLink = styled.a`
  ${actionStyles}
  border: 1px solid var(--color-line);
  background: color-mix(in oklab, var(--color-paper) 6%, transparent);
  color: var(--color-paper);

  &:hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }
`;

export const AllLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  border: 1px solid var(--color-line);
  padding: 1.5rem;
  transition:
    background-color 450ms ease,
    color 450ms ease;
  ${focusRing}

  @media ${GALLERY} {
    width: 34vw;
    min-height: 100vh;
    border: 0;
    border-left: 1px solid var(--color-line);
    padding: 6rem 2.5rem 3.5rem;
  }

  &:hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }
`;

export const AllMeta = styled.span`
  ${labelStyles}
  transition: color 450ms ease;

  ${AllLink}:hover & {
    color: color-mix(in oklab, var(--color-ink) 60%, transparent);
  }
`;

export const AllTitle = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6vw, 6rem);
  font-weight: 300;
  line-height: 0.9;
  text-transform: uppercase;
`;

export const AllArrow = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  margin-bottom: 0.6rem;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);

  ${AllLink}:hover & {
    transform: rotate(-45deg);
  }
`;

export const ProgressTrack = styled.div`
  position: absolute;
  inset-inline: 2.5rem;
  bottom: 1.5rem;
  display: none;
  height: 1px;
  background: var(--color-line);
  pointer-events: none;

  @media ${GALLERY} {
    display: block;
  }
`;

export const ProgressBar = styled.div`
  height: 1px;
  background: var(--color-paper);
  transform: scaleX(0);
  transform-origin: left;
`;
