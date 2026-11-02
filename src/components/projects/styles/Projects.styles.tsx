import Link from 'next/link';
import styled, { css } from 'styled-components';

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
    outline: 1px solid var(--color-paper);
    outline-offset: 3px;
  }
`;

const topLinkStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.25rem;
  ${labelStyles}
  transition: color 200ms ease;

  &:hover {
    color: var(--color-paper);
  }

  & svg {
    transition: transform 200ms ease;
  }

  ${focusRing}
`;

export const Page = styled.main`
  min-height: 100vh;
  background: var(--color-ink);
  color: var(--color-paper);
`;

export const Shell = styled.div`
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
`;

export const Header = styled.header`
  padding: 2rem var(--page-gutter) 3rem;

  @media (min-width: 768px) {
    padding-top: 3rem;
    padding-bottom: 4rem;
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const BackLink = styled(Link)`
  ${topLinkStyles}

  &:hover svg {
    transform: translateX(-2px);
  }
`;

export const ProfileLink = styled.a`
  ${topLinkStyles}
`;

export const HeroRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
    margin-top: 4rem;
  }
`;

export const HeroBlock = styled.div`
  min-width: 0;
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

export const PageTitle = styled.h1`
  display: block;
  margin-top: 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(3.6rem, 13vw, 14rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 0.82;
  text-transform: uppercase;
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  margin-bottom: 0.25rem;
`;

export const Stat = styled.div`
  min-width: 0;
`;

export const StatValue = styled.span`
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  line-height: 0.9;
`;

export const StatLabel = styled.p`
  margin-top: 0.25rem;
  ${labelStyles}
`;

export const Explorer = styled.section`
  padding: 0 var(--page-gutter) 6rem;

  @media (min-width: 768px) {
    padding-bottom: 8rem;
  }
`;

export const FilterBar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: end;
    gap: 2rem;
  }
`;

export const SearchField = styled.label`
  position: relative;
  display: block;

  @media (min-width: 1024px) {
    grid-column: span 4;
  }
`;

export const FilterLabel = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  ${labelStyles}
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 0;
  bottom: 0.75rem;
  display: inline-flex;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--color-line);
  background: transparent;
  padding: 0.625rem 2rem 0.625rem 1.75rem;
  color: var(--color-paper);
  transition: border-color 180ms ease;

  &::placeholder {
    color: color-mix(in oklab, var(--color-paper) 30%, transparent);
  }

  &:focus {
    border-color: var(--color-paper);
    outline: none;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0.7rem;
  display: inline-flex;
  border: 0;
  background: none;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
  cursor: pointer;
  transition: color 180ms ease;

  &:hover {
    color: var(--color-paper);
  }

  ${focusRing}
`;

export const FilterGroup = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 8;
  }
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const FilterChip = styled.button<{ $active: boolean }>`
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-paper)' : 'color-mix(in oklab, var(--color-paper) 12%, transparent)'};
  background: ${({ $active }) => ($active ? 'var(--color-paper)' : 'transparent')};
  padding: 0.375rem 0.75rem;
  color: ${({ $active }) =>
    $active ? 'var(--color-ink)' : 'color-mix(in oklab, var(--color-paper) 60%, transparent)'};
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    color 180ms ease;

  &:hover {
    border-color: ${({ $active }) =>
      $active ? 'var(--color-paper)' : 'color-mix(in oklab, var(--color-paper) 60%, transparent)'};
    color: ${({ $active }) => ($active ? 'var(--color-ink)' : 'var(--color-paper)')};
  }

  ${focusRing}
`;

export const IndexWrap = styled.div`
  position: relative;
`;

export const TableHead = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 4rem minmax(0, 1fr) 10rem 6rem 2rem;
    gap: 1.5rem;
    border-bottom: 1px solid var(--color-line);
    padding-bottom: 0.75rem;
    ${labelStyles}
  }
`;

export const IndexList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const IndexItem = styled.li`
  scroll-margin-top: 5rem;
`;

