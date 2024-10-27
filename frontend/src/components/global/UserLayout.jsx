import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser, selectUser } from "@/features/user/userSlice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getProjects, unloadProjects } from "@/features/projects/projectsSlice";
import { fetchCommentsByProject } from "@/features/comments/commentsSlice";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, status } = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser());
      await dispatch(getProjects());
      await dispatch(fetchComments());
      await dispatch(fetchCommentsByProject());
    };
    fetchData();
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    await dispatch(unloadProjects());
    navigate("/");
  };

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
        <SideBar user={currentUser} onLogoutClick={handleLogout} />
        <div className="w-full mx-6 lg:mx-4">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
