export type Project = {
  title: string;
  location: string;
  kW?: number;
  /** Path under /public, e.g. "/projects/khurai.jpeg" */
  photo: string;
  description?: string;
};

/**
 * Each entry becomes a card on Home (first 6) + the full grid on /projects.
 * To add a new one: drop the image in public/projects/ and add an entry here.
 */
export const PROJECTS: Project[] = [
  {
    title: "Rooftop Solar Installation",
    location: "Khurai, Madhya Pradesh",
    photo: "/projects/khurai.jpeg",
    description: "Grid-tied rooftop array for a residential property.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Panna, Madhya Pradesh",
    photo: "/projects/panna.jpeg",
    description: "Mono-PERC panels on a galvanized mounting structure.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Panna, Madhya Pradesh",
    photo: "/projects/panna-1.jpeg",
    description: "Multi-row residential rooftop system in Panna town.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Panna, Madhya Pradesh",
    photo: "/projects/panna-2.jpeg",
    description: "Residential install near the Panna lakefront.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Panna, Madhya Pradesh",
    photo: "/projects/panna-3.jpeg",
    description: "Compact rooftop system for a single-family home.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Pawai, Madhya Pradesh",
    photo: "/projects/pawai.jpeg",
    description: "Multi-row panel array for an agricultural homestead.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Damoh, Madhya Pradesh",
    photo: "/projects/damoh.jpeg",
    description: "Rooftop solar with high-efficiency mono-PERC panels.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Damoh, Madhya Pradesh",
    photo: "/projects/damoh-1.jpeg",
    description: "Grid-tied system with seamless DISCOM net-metering.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Damoh, Madhya Pradesh",
    photo: "/projects/damoh-2.jpeg",
    description: "Residential install with branded inverter and warranty.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Hatta, Madhya Pradesh",
    photo: "/projects/hatta.jpeg",
    description: "Custom mounting structure designed for the local roof type.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Hatta, Madhya Pradesh",
    photo: "/projects/hatta-1.jpeg",
    description: "End-to-end install — site survey to commissioning.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Bina, Madhya Pradesh",
    photo: "/projects/bina.jpeg",
    description: "Premium rooftop solar with full-service support.",
  },
];
