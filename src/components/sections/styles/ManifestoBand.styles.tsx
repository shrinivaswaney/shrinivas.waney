import styled, { css } from 'styled-components';

const Band = styled.section`
  position: relative;
  overflow: hidden;
  border-block: 1px solid var(--color-line);
`;

const NoiseImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
`;

const Veil = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    var(--color-ink) 0%,
    color-mix(in oklab, var(--color-ink) 40%, transparent) 50%,
    var(--color-ink) 100%
  );
`;

const Content = styled.div`
  position: relative;
  padding-block: 2.5rem;

  @media (min-width: 768px) {
    padding-block: 4rem;
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  will-change: transform;
`;

const Group = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

const Word = styled.span`
  display: flex;
  align-items: center;
  font-family: var(--font-display);
  font-size: clamp(4rem, 13vw, 13rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 0.86;
  text-transform: uppercase;
`;

const WordText = styled.span<{ $outlined?: boolean }>`
  ${({ $outlined }) =>
    $outlined &&
    css`
      color: transparent;
      -webkit-text-stroke: 1px color-mix(in oklab, var(--color-paper) 55%, transparent);
    `}
`;

const Star = styled.span`
  margin-inline: 1.5rem;
  color: color-mix(in oklab, var(--color-paper) 50%, transparent);
  font-family: var(--font-mono);
  font-size: 0.18em;

  @media (min-width: 768px) {
    margin-inline: 2.5rem;
  }
`;

const Subtitle = styled.p`
  max-width: 28rem;
  margin: 1.5rem auto 0;
  padding-inline: 1rem;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-align: center;
  text-transform: uppercase;
`;

export { Band, Content, Group, NoiseImage, Star, Subtitle, Track, Veil, Word, WordText };
