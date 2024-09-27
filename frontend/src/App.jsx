import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import NotFoundError from "./pages/errors/404NotFound";
import Dashboard from "./pages/user/Dashboard";
import Home from "./pages/Home";

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
            <Route path="@me" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFoundError />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
