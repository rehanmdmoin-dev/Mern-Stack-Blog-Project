"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchLikeStatus, likeBlog, unlikeBlog } from "@/redux/slice/likeSlice";
import { getToken } from "@/lib/authCookies";

export default function LikeButton({ blogId, likesCount }: { blogId: string; likesCount: number }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const liked = useAppSelector((state) => state.like.likedByBlogId[blogId]);
  const [count, setCount] = useState(likesCount);

  useEffect(() => {
    if (getToken()) dispatch(fetchLikeStatus(blogId));
  }, [dispatch, blogId]);

  const handleClick = async () => {
    if (!getToken()) {
      router.push("/auth/signIn");
      return;
    }
    if (liked) {
      const res: any = await dispatch(unlikeBlog(blogId));
      if (res.payload?.status) setCount((c) => Math.max(0, c - 1));
    } else {
      const res: any = await dispatch(likeBlog(blogId));
      if (res.payload?.status) setCount((c) => c + 1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
        liked ? "border-accent bg-accent-soft text-accent-dark" : "border-border bg-surface text-ink hover:border-accent/40"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
      </svg>
      {liked ? "Liked" : "Like"} · {count}
    </button>
  );
}
