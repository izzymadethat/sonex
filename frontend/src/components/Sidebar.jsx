import {
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  User
} from "@nextui-org/react";
import {
  Bug,
  CircleUserRound,
  CreditCard,
  Home,
  LogOutIcon,
  MailIcon,
  SquareLibrary
} from "lucide-react";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import GoPremiumButton from "./GoPremiumButton";

const sidebarOpened = {
  opacity: 0.8,
  transition: "width 0.3s ease, opacity 0.3s ease"
};

const sidebarClosed = {
  opacity: 1,
  transition: "width 0.3s ease, opacity 0.3s ease"
};

// closedSidebar
const ClosedSidebar = ({ user }) => {
  return (
    <aside className="border-r-2 border-gray-200 w-16 h-full overflow-hidden p-4 flex flex-col items-center gap-8 transition-all duration-300 ease-in-out">
      <div className="h-8 w-8 border rounded-full flex items-center justify-center">
        <h2 className="text-2xl font-extrabold">S</h2>
      </div>
      <Divider />

      <nav className="flex flex-col gap-8 flex-grow">
        <NavLink to="/user/@me/notifications" className={"flex gap-2"}>
          <Badge size="sm" color="danger" content={5}>
            <MailIcon />
          </Badge>
        </NavLink>
        <NavLink to="/user/@me/clients">
          <CircleUserRound />
        </NavLink>
        <NavLink to="/user/@me/projects">
          <SquareLibrary />
        </NavLink>
        <NavLink to="/user/@me/payments">
          <CreditCard />
        </NavLink>
        <NavLink to="#">
          <Bug />
        </NavLink>
      </nav>

      <Divider />

      <Avatar
        src={user.avatar}
        fallback={
          user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
        }
      />
    </aside>
  );
};

// openSidebar
const OpenedSidebar = ({ user }) => {
  return (
    <aside
      className={`border-r-1 border-foreground w-full max-w-64 h-screen overflow-y-auto py-2 px-6 flex flex-col gap-8 transition-all duration-300 ease-in-out`}
    >
      <h2 className="text-3xl font-bold">
        Sonex <span className="text-xs">Beta</span>
      </h2>

      <Divider />
      <nav className="flex flex-col gap-8 flex-grow text-sm">
        <NavLink to="/user/@me" className="flex items-center gap-2">
          <Home size={18} /> Home
        </NavLink>

        <NavLink to="notifications" className="flex gap-2">
          <Badge size="sm" color="warning" variant="shadow" content={5}>
            <MailIcon size={18} />
          </Badge>
          Notifications
        </NavLink>

        <NavLink to="clients" className="flex items-center gap-2">
          <CircleUserRound size={18} /> Clients
        </NavLink>

        <NavLink to="projects" className="flex items-center gap-2">
          <SquareLibrary size={18} /> Projects
        </NavLink>

        <NavLink to="payments" className="flex items-center gap-2">
          <CreditCard size={18} />
          Your Payments
        </NavLink>

        <NavLink to="#" className="flex items-center gap-2">
          <Bug size={18} />
          Report an Issue
        </NavLink>
      </nav>
      <Divider />
      {/* Footer */}
      <div className="flex flex-col gap-4 w-full">
        <Dropdown className="bg-[#212121]">
          <DropdownTrigger>
            <User
              name={user.firstName}
              description={user.email}
              avatarProps={{
                src: user.avatar,
                fallback:
                  user.firstName[0].toUpperCase() +
                  user.lastName[0].toUpperCase()
              }}
              className="cursor-pointer w-full"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions">
            <DropdownSection title="Profile Settings">
              <DropdownItem key="settings">
                <NavLink to="profile">Settings</NavLink>
              </DropdownItem>
              <DropdownItem key="billing">
                <NavLink to="billing">Account Billing</NavLink>
              </DropdownItem>
              <DropdownItem key="support">
                <NavLink to="contact-support">Support</NavLink>
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={<LogOutIcon size={16} />}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <GoPremiumButton />
        <p className="text-[9px] text-gray-500 text-center">
          Copyright &copy; 2024 by 8iVisions. All rights reserved.{" "}
          <Link color="foreground" className="text-[9px]" to="#">
            View & Contribute to Source Code
          </Link>
        </p>
      </div>
      <footer>
        <p className="text-center text-xs ">Sonex v1.0.0-Beta</p>
      </footer>
    </aside>
  );
};

const Sidebar = ({ user }) => {
  const [closeSidebar, setCloseSidebar] = useState(false);

  return (
    <>
      <div className="flex h-screen w-full max-w-7xl gap-12">
        <div
          // onMouseEnter={() => setCloseSidebar(false)}
          // onMouseLeave={() => setCloseSidebar(true)}
          style={{ transition: "width 0.3s ease, opacity 0.3s ease" }}
          className="relative transition-all duration-300 ease-in-out"
        >
          {closeSidebar ? (
            <ClosedSidebar user={user} />
          ) : (
            <OpenedSidebar user={user} />
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
