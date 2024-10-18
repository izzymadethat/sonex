import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main className="sonex-dark text-foreground bg-background">
      <App />
    </main>
  </StrictMode>
);
