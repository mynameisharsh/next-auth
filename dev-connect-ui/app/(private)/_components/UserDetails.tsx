import { ExtendedUser } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserDetailsProps {
  user?: ExtendedUser;
  label: string;
}

const UserDetails = ({ label, user }: UserDetailsProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-center text-lg font-mono font-bold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center shadow-md p-2 rounded-lg">
          <p className="font-bold text-base">ID</p>
          <p className="text-sm">{user?.id}</p>
        </div>
        <div className="flex justify-between items-center shadow-md p-2 rounded-lg">
          <p className="font-bold text-base">Name</p>
          <p className="text-sm">{user?.name}</p>
        </div>
        <div className="flex justify-between items-center shadow-md p-2 rounded-lg">
          <p className="font-bold text-base">Email</p>
          <p className="text-sm">{user?.email}</p>
        </div>
        <div className="flex justify-between items-center shadow-md p-2 rounded-lg">
          <p className="font-bold text-base">Role</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div className="flex justify-between items-center shadow-md p-2 rounded-lg">
          <p className="font-bold text-base">Two Factor Authentication</p>
          <p className="text-sm">{user?.isTwoFactorEnabled ? "ON" : "OFF"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
