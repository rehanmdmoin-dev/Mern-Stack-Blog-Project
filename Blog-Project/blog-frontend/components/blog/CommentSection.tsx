"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addComment, deleteComment, fetchCommentsForBlog, updateComment } from "@/redux/slice/commentSlice";
import { formatDateTime } from "@/lib/formatDate";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { getToken } from "@/lib/authCookies";
import Link from "next/link";

export default function CommentSection({ blogId }: { blogId: string }) {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector((state) => state.comment);
  const user = useAppSelector((state) => state.auth.user);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    dispatch(fetchCommentsForBlog({ blogId }));
  }, [dispatch, blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    await dispatch(addComment({ blogId, content }));
    setContent("");
  };

  const startEdit = (id: string, current: string) => {
    setEditingId(id);
    setEditContent(current);
  };

  const saveEdit = async (id: string) => {
    await dispatch(updateComment({ id, content: editContent }));
    setEditingId(null);
  };

  return (
    <div className="mt-12">
      <h2 className="font-display text-xl text-ink">Comments</h2>

      {getToken() ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Textarea label="" placeholder="Share your thoughts…" value={content} onChange={(e) => setContent(e.target.value)} />
          <Button type="submit">Post comment</Button>
        </form>
      ) : (
        <p className="mt-4 rounded-control bg-accent-soft/50 px-4 py-3 text-sm text-ink">
          <Link href="/auth/signIn" className="font-semibold text-accent-dark hover:underline">Sign in</Link> to join the conversation.
        </p>
      )}

      <div className="mt-6 space-y-5">
        {loading && <p className="text-sm text-muted">Loading comments…</p>}
        {!loading && comments.length === 0 && <p className="text-sm text-muted">No comments yet — be the first to say something.</p>}

        {comments.map((c) => {
          const isOwner = user && user._id === c.author?._id;
          return (
            <div key={c._id} className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-dark">
                    {c.author?.name?.[0]?.toUpperCase() || "?"}
                  </span>
                  <span className="text-sm font-semibold text-ink">{c.author?.name}</span>
                  <span className="text-xs text-muted">{formatDateTime(c.createdAt)}</span>
                  {c.status !== "approved" && <span className="text-xs text-muted">({c.status})</span>}
                </div>
                {isOwner && (
                  <div className="flex gap-3 text-xs">
                    <button onClick={() => startEdit(c._id, c.content)} className="text-muted hover:text-ink cursor-pointer">Edit</button>
                    <button onClick={() => dispatch(deleteComment(c._id))} className="text-danger cursor-pointer">Delete</button>
                  </div>
                )}
              </div>

              {editingId === c._id ? (
                <div className="mt-2 space-y-2">
                  <Textarea label="" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                  <div className="flex gap-2">
                    <Button onClick={() => saveEdit(c._id)}>Save</Button>
                    <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-ink">{c.content}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
