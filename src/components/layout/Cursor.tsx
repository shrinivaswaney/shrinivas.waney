'use client';

import { designTokens } from '@/styles/tokens';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
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

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    sync();
    finePointer.addEventListener('change', sync);
    reducedMotion.addEventListener('change', sync);

    return () => {
      finePointer.removeEventListener('change', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    const ringX = gsap.quickTo(ring, 'x', {
      duration: 0.45,
      ease: 'power3.out',
    });
    const ringY = gsap.quickTo(ring, 'y', {
      duration: 0.45,
      ease: 'power3.out',
    });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08 });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08 });
    let magnet: HTMLElement | null = null;

    const resetMagnet = () => {
      if (!magnet) return;
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      });
      magnet = null;
    };

    const onMove = (event: PointerEvent) => {
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);

      if (!magnet) return;

      const bounds = magnet.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);
      gsap.to(magnet, {
        x: x * 0.28,
        y: y * 0.38,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      const target = event.target;
      const labelled = target.closest<HTMLElement>('[data-cursor]');
      const interactive = target.closest(INTERACTIVE);
      const nextMagnet = target.closest<HTMLElement>('[data-magnetic]');

      setLabel(labelled?.dataset.cursor ?? '');
      ring.dataset.state = labelled ? 'label' : interactive ? 'hover' : '';

      if (nextMagnet !== magnet) {
        resetMagnet();
        magnet = nextMagnet;
      }
    };

    const onDown = () => {
      ring.dataset.pressed = 'true';
    };

    const onUp = () => {
      delete ring.dataset.pressed;
    };

    const onLeaveWindow = () => {
      ring.dataset.visible = 'false';
      dot.dataset.visible = 'false';
    };

    const onEnterWindow = () => {
      ring.dataset.visible = 'true';
      dot.dataset.visible = 'true';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeaveWindow);
    document.documentElement.addEventListener('pointerenter', onEnterWindow);

    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
      document.documentElement.removeEventListener('pointerenter', onEnterWindow);
      if (magnet) {
        gsap.killTweensOf(magnet);
        gsap.set(magnet, { x: 0, y: 0 });
        magnet = null;
      }
      gsap.killTweensOf([ring, dot]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <GlobalCursorStyles />
      <CursorLayer aria-hidden="true">
        <CursorRing ref={ringRef} data-visible="true">
          <CursorRingInner>
            <CursorLabel>{label}</CursorLabel>
          </CursorRingInner>
        </CursorRing>
        <CursorDot ref={dotRef} data-visible="true" />
      </CursorLayer>
    </>
  );
}
