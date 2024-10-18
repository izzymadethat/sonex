import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";

const UserLayout = ({ user }) => {
  return (
    <div className="app">
      <SideBar user={user} />
      <div className="px-4 content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
