import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, restoreUser, selectUser } from "@/features/user/userSlice";
import { getProjects, unloadProjects } from "@/features/projects/projectsSlice";
import { fetchComments } from "@/features/comments/commentsSlice";
import { Loader2 } from "lucide-react";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser, error } = useSelector(selectUser);

  useEffect(() => {
    dispatch(restoreUser()).then(async () => {
      await dispatch(getProjects());
      await dispatch(fetchComments());
      setIsLoaded(true);
    });
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    await dispatch(unloadProjects());
    await dispatch(unloadComments());
    await dispatch(unloadFiles());
    navigate("/");
  };

  // if (!isLoaded && !currentUser) {
  //   return <p>Loading...</p>;
  // } else if (error) {
  //   return <h1>Error: {error}</h1>;
  // }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <SideBar user={currentUser} onLogoutClick={handleLogout} />
        <div className="w-full mx-6 lg:mx-4">
          <Topbar />
          <div className="mt-8 lg:mx-6 xl:max-w-6xl xl:mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
