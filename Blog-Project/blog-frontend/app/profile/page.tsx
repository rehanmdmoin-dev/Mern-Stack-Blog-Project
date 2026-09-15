"use client";

import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
import { Input, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfile } from "@/redux/slice/profileSlice";
import { fetchMe } from "@/redux/slice/authSlice";
import { uploadImage } from "@/lib/cloudinary";
import { toast } from "sonner";

const schema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  bio: yup.string().max(500, "Bio must be under 500 characters").optional(),
  profileImage: yup.mixed<FileList>().optional(),
});
type FormValues = yup.InferType<typeof schema>;

function ProfileForm() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const mutating = useAppSelector((state) => state.profile.mutating);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (user) reset({ name: user.name, bio: user.bio || "" });
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const file = data.profileImage?.[0];
      const profileImage = file ? await uploadImage(file, "profiles") : user?.profileImage;
      await dispatch(updateProfile({ name: data.name, bio: data.bio, profileImage }));
      dispatch(fetchMe());
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Image upload failed");
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-3xl text-ink">Your profile</h1>
      <div className="mt-8 card p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input label="Full name" {...register("name")} error={errors.name?.message} />
          <Textarea label="Bio" placeholder="A short bio…" {...register("bio")} error={errors.bio?.message} />
          <Input label="Profile image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" {...register("profileImage")} error={errors.profileImage?.message as string | undefined} />
          <div className="text-sm text-muted">Email: {user?.email} · Role: {user?.role}</div>
          <Button type="submit" loading={mutating}>Save changes</Button>
        </form>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <RequireAuth><ProfileForm /></RequireAuth>
      <Footer />
    </div>
  );
}
