"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createBlog } from "@/redux/slice/blogSlice";
import BlogForm, { type BlogFormValues } from "@/components/author/BlogForm";

export default function CreateBlogPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mutating = useAppSelector((state) => state.blog.mutating);

  const submit = async (data: BlogFormValues, saveAsDraft: boolean) => {
    try {
      const res = await dispatch(createBlog({ ...data, saveAsDraft })).unwrap();
      if (res.status) router.push("/dashboard/blogs");
    } catch {
      // toast already shown by the slice
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Write a new blog</h1>
      <p className="mt-1 text-sm text-muted">Save it as a draft, or submit it straight for admin review.</p>

      <div className="mt-8 card max-w-3xl p-6 sm:p-8">
        <BlogForm
          actions={[
            { label: "Save as draft", variant: "ghost", loading: mutating, onSubmit: (data) => submit(data, true) },
            { label: "Submit for review", loading: mutating, onSubmit: (data) => submit(data, false) },
          ]}
        />
      </div>
    </div>
  );
}
