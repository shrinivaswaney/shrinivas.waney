import { profile } from '@/data/profile';
import type { Metadata } from 'next';
import { ResumeActions } from './ResumeActions';
import { ResumeContactIcon } from './ResumeContactIcon';
import { getLocalizedText } from '@/data/portfolio';
import { experiences } from '@/data/experience';
import { education } from '@/data/education';
import { skillGroups } from '@/data/skills';
import { impactStatements } from '@/data/meta';
import { professionalDevelopment } from '@/data/certifications';
import { aboutInterests } from '@/data/sectionsMeta';

export const metadata: Metadata = {
  title: 'Resume | Shrinivas Waney',
  description:
    'Resume of Shrinivas Waney, Product Engineer, Full Stack Developer, and AI Engineer.',
};

function ResumeHeading({ number, children }: { number: string; children: string }) {
  return (
    <h2 className="mb-5 border-b border-line pb-2 font-display text-3xl uppercase">
      <span className="mr-3 font-mono text-sm text-paper/50">{number}</span>
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <main
      id="main"
      className="resume-page min-h-screen bg-ink px-4 pb-16 pt-10 text-paper sm:px-6 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <ResumeActions />

        <article className="resume-sheet crosshair border border-line bg-white/2 p-6 md:p-10">
          <header className="border-b border-line pb-8">
            <h1 className="display text-[clamp(3rem,8vw,7.5rem)]">
              {getLocalizedText(profile.name)}
            </h1>
            <p className="mt-3 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] text-paper/70">
              {getLocalizedText(profile.currentRole)}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 font-mono text-[12px] uppercase tracking-[0.06em] sm:grid-cols-2 lg:grid-cols-3">
              {profile.contactChannels.map((channel) => {
                return (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      target={
                        channel.id === 'email' || channel.id === 'phone' ? undefined : '_blank'
                      }
                      rel={
                        channel.id === 'email' || channel.id === 'phone' ? undefined : 'noreferrer'
                      }
                      className="text-paper/80 transition-colors hover:text-paper"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ResumeContactIcon name={channel.id} />
                        {getLocalizedText(channel.label)}: {channel.value}
                      </span>
                    </a>
                  </li>
                );
              })}
              <li className="text-paper/80 flex items-center gap-2">
                <ResumeContactIcon name="location" /> Location: {getLocalizedText(profile.location)}
              </li>
            </ul>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <section>
                <ResumeHeading number="01">Profile</ResumeHeading>
                <p className="leading-relaxed text-paper/80">
                  {getLocalizedText(profile.introduction)}
                </p>
              </section>

              <section>
                <ResumeHeading number="02">Professional Experience</ResumeHeading>
                <div className="space-y-6">
                  {experiences.map((experience) => (
                    <article
                      key={experience.id}
                      className="resume-entry border border-line bg-white/2 p-4 transition-colors hover:border-paper/30"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-display text-2xl">
                            {getLocalizedText(experience.role)}
                          </h3>
                          <p className="text-paper/70">
                            {getLocalizedText(experience.organization)} ·{' '}
                            {getLocalizedText(experience.location)}
                          </p>
                        </div>
                        <span className="label shrink-0">
                          {getLocalizedText(experience.period)}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-paper/80">
                        {experience.highlights.map((highlight) => (
                          <li key={getLocalizedText(highlight)} className="leading-relaxed">
                            • {getLocalizedText(highlight)}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <ResumeHeading number="03">Education</ResumeHeading>
                <div className="space-y-5">
                  {education.map((item) => (
                    <article
                      key={item.id}
                      className="resume-entry border border-line bg-white/2 p-4"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-display text-2xl">
                            {getLocalizedText(item.program)}
                          </h3>
                          <p className="text-paper/70">{getLocalizedText(item.institution)}</p>
                        </div>
                        <span className="label shrink-0">{getLocalizedText(item.period)}</span>
                      </div>
                      <p className="mt-1 text-sm text-paper/65">
                        {getLocalizedText(item.location)}
                        {'grade' in item && item.grade ? ` · ${getLocalizedText(item.grade)}` : ''}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-10">
              <section>
                <ResumeHeading number="04">Skills</ResumeHeading>
                <div className="space-y-5">
                  {skillGroups.map((group) => (
                    <div key={group.id}>
                      <h3 className="label mb-2">{getLocalizedText(group.category)}</h3>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span key={skill} className="border border-line px-2 py-1 text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <ResumeHeading number="05">Key Achievements</ResumeHeading>
                <ul className="space-y-3 text-sm text-paper/80">
                  {impactStatements.map((statement) => (
                    <li key={getLocalizedText(statement)} className="leading-relaxed">
                      • {getLocalizedText(statement)}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <ResumeHeading number="06">Professional Development</ResumeHeading>
                <ul className="space-y-3 text-sm text-paper/80">
                  {professionalDevelopment.map((item) => (
                    <li key={item.id} className="leading-relaxed">
                      {getLocalizedText(item.title)} · {item.provider}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <ResumeHeading number="07">Areas of Focus</ResumeHeading>
                <div className="flex flex-wrap gap-2">
                  {aboutInterests.map((interest) => (
                    <span
                      key={getLocalizedText(interest)}
                      className="border border-line px-2 py-1 text-sm text-paper/80"
                    >
                      {getLocalizedText(interest)}
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
