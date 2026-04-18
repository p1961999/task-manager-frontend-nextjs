"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaskPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function TaskPagination({
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: TaskPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    if (page <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
      return pages;
    }

    if (page >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      return pages;
    }

    pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-800">{startItem}</span>
        {"–"}
        <span className="font-semibold text-slate-800">{endItem}</span>
        {" "}of{" "}
        <span className="font-semibold text-slate-800">{totalItems}</span> tasks
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex items-center gap-2 rounded-2xl bg-slate-100 p-1">
          {pageNumbers.map((item, index) =>
            item === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm font-medium text-slate-400"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(Number(item))}
                className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
                  page === item
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-transparent text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}