import Link from "next/link";

export default function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-14">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-xl text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white font-bold">L</span>
          The Ledger
        </Link>

        <p className="eyebrow text-center">{eyebrow}</p>
        <h1 className="mt-2 text-center font-display text-3xl text-ink">{title}</h1>
        {subtitle && <p className="mt-2 text-center text-sm text-muted">{subtitle}</p>}

        <div className="mt-8 card p-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
      </div>
    </div>
  );
}
