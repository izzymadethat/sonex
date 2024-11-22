import { RouterProvider } from "react-router-dom";
import { router } from "./helper/browserRouter";
import { ThemeProvider } from "@/context/Theme/theme-provider";
import { restoreCSRF } from "./store/csrf";

if (import.meta.env.VITE_ENV !== "production") {
  restoreCSRF();
}

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
