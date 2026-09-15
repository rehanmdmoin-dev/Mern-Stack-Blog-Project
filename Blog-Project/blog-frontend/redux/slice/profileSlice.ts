"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

type ProfileState = {
  likedBlogs: any[];
  likedMeta: any;
  commentedBlogs: any[];
  commentedMeta: any;
  readingHistory: any[];
  loading: boolean;
  mutating: boolean;
};

const initialState: ProfileState = {
  likedBlogs: [],
  likedMeta: null,
  commentedBlogs: [],
  commentedMeta: null,
  readingHistory: [],
  loading: false,
  mutating: false,
};

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (payload: { name?: string; bio?: string; profileImage?: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(endPoints.profile.update, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to update profile.");
    }
  }
);

export const fetchLikedBlogs = createAsyncThunk(
  "profile/likedBlogs",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.profile.likedBlogs, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load liked blogs.");
    }
  }
);

export const fetchCommentedBlogs = createAsyncThunk(
  "profile/commentedBlogs",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.profile.commentedBlogs, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load commented blogs.");
    }
  }
);

export const fetchReadingHistory = createAsyncThunk(
  "profile/readingHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.profile.readingHistory);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load reading history.");
    }
  }
);

export const addToReadingHistory = createAsyncThunk(
  "profile/addReadingHistory",
  async (blogId: string, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(`${endPoints.profile.addReadingHistory}/${blogId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => { state.mutating = true; })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.mutating = false;
        if (payload.status) toast.success("Profile updated");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.mutating = false;
        toast.error((action.payload as string) || "Unable to update profile.");
      })

      .addCase(fetchLikedBlogs.pending, (state) => { state.loading = true; })
      .addCase(fetchLikedBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.likedBlogs = payload.data; state.likedMeta = payload.meta; }
      })
      .addCase(fetchLikedBlogs.rejected, (state) => { state.loading = false; })

      .addCase(fetchCommentedBlogs.pending, (state) => { state.loading = true; })
      .addCase(fetchCommentedBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.commentedBlogs = payload.data; state.commentedMeta = payload.meta; }
      })
      .addCase(fetchCommentedBlogs.rejected, (state) => { state.loading = false; })

      .addCase(fetchReadingHistory.pending, (state) => { state.loading = true; })
      .addCase(fetchReadingHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) state.readingHistory = payload.data;
      })
      .addCase(fetchReadingHistory.rejected, (state) => { state.loading = false; });
  },
});

export default profileSlice.reducer;
