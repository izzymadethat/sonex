import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { useEffect } from "react";

const UserLayout = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  if (!user) {
    return navigate("/");
  }
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
