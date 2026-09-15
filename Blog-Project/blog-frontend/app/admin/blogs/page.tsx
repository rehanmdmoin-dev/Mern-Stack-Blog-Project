"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAdminBlogs, publishBlog, rejectBlog, unpublishBlog } from "@/redux/slice/blogSlice";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { Textarea } from "@/components/ui/Field";
import { formatDate } from "@/lib/formatDate";

const statusFilters = ["", "pending", "published", "draft", "rejected", "unpublished"];

function AdminBlogsList() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { blogs, meta, loading, mutating } = useAppSelector((state) => state.blog);
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(fetchAdminBlogs({ status: status || undefined, search: search || undefined, page, limit: 10 }));
  }, [dispatch, status, search, page]);

  const confirmReject = async () => {
    if (!rejectingId) return;
    await dispatch(rejectBlog({ id: rejectingId, reason }));
    setRejectingId(null);
    setReason("");
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Manage blogs</h1>
      <p className="mt-1 text-sm text-muted">Review, publish, reject, or unpublish any blog on the platform.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search blogs…"
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
        ) : blogs.length === 0 ? (
          <EmptyState title="No blogs found" />
        ) : (
          <div className="card divide-y divide-border">
            {blogs.map((blog) => (
              <div key={blog._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge status={blog.status} />
                    <span className="text-xs text-muted">{formatDate(blog.createdAt)}</span>
                  </div>
                  <p className="mt-1 truncate font-medium text-ink">{blog.title}</p>
                  <p className="text-xs text-muted">by {(blog.author as any)?.name} ({(blog.author as any)?.email})</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {blog.status === "published" && (
                    <Link href={`/blog/${blog.slug}`}><Button variant="ghost">View</Button></Link>
                  )}
                  {blog.status !== "published" && (
                    <Button variant="success" loading={mutating} onClick={() => dispatch(publishBlog(blog._id))}>Publish</Button>
                  )}
                  {blog.status === "published" && (
                    <Button variant="secondary" loading={mutating} onClick={() => dispatch(unpublishBlog(blog._id))}>Unpublish</Button>
                  )}
                  {blog.status !== "rejected" && (
                    <Button variant="danger" onClick={() => setRejectingId(blog._id)}>Reject</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {meta && <Pagination page={meta.page} pages={meta.pages} onPageChange={setPage} />}

      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={() => setRejectingId(null)}>
          <div className="card w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg text-ink">Reject this blog?</h3>
            <div className="mt-4">
              <Textarea label="Reason (shown to the author)" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setRejectingId(null)}>Cancel</Button>
              <Button variant="danger" loading={mutating} onClick={confirmReject}>Reject</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBlogsPage() {
  return (
    <Suspense fallback={null}>
      <AdminBlogsList />
    </Suspense>
  );
}
