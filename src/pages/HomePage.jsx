import SEO from '@components/SEO';
import { seo } from '@data/seo';
import Hero from '@sections/home/Hero';
import Stats from '@sections/home/Stats';
import ServicesOverview from '@sections/home/Services';
import FeaturedProjects from '@sections/home/FeaturedProjects';
import WhyChooseUs from '@sections/home/WhyChooseUs';
import Testimonials from '@sections/home/Testimonials';
import CTASection from '@sections/home/CTASection';

export default function HomePage() {
  return (
    <>
      <SEO {...seo.home} />
      <Hero />
      <Stats />
      <ServicesOverview />
      <FeaturedProjects />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      {/* Remaining sections will be added one by one */}
    </>
  )
}
