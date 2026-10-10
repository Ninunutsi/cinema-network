import type { MouseEvent } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

type PageItem = number | "ellipsis-left" | "ellipsis-right";

const getPageItems = (
  current: number,
  last: number,
  siblings = 1,
): PageItem[] => {
  const slots = siblings * 2 + 5;
  if (last <= slots) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  const start = Math.min(
    Math.max(current - siblings, 2),
    last - 1 - siblings * 2,
  );
  const end = start + siblings * 2;

  const items: PageItem[] = [1];
  if (start > 2) items.push("ellipsis-left");
  for (let page = start; page <= end; page++) items.push(page);
  if (end < last - 1) items.push("ellipsis-right");
  items.push(last);

  return items;
};

type SessionsPaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export const SessionsPagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: SessionsPaginationProps) => {
  if (lastPage <= 1) return null;

  const goTo = (page: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (page < 1 || page > lastPage || page === currentPage) return;
    onPageChange(page);
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= lastPage;

  return (
    <Pagination className="text-white ">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            size="default"
            text=""
            onClick={goTo(currentPage - 1)}
            aria-disabled={isFirst}
            className={
              isFirst
                ? "pointer-events-none opacity-50 mr-2"
                : "h-10 w-10 rounded-full border-0 hover:bg-danger hover:text-white"
            }
          />
        </PaginationItem>

        {getPageItems(currentPage, lastPage).map((item) =>
          typeof item === "number" ? (
            <PaginationItem key={item}>
              <PaginationLink
                size="default"
                href="#"
                isActive={item === currentPage}
                onClick={goTo(item)}
                className={
                  item === currentPage
                    ? "h-10 w-10 rounded-full border-0 bg-danger text-white hover:bg-danger hover:text-white"
                    : "h-10 w-10 rounded-full border-0 hover:bg-danger hover:text-white"
                }
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            size="default"
            text=""
            onClick={goTo(currentPage + 1)}
            aria-disabled={isLast}
            className={
              isLast
                ? "pointer-events-none opacity-50 ml-2"
                : "h-10 w-10 rounded-full border-0 hover:bg-danger hover:text-white"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
