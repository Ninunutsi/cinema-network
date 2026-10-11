import { useState } from "react";
import { isAxiosError } from "axios";
import { CheckCircle2, Ticket } from "lucide-react";

import { useRefundOrderMutation } from "../../../features/tickets/ticketsQueries";

interface RefundConfirmationModalProps {
  onClose: () => void;
  order: string;
  movieTitle: string;
}

const RefundConfirmationModal = ({
  onClose,
  order,
  movieTitle,
}: RefundConfirmationModalProps) => {
  const refundMutation = useRefundOrderMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    setErrorMessage("");

    try {
      await refundMutation.mutateAsync(order);
      onClose();
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      setErrorMessage(
        message ?? "We couldn't process your refund. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl  shadow-2xl  text-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-danger/10">
          <Ticket className="size-6 text-danger" />
        </div>
      </div>

      <h2 className="text-xl font-bold">Cancel your movie plans?</h2>

      <p className="mt-3 break-words text-sm leading-6 text-muted">
        Are you sure you want to refund your booking for{" "}
        <span className="font-semibold text-white">{movieTitle}</span>?
      </p>

      <div className="mt-5 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-muted" />
        <p className="text-sm leading-5 text-muted">
          Your booking will be refunded if the request is accepted. Your tickets
          will no longer be available for this booking.
        </p>
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger"
        >
          {errorMessage}
        </p>
      )}

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          disabled={refundMutation.isPending}
          className="flex-1 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/5 disabled:opacity-40"
        >
          <span className="inline-flex items-center justify-center gap-2">
            Keep ticket
          </span>
        </button>

        <button
          type="button"
          onClick={() => void handleConfirm()}
          disabled={refundMutation.isPending}
          className="flex-1 rounded-full bg-danger px-5 py-3 text-sm font-semibold transition-colors hover:bg-danger/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {refundMutation.isPending ? "Refunding..." : "Yes, refund"}
        </button>
      </div>
    </div>
  );
};

export default RefundConfirmationModal;
