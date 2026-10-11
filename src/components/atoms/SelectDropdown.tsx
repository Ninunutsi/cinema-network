import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export const SelectDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  error,
}: SelectDropdownProps) => {
  const selectedOption = options.find((option) => option.value === value);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              aria-invalid={Boolean(error)}
              className="h-10 w-full cursor-pointer justify-between rounded-2xl border-0 bg-background-tint px-4 text-xs font-semibold text-white hover:bg-background-tint aria-expanded:bg-background-tint"
            >
              <span className={value ? "truncate" : "truncate text-muted"}>
                {selectedOption?.label ?? placeholder}
              </span>
              <ChevronDown className="ml-2 size-4 shrink-0 text-white" />
            </Button>
          }
        />

        <PopoverContent
          align="start"
          className="w-(--anchor-width) border-0 bg-background p-1 text-white"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold hover:bg-muted/30"
            >
              {option.label}
              {value === option.value && (
                <Check className="size-4 text-white" />
              )}
            </button>
          ))}
        </PopoverContent>
      </Popover>

      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
};
