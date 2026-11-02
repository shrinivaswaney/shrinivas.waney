import {
  GhostButtonLink as ProjectsLink,
  labelStyles,
  SolidButtonLink as HomeLink,
} from '@/styles/Shared.styles';
import styled from 'styled-components';

export { HomeLink, ProjectsLink };

export const NotFoundRoot = styled.main`
  position: relative;
  display: flex;
  min-height: calc(100svh - 8rem);
  flex-direction: column;
  overflow: hidden;
  background: var(--ink);
  color: var(--paper);

  &::after {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    content: '';
    mix-blend-mode: screen;
    opacity: 0.07;
    pointer-events: none;
  }
`;

export const NotFoundOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 0%, var(--ink) 75%);
`;

export const NotFoundContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1rem;

  @media (min-width: 40rem) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  @media (min-width: 48rem) {
    padding-right: 2.5rem;
    padding-left: 2.5rem;
  }
`;

export const NotFoundMeta = styled.div`
  ${labelStyles}
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const NotFoundMessage = styled.div`
  padding: 3rem 0;
  text-align: center;
`;

export const ErrorCode = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(8rem, 32vw, 30rem);
  font-weight: 300;
  line-height: 0.8;
  letter-spacing: -0.01em;
  mix-blend-mode: difference;
  text-transform: uppercase;
`;

export const MessageCard = styled.div`
  max-width: 36rem;
  margin: 1.5rem auto 0;
  padding: 1rem 1.25rem;
  border: 1px solid var(--line);
  background: color-mix(in oklab, var(--ink) 90%, transparent);
  backdrop-filter: blur(8px);
`;

export const MessageTitle = styled.p`
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.25;
`;

export const MessageText = styled.p`
  max-width: 28rem;
  margin: 0.5rem auto 0;
  color: color-mix(in oklab, var(--paper) 70%, transparent);
`;

export const NotFoundLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const NotFoundFooter = styled.p`
  ${labelStyles}
  text-align: center;
`;
