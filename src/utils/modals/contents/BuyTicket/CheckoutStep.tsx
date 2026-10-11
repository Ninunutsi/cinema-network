import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/atoms/Input";
import {
  checkoutSchema,
  digitsOnly,
  formatExpiryInput,
  type CheckoutField,
  type CheckoutFormValues,
} from "./checkout.schemas";

interface CheckoutStepProps {
  defaultValues: Pick<
    CheckoutFormValues,
    "fullName" | "email" | "mobileNumber"
  >;
  errors: Partial<Record<CheckoutField, string>>;
  isPaying: boolean;
  onFieldChange: (field: CheckoutField) => void;
  onSubmit: (values: CheckoutFormValues) => void;
}

const CheckoutStep = ({
  defaultValues,
  errors: serverErrors,
  isPaying,
  onFieldChange,
  onSubmit,
}: CheckoutStepProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ...defaultValues,
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    for (const [field, message] of Object.entries(serverErrors)) {
      if (message) {
        setError(field as CheckoutField, {
          type: "server",
          message,
        });
      }
    }
  }, [serverErrors, setError]);

  const fieldError = (field: CheckoutField) =>
    errors[field]?.message ?? serverErrors[field];

  const handleFieldChange = (field: CheckoutField) => {
    clearErrors(field);
    onFieldChange(field);
  };

  const fields = {
    fullName: register("fullName"),
    email: register("email"),
    mobileNumber: register("mobileNumber"),
    cardNumber: register("cardNumber"),
    expiry: register("expiry"),
    cvv: register("cvv"),
  };

  const isFieldValid = (field: CheckoutField) =>
    Boolean(
      touchedFields[field] &&
      dirtyFields[field] &&
      !errors[field] &&
      !serverErrors[field],
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <Input
        {...fields.fullName}
        info="Full Name"
        autoComplete="name"
        className="bg-white/10 rounded-xl text-white"
        error={fieldError("fullName")}
        valid={isFieldValid("fullName")}
        onChange={(event) => {
          fields.fullName.onChange(event);
          handleFieldChange("fullName");
        }}
      />

      <Input
        {...fields.email}
        info="Email"
        type="email"
        className="bg-white/10 rounded-xl text-white"
        autoComplete="email"
        error={fieldError("email")}
        valid={isFieldValid("email")}
        onChange={(event) => {
          fields.email.onChange(event);
          handleFieldChange("email");
        }}
      />

      <Input
        {...fields.mobileNumber}
        info="Mobile Number"
        type="tel"
        inputMode="tel"
        className="bg-white/10 rounded-xl text-white"
        autoComplete="tel"
        placeholder="5XX XXX XXX"
        error={fieldError("mobileNumber")}
        valid={isFieldValid("mobileNumber")}
        onChange={(event) => {
          fields.mobileNumber.onChange(event);
          handleFieldChange("mobileNumber");
        }}
      />

      <Input
        {...fields.cardNumber}
        info="Card Number"
        inputMode="numeric"
        className="bg-white/10 rounded-xl text-white"
        autoComplete="cc-number"
        placeholder="1234123412341234"
        error={fieldError("cardNumber")}
        valid={isFieldValid("cardNumber")}
        onChange={(event) => {
          setValue("cardNumber", digitsOnly(event.target.value, 16), {
            shouldDirty: true,
          });
          handleFieldChange("cardNumber");
        }}
      />

      <div className="flex gap-3">
        <Input
          {...fields.expiry}
          info="Expiry"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          className="bg-white/10 rounded-xl text-white"
          error={fieldError("expiry")}
          valid={isFieldValid("expiry")}
          onChange={(event) => {
            setValue("expiry", formatExpiryInput(event.target.value), {
              shouldDirty: true,
            });
            handleFieldChange("expiry");
          }}
        />

        <Input
          {...fields.cvv}
          info="CVV"
          type="password"
          inputMode="numeric"
          autoComplete="cc-csc"
          className="bg-white/10 rounded-xl text-white"
          placeholder="123"
          error={fieldError("cvv")}
          valid={isFieldValid("cvv")}
          onChange={(event) => {
            setValue("cvv", digitsOnly(event.target.value, 3), {
              shouldDirty: true,
            });
            handleFieldChange("cvv");
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isPaying}
        className="mt-2 flex h-10.25 w-full cursor-pointer items-center justify-center rounded-full bg-danger font-sans text-sm font-extrabold leading-none text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPaying ? "Processing…" : "Pay & Complete Order"}
      </button>
    </form>
  );
};

export default CheckoutStep;
