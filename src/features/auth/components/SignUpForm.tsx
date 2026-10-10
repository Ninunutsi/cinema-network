import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSignUpMutation } from "../../../api/queries/auth-queries";
import { signUpSchema, type SignUpFormValues } from "../auth.schemas";
import {
  applyAuthError,
  SIGN_UP_ERROR_OPTIONS,
  toSignUpPayload,
} from "../utils/auth.utils";
import { AvatarUpload } from "../../../components/molecules/AvatarUpload";
import { AUTH_INPUT_CLASSNAME } from "../auth.constants";
import { Input } from "../../../components/atoms/Input";
import { PasswordInput } from "../../../components/atoms/PasswordInput";
import { Button } from "../../../components/ui/button";
import { AuthFormFooter } from "../../../components/atoms/AuthFormFooter";

interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function SignUpForm({ onSuccess, onSwitchToLogin }: SignUpFormProps) {
  const signUp = useSignUpMutation();

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      avatar: undefined,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: SignUpFormValues) => {
    clearErrors("root.serverError");
    try {
      await signUp.mutateAsync(toSignUpPayload(values));
      onSuccess();
    } catch (error) {
      // Duplicate username/email etc. land on the specific field.
      applyAuthError(error, setError, SIGN_UP_ERROR_OPTIONS);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 px-0.5"
    >
      <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
          <AvatarUpload
            value={field.value}
            onChange={(file) => {
              field.onChange(file);
              void trigger("avatar");
            }}
            error={errors.avatar?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <Input
        info="Username"
        autoComplete="username"
        placeholder="Choose a username"
        className={AUTH_INPUT_CLASSNAME}
        error={errors.username?.message}
        {...register("username")}
      />

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
        autoComplete="new-password"
        placeholder="Create a password"
        className={AUTH_INPUT_CLASSNAME}
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        info="Confirm password"
        autoComplete="new-password"
        placeholder="Repeat your password"
        className={AUTH_INPUT_CLASSNAME}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
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
          {isSubmitting ? "Signing Up…" : "Sign Up"}
        </Button>

        <AuthFormFooter
          prompt="Already have an account?"
          actionLabel="Log In"
          onAction={onSwitchToLogin}
        />
      </div>
    </form>
  );
}
