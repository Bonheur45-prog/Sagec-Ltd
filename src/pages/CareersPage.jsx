import SEO from '@components/SEO';
import { seo } from '@data/seo';
import CareersHero from "@sections/careers/CareersHero";
import OpenPositions from "@sections/careers/OpenPositions";

export default function CareersPage() {
  return (
    <>
      <SEO {...seo.careers} />
      <CareersHero />
      <OpenPositions />
    </>
  );
}
