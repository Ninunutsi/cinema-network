import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const DropdownTrigger = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button type="button" className="flex size-4 items-center outline-none">
          <ChevronDown className="size-full text-white transition-transform duration-200 data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 border-none bg-background text-white"
      >
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
