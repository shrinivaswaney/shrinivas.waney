import { AboutSection } from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ManifestoBand } from '@/components/sections/ManifestoBand';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export default function Home() {
  return (
    <main id="main">
      <HeroSection />
      <ManifestoBand />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
