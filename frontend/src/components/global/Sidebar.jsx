import {
  Cog,
  Home,
  LogOut,
  MessageSquareDot,
  SquareLibrary,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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

// import "../../styles/sidebar.css";

const navLinks = [
  {
    name: "Home",
    route: "/user/me",
    icon: <Home size={24} />
  },
  {
    name: "Projects",
    route: "projects",
    icon: <SquareLibrary size={24} />
  }
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
  // {
  //   name: "Billing",
  //   route: "billing",
  //   icon: <CreditCard size={24} />
  // }
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
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.name}>
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
              {menu1.map((link) => (
                <SidebarMenuItem key={link.name}>
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
      {/* Footer Section */}
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mx-auto mb-4 cursor-pointer">
            <div className="flex items-center gap-2 ">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.firstName} />
                <AvatarFallback>
                  {user?.firstName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold">{user?.firstName} {user?.lastName}</span>
            </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center w-56 gap-2">
            <DropdownMenuLabel className="text-lg uppercase ">
              MySonex User Info:
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              {user?.firstName} {user?.lastName}
            </DropdownMenuLabel>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
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
