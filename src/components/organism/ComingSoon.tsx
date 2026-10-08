import type { MediumMovieData } from "../molecules/MovieCard";
import MovieCard from "../molecules/MovieCard";
import { Button } from "../ui/button";

export const mediumMovies: MediumMovieData[] = [
  {
    title: "Avatar: Fire and Ash",
    genre: "Sci-Fi",
    duration: "3h 12m",
    ageRating: "PG-13",
    image: "https://picsum.photos/seed/avatar/300/400",
    releaseDate: "Dec 19, 2026",
  },
  {
    title: "The Odyssey",
    genre: "Adventure",
    duration: "2h 30m",
    ageRating: "R",
    image: "https://picsum.photos/seed/odyssey/300/400",
    releaseDate: "Jul 17, 2026",
  },
  {
    title: "Toy Story 5",
    genre: "Animation",
    duration: "1h 45m",
    ageRating: "G",
    image: "https://picsum.photos/seed/toystory/300/400",
    releaseDate: "Jun 19, 2026",
  },
];

const ComingSoon = () => {
  return (
    <div className="flex flex-col gap-6 px-17.5">
      <div className="flex items-center justify-between">
        <p className="font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
          COMING SOON...
        </p>
        <Button
          variant="link"
          className="font-sans text-sm font-semibold leading-none tracking-normal text-danger cursor-pointer hover:underline"
        >
          See all
        </Button>
      </div>
      <section className="flex flex-wrap gap-4">
        {mediumMovies.map((movie) => (
          <MovieCard
            key={movie.title}
            variant="medium"
            movie={movie}
            onNotify={() => console.log("Notify:", movie.title)}
          />
        ))}
      </section>
    </div>
  );
};

export default ComingSoon;
