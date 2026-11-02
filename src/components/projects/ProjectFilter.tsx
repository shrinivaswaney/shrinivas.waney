'use client';

import { projectsPageCopy } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import {
  ChipRow,
  ClearButton,
  FilterBar,
  FilterChip,
  FilterGroup,
  FilterLabel,
  SearchField,
  SearchIcon,
  SearchInput,
} from './styles/Projects.styles';

type ProjectFilterProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTechnology: string | null;
  setSelectedTechnology: (technology: string | null) => void;
  availableTechnologies: readonly string[];
};

export function ProjectFilter({
  searchTerm,
  setSearchTerm,
  selectedTechnology,
  setSelectedTechnology,
  availableTechnologies,
}: ProjectFilterProps) {
  return (
    <FilterBar>
      <SearchField>
        <FilterLabel>{getLocalizedText(projectsPageCopy.search)}</FilterLabel>
        <SearchIcon aria-hidden="true">
          <MagnifyingGlassIcon size={15} />
        </SearchIcon>
        <SearchInput
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={getLocalizedText(projectsPageCopy.searchPlaceholder)}
        />
        {searchTerm && (
          <ClearButton
            type="button"
            onClick={() => setSearchTerm('')}
            aria-label={getLocalizedText(projectsPageCopy.clearSearch)}
          >
            <XIcon size={15} aria-hidden="true" />
          </ClearButton>
        )}
      </SearchField>

      <FilterGroup>
        <FilterLabel>{getLocalizedText(projectsPageCopy.filterStack)}</FilterLabel>
        <ChipRow role="group" aria-label={getLocalizedText(projectsPageCopy.filterStack)}>
          <FilterChip
            type="button"
            $active={selectedTechnology === null}
            aria-pressed={selectedTechnology === null}
            onClick={() => setSelectedTechnology(null)}
          >
            {getLocalizedText(projectsPageCopy.all)}
          </FilterChip>
          {availableTechnologies.map((technology) => (
            <FilterChip
              key={technology}
              type="button"
              $active={selectedTechnology === technology}
              aria-pressed={selectedTechnology === technology}
              onClick={() =>
                setSelectedTechnology(selectedTechnology === technology ? null : technology)
              }
            >
              {technology}
            </FilterChip>
          ))}
        </ChipRow>
      </FilterGroup>
    </FilterBar>
  );
}
