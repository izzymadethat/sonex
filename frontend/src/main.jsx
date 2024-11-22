import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import axiosInstance from "./store/csrf.js";
// import { getProjects } from "./features/projects/projectsSlice.js";
// import commentsSlice from "./features/comments/commentsSlice.js";
// import { fetchComments } from "./features/comments/commentsSlice.js";

if (process.env.NODE_ENV !== "production") {
  window.axiosInstance = axiosInstance;
  window.store = store;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
