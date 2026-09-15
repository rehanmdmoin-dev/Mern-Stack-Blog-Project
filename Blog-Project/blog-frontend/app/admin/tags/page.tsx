"use client";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTags, createTag, updateTag, deleteTag } from "@/redux/slice/tagSlice";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const schema = yup.object({ name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required") });
type FormValues = yup.InferType<typeof schema>;

export default function AdminTagsPage() {
  const dispatch = useAppDispatch();
  const { tags, loading, mutating } = useAppSelector((state) => state.tag);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  useEffect(() => { dispatch(fetchTags()); }, [dispatch]);

  const onSubmit = async (data: FormValues) => {
    if (editingId) { await dispatch(updateTag({ id: editingId, name: data.name })); setEditingId(null); }
    else { await dispatch(createTag(data)); }
    reset({ name: "" });
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Tags</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card flex flex-wrap gap-2 p-5">
          {loading && <p className="text-sm text-muted">Loading…</p>}
          {!loading && tags.length === 0 && <p className="text-sm text-muted">No tags yet.</p>}
          {tags.map((t) => (
            <div key={t._id} className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
              <span className="text-sm text-ink">#{t.name}</span>
              <button onClick={() => { setEditingId(t._id); reset({ name: t.name }); }} className="text-xs text-muted hover:text-ink cursor-pointer">Edit</button>
              <button onClick={() => setPendingDeleteId(t._id)} className="text-xs text-danger cursor-pointer">✕</button>
            </div>
          ))}
        </div>

        <div className="card p-5">
          <h2 className="font-display text-lg text-ink">{editingId ? "Edit tag" : "New tag"}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
            <Input label="Name" {...register("name")} error={errors.name?.message} />
            <div className="flex gap-2">
              <Button type="submit" loading={mutating}>{editingId ? "Save" : "Create"}</Button>
              {editingId && <Button type="button" variant="ghost" onClick={() => { setEditingId(null); reset({ name: "" }); }}>Cancel</Button>}
            </div>
          </form>
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete this tag?"
        loading={mutating}
        onConfirm={async () => { if (pendingDeleteId) await dispatch(deleteTag(pendingDeleteId)); setPendingDeleteId(null); }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
