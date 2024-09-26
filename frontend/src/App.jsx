import { Button } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Button>Button</Button>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Signup />
    },
    {
      path: "/logout",
      element: <Logout />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
