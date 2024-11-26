import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import axiosInstance from "@/lib/axiosInstance.js";
import { restoreCsrfToken } from "./lib/restoreCsrf.js";

if (process.env.NODE_ENV !== "production") {
  restoreCsrfToken();
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
