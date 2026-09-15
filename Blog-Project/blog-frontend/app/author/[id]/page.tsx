"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogGrid from "@/components/blog/BlogGrid";
import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { formatDate } from "@/lib/formatDate";

export default function AuthorProfilePage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(`${endPoints.authors.byId}/${params.id}`)
      .then((res) => setData(res.data.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="py-24 text-center text-sm text-muted">Loading…</p>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="py-24 text-center text-sm text-muted">Author not found.</p>
        <Footer />
      </div>
    );
  }

  const { author, stats, recentBlogs } = data;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-accent-soft font-display text-2xl font-semibold text-accent-dark">
            {author.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.profileImage} alt={author.name} className="h-full w-full object-cover" />
            ) : (
              author.name?.[0]?.toUpperCase()
            )}
          </span>
          <div>
            <h1 className="font-display text-2xl text-ink">{author.name}</h1>
            <p className="text-sm text-muted">Writing since {formatDate(author.createdAt)}</p>
          </div>
        </div>

        {author.bio && <p className="mt-4 max-w-2xl text-muted">{author.bio}</p>}

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Blogs" value={stats.totalBlogs} />
          <StatCard label="Views" value={stats.totalViews} />
          <StatCard label="Likes" value={stats.totalLikes} />
          <StatCard label="Comments" value={stats.totalComments} />
        </div>

        <h2 className="mt-10 font-display text-xl text-ink">Recent blogs</h2>
        <div className="mt-4">
          <BlogGrid blogs={recentBlogs} loading={false} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-4">
      <p className="eyebrow">{label}</p>
      <p className="mt-1 font-display text-2xl text-ink">{value}</p>
    </div>
  );
}
