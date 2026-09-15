"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "author" | "reader";
  isActive: boolean;
  createdAt: string;
};

type UserState = { users: AdminUser[]; meta: any; loading: boolean; mutating: boolean };
const initialState: UserState = { users: [], meta: null, loading: false, mutating: false };

export const fetchUsers = createAsyncThunk(
  "user/list",
  async (params: Record<string, any> = {}, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(endPoints.users.list, { params });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to load users.");
    }
  }
);

export const toggleUserActive = createAsyncThunk(
  "user/toggleActive",
  async ({ id, activate }: { id: string; activate: boolean }, { rejectWithValue }) => {
    try {
      const suffix = activate ? "activate" : "deactivate";
      const res = await AxiosInstance.put(`${endPoints.users.byId}/${id}/${suffix}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to update user.");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`${endPoints.users.remove}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to delete user.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) { state.users = payload.data; state.meta = payload.meta; }
      })
      .addCase(fetchUsers.rejected, (state) => { state.loading = false; })

      .addCase(toggleUserActive.fulfilled, (state, { payload }) => {
        if (payload.status) {
          state.users = state.users.map((u) => (u._id === payload.data._id ? payload.data : u));
          toast.success(payload.message || "User updated");
        }
      })
      .addCase(toggleUserActive.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to update user.");
      })

      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((u) => u._id !== payload);
        toast.success("User deleted");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to delete user.");
      });
  },
});

export default userSlice.reducer;
