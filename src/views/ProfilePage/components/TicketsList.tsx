import { useState } from "react";

import type { TicketsFilter } from "../../../features/tickets/types";
import { useTicketsQuery } from "../../../features/tickets/ticketsQueries";
import { openModal } from "../../../utils/modals/modalActions";

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

  return (
    <section className="flex w-full min-w-0 flex-col gap-6 text-white">
      <div>
        <h2 className="text-xl font-bold">My Tickets</h2>
        <p className="mt-1 text-sm text-muted">
          Manage your bookings and view your tickets.
        </p>
      </div>

      <div className="flex w-full min-w-0 gap-6 overflow-x-auto border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors ${
              activeTab === tab.value
                ? "border-danger text-white"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isPending ? (
        <p className="py-10 text-center text-sm text-muted">
          Loading tickets...
        </p>
      ) : isError ? (
        <div className="py-10 text-center">
          <p className="text-sm text-danger">Could not load your tickets.</p>
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
          {activeTab === "upcoming"
            ? "You don't have any upcoming tickets."
            : "You don't have any past tickets."}
        </p>
      ) : (
        <div className="flex w-full min-w-0 flex-col gap-4">
          {tickets.map((order) => {
            return (
              <article
                key={order.id}
                className="flex w-full min-w-0 gap-4 overflow-hidden rounded-2xl border border-white/10 bg-background-tint p-3 sm:p-4"
              >
                <img
                  src={order.session.movie.posterUrl}
                  alt={order.session.movie.title}
                  className="h-32 w-20 shrink-0 rounded-xl object-cover sm:h-36 sm:w-24"
                />

                <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                  <h3 className="max-w-full break-words font-bold">
                    {order.session.movie.title}
                  </h3>

                  <p className="max-w-full break-words text-sm text-muted">
                    {order.session.date} · {order.session.time}
                  </p>

                  <p className="max-w-full break-words text-sm text-muted">
                    {order.session.venue.name} · Hall {order.session.hall.name}
                  </p>

                  <p className="max-w-full break-words text-sm text-muted">
                    Seats:{" "}
                    {order.tickets.map((ticket) => ticket.seatCode).join(", ")}
                  </p>

                  <p className="text-sm font-semibold">
                    ₾{order.totalPrice.toFixed(2)}
                  </p>

                  <p className="max-w-full break-all text-xs text-muted">
                    Booking reference: {order.reference}
                  </p>

                  {order.refundedAt && (
                    <span className="text-xs font-semibold text-warning">
                      Refunded
                    </span>
                  )}

                  {activeTab === "upcoming" && (
                    <button
                      type="button"
                      disabled={!order.isRefundable}
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
                      className="mt-2 w-fit rounded-full border border-danger px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-danger disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Refund
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TicketsList;
