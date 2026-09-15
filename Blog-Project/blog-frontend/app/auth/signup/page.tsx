"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from "yup";
import { toast } from "sonner";
import { registerUser } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input, Select } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

const schema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.mixed<"admin" | "author" | "reader">().oneOf(["admin", "author", "reader"]).required(),
});

type FormValues = yup.InferType<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { role: "reader" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();
      if (res.status) {
        if (res.data?.devOtp) toast.info(`Development verification code: ${res.data.devOtp}`);
        router.push(`/auth/verify?email=${encodeURIComponent(data.email)}`);
      }
    } catch {
      // toast already shown by the slice
    }
  };

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      subtitle="Join as a reader, or apply to write."
      footer={<>Already have an account? <Link href="/auth/signIn" className="font-semibold text-accent hover:underline">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input label="Full name" placeholder="Jordan Avery" {...register("name")} error={errors.name?.message} />
        <Input label="Email address" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
        <Input label="Password" type="password" placeholder="At least 6 characters" {...register("password")} error={errors.password?.message} />
        <Select label="I want to" {...register("role")} error={errors.role?.message}>
          <option value="reader">Read and comment (Reader)</option>
          <option value="author">Write blogs (Author)</option>
          <option value="admin">Manage the entire platform (Admin)</option>
        </Select>

        <Button type="submit" loading={loading} className="mt-2 w-full">Create account</Button>
      </form>
    </AuthLayout>
  );
}
