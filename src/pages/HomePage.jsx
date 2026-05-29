import Hero from '@sections/home/Hero';
import Stats from '@sections/home/Stats';
import ServicesOverview from '@sections/home/Services';
import FeaturedProjects from '@sections/home/FeaturedProjects';
import WhyChooseUs from '@sections/home/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <FeaturedProjects />
      <WhyChooseUs />
      {/* Remaining sections will be added one by one */}
    </>
  )
}
