import Link from 'next/link';
import styled, { css } from 'styled-components';

export const labelStyles = css`
  color: color-mix(in oklab, var(--paper) 60%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const Label = styled.span`
  ${labelStyles}
`;

const buttonStyles = css`
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
`;

const solidButtonStyles = css`
  ${buttonStyles}
  background: var(--paper);
  color: var(--ink);

  &:hover {
    background: #fff;
  }
`;

const ghostButtonStyles = css`
  ${buttonStyles}
  border: 1px solid var(--line);
  background: rgb(255 255 255 / 6%);
  color: var(--paper);

  &:hover {
    background: var(--paper);
    color: var(--ink);
  }
`;

export const SolidButtonLink = styled(Link)`
  ${solidButtonStyles}
`;

export const GhostButtonLink = styled(Link)`
  ${ghostButtonStyles}
`;

export const SolidButtonAnchor = styled.a`
  ${solidButtonStyles}
`;

export const GhostButton = styled.button`
  ${ghostButtonStyles}
`;
