"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

export type Comment = {
  _id: string;
  blog: string | { _id: string; title: string; slug: string };
  author: { _id: string; name: string; email?: string; profileImage?: string };
  content: string;
  status: "approved" | "rejected" | "hidden";
  createdAt: string;
};

type CommentState = { comments: Comment[]; meta: any; loading: boolean; mutating: boolean };
const initialState: CommentState = { comments: [], meta: null, loading: false, mutating: false };

export const fetchCommentsForBlog = createAsyncThunk(
  "comment/forBlog",
  async ({ blogId, params }: { blogId: string; params?: Record<string, any> }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(`${endPoints.comments.forBlog}/${blogId}/comments`, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load comments.");
    }
  }
);

export const fetchAllComments = createAsyncThunk(
  "comment/all",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.comments.all, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load comments.");
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/add",
  async ({ blogId, content }: { blogId: string; content: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(`${endPoints.comments.forBlog}/${blogId}/comments`, { content });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to post comment.");
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/update",
  async ({ id, content }: { id: string; content: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.comments.update}/${id}`, { content });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to update comment.");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`${endPoints.comments.remove}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to delete comment.");
    }
  }
);

export const moderateComment = createAsyncThunk(
  "comment/moderate",
  async ({ id, status }: { id: string; status: "approved" | "rejected" | "hidden" }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.comments.moderate}/${id}/status`, { status });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to moderate comment.");
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComments: (state) => { state.comments = []; state.meta = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsForBlog.pending, (state) => { state.loading = true; })
      .addCase(fetchCommentsForBlog.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.comments = payload.data; state.meta = payload.meta; }
      })
      .addCase(fetchCommentsForBlog.rejected, (state) => { state.loading = false; })

      .addCase(fetchAllComments.pending, (state) => { state.loading = true; })
      .addCase(fetchAllComments.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.comments = payload.data; state.meta = payload.meta; }
      })
      .addCase(fetchAllComments.rejected, (state) => { state.loading = false; })

      .addCase(addComment.pending, (state) => { state.mutating = true; })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.mutating = false;
        if (payload.status) { state.comments.unshift(payload.data); toast.success("Comment posted"); }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.mutating = false;
        toast.error((action.payload as string) || "Unable to post comment.");
      })

      .addCase(updateComment.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.comments = state.comments.map((c) => (c._id === payload.data._id ? payload.data : c));
          toast.success("Comment updated");
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to update comment.");
      })

      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments.filter((c) => c._id !== payload);
        toast.success("Comment deleted");
      })
      .addCase(deleteComment.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to delete comment.");
      })

      .addCase(moderateComment.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.comments = state.comments.map((c) => (c._id === payload.data._id ? payload.data : c));
          toast.success("Comment status updated");
        }
      })
      .addCase(moderateComment.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to moderate comment.");
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
