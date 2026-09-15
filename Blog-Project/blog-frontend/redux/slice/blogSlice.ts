"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: string;
  status: "draft" | "pending" | "published" | "rejected" | "unpublished";
  rejectionReason?: string;
  category: { _id: string; name: string; slug: string } | string;
  tags: ({ _id: string; name: string; slug: string } | string)[];
  author: { _id: string; name: string; profileImage?: string; email?: string } | string;
  views: number;
  likesCount: number;
  commentsCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

type Meta = { total: number; page: number; pages: number; limit: number } | null;

type BlogState = {
  blogs: Blog[];
  meta: Meta;
  currentBlog: Blog | null;
  loading: boolean;
  mutating: boolean;
};

const initialState: BlogState = { blogs: [], meta: null, currentBlog: null, loading: false, mutating: false };

export const fetchBlogs = createAsyncThunk(
  "blog/list",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.blogs.list, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load blogs.");
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "blog/bySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(`${endPoints.blogs.bySlug}/${slug}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Blog not found.");
    }
  }
);

export const fetchBlogByIdOwner = createAsyncThunk(
  "blog/byIdOwner",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(`${endPoints.blogs.byIdOwner}/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Blog not found.");
    }
  }
);

export const fetchMyBlogs = createAsyncThunk(
  "blog/mine",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.blogs.mine, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load your blogs.");
    }
  }
);

export const fetchAdminBlogs = createAsyncThunk(
  "blog/adminAll",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.blogs.adminAll, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load blogs.");
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create",
  async (payload: Record<string, any>, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.blogs.create, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to create blog.");
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ id, data }: { id: string; data: Record<string, any> }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.blogs.update}/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to update blog.");
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`${endPoints.blogs.remove}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to delete blog.");
    }
  }
);

export const softDeleteBlog = createAsyncThunk(
  "blog/softDelete",
  async (id: string, { rejectWithValue }) => {
    try {
      await AxiosInstance.put(`${endPoints.blogs.softDelete}/${id}/soft-delete`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to delete blog.");
    }
  }
);

export const submitBlog = createAsyncThunk(
  "blog/submit",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.blogs.submit}/${id}/submit`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to submit blog.");
    }
  }
);

export const publishBlog = createAsyncThunk(
  "blog/publish",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.blogs.publish}/${id}/publish`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to publish blog.");
    }
  }
);

export const rejectBlog = createAsyncThunk(
  "blog/reject",
  async ({ id, reason }: { id: string; reason?: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.blogs.reject}/${id}/reject`, { reason });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to reject blog.");
    }
  }
);

export const unpublishBlog = createAsyncThunk(
  "blog/unpublish",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.blogs.unpublish}/${id}/unpublish`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to unpublish blog.");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearCurrentBlog: (state) => { state.currentBlog = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => { state.loading = true; })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.blogs = payload.data; state.meta = payload.meta || null; }
      })
      .addCase(fetchBlogs.rejected, (state) => { state.loading = false; })

      .addCase(fetchMyBlogs.pending, (state) => { state.loading = true; })
      .addCase(fetchMyBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.blogs = payload.data; state.meta = payload.meta || null; }
      })
      .addCase(fetchMyBlogs.rejected, (state) => { state.loading = false; })

      .addCase(fetchAdminBlogs.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.blogs = payload.data; state.meta = payload.meta || null; }
      })
      .addCase(fetchAdminBlogs.rejected, (state) => { state.loading = false; })

      .addCase(fetchBlogBySlug.pending, (state) => { state.loading = true; state.currentBlog = null; })
      .addCase(fetchBlogBySlug.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) state.currentBlog = payload.data;
      })
      .addCase(fetchBlogBySlug.rejected, (state) => { state.loading = false; })

      .addCase(fetchBlogByIdOwner.pending, (state) => { state.loading = true; state.currentBlog = null; })
      .addCase(fetchBlogByIdOwner.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) state.currentBlog = payload.data;
      })
      .addCase(fetchBlogByIdOwner.rejected, (state) => { state.loading = false; })

      .addCase(createBlog.pending, (state) => { state.mutating = true; })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.mutating = false;
        if (payload.status) toast.success("Blog created");
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.mutating = false;
        toast.error((action.payload as string) || "Unable to create blog.");
      })

      .addCase(updateBlog.pending, (state) => { state.mutating = true; })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        state.mutating = false;
        if (payload.status) { state.currentBlog = payload.data; toast.success("Blog updated"); }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.mutating = false;
        toast.error((action.payload as string) || "Unable to update blog.");
      })

      .addMatcher(
        (action) => [deleteBlog.fulfilled.type, softDeleteBlog.fulfilled.type].includes(action.type),
        (state, action: any) => {
          state.blogs = state.blogs.filter((b) => b._id !== action.payload);
          toast.success("Blog deleted");
        }
      )
      .addMatcher(
        (action) => [deleteBlog.rejected.type, softDeleteBlog.rejected.type].includes(action.type),
        (state, action: any) => {
          toast.error((action.payload as string) || "Unable to delete blog.");
        }
      )

      .addMatcher(
        (action) =>
          [submitBlog.fulfilled.type, publishBlog.fulfilled.type, rejectBlog.fulfilled.type, unpublishBlog.fulfilled.type].includes(
            action.type
          ),
        (state, action: any) => {
          const updated = action.payload.data;
          state.blogs = state.blogs.map((b) => (b._id === updated._id ? updated : b));
          if (state.currentBlog?._id === updated._id) state.currentBlog = updated;
          toast.success(action.payload.message || "Updated");
        }
      )
      .addMatcher(
        (action) =>
          [submitBlog.rejected.type, publishBlog.rejected.type, rejectBlog.rejected.type, unpublishBlog.rejected.type].includes(
            action.type
          ),
        (state, action: any) => {
          toast.error((action.payload as string) || "Action failed.");
        }
      );
  },
});

export const { clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;
