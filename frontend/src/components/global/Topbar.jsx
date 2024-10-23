import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import { ArrowLeftCircle, ArrowRightCircle, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { useSidebar } from "../ui/sidebar";
// import { SidebarTrigger } from "../ui/sidebar";

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
  return (
    <header className="flex items-center justify-between my-4 rounded-lg">
      <SidebarTrigger />
      <div className="flex gap-2 rounded-full cursor-pointer ">
        <ModeToggle />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button>
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
