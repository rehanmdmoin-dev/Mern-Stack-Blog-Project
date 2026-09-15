"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMe, logout } from "@/redux/slice/authSlice";
import { getRole, getToken } from "@/lib/authCookies";

type NavItem = { href: string; label: string };

const authorNav: NavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/blogs", label: "My blogs" },
  { href: "/dashboard/blogs/create", label: "Write" },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/tags", label: "Tags" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function DashboardShell({
  role,
  children,
}: {
  role: "author" | "admin";
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const nav = role === "admin" ? adminNav : authorNav;

  useEffect(() => {
    const token = getToken();
    const cookieRole = getRole();
    if (!token) {
      router.replace(`/auth/signIn?next=${pathname}`);
      return;
    }
    if (cookieRole && cookieRole !== role) {
      router.replace("/");
      return;
    }
    if (!user) dispatch(fetchMe());
  }, [dispatch, router, pathname, role, user]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/auth/signIn");
  };

  const isActive = (href: string) => (href === `/${role}` ? pathname === href : pathname.startsWith(href));

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col p-4 lg:flex">
        <div className="card flex h-full flex-col p-5">
          <Link href="/" className="mb-8 flex items-center gap-2 px-2 font-display text-xl text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white font-bold">L</span>
            The Ledger
          </Link>

          <p className="eyebrow mb-2 px-2">{role === "admin" ? "Admin" : "Author"}</p>

          <nav className="flex flex-1 flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-control px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "bg-accent-soft text-accent-dark before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-full before:bg-accent" : "text-muted hover:bg-black/5 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 space-y-1 border-t border-border pt-4">
            <Link href="/" className="block rounded-control px-3 py-2 text-sm text-muted hover:bg-black/5 hover:text-ink">
              View public site
            </Link>
            <button onClick={handleLogout} className="block w-full rounded-control px-3 py-2 text-left text-sm text-muted hover:bg-danger-soft hover:text-danger cursor-pointer">
              Log out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
          <Link href="/" className="font-display text-lg text-ink">The Ledger</Link>
          <nav className="flex items-center gap-3 overflow-x-auto text-sm font-medium text-muted">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "text-accent" : ""}>
                {item.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="text-danger">Log out</button>
          </nav>
        </div>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
