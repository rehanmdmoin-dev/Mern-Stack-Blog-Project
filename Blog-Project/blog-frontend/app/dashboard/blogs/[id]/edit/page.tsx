"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBlogByIdOwner, updateBlog, submitBlog, clearCurrentBlog } from "@/redux/slice/blogSlice";
import BlogForm, { type BlogFormValues } from "@/components/author/BlogForm";
import Badge from "@/components/ui/Badge";

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentBlog, loading, mutating } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogByIdOwner(params.id));
    return () => { dispatch(clearCurrentBlog()); };
  }, [dispatch, params.id]);

  const handleSave = async (data: BlogFormValues) => {
    try {
      await dispatch(updateBlog({ id: params.id, data })).unwrap();
      router.push("/dashboard/blogs");
    } catch {
      // toast already shown
    }
  };

  const handleSubmitForReview = async () => {
    await dispatch(submitBlog(params.id));
    router.push("/dashboard/blogs");
  };

  if (loading || !currentBlog) {
    return <p className="py-16 text-center text-sm text-muted">{loading ? "Loading…" : "Blog not found."}</p>;
  }

  const actions = [{ label: "Save changes", loading: mutating, onSubmit: handleSave }];

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl text-ink lg:text-3xl">Edit blog</h1>
        <Badge status={currentBlog.status} />
      </div>

      {["draft", "rejected"].includes(currentBlog.status) && (
        <p className="mt-2 text-sm text-muted">
          This blog isn't published yet.{" "}
          <button onClick={handleSubmitForReview} className="font-semibold text-accent hover:underline cursor-pointer">
            Submit it for review
          </button>{" "}
          once you're happy with it.
        </p>
      )}

      <div className="mt-8 card max-w-3xl p-6 sm:p-8">
        <BlogForm initialValues={currentBlog} actions={actions} />
      </div>
    </div>
  );
}
