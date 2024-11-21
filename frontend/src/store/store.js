import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import projectsReducer from "./projectSlice";
import commentsReducer from "./commentSlice";
import filesReducer from "./fileSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user"],
};

// Create root reducer
const rootReducer = {
	user: userReducer,
	projects: projectsReducer,
	comments: commentsReducer,
	files: filesReducer,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

export const persistor = persistStore(store);
