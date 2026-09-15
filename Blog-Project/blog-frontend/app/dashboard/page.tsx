"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAuthorDashboard } from "@/redux/slice/dashboardSlice";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/formatDate";

export default function AuthorDashboardPage() {
  const dispatch = useAppDispatch();
  const { authorDashboard, loading } = useAppSelector((state) => state.dashboard);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => { dispatch(fetchAuthorDashboard({})); }, [dispatch]);

  if (loading && !authorDashboard) {
    return <p className="py-16 text-center text-sm text-muted">Loading your dashboard…</p>;
  }
  if (!authorDashboard) return null;

  const { totalBlogs, publishedBlogs, draftBlogs, totals, mostPopularBlog, recentComments } = authorDashboard;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink lg:text-3xl">Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}</h1>
          <p className="mt-1 text-sm text-muted">Here's how your writing is doing.</p>
        </div>
        <Link href="/dashboard/blogs/create"><Button>+ Write a blog</Button></Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total blogs" value={totalBlogs} />
        <StatCard label="Published" value={publishedBlogs} />
        <StatCard label="Drafts" value={draftBlogs} />
        <StatCard label="Total views" value={totals.totalViews} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Engagement totals</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <StatCard label="Likes" value={totals.totalLikes} />
            <StatCard label="Comments" value={totals.totalComments} />
          </div>
          {mostPopularBlog && (
            <div className="mt-4 rounded-control border border-border p-4">
              <p className="eyebrow">Most popular blog</p>
              <Link href={`/blog/${mostPopularBlog.slug}`} className="mt-1 block font-medium text-ink hover:text-accent-dark">
                {mostPopularBlog.title}
              </Link>
              <p className="mt-1 text-xs text-muted">{mostPopularBlog.views} views · {mostPopularBlog.likesCount} likes</p>
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Recent comments on your blogs</h2>
          <div className="mt-4 space-y-3">
            {recentComments.length === 0 && <p className="text-sm text-muted">No comments yet.</p>}
            {recentComments.map((c: any) => (
              <div key={c._id} className="border-b border-border pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{c.author?.name}</span>
                  <span className="text-xs text-muted">{formatDate(c.createdAt)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{c.content}</p>
                <Link href={`/blog/${c.blog?.slug}`} className="text-xs font-medium text-accent hover:underline">on {c.blog?.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <span className="eyebrow">{label}</span>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
    </div>
  );
}
