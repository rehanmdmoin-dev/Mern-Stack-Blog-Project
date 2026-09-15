import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import blogReducer from "../slice/blogSlice";
import categoryReducer from "../slice/categorySlice";
import tagReducer from "../slice/tagSlice";
import commentReducer from "../slice/commentSlice";
import likeReducer from "../slice/likeSlice";
import profileReducer from "../slice/profileSlice";
import userReducer from "../slice/userSlice";
import dashboardReducer from "../slice/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    category: categoryReducer,
    tag: tagReducer,
    comment: commentReducer,
    like: likeReducer,
    profile: profileReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
