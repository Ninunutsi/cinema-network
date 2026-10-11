import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../authQueries";
import { loginSchema, type LoginFormValues } from "../auth.schemas";
import { applyAuthError, LOGIN_ERROR_OPTIONS } from "../utils/auth.utils";
import { AUTH_INPUT_CLASSNAME } from "../auth.constants";
import { Input } from "../../../components/atoms/Input";
import { PasswordInput } from "../../../components/atoms/PasswordInput";
import { Button } from "../../../components/ui/button";
import { AuthFormFooter } from "../../../components/atoms/AuthFormFooter";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignUp }: LoginFormProps) {
  const login = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const isFieldValid = (field: keyof LoginFormValues) =>
    Boolean(touchedFields[field] && dirtyFields[field] && !errors[field]);

  const onSubmit = async (values: LoginFormValues) => {
    clearErrors("root.serverError");
    try {
      await login.mutateAsync(values);
      onSuccess();
    } catch (error) {
      applyAuthError(error, setError, LOGIN_ERROR_OPTIONS);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 px-0.5"
    >
      <Input
        info="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        className={AUTH_INPUT_CLASSNAME}
        error={errors.email?.message}
        valid={isFieldValid("email")}
        {...register("email")}
      />

      <PasswordInput
        info="Password"
        autoComplete="current-password"
        placeholder="Enter your password"
        className={AUTH_INPUT_CLASSNAME}
        valid={isFieldValid("password")}
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
          {isSubmitting ? "Logging In…" : "Log In"}
        </Button>

        <AuthFormFooter
          prompt="Don't have an account?"
          actionLabel="Sign Up"
          onAction={onSwitchToSignUp}
        />
      </div>
    </form>
  );
}
