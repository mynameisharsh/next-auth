"use client";

import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathName = usePathname();

  return (
    <div className="w-[600px] bg-secondary rounded-md flex justify-between items-center p-3">
      <div className="space-x-3">
        <Button asChild variant={pathName === "/server" ? "default" : "ghost"}>
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button asChild variant={pathName === "/client" ? "default" : "ghost"}>
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button asChild variant={pathName === "/admin" ? "default" : "ghost"}>
          <Link href={"/admin"}>Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/settings" ? "default" : "ghost"}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
