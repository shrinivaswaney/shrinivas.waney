import { designTokens } from '@/styles/tokens';
import styled, { createGlobalStyle } from 'styled-components';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

const GlobalCursorStyles = createGlobalStyle`
  html.has-cursor,
  html.has-cursor * {
    cursor: none !important;
  }

  html.has-cursor input,
  html.has-cursor textarea {
    cursor: text !important;
  }
`;

const CursorLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
`;

const CursorRing = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translate3d(-100px, -100px, 0);
  transition: opacity 0.2s ease;
  will-change: transform, opacity;

  &[data-visible='true'] {
    opacity: 1;
  }
`;

const CursorRingInner = styled.div`
  display: flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  margin: -17px 0 0 -17px;
  border: 1px solid var(--color-line-focus);
  border-radius: 999px;
  mix-blend-mode: difference;
  transition:
    width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    margin 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.3s,
    border-color 0.3s,
    transform 0.15s ease;

  [data-state='hover'] & {
    width: 56px;
    height: 56px;
    margin: -28px 0 0 -28px;
    border-color: var(--color-paper);
  }

  [data-state='label'] & {
    width: 96px;
    height: 96px;
    margin: -48px 0 0 -48px;
    border-color: var(--color-paper);
    background: var(--color-paper);
  }

  [data-pressed='true'] & {
    transform: scale(0.8);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const CursorLabel = styled.span`
  color: var(--color-ink);
  font-family: ${designTokens.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity 0.25s,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  [data-state='label'] & {
    opacity: 1;
    transform: scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: var(--color-paper);
  mix-blend-mode: difference;
  opacity: 0;
  transform: translate3d(-100px, -100px, 0);
  transition: opacity 0.2s ease;
  will-change: transform, opacity;

  &[data-visible='true'] {
    opacity: 1;
  }
`;

export {
  CursorDot,
  CursorLabel,
  CursorLayer,
  CursorRing,
  CursorRingInner,
  GlobalCursorStyles,
  INTERACTIVE,
};
