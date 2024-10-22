import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import projectsReducer from "../features/projects/projectsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer
  }
});
