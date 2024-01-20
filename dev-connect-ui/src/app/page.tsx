import AuthButton from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-blue-500">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl text-white font-semibold drop-shadow-md">
          Welcome to Dev-Connect
        </h1>
        <p className="text-lg text-white">Connect dev from everywhere</p>
        <div>
          <AuthButton>
            <Button variant={"secondary"} size={"lg"}>
              Login
            </Button>
          </AuthButton>
        </div>
      </div>
    </main>
  );
}
