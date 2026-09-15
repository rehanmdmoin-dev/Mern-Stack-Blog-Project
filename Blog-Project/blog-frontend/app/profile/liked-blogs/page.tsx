"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
import BlogGrid from "@/components/blog/BlogGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchLikedBlogs } from "@/redux/slice/profileSlice";

function LikedBlogsList() {
  const dispatch = useAppDispatch();
  const { likedBlogs, loading } = useAppSelector((state) => state.profile);

  useEffect(() => { dispatch(fetchLikedBlogs({})); }, [dispatch]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Liked blogs</h1>
      <div className="mt-8"><BlogGrid blogs={likedBlogs} loading={loading} /></div>
    </div>
  );
}

export default function LikedBlogsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <RequireAuth><LikedBlogsList /></RequireAuth>
      <Footer />
    </div>
  );
}
