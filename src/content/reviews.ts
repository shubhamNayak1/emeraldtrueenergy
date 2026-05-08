export type Review = {
  clientName: string;
  location?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export const REVIEWS: Review[] = [
  // Add real reviews here when you have them. Example shape:
  // {
  //   clientName: "Ramesh Sharma",
  //   location: "Khurai, MP",
  //   stars: 5,
  //   text: "Smooth install, great team. My monthly bill dropped by 80%.",
  // },
];
