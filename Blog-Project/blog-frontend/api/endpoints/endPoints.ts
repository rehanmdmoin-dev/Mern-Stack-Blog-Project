// Every path is relative to NEXT_PUBLIC_API_URL, and mirrors
// blog-management-system/app/routes/api/*.js exactly.
export const endPoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    verifyEmail: "/auth/verify-email",
    resendVerification: "/auth/resend-verification",
    me: "/auth/me",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password", // + /:token
  },
  users: {
    list: "/users",
    byId: "/users", // + /:id
    activate: "/users", // + /:id/activate
    deactivate: "/users", // + /:id/deactivate
    remove: "/users", // + /:id
  },
  categories: {
    list: "/categories",
    create: "/categories",
    update: "/categories", // + /:id
    remove: "/categories", // + /:id
    activate: "/categories", // + /:id/activate
    deactivate: "/categories", // + /:id/deactivate
  },
  tags: {
    list: "/tags",
    create: "/tags",
    update: "/tags", // + /:id
    remove: "/tags", // + /:id
  },
  blogs: {
    list: "/blogs",
    mine: "/blogs/mine",
    adminAll: "/blogs/admin/all",
    byIdOwner: "/blogs/id", // + /:id
    bySlug: "/blogs", // + /:slug
    create: "/blogs",
    update: "/blogs", // + /:id
    remove: "/blogs", // + /:id
    softDelete: "/blogs", // + /:id/soft-delete
    submit: "/blogs", // + /:id/submit
    publish: "/blogs", // + /:id/publish
    reject: "/blogs", // + /:id/reject
    unpublish: "/blogs", // + /:id/unpublish
  },
  comments: {
    forBlog: "/blogs", // + /:blogId/comments
    all: "/comments", // admin — every comment across every blog
    update: "/comments", // + /:id
    remove: "/comments", // + /:id
    moderate: "/comments", // + /:id/status
  },
  likes: {
    like: "/blogs", // + /:blogId/like
    status: "/blogs", // + /:blogId/like/status
  },
  profile: {
    update: "/profile",
    likedBlogs: "/profile/liked-blogs",
    commentedBlogs: "/profile/commented-blogs",
    readingHistory: "/profile/reading-history",
    addReadingHistory: "/profile/reading-history", // + /:blogId
  },
  authors: {
    byId: "/authors", // + /:id
  },
  dashboard: {
    author: "/dashboard/author",
    admin: "/dashboard/admin",
    trend: "/dashboard/analytics/trend",
    categories: "/dashboard/analytics/categories",
    tags: "/dashboard/analytics/tags",
    blogPerformance: "/dashboard/analytics/blog-performance",
    authors: "/dashboard/analytics/authors",
    activeReaders: "/dashboard/analytics/active-readers",
    topCommenters: "/dashboard/analytics/top-commenters",
  },
};
