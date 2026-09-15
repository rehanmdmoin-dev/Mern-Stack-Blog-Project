"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

type LikeState = { likedByBlogId: Record<string, boolean>; loading: boolean };
const initialState: LikeState = { likedByBlogId: {}, loading: false };

export const fetchLikeStatus = createAsyncThunk(
  "like/status",
  async (blogId: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(`${endPoints.likes.status}/${blogId}/like/status`);
      return { blogId, ...res.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load like status.");
    }
  }
);

export const likeBlog = createAsyncThunk(
  "like/like",
  async (blogId: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(`${endPoints.likes.like}/${blogId}/like`);
      return { blogId, ...res.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to like this blog.");
    }
  }
);

export const unlikeBlog = createAsyncThunk(
  "like/unlike",
  async (blogId: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.delete(`${endPoints.likes.like}/${blogId}/like`);
      return { blogId, ...res.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to unlike this blog.");
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikeStatus.fulfilled, (state, { payload }) => {
        if (payload.status) state.likedByBlogId[payload.blogId] = payload.data.liked;
      })
      .addCase(likeBlog.fulfilled, (state, { payload }) => {
        if (payload.status) state.likedByBlogId[payload.blogId] = true;
      })
      .addCase(likeBlog.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to like this blog.");
      })
      .addCase(unlikeBlog.fulfilled, (state, { payload }) => {
        if (payload.status) state.likedByBlogId[payload.blogId] = false;
      })
      .addCase(unlikeBlog.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to unlike this blog.");
      });
  },
});

export default likeSlice.reducer;
