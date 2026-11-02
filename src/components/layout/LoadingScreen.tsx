import { getLocalizedText } from '@/data/portfolio';
import { siteCopy } from '@/data/meta';
import { Label } from '@/styles/Shared.styles';
import { LoadingCursor, LoadingRoot } from './LoadingScreen.styles';

export function LoadingScreen() {
  return (
    <LoadingRoot role="status" aria-label={getLocalizedText(siteCopy.loading)}>
      <Label>
        {'>'} {getLocalizedText(siteCopy.loading)} <LoadingCursor>_</LoadingCursor>
      </Label>
    </LoadingRoot>
  );
}

export default LoadingScreen;
