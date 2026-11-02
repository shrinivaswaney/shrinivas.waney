import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

export const LoadingRoot = styled.div`
  display: flex;
  min-height: 60vh;
  align-items: center;
  justify-content: center;
  background: var(--ink);
`;

export const LoadingCursor = styled.span`
  animation: ${blink} 1.1s steps(2, start) infinite;
`;
