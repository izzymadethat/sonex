import { RouterProvider } from "react-router-dom";
import { router } from "./helper/browserRouter";
import { ThemeProvider } from "@/src/context/Theme/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
