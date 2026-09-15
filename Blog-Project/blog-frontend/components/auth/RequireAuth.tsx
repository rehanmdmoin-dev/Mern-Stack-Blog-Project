"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMe } from "@/redux/slice/authSlice";
import { getToken } from "@/lib/authCookies";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!getToken()) {
      router.replace(`/auth/signIn?next=${pathname}`);
      return;
    }
    if (!user) dispatch(fetchMe());
  }, [dispatch, router, pathname, user]);

  if (!getToken()) return null;
  return <>{children}</>;
}
