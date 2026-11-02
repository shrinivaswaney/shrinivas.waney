import DitherHero from '@/components/webgl/DitherHero';
import { getLocalizedText } from '@/data/portfolio';
import { projectsPageCopy, siteCopy } from '@/data/meta';
import { profile } from '@/data/profile';
import {
  ErrorCode,
  HomeLink,
  MessageCard,
  MessageText,
  MessageTitle,
  NotFoundContent,
  NotFoundFooter,
  NotFoundLinks,
  NotFoundMessage,
  NotFoundMeta,
  NotFoundOverlay,
  NotFoundRoot,
  ProjectsLink,
} from './not-found.styles';

export default function NotFound() {
  return (
    <NotFoundRoot>
      <DitherHero centered intro={false} scrollLinked={false} />
      <NotFoundOverlay aria-hidden="true" />

      <NotFoundContent>
        <NotFoundMeta>
          <span>Error · 404</span>
          <span>{getLocalizedText(siteCopy.lostSignal)}</span>
        </NotFoundMeta>

        <NotFoundMessage>
          <ErrorCode>404</ErrorCode>
          <MessageCard>
            <MessageTitle>{getLocalizedText(siteCopy.notFoundTitle)}</MessageTitle>
            <MessageText>{getLocalizedText(siteCopy.notFoundText)}</MessageText>
          </MessageCard>
          <NotFoundLinks>
            <HomeLink href="/">
              <span aria-hidden="true">←</span>
              {getLocalizedText(siteCopy.backHome)}
            </HomeLink>
            <ProjectsLink href="/projects">
              {getLocalizedText(projectsPageCopy.allProjects)}
              <span aria-hidden="true">↗</span>
            </ProjectsLink>
          </NotFoundLinks>
        </NotFoundMessage>

        <NotFoundFooter>
          © {new Date().getFullYear()} {getLocalizedText(profile.brand)}
        </NotFoundFooter>
      </NotFoundContent>
    </NotFoundRoot>
  );
}
