export type Project = {
  title: string;
  location: string;
  kW?: number;
  /** Path under /public, e.g. "/projects/khurai-rooftop.jpg" */
  photo: string;
  description?: string;
};

/**
 * Drop the photos into public/projects/ and reference them here.
 * Each entry becomes a card on Home (top 6) + the full grid on /projects.
 */
export const PROJECTS: Project[] = [
  {
    title: "Rooftop Solar Installation",
    location: "Khurai, Madhya Pradesh",
    photo: "/projects/khurai-1.jpg",
    description: "Grid-tied rooftop array for a residential property.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Panna, Madhya Pradesh",
    photo: "/projects/panna-1.jpg",
    description: "Mounted-frame rooftop system with mono-PERC panels.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Panna, Madhya Pradesh",
    photo: "/projects/panna-2.jpg",
    description: "Residential rooftop installation near the Panna lakefront.",
  },
  {
    title: "Rooftop Solar Installation",
    location: "Pawai, Madhya Pradesh",
    photo: "/projects/pawai-1.jpg",
    description: "Multi-row panel array for an agricultural homestead.",
  },
];
