import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "@/features/user/userSlice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getProjects } from "@/features/projects/projectsSlice";

const UserLayout = () => {
  const dispatch = useDispatch();
  const { currentUser, status } = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser());
      await dispatch(getProjects());
    };
    fetchData();
  }, [dispatch]);

  // Show a loader while data is being fetched
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  // If there's no current user, you can redirect or show a message
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center">
        No user logged in. Please log in.
      </div>
    );
  }
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <SideBar user={currentUser} />
        <div className="w-full mx-6 lg:mx-4">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
