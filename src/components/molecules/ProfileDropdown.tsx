import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/atoms/Avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProfileIcon from "@/assets/profile.svg?react";
import LogOutIcon from "@/assets/log-out.svg?react";
import TicketIcon from "@/assets/ticket.svg?react";
import { cn } from "cn";

interface ProfileDropdownProps {
  fullName?: string | undefined | null;
  email?: string;
  avatarURL?: string | undefined | null;
  profileComplete: boolean;
  isLoggingOut: boolean;
  onProfileClick: () => void;
  onTicketsClick: () => void;
  onLogout: () => void;
}

export const ProfileDropdown = ({
  fullName,
  email,
  avatarURL,
  profileComplete,
  isLoggingOut,
  onProfileClick,
  onTicketsClick,
  onLogout,
}: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <button type="button" className="flex size-4 items-center outline-none">
          <ChevronDown
            className={`size-full cursor-pointer text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={16}
        className="w-75.5 rounded-lg border-none bg-background p-0 text-white"
      >
        <div className="flex items-center gap-2.5 p-5">
          <Avatar
            avatarURL={avatarURL}
            status={profileComplete ? "complete" : "incomplete"}
          />

          <div className="flex min-w-0 flex-col gap-0.5">
            <p
              className={cn(
                "truncate font-sans text-sm font-semibold leading-none",
                fullName ? "text-white" : "text-warning",
              )}
            >
              {fullName || "Name not provided"}
            </p>
            <p className="truncate font-sans text-xs font-normal leading-[130%] text-muted">
              {email}
            </p>
          </div>
        </div>

        <div className="px-5">
          {profileComplete ? (
            <Alert className="flex h-9 items-center rounded-lg bg-success/10 px-3 py-2.5">
              <AlertTitle className="m-0 flex items-center gap-1.5 p-0">
                <span className="font-sans text-sm font-semibold leading-none text-success">
                  Profile complete
                </span>
                <Check size={16} className="shrink-0 text-success" />
              </AlertTitle>
            </Alert>
          ) : (
            <Alert className="h-17.25 rounded-lg bg-warning/10 px-3 py-2.5">
              <AlertTitle className="mb-0.5 font-sans text-sm font-semibold leading-none text-orange-500">
                Profile incomplete
              </AlertTitle>
              <AlertDescription className="font-sans text-xs font-normal leading-[130%] text-muted">
                Please complete your profile to enable booking
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex flex-col gap-0.5 py-1">
          <DropdownMenuItem
            onClick={onProfileClick}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 font-sans text-sm font-semibold leading-none hover:bg-surface hover:text-white"
          >
            <ProfileIcon />
            My Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onTicketsClick}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 font-sans text-sm font-semibold leading-none hover:bg-surface focus:bg-surface! focus:text-white! focus:**:text-white!"
          >
            <TicketIcon className="fill-white! text-white!" />
            <span className="text-white!">My Tickets</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0 bg-muted/20" />

        <div className="pb-2.5">
          <DropdownMenuItem
            onClick={onLogout}
            disabled={isLoggingOut}
            className="cursor-pointer px-5 py-2.5 font-sans text-sm font-semibold leading-none text-danger hover:bg-surface hover:text-danger"
          >
            <LogOutIcon className="stroke-danger" />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
