'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onIntroDone } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ScreenReaderOnly } from './ScreenReaderOnly';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const WordClip = styled.span`
  display: inline-block;
  overflow: hidden;
  padding-top: 0.14em;
  padding-bottom: 0.06em;
  margin-top: -0.14em;
  vertical-align: top;
  white-space: nowrap;
`;

const Character = styled.span`
  display: inline-block;
  will-change: transform;
`;

const WordSpace = styled.span`
  display: inline-block;
`;

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

/**
 * Splits text into words and letters, then reveals them at the end of the
 * intro or when the element enters the viewport.
 */
export const SplitText: React.FC<{
  text: string;
  as?: Tag;
  className?: string;
  charClassName?: string;
  trigger?: 'intro' | 'scroll';
  delay?: number;
  stagger?: number;
}> = ({
  text,
  as = 'span',
  className = '',
  charClassName = '',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.022,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const Tag = as as React.ElementType;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const chars = element.querySelectorAll<HTMLElement>('.char');

    if (prefersReducedMotion) {
      gsap.set(chars, { yPercent: 0 });
      return;
    }

    gsap.set(chars, { yPercent: 115 });

    const play = () =>
      gsap.to(chars, {
        yPercent: 0,
        duration: 1.15,
        ease: 'expo.out',
        stagger,
        delay,
      });

    if (trigger === 'intro') {
      return onIntroDone(play);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [text, trigger, delay, stagger, prefersReducedMotion]);

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      <ScreenReaderOnly data-screen-reader-only="">{text}</ScreenReaderOnly>
      {words.map((word, wordIndex) => (
        <WordClip key={wordIndex} aria-hidden="true">
          {Array.from(word).map((character, characterIndex) => (
            <Character key={characterIndex} className={`char ${charClassName}`}>
              {character}
            </Character>
          ))}
          {wordIndex < words.length - 1 && <WordSpace>&nbsp;</WordSpace>}
        </WordClip>
      ))}
    </Tag>
  );
};

/**
 * Adjusts variable-font weight based on pointer proximity.
 */
export const useProximityWeight = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  { min = 200, max = 800, radius = 260 }: { min?: number; max?: number; radius?: number } = {},
) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion || window.matchMedia('(hover: none)').matches) {
      return;
    }

    const chars = Array.from(element.querySelectorAll<HTMLElement>('.char'));
    let rects: { x: number; y: number }[] = [];
    const weights = chars.map(() => min);
    let mouseX = -9999;
    let mouseY = -9999;
    let frame = 0;
    let active = false;

    const measure = () => {
      rects = chars.map((character) => {
        const rect = character.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });
    };

    const loop = () => {
      let moving = false;

      chars.forEach((character, index) => {
        const point = rects[index];
        if (!point) return;

        const distance = Math.hypot(mouseX - point.x, mouseY - point.y);
        const proximity = Math.max(0, 1 - distance / radius);
        const target = min + (max - min) * proximity * proximity * (3 - 2 * proximity);

        weights[index] += (target - weights[index]) * 0.18;
        if (Math.abs(target - weights[index]) > 0.5) moving = true;

        character.style.fontVariationSettings = `"wght" ${weights[index].toFixed(0)}`;
      });

      frame = moving || active ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!frame) {
        measure();
        frame = requestAnimationFrame(loop);
      }
    };

    const onEnter = () => {
      active = true;
    };

    const onLeave = () => {
      active = false;
      mouseX = mouseY = -9999;
    };

    const zone = element.parentElement ?? element;

    window.addEventListener('pointermove', onMove, { passive: true });
    zone.addEventListener('pointerenter', onEnter);
    zone.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerenter', onEnter);
      zone.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [ref, min, max, radius, prefersReducedMotion]);
};

/**
 * Paragraph revealed word by word as it scrolls through the viewport.
 */
export const ScrollWords: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    const words = element.querySelectorAll('.word');
    const tween = gsap.fromTo(
      words,
      { opacity: 0.38 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        // Fully revealed while still well in view (bottom of the block at 75% of the viewport)
        scrollTrigger: { trigger: element, start: 'top 85%', end: 'bottom 75%', scrub: true },
      },
    );

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [text, prefersReducedMotion]);

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={index} className="word">
          {word}{' '}
        </span>
      ))}
    </p>
  );
};
