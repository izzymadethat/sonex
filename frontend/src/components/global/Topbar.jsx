import { Button, Input, Link, User } from "@nextui-org/react";
import React from "react";
import { Bell, Cog, Search } from "lucide-react";

const Topbar = () => {
  return (
    <nav className="flex items-center justify-between w-full space-y-4">
      <Input
        placeholder="Search"
        className="w-64"
        endContent={
          <Button isIconOnly size="sm" variant="light">
            <Search size={18} />
          </Button>
        }
      />
      <div className="flex items-center gap-2">
        <Bell />
        <Cog />
        <User />
      </div>
    </nav>
  );
};

export default Topbar;
