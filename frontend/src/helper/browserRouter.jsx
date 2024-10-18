import { Home } from "../pages/landing-page/index.js";
import { Login, Logout, Signup } from "../pages/auth/index.js";
import { NotFoundError } from "../pages/errors/index.js";
import UserLayout from "../components/global/UserLayout.jsx";
import { Dashboard, Profile } from "../pages/user/index.js";
import {
  ViewProjectsPage,
  ViewSingleProjectPage
} from "../pages/user/projects/index.js";
import {
  ViewClientsPage,
  ViewSingleClientPage
} from "../pages/user/clients/index.js";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
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
  },
  {
    path: "/user",
    children: [
      {
        index: true,
        element: <NotFoundError />
      },
      {
        path: "me",
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: "projects",
            children: [
              {
                index: true,
                element: <ViewProjectsPage />
              },
              {
                path: ":projectId",
                element: <ViewSingleProjectPage />
              }
            ]
          },
          {
            path: "clients",
            children: [
              {
                index: true,
                element: <ViewClientsPage />
              },
              {
                path: ":clientId",
                element: <ViewSingleClientPage />
              }
            ]
          },
          {
            path: "profile",
            element: <Profile />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundError />
  }
]);
