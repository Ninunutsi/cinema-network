import { Timer } from "lucide-react";
import type { MovieDetails } from "../../../features/movies/movies.types";

interface MovieDetailsHeroProps {
  movie: MovieDetails;
}

export const MovieDetailsHero = ({ movie }: MovieDetailsHeroProps) => {
  return (
    <section className="relative mb-8 isolate h-141.75">
      <img
        src={movie.backdropUrl}
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/70 to-background" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      <div className="flex h-full items-end gap-8.5 px-15 pb-15">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="h-93.5 w-72.25 rounded-xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10"
        />

        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center gap-2">
            {movie.isFeatured && (
              <span className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs font-semibold text-danger">
                FEATURED
              </span>
            )}

            {movie.isComingSoon && (
              <span className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs font-semibold text-danger">
                COMING SOON
              </span>
            )}

            {movie.isNotified && (
              <span className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs font-semibold text-danger">
                NOTIFICATIONS ON
              </span>
            )}
          </div>

          <div className="flex flex-col items-start gap-3.5">
            <h1 className="max-w-xl text-[40px] font-extrabold leading-none">
              {movie.title}
            </h1>

            <p className="max-w-xl text-[14px] leading-[130%]">
              {movie.synopsis}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.75">
            <span
              title={movie.ageRating.description}
              className="rounded-full bg-danger/10 px-2.5 py-1.5 text-xs text-danger"
            >
              {movie.ageRating.code}
            </span>

            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 text-xs">
              <Timer size={14} />
              {movie.runtimeMinutes} min
            </span>

            {movie.formats.map((format) => (
              <span
                key={format.id}
                className="rounded-full bg-white/10 px-2.5 py-1.5 text-xs"
              >
                {format.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
