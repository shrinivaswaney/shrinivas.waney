import styled from 'styled-components';
import { labelStyles } from '@/styles/Shared.styles';

export const ResumePageRoot = styled.main`
  min-height: 100vh;
  padding: 2.5rem 1rem 4rem;
  background: var(--ink);
  color: var(--paper);

  @media (min-width: 40rem) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  @media (min-width: 48rem) {
    padding-right: 2.5rem;
    padding-left: 2.5rem;
  }
`;

export const ResumeContainer = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
`;

export const ResumeActionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ResumeActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const ResumeSheet = styled.article`
  padding: 1.5rem;
  border: 1px solid var(--line);
  background: rgb(255 255 255 / 2%);

  @media (min-width: 48rem) {
    padding: 2.5rem;
  }
`;

export const ResumeHeader = styled.header`
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--line);
`;

export const ResumeName = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 7.5rem);
  font-weight: 300;
  line-height: 0.86;
  letter-spacing: -0.01em;
  text-transform: uppercase;
`;

export const ResumeRole = styled.p`
  margin-top: 0.75rem;
  color: color-mix(in oklab, var(--paper) 70%, transparent);
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.4vw, 2.2rem);
`;

export const ContactList = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
  margin-top: 2rem;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  @media (min-width: 40rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 64rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const ContactAnchor = styled.a`
  color: color-mix(in oklab, var(--paper) 80%, transparent);
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: var(--paper);
  }
`;

export const ContactAnchorContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LocationItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: color-mix(in oklab, var(--paper) 80%, transparent);
`;

export const ResumeColumns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2.5rem;
  margin-top: 2.5rem;

  @media (min-width: 64rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const PrimaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 64rem) {
    grid-column: span 2 / span 2;
  }
`;

export const ResumeAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const ResumeSectionHeading = styled.h2`
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 400;
  line-height: 2.25rem;
  text-transform: uppercase;
`;

export const HeadingNumber = styled.span`
  margin-right: 0.75rem;
  color: color-mix(in oklab, var(--paper) 50%, transparent);
  font-family: var(--font-mono);
  font-size: 0.875rem;
`;

export const ProfileText = styled.p`
  color: color-mix(in oklab, var(--paper) 80%, transparent);
  line-height: 1.625;
`;

export const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ResumeEntry = styled.article<{ $interactive?: boolean }>`
  padding: 1rem;
  border: 1px solid var(--line);
  background: rgb(255 255 255 / 2%);
  ${({ $interactive }) =>
    $interactive &&
    `
      transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        border-color: color-mix(in oklab, var(--paper) 30%, transparent);
      }
    `}
`;

export const EntryHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 48rem) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const EntryTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
`;

export const EntryOrganization = styled.p`
  color: color-mix(in oklab, var(--paper) 70%, transparent);
`;

export const EntryPeriod = styled.span`
  ${labelStyles}
  flex-shrink: 0;
`;

export const HighlightList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: color-mix(in oklab, var(--paper) 80%, transparent);
  font-size: 0.875rem;
`;

export const EntryText = styled.p`
  margin-top: 0.25rem;
  color: color-mix(in oklab, var(--paper) 65%, transparent);
  font-size: 0.875rem;
`;

export const SkillGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SkillCategory = styled.h3`
  ${labelStyles}
  margin-bottom: 0.5rem;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ResumeTag = styled.span<{ $muted?: boolean }>`
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--line);
  ${({ $muted }) => $muted && 'color: color-mix(in oklab, var(--paper) 80%, transparent);'}
  font-size: 0.875rem;
`;

export const ResumeBulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: color-mix(in oklab, var(--paper) 80%, transparent);
  font-size: 0.875rem;
`;

export const ResumeBullet = styled.li`
  line-height: 1.625;
`;
