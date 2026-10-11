import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SearchEmptyProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const SearchEmpty = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
}: SearchEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 pt-8 pb-6">
      <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-background-tint text-white">
        <Icon size={24} />
      </div>

      <p className="text-sm font-semibold leading-none text-white">{title}</p>

      <p className="mb-2.5 text-center text-sm leading-[130%] text-muted">
        {description}
      </p>

      <Button
        onClick={onButtonClick}
        className="h-10.25 w-45.75 gap-1 rounded-full bg-background-tint hover:bg-background-tint cursor-pointer px-5.5 py-3.25 text-sm font-extrabold leading-none text-white"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default SearchEmpty;
