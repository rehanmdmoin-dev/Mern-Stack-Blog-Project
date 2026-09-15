"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAdminDashboard } from "@/redux/slice/dashboardSlice";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/formatDate";

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { adminDashboard, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => { dispatch(fetchAdminDashboard({})); }, [dispatch]);

  if (loading && !adminDashboard) return <p className="py-16 text-center text-sm text-muted">Loading…</p>;
  if (!adminDashboard) return null;

  const {
    totalUsers, totalAuthors, totalReaders, totalBlogs, publishedBlogs, pendingBlogs,
    totalCategories, totalTags, totalComments, totalLikes, engagementTotals,
    topAuthors, topCategories, mostViewedBlogs, latestBlogs, recentlyRegisteredUsers, pendingReview,
  } = adminDashboard;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Site overview</h1>
      <p className="mt-1 text-sm text-muted">Everything happening across the platform.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total users" value={totalUsers} />
        <StatCard label="Authors" value={totalAuthors} />
        <StatCard label="Readers" value={totalReaders} />
        <StatCard label="Total blogs" value={totalBlogs} />
        <StatCard label="Published" value={publishedBlogs} />
        <StatCard label="Pending review" value={pendingBlogs} accent />
        <StatCard label="Categories" value={totalCategories} />
        <StatCard label="Tags" value={totalTags} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total views" value={engagementTotals.totalViews} />
        <StatCard label="Total likes" value={engagementTotals.totalLikes} />
        <StatCard label="Total comments" value={totalComments} />
        <StatCard label="Total like actions" value={totalLikes} />
      </div>

      {pendingReview.length > 0 && (
        <div className="mt-8 card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Pending review</h2>
            <Link href="/admin/blogs?status=pending" className="text-sm font-semibold text-accent hover:underline">View all →</Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {pendingReview.map((b: any) => (
              <div key={b._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{b.title}</p>
                  <p className="text-xs text-muted">by {b.author?.name} · {formatDate(b.createdAt)}</p>
                </div>
                <Link href="/admin/blogs?status=pending" className="text-xs font-semibold text-accent hover:underline">Review</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Top authors</h2>
          <div className="mt-4 space-y-3">
            {topAuthors.map((a: any) => (
              <div key={a.authorId} className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{a.name}</span>
                <span className="text-muted">{a.totalViews} views · {a.blogCount} blogs</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Top categories</h2>
          <div className="mt-4 space-y-3">
            {topCategories.map((c: any) => (
              <div key={c.categoryId} className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{c.name}</span>
                <span className="text-muted">{c.blogCount} blogs · {c.totalViews} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Most viewed</h2>
          <div className="mt-4 space-y-3">
            {mostViewedBlogs.map((b: any) => (
              <div key={b._id} className="flex items-center justify-between text-sm">
                <span className="truncate font-medium text-ink">{b.title}</span>
                <span className="shrink-0 text-muted">{b.views} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Newest users</h2>
          <div className="mt-4 space-y-3">
            {recentlyRegisteredUsers.map((u: any) => (
              <div key={u._id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{u.name}</span>
                <Badge status={u.role} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="card p-5">
      <span className={`eyebrow ${accent ? "text-accent-dark" : ""}`}>{label}</span>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
    </div>
  );
}
