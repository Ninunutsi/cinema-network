import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  disabledDate?: (date: Date) => boolean;
  error?: string;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Select a date",
  id = "date-picker",
  disabledDate,
  error,
}: DatePickerProps) => {
  const selectedDate = value ? new Date(`${value}T12:00:00`) : undefined;

  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <Popover>
          <PopoverTrigger
            render={
              <Button
                id={id}
                type="button"
                variant="outline"
                aria-invalid={Boolean(error)}
                className={`h-10 w-full justify-start rounded-2xl border-0 aria-expanded:bg-background-tint bg-background-tint pl-4 text-xs font-semibold hover:bg-background-tint active:bg-background-tint focus:bg-background-tint focus-visible:bg-background-tint ${
                  value ? "text-white" : "text-muted"
                }`}
              >
                {selectedDate && !Number.isNaN(selectedDate.getTime())
                  ? format(selectedDate, "PPP")
                  : placeholder}

                <CalendarIcon className="ml-auto mr-1.5 size-4 text-white" />
              </Button>
            }
          />

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) =>
                onChange(date ? format(date, "yyyy-MM-dd") : "")
              }
              disabled={disabledDate}
              defaultMonth={selectedDate ?? new Date()}
              captionLayout="dropdown"
              startMonth={new Date(1900, 0)}
              endMonth={new Date()}
            />
          </PopoverContent>
        </Popover>

        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    </div>
  );
};
