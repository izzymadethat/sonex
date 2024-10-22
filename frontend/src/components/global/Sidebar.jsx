import {
  Bug,
  ChevronDown,
  ChevronUpIcon,
  CircleUserRound,
  Cog,
  CreditCard,
  Home,
  LogOut,
  LogOutIcon,
  MailIcon,
  Menu,
  MenuSquare,
  MessageSquareDot,
  SquareLibrary,
  User,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoPremiumButton } from "../buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

// import "../../styles/sidebar.css";

const navLinks = [
  {
    name: "Home",
    route: "/user/me",
    icon: <Home size={24} />
  },
  // {
  //   name: "Notifications",
  //   route: "notifications",
  //   icon: (
  //     <Badge size="sm" color="warning" variant="shadow" content={5}>
  //       <MailIcon size={18} />
  //     </Badge>
  //   )
  // },

  {
    name: "Projects",
    route: "projects",
    icon: <SquareLibrary size={24} />
  },
  {
    name: "Clients",
    route: "clients",
    icon: <CircleUserRound size={24} />
  }
  // {
  //   name: "Payments",
  //   route: "payments",
  //   icon: <CreditCard size={18} />
  // },
  // {
  //   name: "Support",
  //   route: "support",
  //   icon: <Bug size={18} />
  // }
];

const menu1 = [
  {
    name: "Notifications",
    route: "notifications",
    icon: <MessageSquareDot size={32} />
  },
  {
    name: "Account Settings",
    route: "profile",
    icon: <Cog size={32} />
  },
  {
    name: "Billing",
    route: "billing",
    icon: <CreditCard size={32} />
  }
];

const SideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-4xl font-bold">Sonex</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link, index) => (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={link.route}>
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="ml-2">Sonex User</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Button>
              Logout <LogOut />
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
