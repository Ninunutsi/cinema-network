import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface MovieSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  handleSeeAll?: () => void;
  showlink?: boolean;
}

const MovieSection = ({
  title,
  children,
  className,
  handleSeeAll,
  showlink = true,
}: MovieSectionProps) => {
  return (
    <div className={`flex flex-col gap-6 px-17.5 ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-2xl font-extrabold leading-none text-white">
          {title}
        </h2>

        {showlink && (
          <Button
            variant="link"
            className="cursor-pointer font-sans text-sm font-semibold leading-none text-danger hover:underline"
            onClick={handleSeeAll}
          >
            See all
          </Button>
        )}
      </div>

      <div className="relative min-w-0">
        {children}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background via-background/70 to-transparent"
        />
      </div>
    </div>
  );
};

export default MovieSection;
