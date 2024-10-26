import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "@/features/user/userSlice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const UserLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const { status, currentUser: user } = userData;
  const userLoaded = status === "succeeded" && user;
  return (
    <SidebarProvider>
      {userLoaded && (
        <div className="flex w-full">
          <SideBar user={user} />
          <div className="w-full mx-6 lg:mx-4">
            <Topbar />
            <Outlet />
          </div>
        </div>
      )}
    </SidebarProvider>
  );
};

export default UserLayout;
