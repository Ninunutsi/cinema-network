import { SessionFilters } from "./Components/SessionFilters";
import { SessionsList } from "./Components/SessionsList";

const SessionsPage = () => {
  return (
    <main className="flex flex gap-8 px-15">
      <aside className="flex w-80 flex-col gap-9">
        <section className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-extrabold leading-none tracking-normal text-white">
            Sessions
          </h1>

          <span className="text-sm font-normal leading-[130%] tracking-normal text-muted">
            Browse showtimes across all venues
          </span>
        </section>

        <SessionFilters />
      </aside>
      <SessionsList />
    </main>
  );
};

export default SessionsPage;
