"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

export type Tag = { _id: string; name: string; slug: string };

type TagState = { tags: Tag[]; loading: boolean; mutating: boolean };
const initialState: TagState = { tags: [], loading: false, mutating: false };

export const fetchTags = createAsyncThunk("tag/list", async (_, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance.get(endPoints.tags.list);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Unable to load tags.");
  }
});

export const createTag = createAsyncThunk(
  "tag/create",
  async (payload: { name: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.tags.create, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to create tag.");
    }
  }
);

export const updateTag = createAsyncThunk(
  "tag/update",
  async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.tags.update}/${id}`, { name });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to update tag.");
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tag/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`${endPoints.tags.remove}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to delete tag.");
    }
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => { state.loading = true; })
      .addCase(fetchTags.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) state.tags = payload.data;
      })
      .addCase(fetchTags.rejected, (state) => { state.loading = false; })

      .addCase(createTag.fulfilled, (state, { payload }) => {
        if (payload.status) { state.tags.unshift(payload.data); toast.success("Tag created"); }
      })
      .addCase(createTag.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to create tag.");
      })

      .addCase(updateTag.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.tags = state.tags.map((t) => (t._id === payload.data._id ? payload.data : t));
          toast.success("Tag updated");
        }
      })
      .addCase(updateTag.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to update tag.");
      })

      .addCase(deleteTag.fulfilled, (state, { payload }) => {
        state.tags = state.tags.filter((t) => t._id !== payload);
        toast.success("Tag deleted");
      })
      .addCase(deleteTag.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to delete tag.");
      });
  },
});

export default tagSlice.reducer;
