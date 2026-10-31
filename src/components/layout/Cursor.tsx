'use client';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import {
  CursorDot,
  CursorLabel,
  CursorLayer,
  CursorRing,
  CursorRingInner,
  GlobalCursorStyles,
  INTERACTIVE,
} from './styles/Cursor.styles';

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
