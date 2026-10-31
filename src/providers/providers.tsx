'use client';
import { designTokens } from '@/styles/tokens';
import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgBase: designTokens.colors.ink,
          colorBorder: designTokens.colors.line,
          colorError: designTokens.colors.error,
          colorLink: designTokens.colors.paper,
          colorLinkHover: designTokens.colors.paperStrong,
          colorPrimary: designTokens.colors.paper,
          colorTextBase: designTokens.colors.paper,
          fontFamily: designTokens.fonts.sans,
          fontFamilyCode: designTokens.fonts.mono,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
