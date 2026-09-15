import type { Blog } from "@/redux/slice/blogSlice";
import BlogCard from "./BlogCard";
import EmptyState from "@/components/ui/EmptyState";

export default function BlogGrid({ blogs, loading }: { blogs: Blog[]; loading: boolean }) {
  if (loading) return <p className="py-16 text-center text-sm text-muted">Loading blogs…</p>;
  if (blogs.length === 0) return <EmptyState title="No blogs found" description="Try a different search or filter." />;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((b) => <BlogCard key={b._id} blog={b} />)}
    </div>
  );
}
