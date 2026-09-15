import Link from "next/link";
import type { Blog } from "@/redux/slice/blogSlice";
import { getName } from "@/lib/getFieldValue";
import { formatDate } from "@/lib/formatDate";

export default function BlogCard({ blog }: { blog: Blog }) {
  const authorName = blog.author && typeof blog.author === "object" ? blog.author.name : "";
  const categoryName = getName(blog.category);

  return (
    <Link href={`/blog/${blog.slug}`} className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/5">
      <div className="aspect-[16/9] w-full overflow-hidden bg-accent-soft/40">
        {blog.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={blog.featuredImage} alt={blog.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-2xl text-accent-dark/30">The Ledger</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {categoryName && <p className="eyebrow">{categoryName}</p>}
        <h3 className="mt-1 font-display text-lg leading-snug text-ink">{blog.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{blog.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
          <span>{authorName}</span>
          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
