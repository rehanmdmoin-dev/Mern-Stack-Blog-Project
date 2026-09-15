"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMyBlogs, softDeleteBlog, submitBlog } from "@/redux/slice/blogSlice";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { formatDate } from "@/lib/formatDate";

const statusFilters = ["", "draft", "pending", "published", "rejected", "unpublished"];

export default function MyBlogsPage() {
  const dispatch = useAppDispatch();
  const { blogs, meta, loading, mutating } = useAppSelector((state) => state.blog);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMyBlogs({ status: status || undefined, page, limit: 10 }));
  }, [dispatch, status, page]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink lg:text-3xl">My blogs</h1>
        <Link href="/dashboard/blogs/create"><Button>+ Write a blog</Button></Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
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

      {loading ? (
        <p className="py-16 text-center text-sm text-muted">Loading…</p>
      ) : blogs.length === 0 ? (
        <EmptyState title="No blogs here yet" description="Blogs matching this filter will show up here." />
      ) : (
        <div className="card divide-y divide-border">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Badge status={blog.status} />
                  <span className="text-xs text-muted">{formatDate(blog.updatedAt)}</span>
                </div>
                <p className="mt-1 truncate font-medium text-ink">{blog.title}</p>
                {blog.status === "rejected" && blog.rejectionReason && (
                  <p className="mt-1 text-xs text-danger">Reason: {blog.rejectionReason}</p>
                )}
                <p className="mt-1 text-xs text-muted">{blog.views} views · {blog.likesCount} likes · {blog.commentsCount} comments</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {blog.status === "published" && (
                  <Link href={`/blog/${blog.slug}`}><Button variant="ghost">View</Button></Link>
                )}
                <Link href={`/dashboard/blogs/${blog._id}/edit`}><Button variant="secondary">Edit</Button></Link>
                {["draft", "rejected"].includes(blog.status) && (
                  <Button variant="success" loading={mutating} onClick={() => dispatch(submitBlog(blog._id))}>Submit for review</Button>
                )}
                <Button variant="danger" onClick={() => setPendingDeleteId(blog._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {meta && <Pagination page={meta.page} pages={meta.pages} onPageChange={setPage} />}

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete this blog?"
        description="This moves it to trash and it will no longer be visible."
        loading={mutating}
        onConfirm={async () => { if (pendingDeleteId) await dispatch(softDeleteBlog(pendingDeleteId)); setPendingDeleteId(null); }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
