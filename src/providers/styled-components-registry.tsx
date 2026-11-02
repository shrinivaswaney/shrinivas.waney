'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { GlobalReset } from '@/styles/GlobalReset';

export function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <>
        <GlobalReset />
        {children}
      </>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <GlobalReset />
      {children}
    </StyleSheetManager>
  );
}
