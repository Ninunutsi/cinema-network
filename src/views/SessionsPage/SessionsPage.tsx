import { SessionFilters } from "./Components/SessionFilters";
import { SessionsList } from "./Components/SessionsList";

const SessionsPage = () => {
  return (
    <main className="px-15 gap-9 flex flex-col">
      <section className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold leading-none tracking-normal text-white">
          Sessions
        </h1>

        <span className="text-sm font-normal leading-[130%] tracking-normal text-muted">
          Browse showtimes across all venues
        </span>
      </section>
      <section className="flex gap-8 ">
        <aside className="w-80 ">
          <SessionFilters />
        </aside>
        <aside className="flex-1">
          <SessionsList />
        </aside>
      </section>
    </main>
  );
};

export default SessionsPage;
