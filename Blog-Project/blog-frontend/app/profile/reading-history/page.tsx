"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
import EmptyState from "@/components/ui/EmptyState";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchReadingHistory } from "@/redux/slice/profileSlice";
import { formatDateTime } from "@/lib/formatDate";

function ReadingHistoryList() {
  const dispatch = useAppDispatch();
  const { readingHistory, loading } = useAppSelector((state) => state.profile);

  useEffect(() => { dispatch(fetchReadingHistory()); }, [dispatch]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Reading history</h1>

      {loading ? (
        <p className="mt-8 text-center text-sm text-muted">Loading…</p>
      ) : readingHistory.length === 0 ? (
        <div className="mt-8"><EmptyState title="No reading history yet" description="Blogs you open will show up here." /></div>
      ) : (
        <ul className="mt-8 divide-y divide-border">
          {readingHistory.map((h: any) => (
            <li key={h.blog._id} className="flex items-center justify-between py-4">
              <Link href={`/blog/${h.blog.slug}`} className="font-medium text-ink hover:text-accent-dark">{h.blog.title}</Link>
              <span className="text-xs text-muted">{formatDateTime(h.viewedAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ReadingHistoryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <RequireAuth><ReadingHistoryList /></RequireAuth>
      <Footer />
    </div>
  );
}
