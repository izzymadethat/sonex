import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Topbar for user dashboard
const Topbar = () => {
  return (
    <header className="flex items-center justify-end rounded-lg">
      <div className="flex gap-2 rounded-full cursor-pointer ">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Topbar;

// (
//   <nav className="flex items-center justify-between w-full space-y-4">
//       <Input
//         placeholder="Search"
//         className="w-64"
//         endContent={
//           <Button isIconOnly size="sm" variant="light">
//             <Search size={18} />
//           </Button>
//         }
//       />
//       <div className="flex items-center gap-2">
//         <Bell />
//         <Cog />
//         <User />
//       </div>
//     </nav>
// )
