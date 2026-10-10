interface MovieDateSelectorProps {
  dates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const formatShowtimeDate = (date: string) => {
  const parsedDate = new Date(`${date}T12:00:00`);

  return {
    day: parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
    }),
    date: parsedDate.getDate(),
  };
};

export const MovieDateSelector = ({
  dates,
  selectedDate,
  onDateChange,
}: MovieDateSelectorProps) => (
  <div className="flex flex-wrap gap-2">
    {dates.slice(0, 7).map((date) => {
      const formatted = formatShowtimeDate(date);
      const isSelected = selectedDate === date;

      return (
        <button
          key={date}
          type="button"
          aria-pressed={isSelected}
          onClick={() => onDateChange(date)}
          className={`flex h-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border px-2.5 py-2.25 transition-[width] duration-300 ${
            isSelected
              ? "w-25 border-danger bg-danger text-white"
              : "w-20 border-background-tint bg-background-tint text-white"
          }`}
        >
          <span className="text-xs font-semibold leading-none">
            {formatted.day}
          </span>
          <span className="text-lg font-extrabold leading-none">
            {formatted.date}
          </span>
        </button>
      );
    })}
  </div>
);
