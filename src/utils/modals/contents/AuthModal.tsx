import type { ModalComponentProps } from "../ModalRegistry";
import type { AuthMode } from "../../../features/auth/types";
import { switchTopModal } from "../modalActions";
import AuthHeader from "../../../components/atoms/AuthHeader";
import { LoginForm } from "../../../features/auth/components/LoginForm";
import { SignUpForm } from "../../../features/auth/components/SignUpForm";

interface AuthModalProps extends ModalComponentProps {
  mode?: AuthMode;
}

export default function AuthModal({ mode = "login", onClose }: AuthModalProps) {
  const switchTo = (next: AuthMode) => {
    if (next === mode) return;

    switchTopModal("AuthModal", { mode: next });
  };

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
          <SignUpForm onSwitchToLogin={() => switchTo("login")} />
        )}
      </div>
    </div>
  );
}
