"use client";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchTags } from "@/redux/slice/tagSlice";
import { Input, Select, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import type { Blog } from "@/redux/slice/blogSlice";
import { getId } from "@/lib/getFieldValue";
import { uploadImage } from "@/lib/cloudinary";
import { toast } from "sonner";

const schema = yup.object({
  title: yup.string().min(4, "Title must be at least 4 characters").required("Title is required"),
  description: yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
  content: yup.string().min(50, "Content must be at least 50 characters").required("Content is required"),
  category: yup.string().required("Category is required"),
  featuredImage: yup.mixed<FileList>().optional(),
});

type FormValues = yup.InferType<typeof schema>;
export type BlogFormValues = Omit<FormValues, "featuredImage"> & { featuredImage?: string; tags: string[] };

type Action = { label: string; variant?: "primary" | "ghost"; loading?: boolean; onSubmit: (data: BlogFormValues) => void | Promise<void> };

export default function BlogForm({
  initialValues,
  actions,
}: {
  initialValues?: Partial<Blog>;
  actions: Action[];
}) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { tags } = useAppSelector((state) => state.tag);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialValues?.tags?.map((t: any) => getId(t)) || []
  );

  useEffect(() => {
    dispatch(fetchCategories({ isActive: true }));
    dispatch(fetchTags());
  }, [dispatch]);

  const { register, handleSubmit, formState: { errors } } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      content: initialValues?.content || "",
      category: getId(initialValues?.category) || "",
    },
  });

  const toggleTag = (id: string) => {
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const runAction = (action: Action) => handleSubmit(async (data) => {
    try {
      const file = data.featuredImage?.[0];
      const imageUrl = file ? await uploadImage(file, "blogs") : initialValues?.featuredImage || "";
      await action.onSubmit({ ...data, featuredImage: imageUrl, tags: selectedTags });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Image upload failed");
    }
  })();

  return (
    <form className="space-y-5" noValidate onSubmit={(e) => e.preventDefault()}>
      <Input label="Title" placeholder="An interesting headline" {...register("title")} error={errors.title?.message} />
      <Textarea label="Description" placeholder="A short summary shown on blog cards" {...register("description")} error={errors.description?.message} />
      <Textarea label="Content" placeholder="Write your blog…" className="min-h-[280px]" {...register("content")} error={errors.content?.message} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Category" {...register("category")} error={errors.category?.message}>
          <option value="">Select a category</option>
          <option value="">Technology</option>
          <option value="">Home Appliance</option>
          
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </Select>
        <Input label="Featured image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" {...register("featuredImage")} error={errors.featuredImage?.message as string | undefined} />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink">Tags</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t._id}
              type="button"
              onClick={() => toggleTag(t._id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTags.includes(t._id) ? "border-accent bg-accent-soft text-accent-dark" : "border-border bg-surface text-muted hover:border-accent/40"
              }`}
            >
              #{t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-border pt-5">
        {actions.map((action) => (
          <Button key={action.label} type="button" variant={action.variant || "primary"} loading={action.loading} onClick={() => runAction(action)}>
            {action.label}
          </Button>
        ))}
      </div>
    </form>
  );
}
