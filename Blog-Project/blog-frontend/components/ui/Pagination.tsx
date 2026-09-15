"use client";

import Button from "./Button";

export default function Pagination({
  page,
  pages,
  onPageChange,
}: {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}) {
  if (!pages || pages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <span className="px-3 text-sm text-muted">
        Page {page} of {pages}
      </span>
      <Button variant="ghost" disabled={page >= pages} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
}
