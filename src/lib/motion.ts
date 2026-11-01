/**
 * Shared "intro finished" signal.
 *
 * The hero is currently the first thing on the page, so it marks the intro as
 * done once it mounts. Keeping the signal in a module lets a preloader or any
 * other entrance sequence take over later without changing consumers.
 */
let introDone = false;
const introListeners = new Set<() => void>();

export const markIntroDone = () => {
  if (introDone) return;
  introDone = true;
  introListeners.forEach((listener) => listener());
  introListeners.clear();
};

export const onIntroDone = (callback: () => void) => {
  if (introDone) {
    callback();
    return () => {};
  }

  introListeners.add(callback);
  return () => {
    introListeners.delete(callback);
  };
};

export const isIntroDone = () => introDone;

/**
 * Scroll velocity in pixels per frame (60fps), smoothed between calls.
 *
 * The target project does not run Lenis, so instead of reading its velocity we
 * sample `window.scrollY` each time a ticker asks for it. The exponential
 * smoothing makes the value decay back to zero when scrolling stops.
 */
let lastScrollY = 0;
let lastSampleAt = 0;
let scrollVelocity = 0;

export const getScrollVelocity = () => {
  if (typeof window === 'undefined') return 0;

  const now = performance.now();
  const y = window.scrollY;

  if (lastSampleAt === 0) {
    lastScrollY = y;
    lastSampleAt = now;
    return 0;
  }

  const elapsed = Math.max(now - lastSampleAt, 1);
  const instant = ((y - lastScrollY) / elapsed) * (1000 / 60);

  lastScrollY = y;
  lastSampleAt = now;
  scrollVelocity += (instant - scrollVelocity) * 0.2;

  if (Math.abs(scrollVelocity) < 0.05) scrollVelocity = 0;

  return scrollVelocity;
};
