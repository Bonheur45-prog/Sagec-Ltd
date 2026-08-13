/**
 * SEO DATA — per-static-route metadata
 * ─────────────────────────────────────────────────────────────
 * Consumed by <SEO /> on each page component.
 * Dynamic routes (ServiceDetailPage, ProjectDetailPage, BlogPostPage)
 * build their own title/description/image straight from their own
 * data files instead of living here.
 * ─────────────────────────────────────────────────────────────
 */

export const seo = {
  home: {
    title: 'SAGEC Ltd — Building Excellence',
    description:
      "SAGEC Ltd — Architectural and Engineering Solutions. Rwanda's leading firm delivering innovative architecture, engineering, and construction excellence in Kigali.",
    path: '/',
  },
  about: {
    title: 'About Us',
    description:
      "Learn about SAGEC Ltd's story, mission, and the team behind landmark architectural and engineering projects across Rwanda.",
    path: '/about',
  },
  services: {
    title: 'Our Services',
    description:
      "Explore SAGEC Ltd's architectural design, structural engineering, MEP, and construction management services in Rwanda.",
    path: '/services',
  },
  projects: {
    title: 'Our Projects',
    description:
      "Browse SAGEC Ltd's portfolio of landmark projects across Rwanda, including Silverback Mall, Lemigo Hotel, and the RGB Building.",
    path: '/projects',
  },
  testimonials: {
    title: 'Client Testimonials',
    description:
      'Read what our clients say about working with SAGEC Ltd on architectural, engineering, and construction projects across Rwanda.',
    path: '/testimonials',
  },
  careers: {
    title: 'Careers',
    description:
      'Explore current job openings in architecture, engineering, and construction management with SAGEC Ltd in Kigali, Rwanda.',
    path: '/careers',
  },
  blog: {
    title: 'News & Insights',
    description:
      "Stay updated with the latest news, insights, and project stories from SAGEC Ltd's work across Rwanda.",
    path: '/blog',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with SAGEC Ltd for your next architectural, engineering, or construction project in Kigali, Rwanda.',
    path: '/contact',
  },
}