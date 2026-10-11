import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../features/auth/authQueries";
import type { AuthUser } from "../../../features/auth/types";
import { ProfileDropdown } from "../../../components/molecules/ProfileDropdown";

interface ProfileDropdownControllerProps {
  user: AuthUser | undefined | null;
}

export const ProfileDropdownController = ({
  user,
}: ProfileDropdownControllerProps) => {
  const navigate = useNavigate();
  const logout = useLogoutMutation();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleTicketsClick = () => {
    navigate("/profile?tab=my-tickets");
  };

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <ProfileDropdown
      username={user?.username}
      email={user?.email}
      avatarURL={user?.avatar}
      profileComplete={Boolean(user?.profileComplete)}
      isLoggingOut={logout.isPending}
      onProfileClick={handleProfileClick}
      onTicketsClick={handleTicketsClick}
      onLogout={handleLogout}
    />
  );
};
