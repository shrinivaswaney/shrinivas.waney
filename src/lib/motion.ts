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
