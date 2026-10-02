export type Project = {
  title: string;
  location: string;
  kW?: number;
  /** Path under /public, e.g. "/projects/khurai.webp" */
  photo: string;
  description?: string;
};

/**
 * ⚠️ The `kW` values below are approximate placeholders based on the look of
 * each install — the owner should replace them with the actual system size
 * from job records when known. The site displays whatever is here as fact.
 *
 * To add a new project: drop the WebP image in public/projects/ and add an
 * entry here. Keep titles varied (not all "Rooftop Solar Installation") to
 * improve SEO and visual interest.
 */
export const PROJECTS: Project[] = [
  {
    title: "5 kW grid-tied rooftop system",
    location: "Khurai, Madhya Pradesh",
    kW: 5,
    photo: "/projects/khurai.webp",
    description: "On-grid residential installation with mono-PERC panels.",
  },
  {
    title: "3 kW rooftop solar system",
    location: "Panna, Madhya Pradesh",
    kW: 3,
    photo: "/projects/panna.webp",
    description: "Mono-PERC panels on a galvanized mounting structure.",
  },
  {
    title: "4 kW multi-row rooftop install",
    location: "Panna, Madhya Pradesh",
    kW: 4,
    photo: "/projects/panna-1.webp",
    description: "Multi-row residential rooftop system in Panna town.",
  },
  {
    title: "3 kW rooftop array · lakefront",
    location: "Panna, Madhya Pradesh",
    kW: 3,
    photo: "/projects/panna-2.webp",
    description: "Residential install near the Panna lakefront.",
  },
  {
    title: "2 kW compact rooftop system",
    location: "Panna, Madhya Pradesh",
    kW: 2,
    photo: "/projects/panna-3.webp",
    description: "Compact rooftop system for a single-family home.",
  },
  {
    title: "5 kW rooftop solar · farm home",
    location: "Pawai, Madhya Pradesh",
    kW: 5,
    photo: "/projects/pawai.webp",
    description: "Multi-row panel array for an agricultural homestead.",
  },
  {
    title: "7 kW on-grid rooftop array",
    location: "Damoh, Madhya Pradesh",
    kW: 7,
    photo: "/projects/damoh.webp",
    description: "High-capacity rooftop system with mono-PERC panels.",
  },
  {
    title: "3 kW grid-tied residential install",
    location: "Damoh, Madhya Pradesh",
    kW: 3,
    photo: "/projects/damoh-1.webp",
    description: "Grid-tied system with full DISCOM net-metering coordination.",
  },
  {
    title: "3 kW rooftop solar install",
    location: "Damoh, Madhya Pradesh",
    kW: 3,
    photo: "/projects/damoh-2.webp",
    description: "Residential install with branded inverter and warranty.",
  },
  {
    title: "4 kW rooftop system · custom mount",
    location: "Hatta, Madhya Pradesh",
    kW: 4,
    photo: "/projects/hatta.webp",
    description: "Custom mounting structure designed for the local roof type.",
  },
  {
    title: "5 kW rooftop solar array",
    location: "Hatta, Madhya Pradesh",
    kW: 5,
    photo: "/projects/hatta-1.webp",
    description: "End-to-end install — site survey through commissioning.",
  },
  {
    title: "3 kW rooftop solar install",
    location: "Bina, Madhya Pradesh",
    kW: 3,
    photo: "/projects/bina.webp",
    description: "Premium rooftop solar with full-service support.",
  },
];
