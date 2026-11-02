'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

const ease = [0.76, 0, 0.24, 1] as const;

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
      <motion.div
        key={pathname}
        className="relative"
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-95 origin-bottom border-t border-line bg-stage"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: prefersReducedMotion ? 0 : 1 }}
          transition={{ duration, ease }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-95 flex origin-top items-center justify-center border-b border-line bg-stage"
          initial={
            !transitionState.hasNavigated || prefersReducedMotion ? false : { scaleY: 1 }
          }
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease, delay: 0.05 }}
        >
          <span className="label text-paper/70">
            {pathname === '/' ? 'Index' : pathname.split('/').filter(Boolean).join(' / ')}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