export const RowButton = styled.button`
  display: grid;
  width: 100%;
  grid-template-columns: 2.5rem minmax(0, 1fr) 1.5rem;
  align-items: start;
  gap: 1rem;
  border: 0;
  border-bottom: 1px solid var(--color-line);
  background: none;
  padding: 1.25rem 0;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 280ms ease;

  &:hover {
    background: color-mix(in oklab, var(--color-paper) 2.5%, transparent);
  }

  @media (min-width: 768px) {
    grid-template-columns: 4rem minmax(0, 1fr) 10rem 6rem 2rem;
    gap: 1.5rem;
    padding: 1.5rem 0;
  }

  ${focusRing}
`;

export const RowNumber = styled.span`
  padding-top: 0.5rem;
  ${labelStyles}
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
  transition: color 200ms ease;

  ${RowButton}:hover & {
    color: var(--color-paper);
  }
`;

export const RowMain = styled.span`
  min-width: 0;
`;

export const RowTitle = styled.span`
  display: block;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.6vw, 4.4rem);
  font-weight: 300;
  line-height: 0.9;
  text-overflow: ellipsis;
  text-transform: uppercase;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);

  ${RowButton}:hover & {
    transform: translateX(0.75rem);
  }
`;

export const RowSummary = styled.span`
  display: block;
  max-width: 42rem;
  margin-top: 0.375rem;
  overflow: hidden;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
  font-size: 0.875rem;
  line-height: 1.5;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const RowStack = styled.span`
  display: none;
  padding-top: 0.75rem;
  ${labelStyles}

  @media (min-width: 768px) {
    display: block;
  }
`;

export const RowNotes = styled.span`
  display: none;
  align-items: center;
  gap: 0.375rem;
  padding-top: 0.75rem;
  ${labelStyles}

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const RowArrow = styled.span<{ $open: boolean }>`
  justify-self: end;
  margin-top: 0.75rem;
  display: inline-flex;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
  transform: rotate(${({ $open }) => ($open ? '90deg' : '0deg')});
  transition:
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    color 200ms ease;

  ${RowButton}:hover & {
    color: var(--color-paper);
    transform: rotate(${({ $open }) => ($open ? '90deg' : '45deg')});
  }
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.75rem;
  border-bottom: 1px solid var(--color-line);
  padding: 0 0 2rem 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 3rem;
    padding-left: 4rem;
  }
`;

export const DetailColumn = styled.div`
  min-width: 0;
`;

export const DetailLabel = styled.p`
  margin-bottom: 0.75rem;
  ${labelStyles}
`;

export const DetailSection = styled.div`
  margin-top: 1.5rem;
`;

export const DetailText = styled.p`
  max-width: 48rem;
  color: color-mix(in oklab, var(--color-paper) 72%, transparent);
  line-height: 1.7;
`;

export const DetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const DetailListItem = styled.li`
  display: flex;
  max-width: 52rem;
  gap: 0.75rem;
  color: color-mix(in oklab, var(--color-paper) 72%, transparent);
  font-size: 0.9375rem;
  line-height: 1.6;

  &::before {
    flex-shrink: 0;
    color: color-mix(in oklab, var(--color-paper) 35%, transparent);
    content: '—';
  }
`;

export const TechChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const TechChip = styled.span`
  display: inline-flex;
  border: 1px solid var(--color-line);
  padding: 0.25rem 0.625rem;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const DetailActions = styled.div`
  margin-top: 1.5rem;
`;

export const CodeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-line);
  background: color-mix(in oklab, var(--color-paper) 6%, transparent);
  padding: 0.75rem 1.25rem;
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background-color 200ms ease,
    color 200ms ease;

  &:hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }

  ${focusRing}
`;

export const SourceNote = styled.p`
  ${labelStyles}
  color: color-mix(in oklab, var(--color-paper) 45%, transparent);
`;

export const EmptyState = styled.div`
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
  padding: 4rem 0;
  text-align: center;
`;

export const EmptyTitle = styled.p`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  line-height: 1;
  text-transform: uppercase;
`;

export const EmptyHint = styled.p`
  margin-top: 0.75rem;
  ${labelStyles}
`;

export const Preview = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 300px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  will-change: transform;
  transition: opacity 300ms ease;
`;

export const PreviewCard = styled.div`
  border: 1px solid var(--color-line);
  background: var(--color-ink);
  padding: 0.375rem;
`;

export const PreviewImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: top;
`;

export const PreviewLabel = styled.p`
  margin-top: 0.375rem;
  padding-inline: 0.25rem;
  ${labelStyles}
`;
