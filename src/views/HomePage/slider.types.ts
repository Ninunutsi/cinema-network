// export interface SliderData {
//   image: string;
//   badge: string;
//   title: string;
//   ageRating: string;
//   duration: string;
//   format: string;
//   experience: string;
//   description: string;
// }

export interface SliderData {
  id: string;
  image: string;
  badge: string;
  title: string;
  ageRating: string;
  duration: string;
  format: string;
  experience: string;
  description: string;
  ticketsUrl: string;
  sessionsUrl: string;
}

export const sliderData: SliderData[] = [
  {
    id: "movie-1",
    ticketsUrl: "/tickets/movie-1",
    sessionsUrl: "/sessions/movie-1",
    image:
      "https://images.unsplash.com/photo-1596367407372-96cb88503db6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "PREMIERE · WEEK OF 15 SEPT",
    title: "THE ODYSSEY",
    ageRating: "12+",
    duration: "134 Min",
    format: "MAX",
    experience: "PANORAMA",
    description:
      "A king spends ten years finding his way home from a war he already won, while monsters, gods, and his own restlessness make sure the return takes longer than the fighting did.,A king spends ten years finding his way home from a war he already won, while monsters, gods, and his own restlessness make sure the return takes longer than the fighting did.",
  },
  {
    id: "movie-2",
    ticketsUrl: "/tickets/movie-1",
    sessionsUrl: "/sessions/movie-1",
    image:
      "https://images.unsplash.com/photo-1620712815162-1bbfb11ff5bf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "NOW SHOWING",
    title: "THE LAST JOURNEY JOURNEY",
    ageRating: "16+",
    duration: "128 Min",
    format: "IMAX",
    experience: "PANORAMA",
    description:
      "A final journey across an unknown world becomes a fight for survival, where every decision brings the characters closer to the truth.",
  },
  {
    id: "movie-3",
    ticketsUrl: "/tickets/movie-1",
    sessionsUrl: "/sessions/movie-1",
    image:
      "https://images.unsplash.com/photo-1778324793752-e0c663c0ea21?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "COMING SOON",
    title: "BEYOND THE STARS",
    ageRating: "12+",
    duration: "142 Min",
    format: "4DX",
    experience: "DOLBY",
    description:
      "When humanity receives a message from beyond the stars, one crew must travel further than anyone has ever gone to discover who sent it. A final journey across an unknown world becomes A final journey across an unknown world becomes a fight for survival, where every decision brings the characters closer to the truth.a fight for survival, where every decision brings the characters closer to the truth.",
  },
  {
    id: "movie-4",
    ticketsUrl: "/tickets/movie-1",
    sessionsUrl: "/sessions/movie-1",
    image:
      "https://images.unsplash.com/photo-1759848461676-594facbc3700?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "PREMIERE · 22 SEPT",
    title: "THE HIDDEN KINGDOM THE HIDDEN KINGDOM THE HIDDEN KINGDOM",
    ageRating: "12+",
    duration: "118 Min",
    format: "MAX",
    experience: "PANORAMA",
    description:
      "A forgotten kingdom rises again, forcing a young explorer to choose between the world she knows and a secret buried for centuries.",
  },
];
