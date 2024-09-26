import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import NotFoundError from "./pages/errors/404NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1 className="text-4xl">Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundError />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
