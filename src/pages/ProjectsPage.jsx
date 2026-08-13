import SEO from '@components/SEO';
import { seo } from '@data/seo';
import ProjectsHero    from '@sections/projects/ProjectsHero'
import ProjectsStats   from '@sections/projects/ProjectsStats'
import FeaturedProject from '@sections/projects/FeaturedProject'
import ProjectsGrid    from '@sections/projects/ProjectsGrid'
import ProjectsCTA     from '@sections/projects/ProjectsCTA'

export default function ProjectsPage() {
  return (
    <>
      <SEO {...seo.projects} />
      <ProjectsHero />
      <ProjectsStats />
      <FeaturedProject />
      <ProjectsGrid />
      <ProjectsCTA />
    </>
  )
}