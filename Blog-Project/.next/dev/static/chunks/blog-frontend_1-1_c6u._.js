(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AxiosInstance",
    ()=>AxiosInstance,
    "baseURL",
    ()=>baseURL,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$universal$2d$cookie$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cookies$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/universal-cookie/esm/index.mjs [app-client] (ecmascript) <export default as Cookies>");
;
;
const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$universal$2d$cookie$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cookies$3e$__["Cookies"]();
const baseURL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || "http://localhost:5000/api";
const AxiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL
});
AxiosInstance.interceptors.request.use((config)=>{
    const token = cookies.get("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
AxiosInstance.interceptors.response.use((response)=>response, (error)=>{
    if (error?.response?.status === 401 && ("TURBOPACK compile-time value", "object") !== "undefined") {
        cookies.remove("token", {
            path: "/"
        });
        cookies.remove("role", {
            path: "/"
        });
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = AxiosInstance;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Every path is relative to NEXT_PUBLIC_API_URL, and mirrors
// blog-management-system/app/routes/api/*.js exactly.
__turbopack_context__.s([
    "endPoints",
    ()=>endPoints
]);
const endPoints = {
    auth: {
        register: "/auth/register",
        login: "/auth/login",
        verifyEmail: "/auth/verify-email",
        resendVerification: "/auth/resend-verification",
        me: "/auth/me",
        changePassword: "/auth/change-password",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password"
    },
    users: {
        list: "/users",
        byId: "/users",
        activate: "/users",
        deactivate: "/users",
        remove: "/users"
    },
    categories: {
        list: "/categories",
        create: "/categories",
        update: "/categories",
        remove: "/categories",
        activate: "/categories",
        deactivate: "/categories"
    },
    tags: {
        list: "/tags",
        create: "/tags",
        update: "/tags",
        remove: "/tags"
    },
    blogs: {
        list: "/blogs",
        mine: "/blogs/mine",
        adminAll: "/blogs/admin/all",
        byIdOwner: "/blogs/id",
        bySlug: "/blogs",
        create: "/blogs",
        update: "/blogs",
        remove: "/blogs",
        softDelete: "/blogs",
        submit: "/blogs",
        publish: "/blogs",
        reject: "/blogs",
        unpublish: "/blogs"
    },
    comments: {
        forBlog: "/blogs",
        all: "/comments",
        update: "/comments",
        remove: "/comments",
        moderate: "/comments"
    },
    likes: {
        like: "/blogs",
        status: "/blogs"
    },
    profile: {
        update: "/profile",
        likedBlogs: "/profile/liked-blogs",
        commentedBlogs: "/profile/commented-blogs",
        readingHistory: "/profile/reading-history",
        addReadingHistory: "/profile/reading-history"
    },
    authors: {
        byId: "/authors"
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
        topCommenters: "/dashboard/analytics/top-commenters"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/lib/authCookies.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSession",
    ()=>clearSession,
    "getRole",
    ()=>getRole,
    "getToken",
    ()=>getToken,
    "setSession",
    ()=>setSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$universal$2d$cookie$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cookies$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/universal-cookie/esm/index.mjs [app-client] (ecmascript) <export default as Cookies>");
;
const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$universal$2d$cookie$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cookies$3e$__["Cookies"]();
function setSession(token, role) {
    cookies.set("token", token, {
        path: "/",
        sameSite: "lax"
    });
    cookies.set("role", role, {
        path: "/",
        sameSite: "lax"
    });
}
function clearSession() {
    cookies.remove("token", {
        path: "/"
    });
    cookies.remove("role", {
        path: "/"
    });
}
function getToken() {
    return cookies.get("token");
}
function getRole() {
    return cookies.get("role");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/authSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "changePassword",
    ()=>changePassword,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchMe",
    ()=>fetchMe,
    "forgotPassword",
    ()=>forgotPassword,
    "loginUser",
    ()=>loginUser,
    "logout",
    ()=>logout,
    "registerUser",
    ()=>registerUser,
    "resendVerification",
    ()=>resendVerification,
    "resetPassword",
    ()=>resetPassword,
    "verifyEmail",
    ()=>verifyEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$authCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/lib/authCookies.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const initialState = {
    loading: false,
    meLoading: false,
    user: null,
    error: null
};
const registerUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/register", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.register, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to register.");
    }
});
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/login", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.login, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Invalid email or password.");
    }
});
const verifyEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/verifyEmail", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.verifyEmail, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to verify email.");
    }
});
const resendVerification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/resendVerification", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.resendVerification, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to resend verification code.");
    }
});
const fetchMe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/me", async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.me);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load your account.");
    }
});
const changePassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/changePassword", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.changePassword, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to change password.");
    }
});
const forgotPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/forgotPassword", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.forgotPassword, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to send reset link.");
    }
});
const resetPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/resetPassword", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].auth.resetPassword}/${payload.token}`, {
            password: payload.password
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to reset password.");
    }
});
const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/logout", async ()=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$authCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
    return true;
});
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(registerUser.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "Registered successfully");
            }
        }).addCase(registerUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(state.error || "Registration failed.");
        }).addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.user = payload.data.user;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$authCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(payload.data.token, payload.data.user.role);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "Login successful");
            }
        }).addCase(loginUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(state.error || "Login failed.");
        }).addCase(verifyEmail.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(verifyEmail.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.user = payload.data.user;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$authCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSession"])(payload.data.token, payload.data.user.role);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "Email verified successfully");
            }
        }).addCase(verifyEmail.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(state.error || "Email verification failed.");
        }).addCase(resendVerification.fulfilled, (state, { payload })=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "A new verification code has been sent");
        }).addCase(resendVerification.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to resend verification code.");
        }).addCase(fetchMe.pending, (state)=>{
            state.meLoading = true;
        }).addCase(fetchMe.fulfilled, (state, { payload })=>{
            state.meLoading = false;
            if (payload.status) state.user = payload.data;
        }).addCase(fetchMe.rejected, (state)=>{
            state.meLoading = false;
        }).addCase(changePassword.fulfilled, (state, { payload })=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "Password changed");
        }).addCase(changePassword.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to change password.");
        }).addCase(forgotPassword.fulfilled, (state, { payload })=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "If that email is registered, a reset link has been sent");
        }).addCase(forgotPassword.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to send reset link.");
        }).addCase(resetPassword.fulfilled, (state, { payload })=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "Password reset successful");
        }).addCase(resetPassword.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to reset password.");
        }).addCase(logout.fulfilled, (state)=>{
            state.user = null;
        });
    }
});
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/blogSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearCurrentBlog",
    ()=>clearCurrentBlog,
    "createBlog",
    ()=>createBlog,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteBlog",
    ()=>deleteBlog,
    "fetchAdminBlogs",
    ()=>fetchAdminBlogs,
    "fetchBlogByIdOwner",
    ()=>fetchBlogByIdOwner,
    "fetchBlogBySlug",
    ()=>fetchBlogBySlug,
    "fetchBlogs",
    ()=>fetchBlogs,
    "fetchMyBlogs",
    ()=>fetchMyBlogs,
    "publishBlog",
    ()=>publishBlog,
    "rejectBlog",
    ()=>rejectBlog,
    "softDeleteBlog",
    ()=>softDeleteBlog,
    "submitBlog",
    ()=>submitBlog,
    "unpublishBlog",
    ()=>unpublishBlog,
    "updateBlog",
    ()=>updateBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const initialState = {
    blogs: [],
    meta: null,
    currentBlog: null,
    loading: false,
    mutating: false
};
const fetchBlogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/list", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.list, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load blogs.");
    }
});
const fetchBlogBySlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/bySlug", async (slug, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.bySlug}/${slug}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Blog not found.");
    }
});
const fetchBlogByIdOwner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/byIdOwner", async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.byIdOwner}/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Blog not found.");
    }
});
const fetchMyBlogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/mine", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.mine, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load your blogs.");
    }
});
const fetchAdminBlogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/adminAll", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.adminAll, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load blogs.");
    }
});
const createBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/create", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.create, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to create blog.");
    }
});
const updateBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/update", async ({ id, data }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.update}/${id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to update blog.");
    }
});
const deleteBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/delete", async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.remove}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to delete blog.");
    }
});
const softDeleteBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/softDelete", async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.softDelete}/${id}/soft-delete`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to delete blog.");
    }
});
const submitBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/submit", async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.submit}/${id}/submit`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to submit blog.");
    }
});
const publishBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/publish", async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.publish}/${id}/publish`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to publish blog.");
    }
});
const rejectBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/reject", async ({ id, reason }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.reject}/${id}/reject`, {
            reason
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to reject blog.");
    }
});
const unpublishBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("blog/unpublish", async (id, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].blogs.unpublish}/${id}/unpublish`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to unpublish blog.");
    }
});
const blogSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "blog",
    initialState,
    reducers: {
        clearCurrentBlog: (state)=>{
            state.currentBlog = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchBlogs.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchBlogs.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.blogs = payload.data;
                state.meta = payload.meta || null;
            }
        }).addCase(fetchBlogs.rejected, (state)=>{
            state.loading = false;
        }).addCase(fetchMyBlogs.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchMyBlogs.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.blogs = payload.data;
                state.meta = payload.meta || null;
            }
        }).addCase(fetchMyBlogs.rejected, (state)=>{
            state.loading = false;
        }).addCase(fetchAdminBlogs.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchAdminBlogs.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.blogs = payload.data;
                state.meta = payload.meta || null;
            }
        }).addCase(fetchAdminBlogs.rejected, (state)=>{
            state.loading = false;
        }).addCase(fetchBlogBySlug.pending, (state)=>{
            state.loading = true;
            state.currentBlog = null;
        }).addCase(fetchBlogBySlug.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) state.currentBlog = payload.data;
        }).addCase(fetchBlogBySlug.rejected, (state)=>{
            state.loading = false;
        }).addCase(fetchBlogByIdOwner.pending, (state)=>{
            state.loading = true;
            state.currentBlog = null;
        }).addCase(fetchBlogByIdOwner.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) state.currentBlog = payload.data;
        }).addCase(fetchBlogByIdOwner.rejected, (state)=>{
            state.loading = false;
        }).addCase(createBlog.pending, (state)=>{
            state.mutating = true;
        }).addCase(createBlog.fulfilled, (state, { payload })=>{
            state.mutating = false;
            if (payload.status) __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Blog created");
        }).addCase(createBlog.rejected, (state, action)=>{
            state.mutating = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to create blog.");
        }).addCase(updateBlog.pending, (state)=>{
            state.mutating = true;
        }).addCase(updateBlog.fulfilled, (state, { payload })=>{
            state.mutating = false;
            if (payload.status) {
                state.currentBlog = payload.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Blog updated");
            }
        }).addCase(updateBlog.rejected, (state, action)=>{
            state.mutating = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to update blog.");
        }).addMatcher((action)=>[
                deleteBlog.fulfilled.type,
                softDeleteBlog.fulfilled.type
            ].includes(action.type), (state, action)=>{
            state.blogs = state.blogs.filter((b)=>b._id !== action.payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Blog deleted");
        }).addMatcher((action)=>[
                deleteBlog.rejected.type,
                softDeleteBlog.rejected.type
            ].includes(action.type), (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to delete blog.");
        }).addMatcher((action)=>[
                submitBlog.fulfilled.type,
                publishBlog.fulfilled.type,
                rejectBlog.fulfilled.type,
                unpublishBlog.fulfilled.type
            ].includes(action.type), (state, action)=>{
            const updated = action.payload.data;
            state.blogs = state.blogs.map((b)=>b._id === updated._id ? updated : b);
            if (state.currentBlog?._id === updated._id) state.currentBlog = updated;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(action.payload.message || "Updated");
        }).addMatcher((action)=>[
                submitBlog.rejected.type,
                publishBlog.rejected.type,
                rejectBlog.rejected.type,
                unpublishBlog.rejected.type
            ].includes(action.type), (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Action failed.");
        });
    }
});
const { clearCurrentBlog } = blogSlice.actions;
const __TURBOPACK__default__export__ = blogSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/categorySlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCategory",
    ()=>createCategory,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteCategory",
    ()=>deleteCategory,
    "fetchCategories",
    ()=>fetchCategories,
    "toggleCategoryActive",
    ()=>toggleCategoryActive,
    "updateCategory",
    ()=>updateCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const initialState = {
    categories: [],
    loading: false,
    mutating: false
};
const fetchCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("category/list", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].categories.list, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load categories.");
    }
});
const createCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("category/create", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].categories.create, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to create category.");
    }
});
const updateCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("category/update", async ({ id, data }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].categories.update}/${id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to update category.");
    }
});
const deleteCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("category/delete", async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].categories.remove}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to delete category.");
    }
});
const toggleCategoryActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("category/toggleActive", async ({ id, activate }, { rejectWithValue })=>{
    try {
        const path = activate ? __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].categories.activate : __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].categories.deactivate;
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${path}/${id}/${activate ? "activate" : "deactivate"}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to update category.");
    }
});
const categorySlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchCategories.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchCategories.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) state.categories = payload.data;
        }).addCase(fetchCategories.rejected, (state)=>{
            state.loading = false;
        }).addCase(createCategory.pending, (state)=>{
            state.mutating = true;
        }).addCase(createCategory.fulfilled, (state, { payload })=>{
            state.mutating = false;
            if (payload.status) {
                state.categories.unshift(payload.data);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Category created");
            }
        }).addCase(createCategory.rejected, (state, action)=>{
            state.mutating = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to create category.");
        }).addCase(updateCategory.fulfilled, (state, { payload })=>{
            if (payload.status) {
                state.categories = state.categories.map((c)=>c._id === payload.data._id ? payload.data : c);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Category updated");
            }
        }).addCase(updateCategory.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to update category.");
        }).addCase(deleteCategory.fulfilled, (state, { payload })=>{
            state.categories = state.categories.filter((c)=>c._id !== payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Category deleted");
        }).addCase(deleteCategory.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to delete category.");
        }).addCase(toggleCategoryActive.fulfilled, (state, { payload })=>{
            if (payload.status) {
                state.categories = state.categories.map((c)=>c._id === payload.data._id ? payload.data : c);
            }
        }).addCase(toggleCategoryActive.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to update category.");
        });
    }
});
const __TURBOPACK__default__export__ = categorySlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/commentSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addComment",
    ()=>addComment,
    "clearComments",
    ()=>clearComments,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteComment",
    ()=>deleteComment,
    "fetchAllComments",
    ()=>fetchAllComments,
    "fetchCommentsForBlog",
    ()=>fetchCommentsForBlog,
    "moderateComment",
    ()=>moderateComment,
    "updateComment",
    ()=>updateComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const initialState = {
    comments: [],
    meta: null,
    loading: false,
    mutating: false
};
const fetchCommentsForBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("comment/forBlog", async ({ blogId, params }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].comments.forBlog}/${blogId}/comments`, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load comments.");
    }
});
const fetchAllComments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("comment/all", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].comments.all, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load comments.");
    }
});
const addComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("comment/add", async ({ blogId, content }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].comments.forBlog}/${blogId}/comments`, {
            content
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to post comment.");
    }
});
const updateComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("comment/update", async ({ id, content }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].comments.update}/${id}`, {
            content
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to update comment.");
    }
});
const deleteComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("comment/delete", async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].comments.remove}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to delete comment.");
    }
});
const moderateComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("comment/moderate", async ({ id, status }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].comments.moderate}/${id}/status`, {
            status
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to moderate comment.");
    }
});
const commentSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "comment",
    initialState,
    reducers: {
        clearComments: (state)=>{
            state.comments = [];
            state.meta = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchCommentsForBlog.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchCommentsForBlog.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.comments = payload.data;
                state.meta = payload.meta;
            }
        }).addCase(fetchCommentsForBlog.rejected, (state)=>{
            state.loading = false;
        }).addCase(fetchAllComments.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchAllComments.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.comments = payload.data;
                state.meta = payload.meta;
            }
        }).addCase(fetchAllComments.rejected, (state)=>{
            state.loading = false;
        }).addCase(addComment.pending, (state)=>{
            state.mutating = true;
        }).addCase(addComment.fulfilled, (state, { payload })=>{
            state.mutating = false;
            if (payload.status) {
                state.comments.unshift(payload.data);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Comment posted");
            }
        }).addCase(addComment.rejected, (state, action)=>{
            state.mutating = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to post comment.");
        }).addCase(updateComment.fulfilled, (state, { payload })=>{
            if (payload.status) {
                state.comments = state.comments.map((c)=>c._id === payload.data._id ? payload.data : c);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Comment updated");
            }
        }).addCase(updateComment.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to update comment.");
        }).addCase(deleteComment.fulfilled, (state, { payload })=>{
            state.comments = state.comments.filter((c)=>c._id !== payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Comment deleted");
        }).addCase(deleteComment.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to delete comment.");
        }).addCase(moderateComment.fulfilled, (state, { payload })=>{
            if (payload.status) {
                state.comments = state.comments.map((c)=>c._id === payload.data._id ? payload.data : c);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Comment status updated");
            }
        }).addCase(moderateComment.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to moderate comment.");
        });
    }
});
const { clearComments } = commentSlice.actions;
const __TURBOPACK__default__export__ = commentSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/dashboardSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchActiveReaders",
    ()=>fetchActiveReaders,
    "fetchAdminDashboard",
    ()=>fetchAdminDashboard,
    "fetchAuthorAnalytics",
    ()=>fetchAuthorAnalytics,
    "fetchAuthorDashboard",
    ()=>fetchAuthorDashboard,
    "fetchBlogPerformance",
    ()=>fetchBlogPerformance,
    "fetchCategoryAnalytics",
    ()=>fetchCategoryAnalytics,
    "fetchTagAnalytics",
    ()=>fetchTagAnalytics,
    "fetchTopCommenters",
    ()=>fetchTopCommenters,
    "fetchTrend",
    ()=>fetchTrend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
const initialState = {
    authorDashboard: null,
    adminDashboard: null,
    trend: [],
    categoryAnalytics: [],
    tagAnalytics: [],
    blogPerformance: null,
    authorAnalytics: [],
    activeReaders: [],
    topCommenters: [],
    loading: false
};
const thunk = (name, path)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])(name, async (params = {}, { rejectWithValue })=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(path, {
                params
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Unable to load dashboard data.");
        }
    });
const fetchAuthorDashboard = thunk("dashboard/author", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.author);
const fetchAdminDashboard = thunk("dashboard/admin", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.admin);
const fetchTrend = thunk("dashboard/trend", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.trend);
const fetchCategoryAnalytics = thunk("dashboard/categories", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.categories);
const fetchTagAnalytics = thunk("dashboard/tags", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.tags);
const fetchBlogPerformance = thunk("dashboard/blogPerformance", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.blogPerformance);
const fetchAuthorAnalytics = thunk("dashboard/authors", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.authors);
const fetchActiveReaders = thunk("dashboard/activeReaders", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.activeReaders);
const fetchTopCommenters = thunk("dashboard/topCommenters", __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].dashboard.topCommenters);
const dashboardSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchAuthorDashboard.fulfilled, (state, { payload })=>{
            if (payload.status) state.authorDashboard = payload.data;
        }).addCase(fetchAdminDashboard.fulfilled, (state, { payload })=>{
            if (payload.status) state.adminDashboard = payload.data;
        }).addCase(fetchTrend.fulfilled, (state, { payload })=>{
            if (payload.status) state.trend = payload.data;
        }).addCase(fetchCategoryAnalytics.fulfilled, (state, { payload })=>{
            if (payload.status) state.categoryAnalytics = payload.data;
        }).addCase(fetchTagAnalytics.fulfilled, (state, { payload })=>{
            if (payload.status) state.tagAnalytics = payload.data;
        }).addCase(fetchBlogPerformance.fulfilled, (state, { payload })=>{
            if (payload.status) state.blogPerformance = payload.data;
        }).addCase(fetchAuthorAnalytics.fulfilled, (state, { payload })=>{
            if (payload.status) state.authorAnalytics = payload.data;
        }).addCase(fetchActiveReaders.fulfilled, (state, { payload })=>{
            if (payload.status) state.activeReaders = payload.data;
        }).addCase(fetchTopCommenters.fulfilled, (state, { payload })=>{
            if (payload.status) state.topCommenters = payload.data;
        }).addMatcher((action)=>action.type.startsWith("dashboard/") && action.type.endsWith("/pending"), (state)=>{
            state.loading = true;
        }).addMatcher((action)=>action.type.startsWith("dashboard/") && (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")), (state)=>{
            state.loading = false;
        });
    }
});
const __TURBOPACK__default__export__ = dashboardSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/likeSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchLikeStatus",
    ()=>fetchLikeStatus,
    "likeBlog",
    ()=>likeBlog,
    "unlikeBlog",
    ()=>unlikeBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const initialState = {
    likedByBlogId: {},
    loading: false
};
const fetchLikeStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("like/status", async (blogId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].likes.status}/${blogId}/like/status`);
        return {
            blogId,
            ...res.data
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load like status.");
    }
});
const likeBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("like/like", async (blogId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].likes.like}/${blogId}/like`);
        return {
            blogId,
            ...res.data
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to like this blog.");
    }
});
const unlikeBlog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("like/unlike", async (blogId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].likes.like}/${blogId}/like`);
        return {
            blogId,
            ...res.data
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to unlike this blog.");
    }
});
const likeSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchLikeStatus.fulfilled, (state, { payload })=>{
            if (payload.status) state.likedByBlogId[payload.blogId] = payload.data.liked;
        }).addCase(likeBlog.fulfilled, (state, { payload })=>{
            if (payload.status) state.likedByBlogId[payload.blogId] = true;
        }).addCase(likeBlog.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to like this blog.");
        }).addCase(unlikeBlog.fulfilled, (state, { payload })=>{
            if (payload.status) state.likedByBlogId[payload.blogId] = false;
        }).addCase(unlikeBlog.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to unlike this blog.");
        });
    }
});
const __TURBOPACK__default__export__ = likeSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/profileSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToReadingHistory",
    ()=>addToReadingHistory,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchCommentedBlogs",
    ()=>fetchCommentedBlogs,
    "fetchLikedBlogs",
    ()=>fetchLikedBlogs,
    "fetchReadingHistory",
    ()=>fetchReadingHistory,
    "updateProfile",
    ()=>updateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const initialState = {
    likedBlogs: [],
    likedMeta: null,
    commentedBlogs: [],
    commentedMeta: null,
    readingHistory: [],
    loading: false,
    mutating: false
};
const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("profile/update", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].profile.update, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to update profile.");
    }
});
const fetchLikedBlogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("profile/likedBlogs", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].profile.likedBlogs, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load liked blogs.");
    }
});
const fetchCommentedBlogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("profile/commentedBlogs", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].profile.commentedBlogs, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load commented blogs.");
    }
});
const fetchReadingHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("profile/readingHistory", async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].profile.readingHistory);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load reading history.");
    }
});
const addToReadingHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("profile/addReadingHistory", async (blogId, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].profile.addReadingHistory}/${blogId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});
const profileSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(updateProfile.pending, (state)=>{
            state.mutating = true;
        }).addCase(updateProfile.fulfilled, (state, { payload })=>{
            state.mutating = false;
            if (payload.status) __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Profile updated");
        }).addCase(updateProfile.rejected, (state, action)=>{
            state.mutating = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to update profile.");
        }).addCase(fetchLikedBlogs.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchLikedBlogs.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.likedBlogs = payload.data;
                state.likedMeta = payload.meta;
            }
        }).addCase(fetchLikedBlogs.rejected, (state)=>{
            state.loading = false;
        }).addCase(fetchCommentedBlogs.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchCommentedBlogs.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.commentedBlogs = payload.data;
                state.commentedMeta = payload.meta;
            }
        }).addCase(fetchCommentedBlogs.rejected, (state)=>{
            state.loading = false;
        }).addCase(fetchReadingHistory.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchReadingHistory.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) state.readingHistory = payload.data;
        }).addCase(fetchReadingHistory.rejected, (state)=>{
            state.loading = false;
        });
    }
});
const __TURBOPACK__default__export__ = profileSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/tagSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTag",
    ()=>createTag,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteTag",
    ()=>deleteTag,
    "fetchTags",
    ()=>fetchTags,
    "updateTag",
    ()=>updateTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const initialState = {
    tags: [],
    loading: false,
    mutating: false
};
const fetchTags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("tag/list", async (_, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].tags.list);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load tags.");
    }
});
const createTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("tag/create", async (payload, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].tags.create, payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to create tag.");
    }
});
const updateTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("tag/update", async ({ id, name }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].tags.update}/${id}`, {
            name
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to update tag.");
    }
});
const deleteTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("tag/delete", async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].tags.remove}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to delete tag.");
    }
});
const tagSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "tag",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchTags.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchTags.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) state.tags = payload.data;
        }).addCase(fetchTags.rejected, (state)=>{
            state.loading = false;
        }).addCase(createTag.fulfilled, (state, { payload })=>{
            if (payload.status) {
                state.tags.unshift(payload.data);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Tag created");
            }
        }).addCase(createTag.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to create tag.");
        }).addCase(updateTag.fulfilled, (state, { payload })=>{
            if (payload.status) {
                state.tags = state.tags.map((t)=>t._id === payload.data._id ? payload.data : t);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Tag updated");
            }
        }).addCase(updateTag.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to update tag.");
        }).addCase(deleteTag.fulfilled, (state, { payload })=>{
            state.tags = state.tags.filter((t)=>t._id !== payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Tag deleted");
        }).addCase(deleteTag.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to delete tag.");
        });
    }
});
const __TURBOPACK__default__export__ = tagSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/slice/userSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteUser",
    ()=>deleteUser,
    "fetchUsers",
    ()=>fetchUsers,
    "toggleUserActive",
    ()=>toggleUserActive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/endpoints/endPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const initialState = {
    users: [],
    meta: null,
    loading: false,
    mutating: false
};
const fetchUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("user/list", async (params = {}, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].users.list, {
            params
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to load users.");
    }
});
const toggleUserActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("user/toggleActive", async ({ id, activate }, { rejectWithValue })=>{
    try {
        const suffix = activate ? "activate" : "deactivate";
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].users.byId}/${id}/${suffix}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to update user.");
    }
});
const deleteUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("user/delete", async (id, { rejectWithValue })=>{
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$endpoints$2f$endPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endPoints"].users.remove}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unable to delete user.");
    }
});
const userSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchUsers.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchUsers.fulfilled, (state, { payload })=>{
            state.loading = false;
            if (payload.status) {
                state.users = payload.data;
                state.meta = payload.meta;
            }
        }).addCase(fetchUsers.rejected, (state)=>{
            state.loading = false;
        }).addCase(toggleUserActive.fulfilled, (state, { payload })=>{
            if (payload.status) {
                state.users = state.users.map((u)=>u._id === payload.data._id ? payload.data : u);
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(payload.message || "User updated");
            }
        }).addCase(toggleUserActive.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to update user.");
        }).addCase(deleteUser.fulfilled, (state, { payload })=>{
            state.users = state.users.filter((u)=>u._id !== payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("User deleted");
        }).addCase(deleteUser.rejected, (state, action)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(action.payload || "Unable to delete user.");
        });
    }
});
const __TURBOPACK__default__export__ = userSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/store/provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/store/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$store$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-right",
                theme: "light",
                richColors: true,
                duration: 3000
            }, void 0, false, {
                fileName: "[project]/blog-frontend/redux/store/provider.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/blog-frontend/redux/store/provider.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/redux/store/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$blogSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/blogSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$categorySlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/categorySlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$tagSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/tagSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$commentSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/commentSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$likeSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/likeSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$profileSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/profileSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$userSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/userSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$dashboardSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/dashboardSlice.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        blog: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$blogSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        category: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$categorySlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        tag: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$tagSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        comment: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$commentSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        like: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$likeSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        profile: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$profileSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        user: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$userSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        dashboard: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$dashboardSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
});
const __TURBOPACK__default__export__ = store;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=blog-frontend_1-1_c6u._.js.map