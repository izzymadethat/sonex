import { RouterProvider } from "react-router-dom";
import { router } from "./helper/browserRouter";
import { ThemeProvider } from "@/context/Theme/theme-provider";
import { useEffect } from "react";
import { fetchUser, selectUser } from "./features/user/userSlice";
import { getProjects } from "./features/projects/projectsSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
