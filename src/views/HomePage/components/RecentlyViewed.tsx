import { Link } from "react-router-dom";
import MovieSection from "../../../components/molecules/MovieSection";
import MovieCard from "../../../components/molecules/MovieCard";
import { useRecentlyViewed } from "../useRecentlyViewed";

const RecentlyViewed = () => {
  const { movies } = useRecentlyViewed();

  if (movies.length === 0) return null;

  return (
    <MovieSection title="Recently viewed" showlink={false}>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.slug}`}
            className="shrink-0"
            aria-label={`View details for ${movie.title}`}
          >
            <MovieCard variant="small" movie={movie} />
          </Link>
        ))}
      </div>
    </MovieSection>
  );
};

export default RecentlyViewed;
