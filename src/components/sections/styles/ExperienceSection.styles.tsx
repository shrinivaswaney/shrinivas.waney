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

const ExperienceSectionContainer = styled.section`
  border-top: 1px solid var(--color-line);
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 6rem 2.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const ExperienceTitle = styled.h2`
  display: block;
  ${headingStyles}
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  text-transform: uppercase;
`;

const PathKicker = styled.p`
  display: none;

  @media (min-width: 768px) {
    display: block;
    ${labelStyles}
  }
`;

const ExperienceList = styled.ol`
  border-top: 1px solid var(--color-line);
`;

const ExperienceItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  border-bottom: 1px solid var(--color-line);
  padding-block: 2rem;
  transition: background-color 200ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.025);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 2rem;
  }
`;

const ExperienceMeta = styled.div`
  ${labelStyles}

  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;

const ExperienceNumber = styled.span`
  color: var(--color-paper);
`;

const ExperienceMain = styled.div`
  @media (min-width: 768px) {
    grid-column: span 4;
  }
`;

const ExperienceRole = styled.h3`
  ${headingStyles}
  font-size: 1.875rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const ExperienceCompany = styled.p`
  margin-top: 0.25rem;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

const ExperienceBody = styled.div`
  @media (min-width: 768px) {
    grid-column: span 6;
  }
`;

const ExperienceText = styled.p`
  line-height: 1.625;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
`;

const ExperienceChips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1rem;
`;

const ExperienceChip = styled.li`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--color-line);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: normal;
  text-transform: none;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  transition:
    border-color 200ms ease,
    color 200ms ease;

  &:hover {
    border-color: color-mix(in oklab, var(--color-paper) 60%, transparent);
    color: var(--color-paper);
  }
`;

const ReadMoreSpacer = styled.div`
  margin-top: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

export {
  ExperienceBody,
  ExperienceChip,
  ExperienceChips,
  ExperienceCompany,
  ExperienceItem,
  ExperienceList,
  ExperienceMain,
  ExperienceMeta,
  ExperienceNumber,
  ExperienceRole,
  ExperienceSectionContainer,
  ExperienceText,
  ExperienceTitle,
  PathKicker,
  ReadMoreSpacer,
  SectionHeader,
};
