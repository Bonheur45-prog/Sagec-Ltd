// src/data/blog.js

export const BLOG_CATEGORIES = [
  "Architecture",
  "Engineering",
  "Interior Design",
  "Projects",
  "News",
];

const blog = [
  {
    id: "b1",
    slug: "silverback-mall-design-process",
    title: "Inside the Design Process: Silverback Mall",
    category: "Projects",
    date: "March 12, 2024",
    readTime: "6 min read",
    excerpt:
      "How SAGEC approached the architectural and structural challenges of delivering Kigali's most ambitious retail development — from concept sketch to opening day.",
    coverImage: "https://images.squarespace-cdn.com/content/v1/687a4ad3366a2678166725fa/27279f5e-8b1a-4739-adf4-e35b4dd79037/DSC07363.jpg?format=2500w",
    content: `
      <p>The Silverback Mall project stands as one of SAGEC's most complex and rewarding commissions. From the earliest concept meetings with the client through to the final handover, the project demanded innovation at every stage.</p>
      <p>Our architectural team began with a deep study of Kigali's commercial landscape — understanding not just what the city needed today, but what it would need a decade from now. The result is a structure designed for adaptability as much as for immediate function.</p>
      <p>Structurally, the site presented significant challenges. The hillside terrain required a bespoke foundation solution that our engineering team developed over several months of geotechnical analysis. The final design distributes load across a hybrid concrete and steel frame that responds intelligently to the ground conditions below.</p>
    `,
    featured: true,
  },
  {
    id: "b2",
    slug: "sustainable-construction-rwanda",
    title: "Building Green: Sustainable Construction in Rwanda",
    category: "Engineering",
    date: "February 28, 2024",
    readTime: "5 min read",
    excerpt:
      "Rwanda's construction sector is at a turning point. SAGEC explores how sustainable building practices are being integrated into local projects without compromising cost or timeline.",
    coverImage: "",
    content: `
      <p>Sustainability in construction is no longer a luxury — it is a responsibility. At SAGEC, we have been integrating green building principles into our projects for several years, and the results speak for themselves.</p>
      <p>From passive cooling strategies that reduce mechanical HVAC loads to rainwater harvesting systems embedded in our commercial developments, the toolkit of sustainable construction is broader and more accessible than many clients realise.</p>
    `,
    featured: false,
  },
  {
    id: "b3",
    slug: "lemigo-hotel-interior-transformation",
    title: "The Art of Hospitality: Lemigo Hotel Interior",
    category: "Interior Design",
    date: "February 10, 2024",
    readTime: "4 min read",
    excerpt:
      "A look at how SAGEC's interior design team transformed Lemigo Hotel into one of Kigali's premier hospitality destinations — balancing luxury, function, and Rwandan identity.",
    coverImage: "",
    content: `
      <p>Interior design for a five-star hotel demands a rare combination of skills — aesthetic vision, technical precision, and an understanding of how guests move through and experience space. The Lemigo Hotel commission gave SAGEC's interior team the opportunity to demonstrate all three.</p>
      <p>The brief was clear: create interiors that feel unmistakably Rwandan without resorting to pastiche. Every material selection, every lighting decision, and every furniture specification was made with this principle in mind.</p>
    `,
    featured: false,
  },
  {
    id: "b4",
    slug: "kigali-master-plan-opportunities",
    title: "Kigali 2050: What the Master Plan Means for Construction",
    category: "News",
    date: "January 22, 2024",
    readTime: "7 min read",
    excerpt:
      "Kigali's updated master plan signals a major shift in urban development priorities. We break down what it means for architects, developers, and engineering firms operating in Rwanda.",
    coverImage: "",
    content: `
      <p>The release of Kigali's updated master plan has been one of the most significant events in Rwanda's built environment sector in recent years. For firms like SAGEC, understanding its implications is not optional — it is essential to responsible practice.</p>
      <p>The plan prioritises transit-oriented development, mixed-use zoning, and a significant increase in green space requirements. Each of these has direct consequences for how buildings are designed, where they are located, and what approvals they require.</p>
    `,
    featured: false,
  },
  {
    id: "b5",
    slug: "structural-engineering-high-rise",
    title: "Engineering Tall: Structural Considerations for High-Rise in Kigali",
    category: "Engineering",
    date: "January 8, 2024",
    readTime: "8 min read",
    excerpt:
      "As Kigali's skyline grows taller, so do the structural engineering challenges. SAGEC's lead engineers share the principles behind safe and efficient high-rise design in East Africa.",
    coverImage: "",
    content: `
      <p>High-rise construction in Kigali presents a unique set of structural challenges that differ meaningfully from those encountered in more temperate climates. Wind loads, seismic considerations, and the particular characteristics of Kigali's volcanic soil all factor into our structural calculations.</p>
      <p>Our engineering team has developed a set of principles for tall building design in the East African context, drawing on international best practice while remaining grounded in local conditions.</p>
    `,
    featured: false,
  },
  {
    id: "b6",
    slug: "rgb-building-civic-architecture",
    title: "Civic Architecture: Designing for Public Trust",
    category: "Architecture",
    date: "December 15, 2023",
    readTime: "5 min read",
    excerpt:
      "The RGB headquarters project gave SAGEC a rare opportunity to explore what civic architecture means in modern Rwanda — buildings that project institutional authority while remaining accessible to citizens.",
    coverImage: "",
    content: `
      <p>Civic buildings carry a weight that commercial or residential projects do not. They represent the state, the institution, the public interest. Getting them right demands a sensitivity to context that goes beyond the purely aesthetic.</p>
      <p>The RGB headquarters commission asked us to design a building that would stand for decades as a symbol of good governance — transparent, approachable, and authoritative in equal measure.</p>
    `,
    featured: false,
  },
  {
    id: "b7",
    slug: "women-in-construction-rwanda",
    title: "Women in Construction: SAGEC's Commitment to Diversity",
    category: "News",
    date: "December 3, 2023",
    readTime: "4 min read",
    excerpt:
      "Rwanda leads Africa in gender equality metrics. SAGEC reflects on its own progress in building a more diverse and inclusive workforce across architecture, engineering, and site management.",
    coverImage: "",
    content: `
      <p>Rwanda's record on gender equality is well documented. The country consistently ranks among the world's leaders on political representation and economic participation. The construction sector, however, has historically lagged behind.</p>
      <p>At SAGEC, we have made a conscious commitment to changing this — not through tokenism, but through structural changes to how we recruit, develop, and promote talent.</p>
    `,
    featured: false,
  },
  {
    id: "b8",
    slug: "biophilic-design-office-spaces",
    title: "Biophilic Design: Bringing Nature Into the Workspace",
    category: "Architecture",
    date: "November 18, 2023",
    readTime: "6 min read",
    excerpt:
      "The evidence is clear — workplaces that incorporate natural elements improve wellbeing and productivity. SAGEC explores how biophilic design principles are being applied in Kigali's office developments.",
    coverImage: "",
    content: `
      <p>Biophilic design — the integration of natural elements, materials, and patterns into the built environment — has moved from niche theory to mainstream practice over the past decade. The research supporting its benefits is compelling.</p>
      <p>In Kigali's warm climate, biophilic design takes on a particular richness. The abundance of natural light, the lush vegetation that characterises the city's hillsides, and the cultural connection to the land all create opportunities that designers in colder climates can only dream of.</p>
    `,
    featured: false,
  },
  {
    id: "b9",
    slug: "project-management-construction-rwanda",
    title: "Delivering On Time: Project Management in Rwandan Construction",
    category: "Engineering",
    date: "November 5, 2023",
    readTime: "5 min read",
    excerpt:
      "Timeline adherence is one of the biggest challenges in African construction. SAGEC's project management team shares the systems and culture that help us consistently deliver on schedule.",
    coverImage: "",
    content: `
      <p>Construction delays are a near-universal challenge — but they are not inevitable. At SAGEC, our track record of on-time delivery is not accidental. It is the result of deliberate systems, clear accountability, and a culture that treats a deadline as a commitment rather than a suggestion.</p>
      <p>Our project management methodology draws on international frameworks while adapting to the realities of the Rwandan construction market — including supply chain dynamics, regulatory timelines, and workforce considerations that are specific to this context.</p>
    `,
    featured: false,
  },
];

export default blog;