import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import { ArrowLeftCircle, ArrowRightCircle, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useSidebar } from "../ui/sidebar";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { unloadProjects } from "@/store/projectSlice";
import { unloadComments } from "@/store/commentSlice";
import { unloadFiles } from "@/store/fileSlice";
import { toast } from "@/hooks/use-toast";

// Custom sidebar trigger
const SidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button onClick={toggleSidebar} variant="ghost">
      {open ? <ArrowLeftCircle className="w-6 h-6" /> : <ArrowRightCircle />}
    </Button>
  );
};

// Topbar for user dashboard
const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(unloadProjects());
    dispatch(unloadComments());
    dispatch(unloadFiles());
    dispatch(logoutUser());

    toast({
      title: "Logged Out Sucessfully!",
      description: "You have been logged out."
    });
    if (logoutUser.fulfilled) {
      return navigate("/");
    }
  };
  return (
    <header className="sticky flex items-center justify-between my-4 rounded-lg top-4">
      <SidebarTrigger />
      <div className="flex gap-2 rounded-full cursor-pointer ">
        <ModeToggle />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleLogout}>
                <LogOut />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Topbar;
