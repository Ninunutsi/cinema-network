import { useCurrentUserQuery } from "../../../features/auth/authQueries";
import { Profile } from "../../../components/molecules/Profile";

export const ProfileController = () => {
  const { data: user } = useCurrentUserQuery();

  const userStatus = user?.profileComplete ? "complete" : "incomplete";

  return (
    <Profile
      fullName={user?.fullName}
      avatarURL={user?.avatar}
      status={userStatus}
      user={user}
    />
  );
};
