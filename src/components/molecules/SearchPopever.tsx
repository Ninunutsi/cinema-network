import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../atoms/Input";
import type { Dispatch, SetStateAction } from "react";

interface SearchPopoverProps {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchPopover = ({
  isSearchOpen,
  setIsSearchOpen,
}: SearchPopoverProps) => {
  return (
    <div role="search">
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverTrigger>
          <div
            className={`ml-auto shrink-0 overflow-hidden transition-[width] duration-200 ease-out motion-reduce:transition-none ${
              isSearchOpen ? "w-120" : "w-94"
            }`}
          >
            <Input
              type="search"
              aria-label="Search films and live events"
              placeholder="Search films and live events"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsSearchOpen(false);
                  e.currentTarget.blur();
                }
              }}
              className="bg-background-tint text-white placeholder:text-white"
              startIcon={<Search className="size-4 text-white" />}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="bottom"
          sideOffset={7}
          className={`border border-background-tint bg-background p-2 transition-[width,opacity] duration-300 ease-out ${
            isSearchOpen ? "w-120 opacity-100" : "w-94 opacity-0"
          }`}
          style={{ pointerEvents: isSearchOpen ? "auto" : "none" }}
        >
          <div>ffdsjflksdjflksdjflsd</div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
