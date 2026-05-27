import Hero from '@sections/home/Hero';
import Stats from '@sections/home/Stats';
import ServicesOverview from '@sections/home/Services';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      {/* Remaining sections will be added one by one */}
    </>
  )
}
