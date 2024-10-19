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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoPremiumButton } from "../buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// import "../../styles/sidebar.css";

const navLinks = [
  {
    name: "Home",
    route: "/user/me",
    icon: <Home size={36} />
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
    name: "Clients",
    route: "clients",
    icon: <CircleUserRound size={36} />
  },
  {
    name: "Projects",
    route: "projects",
    icon: <SquareLibrary size={36} />
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

function SideBar() {
  const navigate = useNavigate();
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [showMenu1, setShowMenu1] = useState(false);
  return (
    <div>
      {/* Logo and close */}
      <div className="flex items-center justify-between w-full p-6 rounded-r xl:hidden ">
        <div className="flex items-center justify-between space-x-3 cursor-pointer">
          {/* TODO: CHANGE THIS LOGO  */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
              fill="white"
            />
          </svg>
          <p className="text-2xl font-bold leading-6 text-white">Sonex</p>
        </div>

        {/* TODO: ADD Toggle Menu Button Here*/}
      </div>

      {/* Nav bar */}
      <div
        id="Main"
        className="sticky top-0 left-0 flex flex-col items-start justify-between w-full min-h-screen transition duration-500 ease-in-out transform bg-secondary xl:rounded-r xl:translate-x-0 sm:w-64"
      >
        <div>
          <XLNavbar />
          <div className="flex flex-col items-center justify-start w-full pb-5 pl-4 mt-6 space-y-3 border-b border-gray-600 ">
            {navLinks.map((link, index) => (
              <NavLink
                to={link.route}
                key={index}
                className="flex items-center w-full space-x-6 text-white rounded jusitfy-start focus:outline-none focus:text-indigo-400 hover:text-primary"
              >
                <span>{link.icon}</span>
                <span className="text-base text-lg font-bold">{link.name}</span>
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col items-center justify-start w-full px-6 border-b border-gray-600 ">
            <button
              onClick={() => setShowMenu1(!showMenu1)}
              className="flex items-center justify-between w-full py-5 text-left text-white focus:outline-none focus:text-primary focus:font-bold space-x-14 "
            >
              <p className="text-sm leading-5 uppercase">MySonex Profile</p>
              {showMenu1 ? <ChevronUpIcon /> : <ChevronDown />}
            </button>
            {showMenu1 && (
              <div
                id="menu1"
                className="flex flex-col items-start justify-start w-full pb-1 md:w-auto "
              >
                {menu1.map((link, index) => (
                  <NavLink
                    to={link.route}
                    className="flex items-center justify-start w-full px-3 py-2 space-x-6 text-gray-400 rounded hover:text-white focus:bg-gray-700 focus:text-white hover:bg-primary/50 md:w-52"
                  >
                    <span>{link.icon}</span>
                    <span className="text-base leading-4">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Profile  */}
        <div className="py-2 mx-auto w-fit bg-secondary-foreground/50">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

function XLNavbar() {
  return (
    <div className="items-center justify-start hidden p-6 space-x-3 xl:flex">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
          fill="white"
        />
      </svg>
      <p className="text-2xl leading-6 text-white ">Sonex</p>
    </div>
  );
}
function UserProfile() {
  return (
    <div>
      <p>Logged in as:</p>
      <div className="flex items-end w-full gap-4">
        <div className="flex items-center justify-center gap-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm leading-5 text-white cursor-pointer">
              Sonex User
            </p>
            <p className="text-xs leading-3 text-gray-300 cursor-pointer">
              sonexuser@email.com
            </p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="text-white bg-red-500 hover:bg-red-600"
                size="sm"
              >
                <LogOut />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out of your account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

// function ToogleBar({ showMainMenu }) {
//   <div aria-label="toggler" className="flex items-center justify-center">
//     <button
//       aria-label={showMainMenu ? "close" : "open"}
//       id={showMainMenu ? "close" : "open"}
//       onClick={() => setShowMainMenu(!showMainMenu)}
//       className="focus:outline-none focus:ring-2"
//     >
//       {!showMainMenu ? (
//         <Menu size={24} color="white" />
//       ) : (
//         <X size={24} color="white" />
//       )}
//     </button>
//   </div>;
// }
