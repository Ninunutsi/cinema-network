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
      variant?: "large";
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

  const { movie, onBuyTicket } = props;

  return (
    <div className="group relative flex h-113 w-65 shrink-0 flex-col gap-3 overflow-hidden rounded-2xl bg-background-tint p-3.5 transition-[width] duration-500 ease-out hover:w-112 motion-reduce:transition-none">
      <div className="h-75 w-full shrink-0 overflow-hidden rounded-lg transition-[height] duration-500 ease-out group-hover:h-56 motion-reduce:transition-none">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/*
        pb-11 reserves the footer's space (35px button + 8px gap + 1px spare),
        and overflow-hidden clips anything that overshoots while animating,
        so content can never run underneath the footer.
      */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-11">
        <div className="flex flex-col gap-1.75">
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

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-hover:grid-rows-[1fr] motion-reduce:transition-none">
          <div className="overflow-hidden">
            <p className="line-clamp-3 w-105 pt-3 text-sm leading-[130%] text-muted opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-hover:duration-200 group-hover:delay-200 motion-reduce:transition-none">
              {movie.synopsis}
            </p>
          </div>
        </div>
      </div>

      {/* Pinned to the card's bottom edge: out of the layout flow, fixed height */}
      <div className="absolute inset-x-3.5 bottom-3.5 flex h-8.75 items-center justify-between gap-2">
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
  );
};

export default MovieCard;
