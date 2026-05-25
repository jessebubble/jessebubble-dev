import SectionHero from './components/section-hero';
import SectionAbout from './components/section-about';
import SectionNow from './components/section-now';
import SectionWork from './components/section-work';
import SectionContact from './components/section-contact';
import TerminalEasterEgg from './components/terminal-easter-egg';
import StickyResumeChip from './components/sticky-resume-chip';

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      <SectionHero />
      <SectionAbout />
      <SectionNow />
      <SectionWork />
      <SectionContact />
      <StickyResumeChip />
      <TerminalEasterEgg />
    </div>
  );
}
