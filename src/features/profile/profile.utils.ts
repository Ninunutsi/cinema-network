export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isValidCalendarDate = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const getAge = (dateOfBirth: string): number => {
  if (!isValidCalendarDate(dateOfBirth)) return -1;

  const [year, month, day] = dateOfBirth.split("-").map(Number);
  const today = new Date();

  let age = today.getFullYear() - year;

  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age--;
  }

  return age;
};

export const isAgeEligibleForRating = (
  dateOfBirth: string,
  minimumAge: number,
): boolean => {
  const age = getAge(dateOfBirth);

  return age >= minimumAge;
};

export const isProfileComplete = (profile: {
  fullName: string | null;
  email: string;
  mobileNumber: string | null;
  dateOfBirth: string | null;
}): boolean => {
  return (
    profile.fullName !== null &&
    profile.fullName.trim().length >= 3 &&
    profile.fullName.trim().length <= 50 &&
    profile.email.trim().length > 0 &&
    profile.mobileNumber !== null &&
    /^5\d{8}$/.test(profile.mobileNumber) &&
    profile.dateOfBirth !== null &&
    isValidCalendarDate(profile.dateOfBirth) &&
    profile.dateOfBirth <= getTodayDate() &&
    getAge(profile.dateOfBirth) >= 12
  );
};
