import { useCallback } from "react";
import type { ModalComponentProps } from "../ModalRegistry";
import type { AuthMode } from "../../../features/auth/types/types";
import { openModal } from "../modalActions";
import AuthHeader from "../../../components/atoms/AuthHeader";
import { LoginForm } from "../../../features/auth/components/LoginForm";
import { SignUpForm } from "../../../features/auth/components/SignUpForm";

interface AuthModalProps extends ModalComponentProps {
  mode?: AuthMode;
}

export default function AuthModal({ mode = "login", onClose }: AuthModalProps) {
  const switchTo = useCallback(
    (next: AuthMode) => {
      openModal("AuthModal", { mode: next });
      onClose();
    },
    [onClose],
  );

  return (
    <div className="w-100.75 max-h-[85vh] overflow-y-auto">
      <AuthHeader type={mode === "login" ? "Log in" : "Sign up"} />

      <div className="mt-6">
        {mode === "login" ? (
          <LoginForm
            onSuccess={onClose}
            onSwitchToSignUp={() => switchTo("signup")}
          />
        ) : (
          <SignUpForm
            onSuccess={onClose}
            onSwitchToLogin={() => switchTo("login")}
          />
        )}
      </div>
    </div>
  );
}
