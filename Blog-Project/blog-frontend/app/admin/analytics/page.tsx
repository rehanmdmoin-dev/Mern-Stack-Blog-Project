"use client";

import { useEffect } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchTrend, fetchCategoryAnalytics, fetchTagAnalytics, fetchBlogPerformance,
  fetchAuthorAnalytics, fetchActiveReaders, fetchTopCommenters,
} from "@/redux/slice/dashboardSlice";

const chartColors = { accent: "#c2410c", info: "#2952a3", success: "#2f6b4f" };

export default function AdminAnalyticsPage() {
  const dispatch = useAppDispatch();
  const {
    trend, categoryAnalytics, tagAnalytics, blogPerformance,
    authorAnalytics, activeReaders, topCommenters,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchTrend({ days: 30 }));
    dispatch(fetchCategoryAnalytics({}));
    dispatch(fetchTagAnalytics({}));
    dispatch(fetchBlogPerformance({ limit: 5 }));
    dispatch(fetchAuthorAnalytics({}));
    dispatch(fetchActiveReaders({}));
    dispatch(fetchTopCommenters({}));
  }, [dispatch]);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Analytics</h1>
      <p className="mt-1 text-sm text-muted">Publishing trends and engagement across the whole platform.</p>

      <div className="mt-6 card p-6">
        <h2 className="font-display text-lg text-ink">Publishing trend — last 30 days</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e2d8" />
              <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Area type="monotone" dataKey="blogsPublished" name="Blogs published" stroke={chartColors.accent} fill={chartColors.accent} fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Blogs per category</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryAnalytics} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2d8" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="blogCount" name="Blogs" fill={chartColors.info} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Blogs per tag</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tagAnalytics.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2d8" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="blogCount" name="Blogs" fill={chartColors.success} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {blogPerformance && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard label="Avg. views / blog" value={blogPerformance.averages.avgViewsPerBlog} />
          <StatCard label="Avg. likes / blog" value={blogPerformance.averages.avgLikesPerBlog} />
          <StatCard label="Avg. comments / blog" value={blogPerformance.averages.avgCommentsPerBlog} />
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RankedList title="Top authors by views" rows={authorAnalytics.map((a: any) => ({ label: a.name, value: `${a.totalViews} views` }))} />
        <RankedList title="Most active readers" rows={activeReaders.map((r: any) => ({ label: r.name || "Unknown", value: `${r.activityScore} pts` }))} />
        <RankedList title="Top commenters" rows={topCommenters.map((c: any) => ({ label: c.name, value: `${c.commentCount} comments` }))} />
        {blogPerformance && (
          <RankedList title="Top viewed blogs" rows={blogPerformance.topViewed.map((b: any) => ({ label: b.title, value: `${b.views} views` }))} />
        )}
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

function RankedList({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <div className="card p-6">
      <h2 className="font-display text-lg text-ink">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="truncate font-medium text-ink">{i + 1}. {r.label}</span>
            <span className="shrink-0 text-muted">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
