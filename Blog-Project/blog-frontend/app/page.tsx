"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogGrid from "@/components/blog/BlogGrid";
import Button from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBlogs } from "@/redux/slice/blogSlice";
import { fetchCategories } from "@/redux/slice/categorySlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { blogs, loading } = useAppSelector((state) => state.blog);
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchBlogs({ sort: "latest", limit: 6 }));
    dispatch(fetchCategories({ isActive: true }));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center lg:px-8">
          <p className="eyebrow">Stories worth reading</p>
          <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-tight text-ink lg:text-5xl">
            Ideas, essays, and reporting from a community of writers.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Browse published work across every category, or sign up to start writing your own.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/blogs"><Button>Explore blogs</Button></Link>
            <Link href="/auth/signup"><Button variant="ghost">Become an author</Button></Link>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c._id} href={`/blogs?category=${c._id}`} className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-ink hover:border-accent/40 hover:text-accent-dark">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-16 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Latest stories</h2>
          <Link href="/blogs" className="text-sm font-semibold text-accent hover:underline">View all →</Link>
        </div>
        <BlogGrid blogs={blogs} loading={loading} />
      </section>

      <Footer />
    </div>
  );
}
