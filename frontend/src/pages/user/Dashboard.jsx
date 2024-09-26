import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bug, CircleUserRound, CreditCard, SquareLibrary } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Divider,
} from "@nextui-org/react";
import GoPremiumButton from "../../components/GoPremiumButton";

const userExample = {
  id: 1,
  firstName: "Izzy",
  lastName: "Vickers",
  email: "izzy@gmail.com",
  username: "izzyvickers",
  bio: "I am a software engineer turned musician",
  isVerified: true,
  avatar:
    "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611704.jpg?w=740&t=st=1727365641~exp=1727366241~hmac=9e4ba6e22ae261c2d643eb541ecd70240381ffe90ed5e0a529e008cef6e997c4",

  projects: [
    {
      id: 1,
      userId: 1,
      title: "Project 1",
      description: "This is project 1",
      status: "active",
      projectAmount: 100,
      paymentStatus: "unpaid",
      clients: [],
      comments: [],
    },
  ],

  clients: [],
};

const Dashboard = () => {
  const [user, setUser] = useState(userExample);

  return (
    <div>
      {/* Sidebar navigation */}
      <aside className="border-r-2 border-gray-200 max-w-[250px] min-h-screen overflow-y-auto p-6 flex flex-col gap-8">
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
            Copyright &copy; 2024 by 8iVisions. View and Contribute to Source
            Code on my Github
          </p>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
