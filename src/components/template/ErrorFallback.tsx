import { Button } from "../ui/button";

interface ErrorFallbackProps {
  error: unknown;
  onRetry?: () => void;
  onClose?: () => void;
}

export const ErrorFallback = ({
  error,
  onRetry,
  onClose,
}: ErrorFallbackProps) => (
  <div className="flex flex-col items-center gap-4 p-10 text-center text-white">
    <h2 className="text-xl font-extrabold">Something went wrong</h2>
    <p className="max-w-md text-sm text-muted">
      {import.meta.env.DEV && error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again."}
    </p>
    <div className="flex gap-3">
      {onRetry && (
        <Button onClick={onRetry} className="cursor-pointer rounded-full">
          Try again
        </Button>
      )}
      {onClose && (
        <Button
          onClick={onClose}
          className="cursor-pointer rounded-full bg-white/10 hover:bg-white/20"
        >
          Close
        </Button>
      )}
    </div>
  </div>
);
