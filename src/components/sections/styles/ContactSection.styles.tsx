import styled, { css, keyframes } from 'styled-components';

const labelStyles = css`
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  line-height: 1.5;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
`;

const focusRing = css`
  &:focus-visible {
    outline: 2px solid var(--color-paper);
    outline-offset: 4px;
  }
`;

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

const ContactSectionContainer = styled.section`
  position: relative;
  width: 100%;
  scroll-margin-top: 4rem;
  overflow: hidden;
  border-top: 1px solid var(--color-line);
  background: var(--color-ink);
  color: var(--color-paper);
  padding: 5rem 1rem;

  &::after {
    position: absolute;
    top: 2rem;
    right: -12rem;
    width: min(45vw, 36rem);
    aspect-ratio: 1;
    background: url('/assets/art/globe-halftone.png') center / contain no-repeat;
    content: '';
    opacity: 0.14;
    pointer-events: none;
  }

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    padding-block: 7rem;
    padding-inline: 2.5rem;
  }
`;

const ContactContent = styled.div`
  position: relative;
  z-index: 1;
  width: min(100%, var(--content-width));
  margin-inline: auto;
`;

const ContactHeading = styled.header`
  max-width: 70rem;
`;

const ContactLabel = styled.span`
  ${labelStyles}
`;

const ContactTitle = styled.h2`
  margin-top: 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 9rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 0.86;
  text-transform: uppercase;
`;

const ContactEmail = styled.a`
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  border-bottom: 1px solid var(--color-line);
  padding-bottom: 0.5rem;
  color: color-mix(in oklab, var(--color-paper) 80%, transparent);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4.4vw, 4.6rem);
  font-weight: 300;
  line-height: 1;
  transition:
    border-color 200ms ease,
    color 200ms ease;
  ${focusRing}

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > svg {
    flex-shrink: 0;
    transition: transform 300ms ease;
  }

  &:hover {
    border-color: var(--color-paper);
    color: var(--color-paper);
  }

  &:hover > svg {
    transform: translate(3px, -3px);
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 2rem;
    margin-top: 4rem;
  }
`;

const ContactInfo = styled.div`
  min-width: 0;

  @media (min-width: 1024px) {
    grid-column: span 5;
  }

  > h3 {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 3vw, 2.5rem);
    font-weight: 400;
    line-height: 0.95;
  }
`;

const ContactDescription = styled.p`
  max-width: 28rem;
  margin-top: 1rem;
  color: color-mix(in oklab, var(--color-paper) 70%, transparent);
  line-height: 1.625;
`;

const ContactList = styled.ul`
  margin-top: 2rem;
  border-top: 1px solid var(--color-line);
`;

const ContactRow = styled.li`
  border-bottom: 1px solid var(--color-line);
`;

const ContactLink = styled.a`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
  padding-block: 1rem;
  color: color-mix(in oklab, var(--color-paper) 80%, transparent);
  transition: color 200ms ease;
  ${focusRing}

  &:hover {
    color: var(--color-paper);
  }
`;

const ContactLinkIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: color-mix(in oklab, var(--color-paper) 50%, transparent);
`;

const ContactAddress = styled.span`
  min-width: 0;
  flex: 1;
  overflow-wrap: anywhere;
  font-family: var(--font-mono);
  font-size: 13px;
`;

const ContactSocials = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const ContactSocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-line);
  padding: 0.75rem 1rem;
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background-color 200ms ease,
    color 200ms ease,
    border-color 200ms ease;
  ${focusRing}

  &:hover {
    border-color: var(--color-paper);
    background: var(--color-paper);
    color: var(--color-ink);
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid var(--color-line);
  background: color-mix(in oklab, var(--color-ink) 88%, transparent);
  padding: 1.25rem;
  backdrop-filter: blur(8px);
  position: relative;

  &::before,
  &::after {
    position: absolute;
    color: color-mix(in oklab, var(--color-paper) 45%, transparent);
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1;
    pointer-events: none;
    content: '+';
  }

  &::before {
    top: -8px;
    left: -5px;
  }

  &::after {
    right: -5px;
    bottom: -8px;
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    grid-column: 7 / span 6;
  }
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormTitle = styled.p`
  ${labelStyles}

  > span {
    animation: ${blink} 1.1s steps(2, start) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    > span {
      animation: none;
    }
  }
`;

const Field = styled.div`
  min-width: 0;

  > input,
  > textarea {
    display: block;
    width: 100%;
    border: 0;
    border-bottom: 1px solid var(--color-line);
    border-radius: 0;
    padding: 0.75rem 0;
    background: transparent;
    outline: none;
    color: var(--color-paper);
    font: inherit;
    line-height: 1.5;
    transition: border-color 200ms ease;

    &::placeholder {
      color: color-mix(in oklab, var(--color-paper) 30%, transparent);
    }

    &:focus {
      border-bottom-color: var(--color-paper);
      outline: none;
    }

    &:focus-visible {
      outline: none;
      border-bottom-color: var(--color-paper);
      outline-offset: 3px;
    }
  }

  > textarea {
    resize: vertical;
  }
`;

const FieldLabel = styled.label`
  display: block;
  ${labelStyles}
`;

const FieldError = styled.p`
  margin-top: 0.5rem;
  color: var(--color-error);
  font-size: 0.875rem;
  line-height: 1.5;
`;

const MessageCount = styled.p`
  margin-top: 0.5rem;
  color: color-mix(in oklab, var(--color-paper) 55%, transparent);
  font-family: var(--font-mono);
  font-size: 11px;
  text-align: right;
`;

const ContactSubmit = styled.button`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border: 1px solid var(--color-paper);
  padding: 1rem 1.25rem;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background-color 200ms ease,
    color 200ms ease,
    opacity 200ms ease;
  ${focusRing}

  &:hover:not(:disabled) {
    background: transparent;
    color: var(--color-paper);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }

  &:hover > svg {
    transform: translateX(3px);
  }

  > svg {
    transition: transform 200ms ease;
  }
`;

const ContactStatus = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  z-index: 70;
  right: max(1rem, var(--page-gutter));
  bottom: max(1rem, var(--page-gutter));
  display: flex;
  width: min(28rem, calc(100vw - 2rem));
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid
    ${({ $type }) => ($type === 'success' ? 'var(--color-line-strong)' : 'var(--color-error)')};
  background: color-mix(in oklab, var(--color-ink) 95%, transparent);
  padding: 1.25rem;
  color: var(--color-paper);
  line-height: 1.5;
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.25);
  backdrop-filter: blur(12px);
`;

const StatusClose = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  border: 0;
  padding: 0.125rem;
  background: transparent;
  color: color-mix(in oklab, var(--color-paper) 60%, transparent);
  cursor: pointer;

  &:hover {
    color: var(--color-paper);
  }

  &:focus-visible {
    outline: 2px solid var(--color-paper);
    outline-offset: 3px;
  }
`;

export {
  ContactAddress,
  ContactContent,
  ContactDescription,
  ContactEmail,
  ContactForm,
  ContactGrid,
  ContactHeading,
  ContactInfo,
  ContactLabel,
  ContactLink,
  ContactLinkIcon,
  ContactList,
  ContactRow,
  ContactSectionContainer,
  ContactSocialLink,
  ContactSocials,
  ContactStatus,
  ContactSubmit,
  ContactTitle,
  Field,
  FieldError,
  FieldLabel,
  FormHeader,
  FormTitle,
  MessageCount,
  StatusClose,
};
