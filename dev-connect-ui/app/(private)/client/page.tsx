"use client";

import { auth } from "@/auth";
import UserDetails from "../_components/UserDetails";
import useCurrentUser from "@/hooks/use-current-user";

const Server = () => {
  const user = useCurrentUser();

  return <UserDetails label="Client Component" user={user} />;
};

export default Server;
