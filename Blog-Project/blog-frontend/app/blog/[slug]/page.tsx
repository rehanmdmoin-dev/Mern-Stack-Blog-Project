"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LikeButton from "@/components/blog/LikeButton";
import CommentSection from "@/components/blog/CommentSection";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBlogBySlug, clearCurrentBlog } from "@/redux/slice/blogSlice";
import { addToReadingHistory } from "@/redux/slice/profileSlice";
import { getName, getId } from "@/lib/getFieldValue";
import { formatDate } from "@/lib/formatDate";
import { getToken } from "@/lib/authCookies";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { currentBlog, loading } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogBySlug(params.slug));
    return () => { dispatch(clearCurrentBlog()); };
  }, [dispatch, params.slug]);

  useEffect(() => {
    if (currentBlog && getToken()) {
      dispatch(addToReadingHistory(currentBlog._id));
    }
  }, [dispatch, currentBlog]);

  if (loading || !currentBlog) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="py-24 text-center text-sm text-muted">{loading ? "Loading…" : "Blog not found."}</p>
        <Footer />
      </div>
    );
  }

  const author = currentBlog.author && typeof currentBlog.author === "object" ? currentBlog.author : null;
  const authorId = getId(currentBlog.author);
  const authorName = author?.name || "";
  const authorImage = author?.profileImage;

  return (
    <div className="min-h-screen">
      <Navbar />
      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <p className="eyebrow">{getName(currentBlog.category)}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink">{currentBlog.title}</h1>
        <p className="mt-4 text-lg text-muted">{currentBlog.description}</p>

        <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
          {authorId ? (
            <Link href={`/author/${authorId}`} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-accent-soft font-display text-sm font-semibold text-accent-dark">
                {authorImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={authorImage} alt={authorName} className="h-full w-full object-cover" />
                ) : (
                  authorName?.[0]?.toUpperCase()
                )}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{authorName}</span>
                <span className="block text-xs text-muted">{formatDate(currentBlog.publishedAt)} · {currentBlog.views} views</span>
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-accent-soft font-display text-sm font-semibold text-accent-dark">
                {authorName?.[0]?.toUpperCase() || "A"}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{authorName || "Unknown author"}</span>
                <span className="block text-xs text-muted">{formatDate(currentBlog.publishedAt)} · {currentBlog.views} views</span>
              </span>
            </div>
          )}
        </div>

        {currentBlog.featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentBlog.featuredImage} alt={currentBlog.title} className="mt-8 aspect-[16/9] w-full rounded-card object-cover" />
        )}

        <div className="prose-content mt-8 whitespace-pre-wrap">{currentBlog.content}</div>

        {currentBlog.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {currentBlog.tags.map((t: any) => (
              <Link key={typeof t === "string" ? t : t._id} href={`/blogs?tag=${typeof t === "string" ? t : t._id}`} className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-accent/40 hover:text-accent-dark">
                #{getName(t, "tag")}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center gap-3">
          <LikeButton blogId={currentBlog._id} likesCount={currentBlog.likesCount} />
          <span className="text-sm text-muted">{currentBlog.commentsCount} comments</span>
        </div>

        <CommentSection blogId={currentBlog._id} />
      </article>
      <Footer />
    </div>
  );
}
