import { motion } from 'framer-motion';
import Link from 'next/link';
import styled, { css } from 'styled-components';

const CONTROL_HEIGHT = '34px';

const focusRing = css`
  &:focus-visible {
    outline: 1px solid var(--color-paper);
    outline-offset: 3px;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-header-surface);
  backdrop-filter: blur(16px);
`;

const HeaderNav = styled.nav`
  display: grid;
  width: min(100%, var(--content-width));
  height: 56px;
  align-items: center;
  column-gap: 12px;
  margin: 0 auto;
  padding: 0 var(--page-gutter);

  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-template-areas: 'brand mono controls';

  @media (min-width: 768px) {
    height: 64px;
    column-gap: 24px;
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas: 'brand nav controls';
  }

  @media (min-width: 1024px) {
    column-gap: 0;
    grid-template-columns:
      minmax(0, 1fr) minmax(0, 1fr) auto minmax(0, 1fr)
      minmax(0, 1fr);
    grid-template-areas: 'brand left mono right controls';
  }
`;

const Brand = styled(Link)`
  grid-area: brand;
  justify-self: start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  color: var(--color-paper-muted);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 180ms ease;

  &:hover {
    color: var(--color-paper);
  }

  ${focusRing}
`;

const Monogram = styled(Link)`
  grid-area: mono;
  justify-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-line-focus);
  padding: 5px 7px 4px;
  color: var(--color-paper);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  transition:
    color 180ms ease,
    background-color 180ms ease;

  /* Tablet only: the brand text carries identity, nav needs the room */
  @media (min-width: 768px) and (max-width: 1023px) {
    display: none;
  }

  &:hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }

  ${focusRing}
`;

const NavList = styled.ul<{ $side: 'left' | 'right' | 'compact' }>`
  display: none;
  align-items: center;
  min-width: 0;
  padding: 0;
  margin: 0;
  list-style: none;
  white-space: nowrap;
  grid-area: ${({ $side }) => ($side === 'compact' ? 'nav' : $side)};

  @media (min-width: 768px) {
    ${({ $side }) =>
      $side === 'compact' &&
      css`
        display: flex;
        justify-self: center;
        gap: clamp(16px, 3vw, 28px);
      `}
  }

  @media (min-width: 1024px) {
    ${({ $side }) =>
      $side === 'compact'
        ? css`
            display: none;
          `
        : css`
            display: flex;
            gap: clamp(20px, 2.6vw, 44px);
            padding-inline: clamp(16px, 2.6vw, 44px);
          `}

    ${({ $side }) => $side === 'left' && 'justify-self: end;'}
    ${({ $side }) => $side === 'right' && 'justify-self: start;'}
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  padding: 5px 0;
  color: ${({ $active }) => ($active ? 'var(--color-paper)' : 'var(--color-paper-muted)')};
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 180ms ease;

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    background: var(--color-paper);
    content: '';
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 250ms ease;
  }

  &:hover {
    color: var(--color-paper);
  }

  &:hover::after {
    transform: scaleX(1);
  }

  ${focusRing}
`;

const Index = styled.span`
  color: var(--color-paper-muted);
  font-size: 9px;
  letter-spacing: 0;
`;

const Controls = styled.div`
  grid-area: controls;
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 12px;
`;

const ThemeToggle = styled.div<{ $inMenu?: boolean }>`
  display: ${({ $inMenu }) => ($inMenu ? 'flex' : 'none')};
  width: ${({ $inMenu }) => ($inMenu ? '100%' : 'fit-content')};
  height: ${({ $inMenu }) => ($inMenu ? '44px' : CONTROL_HEIGHT)};
  align-items: stretch;
  border: 1px solid var(--color-line-strong);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;

  > button {
    min-width: 40px;
  }

  @media (min-width: 768px) {
    display: ${({ $inMenu }) => ($inMenu ? 'none' : 'inline-flex')};
  }
`;

const ThemeOption = styled.button<{ $active: boolean }>`
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0 12px;
  background: transparent;
  color: ${({ $active }) => ($active ? 'var(--color-ink)' : 'var(--color-paper-muted)')};
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    color 180ms ease;

  ${({ $active }) => $active && 'background: var(--color-paper);'}

  &:hover {
    color: var(--color-paper);
  }

  &[aria-pressed='true']:hover {
    color: var(--color-ink);
  }

  &:focus-visible {
    outline: 1px solid var(--color-paper);
    outline-offset: -3px;
  }
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  height: ${CONTROL_HEIGHT};
  border: 1px solid var(--color-line-strong);
  padding: 0 12px;
  background: transparent;
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }

  ${focusRing}
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  z-index: 49;
  inset: 56px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-top: 1px solid var(--color-line);
  background: var(--color-ink);
  padding-bottom: env(safe-area-inset-bottom, 0px);

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const MobileItem = styled(motion.li)`
  border-bottom: 1px solid var(--color-line);
`;

const MobileLink = styled.a`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 20px var(--page-gutter);
  color: var(--color-paper);
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 14vw, 4.5rem);
  line-height: 0.95;
  text-transform: uppercase;

  ${focusRing}
`;

const MobileIndex = styled.span`
  flex: none;
  color: var(--color-paper-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
`;

const MenuFooter = styled(motion.div)`
  display: grid;
  gap: 20px;
  padding: 32px var(--page-gutter) 28px;
`;

const ContactEmail = styled.a`
  max-width: 100%;
  width: fit-content;
  color: var(--color-paper);
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 7vw, 2rem);
  overflow-wrap: anywhere;
  text-decoration-color: var(--color-line-strong);
  text-underline-offset: 5px;

  ${focusRing}
`;

const FooterMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  color: var(--color-paper-muted);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    transition: color 180ms ease;
  }

  a:hover {
    color: var(--color-paper);
  }

  a:focus-visible {
    outline: 1px solid var(--color-paper);
    outline-offset: 3px;
  }
`;

export {
  Brand,
  ContactEmail,
  CONTROL_HEIGHT,
  Controls,
  focusRing,
  FooterMeta,
  Header,
  HeaderNav,
  Index,
  MenuButton,
  MenuFooter,
  MobileIndex,
  MobileItem,
  MobileLink,
  MobileList,
  MobileMenu,
  Monogram,
  NavLink,
  NavList,
  SocialLinks,
  ThemeOption,
  ThemeToggle,
};
