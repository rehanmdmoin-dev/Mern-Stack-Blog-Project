"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { endPoints } from "@/api/endpoints/endPoints";
import AxiosInstance from "@/api/axios/axios";
import { setSession, clearSession } from "@/lib/authCookies";

export type Role = "admin" | "author" | "reader";

export type SessionUser = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: Role;
  bio?: string;
  profileImage?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  createdAt?: string;
};

type AuthState = {
  loading: boolean;
  meLoading: boolean;
  user: SessionUser | null;
  error: string | null;
};

const initialState: AuthState = { loading: false, meLoading: false, user: null, error: null };

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; email: string; password: string; role?: Role }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.auth.register, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to register.");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.auth.login, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Invalid email or password.");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.auth.verifyEmail, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to verify email.");
    }
  }
);

export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.auth.resendVerification, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to resend verification code.");
    }
  }
);

export const fetchMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance.get(endPoints.auth.me);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Unable to load your account.");
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(endPoints.auth.changePassword, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to change password.");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(endPoints.auth.forgotPassword, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to send reset link.");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put(`${endPoints.auth.resetPassword}/${payload.token}`, {
        password: payload.password,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to reset password.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  clearSession();
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) {
          toast.success(payload.message || "Registered successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Registration failed.");
      })

      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) {
          state.user = payload.data.user;
          setSession(payload.data.token, payload.data.user.role);
          toast.success(payload.message || "Login successful");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Login failed.");
      })

      .addCase(verifyEmail.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status) {
          state.user = payload.data.user;
          setSession(payload.data.token, payload.data.user.role);
          toast.success(payload.message || "Email verified successfully");
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Email verification failed.");
      })

      .addCase(resendVerification.fulfilled, (state, { payload }) => {
        toast.success(payload.message || "A new verification code has been sent");
      })
      .addCase(resendVerification.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to resend verification code.");
      })

      .addCase(fetchMe.pending, (state) => { state.meLoading = true; })
      .addCase(fetchMe.fulfilled, (state, { payload }) => {
        state.meLoading = false;
        if (payload.status) state.user = payload.data;
      })
      .addCase(fetchMe.rejected, (state) => { state.meLoading = false; })

      .addCase(changePassword.fulfilled, (state, { payload }) => {
        toast.success(payload.message || "Password changed");
      })
      .addCase(changePassword.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to change password.");
      })

      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        toast.success(payload.message || "If that email is registered, a reset link has been sent");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to send reset link.");
      })

      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        toast.success(payload.message || "Password reset successful");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        toast.error((action.payload as string) || "Unable to reset password.");
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
