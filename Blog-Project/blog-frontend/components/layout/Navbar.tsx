"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMe, logout } from "@/redux/slice/authSlice";
import { getToken } from "@/lib/authCookies";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (getToken() && !user) dispatch(fetchMe());
  }, [dispatch, user]);

  const handleLogout = async () => {
    await dispatch(logout());
    setMenuOpen(false);
    router.push("/");
  };

  const dashboardHref = user?.role === "admin" ? "/admin" : user?.role === "author" ? "/dashboard" : null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="font-display text-xl text-ink">
          The Ledger
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          <Link href="/blogs" className="hover:text-ink">Explore</Link>
          <Link href="/blogs?sort=most-viewed" className="hover:text-ink">Popular</Link>
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/auth/signIn" className="text-sm font-medium text-ink hover:text-accent">Sign in</Link>
              <Link href="/auth/signup"><Button className="text-sm">Get started</Button></Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3 hover:border-accent/40"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent-dark">
                  {user.name?.trim()?.[0]?.toUpperCase() || "?"}
                </span>
                <span className="hidden text-sm font-medium text-ink sm:block">{user.name}</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-card border border-border bg-surface p-2 shadow-lg" onMouseLeave={() => setMenuOpen(false)}>
                  {dashboardHref && (
                    <Link href={dashboardHref} className="block rounded-control px-3 py-2 text-sm hover:bg-black/5" onClick={() => setMenuOpen(false)}>
                      {user.role === "admin" ? "Admin dashboard" : "Author dashboard"}
                    </Link>
                  )}
                  <Link href="/profile" className="block rounded-control px-3 py-2 text-sm hover:bg-black/5" onClick={() => setMenuOpen(false)}>
                    My profile
                  </Link>
                  <Link href="/profile/liked-blogs" className="block rounded-control px-3 py-2 text-sm hover:bg-black/5" onClick={() => setMenuOpen(false)}>
                    Liked blogs
                  </Link>
                  <Link href="/profile/reading-history" className="block rounded-control px-3 py-2 text-sm hover:bg-black/5" onClick={() => setMenuOpen(false)}>
                    Reading history
                  </Link>
                  <button onClick={handleLogout} className="block w-full rounded-control px-3 py-2 text-left text-sm text-danger hover:bg-danger-soft">
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
