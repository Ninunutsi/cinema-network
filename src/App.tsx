import MovieCard, {
  type LargeMovieData,
  type MediumMovieData,
  type SmallMovieData,
} from "./components/molecules/MovieCard";
import Slider from "./components/organism/Slider";
import { Header } from "./components/template/Header/Header";

// Small: base fields only
export const smallMovies: SmallMovieData[] = [
  {
    title: "Dune: Part Two",
    genre: "Sci-Fi",
    duration: "2h 46m",
    ageRating: "PG-13",
    image: "https://picsum.photos/seed/dune/200/200",
  },
  {
    title: "The Batman",
    genre: "Action",
    duration: "2h 56m",
    ageRating: "PG-13",
    image: "https://picsum.photos/seed/batman/200/200",
  },
  {
    title: "Inside Out 2",
    genre: "Animation",
    duration: "1h 36m",
    ageRating: "PG",
    image: "https://picsum.photos/seed/insideout/200/200",
  },
];

// Medium: base fields + releaseDate
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

// Large: base fields + price + description
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

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Slider />

        <div className="flex flex-col gap-10 p-8">
          <section className="flex flex-wrap gap-4">
            {smallMovies.map((movie) => (
              <MovieCard key={movie.title} variant="small" movie={movie} />
            ))}
          </section>

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
      </main>
    </div>
  );
}

export default App;
