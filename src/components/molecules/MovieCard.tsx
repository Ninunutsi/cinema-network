import { Badge } from "../ui/badge";
import Notify from "../../assets/notify.svg?react";
import { Button } from "../ui/button";

interface BaseMovieData {
  title: string;
  genre: string;
  duration: string;
  ageRating: string;
  image: string;
}

export type SmallMovieData = BaseMovieData;

export interface MediumMovieData extends BaseMovieData {
  releaseDate: string;
}

export interface LargeMovieData extends BaseMovieData {
  price: string;
  synopsis: string;
}

export type MovieCardData = SmallMovieData | MediumMovieData | LargeMovieData;

type MovieCardProps =
  | {
      variant: "small";
      movie: SmallMovieData;
    }
  | {
      variant: "medium";
      movie: MediumMovieData;
      onNotify: () => void;
    }
  | {
      variant?: "large"; // default
      movie: LargeMovieData;
      onBuyTicket: () => void;
    };

const MovieCard = (props: MovieCardProps) => {
  if (props.variant === "small") {
    const { movie } = props;

    return (
      <div className="flex h-21.75 w-82.25 gap-3 rounded-2xl bg-background-tint p-2.5">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-21.75 shrink-0 rounded-lg object-cover"
        />

        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate font-sans text-sm font-extrabold leading-none tracking-normal text-white">
            {movie.title}
          </h3>

          <p className="font-sans text-xs font-normal leading-[130%] tracking-normal text-muted">
            {movie.genre} · {movie.duration}
          </p>

          <Badge className="w-fit bg-danger-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none tracking-normal text-danger">
            {movie.ageRating}
          </Badge>
        </div>
      </div>
    );
  }

  if (props.variant === "medium") {
    const { movie, onNotify } = props;

    return (
      <div className="flex h-40 w-117.5 gap-3 rounded-2xl bg-background-tint p-3.5">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-34 shrink-0 rounded-lg object-cover"
        />

        <div className="flex min-w-0 flex-col gap-2">
          <p className="font-sans text-xs font-semibold leading-none tracking-normal text-danger">
            {movie.releaseDate}
          </p>

          <h3 className="truncate font-sans text-lg font-extrabold leading-none tracking-normal text-white">
            {movie.title}
          </h3>

          <p className="font-sans text-sm font-normal leading-[130%] tracking-normal text-muted">
            {movie.genre} · {movie.duration}
          </p>

          <Badge className="w-fit bg-danger-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none tracking-normal text-danger">
            {movie.ageRating}
          </Badge>

          <Button
            variant="outline"
            onClick={onNotify}
            className="h-auto w-fit cursor-pointer rounded-full bg-transparent px-2.5 py-1.5 text-xs text-white hover:bg-transparent"
          >
            <Notify />
            Notify Me
          </Button>
        </div>
      </div>
    );
  }

  // large (default)
  const { movie, onBuyTicket } = props;

  return (
    <div className="group flex h-113 w-65 shrink-0 flex-col gap-3 overflow-hidden rounded-2xl bg-background-tint p-3.5 transition-[width] duration-500 ease-out hover:w-112">
      {/* Poster */}
      <div className="h-75 w-full shrink-0 overflow-hidden rounded-lg transition-[height] duration-300 ease-out group-hover:h-56">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Movie information */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex gap-1.75 flex-col">
          <h3 className="truncate font-sans text-xl font-extrabold leading-none text-white">
            {movie.title}
          </h3>

          <p
            title={movie.genre}
            className="truncate font-sans text-sm font-normal leading-[130%] text-muted"
          >
            {movie.genre} · {movie.duration}
          </p>

          <Badge className="w-fit bg-danger-tint px-3 py-1.5 font-sans text-xs font-semibold leading-none text-danger">
            {movie.ageRating}
          </Badge>
        </div>

        {/* Synopsis appears on hover */}
        <div className="invisible h-0 overflow-hidden opacity-0 transition-[opacity,visibility] duration-300 ease-in-out group-hover:visible group-hover:mt-2 group-hover:h-auto group-hover:opacity-100 group-hover:delay-200">
          <p className="line-clamp-3 pt-1 text-sm leading-[130%] text-muted">
            {movie.synopsis}
          </p>
        </div>

        {/* Price and action */}
        <div className="flex shrink-0 items-center justify-between gap-2 mt-2">
          <p className="whitespace-nowrap font-sans text-sm font-extrabold leading-none text-white">
            From {movie.price}
          </p>

          <Button
            onClick={onBuyTicket}
            className="h-8.75 w-29.75 shrink-0 cursor-pointer rounded-full bg-danger px-5.5 py-2.5 font-sans text-sm font-extrabold leading-none text-white hover:bg-danger"
          >
            Buy ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
