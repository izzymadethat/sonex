import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const UserLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <SideBar />
        <div className="w-full mx-6 lg:mx-4">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
