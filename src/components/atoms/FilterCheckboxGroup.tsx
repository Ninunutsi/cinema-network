import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterOption {
  id: string | number;
  label: ReactNode;
}

interface FilterCheckboxGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: (string | number)[];
  onToggle: (value: string | number) => void;
}

export const FilterCheckboxGroup = ({
  title,
  options,
  selectedValues,
  onToggle,
}: FilterCheckboxGroupProps) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-xs leading-none font-semibold tracking-[0.06em] uppercase text-muted">
      {title}
    </h2>

    {options.map((option) => (
      <label
        key={option.id}
        className="flex cursor-pointer items-center gap-2.5 text-sm leading-[130%] text-white"
      >
        <Checkbox
          checked={selectedValues.includes(option.id)}
          onCheckedChange={() => onToggle(option.id)}
          className="border-subtle data-[state=checked]:border-danger data-[state=checked]:bg-danger  data-[state=checked]:text-white"
        />
        {typeof option.label == "string" ? (
          <span className="text-sm leading-none font-semibold text-white">
            {option.label}
          </span>
        ) : (
          option.label
        )}
      </label>
    ))}
  </div>
);
