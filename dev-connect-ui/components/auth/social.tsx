"use client";

import { BsGoogle } from "react-icons/bs";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { redirectDefaultURL } from "@/routes";

const Social = () => {
  const SignIn = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: redirectDefaultURL,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => SignIn("google")}
        variant={"outline"}
        size={"lg"}
        className="w-full"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => SignIn("github")}
        variant={"outline"}
        size={"lg"}
        className="w-full"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
