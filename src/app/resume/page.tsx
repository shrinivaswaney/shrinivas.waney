import { professionalDevelopment } from '@/data/certifications';
import { education } from '@/data/education';
import { experiences } from '@/data/experience';
import { impactStatements } from '@/data/meta';
import { getLocalizedText } from '@/data/portfolio';
import { profile } from '@/data/profile';
import { aboutInterests } from '@/data/sectionsMeta';
import { skillGroups } from '@/data/skills';
import type { Metadata } from 'next';
import {
  ContactAnchor,
  ContactAnchorContent,
  ContactList,
  EducationList,
  EntryHeading,
  EntryOrganization,
  EntryPeriod,
  EntryText,
  EntryTitle,
  ExperienceList,
  HeadingNumber,
  HighlightList,
  LocationItem,
  PrimaryColumn,
  ProfileText,
  ResumeAside,
  ResumeBullet,
  ResumeBulletList,
  ResumeColumns,
  ResumeContainer,
  ResumeEntry,
  ResumeHeader,
  ResumeName,
  ResumePageRoot,
  ResumeRole,
  ResumeSectionHeading,
  ResumeSheet,
  ResumeTag,
  SkillCategory,
  SkillGroups,
  TagList,
} from './Resume.styles';
import { ResumeActions } from './ResumeActions';
import { SocialIcon } from './SocialIcons';

export const metadata: Metadata = {
  title: 'Resume | Shrinivas Waney',
  description:
    'Resume of Shrinivas Waney, Product Engineer, Full Stack Developer, and AI Engineer.',
};

function ResumeHeading({ number, children }: { number: string; children: string }) {
  return (
    <ResumeSectionHeading>
      <HeadingNumber>{number}</HeadingNumber>
      {children}
    </ResumeSectionHeading>
  );
}

export default function ResumePage() {
  return (
    <ResumePageRoot id="main">
      <ResumeContainer>
        <ResumeActions />

        <ResumeSheet>
          <ResumeHeader>
            <ResumeName>{getLocalizedText(profile.name)}</ResumeName>
            <ResumeRole>{getLocalizedText(profile.currentRole)}</ResumeRole>

            <ContactList>
              {profile.contactChannels.map((channel) => {
                return (
                  <li key={channel.id}>
                    <ContactAnchor
                      href={channel.href}
                      target={
                        channel.id === 'email' || channel.id === 'phone' ? undefined : '_blank'
                      }
                      rel={
                        channel.id === 'email' || channel.id === 'phone' ? undefined : 'noreferrer'
                      }
                    >
                      <ContactAnchorContent>
                        <SocialIcon name={channel.id} />
                        {getLocalizedText(channel.label)}: {channel.value}
                      </ContactAnchorContent>
                    </ContactAnchor>
                  </li>
                );
              })}
              <LocationItem>
                <SocialIcon name="location" /> Location: {getLocalizedText(profile.location)}
              </LocationItem>
            </ContactList>
          </ResumeHeader>

          <ResumeColumns>
            <PrimaryColumn>
              <section>
                <ResumeHeading number="01">Profile</ResumeHeading>
                <ProfileText>{getLocalizedText(profile.introduction)}</ProfileText>
              </section>

              <section>
                <ResumeHeading number="02">Professional Experience</ResumeHeading>
                <ExperienceList>
                  {experiences.map((experience) => (
                    <ResumeEntry key={experience.id} $interactive>
                      <EntryHeading>
                        <div>
                          <EntryTitle>{getLocalizedText(experience.role)}</EntryTitle>
                          <EntryOrganization>
                            {getLocalizedText(experience.organization)} ·{' '}
                            {getLocalizedText(experience.location)}
                          </EntryOrganization>
                        </div>
                        <EntryPeriod>{getLocalizedText(experience.period)}</EntryPeriod>
                      </EntryHeading>
                      <HighlightList>
                        {experience.highlights.map((highlight) => (
                          <ResumeBullet key={getLocalizedText(highlight)}>
                            • {getLocalizedText(highlight)}
                          </ResumeBullet>
                        ))}
                      </HighlightList>
                    </ResumeEntry>
                  ))}
                </ExperienceList>
              </section>

              <section>
                <ResumeHeading number="03">Education</ResumeHeading>
                <EducationList>
                  {education.map((item) => (
                    <ResumeEntry key={item.id}>
                      <EntryHeading>
                        <div>
                          <EntryTitle>{getLocalizedText(item.program)}</EntryTitle>
                          <EntryOrganization>
                            {getLocalizedText(item.institution)}
                          </EntryOrganization>
                        </div>
                        <EntryPeriod>{getLocalizedText(item.period)}</EntryPeriod>
                      </EntryHeading>
                      <EntryText>
                        {getLocalizedText(item.location)}
                        {'grade' in item && item.grade ? ` · ${getLocalizedText(item.grade)}` : ''}
                      </EntryText>
                    </ResumeEntry>
                  ))}
                </EducationList>
              </section>
            </PrimaryColumn>

            <ResumeAside>
              <section>
                <ResumeHeading number="04">Skills</ResumeHeading>
                <SkillGroups>
                  {skillGroups.map((group) => (
                    <div key={group.id}>
                      <SkillCategory>{getLocalizedText(group.category)}</SkillCategory>
                      <TagList>
                        {group.skills.map((skill) => (
                          <ResumeTag key={skill}>{skill}</ResumeTag>
                        ))}
                      </TagList>
                    </div>
                  ))}
                </SkillGroups>
              </section>

              <section>
                <ResumeHeading number="05">Key Achievements</ResumeHeading>
                <ResumeBulletList>
                  {impactStatements.map((statement) => (
                    <ResumeBullet key={getLocalizedText(statement)}>
                      • {getLocalizedText(statement)}
                    </ResumeBullet>
                  ))}
                </ResumeBulletList>
              </section>

              <section>
                <ResumeHeading number="06">Professional Development</ResumeHeading>
                <ResumeBulletList>
                  {professionalDevelopment.map((item) => (
                    <ResumeBullet key={item.id}>
                      {getLocalizedText(item.title)} · {item.provider}
                    </ResumeBullet>
                  ))}
                </ResumeBulletList>
              </section>

              <section>
                <ResumeHeading number="07">Areas of Focus</ResumeHeading>
                <TagList>
                  {aboutInterests.map((interest) => (
                    <ResumeTag key={getLocalizedText(interest)} $muted>
                      {getLocalizedText(interest)}
                    </ResumeTag>
                  ))}
                </TagList>
              </section>
            </ResumeAside>
          </ResumeColumns>
        </ResumeSheet>
      </ResumeContainer>
    </ResumePageRoot>
  );
}
