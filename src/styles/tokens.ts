export const designTokens = {
  colors: {
    ink: '#050505',
    stage: '#0b0b0b',
    paper: '#f2f2ee',
    paperStrong: '#ffffff',
    paperMuted: 'rgba(242, 242, 238, 0.68)',
    paperTint: 'rgba(242, 242, 238, 0.06)',
    headerSurface: 'rgba(5, 5, 5, 0.88)',
    error: '#ff7875',
    line: 'rgba(242, 242, 238, 0.12)',
    lineStrong: 'rgba(242, 242, 238, 0.28)',
    lineFocus: 'rgba(242, 242, 238, 0.65)',
  },
  fonts: {
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
    display: 'var(--font-big-shoulders), Impact, sans-serif',
  },
  breakpoints: {
    mobile: '(max-width: 640px)',
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },
  layout: {
    contentWidth: '1600px',
    gutter: 'clamp(20px, 4vw, 56px)',
    sectionSpace: 'clamp(48px, 9vw, 128px)',
    headerHeight: '64px',
    mobileHeaderHeight: '56px',
  },
} as const;
