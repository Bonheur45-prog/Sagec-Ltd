import SEO from '@components/SEO';
import { seo } from '@data/seo';
import ContactHero from '@sections/contact/ContactHero'
import ContactMain from '@sections/contact/ContactMain'
import ContactMap  from '@sections/contact/ContactMap'

export default function ContactPage() {
  return (
    <>
      <SEO {...seo.contact} />
      <ContactHero />
      <ContactMain />
      <ContactMap />
    </>
  )
}