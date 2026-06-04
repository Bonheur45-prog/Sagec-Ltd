// src/data/featuredProjects.js
// Each project supports 1–5 images in the `images` array.
// The photo slider only renders dot indicators when images.length > 1.
// `description` is hard-clamped to 2 lines in CSS — keep it concise.

const featuredProjects = [
  {
    id: "silverback-mall",
    title: "Silverback Mall",
    category: "Commercial",
    location: "Kigali",
    year: "2022",
    description:
      "A landmark retail and mixed-use complex redefining Kigali's commercial landscape with modern design and structural excellence.",
    images: [
      "/images/projects/silverback-mall/featured.jpg",
      "/images/projects/silverback-mall/gallery-1.jpg",
      "/images/projects/silverback-mall/cover.webp",
    ],
    link: "/projects/silverback-mall",
    featured: true,
  },
  {
    id: "florida-house",
    title: "Florida House",
    category: "Residential",
    location: "Kigali",
    year: "2021",
    description:
      "A premium residential development blending contemporary architecture with the natural contours of Kigali's hillside terrain.",
    images: [
      "/images/projects/florida-house/cover.jpg",
      "/images/projects/florida-house/featured.jpg",
    ],
    link: "/projects/florida-house",
    featured: false,
  },
  {
    id: "lemigo-hotel",
    title: "Lemigo Hotel Interior",
    category: "Interior",
    location: "Kigali",
    year: "2020",
    description:
      "Full interior fit-out for one of Kigali's premier hotels, crafting refined spaces that balance elegance with functional hospitality.",
    images: [
      "/images/projects/lemigo-hotel/featured.JPG",
      "/images/projects/lemigo-hotel/gallery-2.JPG",
      "/images/projects/lemigo-hotel/cover.JPG",
      "/images/projects/lemigo-hotel/gallery-1.JPG",
    ],
    link: "/projects/lemigo-hotel",
    featured: false,
  },
  {
    id: "rgb-building",
    title: "RGB Building",
    category: "Civic",
    location: "Remera, Kigali",
    year: "2021",
    description:
      "Institutional headquarters for the Rwanda Governance Board, delivering a civic presence that projects authority and transparency.",
    images: [
      "/images/projects/rgb-building/cover.jpg",
      "/images/projects/rgb-building/rgb-2.jpg",
    ],
    link: "/projects/rgb-building",
    featured: false,
  },
  {
    id: "project-five",
    title: "Kigali Heights Office",
    category: "Commercial",
    location: "Kigali",
    year: "2023",
    description:
      "A contemporary office complex engineered for sustainability and collaborative workspaces in the heart of the city.",
    images: [
      "/assets/projects/heights-1.jpg",
    ],
    link: "/projects/kigali-heights",
    featured: false,
  },
  {
    id: "project-six",
    title: "Norrsken House",
    category: "Engineering",
    location: "Kigali",
    year: "2022",
    description:
      "Structural and MEP engineering works for Kigali's flagship innovation hub, supporting Africa's growing tech ecosystem.",
    images: [
      "/assets/projects/norrsken-1.jpg",
      "/assets/projects/norrsken-2.jpg",
    ],
    link: "/projects/norrsken-house",
    featured: false,
  },
];

export default featuredProjects;