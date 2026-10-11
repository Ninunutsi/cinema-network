export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const formatReleaseDate = (isoDate: string): string =>
  formatter.format(new Date(isoDate));

const sessionDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

export const formatSessionDate = (date: string, time: string): string => {
  const formattedDate = sessionDateFormatter.format(
    new Date(`${date.slice(0, 10)}T00:00:00Z`),
  );

  return `${formattedDate} · ${time.slice(0, 5)}`;
};
