import { ArrowDownIcon, ArrowRightIcon, StarIcon } from '@phosphor-icons/react';
import styled, { css, keyframes } from 'styled-components';

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`;

const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';

const transitionColors = css`
  transition-property:
    color, background-color, border-color, outline-color, text-decoration-color, fill, stroke,
    --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: ${ease};
  transition-duration: 150ms;
`;

const transitionTransform = css`
  transition-property: transform, translate, scale, rotate;
  transition-timing-function: ${ease};
  transition-duration: 150ms;
`;

const Hero = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  min-height: calc(100svh - 3.5rem);
  flex-direction: column;
  overflow: hidden;

  /* Grain overlay */
  &::after {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    content: '';
    mix-blend-mode: screen;
    opacity: 0.07;
    pointer-events: none;
  }

  @media (min-width: 1024px) {
    height: calc(100svh - 4rem);
    min-height: 38.75rem;
  }
`;

const HeroVeil = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    var(--color-ink) 0%,
    transparent 50%,
    color-mix(in oklab, var(--color-ink) 30%, transparent) 100%
  );

  @media (min-width: 1024px) {
    background: linear-gradient(
      to top,
      var(--color-ink) 0%,
      transparent 50%,
      color-mix(in oklab, var(--color-ink) 70%, transparent) 100%
    );
  }
`;

const BottomVeil = styled.div`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 70%;
  pointer-events: none;
  background: linear-gradient(
    to top,
    var(--color-ink) 55%,
    color-mix(in oklab, var(--color-ink) 80%, transparent) 50%,
    transparent 100%
  );

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SideVeil = styled.div`
  position: absolute;
  inset-block: 0;
  left: 0;
  display: none;
  width: 62%;
  pointer-events: none;
  background: linear-gradient(
    to right,
    var(--color-ink) 0%,
    color-mix(in oklab, var(--color-ink) 70%, transparent) 50%,
    transparent 100%
  );

  @media (min-width: 1024px) {
    display: block;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem 1rem;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding-inline: 2.5rem;
  }

  @media (min-width: 1024px) {
    padding-block: 2.2vh;
  }
`;

const Announcement = styled.a`
  display: none;
  width: 100%;
  max-width: 42rem;
  align-items: center;
  gap: 0.75rem;
  margin-inline: auto;
  border: 1px solid var(--color-line);
  padding: 0.5rem 0.75rem;
  background: color-mix(in oklab, var(--color-ink) 70%, transparent);
  backdrop-filter: blur(8px);
  ${transitionColors}

  &:hover {
    border-color: color-mix(in oklab, var(--color-paper) 50%, transparent);
  }

  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
  }

  @media (min-width: 1024px) and (max-height: 820px) {
    display: none;
  }
`;

const AnnouncementBadge = styled.span`
  border: 1px solid color-mix(in oklab, var(--color-paper) 60%, transparent);
  padding-inline: 0.25rem;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.25;
`;

const AnnouncementText = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: color-mix(in oklab, var(--color-paper) 80%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const AnnouncementCta = styled.span`
  display: none;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;

  @media (min-width: 640px) {
    display: inline;
  }
`;

const AnnouncementArrow = styled(ArrowRightIcon)`
  width: 0.875rem;
  height: 0.875rem;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  ${transitionTransform}

  ${Announcement}:hover & {
    translate: 0.125rem;
  }
`;

const MobileStarButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
  padding: 0.25rem;
  border: 0 solid currentColor;
  background: transparent;
  color: inherit;

  &:focus-visible {
    box-shadow:
      0 0 #0000,
      0 0 #0000,
      0 0 #0000,
      0 0 0 1px var(--color-paper),
      0 0 #0000;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const StarGlyph = styled(StarIcon)`
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-paper);
`;

const MetaRow = styled.div`
  display: none;
  flex-shrink: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 1rem;
  margin: 0 -1rem;
  border-block: 1px solid var(--color-line);
  border-inline: 0 solid var(--color-line);
  padding: 1rem;
  background: color-mix(in oklab, var(--color-ink) 90%, transparent);
  backdrop-filter: blur(12px);

  @media (min-width: 640px) {
    margin-inline: -1.5rem;
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: 2rem -2.5rem 0;
    padding-inline: 2.5rem;
  }

  @media (min-width: 1024px) {
    margin-top: 2.4vh;
    padding-block: 1.6vh;
  }
`;

const MetaCell = styled.div``;

const MetaText = styled.p<{ $muted?: boolean }>`
  margin: 0;
  color: ${({ $muted }) =>
    $muted ? 'color-mix(in oklab, var(--color-paper) 55%, transparent)' : 'var(--color-paper)'};
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const LocationCell = styled(MetaCell)`
  text-align: right;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const RoleCell = styled(MetaCell)`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const TimeAndStarCell = styled(MetaCell)`
  display: none;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 1.5rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const TimeBlock = styled.div`
  @media (min-width: 768px) {
    text-align: right;
  }
`;

const BlinkingColon = styled.span`
  animation: ${blink} 1.1s steps(2, start) infinite;
`;

const LargeStarButton = styled.button`
  margin-top: -0.25rem;
  padding: 0.25rem;
  border: 0 solid currentColor;
  background: transparent;
  color: inherit;
  ${transitionTransform}
  transition-duration: 300ms;

  &:hover {
    scale: 1.1;
  }

  &:focus-visible {
    box-shadow:
      0 0 #0000,
      0 0 #0000,
      0 0 #0000,
      0 0 0 1px var(--color-paper),
      0 0 #0000;
  }
`;

const LargeStarGlyph = styled(StarIcon)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-paper);
  ${transitionColors}
  transition-duration: 300ms;
`;

const TitleLayout = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.5rem;
  padding-block: 1.5rem;

  @media (min-width: 768px) {
    gap: 2rem;
    padding-block: 2rem;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2.5rem;
    padding-block: 3vh;
  }
`;

const TitleBlock = styled.div`
  position: relative;
`;

const OpenLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  color: color-mix(in oklab, var(--paper) 60%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const StatusDot = styled.span`
  position: relative;
  display: flex;
  width: 0.5rem;
  height: 0.5rem;
`;

const StatusPing = styled.span`
  position: absolute;
  display: inline-flex;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--color-paper);
  opacity: 0.6;
  animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
