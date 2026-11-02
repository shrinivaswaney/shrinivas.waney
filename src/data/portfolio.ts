export const LOCALES = ['en', 'fr', 'hi'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type LocalizedText = { en: string } & Partial<Record<Exclude<Locale, 'en'>, string>>;

export const getLocalizedText = (text: LocalizedText, locale: Locale = DEFAULT_LOCALE): string =>
  text[locale] ?? text.en;

export const t = <S extends string>(en: S) => ({ en }) as const;

export type TimelineEntry = {
  id: string;
  period: LocalizedText;
  location: LocalizedText;
};

export type Pillar = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type LabHighlight = {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  href: string;
};

export const pillars: readonly Pillar[] = [];
export const labHighlights: readonly LabHighlight[] = [];
