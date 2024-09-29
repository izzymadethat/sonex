import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Bug, CircleUserRound, CreditCard, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import GoPremiumButton from "./GoPremiumButton";

const sidebarOpened = {
  opacity: 0.8,
  transition: "width 0.3s ease, opacity 0.3s ease",
};

const sidebarClosed = {
  opacity: 1,
  transition: "width 0.3s ease, opacity 0.3s ease",
};

// closedSidebar
const ClosedSidebar = ({ user }) => {
  return (
    <aside
      className={`border-r-2 border-gray-200 max-w-[180px] min-h-screen overflow-y-auto p-4 flex flex-col gap-8 ${sidebarClosed}`}
    >
      <h2 className="text-2xl font-extrabold border rounded-full p-2">S</h2>
      <Divider className="bg-gray-200" />
      <nav className="flex flex-col gap-2 justify-center h-1/3">
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
      {user.avatar ? (
        <Avatar src={user.avatar} />
      ) : (
        <Avatar
          name={
            user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
          }
        />
      )}
    </aside>
  );
};

// openSidebar
const OpenedSidebar = ({ user }) => {
  return (
    <aside
      className={`border-r-2 border-gray-200 max-w-[250px] min-h-screen overflow-y-auto p-6 flex flex-col gap-8 ${sidebarOpened}`}
    >
      <h2 className="text-3xl font-bold">
        Sonex <span className="text-xs">Beta</span>
      </h2>
      <Divider className="bg-gray-200" />
      <nav className="flex flex-col gap-2 flex-grow">
        <NavLink to="/user/@me/clients" className="flex items-center gap-2">
          <CircleUserRound /> Clients
        </NavLink>

        <NavLink to="/user/@me/projects" className="flex items-center gap-2">
          <SquareLibrary /> Projects
        </NavLink>

        <NavLink to="/user/@me/payments" className="flex items-center gap-2">
          <CreditCard />
          Your Payments
        </NavLink>

        <NavLink to="#" className="flex items-center gap-2">
          <Bug />
          Feedback/Report Bug
        </NavLink>
      </nav>
      <div className="flex flex-col gap-4 items-start">
        <Dropdown className="bg-[#212121]">
          <DropdownTrigger>
            <User
              name={user.firstName}
              description={user.email}
              avatarProps={{
                src: user.avatar,
              }}
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions">
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="billing">Account Billing</DropdownItem>
            <DropdownItem key="support">Support</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <GoPremiumButton />
        <p className="text-xs text-gray-500">
          Copyright &copy; 2024 by 8iVisions. View and Contribute to Source Code
          on my Github
        </p>
      </div>
      <footer>
        <p className="text-center text-sm text-neutral-400">
          Sonex v1.0.0-Beta
        </p>
      </footer>
    </aside>
  );
};

const Sidebar = ({ user }) => {
  const [closeSidebar, setCloseSidebar] = useState(true);

  return (
    <div
      onMouseEnter={() => setCloseSidebar(false)}
      onMouseLeave={() => setCloseSidebar(true)}
      style={{ transition: "width 0.3s ease, opacity 0.3s ease" }}
      className="relative transition-all duration-300"
    >
      {closeSidebar ? (
        <ClosedSidebar user={user} />
      ) : (
        <OpenedSidebar user={user} />
      )}
    </div>
  );
};

export default Sidebar;
