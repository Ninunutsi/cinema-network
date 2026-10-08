import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../atoms/Avatar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import ProfileIcon from "../../assets/profile.svg?react";
import LogOutIcon from "../../assets/log-out.svg?react";
import TicketIcon from "../../assets/ticket.svg?react";

export const DropdownTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <button type="button" className="flex size-4 items-center outline-none">
          <ChevronDown
            className={`size-full text-white transition-transform duration-200 ${
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
          <Avatar />

          <div className="flex flex-col gap-0.5">
            <p className="font-sans text-sm font-semibold leading-none text-white">
              saxeli
            </p>

            <p className="font-sans text-xs font-normal leading-[130%] text-muted">
              email
            </p>
          </div>
        </div>

        <div className="px-5">
          <Alert className="bg-warning/10 rounded-lg px-3 py-2.5">
            <AlertTitle className="text-orange-500 font-sans text-sm font-semibold leading-none mb-0.5">
              Profile incomplete
            </AlertTitle>
            <AlertDescription className="font-sans text-xs font-normal leading-[130%] text-muted">
              Please complete your profile to enable booking
            </AlertDescription>
          </Alert>
        </div>
        <div className="py-1 flex flex-col gap-0.5">
          <DropdownMenuItem className="cursor-pointer font-sans text-sm flex items-center gap-2 font-semibold leading-none px-5 py-2.5 hover:bg-surface hover:text-white">
            <ProfileIcon /> My Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer font-sans text-sm font-semibold leading-none px-5 py-2.5 hover:bg-surface hover:text-white">
            <TicketIcon /> My Tickets
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0 bg-muted/20" />

        <div className="pb-2.5">
          <DropdownMenuItem className="cursor-pointer px-5 py-2.5 font-sans text-sm font-semibold leading-none text-danger hover:bg-surface hover:text-danger">
            <LogOutIcon className="stroke-danger " /> Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