`;

const StatusDotCore = styled.span`
  position: relative;
  display: inline-flex;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--color-paper);
`;

const HeroHeading = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, min(8.5vw, 9.5vh), 11rem);
  font-weight: 300;
  font-variation-settings: 'wght' 250;
  letter-spacing: -0.01em;
  line-height: 0.86;
  text-transform: uppercase;

  @media (max-width: 1023px), (hover: none) {
    font-variation-settings: 'wght' 420;
  }
`;

const HeroLine = styled.span<{ $outlined?: boolean }>`
  display: block;

  > span {
    display: block;
  }

  ${({ $outlined }) =>
    $outlined &&
    css`
      color: color-mix(in oklab, var(--ink) 55%, transparent);
      -webkit-text-stroke: 1px var(--paper);

      @media (min-width: 1024px) {
        -webkit-text-stroke-width: 1.5px;
      }
    `}
`;

const IntroCard = styled.div`
  width: 100%;
  max-width: 24rem;
  flex-shrink: 0;
  backdrop-filter: blur(12px);

  @media (min-width: 768px) {
    border: 1px solid var(--color-line);
    padding: 1.25rem;
    background: color-mix(in oklab, var(--color-ink) 95%, transparent);
  }

  @media (min-width: 1024px) {
    margin-bottom: 0.75rem;
    padding: 2vh;
  }
`;

const IntroText = styled.p`
  margin: 0;
  color: color-mix(in oklab, var(--color-paper) 80%, transparent);
  font-size: 15px;
  line-height: 1.625;

  @media (min-width: 1024px) {
    font-size: clamp(13px, 1.7vh, 16px);
  }
`;

const ActionLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;

  @media (min-width: 640px) {
    gap: 0.75rem;
  }

  @media (min-width: 1024px) {
    margin-top: 2vh;
  }

  @media (max-width: 639px) {
    a {
      padding-inline: 0.875rem;
    }
  }
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

  &:focus-visible {
    outline: 2px solid var(--color-paper);
    outline-offset: 4px;
  }
`;

const GhostButton = styled(ActionButton)`
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.06);
  color: var(--paper);
  backdrop-filter: blur(8px);

  &:hover {
    background: var(--paper);
    color: var(--ink);
  }
`;

const SolidButton = styled(ActionButton)`
  background: var(--paper);
  color: var(--ink);

  &:hover {
    background: #ffffff;
  }
`;

const ActionArrow = styled(ArrowRightIcon)`
  width: 0.875rem;
  height: 0.875rem;
`;

const Signature = styled.div`
  flex-shrink: 0;
`;

const SignatureTop = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    margin-bottom: 1.8vh;
  }
`;

const LogoPicture = styled.picture`
  display: block;
  width: 100%;
  min-width: 0;
  flex-shrink: 1;
`;

const HeroLogo = styled.img`
  display: block;
  width: 100%;
  height: auto;
  filter: invert(0);
  transition: filter 200ms ease;

  :root[data-theme='light'] & {
    filter: invert(1);
  }
`;

const IndexNav = styled.nav`
  display: none;
  min-width: 12.5rem;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  border: 0 solid var(--color-line);
  border-left-width: 1px;
  padding-left: 1.25rem;

  @media (min-width: 1024px) and (min-aspect-ratio: 23 / 10) {
    display: flex;
  }
`;

const IndexHeading = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 0;
  color: color-mix(in oklab, var(--paper) 60%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const IndexList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  > li + li {
    margin-top: 0.25rem;
  }
`;

const IndexLink = styled.a`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  ${transitionColors}

  &:hover {
    color: var(--color-paper);
  }
`;

const IndexLinkText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IndexNumber = styled.span`
  margin-right: 0.5rem;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
`;

const IndexArrow = styled(ArrowRightIcon)`
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
  translate: -0.25rem;
  opacity: 0;
  transition: all 150ms ${ease};

  ${IndexLink}:hover & {
    translate: 0;
    opacity: 1;
  }
`;

const SignatureFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0 solid var(--color-line);
  border-top-width: 1px;
  padding-top: 0.75rem;

  @media (min-width: 1024px) {
    padding-top: 1.4vh;
  }
`;

const FooterTagline = styled.p`
  margin: 0;
  color: color-mix(in oklab, var(--color-paper) 80%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ScrollLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-block: -0.25rem;
  padding-block: 0.25rem;
  color: color-mix(in oklab, var(--paper) 60%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &:hover {
    color: var(--color-paper);
  }
`;

const ScrollArrow = styled(ArrowDownIcon)`
  width: 0.75rem;
  height: 0.75rem;
  animation: ${bounce} 1s infinite;
`;

export {
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
};
