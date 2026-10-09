interface AuthFormFooterProps {
  prompt: string;
  actionLabel: string;
  onAction: () => void;
}

export function AuthFormFooter({
  prompt,
  actionLabel,
  onAction,
}: AuthFormFooterProps) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {prompt}{" "}
      <button
        type="button"
        onClick={onAction}
        className="cursor-pointer font-bold text-white hover:underline"
      >
        {actionLabel}
      </button>
    </p>
  );
}
