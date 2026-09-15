"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllComments, moderateComment, deleteComment } from "@/redux/slice/commentSlice";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { formatDateTime } from "@/lib/formatDate";

const statusFilters = ["", "approved", "rejected", "hidden"];

export default function AdminCommentsPage() {
  const dispatch = useAppDispatch();
  const { comments, meta, loading } = useAppSelector((state) => state.comment);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllComments({ status: status || undefined, search: search || undefined, page, limit: 10 }));
  }, [dispatch, status, search, page]);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Comments</h1>
      <p className="mt-1 text-sm text-muted">Moderate every comment across every blog.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search comment content…"
          className="w-full max-w-xs rounded-control border border-border bg-surface px-3.5 py-2 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((s) => (
            <button
              key={s || "all"}
              onClick={() => { setStatus(s); setPage(1); }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                status === s ? "border-accent bg-accent-soft text-accent-dark" : "border-border bg-surface text-muted hover:border-accent/40"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="py-16 text-center text-sm text-muted">Loading…</p>
        ) : comments.length === 0 ? (
          <EmptyState title="No comments found" />
        ) : (
          <div className="card divide-y divide-border">
            {comments.map((c) => {
              const blogRef = typeof c.blog === "object" ? c.blog : null;
              return (
                <div key={c._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge status={c.status} />
                      <span className="text-sm font-semibold text-ink">{c.author?.name}</span>
                      <span className="text-xs text-muted">{c.author?.email}</span>
                      <span className="text-xs text-muted">· {formatDateTime(c.createdAt)}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink">{c.content}</p>
                    {blogRef && (
                      <Link href={`/blog/${blogRef.slug}`} className="mt-1 inline-block text-xs font-medium text-accent hover:underline">
                        on “{blogRef.title}”
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {c.status !== "approved" && (
                      <Button variant="success" onClick={() => dispatch(moderateComment({ id: c._id, status: "approved" }))}>Approve</Button>
                    )}
                    {c.status !== "hidden" && (
                      <Button variant="secondary" onClick={() => dispatch(moderateComment({ id: c._id, status: "hidden" }))}>Hide</Button>
                    )}
                    {c.status !== "rejected" && (
                      <Button variant="ghost" onClick={() => dispatch(moderateComment({ id: c._id, status: "rejected" }))}>Reject</Button>
                    )}
                    <Button variant="danger" onClick={() => setPendingDeleteId(c._id)}>Delete</Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {meta && <Pagination page={meta.page} pages={meta.pages} onPageChange={setPage} />}

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete this comment?"
        description="This permanently removes it from the blog."
        onConfirm={async () => { if (pendingDeleteId) await dispatch(deleteComment(pendingDeleteId)); setPendingDeleteId(null); }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
