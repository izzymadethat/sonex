import React from "react";
import { Bell, Cog, Search, User } from "lucide-react";

// Topbar for user dashboard
const Topbar = () => {
  return (
    <header className="flex items-center justify-end bg-black rounded-lg">
      <div className="border rounded-full cursor-pointer border-primary ">
        <User />
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
