import { MovieDetailItem } from "@/components/atoms/MovieDetailItem";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import type { MovieDetails } from "@/features/movies/movies.types";

interface MovieDetailsSidebarProps {
  movie: MovieDetails;
}

export const MovieDetailsSidebar = ({ movie }: MovieDetailsSidebarProps) => {
  return (
    <aside className="flex flex-col gap-6">
      <section className="flex w-110.25 flex-col gap-4.25 rounded-xl px-6.5">
        <h2 className="text-[20px] font-extrabold leading-[100%] tracking-normal">
          Details
        </h2>

        <dl className="flex flex-col gap-4 text-sm">
          <MovieDetailItem label="DIRECTOR" value={movie.director} />

          <MovieDetailItem label="MAIN CAST" value={movie.cast} />

          <MovieDetailItem
            label="DURATION"
            value={`${movie.runtimeMinutes} minutes`}
          />

          <MovieDetailItem label="RELEASE DATE" value={movie.releaseDate} />

          <MovieDetailItem
            label="FORMATS"
            value={movie.formats.map((format) => format.name).join(", ")}
          />

          <MovieDetailItem label="FROM" value={`₾${String(movie.fromPrice)}`} />

          <Alert className="h-17.5 rounded-lg bg-warning/10 px-2.25 py-2.75">
            <AlertTitle className="mb-1.75 font-sans text-xs font-semibold leading-none text-warning">
              RATING NOTE
            </AlertTitle>

            <AlertDescription className="flex items-start justify-between gap-1.75 font-sans text-xs font-normal leading-[130%] text-warning">
              <p>{movie.ageRating.code}</p>
              <p>{movie.ageRating.description}</p>
            </AlertDescription>
          </Alert>
        </dl>
      </section>
    </aside>
  );
};
