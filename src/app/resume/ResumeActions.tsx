'use client';

import { siteCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { ArrowLeftIcon, DownloadSimpleIcon, PrinterIcon } from '@phosphor-icons/react';
import { GhostButton, GhostButtonLink, SolidButtonAnchor } from '@/styles/Shared.styles';
import { ResumeActionBar, ResumeActionGroup } from './Resume.styles';

export function ResumeActions() {
  const printResume = () => {
    const printWindow = window.open(profile.resumePath, '_blank');
    if (!printWindow) {
      window.location.assign(profile.resumePath);
      return;
    }

    const printPdf = () => {
      printWindow.focus();
      printWindow.print();
    };

    if (printWindow.document.readyState === 'complete') {
      window.setTimeout(printPdf, 0);
    } else {
      printWindow.addEventListener('load', printPdf, { once: true });
    }
  };

  return (
    <ResumeActionBar>
      <GhostButtonLink href="/">
        <ArrowLeftIcon size={16} aria-hidden="true" />
        Back to website
      </GhostButtonLink>

      <ResumeActionGroup>
        <GhostButton type="button" onClick={printResume}>
          <PrinterIcon size={16} aria-hidden="true" />
          Print
        </GhostButton>
        <SolidButtonAnchor href={profile.resumePath} download>
          <DownloadSimpleIcon size={16} aria-hidden="true" />
          {getLocalizedText(siteCopy.downloadResume)}
        </SolidButtonAnchor>
      </ResumeActionGroup>
    </ResumeActionBar>
  );
}
