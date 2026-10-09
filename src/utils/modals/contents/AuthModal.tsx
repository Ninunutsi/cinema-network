import { useCallback, useEffect, useRef, useState } from "react";
import type { ModalComponentProps } from "../ModalRegistry";
import type { AuthMode } from "../../../types/auth.types";
import { clearPendingAuthAction, runPendingAuthAction } from "../../auth-guard";
import { LoginForm } from "../../../forms/LoginForm";
import AuthHeader from "../../../components/atoms/AuthHeader";
import { SignUpForm } from "../../../forms/SignUpForm";
import { openModal } from "../modalActions";

interface AuthModalProps extends ModalComponentProps {
  mode?: AuthMode;
}

export default function AuthModal({
  mode: initialMode = "login",
  onClose,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const mountedRef = useRef(false);
  const completedRef = useRef(false);
  const keepPendingActionRef = useRef(false);

  const handleSuccess = useCallback(() => {
    completedRef.current = true;

    onClose();
    // Replays whatever the user was trying to do before being asked to log in.
    runPendingAuthAction();
  }, [onClose]);

  const switchMode = useCallback(
    (next: AuthMode) => {
      // Keep the queued protected action alive across the switch
      keepPendingActionRef.current = true;
      onClose();
      openModal("AuthModal", { mode: next });
    },
    [onClose],
  );

  // If the modal is dismissed without authenticating, drop the queued action so
  // it can't fire on some later, unrelated login. The microtask keeps this safe
  // under React StrictMode's mount -> unmount -> mount cycle in development.
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      queueMicrotask(() => {
        if (!mountedRef.current && !completedRef.current) {
          clearPendingAuthAction();
        }
      });
    };
  }, []);

  return (
    <div className="w-100.75 max-h-[85vh] overflow-y-auto">
      <AuthHeader type={mode === "login" ? "Log in" : "Sign up"} />

      <div className="mt-6">
        {mode === "login" ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignUp={() => setMode("signup")}
            // onSwitchToSignUp={() => setMode("signup")}
          />
        ) : (
          <SignUpForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setMode("login")}
            // onSwitchToLogin={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
}
