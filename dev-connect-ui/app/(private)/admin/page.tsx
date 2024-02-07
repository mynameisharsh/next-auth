"use client";

import { admin } from "@/actions/admin";
import FormActionError from "@/components/form-action-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useCurrentUser from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const Admin = () => {
  const user = useCurrentUser();

  const testAPIRoute = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed Admin API Action");
      } else {
        toast.error("Not Allowed Admin API Action");
      }
    });
  };
  const testServerRoute = () => {
    admin().then((res) => {
      if (res.success) {
        toast.success("Allowed Server Action");
      } else {
        toast.error("Not Allowed Server Action");
      }
    });
  };

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-center text-lg font-mono font-bold">Admin</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {user?.role === UserRole.ADMIN ? (
          <FormActionError
            isError={false}
            message="You're allowed to view the Admin content"
          />
        ) : (
          <FormActionError
            isError={true}
            message="You're not allowed to view admin content"
          />
        )}

        <div className="shadow-md rounded-lg p-3">
          <div className="flex justify-between items-center">
            <p className="font-bold text-base">API Routes</p>
            <Button onClick={testAPIRoute}>Test Route</Button>
          </div>
        </div>
        <div className="shadow-md rounded-lg p-3">
          <div className="flex justify-between items-center">
            <p className="font-bold text-base">Server Routes</p>
            <Button onClick={testServerRoute}>Test Route</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
