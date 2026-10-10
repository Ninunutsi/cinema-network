import {
  Avatar as AvatarUI,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import fallbackAvatar from "../../assets/avatar.svg";
import { cn } from "cn";

export const Avatar = ({
  avatarURL,
  status,
}: {
  avatarURL: string | undefined | null;
  status: "complete" | "incomplete";
}) => {
  return (
    <AvatarUI className="border-0 size-10">
      <AvatarImage src="" alt="" className="rounded-lg" />
      <AvatarFallback className=" rounded-lg">
        <img
          src={avatarURL ? avatarURL : fallbackAvatar}
          alt="User avatar"
          className="size-10 rounded-lg object-cover"
        />
      </AvatarFallback>
      <AvatarBadge
        className={cn(
          "size-2.5 ring-1",
          status == "complete" ? "bg-success" : "bg-warning",
        )}
      />
    </AvatarUI>
  );
};
