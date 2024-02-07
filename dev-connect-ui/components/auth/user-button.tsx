"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import LogOutButton from "./logout-button";
import { FaSignOutAlt } from "react-icons/fa";
import useCurrentUser from "@/hooks/use-current-user";

const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-sky-500">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <UserIcon className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogOutButton>
          <DropdownMenuItem>
            <FaSignOutAlt className="mr-2" />
            LogOut
          </DropdownMenuItem>
        </LogOutButton>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
