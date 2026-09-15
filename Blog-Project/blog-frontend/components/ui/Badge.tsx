const statusMap: Record<string, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-black/5 text-muted" },
  pending: { label: "Pending review", className: "bg-info-soft text-info" },
  published: { label: "Published", className: "bg-success-soft text-success" },
  rejected: { label: "Rejected", className: "bg-danger-soft text-danger" },
  unpublished: { label: "Unpublished", className: "bg-black/5 text-muted" },
  approved: { label: "Approved", className: "bg-success-soft text-success" },
  hidden: { label: "Hidden", className: "bg-black/5 text-muted" },
  admin: { label: "Admin", className: "bg-accent-soft text-accent-dark" },
  author: { label: "Author", className: "bg-info-soft text-info" },
  reader: { label: "Reader", className: "bg-black/5 text-muted" },
};

export default function Badge({ status }: { status: string }) {
  const cfg = statusMap[status] || { label: status, className: "bg-black/5 text-muted" };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
