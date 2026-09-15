"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

export type Category = { _id: string; name: string; description?: string; slug: string; isActive: boolean };

type CategoryState = { categories: Category[]; loading: boolean; mutating: boolean };
const initialState: CategoryState = { categories: [], loading: false, mutating: false };

export const fetchCategories = createAsyncThunk(
  "category/list",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.categories.list, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load categories.");
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (payload: { name: string; description?: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.categories.create, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to create category.");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }: { id: string; data: { name?: string; description?: string } }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.categories.update}/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to update category.");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`${endPoints.categories.remove}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to delete category.");
    }
  }
);

export const toggleCategoryActive = createAsyncThunk(
  "category/toggleActive",
  async ({ id, activate }: { id: string; activate: boolean }, { rejectWithValue }) => {
    try {
      const path = activate ? endPoints.categories.activate : endPoints.categories.deactivate;
      const res = await AxiosInstance.put(`${path}/${id}/${activate ? "activate" : "deactivate"}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to update category.");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) state.categories = payload.data;
      })
      .addCase(fetchCategories.rejected, (state) => { state.loading = false; })

      .addCase(createCategory.pending, (state) => { state.mutating = true; })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.mutating = false;
        if (payload.status) { state.categories.unshift(payload.data); toast.success("Category created"); }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.mutating = false;
        toast.error((action.payload as string) || "Unable to create category.");
      })

      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.categories = state.categories.map((c) => (c._id === payload.data._id ? payload.data : c));
          toast.success("Category updated");
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to update category.");
      })

      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.categories = state.categories.filter((c) => c._id !== payload);
        toast.success("Category deleted");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to delete category.");
      })

      .addCase(toggleCategoryActive.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.categories = state.categories.map((c) => (c._id === payload.data._id ? payload.data : c));
        }
      })
      .addCase(toggleCategoryActive.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to update category.");
      });
  },
});

export default categorySlice.reducer;
