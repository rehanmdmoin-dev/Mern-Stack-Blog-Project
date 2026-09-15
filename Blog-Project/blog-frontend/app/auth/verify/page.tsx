"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import * as yup from "yup";
import { toast } from "sonner";
import { resendVerification, verifyEmail } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

const schema = yup.object({
  otp: yup.string().matches(/^\d{6}$/, "Enter the 6-digit code").required("Verification code is required"),
});

type FormValues = yup.InferType<typeof schema>;

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async ({ otp }: FormValues) => {
    try {
      const result = await dispatch(verifyEmail({ email, otp })).unwrap();
      if (result.status) {
        const role = result.data.user.role;
        router.push(role === "admin" ? "/admin" : role === "author" ? "/dashboard" : "/");
      }
    } catch {
      // The auth slice displays the API error.
    }
  };

  const resend = () => {
    if (email) {
      dispatch(resendVerification({ email })).unwrap().then((result) => {
        if (result.data?.devOtp) toast.info(`Development verification code: ${result.data.devOtp}`);
      }).catch(() => undefined);
    }
  };

  return (
    <AuthLayout
      eyebrow="One last step"
      title="Verify your email"
      subtitle={`Enter the code sent to ${email || "your email address"}.`}
      footer={<>Already verified? <Link href="/auth/signIn" className="font-semibold text-accent hover:underline">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input label="6-digit verification code" inputMode="numeric" autoComplete="one-time-code" placeholder="123456" {...register("otp")} error={errors.otp?.message} />
        <Button type="submit" loading={loading} className="w-full">Verify email</Button>
        <button type="button" onClick={resend} disabled={!email || loading} className="w-full text-sm font-semibold text-accent hover:underline disabled:cursor-not-allowed disabled:opacity-50">
          Resend code
        </button>
      </form>
    </AuthLayout>
  );
}

export default function VerifyPage() {
  return <Suspense fallback={null}><VerifyForm /></Suspense>;
}
