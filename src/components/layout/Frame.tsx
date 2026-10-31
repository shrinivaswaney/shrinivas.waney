'use client';

import styled from 'styled-components';

const FrameBorder = styled.div`
  position: fixed;
  inset: var(--frame, 8px);
  z-index: 60;
  border: 1px solid var(--color-line-strong, rgb(242 242 238 / 0.28));
  pointer-events: none;
`;

export function Frame() {
  return <FrameBorder aria-hidden="true" />;
}
