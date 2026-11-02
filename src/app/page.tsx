import { AboutSection } from '@/components/sections/AboutSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ManifestoBand } from '@/components/sections/ManifestoBand';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export default function Home() {
  return (
    <main id="main">
      <HeroSection />
      <ManifestoBand />
      <AboutSection />
      <ProjectsSection />
    </main>
  );
}
