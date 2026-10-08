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
        {/* User information */}
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

        {/* Menu items */}
        <div className="">
          <DropdownMenuItem className="cursor-pointer font-sans text-sm font-semibold leading-none px-5 py-2.5 hover:bg-surface hover:text-white">
            My Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer font-sans text-sm font-semibold leading-none px-5 py-2.5 hover:bg-surface hover:text-white">
            My Tickets
          </DropdownMenuItem>
        </div>

        {/* Full-width separator */}
        <DropdownMenuSeparator className="m-0 bg-muted/20" />

        {/* Logout */}
        <div>
          <DropdownMenuItem className="cursor-pointer px-5 py-2.5 font-sans text-sm font-semibold leading-none text-danger hover:bg-surface hover:text-danger">
            Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
