'use client';

import styled from 'styled-components';

const EducationSectionContainer = styled.section`
  border-top: 1px solid var(--color-line);
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 6rem 2.5rem;
  }
`;

const EducationTitle = styled.h2`
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

const EducationGrid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  border-top: 1px solid var(--color-line);
  border-left: 1px solid var(--color-line);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const EducationItem = styled.li`
  border-right: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
  padding: 1.25rem;
`;

const EducationPeriod = styled.p`
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

const EducationProgram = styled.p`
  margin-top: 0.75rem;
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 0.95;
  font-size: 1.5rem;
`;

const EducationPlace = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
`;

const EducationLocation = styled.p`
  font-size: 0.875rem;
  color: color-mix(in oklab, var(--color-paper) 50%, transparent);
`;

export {
  EducationGrid,
  EducationItem,
  EducationLocation,
  EducationPeriod,
  EducationPlace,
  EducationProgram,
  EducationSectionContainer,
  EducationTitle,
};
