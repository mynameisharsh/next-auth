"use client";

import { logOut } from "@/actions/signout";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/use-current-user";

const Settings = () => {
  const session = useCurrentUser();

  const onClickSignOut = () => {
    logOut();
  };

  return (
    <>
      <Button onClick={onClickSignOut}>Log out</Button>
    </>
  );
};

export default Settings;
