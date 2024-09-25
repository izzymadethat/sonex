import { Button } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Button>Button</Button>
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
