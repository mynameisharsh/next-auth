"use client";

import { BsGoogle } from "react-icons/bs";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button variant={"outline"} size={"lg"} className="w-full">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button variant={"outline"} size={"lg"} className="w-full">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
