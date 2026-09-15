import DashboardShell from "@/components/layout/DashboardShell";

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="author">{children}</DashboardShell>;
}
