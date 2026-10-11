import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useCurrentUserQuery } from "../../../../../features/auth/authQueries";
import { releaseSeatHold } from "../../../../../features/booking/bookingApi";

import type {
  BookingErrorResponse,
  HoldConflictResponse,
  Order,
  SeatHold,
  TicketType,
} from "../../../../../features/booking/booking.types";

import type {
  SessionSeatMap,
  SessionTicketType,
} from "../../../../../features/sessions/sessions.types";
import { useMountEffect } from "../../../../../hooks/useMountEffect";
import type { BuyStep } from "../buy-tickets.types";
import {
  createTicketOptions,
  getErrorMessage,
  markSeatsSold,
} from "../buy-ticket.utils";
import {
  mapServerErrors,
  toCreateOrderRequest,
  type CheckoutField,
  type CheckoutFieldErrors,
  type CheckoutFormValues,
} from "../checkout.schemas";
import { useSelectedSeats } from "./useSelectedSeats";
import {
  sessionKeys,
  useSessionFilterOptionsQuery,
  useSessionQuery,
  useSessionSeatMapQuery,
} from "../../../../../features/sessions/sessionsQueries";
import {
  useCreateOrderMutation,
  useCreateSeatHoldMutation,
} from "../../../../../features/booking/bookingQueries";
import { MAX_SEATS, useSeatStore } from "../../../../../store/SeatStore";
import { ticketKeys } from "../../../../../features/tickets/ticketsQueries";

const NO_TICKET_TYPES: SessionTicketType[] = [];
const HOLD_GONE_STATUSES = [404, 410];

const MESSAGES = {
  holdExpired: "Your hold time expired. Please re-select your seats.",
  holdFailed: "Could not hold your seats. Please try again.",
  paymentFailed: "Payment failed. Please try again.",
  underAge: "You do not meet the age requirement for this movie.",
  limitReached: `You can select up to ${MAX_SEATS} seats per order.`,
};

const describeLostSeats = (codes: string[]) =>
  codes.length > 1
    ? `Seats ${codes.join(", ")} were just taken by someone else.`
    : `Seat ${codes[0]} was just taken by someone else.`;

