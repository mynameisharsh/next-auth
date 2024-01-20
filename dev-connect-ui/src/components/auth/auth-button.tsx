"use client";

import { useRouter } from "next/navigation";

interface AuthButton {
  mode?: "modal" | "redirect";
  asChild?: boolean;
  children: React.ReactNode;
}

const AuthButton: React.FC<AuthButton> = ({
  children,
  asChild,
  mode = "redirect",
}) => {
  const router = useRouter();
  const onClickButton = (): void => {
    router.push("/auth/login");
  };

  return <span onClick={onClickButton}>{children}</span>;
};

export default AuthButton;
