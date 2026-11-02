'use client';

import { useEffect } from 'react';

/**
 * Re-aligns the URL hash once a full document load has settled.
 *
 * The browser scrolls to `#section` before webfonts and client-mounted
 * sections have their final height, which can leave direct links far from
 * their target. Client-side navigations are already handled by the router.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let cancelled = false;
    let frame = 0;
    let retry = 0;
    let applied = -1;

    const jump = () => {
      if (cancelled) return;
      // Do not fight the visitor if they already started scrolling.
      if (applied >= 0 && Math.abs(window.scrollY - applied) > 8) return;

      const target = document.getElementById(id);
      if (!target) return;

      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - margin);

      window.scrollTo({ top, behavior: 'instant' });
      applied = Math.round(window.scrollY);
    };

    frame = requestAnimationFrame(() => {
      retry = window.setTimeout(jump, 120);
    });
    void document.fonts?.ready.then(jump);
    window.addEventListener('load', jump);
    // Safety net for late layout shifts (deferred images, mounted sections).
    const settle = window.setTimeout(jump, 1000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(retry);
      clearTimeout(settle);
      window.removeEventListener('load', jump);
    };
  }, []);

  return null;
}
