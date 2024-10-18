import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ViewProjectsPage, ViewSingleProjectPage } from "./pages/user/projects";
import { ViewClientsPage, ViewSingleClientPage } from "./pages/user/clients";

import { Dashboard, Profile } from "./pages/user";
import { Home } from "./pages/landing-page";
import { Login, Logout, Signup } from "./pages/auth";
import { NotFoundError } from "./pages/errors";
import { Sidebar } from "./components/customs/sections";
import { userExample } from "./constants/user";
import UserLayout from "./components/global/UserLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user">
            <Route index element={<NotFoundError />} />
            <Route path="@me" element={<UserLayout user={userExample} />}>
              <Route index element={<Dashboard user={userExample} />} />
              <Route path="projects">
                <Route index element={<ViewProjectsPage />} />
                <Route path=":projectId" element={<ViewSingleProjectPage />} />
              </Route>
              <Route path="clients">
                <Route index element={<ViewClientsPage />} />
                <Route path=":clientId" element={<ViewSingleClientPage />} />
              </Route>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundError />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
