import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schemas";
import { authApi } from "../utils/auth";
import { applyAuthError } from "../utils/auth.utils";
import { AUTH_INPUT_CLASSNAME } from "../constants/auth.constants";
import { Input } from "../components/atoms/Input";
import { PasswordInput } from "../components/atoms/PasswordInput";
import { Button } from "../components/ui/button";
import { AuthFormFooter } from "../components/atoms/AuthFormFooter";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignUp }: LoginFormProps) {
  const setSession = useAuthStore((s) => s.setSession);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearErrors("root.serverError");
    try {
      setSession(await authApi.login(values));
      onSuccess();
    } catch (error) {
      applyAuthError(error, setError);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6 p-0.5"
    >
      <Input
        info="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        className={AUTH_INPUT_CLASSNAME}
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        info="Password"
        autoComplete="current-password"
        placeholder="Enter your password"
        className={AUTH_INPUT_CLASSNAME}
        error={errors.password?.message}
        {...register("password")}
      />

      {errors.root?.serverError && (
        <p role="alert" className="text-center text-sm text-danger">
          {errors.root.serverError.message}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full cursor-pointer rounded-full bg-danger font-sans text-sm font-extrabold text-white hover:bg-danger"
        >
          {isSubmitting ? "Logging in…" : "Log in"}
        </Button>

        <AuthFormFooter
          prompt="Don't have an account?"
          actionLabel="Create account"
          onAction={onSwitchToSignUp}
        />
      </div>
    </form>
  );
}
