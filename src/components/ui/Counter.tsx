'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useRef } from 'react';

const formatValue = (value: number, pad: number) => String(Math.round(value)).padStart(pad, '0');

/** Number that counts up when it enters the viewport. */
export function Counter({
  value,
  pad = 2,
  className,
  duration = 1400,
}: {
  value: number;
  pad?: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion) {
      element.textContent = formatValue(value, pad);
      return;
    }

    element.textContent = formatValue(0, pad);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 4);
          element.textContent = formatValue(value * eased, pad);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, pad, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {formatValue(value, pad)}
    </span>
  );
}
