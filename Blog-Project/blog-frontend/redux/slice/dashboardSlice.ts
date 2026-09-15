"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

type DashboardState = {
  authorDashboard: any | null;
  adminDashboard: any | null;
  trend: any[];
  categoryAnalytics: any[];
  tagAnalytics: any[];
  blogPerformance: any | null;
  authorAnalytics: any[];
  activeReaders: any[];
  topCommenters: any[];
  loading: boolean;
};

const initialState: DashboardState = {
  authorDashboard: null,
  adminDashboard: null,
  trend: [],
  categoryAnalytics: [],
  tagAnalytics: [],
  blogPerformance: null,
  authorAnalytics: [],
  activeReaders: [],
  topCommenters: [],
  loading: false,
};

const thunk = (name: string, path: string) =>
  createAsyncThunk(name, async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(path, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load dashboard data.");
    }
  });

export const fetchAuthorDashboard = thunk("dashboard/author", endPoints.dashboard.author);
export const fetchAdminDashboard = thunk("dashboard/admin", endPoints.dashboard.admin);
export const fetchTrend = thunk("dashboard/trend", endPoints.dashboard.trend);
export const fetchCategoryAnalytics = thunk("dashboard/categories", endPoints.dashboard.categories);
export const fetchTagAnalytics = thunk("dashboard/tags", endPoints.dashboard.tags);
export const fetchBlogPerformance = thunk("dashboard/blogPerformance", endPoints.dashboard.blogPerformance);
export const fetchAuthorAnalytics = thunk("dashboard/authors", endPoints.dashboard.authors);
export const fetchActiveReaders = thunk("dashboard/activeReaders", endPoints.dashboard.activeReaders);
export const fetchTopCommenters = thunk("dashboard/topCommenters", endPoints.dashboard.topCommenters);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorDashboard.fulfilled, (state, { payload }) => {
        if (payload.status) state.authorDashboard = payload.data;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, { payload }) => {
        if (payload.status) state.adminDashboard = payload.data;
      })
      .addCase(fetchTrend.fulfilled, (state, { payload }) => {
        if (payload.status) state.trend = payload.data;
      })
      .addCase(fetchCategoryAnalytics.fulfilled, (state, { payload }) => {
        if (payload.status) state.categoryAnalytics = payload.data;
      })
      .addCase(fetchTagAnalytics.fulfilled, (state, { payload }) => {
        if (payload.status) state.tagAnalytics = payload.data;
      })
      .addCase(fetchBlogPerformance.fulfilled, (state, { payload }) => {
        if (payload.status) state.blogPerformance = payload.data;
      })
      .addCase(fetchAuthorAnalytics.fulfilled, (state, { payload }) => {
        if (payload.status) state.authorAnalytics = payload.data;
      })
      .addCase(fetchActiveReaders.fulfilled, (state, { payload }) => {
        if (payload.status) state.activeReaders = payload.data;
      })
      .addCase(fetchTopCommenters.fulfilled, (state, { payload }) => {
        if (payload.status) state.topCommenters = payload.data;
      })
      .addMatcher(
        (action) => action.type.startsWith("dashboard/") && action.type.endsWith("/pending"),
        (state) => { state.loading = true; }
      )
      .addMatcher(
        (action) => action.type.startsWith("dashboard/") && (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")),
        (state) => { state.loading = false; }
      );
  },
});

export default dashboardSlice.reducer;
