import DitherHero from '@/components/webgl/DitherHero';
import { getLocalizedText } from '@/data/portfolio';
import { projectsPageCopy, siteCopy } from '@/data/meta';
import { profile } from '@/data/profile';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-[calc(100svh-8rem)] flex-col overflow-hidden bg-ink text-paper">
      <DitherHero centered intro={false} scrollLinked={false} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--ink) 75%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-4 py-8 sm:px-6 md:px-10">
        <div className="label flex justify-between gap-4">
          <span>Error · 404</span>
          <span>{getLocalizedText(siteCopy.lostSignal)}</span>
        </div>

        <div className="py-12 text-center">
          <h1 className="display text-[clamp(8rem,32vw,30rem)] leading-[0.8] mix-blend-difference">
            404
          </h1>
          <div className="mx-auto mt-6 max-w-xl border border-line bg-ink/90 px-5 py-4 backdrop-blur-sm">
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight">
              {getLocalizedText(siteCopy.notFoundTitle)}
            </p>
            <p className="mx-auto mt-2 max-w-md text-paper/70">
              {getLocalizedText(siteCopy.notFoundText)}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link href="/" className="btn-solid">
              <span aria-hidden="true">←</span>
              {getLocalizedText(siteCopy.backHome)}
            </Link>
            <Link href="/projects" className="btn-ghost">
              {getLocalizedText(projectsPageCopy.allProjects)}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <p className="label text-center">
          © {new Date().getFullYear()} {getLocalizedText(profile.brand)}
        </p>
      </div>
    </main>
  );
}
