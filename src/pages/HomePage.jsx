import Hero from '@sections/home/Hero';
import Stats from '@sections/home/Stats';
import ServicesOverview from '@sections/home/Services';
import FeaturedProjects from '@sections/home/FeaturedProjects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <FeaturedProjects />
      {/* Remaining sections will be added one by one */}
    </>
  )
}
