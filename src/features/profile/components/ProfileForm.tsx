import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../components/atoms/Input";
import { Button } from "../../../components/ui/button";
import { useCurrentUserQuery } from "../../auth/authQueries";
import { useAuthStore } from "../../auth/authStore";

import { profileSchema, type ProfileFormValues } from "../profile.schema";
import { getAge } from "../profile.utils";
import { useUpdateProfileMutation, useVenuesQuery } from "../profileQueries";

import type {
  UpdateProfilePayload,
  UserProfile,
  Venue,
} from "../profile.types";
import { DatePicker } from "../../../components/atoms/DatePicker";
import { SelectDropdown } from "../../../components/atoms/SelectDropdown";

export const ProfileForm = () => {
  const { data: user, isPending, isError } = useCurrentUserQuery();

  const venuesQuery = useVenuesQuery();
  const updateMutation = useUpdateProfileMutation();

  if (isPending) {
    return <p className="text-sm text-muted">Loading profile...</p>;
  }

  if (isError || !user) {
    return (
      <p role="alert" className="text-sm text-danger">
        Could not load your profile. Please try again.
      </p>
    );
  }

  return (
    <ProfileFormFields
      key={user.id}
      profile={user}
      venues={venuesQuery.data ?? []}
      venuesLoading={venuesQuery.isPending}
      venuesError={venuesQuery.isError}
      onSave={(payload) => updateMutation.mutateAsync(payload)}
    />
  );
};

interface ProfileFormFieldsProps {
  profile: UserProfile;
  venues: Venue[];
  venuesLoading: boolean;
  venuesError: boolean;
  onSave: (payload: UpdateProfilePayload) => Promise<UserProfile>;
}

const ProfileFormFields = ({
  profile,
  venues,
  venuesLoading,
  venuesError,
  onSave,
}: ProfileFormFieldsProps) => {
  const updateUser = useAuthStore((state) => state.updateUser);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: profile.fullName ?? "",
      email: profile.email,
      mobileNumber: profile.mobileNumber ?? "",
      dateOfBirth: profile.dateOfBirth?.slice(0, 10) ?? "",
      preferredVenue: profile.preferredVenue
        ? String(profile.preferredVenue.id)
        : "",
    },
  });

  const values = watch();
  const age = values.dateOfBirth ? getAge(values.dateOfBirth) : -1;

  const submit = async (data: ProfileFormValues) => {
    const payload: UpdateProfilePayload = {
      fullName: data.fullName.trim(),
      mobileNumber: data.mobileNumber,
      dateOfBirth: data.dateOfBirth,
      ...(data.preferredVenue
        ? { preferredVenueId: Number(data.preferredVenue) }
        : {}),
    };

    const savedProfile = await onSave(payload);

    updateUser(savedProfile);

    reset({
      fullName: savedProfile.fullName ?? "",
      email: savedProfile.email,
      mobileNumber: savedProfile.mobileNumber ?? "",
      dateOfBirth: savedProfile.dateOfBirth?.slice(0, 10) ?? "",
      preferredVenue: savedProfile.preferredVenue
        ? String(savedProfile.preferredVenue.id)
        : "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="flex  flex-col gap-6 h-123.75 w-220"
    >
      <div className=" flex  flex-col gap-6">
        <Input
          info="Full Name"
          infoClassName="mb-2.5 text-white"
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={50}
          error={errors.fullName?.message}
          {...register("fullName")}
          className="bg-background-tint text-white placeholder:text-muted text-xs placeholder:text-xs pl-4 font-semibold rounded-2xl"
        />

        <Input
          info="Email"
          type="email"
          infoClassName="mb-2.5 text-white"
          readOnly
          helperText="Set at registration and cannot be changed"
          {...register("email")}
          className="cursor-not-allowed  bg-background-tint text-muted placeholder:text-muted text-xs placeholder:text-xs pl-4 font-semibold rounded-2xl"
        />

        <Input
          info="Mobile Number"
          type="tel"
          inputMode="numeric"
          infoClassName="mb-2.5 text-white"
          autoComplete="tel-national"
          placeholder="5XXXXXXXX"
          maxLength={9}
          error={errors.mobileNumber?.message}
          {...register("mobileNumber")}
          className=" bg-background-tint text-white placeholder:text-muted text-xs placeholder:text-xs pl-4 font-semibold rounded-2xl"
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="dateOfBirth"
            className="text-xs font-semibold tracking-wide text-white"
          >
            Date of Birth
          </label>

          <DatePicker
            id="dateOfBirth"
            value={values.dateOfBirth}
            onChange={(date) =>
              setValue("dateOfBirth", date, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            placeholder="Select your date of birth"
            disabledDate={(date) => date > new Date()}
            error={errors.dateOfBirth?.message}
          />

          {!errors.dateOfBirth?.message && age >= 12 && age < 18 && (
            <p className="text-xs text-warning">
              {age < 16
                ? "You cannot buy tickets for 16+ or 18+ titles."
                : "You cannot buy tickets for 18+ titles."}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-wide text-white">
            Preferred Venue (Optional)
          </label>

          <SelectDropdown
            options={venues.map((venue) => ({
              value: String(venue.id),
              label: venue.name,
            }))}
            value={values.preferredVenue ?? ""}
            onChange={(venueId) =>
              setValue("preferredVenue", venueId, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            placeholder="Select your preferred venue"
            disabled={venuesLoading || venuesError}
            error={errors.preferredVenue?.message}
          />
        </div>
      </div>

      <div className="flex justify-start">
        <Button
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          className="h-10 rounded-full bg-danger px-6 font-sans text-sm font-extrabold text-white hover:bg-danger disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
