'use client';
import { designTokens } from '@/styles/tokens';
import { ConfigProvider, theme } from 'antd';
import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';

type ColorMode = 'dark' | 'light';
type ColorModeContextValue = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

function subscribeToColorMode(onChange: () => void) {
  window.addEventListener('color-mode-change', onChange);
  return () => window.removeEventListener('color-mode-change', onChange);
}

function getColorModeSnapshot(): ColorMode {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getServerColorModeSnapshot(): ColorMode {
  return 'dark';
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within Providers');
  }
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const colorMode = useSyncExternalStore(
    subscribeToColorMode,
    getColorModeSnapshot,
    getServerColorModeSnapshot,
  );

  const colorModeValue = useMemo(
    () => ({
      colorMode,
      toggleColorMode: () => {
        const nextMode = colorMode === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = nextMode;
        window.localStorage.setItem('color-mode', nextMode);
        window.dispatchEvent(new Event('color-mode-change'));
      },
    }),
    [colorMode],
  );

  return (
    <ColorModeContext.Provider value={colorModeValue}>
      <ConfigProvider
        theme={{
          algorithm: colorMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorBgBase: colorMode === 'dark' ? designTokens.colors.ink : '#f2f2ee',
            colorBorder: colorMode === 'dark' ? designTokens.colors.line : 'rgba(5, 5, 5, 0.12)',
            colorError: designTokens.colors.error,
            colorLink: colorMode === 'dark' ? designTokens.colors.paper : '#050505',
            colorLinkHover: colorMode === 'dark' ? designTokens.colors.paperStrong : '#292929',
            colorPrimary: colorMode === 'dark' ? designTokens.colors.paper : '#050505',
            colorTextBase: colorMode === 'dark' ? designTokens.colors.paper : '#050505',
            fontFamily: designTokens.fonts.sans,
            fontFamilyCode: designTokens.fonts.mono,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
}
