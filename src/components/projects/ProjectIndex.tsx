'use client';

import { projectsPageCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import type { Project } from '@/data/projects';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  CodeLink,
  DetailActions,
  DetailColumn,
  DetailLabel,
  DetailList,
  DetailListItem,
  Details,
  DetailSection,
  DetailText,
  EmptyHint,
  EmptyState,
  EmptyTitle,
  IndexItem,
  IndexList,
  IndexWrap,
  Preview,
  PreviewCard,
  PreviewImage,
  PreviewLabel,
  RowArrow,
  RowButton,
  RowMain,
  RowNotes,
  RowNumber,
  RowStack,
  RowSummary,
  RowTitle,
  SourceNote,
  TableHead,
  TechChip,
  TechChips,
} from './styles/Projects.styles';

type PreviewState = {
  src: string;
  label: string;
};

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

const subscribeToFinePointer = (onChange: () => void) => {
  const query = window.matchMedia(FINE_POINTER_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const getFinePointerSnapshot = () => window.matchMedia(FINE_POINTER_QUERY).matches;

const getFinePointerServerSnapshot = () => false;

export function ProjectIndex({ projects }: { projects: readonly Project[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const finePointer = useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = previewRef.current;
    if (!element || !finePointer) return;

    const x = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' });
    const onMove = (event: PointerEvent) => {
      x(event.clientX + 356 > window.innerWidth ? event.clientX - 356 : event.clientX + 56);
      y(Math.min(Math.max(event.clientY - 150, 72), window.innerHeight - 276));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [finePointer]);

  if (projects.length === 0) {
    return (
      <EmptyState>
        <EmptyTitle>{getLocalizedText(projectsPageCopy.noResults)}</EmptyTitle>
        <EmptyHint>{getLocalizedText(projectsPageCopy.noResultsHint)}</EmptyHint>
      </EmptyState>
    );
  }

  return (
    <IndexWrap>
      <TableHead aria-hidden="true">
        <span>N°</span>
        <span>{getLocalizedText(projectsPageCopy.colProject)}</span>
        <span>{getLocalizedText(projectsPageCopy.colStack)}</span>
        <span>{getLocalizedText(projectsPageCopy.colHighlights)}</span>
        <span />
      </TableHead>

      <IndexList onPointerLeave={() => setPreview(null)}>
        {projects.map((project, index) => {
          const title = getLocalizedText(project.title);
          const summary = getLocalizedText(project.summary);
          const highlights = project.highlights.map((highlight) => getLocalizedText(highlight));
          const isOpen = expandedId === project.id;
          const detailsId = `${project.id}-details`;

          return (
            <IndexItem key={project.id} id={project.id}>
              <RowButton
                type="button"
                data-cursor="View"
                aria-expanded={isOpen}
                aria-controls={detailsId}
                aria-label={`${getLocalizedText(
                  isOpen ? projectsPageCopy.hideDetails : projectsPageCopy.showDetails,
                )} — ${title}`}
                onClick={() => setExpandedId(isOpen ? null : project.id)}
                onPointerEnter={() => {
                  if (!project.previewImage) return;
                  setPreview({
                    src: project.previewImage,
                    label: `${project.technologies[0] ?? 'Project'} · ${highlights.length} ${getLocalizedText(
                      projectsPageCopy.highlights,
                    ).toLowerCase()}`,
                  });
                }}
              >
                <RowNumber aria-hidden="true">{String(index + 1).padStart(2, '0')}</RowNumber>
                <RowMain>
                  <RowTitle>{title}</RowTitle>
                  <RowSummary>{summary}</RowSummary>
                </RowMain>
                <RowStack>{project.technologies.join(' · ')}</RowStack>
                <RowNotes aria-hidden="true">{String(highlights.length).padStart(2, '0')}</RowNotes>
                <RowArrow $open={isOpen} aria-hidden="true">
                  <ArrowUpRightIcon size={18} />
                </RowArrow>
              </RowButton>

              {isOpen && (
                <Details id={detailsId} role="region" aria-label={title}>
                  <DetailColumn>
                    <DetailLabel>{getLocalizedText(projectsPageCopy.overview)}</DetailLabel>
                    <DetailText>{summary}</DetailText>
                    <DetailSection>
                      <DetailLabel>{getLocalizedText(projectsPageCopy.highlights)}</DetailLabel>
                      <DetailList>
                        {highlights.map((highlight) => (
                          <DetailListItem key={highlight}>{highlight}</DetailListItem>
                        ))}
                      </DetailList>
                    </DetailSection>
                  </DetailColumn>

                  <DetailColumn>
                    <DetailLabel>
                      {getLocalizedText(projectsPageCopy.technologiesLabel)}
                    </DetailLabel>
                    <TechChips>
                      {project.technologies.map((technology) => (
                        <TechChip key={technology}>{technology}</TechChip>
                      ))}
                    </TechChips>
                    <DetailActions>
                      {project.previewUrl && (
                        <CodeLink
                          href={project.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getLocalizedText(projectsPageCopy.livePreview)}
                          <ArrowUpRightIcon size={14} aria-hidden="true" />
                        </CodeLink>
                      )}
                      {project.sourceUrl ? (
                        <CodeLink
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getLocalizedText(projectsPageCopy.viewCode)}
                          <ArrowUpRightIcon size={14} aria-hidden="true" />
                        </CodeLink>
                      ) : (
                        <SourceNote>{getLocalizedText(projectsPageCopy.privateBuild)}</SourceNote>
                      )}
                    </DetailActions>
                  </DetailColumn>
                </Details>
              )}
            </IndexItem>
          );
        })}
      </IndexList>

      {finePointer && (
        <Preview ref={previewRef} $visible={Boolean(preview)} aria-hidden="true">
          {preview && (
            <PreviewCard>
              <PreviewImage src={preview.src} alt="" />
              <PreviewLabel>{preview.label}</PreviewLabel>
            </PreviewCard>
          )}
        </Preview>
      )}
    </IndexWrap>
  );
}
