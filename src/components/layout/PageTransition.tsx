'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import { Label } from '@/styles/Shared.styles';

const ease = [0.76, 0, 0.24, 1] as const;

const RoutePage = styled(motion.div)`
  position: relative;
`;

const ExitCurtain = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 95;
  transform-origin: bottom;
  border-top: 1px solid var(--line);
  background: var(--stage);
  pointer-events: none;
`;

const EnterCurtain = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 95;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top;
  border-bottom: 1px solid var(--line);
  background: var(--stage);
  pointer-events: none;
`;

const TransitionLabel = styled(Label)`
  color: color-mix(in oklab, var(--paper) 70%, transparent);
`;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [transitionState, setTransitionState] = useState(() => ({
    pathname,
    hasNavigated: false,
  }));
  const duration = prefersReducedMotion ? 0 : 0.55;

  if (transitionState.pathname !== pathname) {
    setTransitionState({ pathname, hasNavigated: true });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <RoutePage key={pathname}>
        {children}
        <ExitCurtain
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: prefersReducedMotion ? 0 : 1 }}
          transition={{ duration, ease }}
        />
        <EnterCurtain
          aria-hidden="true"
          initial={!transitionState.hasNavigated || prefersReducedMotion ? false : { scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease, delay: 0.05 }}
        >
          <TransitionLabel suppressHydrationWarning>
            {pathname === '/' ? 'Index' : pathname.split('/').filter(Boolean).join(' / ')}
          </TransitionLabel>
        </EnterCurtain>
      </RoutePage>
    </AnimatePresence>
  );
}

export default PageTransition;
