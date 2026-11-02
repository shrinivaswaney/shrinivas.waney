'use client';

import { siteCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { ArrowLeftIcon, DownloadSimpleIcon, PrinterIcon } from '@phosphor-icons/react';
import Link from 'next/link';

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
    <div className="resume-actions mb-8 flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="btn-ghost">
        <ArrowLeftIcon size={16} aria-hidden="true" />
        Back to website
      </Link>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={printResume} className="btn-ghost">
          <PrinterIcon size={16} aria-hidden="true" />
          Print
        </button>
        <a href={profile.resumePath} download className="btn-solid">
          <DownloadSimpleIcon size={16} aria-hidden="true" />
          {getLocalizedText(siteCopy.downloadResume)}
        </a>
      </div>
    </div>
  );
}
