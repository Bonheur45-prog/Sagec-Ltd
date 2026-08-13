import SEO from '@components/SEO';
import { seo } from '@data/seo';
import AboutHero from '@sections/about/AboutHero';
import OurStory from '@sections/about/OurStory';
import MissionVision from '@sections/about/MissionVision';
import Timeline from '@sections/about/Timeline';
import AboutCTA from '@sections/about/AboutCTA';

export default function AboutPage() {
  return (
    <>
      <SEO {...seo.about} />
      <AboutHero />
      <OurStory />
      <MissionVision />
      <Timeline />
      <AboutCTA />
    </>
  )
}