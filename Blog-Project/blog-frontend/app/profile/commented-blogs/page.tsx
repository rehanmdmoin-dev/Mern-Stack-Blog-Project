"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
import BlogGrid from "@/components/blog/BlogGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCommentedBlogs } from "@/redux/slice/profileSlice";

function CommentedBlogsList() {
  const dispatch = useAppDispatch();
  const { commentedBlogs, loading } = useAppSelector((state) => state.profile);

  useEffect(() => { dispatch(fetchCommentedBlogs({})); }, [dispatch]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Blogs you've commented on</h1>
      <div className="mt-8"><BlogGrid blogs={commentedBlogs} loading={loading} /></div>
    </div>
  );
}

export default function CommentedBlogsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <RequireAuth><CommentedBlogsList /></RequireAuth>
      <Footer />
    </div>
  );
}
