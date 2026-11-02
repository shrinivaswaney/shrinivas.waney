'use client';
import { siteCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { manifestoWords } from '@/data/sectionsMeta';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getScrollVelocity } from '@/lib/motion';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import {
  Band,
  Content,
  Group,
  NoiseImage,
  Star,
  Subtitle,
  Track,
  Veil,
  Word,
  WordText,
} from './styles/ManifestoBand.styles';

/**
 * Full-width band: oversized keywords that scroll on their own, sped up and
 * skewed by the scroll velocity.
 */
export const ManifestoBand: React.FC = () => {
  const row = manifestoWords.map((word) => getLocalizedText(word));
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion || !gsap.ticker) return;

    let x = 0;
    let skew = 0;
    let direction = -1;
    const update = () => {
      const half = track.scrollWidth / 2;
      const v = getScrollVelocity();
      if (v !== 0) direction = v > 0 ? -1 : 1;
      x += direction * (0.6 + Math.min(Math.abs(v) * 0.5, 18));
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      skew += (Math.max(-12, Math.min(12, v * 0.6)) - skew) * 0.12;
      track.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
    };
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [prefersReducedMotion]);

  return (
    <Band aria-label={row.join(', ')}>
      <NoiseImage
        src="/assets/hero/noise-band.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <Veil aria-hidden="true" />

      <Content>
        <Track ref={trackRef} aria-hidden="true">
          {[0, 1].map((key) => (
            <Group key={key}>
              {[...row, ...row].map((word, index) => (
                <Word key={`${key}-${index}`}>
                  <WordText $outlined={index % 2 === 1}>{word}</WordText>
                  <Star aria-hidden="true">✳</Star>
                </Word>
              ))}
            </Group>
          ))}
        </Track>
        <Subtitle>{getLocalizedText(siteCopy.manifestoSub)}</Subtitle>
      </Content>
    </Band>
  );
};

export default ManifestoBand;
