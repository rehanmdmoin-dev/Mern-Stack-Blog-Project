"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import * as yup from "yup";
import { resetPassword } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

const schema = yup.object({
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm your password"),
});
type FormValues = yup.InferType<typeof schema>;

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await dispatch(resetPassword({ token: params.token, password: data.password })).unwrap();
      router.push("/auth/signIn");
    } catch {
      // toast already shown
    }
  };

  return (
    <AuthLayout eyebrow="Reset access" title="Choose a new password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input label="New password" type="password" placeholder="At least 6 characters" {...register("password")} error={errors.password?.message} />
        <Input label="Confirm new password" type="password" placeholder="Repeat your password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
        <Button type="submit" loading={loading} className="w-full">Reset password</Button>
      </form>
    </AuthLayout>
  );
}
