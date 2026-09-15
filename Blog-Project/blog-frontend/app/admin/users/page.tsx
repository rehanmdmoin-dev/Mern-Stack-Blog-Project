"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUsers, toggleUserActive, deleteUser } from "@/redux/slice/userSlice";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { formatDate } from "@/lib/formatDate";

const roleFilters = ["", "admin", "author", "reader"];

export default function AdminUsersPage() {
  const dispatch = useAppDispatch();
  const { users, meta, loading } = useAppSelector((state) => state.user);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsers({ search: search || undefined, role: role || undefined, page, limit: 10 }));
  }, [dispatch, search, role, page]);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink lg:text-3xl">Users</h1>
      <p className="mt-1 text-sm text-muted">Manage every account on the platform.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name or email…"
          className="w-full max-w-xs rounded-control border border-border bg-surface px-3.5 py-2 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
        />
        <div className="flex flex-wrap gap-2">
          {roleFilters.map((r) => (
            <button
              key={r || "all"}
              onClick={() => { setRole(r); setPage(1); }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                role === r ? "border-accent bg-accent-soft text-accent-dark" : "border-border bg-surface text-muted hover:border-accent/40"
              }`}
            >
              {r || "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="py-16 text-center text-sm text-muted">Loading…</p>
        ) : users.length === 0 ? (
          <EmptyState title="No users found" />
        ) : (
          <div className="card divide-y divide-border">
            {users.map((u) => {
              const isSelf = u._id === currentUser?._id;
              return (
                <div key={u._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-ink">{u.name}</span>
                      <Badge status={u.role} />
                      {!u.isActive && <span className="text-xs font-medium text-danger">Deactivated</span>}
                    </div>
                    <p className="text-xs text-muted">{u.email} · joined {formatDate(u.createdAt)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!isSelf && (
                      <Button
                        variant={u.isActive ? "secondary" : "success"}
                        onClick={() => dispatch(toggleUserActive({ id: u._id, activate: !u.isActive }))}
                      >
                        {u.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    )}
                    {!isSelf && (
                      <Button variant="danger" onClick={() => setPendingDeleteId(u._id)}>Delete</Button>
                    )}
                    {isSelf && <span className="text-xs text-muted">This is you</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {meta && <Pagination page={meta.page} pages={meta.pages} onPageChange={setPage} />}

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete this user?"
        description="This permanently removes their account. This can't be undone."
        loading={false}
        onConfirm={async () => { if (pendingDeleteId) await dispatch(deleteUser(pendingDeleteId)); setPendingDeleteId(null); }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
