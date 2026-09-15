"use client";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategories, createCategory, updateCategory, deleteCategory, toggleCategoryActive } from "@/redux/slice/categorySlice";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const schema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  description: yup.string().optional(),
});
type FormValues = yup.InferType<typeof schema>;

export default function AdminCategoriesPage() {
  const dispatch = useAppDispatch();
  const { categories, loading, mutating } = useAppSelector((state) => state.category);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  useEffect(() => { dispatch(fetchCategories({})); }, [dispatch]);

  const onSubmit = async (data: FormValues) => {
    if (editingId) {
      await dispatch(updateCategory({ id: editingId, data }));
      setEditingId(null);
    } else {
      await dispatch(createCategory(data));
    }
    reset({ name: "", description: "" });
  };

  const startEdit = (cat: any) => {
    setEditingId(cat._id);
    reset({ name: cat.name, description: cat.description });
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Categories</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card divide-y divide-border">
          {loading && <p className="p-6 text-center text-sm text-muted">Loading…</p>}
          {!loading && categories.length === 0 && <p className="p-6 text-center text-sm text-muted">No categories yet.</p>}
          {categories.map((c) => (
            <div key={c._id} className="flex items-center justify-between p-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">{c.name}</span>
                  {!c.isActive && <span className="text-xs font-medium text-muted">Inactive</span>}
                </div>
                {c.description && <p className="text-sm text-muted">{c.description}</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => startEdit(c)}>Edit</Button>
                <Button variant="ghost" onClick={() => dispatch(toggleCategoryActive({ id: c._id, activate: !c.isActive }))}>
                  {c.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="danger" onClick={() => setPendingDeleteId(c._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-5">
          <h2 className="font-display text-lg text-ink">{editingId ? "Edit category" : "New category"}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
            <Input label="Name" {...register("name")} error={errors.name?.message} />
            <Input label="Description" {...register("description")} error={errors.description?.message} />
            <div className="flex gap-2">
              <Button type="submit" loading={mutating}>{editingId ? "Save" : "Create"}</Button>
              {editingId && <Button type="button" variant="ghost" onClick={() => { setEditingId(null); reset({ name: "", description: "" }); }}>Cancel</Button>}
            </div>
          </form>
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete this category?"
        loading={mutating}
        onConfirm={async () => { if (pendingDeleteId) await dispatch(deleteCategory(pendingDeleteId)); setPendingDeleteId(null); }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
