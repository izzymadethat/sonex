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
  DropdownMenuLabel,
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
  }
  // {
  //   name: "Clients",
  //   route: "clients",
  //   icon: <CircleUserRound size={24} />
  // }
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
    icon: <MessageSquareDot size={24} />
  },
  {
    name: "Account Settings",
    route: "profile",
    icon: <Cog size={24} />
  },
  {
    name: "Billing",
    route: "billing",
    icon: <CreditCard size={24} />
  }
];

const SideBar = ({ user, onLogoutClick }) => {
  return (
    <Sidebar variant="floating" className="px-2 py-8 mx-2">
      <SidebarHeader>
        <h2 className="text-4xl font-bold text-center">Sonex</h2>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent className="mx-4">
        <SidebarGroup className="mt-16">
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={link.route}
                      className="text-xl font-bold uppercase"
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-md dark:text-primary">
            MySonex
          </SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {menu1.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={link.route}
                      className="mt-2 text-sm font-bold uppercase"
                    >
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
            <div className="flex items-center gap-2 mx-4">
              <Avatar>
                <AvatarImage src={user.avatar} alt="@shadcn" />
                <AvatarFallback>
                  {user?.firstName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2">{user?.email}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center w-56 gap-2">
            <DropdownMenuLabel className="text-lg uppercase ">
              MySonex User Info:
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              {user.firstName} {user.lastName}
            </DropdownMenuLabel>
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator className="w-1/2" />
            <DropdownMenuItem
              asChild
              className="p-4 mx-2 my-2 cursor-pointer bg-primary text-secondary hover:bg-primary/90"
              onClick={onLogoutClick}
            >
              <Button>
                Logout <LogOut />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
