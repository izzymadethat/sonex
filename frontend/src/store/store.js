import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import projectsReducer from "../features/projects/projectsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import clientsReducer from "../features/clients/clientsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    comments: commentsReducer,
    clients: clientsReducer
  }
});
