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
  timeZone: "UTC", // "2026-07-17" is a calendar date, so don't shift it by the viewer's timezone
});

export const formatReleaseDate = (isoDate: string): string =>
  formatter.format(new Date(isoDate));
