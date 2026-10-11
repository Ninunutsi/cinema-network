import type { ComponentProps } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "cn";

type InputProps = ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  info?: string;
  helperText?: string;
  error?: string;
  valid?: boolean;
  infoClassName?: string;
};

export const Input = ({
  className,
  startIcon,
  endIcon,
  info,
  helperText,
  infoClassName,
  error,
  valid,
  ...props
}: InputProps) => {
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);
  const message = error ?? helperText;
  const showValid = Boolean(valid) && !error;

  return (
    <div className="w-full">
      {info && (
        <p
          className={cn(
            "mb-2 text-xs font-semibold leading-none tracking-wide text-muted",
            infoClassName,
          )}
        >
          {info}
        </p>
      )}

      <div className="relative">
        {startIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {startIcon}
          </span>
        )}

        <ShadcnInput
          {...props}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-10 w-full rounded-full border-none bg-transparent shadow-none outline-none",
            "autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_var(--color-background)] autofill:[-webkit-text-fill-color:var(--color-foreground)]",
            "aria-invalid:border-none aria-invalid:ring-1 aria-invalid:ring-danger",
            "focus:border-none focus:outline-none",
            "focus-visible:border-none focus-visible:outline-none focus-visible:ring-0",
            showValid && "ring-1 ring-green-500 focus-visible:ring-1",
            hasStartIcon && "pl-10",
            hasEndIcon && "pr-10",
            className,
          )}
        />

        {endIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
            {endIcon}
          </span>
        )}
      </div>

      {message && (
        <p
          className={cn(
            "mt-0.5 text-xs font-semibold",
            error ? "text-danger" : "text-muted",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};
