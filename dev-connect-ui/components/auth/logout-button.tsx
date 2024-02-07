"use client";

import { logOut } from "@/actions/signout";

interface LogOutButtonProps {
  children?: React.ReactNode;
}

const LogOutButton = ({ children }: LogOutButtonProps) => {
  const onLogOut = () => {
    logOut();
  };

  return (
    <span className="cursor-pointer" onClick={onLogOut}>
      {children}
    </span>
  );
};

export default LogOutButton;
