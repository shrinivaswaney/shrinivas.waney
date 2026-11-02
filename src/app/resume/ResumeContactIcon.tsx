'use client';

import { getIcon } from '@/lib/icons';

const CONTACT_ICONS: Record<string, ReturnType<typeof getIcon>> = {
  email: getIcon('email'),
  github: getIcon('github'),
  instagram: getIcon('instagram'),
  linkedin: getIcon('linkedin'),
  phone: getIcon('phone'),
  location: getIcon('location'),
} as const;

export function ResumeContactIcon({ name }: { name: string }) {
  const Icon = CONTACT_ICONS[name] ?? null;
  return Icon ? <Icon size={16} aria-hidden="true" /> : null;
}
