import Link from 'next/link';
import styled, { css } from 'styled-components';

const focusRing = css`
  &:focus-visible {
    outline: 1px solid var(--color-paper);
    outline-offset: 3px;
  }
`;

const labelStyles = css`
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  line-height: 1.5;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

export const FooterRoot = styled.footer`
  position: relative;
  width: 100%;
  border-top: 1px solid var(--color-line);
  background: var(--color-ink);
  color: var(--color-paper);

  @media print {
    display: none;
  }
`;

export const ArtBand = styled.div`
  position: relative;
  height: clamp(260px, 46vw, 560px);
  overflow: hidden;
`;

export const ArtImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
`;

export const ArtOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    var(--color-ink),
    color-mix(in oklab, var(--color-ink) 30%, transparent),
    var(--color-ink)
  );
`;

/** Giant signature: each letter's weight follows the pointer. */
export const Signature = styled.p`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  transform: translateY(10%);
  margin: 0;
  padding-inline: 0.5rem;
  font-family: var(--font-display);
  font-size: 16vw;
  font-weight: 300;
  line-height: 0.8;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  font-variation-settings: 'wght' 120;

  > span {
    display: inline-block;
  }

  @media (hover: none) {
    font-variation-settings: 'wght' 300;
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  width: 100%;
  max-width: var(--content-width);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 2.5rem;
  margin: 0 auto;
  padding: 3.5rem var(--page-gutter);

  @media (min-width: 640px) {
    column-gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
`;

export const BrandColumn = styled.div`
  grid-column: span 2;

  @media (min-width: 1024px) {
    grid-column: span 4;
  }
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Monogram = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in oklab, var(--color-paper) 70%, transparent);
  padding: 0.25rem 0.375rem 0.125rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em;
`;

export const Tagline = styled.p`
  margin-top: 1.25rem;
  ${labelStyles}
  color: var(--color-paper);
`;

export const Description = styled.p`
  max-width: 24rem;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.625;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
`;

export const FocusLine = styled.p`
  max-width: 24rem;
  margin-top: 1.25rem;
  ${labelStyles}
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
`;

export const Column = styled.nav`
  display: flex;
  grid-column: span 1;
  flex-direction: column;

  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`;

export const ColumnIndex = styled.p`
  margin-bottom: 0.5rem;
  ${labelStyles}
`;

export const ColumnTitle = styled.h3`
  margin-bottom: 1.25rem;
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 400;
  line-height: 1;
  text-transform: uppercase;
`;

export const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const linkStyles = css`
  display: inline-block;
  margin-block: -0.25rem;
  padding-block: 0.25rem;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
  transition: color 200ms ease;

  &:hover {
    color: var(--color-paper);
  }

  ${focusRing}
`;

export const InternalLink = styled(Link)`
  ${linkStyles}
`;

export const ExternalLink = styled.a`
  ${linkStyles}
`;

export const LocationName = styled.span`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

export const Coordinates = styled.span`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
`;

export const BottomBar = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--content-width);
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto;
  border-top: 1px solid var(--color-line);
  padding: 1.5rem var(--page-gutter);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const BottomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Copyright = styled.p`
  ${labelStyles}
`;

export const Credits = styled.p`
  ${labelStyles}
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
`;

export const BackToTop = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-block: -0.25rem;
  padding-block: 0.25rem;
  border: 0;
  background: none;
  ${labelStyles}
  cursor: pointer;
  transition: color 200ms ease;

  &:hover {
    color: var(--color-paper);
  }

  & svg {
    transition: transform 200ms ease;
  }

  &:hover svg {
    transform: translateY(-2px);
  }

  ${focusRing}
`;
