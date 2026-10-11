import type { AuthUser } from "@/features/auth/types";
import { ProfileDropdownController } from "@/views/ProfilePage/components/ProfileDropdownController";
import { Avatar } from "@/components/atoms/Avatar";

interface ProfileProps {
  username?: string | undefined | null;
  avatarURL?: string | undefined | null;
  status: "complete" | "incomplete";
  user: AuthUser | undefined | null;
}

export const Profile = ({
  username,
  avatarURL,
  status,
  user,
}: ProfileProps) => {
  return (
    <div className="flex w-30 items-center gap-6">
      <div className="flex w-20 items-center gap-3">
        <Avatar avatarURL={avatarURL} status={status} />

        <p className="w-10 truncate font-sans text-sm font-semibold leading-none text-white">
          {username}
        </p>
      </div>

      <ProfileDropdownController user={user} />
    </div>
  );
};
