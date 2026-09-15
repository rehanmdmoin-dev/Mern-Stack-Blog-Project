"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogGrid from "@/components/blog/BlogGrid";
import Pagination from "@/components/ui/Pagination";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBlogs } from "@/redux/slice/blogSlice";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchTags } from "@/redux/slice/tagSlice";

function BlogsExplorer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { blogs, meta, loading } = useAppSelector((state) => state.blog);
  const { categories } = useAppSelector((state) => state.category);
  const { tags } = useAppSelector((state) => state.tag);

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "latest";
  const page = Number(searchParams.get("page") || "1");

  useEffect(() => {
    dispatch(fetchCategories({ isActive: true }));
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBlogs({ search: searchParams.get("search") || undefined, category: category || undefined, tag: tag || undefined, sort, page, limit: 9 }));
  }, [dispatch, searchParams, category, tag, sort, page]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    params.delete("page");
    router.push(`/blogs?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", search);
  };

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h1 className="font-display text-3xl text-ink">Explore blogs</h1>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-xs">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs…"
              className="w-full rounded-control border border-border bg-surface py-2.5 px-4 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
            />
          </form>

          <div className="flex flex-wrap gap-2">
            <select value={category} onChange={(e) => updateParam("category", e.target.value)} className="rounded-control border border-border bg-surface px-3 py-2 text-sm text-ink">
              <option value="">All categories</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <select value={tag} onChange={(e) => updateParam("tag", e.target.value)} className="rounded-control border border-border bg-surface px-3 py-2 text-sm text-ink">
              <option value="">All tags</option>
              {tags.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
            <select value={sort} onChange={(e) => updateParam("sort", e.target.value)} className="rounded-control border border-border bg-surface px-3 py-2 text-sm text-ink">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="most-viewed">Most viewed</option>
              <option value="most-liked">Most liked</option>
              <option value="most-commented">Most commented</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <BlogGrid blogs={blogs} loading={loading} />
        </div>

        {meta && <Pagination page={meta.page} pages={meta.pages} onPageChange={goToPage} />}
      </div>
      <Footer />
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={null}>
      <BlogsExplorer />
    </Suspense>
  );
}
