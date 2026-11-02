import { getLocalizedText } from '@/data/portfolio';
import { siteCopy } from '@/data/meta';

export function LoadingScreen() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-ink"
      role="status"
      aria-label={getLocalizedText(siteCopy.loading)}
    >
      <span className="label">
        {'>'} {getLocalizedText(siteCopy.loading)} <span className="animate-blink">_</span>
      </span>
    </div>
  );
}

export default LoadingScreen;
