"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as yup from "yup";
import { forgotPassword } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

const schema = yup.object({ email: yup.string().email("Enter a valid email").required("Email is required") });
type FormValues = yup.InferType<typeof schema>;

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      reset();
    } catch {
      // toast already shown
    }
  };

  return (
    <AuthLayout
      eyebrow="Reset access"
      title="Forgot your password?"
      subtitle="Enter your account email and we'll send a reset link."
      footer={<Link href="/auth/signIn" className="font-semibold text-accent hover:underline">Back to sign in</Link>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input label="Email address" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
        <Button type="submit" loading={loading} className="w-full">Send reset link</Button>
        {isSubmitSuccessful && (
          <p className="rounded-control bg-accent-soft px-4 py-3 text-center text-sm text-accent-dark">
            If that email is registered, a reset link has been sent.
          </p>
        )}
      </form>
    </AuthLayout>
  );
}
