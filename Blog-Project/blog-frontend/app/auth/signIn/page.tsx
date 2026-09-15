"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import * as yup from "yup";
import { loginUser } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
type FormValues = yup.InferType<typeof schema>;

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      if (res.status) {
        const next = searchParams.get("next");
        const role = res.data.user.role;
        router.push(next || (role === "admin" ? "/admin" : role === "author" ? "/dashboard" : "/"));
      }
    } catch {
      // toast already shown by the slice
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in"
      subtitle="Pick up right where you left off."
      footer={<>New here? <Link href="/auth/signup" className="font-semibold text-accent hover:underline">Create an account</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input label="Email address" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
        <Input label="Password" type="password" placeholder="Your password" {...register("password")} error={errors.password?.message} />
        <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-xs font-medium text-accent hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" loading={loading} className="w-full">Sign in</Button>
      </form>
    </AuthLayout>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
