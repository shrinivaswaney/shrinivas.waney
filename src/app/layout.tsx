import { CustomCursor } from '@/components/layout/Cursor';
import { Footer } from '@/components/layout/Footer';
import { Frame } from '@/components/layout/Frame';
import { HashScroll } from '@/components/layout/HashScroll';
import { PageTransition } from '@/components/layout/PageTransition';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { siteCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { Providers } from '@/providers/providers';
import { StyledComponentsRegistry } from '@/providers/styled-components-registry';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata, Viewport } from 'next';
import { Big_Shoulders, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const bigShouldersDisplay = Big_Shoulders({
  variable: '--font-big-shoulders',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  authors: [{ name: getLocalizedText(profile.name) }],
  title: `${getLocalizedText(profile.name)} | ${getLocalizedText(profile.role)}`,
  description: getLocalizedText(siteCopy.metadataDescription),
  keywords: ['Product Engineer', 'Software Projects', 'Portfolio'],
  openGraph: {
    siteName: getLocalizedText(profile.name),
    title: `${getLocalizedText(profile.name)} | ${getLocalizedText(profile.role)}`,
    description: getLocalizedText(siteCopy.metadataDescription),
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: `${getLocalizedText(profile.name)} | ${getLocalizedText(profile.role)}`,
    description: getLocalizedText(siteCopy.metadataDescription),
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bigShouldersDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.dataset.theme = localStorage.getItem('color-mode') === 'light' ? 'light' : 'dark';",
          }}
        />
      </head>
      <body className={`${geistSans.className} min-h-screen antialiased`}>
        <StyledComponentsRegistry>
          <Providers>
            <CustomCursor />
            <HashScroll />
            <SiteHeader />
            <Frame />
            <AntdRegistry>
              <PageTransition>{children}</PageTransition>
            </AntdRegistry>
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
