'use client';

import { useEffect, useState } from 'react';

const formatTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Returns the current local time in HH:MM format and keeps it in sync.
 * The placeholder keeps server and client markup identical on first render.
 */
export const useLocalTime = () => {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const update = () => setTime(formatTime());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
};