export const useBuyTicketFlow = (sessionId: number) => {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUserQuery();

  const sessionQuery = useSessionQuery(sessionId);
  const seatMapQuery = useSessionSeatMapQuery(sessionId);
  const filterOptionsQuery = useSessionFilterOptionsQuery();

  const session = sessionQuery.data;
  const seatMap = seatMapQuery.data;
  const ticketTypes = filterOptionsQuery.data?.ticketTypes ?? NO_TICKET_TYPES;
  const movieMinAge = session?.movie.ageRating.minAge ?? 0;

  const limitReached = useSeatStore((state) => state.limitReached);
  const setTicketType = useSeatStore((state) => state.setTicketType);
  const removeSeats = useSeatStore((state) => state.removeSeats);
  const resetSeats = useSeatStore((state) => state.reset);

  const { seats, subtotal } = useSelectedSeats({
    seatMap,
    ticketTypes,
    basePrice: session?.price ?? 0,
    movieMinAge,
  });

  const [step, setStep] = useState<BuyStep>("seats");
  const [hold, setHold] = useState<SeatHold | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});

  const holdRef = useRef<SeatHold | null>(null);
  const updateHold = (next: SeatHold | null) => {
    holdRef.current = next;
    setHold(next);
  };

  const createHold = useCreateSeatHoldMutation(sessionId);
  const createOrder = useCreateOrderMutation();

  const isUnderAge = user?.age != null && user.age < movieMinAge;
  const canProceed =
    seats.length > 0 &&
    seats.every((seat) => !seat.issue) &&
    !isUnderAge &&
    !createHold.isPending;

  const invalidateSeatMap = () =>
    queryClient.invalidateQueries({ queryKey: sessionKeys.seatMap(sessionId) });

  useMountEffect(() => () => {
    const liveHold = holdRef.current;
    if (liveHold) releaseSeatHold(liveHold.holdId).catch(() => undefined);
    resetSeats();
  });

  const expireHold = () => {
    updateHold(null);
    resetSeats();
    setFieldErrors({});
    setStep("seats");
    setNotice(MESSAGES.holdExpired);
    invalidateSeatMap();
  };

  const handleHoldError = (error: unknown) => {
    if (
      isAxiosError<HoldConflictResponse>(error) &&
      error.response?.status === 409
    ) {
      const lostCodes = error.response.data?.contested ?? [];
      const lostIds = seats
        .filter((seat) => lostCodes.includes(seat.code))
        .map((seat) => seat.seatId);

      setNotice(describeLostSeats(lostCodes));
      removeSeats(lostIds);
      queryClient.setQueryData<SessionSeatMap>(
        sessionKeys.seatMap(sessionId),
        (current) => (current ? markSeatsSold(current, lostCodes) : current),
      );
      invalidateSeatMap();
      return;
    }

    setNotice(getErrorMessage(error, MESSAGES.holdFailed));
  };

  const proceedToCheckout = () => {
    if (!canProceed) return;

    createHold.mutate(
      {
        seats: seats.map((seat) => ({
          seatId: seat.seatId,
          ticketType: seat.ticketType,
        })),
      },
      {
        onSuccess: ({ data }) => {
          setNotice(null);
          updateHold(data);
          setStep("checkout");
        },
        onError: handleHoldError,
      },
    );
  };

  const backToSeats = () => {
    if (holdRef.current) {
      releaseSeatHold(holdRef.current.holdId).catch(() => undefined);
    }
    updateHold(null);
    setFieldErrors({});
    setNotice(null);
    setStep("seats");
  };

  const handleOrderError = (error: unknown) => {
    if (!isAxiosError<BookingErrorResponse>(error)) {
      setNotice(MESSAGES.paymentFailed);
      return;
    }

    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 422 && data?.errors) {
      setFieldErrors(mapServerErrors(data.errors));
    } else if (status !== undefined && HOLD_GONE_STATUSES.includes(status)) {
      expireHold();
    } else {
      setNotice(data?.message ?? MESSAGES.paymentFailed);
    }
  };

  const pay = (values: CheckoutFormValues) => {
    if (!hold || createOrder.isPending) return;

    setNotice(null);
    setFieldErrors({});

    createOrder.mutate(toCreateOrderRequest(hold.holdId, values), {
      onSuccess: ({ data }) => {
        updateHold(null);
        resetSeats();
        setOrder(data);
        queryClient.invalidateQueries({ queryKey: sessionKeys.all });
        queryClient.invalidateQueries({ queryKey: ticketKeys.all });
      },
      onError: handleOrderError,
    });
  };

  const clearFieldError = (field: CheckoutField) =>
    setFieldErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );

  const visibleNotice =
    notice ??
    (isUnderAge ? MESSAGES.underAge : null) ??
    (limitReached ? MESSAGES.limitReached : null);

  return {
    session,
    seatMap,
    isLoading:
      sessionQuery.isPending ||
      seatMapQuery.isPending ||
      filterOptionsQuery.isPending,
    isError:
      sessionQuery.isError ||
      seatMapQuery.isError ||
      filterOptionsQuery.isError,

    step,
    hold,
    order,
    notice: visibleNotice,
    fieldErrors,

    seats,
    subtotal: hold?.subtotal ?? subtotal,
    ticketOptions: createTicketOptions(ticketTypes),
    canProceed,
    isHolding: createHold.isPending,
    isPaying: createOrder.isPending,

    actions: {
      setTicketType: (seatId: number, type: TicketType) =>
        setTicketType(seatId, type),
      removeSeat: (seatId: number) => removeSeats([seatId]),
      proceedToCheckout,
      backToSeats,
      pay,
      clearFieldError,
      dismissNotice: () => setNotice(null),
      expireHold,
    },
  };
};
