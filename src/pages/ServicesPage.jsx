import ServicesHero from '@sections/services/ServicesHero';
import ServicesList from '@sections/services/ServicesList';
import ServicesProcess from '@sections/services/ServicesProcess';
import ServicesCTA from '@sections/services/ServicesCTA';

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <ServicesProcess />
      <ServicesCTA />
    </>
  )
}
