import {
  Bug,
  CircleUserRound,
  CreditCard,
  Home,
  LogOutIcon,
  MailIcon,
  MenuSquare,
  SquareLibrary,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GoPremiumButton } from "../buttons";

import "../../styles/sidebar.css";

const navLinks = [
  {
    name: "Home",
    route: "/user/me",
    icon: <Home size={18} />,
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
    icon: <CircleUserRound size={18} />,
  },
  {
    name: "Projects",
    route: "projects",
    icon: <SquareLibrary size={18} />,
  },
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

function SideBar() {
  return (
    <div className="menu">
      <h1>Sidebar</h1>
    </div>
  );
}

export default SideBar;

// // closedSidebar
// const ClosedSidebar = ({ user }) => {
//   return (
//     <aside className="flex flex-col items-center w-16 h-full gap-8 p-4 overflow-hidden transition-all duration-300 ease-in-out border-r-2 border-gray-200">
//       <div className="flex items-center justify-center w-8 h-8 border rounded-full">
//         <h2 className="text-2xl font-extrabold">S</h2>
//       </div>
//       <Divider />

//       <nav className="flex flex-col flex-grow gap-8">
//         {navLinks.map((link, index) => (
//           <div key={index}>{link.icon}</div>
//         ))}
//       </nav>

//       <Divider />

//       <Avatar
//         src={user.avatar}
//         fallback={
//           user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
//         }
//       />
//     </aside>
//   );
// };

// // openSidebar
// const OpenedSidebar = ({ user }) => {
//   return (
//     <aside
//       className={`border-r-1 border-foreground w-full max-w-64 h-screen overflow-y-auto py-2 px-6 flex flex-col gap-8 transition-all duration-300 ease-in-out`}
//     >
//       <h2 className="text-3xl font-bold">
//         Sonex <span className="text-xs">Beta</span>
//       </h2>

//       <Divider />
//       <nav className="flex flex-col flex-grow gap-8 text-sm">
//         {navLinks.map((link) => (
//           <NavLink to={link.route} className="flex items-center gap-2">
//             {link.icon} <span>{link.name}</span>
//           </NavLink>
//         ))}
//       </nav>
//       <Divider />
//       {/* Footer */}
//       <div className="flex flex-col w-full gap-4">
//         <Dropdown className="bg-[#212121]">
//           <DropdownTrigger>
//             <User
//               name={user.firstName}
//               description={user.email}
//               avatarProps={{
//                 src: user.avatar,
//                 fallback:
//                   user.firstName[0].toUpperCase() +
//                   user.lastName[0].toUpperCase()
//               }}
//               className="w-full cursor-pointer"
//             />
//           </DropdownTrigger>
//           <DropdownMenu aria-label="Profile Actions">
//             <DropdownSection title="Profile Settings">
//               <DropdownItem key="settings">
//                 <NavLink to="profile">Settings</NavLink>
//               </DropdownItem>
//               <DropdownItem key="billing">
//                 <NavLink to="billing">Account Billing</NavLink>
//               </DropdownItem>
//               <DropdownItem key="support">
//                 <NavLink to="contact-support">Support</NavLink>
//               </DropdownItem>
//             </DropdownSection>
//             <DropdownItem
//               key="logout"
//               color="danger"
//               startContent={<LogOutIcon size={16} />}
//             >
//               Logout
//             </DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//         <GoPremiumButton />
//         <p className="text-[9px] text-gray-500 text-center">
//           Copyright &copy; 2024 by 8iVisions. All rights reserved.{" "}
//           <Link color="foreground" className="text-[9px]" to="#">
//             View & Contribute to Source Code
//           </Link>
//         </p>
//       </div>
//       <footer>
//         <p className="text-xs text-center ">Sonex v1.0.0-Beta</p>
//       </footer>
//     </aside>
//   );
// };

// const Sidebar = ({ user }) => {
//   const [closeSidebar, setCloseSidebar] = useState(true);

//   return (
//     <>
//       <div className="flex w-full h-screen">
//         <div
//           onMouseEnter={() => setCloseSidebar(false)}
//           onMouseLeave={() => setCloseSidebar(true)}
//           style={{ transition: "width 0.3s ease, opacity 0.3s ease" }}
//           className="relative transition-all duration-300 ease-in-out"
//         >
//           {closeSidebar ? (
//             <ClosedSidebar user={user} />
//           ) : (
//             <OpenedSidebar user={user} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
