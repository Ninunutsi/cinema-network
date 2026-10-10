import { useMemo } from "react";
import { param, useUrlState } from "../../../hooks/useUrlState";
import { useSessionFilterOptionsQuery } from "../../../features/sessions/sessionsQueries";
import { FilterCheckboxGroup } from "../../../components/atoms/FilterCheckboxGroup";
import { Separator } from "../../../components/ui/separator";

const sessionFilterSchema = {
  venues: param.strings("venues[]"),
  formats: param.strings("formats[]"),
  languages: param.strings("languages[]"),
  timeBands: param.strings("timeBands[]"),
};

export const SessionFilters = () => {
  const { data, isPending, isError, refetch } = useSessionFilterOptionsQuery();

  const { values, toggle, setMany, activeCount } =
    useUrlState(sessionFilterSchema);

  const availableFormats = useMemo(() => {
    if (!data || values.venues.length === 0) {
      return data?.formats ?? [];
    }

    const allowedSlugs = new Set(
      data.venues
        .filter((venue) => values.venues.includes(venue.slug))
        .flatMap((venue) => venue.formats.map((format) => format.slug)),
    );

    return data.formats.filter((format) => allowedSlugs.has(format.slug));
  }, [data, values.venues]);

  const toggleVenue = (slug: string) => {
    if (!data) return;

    const nextVenues = values.venues.includes(slug)
      ? values.venues.filter((venue) => venue !== slug)
      : [...values.venues, slug];

    const allowedFormats = new Set(
      nextVenues.length === 0
        ? data.formats.map((format) => format.slug)
        : data.venues
            .filter((venue) => nextVenues.includes(venue.slug))
            .flatMap((venue) => venue.formats.map((format) => format.slug)),
    );

    setMany({
      venues: nextVenues,
      formats: values.formats.filter((format) => allowedFormats.has(format)),
    });
  };

  if (isPending) {
    return (
      <section className="flex h-[1001px] w-80 items-center justify-center rounded-2xl bg-background-tint p-6">
        <p className="text-sm text-muted">Loading filters...</p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="w-80 rounded-2xl bg-background-tint p-6">
        <p className="text-sm text-muted">Unable to load session filters.</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-3 text-sm text-white underline"
        >
          Try again
        </button>
      </section>
    );
  }

  return (
    <section className="flex h-auto w-80 flex-col gap-6 overflow-y-auto rounded-2xl bg-surface p-6">
      <h3 className="text-[18px] leading-none font-extrabold text-white">
        Filters
      </h3>

      <FilterCheckboxGroup
        title="Venue"
        options={data.venues.map(({ slug, name }) => ({
          id: slug,
          label: name,
        }))}
        selectedValues={values.venues}
        onToggle={(value) => toggleVenue(String(value))}
      />

      <Separator className="bg-background-tint" />

      <FilterCheckboxGroup
        title="Format"
        options={availableFormats.map(({ slug, name }) => ({
          id: slug,
          label: name,
        }))}
        selectedValues={values.formats}
        onToggle={(value) => toggle("formats", String(value))}
      />

      <Separator className="bg-background-tint" />

      <FilterCheckboxGroup
        title="Language"
        options={data.languages.map(({ slug, name }) => ({
          id: slug,
          label: name,
        }))}
        selectedValues={values.languages}
        onToggle={(value) => toggle("languages", String(value))}
      />

      <Separator className="bg-background-tint" />

      <FilterCheckboxGroup
        title="Showtime"
        options={data.timeBands.map(({ id, label }) => ({
          id,
          label,
        }))}
        selectedValues={values.timeBands}
        onToggle={(value) => toggle("timeBands", String(value))}
      />

      <Separator className="bg-background-tint" />

      <p className="text-center text-xs leading-[130%] font-normal text-muted">
        {activeCount} filters active
      </p>
    </section>
  );
};
