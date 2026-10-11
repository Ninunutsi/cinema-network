import { useState } from "react";
import type { TicketsFilter } from "../../../features/tickets/types";
import { useTicketsQuery } from "../../../features/tickets/ticketsQueries";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { openModal } from "../../../utils/modals/modalActions";
import { Button } from "../../../components/ui/button";
import { formatSessionDate } from "../../../features/movies/utils";

const tabs: { label: string; value: TicketsFilter }[] = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
];

const TicketsList = () => {
  const [activeTab, setActiveTab] = useState<TicketsFilter>("upcoming");

  const {
    data: tickets = [],
    isPending,
    isError,
    refetch,
  } = useTicketsQuery(activeTab);

  const { data: upcomingTickets = [] } = useTicketsQuery("upcoming");

  const { data: pastTickets = [] } = useTicketsQuery("past");

  const ticketCounts: Record<TicketsFilter, number> = {
    upcoming: upcomingTickets.length,
    past: pastTickets.length,
  };

  return (
    <section className="flex w-full min-w-0 flex-col gap-6 text-white">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TicketsFilter)}
        className="w-full min-w-0 gap-6"
      >
        <TabsList className="h-auto w-fit max-w-full gap-2 rounded-lg bg-surface p-1.25">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-auto flex-none cursor-pointer gap-2 rounded-md bg-transparent text-sm font-semibold "
            >
              {tab.label}
              <span className="text-xs">{ticketCounts[tab.value]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="w-full min-w-0"
          >
            {activeTab !== tab.value ? null : isPending ? (
              <p className="py-10 text-center text-sm text-muted">
                Loading tickets...
              </p>
            ) : isError ? (
              <div className="py-10 text-center">
                <p className="text-sm text-danger">
                  Could not load your tickets.
                </p>
                <button
                  type="button"
                  onClick={() => void refetch()}
                  className="mt-3 text-sm font-semibold text-white underline"
                >
                  Try again
                </button>
              </div>
            ) : tickets.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted">
                {tab.value === "upcoming"
                  ? "You don't have any upcoming tickets."
                  : "You don't have any past tickets."}
              </p>
            ) : (
              <div className="flex w-full min-w-0 flex-col gap-5">
                {tickets.map((order) => (
                  <article
                    key={order.id}
                    className="flex h-45.75 w-full min-w-0 items-center gap-4.5 overflow-hidden rounded-2xl bg-surface px-7.25"
                  >
                    <img
                      src={order.session.movie.posterUrl}
                      alt={order.session.movie.title}
                      className="h-33 w-25 shrink-0 rounded-xl object-cover sm:h-36 sm:w-24"
                    />

                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex items-center gap-2.5">
                        <h2 className="truncate text-xl font-extrabold leading-none">
                          {order.session.movie.title}
                        </h2>

                        <span className="shrink-0 rounded-full bg-danger/10 px-2.5 py-1.5 text-xs text-danger">
                          {order.session.movie.ageRating.code}
                        </span>

                        <span className="shrink-0 text-xs text-muted">
                          {order.session.movie.runtimeMinutes} min
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold leading-none tracking-[0.06em] text-muted">
                            DATE
                          </span>
                          <span className="text-sm font-semibold leading-none">
                            {formatSessionDate(
                              order.session.date,
                              order.session.time,
                            )}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold leading-none tracking-[0.06em] text-muted">
                            VENUE
                          </span>
                          <span className="text-sm font-semibold leading-none">
                            {order.session.venue.name} · Hall{" "}
                            {order.session.hall.name}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold leading-none tracking-[0.06em] text-muted">
                            FORMAT
                          </span>
                          <span className="text-sm font-semibold leading-none">
                            {order.session.format.name} ·{" "}
                            {order.session.language.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold leading-none tracking-[0.06em] text-muted">
                          SEATS
                        </span>

                        {order.tickets.map((ticket) => (
                          <span
                            key={ticket.id}
                            className="rounded-sm bg-white/10 px-2.5 py-1 text-xs"
                          >
                            {ticket.seatCode} · {ticket.ticketType.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative ml-auto flex w-75 shrink-0 flex-col gap-4 px-6 py-5 before:absolute before:bottom-0 before:left-0 before:top-0 before:border-l before:border-dashed before:border-surface-secondary">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold leading-none tracking-[0.06em] text-muted">
                          ORDER
                        </span>
                        <span className="text-sm font-semibold leading-none">
                          {order.reference}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted">
                          Total paid
                        </span>
                        <span className="text-2xl font-extrabold leading-none">
                          ₾{order.totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <Button
                        disabled={!order.isRefundable || tab.value === "past"}
                        title={
                          order.isRefundable
                            ? "Refund this booking"
                            : "This booking is not eligible for a refund."
                        }
                        onClick={() =>
                          openModal("RefundConfirmationModal", {
                            orderId: order.reference,
                            movieTitle: order.session.movie.title,
                          })
                        }
                        className="h-8.75 w-full cursor-pointer gap-1 rounded-full bg-white/10 px-5.5 py-2.5 text-sm font-extrabold hover:bg-white/20"
                      >
                        Refund
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default TicketsList;
