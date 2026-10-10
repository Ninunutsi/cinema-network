import { cn } from "cn";

interface BaseDateSelectorProps {
  dates: string[];
  className?: string;
  dateClassName?: string;
  selectedClassName?: string;
  unselectedClassName?: string;
  animate?: boolean;
  dateTextClassName?: string;
}

type SingleSelectProps = {
  selectionMode?: "single";
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedDates?: never;
  onDatesChange?: never;
};

type MultiSelectProps = {
  selectionMode: "multiple";
  selectedDates: string[];
  onDatesChange: (dates: string[]) => void;
  selectedDate?: never;
  onDateChange?: never;
};

type MovieDateSelectorProps = BaseDateSelectorProps &
  (SingleSelectProps | MultiSelectProps);

const formatShowtimeDate = (date: string) => {
  const parsedDate = new Date(`${date}T12:00:00`);

  return {
    day: parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
    }),
    date: parsedDate.getDate(),
  };
};

export const MovieDateSelector = (props: MovieDateSelectorProps) => {
  const {
    dates,
    className,
    dateClassName,
    selectedClassName,
    unselectedClassName,
    dateTextClassName,
    animate = true,
  } = props;

  const isMultiple = props.selectionMode === "multiple";

  const isSelected = (date: string) =>
    isMultiple
      ? props.selectedDates.includes(date)
      : props.selectedDate === date;

  const handleDateClick = (date: string) => {
    if (props.selectionMode === "multiple") {
      const selected = props.selectedDates;

      props.onDatesChange(
        selected.includes(date)
          ? selected.filter((item) => item !== date)
          : [...selected, date],
      );
      return;
    }

    props.onDateChange(date);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {dates.slice(0, 7).map((date) => {
        const formatted = formatShowtimeDate(date);
        const selected = isSelected(date);

        return (
          <button
            key={date}
            type="button"
            aria-pressed={selected}
            onClick={() => handleDateClick(date)}
            className={cn(
              "flex h-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border px-2.5 py-2.25",
              animate && "transition-[width] duration-300",
              selected
                ? "w-25 border-danger bg-danger text-white"
                : "w-20 border-background-tint bg-background-tint text-white",
              selected && selectedClassName,
              !selected && unselectedClassName,
              dateClassName,
            )}
          >
            <span className="text-xs leading-none font-semibold">
              {formatted.day}
            </span>
            <span
              className={cn(
                "text-lg leading-none font-extrabold",
                dateTextClassName,
              )}
            >
              {formatted.date}
            </span>
          </button>
        );
      })}
    </div>
  );
};
