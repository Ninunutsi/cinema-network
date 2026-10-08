import {
  Avatar as AvatarUI,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import fallbackAvatar from "../../assets/avatar.svg";

export const Avatar = () => {
  return (
    <AvatarUI className="border-0 size-10">
      <AvatarImage src="" alt="" className="rounded-lg" />
      <AvatarFallback className=" rounded-lg">
        <img
          src={fallbackAvatar}
          alt="User avatar"
          className="size-10 rounded-lg object-cover"
        />
      </AvatarFallback>
      <AvatarBadge className="bg-green-500" />
    </AvatarUI>
  );
};
