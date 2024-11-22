import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectsReducer from "./projectSlice";
import commentsReducer from "./commentSlice";
import filesReducer from "./fileSlice";

// Create root reducer
const rootReducer = {
	user: userReducer,
	projects: projectsReducer,
	comments: commentsReducer,
	files: filesReducer,
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
