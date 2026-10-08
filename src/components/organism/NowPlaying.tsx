import type { LargeMovieData } from "../molecules/MovieCard";
import MovieCard from "../molecules/MovieCard";
import { Button } from "../ui/button";

export const largeMovies: LargeMovieData[] = [
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: "2h 49m",
    ageRating: "PG-13",
    image: "https://picsum.photos/seed/interstellar/500/600",
    price: "$12",
    description:
      "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable.",
  },
  {
    title: "Oppenheimer",
    genre: "Drama",
    duration: "3h 00m",
    ageRating: "R",
    image: "https://picsum.photos/seed/oppenheimer/500/600",
    price: "$14",
    description:
      "The story of J. Robert Oppenheimer and his role in developing the atomic bomb during World War II, and the consequences that followed.",
  },
  {
    title: "Spider-Verse",
    genre: "Animation",
    duration: "2h 20m",
    ageRating: "PG",
    image: "https://picsum.photos/seed/spiderverse/500/600",
    price: "$10",
    description:
      "Miles Morales returns for an epic adventure across the multiverse, where he meets a team of Spider-People charged with protecting its very existence.",
  },
  {
    title: "Parasite",
    genre: "Thriller",
    duration: "2h 12m",
    ageRating: "R",
    image: "https://picsum.photos/seed/parasite/500/600",
    price: "$11",
    description:
      "Greed and class discrimination threaten the newly formed relationship between the wealthy Park family and the destitute Kim clan.",
  },
];

const NowPlaying = () => {
  return (
    <div className="flex flex-col gap-6 px-17.5">
      <div className="flex items-center justify-between">
        <p className="font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
          Now Playing
        </p>
        <Button
          variant="link"
          className="font-sans text-sm font-semibold leading-none tracking-normal text-danger cursor-pointer hover:underline"
        >
          See all
        </Button>
      </div>
      <section className="flex gap-4 overflow-x-auto">
        {largeMovies.map((movie) => (
          <MovieCard
            key={movie.title}
            movie={movie}
            onBuyTicket={() => console.log("Buy:", movie.title)}
          />
        ))}
      </section>
    </div>
  );
};

export default NowPlaying;
