import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "@/features/user/userSlice";
import projectsReducer from "@/features/projects/projectsSlice";
import commentsReducer from "@/features/comments/commentsSlice";
import filesReducer from "@/features/files/filesSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'files', 'projects', 'comments']
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
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
